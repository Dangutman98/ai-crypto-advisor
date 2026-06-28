import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboardController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
router.use(authenticateToken);
router.get('/', getDashboardData);

export default router;
