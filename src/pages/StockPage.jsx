// src/pages/StockPage.jsx
import React, { useState } from 'react';

export default function StockPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // 주식 데이터
  const stockData = [
    {
      id: 1,
      name: '삼성전자',
      code: '005930',
      price: '₩71,200',
      change: '+₩1,200',
      changePercent: '+1.71%',
      isPositive: true
    },
    {
      id: 2,
      name: 'SK하이닉스',
      code: '000660',
      price: '₩128,500',
      change: '+₩3,500',
      changePercent: '+2.80%',
      isPositive: true
    },
    {
      id: 3,
      name: 'NAVER',
      code: '035420',
      price: '₩208,000',
      change: '-₩7,000',
      changePercent: '-3.26%',
      isPositive: false
    },
    {
      id: 4,
      name: 'LG에너지솔루션',
      code: '373220',
      price: '₩450,000',
      change: '+₩5,000',
      changePercent: '+1.12%',
      isPositive: true
    },
    {
      id: 5,
      name: '현대차',
      code: '005380',
      price: '₩180,000',
      change: '-₩2,000',
      changePercent: '-1.10%',
      isPositive: false
    },
    {
      id: 6,
      name: '카카오',
      code: '035720',
      price: '₩52,300',
      change: '+₩800',
      changePercent: '+1.55%',
      isPositive: true
    }
  ];

  return (
    <main className="main-content">
      {/* 1. 검색 및 필터 섹션 */}
      <section className="stock-search">
        <div className="search-container">
          <input
            type="text"
            placeholder="종목명 또는 종목코드로 검색하세요"
            className="stock-search-input"
          />
          <button>검색</button>
        </div>
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${selectedFilter === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('all')}
          >
            전체
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'kospi' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('kospi')}
          >
            코스피
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'kosdaq' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('kosdaq')}
          >
            코스닥
          </button>
          <button 
            className={`filter-tab ${selectedFilter === 'favorite' ? 'active' : ''}`}
            onClick={() => setSelectedFilter('favorite')}
          >
            관심종목
          </button>
        </div>
      </section>

      {/* 2. 주요 지수 */}
      <section className="market-indices">
        <h2 className="section-title">주요 지수</h2>
        <div className="indices-grid">
          <div className="index-card">
            <div className="index-header">
              <h3>코스피</h3>
              <span className="index-code">KOSPI</span>
            </div>
            <div className="index-value">
              <span className="current-value">2,645.50</span>
              <span className="change positive">+15.30 (+0.58%)</span>
            </div>
            <div className="index-details">
              <span>고가: 2,658.20</span>
              <span>저가: 2,631.40</span>
            </div>
          </div>

          <div className="index-card">
            <div className="index-header">
              <h3>코스닥</h3>
              <span className="index-code">KOSDAQ</span>
            </div>
            <div className="index-value">
              <span className="current-value">852.75</span>
              <span className="change negative">-3.25 (-0.38%)</span>
            </div>
            <div className="index-details">
              <span>고가: 858.90</span>
              <span>저가: 850.10</span>
            </div>
          </div>

          <div className="index-card">
            <div className="index-header">
              <h3>코스피200</h3>
              <span className="index-code">KRX200</span>
            </div>
            <div className="index-value">
              <span className="current-value">352.45</span>
              <span className="change positive">+2.15 (+0.61%)</span>
            </div>
            <div className="index-details">
              <span>고가: 354.20</span>
              <span>저가: 350.30</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 인기 종목 테이블 */}
      <section>
        <div className="table-header">
          <h2 className="section-title">인기 종목</h2>
          <div className="table-controls">
            <select className="sort-select">
              <option>거래량순</option>
              <option>등락률순</option>
              <option>시가총액순</option>
            </select>
            <button className="refresh-btn">새로고침</button>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>종목명</th>
              <th>현재가</th>
              <th>전일대비</th>
              <th>등락률</th>
              <th>거래량</th>
              <th>시가총액</th>
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
                <td>1,234,567</td>
                <td>425조원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 4. 상승/하락 종목 */}
      <section>
        <h2 className="section-title">상승/하락 종목</h2>
        <div className="movers-container">
          <div className="gainers">
            <h3>상승 종목</h3>
            <div className="movers-list">
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">SK하이닉스</span>
                  <span className="stock-code">000660</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">₩128,500</span>
                  <span className="price-change positive">+2.80%</span>
                </div>
              </div>
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">삼성전자</span>
                  <span className="stock-code">005930</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">₩71,200</span>
                  <span className="price-change positive">+1.71%</span>
                </div>
              </div>
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">카카오</span>
                  <span className="stock-code">035720</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">₩52,300</span>
                  <span className="price-change positive">+1.55%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="losers">
            <h3>하락 종목</h3>
            <div className="movers-list">
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">NAVER</span>
                  <span className="stock-code">035420</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">₩208,000</span>
                  <span className="price-change negative">-3.26%</span>
                </div>
              </div>
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">현대차</span>
                  <span className="stock-code">005380</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">₩180,000</span>
                  <span className="price-change negative">-1.10%</span>
                </div>
              </div>
              <div className="mover-item">
                <div className="stock-info">
                  <span className="stock-name">LG전자</span>
                  <span className="stock-code">066570</span>
                </div>
                <div className="stock-price">
                  <span className="current-price">₩95,000</span>
                  <span className="price-change negative">-0.52%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 차트 영역 (placeholder) */}
      <section>
        <h2 className="section-title">시장 동향 차트</h2>
        <div className="chart-placeholder">
          <p>📊</p>
          <p>차트가 여기에 표시됩니다</p>
        </div>
      </section>
    </main>
  );
}
