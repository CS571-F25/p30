// src/pages/ProfilePage.jsx
import React from 'react';

export default function ProfilePage() {
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
                <h2 className="user-name">John Doe</h2>
                <p className="user-email">john@example.com</p>
              </div>
            </div>
            <div className="profile-bottom-row">
              <div className="user-stats">
                <span className="stat-item">
                  <strong>Total Assets:</strong> $125,000
                </span>
                <span className="stat-item">
                  <strong>Return:</strong> +12.5%
                </span>
              </div>
            </div>
          </div>
          <button className="logout-btn">Logout</button>
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
              <tr>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">Apple Inc.</span>
                    <span className="stock-code">AAPL</span>
                  </div>
                </td>
                <td>10 shares</td>
                <td>$175.00</td>
                <td>$187.50</td>
                <td className="positive">+$125.00</td>
                <td className="positive">+7.14%</td>
              </tr>
              <tr>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">Tesla Inc.</span>
                    <span className="stock-code">TSLA</span>
                  </div>
                </td>
                <td>3 shares</td>
                <td>$250.00</td>
                <td>$237.50</td>
                <td className="negative">-$37.50</td>
                <td className="negative">-5.0%</td>
              </tr>
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
            <tr>
              <td>Jan 15, 2024</td>
              <td>
                <div className="stock-info">
                  <span className="stock-name">Apple Inc.</span>
                  <span className="stock-code">AAPL</span>
                </div>
              </td>
              <td><span className="buy">Buy</span></td>
              <td>10 shares</td>
              <td>$187.50</td>
              <td>$1,875.00</td>
            </tr>
            <tr>
              <td>Jan 10, 2024</td>
              <td>
                <div className="stock-info">
                  <span className="stock-name">Meta Platforms</span>
                  <span className="stock-code">META</span>
                </div>
              </td>
              <td><span className="sell">Sell</span></td>
              <td>15 shares</td>
              <td>$385.00</td>
              <td>$5,775.00</td>
            </tr>
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
            <h4>Preferences</h4>
            <p>Theme: Auto</p>
            <button>Edit</button>
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
