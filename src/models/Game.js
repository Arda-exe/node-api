const { pool } = require('../../config/database');

class Game {
  static async getAll(params = {}) {
    const { limit = 10, offset = 0, search, genre, genres, sort, order = 'asc', minPrice, maxPrice, minRating, maxRating } = params;

    // Build WHERE clause
    const conditions = [];
    const values = [];

    if (search) {
      conditions.push('(title LIKE ? OR description LIKE ?)');
      values.push(`%${search}%`, `%${search}%`);
    }

    if (genre) {
      conditions.push('genre = ?');
      values.push(genre);
    }

    // Multiple genres filter
    if (genres) {
      const genreArray = genres.split(',').map(g => g.trim());
      const placeholders = genreArray.map(() => '?').join(',');
      conditions.push(`genre IN (${placeholders})`);
      values.push(...genreArray);
    }

    // Price range filter
    if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
      conditions.push('price >= ?');
      values.push(parseFloat(minPrice));
    }
    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
      conditions.push('price <= ?');
      values.push(parseFloat(maxPrice));
    }

    // Rating range filter
    if (minRating !== undefined && minRating !== null && minRating !== '') {
      conditions.push('rating >= ?');
      values.push(parseFloat(minRating));
    }
    if (maxRating !== undefined && maxRating !== null && maxRating !== '') {
      conditions.push('rating <= ?');
      values.push(parseFloat(maxRating));
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Build ORDER BY clause
    const validSortFields = ['rating', 'release_year', 'price', 'title', 'id'];
    const sortField = validSortFields.includes(sort) ? sort : 'id';
    const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    const orderClause = `ORDER BY ${sortField} ${sortOrder}`;

    // Get total count
    const [countResult] = await pool.query(
      `SELECT COUNT(*) as total FROM games ${whereClause}`,
      values
    );
    const total = countResult[0].total;

    // Get paginated results
    const [rows] = await pool.query(
      `SELECT * FROM games ${whereClause} ${orderClause} LIMIT ? OFFSET ?`,
      [...values, parseInt(limit), parseInt(offset)]
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
