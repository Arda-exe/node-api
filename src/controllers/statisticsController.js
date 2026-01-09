const Statistics = require('../models/Statistics');

exports.getStatistics = async (req, res) => {
  try {
    const stats = await Statistics.getAll();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
