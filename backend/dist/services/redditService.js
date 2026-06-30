"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeme = void 0;
const axios_1 = __importDefault(require("axios"));
const getMeme = async () => {
    try {
        const response = await axios_1.default.get('https://meme-api.com/gimme/cryptocurrencymemes');
        if (response.data && response.data.url) {
            return { title: response.data.title, url: response.data.url };
        }
        throw new Error('No images found in top posts');
    }
    catch (error) {
        console.error('Meme API error:', error);
        const fallbacks = [
            { title: 'When you buy the dip but it keeps dipping', url: 'https://i.imgflip.com/1ur9b0.jpg' },
            { title: 'To the moon!', url: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { title: 'Checking my portfolio', url: 'https://images.unsplash.com/photo-1622630998477-20b41cd0e071?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { title: 'HODL', url: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
};
exports.getMeme = getMeme;
