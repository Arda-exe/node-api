const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const { validateGame } = require('../middleware/validation');

router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGameById);
router.post('/', validateGame, gamesController.createGame);
router.put('/:id', validateGame, gamesController.updateGame);
router.delete('/:id', gamesController.deleteGame);

module.exports = router;
