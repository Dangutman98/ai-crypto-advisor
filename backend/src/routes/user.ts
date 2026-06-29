import { Router } from 'express';
import { updatePreferences, updatePinnedCoins } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Protect all routes in this file
router.use(authenticateToken);

router.put('/preferences', updatePreferences);
router.put('/pinned', updatePinnedCoins);

export default router;
