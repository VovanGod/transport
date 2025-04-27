const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
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
    const { transmission, model, power, price_per_day, image_url } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO cars (transmission, model, power, price_per_day, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [transmission, model, power, price_per_day, image_url]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});