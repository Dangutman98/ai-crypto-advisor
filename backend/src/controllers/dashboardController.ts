import { Response } from 'express';
import { prisma } from '../db';
import { getCoinPrices } from '../services/coinGeckoService';
import { getMarketNews } from '../services/cryptoPanicService';
import { getDailyInsight } from '../services/llmService';
import { getMeme } from '../services/redditService';

export const getDashboardData = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch all external APIs concurrently based on user preferences
    const [prices, news, insight, meme] = await Promise.all([
      getCoinPrices(user.assets || 'bitcoin,ethereum'),
      getMarketNews(),
      getDailyInsight(user.investorType || 'HODLer'),
      getMeme()
    ]);

    res.json({
      prices,
      news,
      insight,
      meme,
      pinnedCoins: user.pinnedCoins || ''
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
