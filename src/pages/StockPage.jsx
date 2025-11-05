// src/pages/StockPage.jsx
import React, { useState } from 'react';

export default function StockPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Stock Data
  const stockData = [
    {
      id: 1,
      name: 'Apple Inc.',
      code: 'AAPL',
      price: '$187.50',
      change: '+$3.20',
      changePercent: '+1.71%',
      isPositive: true
    },
    {
      id: 2,
      name: 'Microsoft Corp.',
      code: 'MSFT',
      price: '$395.00',
      change: '+$10.75',
      changePercent: '+2.80%',
      isPositive: true
    },
    {
      id: 3,
      name: 'Google',
      code: 'GOOGL',
      price: '$142.00',
      change: '-$4.75',
      changePercent: '-3.26%',
      isPositive: false
    }
  ];

  return (
    <main className="main-content">
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
            {stockData.map((stock) => (
              <tr key={stock.id}>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">{stock.name}</span>
                    <span className="stock-code">{stock.code}</span>
                  </div>
                </td>
                <td><strong>{stock.price}</strong></td>
                <td className={stock.isPositive ? 'positive' : 'negative'}>
                  {stock.change}
                </td>
                <td className={stock.isPositive ? 'positive' : 'negative'}>
                  {stock.changePercent}
                </td>
                <td>52.3M</td>
                <td>$2.8T</td>
              </tr>
            ))}
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
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">Microsoft Corp.</span>
                  <span className="stock-code">MSFT</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">$395.00</span>
                  <span className="price-change positive">+2.80%</span>
                </div>
              </div>
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">Apple Inc.</span>
                  <span className="stock-code">AAPL</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">$187.50</span>
                  <span className="price-change positive">+1.71%</span>
                </div>
              </div>
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">Meta Platforms</span>
                  <span className="stock-code">META</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">$385.00</span>
                  <span className="price-change positive">+1.55%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="losers">
            <h3>Top Losers</h3>
            <div className="movers-list">
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">Google</span>
                  <span className="stock-code">GOOGL</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">$142.00</span>
                  <span className="price-change negative">-3.26%</span>
                </div>
              </div>
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">Amazon.com</span>
                  <span className="stock-code">AMZN</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">$178.50</span>
                  <span className="price-change negative">-1.08%</span>
                </div>
              </div>
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">Netflix Inc.</span>
                  <span className="stock-code">NFLX</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">$485.00</span>
                  <span className="price-change negative">-0.52%</span>
                </div>
              </div>
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
          <div className="watchlist-item">
            <div className="stock-header">
              <span className="stock-name">NVIDIA Corp.</span>
              <span className="stock-code">NVDA</span>
            </div>
            <div className="stock-price">
              <span className="current-price">$495.00</span>
              <span className="price-change positive">+$5.50 (+1.12%)</span>
            </div>
          </div>
          <div className="watchlist-item">
            <div className="stock-header">
              <span className="stock-name">Amazon.com Inc.</span>
              <span className="stock-code">AMZN</span>
            </div>
            <div className="stock-price">
              <span className="current-price">$178.50</span>
              <span className="price-change negative">-$1.95 (-1.08%)</span>
            </div>
          </div>
          <div className="watchlist-item">
            <div className="stock-header">
              <span className="stock-name">Tesla Inc.</span>
              <span className="stock-code">TSLA</span>
            </div>
            <div className="stock-price">
              <span className="current-price">$237.50</span>
              <span className="price-change positive">+$2.65 (+1.12%)</span>
            </div>
          </div>
    </div>
      </section>
    </main>
  );
}
