const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'car_rental',
    password: '12345', 
    port: 5432,
    client_encoding: 'utf8'
});

app.get('/api/cars', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM cars');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/cars', async (req, res) => {
  try {
    const { model, transmission, power, price_per_day, image_url } = req.body;
    
    if (!model || !transmission || !power || !price_per_day) {
      return res.status(400).json({ message: 'Все обязательные поля должны быть заполнены' });
    }

    const result = await pool.query(
      'INSERT INTO cars (model, transmission, power, price_per_day, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [model, transmission, power, price_per_day, image_url || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при добавлении автомобиля' });
  }
});

app.delete('/api/cars/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
      
      if (result.rowCount === 0) {
          return res.status(404).json({ error: 'Автомобиль не найден' });
      }
      
      res.status(200).json({ success: true, deletedCar: result.rows[0] });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при удалении автомобиля' });
  }
});


// orders
app.get('/api/orders', async (req, res) => {
  try {
      const { rows } = await pool.query('SELECT * FROM orders');
      res.json(rows);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
})

app.delete('/api/orders/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await pool.query('DELETE FROM orders WHERE id = $1', [id]);
      res.status(200).json({ success: true });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при удалении автомобиля' });
  }
});

app.post('/api/orders', async (req, res) => {
    const { name, phone, comment, carId, carModel, carPrice } = req.body;
    
    try {
      const { rows } = await pool.query(
        `INSERT INTO orders 
         (name, phone, comment, car_id, car_model, car_price) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [name, phone, comment, carId, carModel, carPrice]
      );
      
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
});


// Register
app.post('/api/register', async (req, res) => {
    const { username, email, password_hash } = req.body;
    
    try {
        // Проверка, что пользователь с таким email или username уже не существует
        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR username = $2',
            [email, username]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: 'Пользователь с таким email или логином уже существует' });
        }

        // Вставка нового пользователя (is_admin по умолчанию false)
        const { rows } = await pool.query(
            'INSERT INTO users (username, email, password_hash, is_admin) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, password_hash, false]
        );
        
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера при регистрации пользователя' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Проверка на админа
    if (username === 'admin' && password === '12345') {
      return res.json({ 
        success: true, 
        user: {
          id: 0,
          username: 'admin',
          email: 'admin@example.com',
          is_admin: true
        }
      });
    }
    
    // Проверка обычных пользователей
    try {
      const { rows } = await pool.query(
        'SELECT * FROM users WHERE username = $1 AND password_hash = $2',
        [username, password]
      );
  
      if (rows.length > 0) {
        res.json({ 
          success: true, 
          user: {
            id: rows[0].id,
            username: rows[0].username,
            email: rows[0].email,
            is_admin: rows[0].is_admin
          }
        });
      } else {
        res.status(401).json({ 
          success: false, 
          error: 'Неверный логин или пароль' 
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка сервера при входе' });
    }
  });

// Маршрут для получения водителей
app.get('/api/drivers', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT id, name, experience, 
                   '/images/drivers/' || image_url as image_url 
            FROM drivers
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// отправка заяки на такси
app.post('/api/taxi-orders', async (req, res) => {
    const { name, phone, from_address, to_address, car_type } = req.body;
    
    try {
      const { rows } = await pool.query(
        `INSERT INTO taxi_orders 
         (name, phone, from_address, to_address, car_type) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [name, phone, from_address, to_address, car_type]
      );
      
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при создании заявки' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});