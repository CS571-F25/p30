// src/pages/ProfilePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDocuments, getDocumentById, queryDocuments } from '../firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import StockModal from '../components/StockModal';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSellMode, setIsSellMode] = useState(false);

  const fetchHoldings = useCallback(async () => {
    if (!currentUser) {
      setHoldings([]);
      return;
    }
    
    try {
      const userHoldings = await queryDocuments('holdings', [
        ['userId', '==', currentUser.uid]
      ]).catch(() => []);
      setHoldings(userHoldings);
    } catch (err) {
      console.error('Error fetching holdings:', err);
      setHoldings([]);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        
        // Fetch user profile from Firestore (if you're storing additional data)
        // Or use currentUser from Firebase Auth
        const user = await getDocumentById('users', currentUser.uid).catch(() => null);
        
        // Combine Firebase Auth user with Firestore data
        setUserData({
          name: user?.name || currentUser.displayName || 'User',
          email: currentUser.email,
          totalAssets: user?.totalAssets || '0',
          return: user?.return || '0%'
        });
        
        // Fetch user-specific holdings
        await fetchHoldings();
        
        setError(null);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, fetchHoldings]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleStockClick = (stock, sellMode = false) => {
    setSelectedStock(stock);
    setIsSellMode(sellMode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSellMode(false);
    setTimeout(() => setSelectedStock(null), 300);
  };

  if (loading) {
    return (
      <main className="main-content">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <div style={{ 
          padding: '1rem', 
          margin: '1rem', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px'
        }}>
          <p style={{ color: '#c00' }}>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      {/* 1. User Info */}
      <section className="user-info">
        <div className="user-profile">
          <div className="profile-content">
            <div className="profile-top-row">
              <div className="profile-image-container">
                <div className="profile-image">
                  <span className="profile-icon">👤</span>
                </div>
              </div>
              <div className="user-details">
                <h2 className="user-name">{userData?.name || 'User'}</h2>
                <p className="user-email">{userData?.email || 'user@example.com'}</p>
              </div>
            </div>
            <div className="profile-bottom-row">
              <div className="user-stats">
                <span className="stat-item">
                  <strong>Total Assets:</strong> ${userData?.totalAssets || '0'}
                </span>
                <span className="stat-item">
                  <strong>Return:</strong> {userData?.return || '0%'}
                </span>
              </div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </section>

      {/* 2. Portfolio Summary */}
      <section className="portfolio-summary">
        <h2 className="section-title">Portfolio Summary</h2>
        <div className="portfolio-cards">
          <div className="portfolio-card">
            <h3>Holdings</h3>
            <div className="card-content">
              <span className="card-value">8 stocks</span>
              <span className="card-change positive">+2 new</span>
            </div>
          </div>
          <div className="portfolio-card">
            <h3>Total Investment</h3>
            <div className="card-content">
              <span className="card-value">$104,000</span>
              <span className="card-change positive">+$4,200</span>
            </div>
          </div>
          <div className="portfolio-card">
            <h3>Gain/Loss</h3>
            <div className="card-content">
              <span className="card-value">$21,000</span>
              <span className="card-change positive">+20.0%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Holdings List */}
      <section className="holdings">
        <h2 className="section-title">My Holdings</h2>
        <div className="holdings-table">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Shares</th>
                <th>Avg Price</th>
                <th>Current Price</th>
                <th>Gain/Loss</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {holdings.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                    No holdings found. Add holdings to your Firebase database.
                  </td>
                </tr>
              ) : (
                holdings.map((holding) => {
                  const avgPrice = parseFloat(holding.avgBuyPrice?.replace('$', '') || 0);
                  const currentPrice = parseFloat(holding.currentPrice?.replace('$', '') || 0);
                  const shares = holding.shares || 0;
                  const totalValue = currentPrice * shares;
                  const totalCost = avgPrice * shares;
                  const gainLoss = totalValue - totalCost;
                  const returnPercent = totalCost > 0 ? ((gainLoss / totalCost) * 100) : 0;
                  const isPositive = gainLoss >= 0;
                  
                  // Create a complete stock object with all necessary fields
                  const stockData = {
                    ...holding,
                    price: holding.currentPrice,
                    change: holding.change || '$0.00',
                    changePercent: holding.changePercent || '0.00%',
                    isPositive: isPositive,
                    volume: holding.volume || 'N/A',
                    marketCap: holding.marketCap || 'N/A',
                    dayHigh: holding.dayHigh,
                    dayLow: holding.dayLow
                  };
                  
                  return (
                    <tr 
                      key={holding.id}
                      onClick={() => handleStockClick(stockData, true)}
                      style={{ cursor: 'pointer' }}
                      className="stock-row-clickable"
                    >
                      <td>
                        <div className="stock-info">
                          <span className="stock-name">{holding.name || 'N/A'}</span>
                          <span className="stock-code">{holding.code || 'N/A'}</span>
                        </div>
                      </td>
                      <td>{shares} shares</td>
                      <td>{holding.avgBuyPrice || '$0.00'}</td>
                      <td>{holding.currentPrice || '$0.00'}</td>
                      <td className={isPositive ? 'positive' : 'negative'}>
                        {isPositive ? '+' : ''}${Math.abs(gainLoss).toFixed(2)}
                      </td>
                      <td className={isPositive ? 'positive' : 'negative'}>
                        {isPositive ? '+' : ''}{returnPercent.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Account Settings */}
      <section>
        <h2 className="section-title">Account Settings</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <h4>Notification Settings</h4>
            <p>Email alerts enabled</p>
            <button>Manage</button>
          </div>
          <div className="summary-card">
            <h4>Security</h4>
            <p>Two-factor auth enabled</p>
            <button>Update</button>
          </div>
          <div className="summary-card">
            <h4>Security</h4>
            <p>Update Password</p>
            <button>Update</button>
          </div>
          <div className="summary-card">
            <h4>Language</h4>
            <p>English (US)</p>
            <button>Change</button>
          </div>
        </div>
      </section>

      {/* Stock Detail Modal */}
      <StockModal 
        stock={selectedStock}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onHoldingsUpdate={fetchHoldings}
        isSellMode={isSellMode}
      />
    </main>
  );
}
