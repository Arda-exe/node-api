const express = require('express');
const router = express.Router();
const developersController = require('../controllers/developersController');
const { validateDeveloper } = require('../middleware/validation');

router.get('/', developersController.getAllDevelopers);
router.get('/:id', developersController.getDeveloperById);
router.post('/', validateDeveloper, developersController.createDeveloper);
router.put('/:id', validateDeveloper, developersController.updateDeveloper);
router.delete('/:id', developersController.deleteDeveloper);

module.exports = router;
