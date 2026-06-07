import express from 'express';
import {
  getAllCountries,
  getCountryById,
  getCountryMeta,
  getCountriesGrouped,
  getCountriesStats,
  getCountryPlayers
} from '../controllers/countriesController.js';

const router = express.Router();

// Rotas específicas devem vir antes de rotas com parâmetros
router.get('/grouped', getCountriesGrouped);
router.get('/stats', getCountriesStats);
router.get('/', getAllCountries);
router.get('/:id/meta', getCountryMeta);
router.get('/:id/players', getCountryPlayers);
router.get('/:id', getCountryById);

export default router;
