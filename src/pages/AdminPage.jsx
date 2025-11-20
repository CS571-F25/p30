// src/pages/AdminPage.jsx
// This is a simple admin page for testing and database management
// You can remove this in production

import React, { useState } from 'react';
import { seedDatabase } from '../firebase/seedData';
import { getAllDocuments, deleteDocument } from '../firebase/firestore';

export default function AdminPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const handleSeedDatabase = async () => {
    setLoading(true);
    setStatus('Seeding database...');
    
    try {
      const result = await seedDatabase();
      if (result.success) {
        setStatus('✅ Database seeded successfully!');
      } else {
        setStatus('❌ Error seeding database. Check console for details.');
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStats = async () => {
    setLoading(true);
    setStatus('Fetching database stats...');
    
    try {
      const stocks = await getAllDocuments('stocks');
      const users = await getAllDocuments('users');
      const holdings = await getAllDocuments('holdings');
      const transactions = await getAllDocuments('transactions');
      
      setStats({
        stocks: stocks.length,
        users: users.length,
        holdings: holdings.length,
        transactions: transactions.length
      });
      setStatus('✅ Stats fetched successfully!');
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCollection = async (collectionName) => {
    if (!window.confirm(`Are you sure you want to delete all documents in '${collectionName}'?`)) {
      return;
    }

    setLoading(true);
    setStatus(`Clearing ${collectionName}...`);
    
    try {
      const docs = await getAllDocuments(collectionName);
      for (const doc of docs) {
        await deleteDocument(collectionName, doc.id);
      }
      setStatus(`✅ Cleared ${docs.length} documents from ${collectionName}`);
      handleGetStats(); // Refresh stats
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-content">
      <section>
        <h2 className="section-title">Admin / Testing Tools</h2>
        <div className="card" style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            ⚠️ <strong>Warning:</strong> This page is for testing purposes only. 
            Remove it before deploying to production.
          </p>
        </div>

        {/* Status Message */}
        {status && (
          <div style={{ 
            padding: '1rem', 
            marginBottom: '1rem',
            backgroundColor: status.includes('✅') ? '#d4edda' : '#f8d7da',
            color: status.includes('✅') ? '#155724' : '#721c24',
            borderRadius: '4px',
            border: `1px solid ${status.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {status}
          </div>
        )}

        {/* Database Stats */}
        {stats && (
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3>Database Statistics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.stocks}</div>
                <div style={{ color: '#666' }}>Stocks</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.users}</div>
                <div style={{ color: '#666' }}>Users</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.holdings}</div>
                <div style={{ color: '#666' }}>Holdings</div>
              </div>
              <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.transactions}</div>
                <div style={{ color: '#666' }}>Transactions</div>
              </div>
            </div>
          </div>
        )}

        {/* Database Actions */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3>Database Actions</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <button 
              onClick={handleSeedDatabase} 
              disabled={loading}
              style={{ 
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Processing...' : '🌱 Seed Database'}
            </button>

            <button 
              onClick={handleGetStats} 
              disabled={loading}
              style={{ 
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Processing...' : '📊 Get Stats'}
            </button>
          </div>
        </div>

        {/* Clear Collections */}
        <div className="card">
          <h3>Clear Collections</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            ⚠️ Careful! These actions will permanently delete data.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['stocks', 'users', 'holdings', 'transactions'].map((collection) => (
              <button 
                key={collection}
                onClick={() => handleClearCollection(collection)} 
                disabled={loading}
                style={{ 
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                🗑️ Clear {collection}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="card" style={{ marginTop: '2rem', backgroundColor: '#f8f9fa' }}>
          <h3>Quick Start Instructions</h3>
          <ol style={{ lineHeight: '1.8' }}>
            <li>Make sure you've configured Firebase in <code>src/firebase/config.js</code></li>
            <li>Click <strong>"🌱 Seed Database"</strong> to populate your Firebase with sample data</li>
            <li>Click <strong>"📊 Get Stats"</strong> to see how many documents are in each collection</li>
            <li>Navigate to <strong>Stock Page</strong> or <strong>Profile Page</strong> to see the data in action</li>
            <li>Use the clear buttons to remove data if needed</li>
          </ol>
        </div>
      </section>
    </main>
  );
}

