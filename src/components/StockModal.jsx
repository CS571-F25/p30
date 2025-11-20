// src/components/StockModal.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/modal.css';

export default function StockModal({ stock, isOpen, onClose }) {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !stock) return null;

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      alert('⚠️ You need to login to add stocks to your favorites!');
      return;
    }
    
    // TODO: Implement favorite functionality with Firestore
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      alert(`✅ ${stock.code} added to your watchlist!`);
    } else {
      alert(`❌ ${stock.code} removed from your watchlist!`);
    }
  };

  const handlePurchase = () => {
    if (!isAuthenticated) {
      alert('⚠️ You need to login to purchase stocks!');
      return;
    }
    
    // TODO: Implement purchase functionality
    alert(`🎉 Purchase order placed for ${quantity} share(s) of ${stock.code}!`);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const priceValue = parseFloat(stock.price?.replace('$', '') || 0);
  const totalCost = (priceValue * quantity).toFixed(2);

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-section">
            <h2>{stock.name}</h2>
            <span className="modal-stock-code">{stock.code}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Price Section */}
          <div className="modal-price-section">
            <div className="modal-current-price">
              <span className="price-label">Current Price</span>
              <span className="price-value">{stock.price}</span>
            </div>
            <div className={`modal-price-change ${stock.isPositive ? 'positive' : 'negative'}`}>
              <span>{stock.change}</span>
              <span>{stock.changePercent}</span>
            </div>
          </div>

          {/* Stock Details */}
          <div className="modal-details-grid">
            <div className="detail-item">
              <span className="detail-label">Volume</span>
              <span className="detail-value">{stock.volume || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Market Cap</span>
              <span className="detail-value">{stock.marketCap || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Day High</span>
              <span className="detail-value">{stock.dayHigh || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Day Low</span>
              <span className="detail-value">{stock.dayLow || 'N/A'}</span>
            </div>
          </div>

          {/* Purchase Section */}
          <div className="modal-purchase-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity (Shares)</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!isAuthenticated}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={!isAuthenticated}
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!isAuthenticated}
                >
                  +
                </button>
              </div>
            </div>

            <div className="total-cost">
              <span>Total Cost:</span>
              <span className="total-cost-value">${totalCost}</span>
            </div>
          </div>

          {!isAuthenticated && (
            <div className="login-prompt">
              <p>🔒 Please login to trade stocks</p>
              <button 
                className="login-prompt-btn"
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
              >
                Go to Login
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button 
            className={`btn-favorite ${isFavorite ? 'favorited' : ''}`}
            onClick={handleFavoriteToggle}
          >
            <span>{isFavorite ? '⭐' : '☆'}</span>
            <span>{isFavorite ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
          </button>
          <button 
            className="btn-purchase"
            onClick={handlePurchase}
          >
            <span>🛒</span>
            <span>Purchase</span>
          </button>
        </div>
      </div>
    </div>
  );
}

