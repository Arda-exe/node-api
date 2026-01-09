const { pool } = require('../../config/database');

class Game {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM games ORDER BY id');
    return rows;
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
