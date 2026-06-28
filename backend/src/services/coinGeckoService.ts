import axios from 'axios';

const symbolToId: Record<string, string> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  sol: 'solana',
  ada: 'cardano',
  doge: 'dogecoin',
  xrp: 'ripple',
  dot: 'polkadot',
  bnb: 'binancecoin',
  matic: 'matic-network',
  link: 'chainlink'
};

export const getCoinPrices = async (assets: string) => {
  try {
    let idsStr = 'bitcoin,ethereum';
    if (assets) {
      const parts = assets.split(',').map(s => s.trim().toLowerCase());
      const mappedIds = parts.map(p => symbolToId[p] || p);
      idsStr = mappedIds.join(',');
    }

    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${idsStr}&vs_currencies=usd&include_24hr_change=true`);
    
    // If CoinGecko didn't recognize any of the user's coins, fallback to BTC/ETH
    if (Object.keys(response.data).length === 0) {
      const fallback = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true`);
      return fallback.data;
    }

    return response.data;
  } catch (error) {
    console.error('CoinGecko error:', error);
    return { error: 'Failed to fetch coin prices' };
  }
};
