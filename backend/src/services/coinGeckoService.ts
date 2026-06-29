import axios from 'axios';

export const getCoinPrices = async (assets: string) => {
  try {
    // Fetch top 100 coins with their icons and 24h change
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    
    // We will return the array directly to the frontend
    const coinsList = response.data.map((coin: any) => ({
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
      const selectedCoins = coinsList.filter((c: any) => selectedIds.includes(c.id));
      const otherCoins = coinsList.filter((c: any) => !selectedIds.includes(c.id));
      return [...selectedCoins, ...otherCoins];
    }

    return coinsList;
  } catch (error) {
    console.error('CoinGecko error:', error);
    return { error: 'Failed to fetch coin prices' };
  }
};
