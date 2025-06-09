const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./rdv.db');
const servicesDb = new sqlite3.Database('./services.db');


// 🔧 Création de la table avec contrainte d'unicité (empêche doublons)
db.run(`
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prenom TEXT,
    nom TEXT,
    telephone TEXT,
    email TEXT,
    service TEXT,
    date TEXT,
    horaire TEXT,
    commentaire TEXT,
    UNIQUE(date, horaire)
  )
`);

// 🔹 Récupérer les dates disponibles (jours ouvrables non complets)
app.get('/api/dates-disponibles', (req, res) => {
  const heuresDisponibles = [
    "08:30", "09:30", "10:30", "13:00", "14:00", "15:00", "16:00"
  ];

  db.all(`SELECT date, COUNT(*) as count FROM reservations GROUP BY date`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const datesComplet = rows
      .filter(r => r.count >= heuresDisponibles.length)
      .map(r => r.date);

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
  });
});

// 🔹 Récupérer les horaires déjà réservés pour une date donnée
app.get('/api/horaires-occupes/:date', (req, res) => {
  const date = req.params.date;

  db.all(`SELECT horaire FROM reservations WHERE date = ?`, [date], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const horairesOccupes = rows.map(row => row.horaire);
    res.json(horairesOccupes);
  });
});

// 🔹 Ajouter une réservation
app.post('/api/reservations', (req, res) => {
  const { prenom, nom, telephone, email, service, date, horaire, commentaire } = req.body;

  const insertSql = `
    INSERT INTO reservations (prenom, nom, telephone, email, service, date, horaire, commentaire)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(insertSql, [prenom, nom, telephone, email, service, date, horaire, commentaire], function (err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({ error: "Ce créneau est déjà réservé." });
      }
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// 🔹 (Optionnel) Voir toutes les réservations
app.get('/api/all', (req, res) => {
  db.all(`SELECT * FROM reservations ORDER BY date, horaire`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});


// 🔹 Récupérer la liste des services depuis services.db
app.get('/api/services', (req, res) => {
  servicesDb.all(`
    SELECT 
      s.id, s.nom AS nom_service, 
      c.nom AS categorie, c.id AS categorie_id, c.multiple_selection, c.depend_de_categorie_id,
      sc.nom AS sous_categorie
    FROM services s
    JOIN categories c ON s.categorie_id = c.id
    LEFT JOIN sous_categories sc ON s.sous_categorie_id = sc.id
    ORDER BY c.id, sc.id, s.id
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
