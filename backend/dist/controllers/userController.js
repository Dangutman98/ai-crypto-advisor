"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePinnedCoins = exports.updatePreferences = void 0;
const db_1 = require("../db");
const updatePreferences = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { assets, investorType, contentPrefs } = req.body;
        const user = await db_1.prisma.user.update({
            where: { id: userId },
            data: {
                assets: assets || null,
                investorType: investorType || null,
                contentPrefs: contentPrefs || null,
            },
        });
        res.json({ message: 'Preferences updated successfully', user });
    }
    catch (error) {
        console.error('Update preferences error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updatePreferences = updatePreferences;
const updatePinnedCoins = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { pinnedCoins } = req.body;
        const user = await db_1.prisma.user.update({
            where: { id: userId },
            data: {
                pinnedCoins: pinnedCoins || null,
            },
        });
        res.json({ message: 'Pinned coins updated successfully', user });
    }
    catch (error) {
        console.error('Update pinned coins error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updatePinnedCoins = updatePinnedCoins;
