// src/pages/StockPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getAllDocuments, queryDocuments } from '../firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import StockModal from '../components/StockModal';

export default function StockPage() {
  const { currentUser } = useAuth();
  const [stockData, setStockData] = useState([]);
  const [displayedStocks, setDisplayedStocks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('volume');
  const [isSellMode, setIsSellMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const handleStockClick = (stock, sellMode = false) => {
    setSelectedStock(stock);
    setIsSellMode(sellMode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSellMode(false);
    setTimeout(() => setSelectedStock(null), 300); // Clear after animation
  };

  // Fetch stocks from Firebase
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const stocks = await getAllDocuments('stocks');
        setStockData(stocks);
        setDisplayedStocks(stocks);
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
  const fetchWatchlist = useCallback(async () => {
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
  }, [currentUser]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  // Fetch user's holdings from Firebase
  const fetchHoldings = useCallback(async () => {
    if (!currentUser) {
      setHoldings([]);
      return;
    }

    try {
      const userHoldings = await queryDocuments('holdings', [
        ['userId', '==', currentUser.uid]
      ]);
      setHoldings(userHoldings);
    } catch (err) {
      console.error('Error fetching holdings:', err);
      setHoldings([]);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchHoldings();
  }, [fetchHoldings]);

  // Sort stocks based on selected criteria
  const sortStocks = useCallback((stocks, criteria) => {
    const sorted = [...stocks];
    
    switch (criteria) {
      case 'volume':
        return sorted.sort((a, b) => {
          const aVol = parseInt(a.volume?.replace(/[^0-9]/g, '') || 0);
          const bVol = parseInt(b.volume?.replace(/[^0-9]/g, '') || 0);
          return bVol - aVol;
        });
      
      case 'changePercent':
        return sorted.sort((a, b) => {
          const aPercent = parseFloat(a.changePercent?.replace(/[+%]/g, '') || 0);
          const bPercent = parseFloat(b.changePercent?.replace(/[+%]/g, '') || 0);
          return bPercent - aPercent;
        });
      
      case 'marketCap':
        return sorted.sort((a, b) => {
          // Convert market cap strings like "$2.5T" or "$500B" to numbers
          const parseMarketCap = (cap) => {
            if (!cap || cap === 'N/A') return 0;
            const value = parseFloat(cap.replace(/[$,]/g, ''));
            if (cap.includes('T')) return value * 1000000000000;
            if (cap.includes('B')) return value * 1000000000;
            if (cap.includes('M')) return value * 1000000;
            return value;
          };
          
          const aCap = parseMarketCap(a.marketCap);
          const bCap = parseMarketCap(b.marketCap);
          return bCap - aCap;
        });
      
      default:
        return sorted;
    }
  }, []);

  // Handle refresh button click
  const handleRefresh = () => {
    const sorted = sortStocks(stockData, sortBy);
    setDisplayedStocks(sorted);
  };

  // Update displayed stocks when sort option or search query changes
  useEffect(() => {
    let filtered = stockData;
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = stockData.filter(stock => {
        const name = (stock.name || '').toLowerCase();
        const code = (stock.code || '').toLowerCase();
        return name.includes(query) || code.includes(query);
      });
    }
    
    // Apply sorting
    const sorted = sortStocks(filtered, sortBy);
    setDisplayedStocks(sorted);
  }, [stockData, sortBy, sortStocks, searchQuery]);

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
      {/* Tab Navigation */}
      <section className="info-tabs">
        <div className="tab-container">
          <button 
            className={`info-tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('overview');
              setSearchQuery('');
            }}
          >
            Overview
          </button>
          <button 
            className={`info-tab ${activeTab === 'allStocks' ? 'active' : ''}`}
            onClick={() => setActiveTab('allStocks')}
          >
            All Stocks
          </button>
        </div>
      </section>

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

      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* 1. My Holdings */}
      <section>
        <h2 className="section-title">My Holdings</h2>
        {!currentUser ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <p style={{ color: '#666', margin: 0 }}>
              🔒 Please login to view your holdings
            </p>
          </div>
        ) : holdings.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
          }}>
            <p style={{ color: '#666', margin: 0 }}>
              💼 You don't have any stock holdings yet. Purchase stocks to see them here!
            </p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Shares</th>
                <th>Avg. Buy Price</th>
                <th>Current Price</th>
                <th>Total Value</th>
                <th>Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => {
                const avgPrice = parseFloat(holding.avgBuyPrice?.replace('$', '') || 0);
                const currentPrice = parseFloat(holding.currentPrice?.replace('$', '') || 0);
                const shares = holding.shares || 0;
                const totalValue = (currentPrice * shares).toFixed(2);
                const totalCost = (avgPrice * shares).toFixed(2);
                const gainLoss = (totalValue - totalCost).toFixed(2);
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
                    <td><strong>{shares}</strong></td>
                    <td>{holding.avgBuyPrice || '$0.00'}</td>
                    <td><strong>{holding.currentPrice || '$0.00'}</strong></td>
                    <td><strong>${totalValue}</strong></td>
                    <td className={isPositive ? 'positive' : 'negative'}>
                      {isPositive ? '+' : ''}${gainLoss}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      {/* 2. Watchlist */}
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
                onClick={() => handleStockClick(item, false)}
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

      {/* 3. Major Indices */}
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

        </>
      )}

      {/* All Stocks Tab Content */}
      {activeTab === 'allStocks' && (
        <>
          {/* Search Bar */}
          <section style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span 
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.2rem'
                  }}
                  aria-hidden="true"
                >
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search stocks by name or ticker symbol (e.g., Apple, AAPL, AA...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search stocks by name or ticker symbol"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 3rem',
                    fontSize: '1rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4a90e2'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <select 
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort stocks by criteria"
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '1rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    outline: 'none',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    minWidth: '180px'
                  }}
                >
                  <option value="volume">Sort by Volume</option>
                  <option value="changePercent">Sort by Change %</option>
                  <option value="marketCap">Sort by Market Cap</option>
                </select>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
            {searchQuery && (
              <div style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                {displayedStocks.length === 0 ? (
                  <span>No stocks found matching "{searchQuery}"</span>
                ) : (
                  <span>Found {displayedStocks.length} stock{displayedStocks.length !== 1 ? 's' : ''} matching "{searchQuery}"</span>
                )}
              </div>
            )}
          </section>

          {/* All Stocks Table */}
          <section>
            <div className="table-header">
              <h2 className="section-title">All Stocks ({displayedStocks.length})</h2>
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
                {displayedStocks.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                      {searchQuery ? 'No stocks found matching your search.' : 'No stocks available. Add stocks to your Firebase database.'}
                    </td>
                  </tr>
                ) : (
                  displayedStocks.map((stock) => (
                    <tr 
                      key={stock.id} 
                      onClick={() => handleStockClick(stock, false)}
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
        </>
      )}

      {/* Stock Detail Modal */}
      <StockModal 
        stock={selectedStock}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onWatchlistUpdate={fetchWatchlist}
        onHoldingsUpdate={fetchHoldings}
        isSellMode={isSellMode}
      />
    </main>
  );
}
