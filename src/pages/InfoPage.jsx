// src/pages/InfoPage.jsx
import React, { useState } from 'react';

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState('news');

  // News Data
  const newsData = [
    {
      id: 1,
      category: 'Market Trends',
      title: 'Federal Reserve Signals Potential Rate Cut Timeline',
      excerpt: 'The Federal Reserve has issued specific signals regarding the timing of interest rate cuts at the recent FOMC meeting, drawing attention from global financial markets.',
      source: 'Reuters',
      time: '2 hours ago',
      views: '1,234',
      isFeatured: true
    },
    {
      id: 2,
      category: 'Corporate News',
      title: 'Apple Expands AI Chip Market Entry',
      excerpt: 'Apple announced plans to expand its entry into the artificial intelligence (AI) chip market.',
      source: 'Bloomberg',
      time: '4 hours ago',
      views: '856',
      isFeatured: false
    },
    {
      id: 3,
      category: 'Market Trends',
      title: 'S&P 500 Closes Higher on Foreign Buying',
      excerpt: 'The S&P 500 closed higher compared to the previous day due to foreign investor buying.',
      source: 'Wall Street Journal',
      time: '6 hours ago',
      views: '723',
      isFeatured: false
    },
    {
      id: 4,
      category: 'International Markets',
      title: 'Nasdaq Hits New High on Tech Stock Rally',
      excerpt: 'The Nasdaq index hit a new high as technology stocks rallied.',
      source: 'Reuters',
      time: '8 hours ago',
      views: '645',
      isFeatured: false
    },
    {
      id: 5,
      category: 'Corporate News',
      title: 'Intel Expects Continued Memory Chip Price Increases',
      excerpt: 'Intel forecasts that memory chip price increases will continue.',
      source: 'Financial Times',
      time: '10 hours ago',
      views: '567',
      isFeatured: false
    },
    {
      id: 6,
      category: 'International Markets',
      title: 'European Central Bank Presents Monetary Policy Direction',
      excerpt: 'The European Central Bank (ECB) has presented specific guidelines for future monetary policy direction.',
      source: 'Bloomberg',
      time: '12 hours ago',
      views: '432',
      isFeatured: false
    }
  ];

  // Disclosure Data
  const disclosureData = [
    {
      id: 1,
      company: 'Apple Inc.',
      type: 'Annual Report',
      title: '2023 Annual Report',
      description: 'Disclosure of annual report regarding business performance and financial status for 2023.',
      date: 'Jan 15, 2024'
    },
    {
      id: 2,
      company: 'Intel Corp.',
      type: 'Material Event',
      title: 'New Business Entry Related Material Event',
      description: 'Disclosure of material event regarding entry into AI chip new business.',
      date: 'Jan 14, 2024'
    },
    {
      id: 3,
      company: 'Google',
      type: 'Quarterly Report',
      title: 'Q4 2023 Earnings Release',
      description: 'Disclosure of quarterly report regarding Q4 2023 performance and financial status.',
      date: 'Jan 13, 2024'
    },
    {
      id: 4,
      company: 'Tesla Inc.',
      type: 'Fair Disclosure',
      title: 'Major Shareholder Changes',
      description: 'Fair disclosure regarding major shareholder equity changes.',
      date: 'Jan 12, 2024'
    },
    {
      id: 5,
      company: 'Ford Motor',
      type: 'Annual Report',
      title: '2023 Annual Report',
      description: 'Disclosure of annual report regarding business performance and financial status for 2023.',
      date: 'Jan 11, 2024'
    }
  ];

  // Report Data
  const reportData = [
    {
      id: 1,
      source: 'Goldman Sachs',
      title: 'Apple Inc. (AAPL) - AI Chip Growth Continues',
      summary: 'Forecast for improved Apple performance due to rapid growth in the AI chip market',
      rating: 'Buy',
      targetPrice: '$210.00',
      date: 'Jan 15, 2024'
    },
    {
      id: 2,
      source: 'Morgan Stanley',
      title: 'Intel Corp. (INTC) - Memory Chip Recovery',
      summary: 'Forecast for performance improvement due to memory chip price increases and demand recovery',
      rating: 'Buy',
      targetPrice: '$55.00',
      date: 'Jan 14, 2024'
    },
    {
      id: 3,
      source: 'JP Morgan',
      title: 'Google (GOOGL) - AI Platform Expansion',
      summary: 'Securing new growth engines through platform expansion using AI technology',
      rating: 'Hold',
      targetPrice: '$145.00',
      date: 'Jan 13, 2024'
    },
    {
      id: 4,
      source: 'Barclays',
      title: 'Tesla Inc. (TSLA) - EV Battery Demand Increase',
      summary: 'Forecast for performance improvement due to increased battery demand as EV market expands',
      rating: 'Buy',
      targetPrice: '$275.00',
      date: 'Jan 12, 2024'
    },
    {
      id: 5,
      source: 'Bank of America',
      title: 'Ford Motor (F) - Export Expansion and Profitability Improvement',
      summary: 'Forecast for performance improvement due to overseas market expansion and profitability improvement',
      rating: 'Buy',
      targetPrice: '$14.50',
      date: 'Jan 11, 2024'
    }
  ];

  const renderNewsContent = () => {
    return (
      <section className="main-news">
        <h2>Investment News</h2>
        <div className="news-list-vertical">
          {newsData.map((news) => (
            <article key={news.id} className="news-item-vertical">
              <div className="news-content">
                <div className="news-header">
                  <span className="news-category">{news.category}</span>
                  <span className="news-time">{news.time}</span>
                </div>
                <h3 className="news-title">{news.title}</h3>
                <p className="news-excerpt">{news.excerpt}</p>
                <div className="news-meta">
                  <span className="news-source">{news.source}</span>
                  <span className="news-views">{news.views} views</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  };

  const renderDisclosureContent = () => (
    <section className="disclosure-info">
      <h2>Company Disclosures</h2>
      <div className="disclosure-filters">
        <select className="disclosure-type">
          <option>All</option>
          <option>Annual Report</option>
          <option>Quarterly Report</option>
          <option>Material Event</option>
          <option>Fair Disclosure</option>
        </select>
        <input 
          type="text" 
          placeholder="Search company name" 
          className="company-search"
        />
      </div>

      <div className="disclosure-list">
        {disclosureData.map((disclosure) => (
          <div key={disclosure.id} className="disclosure-item">
            <div className="disclosure-header">
              <span className="company-name">{disclosure.company}</span>
              <span className="disclosure-type">{disclosure.type}</span>
              <span className="disclosure-date">{disclosure.date}</span>
            </div>
            <div className="disclosure-content">
              <h4>{disclosure.title}</h4>
              <p>{disclosure.description}</p>
            </div>
            <div className="disclosure-actions">
              <button className="view-btn">View</button>
              <button className="download-btn">Download</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderReportContent = () => (
    <section className="investment-reports">
      <h2>Investment Reports</h2>
      <div className="reports-grid">
        {reportData.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <span className="report-source">{report.source}</span>
              <span className="report-date">{report.date}</span>
            </div>
            <h3 className="report-title">{report.title}</h3>
            <div className="report-summary">
              <p>{report.summary}</p>
            </div>
            <div className="report-rating">
              <span className="rating-label">Rating:</span>
              <span className={`rating-value ${report.rating === 'Buy' ? 'buy' : 'hold'}`}>
                {report.rating}
              </span>
              <span className="target-price">Target: {report.targetPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'news':
        return renderNewsContent();
      case 'disclosure':
        return renderDisclosureContent();
      case 'report':
        return renderReportContent();
      default:
        return renderNewsContent();
    }
  };

  return (
    <main className="main-content">
      {/* 1. Category Tabs */}
      <section className="info-tabs">
        <div className="tab-container">
          <button 
            className={`info-tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            Investment News
          </button>
          <button 
            className={`info-tab ${activeTab === 'disclosure' ? 'active' : ''}`}
            onClick={() => setActiveTab('disclosure')}
          >
            Company Disclosures
          </button>
          <button 
            className={`info-tab ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            Reports
          </button>
    </div>
      </section>

      {/* 2. Tab Content */}
      {renderContent()}
    </main>
  );
}
