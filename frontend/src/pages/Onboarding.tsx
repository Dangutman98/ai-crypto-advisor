import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const POPULAR_COINS = [
  { id: 'bitcoin', label: 'Bitcoin (BTC)' },
  { id: 'ethereum', label: 'Ethereum (ETH)' },
  { id: 'solana', label: 'Solana (SOL)' },
  { id: 'ripple', label: 'Ripple (XRP)' },
  { id: 'cardano', label: 'Cardano (ADA)' },
  { id: 'dogecoin', label: 'Dogecoin (DOGE)' },
  { id: 'polkadot', label: 'Polkadot (DOT)' },
  { id: 'chainlink', label: 'Chainlink (LINK)' }
];

const CONTENT_PREFERENCES = [
  { id: 'hot', label: 'Hot Trends' },
  { id: 'bullish', label: 'Bullish Signals' },
  { id: 'bearish', label: 'Bearish Alerts' },
  { id: 'important', label: 'Important News' },
  { id: 'memes', label: 'Memes & Fun' }
];

const Onboarding = () => {
  const [selectedCoins, setSelectedCoins] = useState<string[]>(['bitcoin']);
  const [investorType, setInvestorType] = useState('HODLer');
  const [selectedContent, setSelectedContent] = useState<string[]>(['hot', 'important']);
  const [loading, setLoading] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/user/preferences', {
        assets: selectedCoins.join(','),
        investorType,
        contentPrefs: selectedContent.join(','),
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to save preferences', err);
      setLoading(false);
    }
  };

  const investorOptions = [
    { value: 'HODLer', label: 'HODLer (Long-term)' },
    { value: 'Day Trader', label: 'Day Trader (Short-term)' },
    { value: 'NFT Collector', label: 'NFT Collector' },
    { value: 'DeFi Degen', label: 'DeFi Degen' }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '20px' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '8px' }}>Let's get personal</h1>
          <p style={{ color: 'var(--text-muted)' }}>Tell us about your crypto journey so we can tailor your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>1. What crypto assets are you interested in?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {POPULAR_COINS.map(coin => {
                const isSelected = selectedCoins.includes(coin.id);
                return (
                  <button
                    key={coin.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        if (selectedCoins.length > 1) {
                          setSelectedCoins(selectedCoins.filter(c => c !== coin.id));
                        }
                      } else {
                        setSelectedCoins([...selectedCoins, coin.id]);
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: `1px solid ${isSelected ? '#ffffff' : 'var(--panel-border)'}`,
                      background: isSelected ? '#ffffff' : '#09090b',
                      color: isSelected ? '#000000' : 'var(--text-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: isSelected ? 500 : 400
                    }}
                  >
                    {coin.label}
                  </button>
                );
              })}
            </div>
            {selectedCoins.length === 0 && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '8px' }}>Please select at least one asset.</p>}
          </div>

          <div className="input-group" style={{ position: 'relative' }}>
            <label>2. What type of investor are you?</label>
            <div 
              className="input-field"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>{investorOptions.find(o => o.value === investorType)?.label}</span>
              <span style={{ transform: isSelectOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
            </div>
            {isSelectOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#09090b',
                border: '1px solid var(--panel-border)',
                borderRadius: '8px',
                marginTop: '4px',
                zIndex: 10,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
              }}>
                {investorOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setInvestorType(option.value);
                      setIsSelectOpen(false);
                    }}
                    style={{
                      padding: '12px 16px',
                      cursor: 'pointer',
                      background: investorType === option.value ? 'rgba(255,255,255,0.1)' : 'transparent',
                      color: investorType === option.value ? '#ffffff' : 'var(--text-muted)',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.background = investorType === option.value ? 'rgba(255,255,255,0.1)' : 'transparent'}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label>3. What kind of content do you want to see?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              {CONTENT_PREFERENCES.map(pref => {
                const isSelected = selectedContent.includes(pref.id);
                return (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        if (selectedContent.length > 1) {
                          setSelectedContent(selectedContent.filter(c => c !== pref.id));
                        }
                      } else {
                        setSelectedContent([...selectedContent, pref.id]);
                      }
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: `1px solid ${isSelected ? '#ffffff' : 'var(--panel-border)'}`,
                      background: isSelected ? '#ffffff' : '#09090b',
                      color: isSelected ? '#000000' : 'var(--text-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: isSelected ? 500 : 400
                    }}
                  >
                    {pref.label}
                  </button>
                );
              })}
            </div>
            {selectedContent.length === 0 && <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '8px' }}>Please select at least one content preference.</p>}
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Saving...' : 'Go to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
