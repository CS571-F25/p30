// src/components/StockModal.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addDocument, queryDocuments, deleteDocument, updateDocument } from '../firebase/firestore';
import '../styles/modal.css';

export default function StockModal({ stock, isOpen, onClose, onWatchlistUpdate, onHoldingsUpdate, isSellMode = false }) {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchlistDocId, setWatchlistDocId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [maxShares, setMaxShares] = useState(0);

  // Check if stock is in watchlist when modal opens and get max shares for sell mode
  useEffect(() => {
    const checkWatchlist = async () => {
      if (!currentUser || !stock) {
        setIsFavorite(false);
        setWatchlistDocId(null);
        return;
      }

      try {
        const watchlistItems = await queryDocuments('watchlist', [
          ['userId', '==', currentUser.uid],
          ['code', '==', stock.code]
        ]);

        if (watchlistItems.length > 0) {
          setIsFavorite(true);
          setWatchlistDocId(watchlistItems[0].id);
        } else {
          setIsFavorite(false);
          setWatchlistDocId(null);
        }
      } catch (error) {
        console.error('Error checking watchlist:', error);
        setIsFavorite(false);
        setWatchlistDocId(null);
      }
    };

    const getMaxShares = async () => {
      if (!currentUser || !stock || !isSellMode) {
        setMaxShares(0);
        return;
      }

      try {
        const holdings = await queryDocuments('holdings', [
          ['userId', '==', currentUser.uid],
          ['code', '==', stock.code]
        ]);

        if (holdings.length > 0) {
          setMaxShares(holdings[0].shares || 0);
        } else {
          setMaxShares(0);
        }
      } catch (error) {
        console.error('Error getting max shares:', error);
        setMaxShares(0);
      }
    };

    if (isOpen) {
      checkWatchlist();
      getMaxShares();
      setQuantity(1); // Reset quantity when modal opens
    }
  }, [currentUser, stock, isOpen, isSellMode]);

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

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      alert('⚠️ You need to login to add stocks to your favorites!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isFavorite && watchlistDocId) {
        // Remove from watchlist
        await deleteDocument('watchlist', watchlistDocId);
        setIsFavorite(false);
        setWatchlistDocId(null);
        alert(`❌ ${stock.code} removed from your watchlist!`);
      } else {
        // Add to watchlist - only include defined fields
        const watchlistData = {
          userId: currentUser.uid,
          code: stock.code,
          name: stock.name,
          price: stock.price,
          change: stock.change,
          changePercent: stock.changePercent,
          isPositive: stock.isPositive,
          addedAt: new Date().toISOString()
        };
        
        // Only add optional fields if they exist
        if (stock.volume !== undefined) watchlistData.volume = stock.volume;
        if (stock.marketCap !== undefined) watchlistData.marketCap = stock.marketCap;
        if (stock.dayHigh !== undefined) watchlistData.dayHigh = stock.dayHigh;
        if (stock.dayLow !== undefined) watchlistData.dayLow = stock.dayLow;
        
        const docId = await addDocument('watchlist', watchlistData);
        setIsFavorite(true);
        setWatchlistDocId(docId);
        alert(`✅ ${stock.code} added to your watchlist!`);
      }
      
      // Trigger watchlist refresh in parent component
      if (onWatchlistUpdate) {
        onWatchlistUpdate();
      }
    } catch (error) {
      console.error('Error toggling watchlist:', error);
      alert('❌ Failed to update watchlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      alert('⚠️ You need to login to purchase stocks!');
      return;
    }
    
    setIsPurchasing(true);
    
    try {
      const currentPrice = parseFloat(stock.price?.replace('$', '') || 0);
      
      // Check if user already has holdings for this stock
      const existingHoldings = await queryDocuments('holdings', [
        ['userId', '==', currentUser.uid],
        ['code', '==', stock.code]
      ]);
      
      if (existingHoldings.length > 0) {
        // Update existing holding
        const holding = existingHoldings[0];
        const existingShares = holding.shares || 0;
        const existingAvgPrice = parseFloat(holding.avgBuyPrice?.replace('$', '') || 0);
        
        // Calculate new average price
        const totalCost = (existingShares * existingAvgPrice) + (quantity * currentPrice);
        const totalShares = existingShares + quantity;
        const newAvgPrice = totalCost / totalShares;
        
        const updateData = {
          shares: totalShares,
          avgBuyPrice: `$${newAvgPrice.toFixed(2)}`,
          lastUpdated: new Date().toISOString()
        };
        
        // Only update currentPrice if it exists and is not undefined
        if (stock.price && stock.price !== 'N/A') {
          updateData.currentPrice = stock.price;
        }
        
        await updateDocument('holdings', holding.id, updateData);
        
        alert(`✅ Successfully purchased ${quantity} more share(s) of ${stock.code}!\nYou now own ${totalShares} shares.`);
      } else {
        // Create new holding
        const holdingData = {
          userId: currentUser.uid,
          code: stock.code,
          name: stock.name,
          shares: quantity,
          avgBuyPrice: stock.price,
          currentPrice: stock.price,
          purchasedAt: new Date().toISOString()
        };
        
        // Only add optional fields if they exist
        if (stock.change !== undefined) holdingData.change = stock.change;
        if (stock.changePercent !== undefined) holdingData.changePercent = stock.changePercent;
        if (stock.isPositive !== undefined) holdingData.isPositive = stock.isPositive;
        if (stock.volume !== undefined) holdingData.volume = stock.volume;
        if (stock.marketCap !== undefined) holdingData.marketCap = stock.marketCap;
        if (stock.dayHigh !== undefined) holdingData.dayHigh = stock.dayHigh;
        if (stock.dayLow !== undefined) holdingData.dayLow = stock.dayLow;
        
        await addDocument('holdings', holdingData);
        alert(`🎉 Successfully purchased ${quantity} share(s) of ${stock.code}!`);
      }
      
      // Trigger holdings refresh in parent component
      if (onHoldingsUpdate) {
        onHoldingsUpdate();
      }
      
      onClose();
    } catch (error) {
      console.error('Error purchasing stock:', error);
      alert('❌ Failed to complete purchase. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleSell = async () => {
    if (!isAuthenticated) {
      alert('⚠️ You need to login to sell stocks!');
      return;
    }

    if (quantity > maxShares) {
      alert(`⚠️ You only own ${maxShares} share(s) of ${stock.code}!`);
      return;
    }
    
    setIsPurchasing(true);
    
    try {
      // Get user's holding for this stock
      const existingHoldings = await queryDocuments('holdings', [
        ['userId', '==', currentUser.uid],
        ['code', '==', stock.code]
      ]);
      
      if (existingHoldings.length === 0) {
        alert('⚠️ You do not own any shares of this stock!');
        setIsPurchasing(false);
        return;
      }

      const holding = existingHoldings[0];
      const currentShares = holding.shares || 0;
      const remainingShares = currentShares - quantity;

      if (remainingShares < 0) {
        alert(`⚠️ You only own ${currentShares} share(s) of ${stock.code}!`);
        setIsPurchasing(false);
        return;
      }

      if (remainingShares === 0) {
        // Delete the holding if all shares are sold
        await deleteDocument('holdings', holding.id);
        alert(`✅ Successfully sold all ${quantity} share(s) of ${stock.code}!`);
      } else {
        // Update the holding with remaining shares
        const updateData = {
          shares: remainingShares,
          lastUpdated: new Date().toISOString()
        };
        
        // Only update currentPrice if it exists and is not undefined
        const currentPrice = stock.price || stock.currentPrice;
        if (currentPrice && currentPrice !== 'N/A') {
          updateData.currentPrice = currentPrice;
        }
        
        await updateDocument('holdings', holding.id, updateData);
        alert(`✅ Successfully sold ${quantity} share(s) of ${stock.code}!\nYou still own ${remainingShares} shares.`);
      }
      
      // Trigger holdings refresh in parent component
      if (onHoldingsUpdate) {
        onHoldingsUpdate();
      }
      
      onClose();
    } catch (error) {
      console.error('Error selling stock:', error);
      alert('❌ Failed to complete sale. Please try again.');
    } finally {
      setIsPurchasing(false);
    }
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

          {/* Purchase/Sell Section */}
          <div className="modal-purchase-section">
            <div className="quantity-selector">
              <label htmlFor="quantity">
                {isSellMode ? `Quantity (You own ${maxShares} shares)` : 'Quantity (Shares)'}
              </label>
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
                  max={isSellMode ? maxShares : undefined}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    if (isSellMode) {
                      setQuantity(Math.min(maxShares, Math.max(1, val)));
                    } else {
                      setQuantity(Math.max(1, val));
                    }
                  }}
                  disabled={!isAuthenticated}
                />
                <button 
                  onClick={() => {
                    if (isSellMode) {
                      setQuantity(Math.min(maxShares, quantity + 1));
                    } else {
                      setQuantity(quantity + 1);
                    }
                  }}
                  disabled={!isAuthenticated || (isSellMode && quantity >= maxShares)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="total-cost">
              <span>{isSellMode ? 'Total Sale Value:' : 'Total Cost:'}</span>
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

          {isSellMode && maxShares === 0 && isAuthenticated && (
            <div className="login-prompt" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffc107' }}>
              <p style={{ color: '#856404' }}>⚠️ You don't own any shares of this stock</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {!isSellMode && (
            <button 
              className={`btn-favorite ${isFavorite ? 'favorited' : ''}`}
              onClick={handleFavoriteToggle}
              disabled={isLoading}
            >
              <span>{isFavorite ? '⭐' : '☆'}</span>
              <span>{isLoading ? 'Updating...' : (isFavorite ? 'Remove from Watchlist' : 'Add to Watchlist')}</span>
            </button>
          )}
          <button 
            className={isSellMode ? "btn-sell" : "btn-purchase"}
            onClick={isSellMode ? handleSell : handlePurchase}
            disabled={isPurchasing || (isSellMode && maxShares === 0)}
            style={isSellMode ? { 
              backgroundColor: '#dc3545', 
              flex: 1,
              opacity: (isPurchasing || maxShares === 0) ? 0.6 : 1 
            } : {}}
          >
            <span>{isSellMode ? '💰' : '🛒'}</span>
            <span>{isPurchasing ? 'Processing...' : (isSellMode ? 'Sell' : 'Purchase')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

