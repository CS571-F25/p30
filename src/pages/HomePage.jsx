// src/pages/HomePage.jsx
import React from 'react'

export default function HomePage() {
  return (
    <main className="main-content">
      {/* 1. 사용자 정보 섹션 */}
      <section className="user-info">
        <div className="user-profile">
          <div className="user-details">
            <h2 className="user-name">홍길동님</h2>
            <p className="user-email">hong@example.com</p>
            <div className="user-stats">
              <span className="stat-item">
                <strong>총 자산:</strong> ₩15,000,000
              </span>
              <span className="stat-item">
                <strong>수익률:</strong> +12.5%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 포트폴리오 요약 */}
      <section className="portfolio-summary">
        <h2 className="section-title">포트폴리오 요약</h2>
        <div className="portfolio-cards">
          <div className="portfolio-card">
            <h3>보유 종목</h3>
            <div className="card-content">
              <span className="card-value">8개</span>
              <span className="card-change positive">+2개</span>
            </div>
          </div>
          <div className="portfolio-card">
            <h3>총 투자금액</h3>
            <div className="card-content">
              <span className="card-value">₩12,500,000</span>
              <span className="card-change positive">+₩500,000</span>
            </div>
          </div>
          <div className="portfolio-card">
            <h3>평가손익</h3>
            <div className="card-content">
              <span className="card-value">₩2,500,000</span>
              <span className="card-change positive">+20.0%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 보유 종목 목록 */}
      <section className="holdings">
        <h2 className="section-title">보유 종목</h2>
        <div className="holdings-table">
          <table>
            <thead>
              <tr>
                <th>종목명</th>
                <th>보유수량</th>
                <th>평균단가</th>
                <th>현재가</th>
                <th>평가손익</th>
                <th>수익률</th>
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
                <td>10주</td>
                <td>₩70,000</td>
                <td>₩75,000</td>
                <td className="positive">+₩50,000</td>
                <td className="positive">+7.14%</td>
              </tr>
              <tr>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">SK하이닉스</span>
                    <span className="stock-code">000660</span>
                  </div>
                </td>
                <td>5주</td>
                <td>₩120,000</td>
                <td>₩125,000</td>
                <td className="positive">+₩25,000</td>
                <td className="positive">+4.17%</td>
              </tr>
              <tr>
                <td>
                  <div className="stock-info">
                    <span className="stock-name">NAVER</span>
                    <span className="stock-code">035420</span>
                  </div>
                </td>
                <td>3주</td>
                <td>₩200,000</td>
                <td>₩190,000</td>
                <td className="negative">-₩30,000</td>
                <td className="negative">-5.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. 관심 종목 */}
      <section className="watchlist">
        <h2 className="section-title">관심 종목</h2>
        <div className="watchlist-grid">
          <div className="watchlist-item">
            <div className="stock-header">
              <span className="stock-name">LG에너지솔루션</span>
              <span className="stock-code">373220</span>
            </div>
            <div className="stock-price">
              <span className="current-price">₩450,000</span>
              <span className="price-change positive">+₩5,000 (+1.12%)</span>
            </div>
          </div>
          <div className="watchlist-item">
            <div className="stock-header">
              <span className="stock-name">현대차</span>
              <span className="stock-code">005380</span>
            </div>
            <div className="stock-price">
              <span className="current-price">₩180,000</span>
              <span className="price-change negative">-₩2,000 (-1.10%)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 최근 거래 내역 */}
      <section className="recent-transactions">
        <h2 className="section-title">최근 거래 내역</h2>
        <div className="transaction-list">
          <div className="transaction-item">
            <div className="transaction-info">
              <span className="transaction-type buy">매수</span>
              <span className="stock-name">삼성전자</span>
              <span className="transaction-date">2024.01.15</span>
            </div>
            <div className="transaction-details">
              <span className="quantity">10주</span>
              <span className="price">₩70,000</span>
              <span className="total">₩700,000</span>
            </div>
          </div>
          <div className="transaction-item">
            <div className="transaction-info">
              <span className="transaction-type sell">매도</span>
              <span className="stock-name">카카오</span>
              <span className="transaction-date">2024.01.10</span>
            </div>
            <div className="transaction-details">
              <span className="quantity">5주</span>
              <span className="price">₩55,000</span>
              <span className="total">₩275,000</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 