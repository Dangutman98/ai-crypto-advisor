"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const db_1 = require("../db");
const coinGeckoService_1 = require("../services/coinGeckoService");
const cryptoPanicService_1 = require("../services/cryptoPanicService");
const llmService_1 = require("../services/llmService");
const redditService_1 = require("../services/redditService");
const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await db_1.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Fetch all external APIs concurrently based on user preferences
        const [prices, news, insight, meme, feedbacks] = await Promise.all([
            (0, coinGeckoService_1.getCoinPrices)(user.assets || 'bitcoin,ethereum'),
            (0, cryptoPanicService_1.getMarketNews)(),
            (0, llmService_1.getDailyInsight)(user.investorType || 'HODLer', user.contentPrefs || 'general', user.pinnedCoins || user.assets || 'crypto'),
            (0, redditService_1.getMeme)(),
            db_1.prisma.feedback.findMany({ where: { userId } })
        ]);
        res.json({
            prices,
            news,
            insight,
            meme,
            pinnedCoins: user.pinnedCoins || '',
            feedbacks
        });
    }
    catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getDashboardData = getDashboardData;
