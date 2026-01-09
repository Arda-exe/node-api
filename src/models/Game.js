const { pool } = require('../../config/database');

class Game {
  static async getAll(params = {}) {
    const { limit = 10, offset = 0 } = params;

    // Get total count
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM games');
    const total = countResult[0].total;

    // Get paginated results
    const [rows] = await pool.query(
      'SELECT * FROM games ORDER BY id LIMIT ? OFFSET ?',
      [parseInt(limit), parseInt(offset)]
    );

    return {
      data: rows,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: (parseInt(offset) + parseInt(limit)) < total
      }
    };
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { title, description, genre, release_year, platform, rating, price, developer_id } = data;

    // Check if developer exists
    const [devRows] = await pool.query('SELECT id FROM developers WHERE id = ?', [developer_id]);
    if (devRows.length === 0) {
      throw new Error('Developer does not exist');
    }

    const [result] = await pool.query(
      'INSERT INTO games (title, description, genre, release_year, platform, rating, price, developer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, genre, release_year, platform, rating, price, developer_id]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const { title, description, genre, release_year, platform, rating, price, developer_id } = data;

    // Check if developer exists
    const [devRows] = await pool.query('SELECT id FROM developers WHERE id = ?', [developer_id]);
    if (devRows.length === 0) {
      throw new Error('Developer does not exist');
    }

    await pool.query(
      'UPDATE games SET title = ?, description = ?, genre = ?, release_year = ?, platform = ?, rating = ?, price = ?, developer_id = ? WHERE id = ?',
      [title, description, genre, release_year, platform, rating, price, developer_id, id]
    );
    return { id, ...data };
  }

  static async delete(id) {
    await pool.query('DELETE FROM games WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Game;
