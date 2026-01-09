const Developer = require('../models/Developer');

exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.getAll();
    res.json(developers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDeveloperById = async (req, res) => {
  try {
    const developer = await Developer.getById(req.params.id);
    if (!developer) {
      return res.status(404).json({ error: 'Developer not found' });
    }
    res.json(developer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDeveloper = async (req, res) => {
  try {
    const developer = await Developer.create(req.body);
    res.status(201).json(developer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDeveloper = async (req, res) => {
  try {
    const developer = await Developer.getById(req.params.id);
    if (!developer) {
      return res.status(404).json({ error: 'Developer not found' });
    }
    const updated = await Developer.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDeveloper = async (req, res) => {
  try {
    const developer = await Developer.getById(req.params.id);
    if (!developer) {
      return res.status(404).json({ error: 'Developer not found' });
    }
    await Developer.delete(req.params.id);
    res.json({ message: 'Developer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
