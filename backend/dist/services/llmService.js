"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyInsight = void 0;
const axios_1 = __importDefault(require("axios"));
const getDailyInsight = async (investorType) => {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            // Fallback if no LLM key
            const fallbacks = [
                `As a ${investorType}, remember that market volatility is a feature, not a bug. Stay focused on your long-term strategy.`,
                `Patience is key for a ${investorType}. Look at the macro trends instead of getting caught up in the daily noise.`,
                `A smart ${investorType} knows when to zoom out. Historical cycles suggest we are exactly where we need to be.`,
                `Don't let emotions drive your decisions. As a ${investorType}, sticking to your original thesis is crucial right now.`,
                `The best opportunities often arise when fear is highest. Stay rational, ${investorType}.`,
                `Remember to secure your profits when possible. Even a ${investorType} needs a solid exit strategy.`,
                `Diversification isn't just a buzzword. Make sure your ${investorType} portfolio is balanced across multiple sectors.`
            ];
            // Pick a different insight each day of the month
            const dayOfMonth = new Date().getDate();
            return fallbacks[dayOfMonth % fallbacks.length];
        }
        const response = await axios_1.default.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'mistralai/mistral-7b-instruct:free',
            messages: [{ role: 'user', content: `Give me a 2-sentence crypto investing insight for a ${investorType}.` }],
        }, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.choices[0].message.content;
    }
    catch (error) {
        console.error('LLM error:', error);
        return 'Stay calm and HODL. The market rewards patience.';
    }
};
exports.getDailyInsight = getDailyInsight;
