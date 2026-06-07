import express from 'express';
import {
  getInfo,
  getOverview,
  getStats,
  getHosts,
  getSchedule,
  getTimeline
} from '../controllers/worldCupController.js';

const router = express.Router();

router.get('/overview', getOverview);
router.get('/stats', getStats);
router.get('/hosts', getHosts);
router.get('/schedule', getSchedule);
router.get('/timeline', getTimeline);
router.get('/', getInfo);

export default router;
