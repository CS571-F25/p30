// src/components/HeaderNav.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function HeaderNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', label: 'Home'},
    { path: '/stocks', label: 'Stock'},
    { path: '/info', label: 'Info'},
  ];

  // Only show Admin to authenticated users
  if (isAuthenticated) {
    navItems.push({ path: '/admin', label: 'Admin' });
  }

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
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
          {isAuthenticated ? (
            <button className="profile-btn" onClick={handleProfileClick} title="Profile">
              <span className="profile-icon-navbar">👤</span>
            </button>
          ) : (
            <button className="login-btn-header" onClick={handleLogin}>
              <span>🔐</span>
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}