import { Response } from 'express';
import { prisma } from '../db';

export const submitFeedback = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { contentId, contentType, voteType } = req.body;

    if (!contentId || !contentType || !voteType) {
      return res.status(400).json({ error: 'Missing required fields (contentId, contentType, voteType)' });
    }

    const feedback = await prisma.feedback.create({
      data: {
        userId,
        contentId,
        contentType,
        voteType
      }
    });

    res.status(201).json({ message: 'Feedback saved successfully', feedback });
  } catch (error) {
    console.error('Feedback error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
