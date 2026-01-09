const { pool } = require('../../config/database');

class Game {
  static async getAll(params = {}) {
    const { limit = 10, offset = 0, search, genre, genres, sort, order = 'asc', minRating, maxRating } = params;

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
    const validSortFields = ['rating', 'release_year', 'title', 'id'];
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
    const { title, description, genre, release_year, platform, rating, developer_id } = data;

    // Check if developer exists
    const [devRows] = await pool.query('SELECT id FROM developers WHERE id = ?', [developer_id]);
    if (devRows.length === 0) {
      throw new Error('Developer does not exist');
    }

    const [result] = await pool.query(
      'INSERT INTO games (title, description, genre, release_year, platform, rating, developer_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, genre, release_year, platform, rating, developer_id]
    );
    
    // Update developer's game count
    await pool.query(
      'UPDATE developers SET game_count = game_count + 1 WHERE id = ?',
      [developer_id]
    );
    
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const { title, description, genre, release_year, platform, rating, developer_id } = data;

    // Get old developer_id
    const [oldGame] = await pool.query('SELECT developer_id FROM games WHERE id = ?', [id]);
    const oldDeveloperId = oldGame[0]?.developer_id;

    // Check if developer exists
    const [devRows] = await pool.query('SELECT id FROM developers WHERE id = ?', [developer_id]);
    if (devRows.length === 0) {
      throw new Error('Developer does not exist');
    }

    await pool.query(
      'UPDATE games SET title = ?, description = ?, genre = ?, release_year = ?, platform = ?, rating = ?, developer_id = ? WHERE id = ?',
      [title, description, genre, release_year, platform, rating, developer_id, id]
    );
    
    // Update game counts if developer changed
    if (oldDeveloperId && oldDeveloperId !== developer_id) {
      await pool.query('UPDATE developers SET game_count = game_count - 1 WHERE id = ?', [oldDeveloperId]);
      await pool.query('UPDATE developers SET game_count = game_count + 1 WHERE id = ?', [developer_id]);
    }
    
    return { id, ...data };
  }

  static async delete(id) {
    // Get developer_id before deleting
    const [game] = await pool.query('SELECT developer_id FROM games WHERE id = ?', [id]);
    const developerId = game[0]?.developer_id;
    
    await pool.query('DELETE FROM games WHERE id = ?', [id]);
    
    // Update developer's game count
    if (developerId) {
      await pool.query(
        'UPDATE developers SET game_count = game_count - 1 WHERE id = ?',
        [developerId]
      );
    }
    
    return { id };
  }
}

module.exports = Game;
