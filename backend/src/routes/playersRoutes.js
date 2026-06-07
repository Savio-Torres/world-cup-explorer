import express from 'express';
import {
  getAllPlayers,
  getPlayerById,
  getTopPlayers,
  getPlayersByCountry,
  getPlayersStats
} from '../controllers/playersController.js';

const router = express.Router();

router.get('/stats', getPlayersStats);
router.get('/top', getTopPlayers);
router.get('/country/:countryId', getPlayersByCountry);
router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);

export default router;
