// src/components/HeaderNav.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function HeaderNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home'},
    { path: '/stocks', label: 'Stock'},
    { path: '/info', label: 'Info'},
  ];

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (  
    <header className="header-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <h1 className="brand-title">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              StockWeb
            </Link>
          </h1>
        </div>
        <nav className="nav-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${pathname === item.path ? 'nav-link--active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="search-btn">
            <span className="search-icon">🔍</span>
          </button>
          <button className="profile-btn" onClick={handleProfileClick}>
            <span className="profile-icon">👤</span>
          </button>
        </div>
      </div>
    </header>
  );
}