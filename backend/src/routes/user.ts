import { Router } from 'express';
import { updatePreferences } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Protect all routes in this file
router.use(authenticateToken);

router.put('/preferences', updatePreferences);

export default router;
