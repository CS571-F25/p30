// src/pages/StockPage.jsx
import React, { useState, useEffect } from 'react';
import { getAllDocuments, queryDocuments } from '../firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import StockModal from '../components/StockModal';

export default function StockPage() {
  const { currentUser } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [stockData, setStockData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedStock(null), 300); // Clear after animation
  };

  // Fetch stocks from Firebase
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const stocks = await getAllDocuments('stocks');
        setStockData(stocks);
        setError(null);
      } catch (err) {
        console.error('Error fetching stocks:', err);
        setError('Failed to load stocks. Please check your Firebase configuration.');
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  // Fetch user's watchlist from Firebase
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!currentUser) {
        setWatchlist([]);
        return;
      }

      try {
        const userWatchlist = await queryDocuments('watchlist', [
          ['userId', '==', currentUser.uid]
        ]);
        setWatchlist(userWatchlist);
      } catch (err) {
        console.error('Error fetching watchlist:', err);
        setWatchlist([]);
      }
    };

    fetchWatchlist();
  }, [currentUser]);

  // Calculate top gainers (stocks with positive change, sorted by percentage)
  const topGainers = stockData
    .filter(stock => stock.isPositive)
    .sort((a, b) => {
      const aPercent = parseFloat(a.changePercent?.replace(/[+%]/g, '') || 0);
      const bPercent = parseFloat(b.changePercent?.replace(/[+%]/g, '') || 0);
      return bPercent - aPercent;
    })
    .slice(0, 3);

  // Calculate top losers (stocks with negative change, sorted by percentage)
  const topLosers = stockData
    .filter(stock => !stock.isPositive)
    .sort((a, b) => {
      const aPercent = parseFloat(a.changePercent?.replace(/[-+%]/g, '') || 0);
      const bPercent = parseFloat(b.changePercent?.replace(/[-+%]/g, '') || 0);
      return bPercent - aPercent;
    })
    .slice(0, 3);

  return (
    <main className="main-content">
      {/* Loading and Error States */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading stocks...</p>
        </div>
      )}
      
      {error && (
        <div style={{ 
          padding: '1rem', 
          margin: '1rem', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px'
        }}>
          <p style={{ color: '#c00' }}>{error}</p>
        </div>
      )}

      {/* 1. Search and Filter Section */}
      <section className="stock-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by stock name or ticker symbol"
            className="stock-search-input"
          />
          <button>Search</button>
        </div>
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'nyse' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('nyse')}
          >
            NYSE
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'nasdaq' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('nasdaq')}
          >
            NASDAQ
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'favorite' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('favorite')}
          >
            Watchlist
          </button>
        </div>
      </section>

      {/* 2. Major Indices */}
      <section className="market-indices">
        <h2 className="section-title">Major Indices</h2>
        <div className="indices-grid">
          <div className="index-card">
            <div className="index-header">
              <h3>S&P 500</h3>
              <span className="index-code">SPX</span>
            </div>
            <div className="index-value">
              <span className="current-value">4,845.50</span>
              <span className="change positive">+28.30 (+0.58%)</span>
            </div>
            <div className="index-details">
              <span>High: 4,858.20</span>
              <span>Low: 4,831.40</span>
            </div>
          </div>

          <div className="index-card">
            <div className="index-header">
              <h3>NASDAQ</h3>
              <span className="index-code">IXIC</span>
            </div>
            <div className="index-value">
              <span className="current-value">15,282.75</span>
              <span className="change negative">-58.25 (-0.38%)</span>
            </div>
            <div className="index-details">
              <span>High: 15,358.90</span>
              <span>Low: 15,250.10</span>
            </div>
          </div>

          <div className="index-card">
            <div className="index-header">
              <h3>Dow Jones</h3>
              <span className="index-code">DJI</span>
            </div>
            <div className="index-value">
              <span className="current-value">37,652.45</span>
              <span className="change positive">+229.15 (+0.61%)</span>
            </div>
            <div className="index-details">
              <span>High: 37,754.20</span>
              <span>Low: 37,550.30</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Popular Stocks Table */}
      <section>
        <div className="table-header">
          <h2 className="section-title">Popular Stocks</h2>
          <div className="table-controls">
            <select className="sort-select">
              <option>Volume</option>
              <option>Change %</option>
              <option>Market Cap</option>
            </select>
            <button className="refresh-btn">Refresh</button>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Price</th>
              <th>Change</th>
              <th>Change %</th>
              <th>Volume</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {stockData.length === 0 && !loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                  No stocks available. Add stocks to your Firebase database.
                </td>
              </tr>
            ) : (
              stockData.map((stock) => (
                <tr 
                  key={stock.id} 
                  onClick={() => handleStockClick(stock)}
                  style={{ cursor: 'pointer' }}
                  className="stock-row-clickable"
                >
                  <td>
                    <div className="stock-info">
                      <span className="stock-name">{stock.name || 'N/A'}</span>
                      <span className="stock-code">{stock.code || 'N/A'}</span>
                    </div>
                  </td>
                  <td><strong>{stock.price || '$0.00'}</strong></td>
                  <td className={stock.isPositive ? 'positive' : 'negative'}>
                    {stock.change || '$0.00'}
                  </td>
                  <td className={stock.isPositive ? 'positive' : 'negative'}>
                    {stock.changePercent || '0.00%'}
                  </td>
                  <td>{stock.volume || '0'}</td>
                  <td>{stock.marketCap || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* 4. Gainers/Losers */}
      <section>
        <h2 className="section-title">Top Gainers & Losers</h2>
        <div className="movers-container">
          <div className="gainers">
            <h3>Top Gainers</h3>
            <div className="movers-list">
              {topGainers.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>
                  No gainers available
                </p>
              ) : (
                topGainers.map((stock) => (
                  <div 
                    key={stock.id}
                    className="mover-item"
                    onClick={() => handleStockClick(stock)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="stock-info">
                      <span className="stock-name">{stock.name}</span>
                      <span className="stock-code">{stock.code}</span>
                    </div>
                    <div className="stock-price">
                      <span className="current-price">{stock.price}</span>
                      <span className="price-change positive">{stock.changePercent}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="losers">
            <h3>Top Losers</h3>
            <div className="movers-list">
              {topLosers.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', padding: '1rem' }}>
                  No losers available
                </p>
              ) : (
                topLosers.map((stock) => (
                  <div 
                    key={stock.id}
                    className="mover-item"
                    onClick={() => handleStockClick(stock)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="stock-info">
                      <span className="stock-name">{stock.name}</span>
                      <span className="stock-code">{stock.code}</span>
                    </div>
                    <div className="stock-price">
                      <span className="current-price">{stock.price}</span>
                      <span className="price-change negative">{stock.changePercent}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Chart Area (placeholder) */}
      <section>
        <h2 className="section-title">Market Trends Chart</h2>
        <div className="chart-placeholder">
          <p>📊</p>
          <p>Chart will be displayed here</p>
        </div>
      </section>

      {/* 6. Watchlist */}
      <section className="watchlist">
        <h2 className="section-title">Watchlist</h2>
        <div className="watchlist-grid">
          {!currentUser ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <p style={{ marginBottom: '1rem', color: '#666' }}>
                🔒 Please login to view your watchlist
              </p>
            </div>
          ) : watchlist.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '2rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <p style={{ color: '#666' }}>
                📋 Your watchlist is empty. Click on any stock and add it to your watchlist!
              </p>
            </div>
          ) : (
            watchlist.map((item) => (
              <div 
                key={item.id}
                className="watchlist-item"
                onClick={() => handleStockClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <div className="stock-header">
                  <span className="stock-name">{item.name}</span>
                  <span className="stock-code">{item.code}</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">{item.price}</span>
                  <span className={`price-change ${item.isPositive ? 'positive' : 'negative'}`}>
                    {item.change} ({item.changePercent})
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Stock Detail Modal */}
      <StockModal 
        stock={selectedStock}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
