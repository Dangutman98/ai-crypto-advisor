"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const getCoinPrices = async (assets) => {
    try {
        // Fetch top 100 coins with their icons and 24h change
        const response = await axios_1.default.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
        // We will return the array directly to the frontend
        const coinsList = response.data.map((coin) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h
        }));
        // If the user selected specific assets, we could filter or highlight them.
        // For now, let's return all 100 coins so the frontend can display them all,
        // but maybe move the user's selected assets to the top!
        if (assets) {
            const selectedIds = assets.split(',').map(s => s.trim().toLowerCase());
            const selectedCoins = coinsList.filter((c) => selectedIds.includes(c.id));
            const otherCoins = coinsList.filter((c) => !selectedIds.includes(c.id));
            return [...selectedCoins, ...otherCoins];
        }
        return coinsList;
    }
    catch (error) {
        console.error('CoinGecko error:', error);
        return { error: 'Failed to fetch coin prices' };
    }
};
exports.getCoinPrices = getCoinPrices;
