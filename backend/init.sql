DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS sous_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS reservations;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  multiple_selection INTEGER DEFAULT 0,
  depend_de_categorie_id INTEGER
);

CREATE TABLE sous_categories (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  categorie_id INTEGER NOT NULL,
  FOREIGN KEY (categorie_id) REFERENCES categories(id)
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  categorie_id INTEGER NOT NULL,
  sous_categorie_id INTEGER,
  prix REAL,
  duree_min INTEGER,
  FOREIGN KEY (categorie_id) REFERENCES categories(id),
  FOREIGN KEY (sous_categorie_id) REFERENCES sous_categories(id)
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  prenom TEXT,
  nom TEXT,
  telephone TEXT,
  email TEXT,
  service TEXT,
  date DATE,
  horaire TEXT,
  commentaire TEXT,
  UNIQUE(date, horaire)
);

-- Catégories
INSERT INTO categories (nom, multiple_selection, depend_de_categorie_id) VALUES
('Manucure', 0, NULL),
('Nail Art', 1, 1),
('Beaute des pieds', 0, NULL),
('Services a la carte', 1, NULL);

-- Sous-catégories de Manucure
INSERT INTO sous_categories (nom, categorie_id) VALUES
('Soins des ongles naturels', 1),
('Semi-permanent', 1),
('Gel/Acrygel/Extensions', 1);

-- Services (nom, catégorie, sous-catégorie, prix, durée en minutes)
INSERT INTO services (nom, categorie_id, sous_categorie_id, prix, duree_min) VALUES
('Manucure simple', 1, 1, 29, 30),
('Manucure spa (avec massage)', 1, 1, 51, 45),
('Pose de vernis classique', 1, 1, 22, 20),
('Manucure express (limage + vernis)', 1, 1, 18, 15),

('Vernis semi-permanent mains', 1, 2, 44, 45),
('Depose semi-permanent', 1, 2, 15, 20),
('Base renforcee', 1, 2, 59, 60),

('Pose gel avec rallongement', 1, 3, 66, 75),
('Pose complete avec rallongement capsules', 1, 3, 88, 90),
('Pose en polygel / acrygel', 1, 3, 88, 90),
('Remplissage gel ou polygel', 1, 3, 66, 75),
('Depose de gel / polygel', 1, 3, 22, 30),

('Nail art simple (1-2 ongles)', 2, NULL, 7, 15),
('Nail art complet personnalise', 2, NULL, 30, 30),
('Babyboomer', 2, NULL, 15, 20),
('French manucure', 2, NULL, 15, 15),
('Effets speciaux (chrome, marbre...)', 2, NULL, 22, 30),
('Encapsulation', 2, NULL, 22, 30),

('Beaute des pieds (soin + vernis)', 3, NULL, 44, 45),
('Spa des pieds complet', 3, NULL, 59, 60),
('Depose vernis semi permanent', 3, NULL, 15, 20),

('Retrait vernis semi-permanent', 4, NULL, 7, 5),
('Massage mains 15min', 4, NULL, 20, 15),
('Massage mains 30min', 4, NULL, 30, 29);
