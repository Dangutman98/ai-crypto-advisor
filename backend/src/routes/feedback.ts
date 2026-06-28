import { Router } from 'express';
import { submitFeedback } from '../controllers/feedbackController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
router.use(authenticateToken);
router.post('/', submitFeedback);

export default router;
