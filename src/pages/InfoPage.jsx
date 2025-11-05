// src/pages/InfoPage.jsx
import React, { useState } from 'react';

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState('news');

  // 투자뉴스 데이터
  const newsData = [
    {
      id: 1,
      category: '시장동향',
      title: '미국 연준, 금리 인하 시점에 대한 신호 발표',
      excerpt: '미국 연방준비제도(Fed)가 최근 FOMC 회의에서 금리 인하 시점에 대한 구체적인 신호를 발표하여 글로벌 금융시장의 관심이 집중되고 있습니다.',
      source: '연합뉴스',
      time: '2시간 전',
      views: '1,234',
      isFeatured: true
    },
    {
      id: 2,
      category: '기업뉴스',
      title: '삼성전자, AI 반도체 시장 진출 확대',
      excerpt: '삼성전자가 인공지능(AI) 반도체 시장 진출을 확대한다고 발표했습니다.',
      source: '매일경제',
      time: '4시간 전',
      views: '856',
      isFeatured: false
    },
    {
      id: 3,
      category: '시장동향',
      title: '코스피, 외국인 매수세로 상승 마감',
      excerpt: '코스피가 외국인 투자자들의 매수세로 전일 대비 상승 마감했습니다.',
      source: '한국경제',
      time: '6시간 전',
      views: '723',
      isFeatured: false
    },
    {
      id: 4,
      category: '해외시장',
      title: '나스닥, 기술주 상승으로 신고점 경신',
      excerpt: '나스닥 지수가 기술주들의 상승으로 신고점을 경신했습니다.',
      source: '로이터',
      time: '8시간 전',
      views: '645',
      isFeatured: false
    },
    {
      id: 5,
      category: '기업뉴스',
      title: 'SK하이닉스, 메모리 반도체 가격 상승세 지속',
      excerpt: 'SK하이닉스가 메모리 반도체 가격 상승세가 지속될 것으로 전망했습니다.',
      source: '매일경제',
      time: '10시간 전',
      views: '567',
      isFeatured: false
    },
    {
      id: 6,
      category: '해외시장',
      title: '유럽 중앙은행, 통화정책 방향성 제시',
      excerpt: '유럽 중앙은행(ECB)이 향후 통화정책 방향성에 대한 구체적인 가이드라인을 제시했습니다.',
      source: '블룸버그',
      time: '12시간 전',
      views: '432',
      isFeatured: false
    }
  ];

  // 기업공시 데이터
  const disclosureData = [
    {
      id: 1,
      company: '삼성전자',
      type: '사업보고서',
      title: '2023년 사업보고서',
      description: '2023년도 사업실적 및 재무상태에 관한 사업보고서를 공시합니다.',
      date: '2024.01.15'
    },
    {
      id: 2,
      company: 'SK하이닉스',
      type: '주요사항보고서',
      title: '신규 사업 진출 관련 주요사항',
      description: 'AI 반도체 신규 사업 진출에 관한 주요사항을 공시합니다.',
      date: '2024.01.14'
    },
    {
      id: 3,
      company: 'NAVER',
      type: '분기보고서',
      title: '2023년 4분기 실적 발표',
      description: '2023년 4분기 실적 및 재무상태에 관한 분기보고서를 공시합니다.',
      date: '2024.01.13'
    },
    {
      id: 4,
      company: 'LG에너지솔루션',
      type: '공정공시',
      title: '주요주주 변동사항',
      description: '주요주주 지분 변동에 관한 공정공시를 합니다.',
      date: '2024.01.12'
    },
    {
      id: 5,
      company: '현대차',
      type: '사업보고서',
      title: '2023년 사업보고서',
      description: '2023년도 사업실적 및 재무상태에 관한 사업보고서를 공시합니다.',
      date: '2024.01.11'
    }
  ];

  // 리포트 데이터
  const reportData = [
    {
      id: 1,
      source: '미래에셋증권',
      title: '삼성전자 (005930) - AI 반도체 성장세 지속',
      summary: 'AI 반도체 시장의 급속한 성장으로 인한 삼성전자의 실적 개선 전망',
      rating: '매수',
      targetPrice: '₩85,000',
      date: '2024.01.15'
    },
    {
      id: 2,
      source: 'NH투자증권',
      title: 'SK하이닉스 (000660) - 메모리 반도체 회복세',
      summary: '메모리 반도체 가격 상승과 수요 회복으로 인한 실적 개선 전망',
      rating: '매수',
      targetPrice: '₩140,000',
      date: '2024.01.14'
    },
    {
      id: 3,
      source: '키움증권',
      title: 'NAVER (035420) - AI 플랫폼 확장',
      summary: 'AI 기술을 활용한 플랫폼 확장으로 인한 새로운 성장 동력 확보',
      rating: '보유',
      targetPrice: '₩200,000',
      date: '2024.01.13'
    },
    {
      id: 4,
      source: '한국투자증권',
      title: 'LG에너지솔루션 (373220) - 전기차 배터리 수요 증가',
      summary: '전기차 시장 확대에 따른 배터리 수요 증가로 실적 개선 전망',
      rating: '매수',
      targetPrice: '₩500,000',
      date: '2024.01.12'
    },
    {
      id: 5,
      source: '신한투자증권',
      title: '현대차 (005380) - 수출 확대 및 수익성 개선',
      summary: '해외 시장 진출 확대와 수익성 개선으로 인한 실적 향상 전망',
      rating: '매수',
      targetPrice: '₩200,000',
      date: '2024.01.11'
    }
  ];

  const renderNewsContent = () => {
    return (
      <section className="main-news">
        <h2>투자뉴스</h2>
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
                  <span className="news-views">조회수 {news.views}</span>
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
      <h2>기업공시</h2>
      <div className="disclosure-filters">
        <select className="disclosure-type">
          <option>전체</option>
          <option>사업보고서</option>
          <option>분기보고서</option>
          <option>주요사항보고서</option>
          <option>공정공시</option>
        </select>
        <input 
          type="text" 
          placeholder="기업명 검색" 
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
              <button className="view-btn">보기</button>
              <button className="download-btn">다운로드</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderReportContent = () => (
    <section className="investment-reports">
      <h2>투자리포트</h2>
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
              <span className="rating-label">투자의견:</span>
              <span className={`rating-value ${report.rating === '매수' ? 'buy' : 'hold'}`}>
                {report.rating}
              </span>
              <span className="target-price">목표가: {report.targetPrice}</span>
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
      {/* 1. 카테고리 탭 */}
      <section className="info-tabs">
        <div className="tab-container">
          <button 
            className={`info-tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            투자뉴스
          </button>
          <button 
            className={`info-tab ${activeTab === 'disclosure' ? 'active' : ''}`}
            onClick={() => setActiveTab('disclosure')}
          >
            기업공시
          </button>
          <button 
            className={`info-tab ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => setActiveTab('report')}
          >
            리포트
          </button>
        </div>
      </section>

      {/* 2. 탭별 콘텐츠 */}
      {renderContent()}
    </main>
  );
}