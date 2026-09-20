import { Router } from 'express';
import {
  createMonitor,
  getMonitors,
  getMonitorById,
  getMonitorLogs,
  updateMonitor,
  deleteMonitor,
} from '../controllers/monitorController';
import { asyncHandler } from '../utils/asyncHandler';

const router: Router = Router();

router.route('/').post(asyncHandler(createMonitor)).get(asyncHandler(getMonitors));

router
  .route('/:id')
  .get(asyncHandler(getMonitorById))
  .put(asyncHandler(updateMonitor))
  .delete(asyncHandler(deleteMonitor));

router.get('/:id/logs', asyncHandler(getMonitorLogs));

export default router;
