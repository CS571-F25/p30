// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDocuments, getDocumentById, queryDocuments } from '../firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const userHoldings = await queryDocuments('holdings', [
          ['userId', '==', currentUser.uid]
        ]).catch(() => []);
        setHoldings(userHoldings);
        
        // Fetch user-specific transactions
        const userTransactions = await queryDocuments('transactions', [
          ['userId', '==', currentUser.uid]
        ], { 
          orderBy: { field: 'date', direction: 'desc' }
        }).catch(() => []);
        setTransactions(userTransactions);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
                  const gainLoss = parseFloat(holding.gainLoss || 0);
                  const isPositive = gainLoss >= 0;
                  return (
                    <tr key={holding.id}>
                      <td>
                        <div className="stock-info">
                          <span className="stock-name">{holding.name || 'N/A'}</span>
                          <span className="stock-code">{holding.code || 'N/A'}</span>
                        </div>
                      </td>
                      <td>{holding.shares || 0} shares</td>
                      <td>${holding.avgPrice || '0.00'}</td>
                      <td>${holding.currentPrice || '0.00'}</td>
                      <td className={isPositive ? 'positive' : 'negative'}>
                        {isPositive ? '+' : ''}${Math.abs(gainLoss).toFixed(2)}
                      </td>
                      <td className={isPositive ? 'positive' : 'negative'}>
                        {isPositive ? '+' : ''}{holding.returnPercent || '0.00'}%
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Recent Transaction History */}
      <section>
        <h2 className="section-title">Recent Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Stock</th>
              <th>Type</th>
              <th>Shares</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date || 'N/A'}</td>
                  <td>
                    <div className="stock-info">
                      <span className="stock-name">{transaction.name || 'N/A'}</span>
                      <span className="stock-code">{transaction.code || 'N/A'}</span>
                    </div>
                  </td>
                  <td>
                    <span className={transaction.type?.toLowerCase() || 'buy'}>
                      {transaction.type || 'Buy'}
                    </span>
                  </td>
                  <td>{transaction.shares || 0} shares</td>
                  <td>${transaction.price || '0.00'}</td>
                  <td>${transaction.amount || '0.00'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* 5. Account Settings */}
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
    </main>
  );
}
