import axios from 'axios';

export const getMarketNews = async () => {
  try {
    const apiKey = process.env.CRYPTOPANIC_API_KEY;
    
    if (!apiKey) {
      const [cointelegraph, coindesk] = await Promise.all([
        axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcointelegraph.com%2Frss').catch(() => ({ data: { items: [] } })),
        axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.coindesk.com%2Farc%2Foutboundfeeds%2Frss%2F').catch(() => ({ data: { items: [] } }))
      ]);
      
      const articles = [...cointelegraph.data.items, ...coindesk.data.items];
      
      return articles.map((item: any) => ({
        title: item.title,
        domain: item.link.includes('coindesk') ? 'coindesk.com' : 'cointelegraph.com',
        url: item.link
      })).sort(() => Math.random() - 0.5); // Shuffle them a bit
    }

    const response = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&public=true`);
    return response.data.results.slice(0, 20);
  } catch (error) {
    console.error('News API error:', error);
    return [];
  }
};
