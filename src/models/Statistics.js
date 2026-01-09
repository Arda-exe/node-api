const { pool } = require('../../config/database');

class Statistics {
  static async getAll() {
    // Total counts
    const [gamesCount] = await pool.query('SELECT COUNT(*) as total FROM games');
    const [developersCount] = await pool.query('SELECT COUNT(*) as total FROM developers');

    // Average rating overall
    const [avgRating] = await pool.query('SELECT AVG(rating) as average FROM games');

    // Average rating per developer (top 5)
    const [avgPerDeveloper] = await pool.query(`
      SELECT d.name, AVG(g.rating) as average_rating, COUNT(g.id) as game_count
      FROM developers d
      LEFT JOIN games g ON d.id = g.developer_id
      GROUP BY d.id, d.name
      HAVING game_count > 0
      ORDER BY average_rating DESC
      LIMIT 5
    `);

    // Games count per genre
    const [gamesPerGenre] = await pool.query(`
      SELECT genre, COUNT(*) as count
      FROM games
      GROUP BY genre
      ORDER BY count DESC
    `);

    return {
      totalGames: gamesCount[0].total,
      totalDevelopers: developersCount[0].total,
      averageRating: parseFloat(avgRating[0].average).toFixed(2),
      topDevelopersByRating: avgPerDeveloper,
      gamesPerGenre: gamesPerGenre
    };
  }
}

module.exports = Statistics;
