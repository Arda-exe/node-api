require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
const developersRoutes = require('./src/routes/developers');
const gamesRoutes = require('./src/routes/games');
const statisticsRoutes = require('./src/routes/statistics');
app.use('/api/developers', developersRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/statistics', statisticsRoutes);


// Initialize database and start server
async function startServer() {
  await testConnection();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
