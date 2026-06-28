import { Response } from 'express';
import { prisma } from '../db';

export const updatePreferences = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { assets, investorType, contentPrefs } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        assets: assets || null,
        investorType: investorType || null,
        contentPrefs: contentPrefs || null,
      },
    });

    res.json({ message: 'Preferences updated successfully', user });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
