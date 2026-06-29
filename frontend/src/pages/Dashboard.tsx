import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { ThumbsUp, ThumbsDown, TrendingUp, TrendingDown, Newspaper, Lightbulb, Image as ImageIcon, LogOut, Star } from 'lucide-react';

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState<Record<string, 'UP' | 'DOWN'>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedCoins, setPinnedCoins] = useState<string[]>([]);
  const navigate = useNavigate();

  // Filter prices based on search query
  let filteredPrices = Array.isArray(data?.prices) 
    ? data.prices.filter((coin: any) => 
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : [];

  // Sort pinned coins to the top
  if (filteredPrices.length > 0) {
    filteredPrices = filteredPrices.sort((a: any, b: any) => {
      const aPinned = pinnedCoins.includes(a.id);
      const bPinned = pinnedCoins.includes(b.id);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return 0;
    });
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleFeedback = async (contentId: string, contentType: string, voteType: 'UP' | 'DOWN') => {
    const isCurrentlyVoted = votes[contentId] === voteType;
    
    setVotes(prev => {
      const newVotes = { ...prev };
      if (isCurrentlyVoted) {
        delete newVotes[contentId];
      } else {
        newVotes[contentId] = voteType;
      }
      return newVotes;
    });

    try {
      if (!isCurrentlyVoted) {
        await api.post('/feedback', { contentId, contentType, voteType });
      }
    } catch (error) {
      console.error('Failed to submit feedback', error);
    }
  };

  const togglePin = (coinId: string) => {
    setPinnedCoins(prev => 
      prev.includes(coinId) ? prev.filter(id => id !== coinId) : [...prev, coinId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <h2 className="text-gradient animate-fade-in">Loading your tailored insights...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <h2 style={{ color: 'var(--danger)' }}>Failed to load dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Your AI Crypto Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tailored specifically for your investment style.</p>
        </div>
        <button onClick={handleLogout} className="btn-primary" style={{ background: '#09090b', color: 'var(--danger)', border: '1px solid var(--panel-border)' }}>
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
      
      {/* Top Section: Meme & Insight */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Meme Widget */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <ImageIcon size={24} color="var(--text-main)" /> Daily Crypto Meme
          </h2>
          <div style={{ flex: 1, background: 'var(--bg-color)', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontWeight: 500, marginBottom: '16px', textAlign: 'center' }}>{data.meme?.title}</p>
            <img src={data.meme?.url} alt="Meme" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px', objectFit: 'contain' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <button onClick={() => handleFeedback('meme_daily', 'meme', 'UP')} style={{ background: 'none', border: 'none', color: votes['meme_daily'] === 'UP' ? 'var(--text-main)' : 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}><ThumbsUp size={20} fill={votes['meme_daily'] === 'UP' ? 'currentColor' : 'none'} /></button>
            <button onClick={() => handleFeedback('meme_daily', 'meme', 'DOWN')} style={{ background: 'none', border: 'none', color: votes['meme_daily'] === 'DOWN' ? 'var(--danger)' : 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}><ThumbsDown size={20} fill={votes['meme_daily'] === 'DOWN' ? 'currentColor' : 'none'} /></button>
          </div>
        </div>

        {/* AI Insight Widget */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Lightbulb size={24} color="var(--text-main)" /> AI Insight of the Day
          </h2>
          <div style={{ flex: 1, fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--text-main)', fontStyle: 'italic', background: 'var(--bg-color)', padding: '24px', borderRadius: '8px', borderLeft: '4px solid var(--text-main)' }}>
            "{data.insight}"
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
            <button onClick={() => handleFeedback('insight_daily', 'insight', 'UP')} style={{ background: 'none', border: 'none', color: votes['insight_daily'] === 'UP' ? 'var(--text-main)' : 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}><ThumbsUp size={20} fill={votes['insight_daily'] === 'UP' ? 'currentColor' : 'none'} /></button>
            <button onClick={() => handleFeedback('insight_daily', 'insight', 'DOWN')} style={{ background: 'none', border: 'none', color: votes['insight_daily'] === 'DOWN' ? 'var(--danger)' : 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}><ThumbsDown size={20} fill={votes['insight_daily'] === 'DOWN' ? 'currentColor' : 'none'} /></button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Markets & News */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Prices Widget */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '16px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
              <TrendingUp size={24} color="var(--text-main)" /> Live Prices
            </h2>
            <input 
              type="text" 
              placeholder="Search coin..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 12px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid var(--panel-border)',
                borderRadius: '6px',
                color: 'white',
                fontSize: '0.9rem',
                fontFamily: 'Outfit, sans-serif',
                width: '100%',
                maxWidth: '200px'
              }}
            />
          </div>
          <div style={{ overflowY: 'auto', paddingRight: '8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredPrices.map((coin: any) => (
              <div key={coin.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button 
                    onClick={() => togglePin(coin.id)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                      color: pinnedCoins.includes(coin.id) ? '#fbbf24' : 'var(--text-muted)'
                    }}
                    title={pinnedCoins.includes(coin.id) ? 'Unpin' : 'Pin to top'}
                  >
                    <Star size={18} fill={pinnedCoins.includes(coin.id) ? '#fbbf24' : 'none'} />
                  </button>
                  {coin.image && <img src={coin.image} alt={coin.name} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />}
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{coin.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{coin.symbol}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="numeric" style={{ fontSize: '1.2rem', fontWeight: 500 }}>${coin.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</div>
                  <div className="numeric" style={{ color: coin.price_change_percentage_24h >= 0 ? 'var(--success)' : 'var(--danger)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                    {coin.price_change_percentage_24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
            {filteredPrices.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {searchQuery ? (
                  <span>No coins found matching "{searchQuery}"</span>
                ) : (
                  <>
                    <span style={{ color: 'var(--danger)', fontWeight: 500 }}>Failed to connect to backend</span>
                    <span style={{ fontSize: '0.9rem' }}>Please verify your API URL is correct and the server is running.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Market News Widget */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '500px' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <Newspaper size={24} color="var(--text-main)" /> Market News
          </h2>
          <div style={{ overflowY: 'auto', paddingRight: '8px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Array.isArray(data.news) ? data.news.map((item: any, i: number) => (
              <div key={i} style={{ padding: '16px', background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--panel-border)' }}>
                <a href={item.url} target="_blank" rel="noreferrer" style={{ fontSize: '1.05rem', fontWeight: 500, display: 'block', marginBottom: '8px', lineHeight: 1.4 }}>{item.title}</a>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.domain}</span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => handleFeedback(`news_${i}`, 'news', 'UP')} style={{ background: 'none', border: 'none', color: votes[`news_${i}`] === 'UP' ? 'var(--text-main)' : 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}><ThumbsUp size={16} fill={votes[`news_${i}`] === 'UP' ? 'currentColor' : 'none'} /></button>
                    <button onClick={() => handleFeedback(`news_${i}`, 'news', 'DOWN')} style={{ background: 'none', border: 'none', color: votes[`news_${i}`] === 'DOWN' ? 'var(--danger)' : 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s' }}><ThumbsDown size={16} fill={votes[`news_${i}`] === 'DOWN' ? 'currentColor' : 'none'} /></button>
                  </div>
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>No news available</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
