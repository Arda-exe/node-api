const { pool } = require('../../config/database');

class Developer {
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM developers ORDER BY id');
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM developers WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, country, founded_year, website } = data;
    const [result] = await pool.query(
      'INSERT INTO developers (name, country, founded_year, website) VALUES (?, ?, ?, ?)',
      [name, country, founded_year, website]
    );
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const { name, country, founded_year, website } = data;
    await pool.query(
      'UPDATE developers SET name = ?, country = ?, founded_year = ?, website = ? WHERE id = ?',
      [name, country, founded_year, website, id]
    );
    return { id, ...data };
  }

  static async delete(id) {
    await pool.query('DELETE FROM developers WHERE id = ?', [id]);
    return { id };
  }

  static async getGames(developerId) {
    const [rows] = await pool.query(
      'SELECT * FROM games WHERE developer_id = ? ORDER BY id',
      [developerId]
    );
    return rows;
  }
}

module.exports = Developer;
