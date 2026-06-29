"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketNews = void 0;
const axios_1 = __importDefault(require("axios"));
const getMarketNews = async () => {
    try {
        const apiKey = process.env.CRYPTOPANIC_API_KEY;
        // If no CryptoPanic API key is provided, gracefully fallback to CryptoCompare's free public News API
        // This ensures the user gets REAL news with REAL links without needing an API key out of the box!
        if (!apiKey) {
            const response = await axios_1.default.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
            const articles = response.data.Data.slice(0, 20);
            return articles.map((item) => ({
                title: item.title,
                domain: item.source_info.name,
                url: item.url
            }));
        }
        // If they have an API key, use CryptoPanic as requested
        const response = await axios_1.default.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&public=true`);
        return response.data.results.slice(0, 20);
    }
    catch (error) {
        console.error('News API error:', error);
        return { error: 'Failed to fetch news' };
    }
};
exports.getMarketNews = getMarketNews;
