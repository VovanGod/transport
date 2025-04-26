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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});