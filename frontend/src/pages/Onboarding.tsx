import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Onboarding = () => {
  const [assets, setAssets] = useState('');
  const [investorType, setInvestorType] = useState('HODLer');
  const [contentPrefs, setContentPrefs] = useState('');
  const [loading, setLoading] = useState(false);
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
        assets,
        investorType,
        contentPrefs,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to save preferences', err);
      setLoading(false);
    }
  };

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
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g., BTC, ETH, SOL"
              value={assets}
              onChange={(e) => setAssets(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>2. What type of investor are you?</label>
            <select 
              className="input-field" 
              value={investorType}
              onChange={(e) => setInvestorType(e.target.value)}
              style={{ appearance: 'none', backgroundColor: 'rgba(0,0,0,0.4)', color: 'white' }}
            >
              <option value="HODLer" style={{ color: 'black' }}>HODLer (Long-term)</option>
              <option value="Day Trader" style={{ color: 'black' }}>Day Trader (Short-term)</option>
              <option value="NFT Collector" style={{ color: 'black' }}>NFT Collector</option>
              <option value="DeFi Degen" style={{ color: 'black' }}>DeFi Degen</option>
            </select>
          </div>

          <div className="input-group" style={{ marginBottom: '32px' }}>
            <label>3. What kind of content do you want to see?</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g., Market News, Charts, Social, Memes"
              value={contentPrefs}
              onChange={(e) => setContentPrefs(e.target.value)}
              required 
            />
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
