// src/pages/HomePage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  return (
    <main className="main-content">
      {/* Welcome Section */}
      <section>
        <h2 className="section-title">Welcome to StockWeb</h2>
        <div className="card">
          <h3>Your Complete Stock Trading Platform</h3>
          <p>Track real-time stock prices, manage your portfolio, buy and sell stocks, and stay informed with the latest market information.</p>
          {!isAuthenticated && (
            <div style={{ marginTop: '1.5rem', padding: '1.25rem', backgroundColor: '#f0f8ff', borderRadius: '8px', border: '1px solid #4a90e2' }}>
              <p style={{ margin: 0, color: '#2c5aa0', fontSize: '1rem' }}>
                <strong>Get Started:</strong> Please <span 
                  onClick={() => navigate('/login')} 
                  style={{ color: '#4a90e2', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}
                >
                  login or register
                </span> to unlock all features including portfolio management, watchlists, and trading capabilities.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ marginTop: '2rem' }}>
        <h2 className="section-title">Key Features</h2>
        <div className="card" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            
            {/* Feature 1 */}
            <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #4a90e2' }}>
              <h3 style={{ marginTop: 0, color: '#4a90e2' }}>1. Stock Market Overview</h3>
              <p style={{ marginBottom: '0.75rem', color: '#666' }}>
                Access comprehensive stock market data with two dedicated views.
              </p>
              <div style={{ color: '#555', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong>Overview Tab:</strong> View your holdings, watchlist, major indices, and top gainers/losers</div>
                <div style={{ marginBottom: '0.5rem' }}><strong>All Stocks Tab:</strong> Browse the complete stock database with advanced search and sorting</div>
                <div style={{ marginBottom: '0.5rem' }}>Search by company name or ticker symbol</div>
                <div style={{ marginBottom: '0.5rem' }}>Sort by volume, change percentage, or market cap</div>
                <div>Real-time price updates and market metrics</div>
              </div>
              <button 
                onClick={() => navigate('/stocks')}
                style={{
                  marginTop: '0.75rem',
                  padding: '0.6rem 1.25rem',
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#357abd'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4a90e2'}
              >
                Explore Stocks
              </button>
            </div>

            {/* Feature 2 */}
            <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #28a745' }}>
              <h3 style={{ marginTop: 0, color: '#28a745' }}>2. Portfolio Management</h3>
              <p style={{ marginBottom: '0.75rem', color: '#666' }}>
                Manage your investment portfolio with comprehensive tracking tools.
              </p>
              <div style={{ color: '#555', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong>Holdings Dashboard:</strong> Track all your stock positions in one place</div>
                <div style={{ marginBottom: '0.5rem' }}>View shares owned, average buy price, and current market value</div>
                <div style={{ marginBottom: '0.5rem' }}>Monitor gains and losses with real-time calculations</div>
                <div style={{ marginBottom: '0.5rem' }}>Click holdings to quickly sell shares</div>
                <div>Automatic portfolio value updates</div>
              </div>
              {!isAuthenticated && (
                <p style={{ color: '#d9534f', fontStyle: 'italic', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                  Login required to access portfolio management
                </p>
              )}
            </div>

            {/* Feature 3 */}
            <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #ffc107' }}>
              <h3 style={{ marginTop: 0, color: '#f39c12' }}>3. Buy & Sell Stocks</h3>
              <p style={{ marginBottom: '0.75rem', color: '#666' }}>
                Execute trades seamlessly with our integrated trading system.
              </p>
              <div style={{ color: '#555', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}><strong>Buy:</strong> Purchase stocks from any listing with customizable quantity</div>
                <div style={{ marginBottom: '0.5rem' }}><strong>Sell:</strong> Liquidate holdings with instant portfolio updates</div>
                <div style={{ marginBottom: '0.5rem' }}>View detailed stock information before trading</div>
                <div style={{ marginBottom: '0.5rem' }}>Automatic average cost calculation for multiple purchases</div>
                <div>Transaction confirmations and notifications</div>
              </div>
              {!isAuthenticated && (
                <p style={{ color: '#d9534f', fontStyle: 'italic', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                  Login required to trade stocks
                </p>
              )}
            </div>

            {/* Feature 4 */}
            <div style={{ padding: '1.5rem', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #17a2b8' }}>
              <h3 style={{ marginTop: 0, color: '#17a2b8' }}>4. Watchlist & Monitoring</h3>
              <p style={{ marginBottom: '0.75rem', color: '#666' }}>
                Keep track of stocks you're interested in without committing capital.
              </p>
              <div style={{ color: '#555', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '0.5rem' }}>Add stocks to your personal watchlist with one click</div>
                <div style={{ marginBottom: '0.5rem' }}>Monitor price changes and market movements</div>
                <div style={{ marginBottom: '0.5rem' }}>Quick access from the Overview tab</div>
                <div style={{ marginBottom: '0.5rem' }}>Remove stocks when they're no longer relevant</div>
                <div>Perfect for research and planning future investments</div>
              </div>
              {!isAuthenticated && (
                <p style={{ color: '#d9534f', fontStyle: 'italic', marginTop: '0.75rem', fontSize: '0.9rem' }}>
                  Login required to use watchlist feature
                </p>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section style={{ marginTop: '2rem' }}>
        <h2 className="section-title">Getting Started</h2>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div style={{ padding: '1.25rem', backgroundColor: '#e8f5e9', borderRadius: '8px', border: '1px solid #c8e6c9' }}>
              <h4 style={{ marginTop: 0, color: '#2e7d32', fontSize: '1.1rem' }}>Search & Discover</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>
                Use the search bar on the All Stocks tab to find specific companies by name or ticker symbol. Filter and sort to find the best opportunities.
              </p>
            </div>
            <div style={{ padding: '1.25rem', backgroundColor: '#fff3e0', borderRadius: '8px', border: '1px solid #ffe0b2' }}>
              <h4 style={{ marginTop: 0, color: '#e65100', fontSize: '1.1rem' }}>Click for Details</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>
                Click on any stock row to open a detailed view with current price, volume, market cap, and trading options.
              </p>
            </div>
            <div style={{ padding: '1.25rem', backgroundColor: '#e3f2fd', borderRadius: '8px', border: '1px solid #bbdefb' }}>
              <h4 style={{ marginTop: 0, color: '#1565c0', fontSize: '1.1rem' }}>Monitor Trends</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>
                Check the Top Gainers & Losers section on the Overview tab to identify trending stocks and market movements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section style={{ marginTop: '2rem' }}>
        <h2 className="section-title">Additional Resources</h2>
        <div className="card">
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
              <h4 style={{ marginTop: 0, fontSize: '1rem' }}>Market Information</h4>
              <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem', color: '#666' }}>
                Stay informed with the latest investment news, company disclosures, and analyst reports.
              </p>
              <span 
                onClick={() => navigate('/info')} 
                style={{ color: '#4a90e2', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600', fontSize: '0.95rem' }}
              >
                View Information Hub
              </span>
            </div>
            <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
              <h4 style={{ marginTop: 0, fontSize: '1rem' }}>Your Account</h4>
              <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem', color: '#666' }}>
                {isAuthenticated 
                  ? 'View your portfolio summary, trading history, and account details.'
                  : 'Create an account to start building your investment portfolio.'}
              </p>
              {isAuthenticated ? (
                <span 
                  onClick={() => navigate('/profile')} 
                  style={{ color: '#4a90e2', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600', fontSize: '0.95rem' }}
                >
                  Go to Profile
                </span>
              ) : (
                <span 
                  onClick={() => navigate('/login')} 
                  style={{ color: '#4a90e2', cursor: 'pointer', textDecoration: 'underline', fontWeight: '600', fontSize: '0.95rem' }}
                >
                  Login or Register
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
