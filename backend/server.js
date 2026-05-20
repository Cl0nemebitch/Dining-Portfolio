const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
  }
  release();
});

// API Endpoints

// GET /api/menu - Fetch all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menus ORDER BY category, price DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menu:', err);
    res.status(500).json({ error: 'Internal server error while fetching menu' });
  }
});

// POST /api/reservations - Create a new reservation
app.post('/api/reservations', async (req, res) => {
  const { guest_name, email, phone, reservation_date, reservation_time, party_size } = req.body;

  if (!guest_name || !email || !phone || !reservation_date || !reservation_time || !party_size) {
    return res.status(400).json({ error: 'All fields are required for reservation' });
  }

  try {
    const query = `
      INSERT INTO reservations (guest_name, email, phone, reservation_date, reservation_time, party_size)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [guest_name, email, phone, reservation_date, reservation_time, party_size];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Reservation successful',
      reservationId: result.rows[0].id
    });
  } catch (err) {
    console.error('Error creating reservation:', err);
    res.status(500).json({ error: 'Internal server error while creating reservation' });
  }
});

// Catch-all: serve index.html for any non-API route
app.get('(.*)', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Casa de mi Amour server running on port ${port}`);
});
