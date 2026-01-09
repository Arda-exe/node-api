const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

// Initialize database: create tables and insert seed data if needed
async function initializeDatabase() {
  try {
    // Create developers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS developers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        country VARCHAR(100) NOT NULL,
        founded_year INT NOT NULL,
        website VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Create games table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS games (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        genre VARCHAR(100) NOT NULL,
        release_year INT NOT NULL,
        platform VARCHAR(100) NOT NULL,
        rating DECIMAL(3,1) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        developer_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (developer_id) REFERENCES developers(id) ON DELETE CASCADE,
        INDEX idx_developer_id (developer_id),
        INDEX idx_genre (genre),
        INDEX idx_title (title)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    console.log('Tables created successfully');

    // Check if developers table is empty
    const [devRows] = await pool.query('SELECT COUNT(*) as count FROM developers');
    if (devRows[0].count === 0) {
      // Insert seed data for developers
      await pool.query(`
        INSERT INTO developers (name, country, founded_year, website) VALUES
        ('Nintendo', 'Japan', 1889, 'https://www.nintendo.com'),
        ('CD Projekt Red', 'Poland', 1994, 'https://www.cdprojektred.com'),
        ('Valve Corporation', 'USA', 1996, 'https://www.valvesoftware.com'),
        ('FromSoftware', 'Japan', 1986, 'https://www.fromsoftware.jp'),
        ('Rockstar Games', 'USA', 1998, 'https://www.rockstargames.com');
      `);

      // Insert seed data for games
      await pool.query(`
        INSERT INTO games (title, description, genre, release_year, platform, rating, price, developer_id) VALUES
        ('The Legend of Zelda: Breath of the Wild', 'An open-world action-adventure game set in Hyrule', 'Adventure', 2017, 'Nintendo Switch', 9.5, 59.99, 1),
        ('Super Mario Odyssey', 'A 3D platformer where Mario travels across various kingdoms', 'Platformer', 2017, 'Nintendo Switch', 9.2, 59.99, 1),
        ('Animal Crossing: New Horizons', 'A life simulation game on a deserted island', 'Simulation', 2020, 'Nintendo Switch', 8.8, 49.99, 1),
        ('Cyberpunk 2077', 'An open-world RPG set in Night City', 'RPG', 2020, 'PC', 7.5, 49.99, 2),
        ('The Witcher 3: Wild Hunt', 'An action RPG following Geralt of Rivia', 'RPG', 2015, 'Multi-platform', 9.8, 39.99, 2),
        ('Half-Life 2', 'A groundbreaking first-person shooter', 'FPS', 2004, 'PC', 9.6, 9.99, 3),
        ('Portal 2', 'A puzzle-platform game with innovative mechanics', 'Puzzle', 2011, 'Multi-platform', 9.4, 19.99, 3),
        ('Counter-Strike: Global Offensive', 'A competitive multiplayer FPS', 'FPS', 2012, 'PC', 8.9, 0.00, 3),
        ('Elden Ring', 'An action RPG in a dark fantasy world', 'RPG', 2022, 'Multi-platform', 9.7, 59.99, 4),
        ('Dark Souls III', 'A challenging action RPG', 'RPG', 2016, 'Multi-platform', 9.3, 39.99, 4),
        ('Sekiro: Shadows Die Twice', 'An action-adventure game set in feudal Japan', 'Action', 2019, 'Multi-platform', 9.5, 49.99, 4),
        ('Grand Theft Auto V', 'An open-world action-adventure game', 'Action', 2013, 'Multi-platform', 9.6, 29.99, 5),
        ('Red Dead Redemption 2', 'An epic tale of life in America at the dawn of the modern age', 'Action', 2018, 'Multi-platform', 9.8, 59.99, 5),
        ('Grand Theft Auto: San Andreas', 'A classic open-world action game', 'Action', 2004, 'Multi-platform', 9.1, 14.99, 5),
        ('Max Payne 3', 'A third-person shooter with bullet time mechanics', 'Shooter', 2012, 'Multi-platform', 8.5, 19.99, 5);
      `);

      console.log('Seed data inserted successfully');
    } else {
      console.log('Database already contains data, skipping seed');
    }
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    throw error;
  }
}

module.exports = { pool, testConnection, initializeDatabase };
