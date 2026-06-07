import express from 'express';
import {
  getAllMatches,
  getMatchById,
  getGroupStageMatches,
  getKnockoutMatches,
  getFinalMatches,
  getMatchesByCountry,
  getUpcomingMatches,
  getMatchesStats
} from '../controllers/matchesController.js';

const router = express.Router();

router.get('/stats', getMatchesStats);
router.get('/upcoming', getUpcomingMatches);
router.get('/group-stage', getGroupStageMatches);
router.get('/knockout', getKnockoutMatches);
router.get('/final', getFinalMatches);
router.get('/country/:countryId', getMatchesByCountry);
router.get('/', getAllMatches);
router.get('/:id', getMatchById);

export default router;