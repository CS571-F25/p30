// src/pages/ProfilePage.jsx
import React from 'react';

export default function ProfilePage() {
  return (
    <main className="main-content">
      {/* 1. 사용자 정보 */}
      <section className="user-info">
        <div className="user-profile">
          <div className="user-details">
            <h2>홍길동</h2>
            <p className="user-email">hong@example.com</p>
            <div className="user-stats">
              <span className="stat-item">
                <strong>회원 등급:</strong> 프리미엄
              </span>
              <span className="stat-item">
                <strong>가입일:</strong> 2024년 1월
              </span>
              <span className="stat-item">
                <strong>총 거래:</strong> 156회
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
            <h3>총 자산</h3>
            <div className="card-content">
              <span className="card-value">₩15,000,000</span>
              <span className="card-change positive">+12.5%</span>
            </div>
          </div>
          <div className="portfolio-card">
            <h3>오늘의 수익</h3>
            <div className="card-content">
              <span className="card-value">+₩234,500</span>
              <span className="card-change positive">+1.59%</span>
            </div>
          </div>
          <div className="portfolio-card">
            <h3>총 수익</h3>
            <div className="card-content">
              <span className="card-value">+₩2,500,000</span>
              <span className="card-change positive">+20.0%</span>
            </div>
          </div>
          <div className="portfolio-card">
            <h3>현금 잔고</h3>
            <div className="card-content">
              <span className="card-value">₩3,200,000</span>
              <span className="card-change neutral">사용가능</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 최근 거래 내역 */}
      <section>
        <h2 className="section-title">최근 거래 내역</h2>
        <table>
          <thead>
            <tr>
              <th>날짜</th>
              <th>종목</th>
              <th>구분</th>
              <th>수량</th>
              <th>단가</th>
              <th>금액</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024.01.15</td>
              <td>
                <div className="stock-info">
                  <span className="stock-name">삼성전자</span>
                  <span className="stock-code">005930</span>
                </div>
              </td>
              <td><span className="buy">매수</span></td>
              <td>10주</td>
              <td>₩71,200</td>
              <td>₩712,000</td>
            </tr>
            <tr>
              <td>2024.01.14</td>
              <td>
                <div className="stock-info">
                  <span className="stock-name">SK하이닉스</span>
                  <span className="stock-code">000660</span>
                </div>
              </td>
              <td><span className="buy">매수</span></td>
              <td>5주</td>
              <td>₩128,500</td>
              <td>₩642,500</td>
            </tr>
            <tr>
              <td>2024.01.10</td>
              <td>
                <div className="stock-info">
                  <span className="stock-name">카카오</span>
                  <span className="stock-code">035720</span>
                </div>
              </td>
              <td><span className="sell">매도</span></td>
              <td>15주</td>
              <td>₩52,300</td>
              <td>₩784,500</td>
            </tr>
            <tr>
              <td>2024.01.08</td>
              <td>
                <div className="stock-info">
                  <span className="stock-name">NAVER</span>
                  <span className="stock-code">035420</span>
                </div>
              </td>
              <td><span className="buy">매수</span></td>
              <td>3주</td>
              <td>₩200,000</td>
              <td>₩600,000</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 4. 계정 설정 */}
      <section>
        <h2 className="section-title">계정 설정</h2>
        <div className="summary-grid">
          <div className="summary-card">
            <h4>알림 설정</h4>
            <p>이메일 알림 활성화</p>
            <button>관리</button>
          </div>
          <div className="summary-card">
            <h4>보안</h4>
            <p>2단계 인증 활성화</p>
            <button>업데이트</button>
          </div>
          <div className="summary-card">
            <h4>환경설정</h4>
            <p>테마: 자동</p>
            <button>편집</button>
          </div>
          <div className="summary-card">
            <h4>언어</h4>
            <p>한국어</p>
            <button>변경</button>
          </div>
        </div>
      </section>
    </main>
  );
}
