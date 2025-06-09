const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connexion à PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 🔹 Récupérer les dates disponibles (jours ouvrables non complets)
app.get('/api/dates-disponibles', async (req, res) => {
  const heuresDisponibles = [
    "08:30", "09:30", "10:30", "13:00", "14:00", "15:00", "16:00"
  ];

  try {
    const result = await pool.query(`SELECT date, COUNT(*) as count FROM reservations GROUP BY date`);
    const rows = result.rows;

    const datesComplet = rows
      .filter(r => r.count >= heuresDisponibles.length)
      .map(r => r.date.toISOString().split('T')[0]);

    const today = new Date();
    const datesDisponibles = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = date.getDay(); // 0 = dimanche, 6 = samedi

      if (day === 0 || day === 6) continue;

      const formatted = date.toISOString().split('T')[0];
      if (!datesComplet.includes(formatted)) {
        datesDisponibles.push(formatted);
      }
    }

    res.json(datesDisponibles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Récupérer les horaires déjà réservés pour une date donnée
app.get('/api/horaires-occupes/:date', async (req, res) => {
  const date = req.params.date;

  try {
    const result = await pool.query(
      `SELECT horaire FROM reservations WHERE date = $1`, [date]
    );
    const horairesOccupes = result.rows.map(row => row.horaire);
    res.json(horairesOccupes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Ajouter une réservation
app.post('/api/reservations', async (req, res) => {
  const { prenom, nom, telephone, email, service, date, horaire, commentaire } = req.body;

  const insertSql = `
    INSERT INTO reservations (prenom, nom, telephone, email, service, date, horaire, commentaire)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
  `;

  try {
    const result = await pool.query(insertSql, [prenom, nom, telephone, email, service, date, horaire, commentaire]);
    res.json({ success: true, id: result.rows[0].id });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: "Ce créneau est déjà réservé." });
    }
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Voir toutes les réservations
app.get('/api/all', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM reservations ORDER BY date, horaire`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Récupérer la liste des services
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id, s.nom AS nom_service, 
        c.nom AS categorie, c.id AS categorie_id, c.multiple_selection, c.depend_de_categorie_id,
        sc.nom AS sous_categorie
      FROM services s
      JOIN categories c ON s.categorie_id = c.id
      LEFT JOIN sous_categories sc ON s.sous_categorie_id = sc.id
      ORDER BY c.id, sc.id, s.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
