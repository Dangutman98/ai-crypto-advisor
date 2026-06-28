import axios from 'axios';

export const getMarketNews = async () => {
  try {
    const apiKey = process.env.CRYPTOPANIC_API_KEY;
    if (!apiKey) {
      // Static fallback if no API key is provided
      return [
        { title: 'Bitcoin Surges Past Key Resistance Level', domain: 'coindesk.com', url: '#' },
        { title: 'Ethereum Gas Fees Hit New Lows Following Upgrade', domain: 'decrypt.co', url: '#' },
        { title: 'Global Regulatory Clarity Expected Soon', domain: 'cointelegraph.com', url: '#' }
      ];
    }
    const response = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&public=true`);
    return response.data.results.slice(0, 5);
  } catch (error) {
    console.error('CryptoPanic error:', error);
    return { error: 'Failed to fetch news' };
  }
};
