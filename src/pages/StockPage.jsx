// src/pages/StockPage.jsx
import React from 'react';

export default function StockPage() {
  return (
    <main className="main-content">
      {/* 1. 검색 및 필터 섹션 */}
      <section className="stock-search">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="종목명 또는 종목코드 검색" 
            className="stock-search-input"
          />
          <button className="search-btn">검색</button>
        </div>
        <div className="filter-tabs">
          <button className="filter-tab active">전체</button>
          <button className="filter-tab">코스피</button>
          <button className="filter-tab">코스닥</button>
          <button className="filter-tab">관심종목</button>
        </div>
      </section>

      {/* 2. 주요 지수 정보 */}
      <section className="market-indices">
        <div className="indices-grid">
          <div className="index-card">
            <div className="index-header">
              <h3>코스피</h3>
              <span className="index-code">KOSPI</span>
            </div>
            <div className="index-value">
              <span className="current-value">2,650.28</span>
              <span className="change positive">+15.32 (+0.58%)</span>
            </div>
            <div className="index-details">
              <span>거래량: 8,234,567</span>
              <span>거래대금: 12,345억원</span>
            </div>
          </div>
          <div className="index-card">
            <div className="index-header">
              <h3>코스닥</h3>
              <span className="index-code">KOSDAQ</span>
            </div>
            <div className="index-value">
              <span className="current-value">850.45</span>
              <span className="change negative">-8.76 (-1.02%)</span>
            </div>
            <div className="index-details">
              <span>거래량: 3,456,789</span>
              <span>거래대금: 5,678억원</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 실시간 주가 테이블 */}
      <section className="stock-table">
        <div className="table-header">
          <h2>실시간 주가</h2>
          <div className="table-controls">
            <select className="sort-select">
              <option>등락률순</option>
              <option>거래량순</option>
              <option>시가총액순</option>
            </select>
            <button className="refresh-btn">새로고침</button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="stock-data-table">
            <thead>
              <tr>
                <th>종목명</th>
                <th>현재가</th>
                <th>전일비</th>
                <th>등락률</th>
                <th>거래량</th>
                <th>거래대금</th>
                <th>시가총액</th>
                <th>PER</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">삼성전자</span>
                    <span className="stock-code">005930</span>
                  </div>
                </td>
                <td className="price">₩75,000</td>
                <td className="change positive">+2,000</td>
                <td className="change-rate positive">+2.74%</td>
                <td>12,345,678</td>
                <td>92,592억원</td>
                <td>4,500조원</td>
                <td>15.2</td>
              </tr>
              <tr>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">SK하이닉스</span>
                    <span className="stock-code">000660</span>
                  </div>
                </td>
                <td className="price">₩125,000</td>
                <td className="change positive">+3,500</td>
                <td className="change-rate positive">+2.88%</td>
                <td>8,765,432</td>
                <td>109,568억원</td>
                <td>1,200조원</td>
                <td>12.8</td>
              </tr>
              <tr>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">NAVER</span>
                    <span className="stock-code">035420</span>
                  </div>
                </td>
                <td className="price">₩190,000</td>
                <td className="change negative">-5,000</td>
                <td className="change-rate negative">-2.56%</td>
                <td>2,345,678</td>
                <td>44,568억원</td>
                <td>320조원</td>
                <td>25.6</td>
              </tr>
              <tr>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">카카오</span>
                    <span className="stock-code">035720</span>
                  </div>
                </td>
                <td className="price">₩55,000</td>
                <td className="change positive">+1,500</td>
                <td className="change-rate positive">+2.80%</td>
                <td>5,678,901</td>
                <td>31,234억원</td>
                <td>250조원</td>
                <td>18.9</td>
              </tr>
              <tr>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">LG에너지솔루션</span>
                    <span className="stock-code">373220</span>
                  </div>
                </td>
                <td className="price">₩450,000</td>
                <td className="change positive">+5,000</td>
                <td className="change-rate positive">+1.12%</td>
                <td>1,234,567</td>
                <td>55,556억원</td>
                <td>1,100조원</td>
                <td>45.2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. 상승/하락 종목 */}
      <section className="top-movers">
        <div className="movers-container">
          <div className="top-gainers">
            <h3>상승률 상위</h3>
            <div className="movers-list">
              <div className="mover-item">
                <span className="stock-name">바이오니아</span>
                <span className="change-rate positive">+15.2%</span>
                <span className="current-price">₩12,500</span>
              </div>
              <div className="mover-item">
                <span className="stock-name">셀바스AI</span>
                <span className="change-rate positive">+12.8%</span>
                <span className="current-price">₩8,900</span>
              </div>
              <div className="mover-item">
                <span className="stock-name">테라스페이스</span>
                <span className="change-rate positive">+10.5%</span>
                <span className="current-price">₩15,200</span>
              </div>
            </div>
          </div>
          
          <div className="top-losers">
            <h3>하락률 상위</h3>
            <div className="movers-list">
              <div className="mover-item">
                <span className="stock-name">대우건설</span>
                <span className="change-rate negative">-8.7%</span>
                <span className="current-price">₩3,200</span>
              </div>
              <div className="mover-item">
                <span className="stock-name">한화에어로스페이스</span>
                <span className="change-rate negative">-7.3%</span>
                <span className="current-price">₩45,600</span>
              </div>
              <div className="mover-item">
                <span className="stock-name">포스코홀딩스</span>
                <span className="change-rate negative">-6.1%</span>
                <span className="current-price">₩420,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 거래량 급증 종목 */}
      <section className="volume-spikes">
        <h2>거래량 급증 종목</h2>
        <div className="volume-list">
          <div className="volume-item">
            <div className="stock-info">
              <span className="stock-name">현대모비스</span>
              <span className="stock-code">012330</span>
            </div>
            <div className="volume-details">
              <span className="volume-ratio">거래량 3.2배</span>
              <span className="current-price">₩245,000</span>
              <span className="change-rate positive">+4.2%</span>
            </div>
          </div>
          <div className="volume-item">
            <div className="stock-info">
              <span className="stock-name">기아</span>
              <span className="stock-code">000270</span>
            </div>
            <div className="volume-details">
              <span className="volume-ratio">거래량 2.8배</span>
              <span className="current-price">₩85,000</span>
              <span className="change-rate positive">+3.7%</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}