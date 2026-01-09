const express = require('express');
const router = express.Router();
const developersController = require('../controllers/developersController');

router.get('/', developersController.getAllDevelopers);
router.get('/:id', developersController.getDeveloperById);
router.post('/', developersController.createDeveloper);
router.put('/:id', developersController.updateDeveloper);
router.delete('/:id', developersController.deleteDeveloper);

module.exports = router;
