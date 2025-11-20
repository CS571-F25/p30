// src/firebase/seedData.js
// This file contains sample data and a function to seed your Firebase database
// Run this once to populate your database with test data

import { addDocument } from './firestore';

// Sample stocks data
const sampleStocks = [
  {
    name: 'Apple Inc.',
    code: 'AAPL',
    price: '$187.50',
    change: '+$3.20',
    changePercent: '+1.71%',
    isPositive: true,
    volume: '52.3M',
    marketCap: '$2.8T',
    dayHigh: '$189.20',
    dayLow: '$185.30'
  },
  {
    name: 'Microsoft Corp.',
    code: 'MSFT',
    price: '$395.00',
    change: '+$10.75',
    changePercent: '+2.80%',
    isPositive: true,
    volume: '45.2M',
    marketCap: '$2.9T',
    dayHigh: '$398.50',
    dayLow: '$390.20'
  },
  {
    name: 'Google',
    code: 'GOOGL',
    price: '$142.00',
    change: '-$4.75',
    changePercent: '-3.26%',
    isPositive: false,
    volume: '38.7M',
    marketCap: '$1.8T',
    dayHigh: '$147.50',
    dayLow: '$141.20'
  },
  {
    name: 'Tesla Inc.',
    code: 'TSLA',
    price: '$237.50',
    change: '-$12.50',
    changePercent: '-5.00%',
    isPositive: false,
    volume: '120.5M',
    marketCap: '$753B',
    dayHigh: '$252.30',
    dayLow: '$235.10'
  },
  {
    name: 'Meta Platforms',
    code: 'META',
    price: '$385.00',
    change: '+$5.75',
    changePercent: '+1.52%',
    isPositive: true,
    volume: '28.4M',
    marketCap: '$995B',
    dayHigh: '$387.80',
    dayLow: '$380.50'
  },
  {
    name: 'NVIDIA Corp.',
    code: 'NVDA',
    price: '$495.00',
    change: '+$5.50',
    changePercent: '+1.12%',
    isPositive: true,
    volume: '180.2M',
    marketCap: '$1.2T',
    dayHigh: '$498.90',
    dayLow: '$487.20'
  },
  {
    name: 'Amazon.com Inc.',
    code: 'AMZN',
    price: '$178.50',
    change: '-$1.95',
    changePercent: '-1.08%',
    isPositive: false,
    volume: '65.1M',
    marketCap: '$1.8T',
    dayHigh: '$182.40',
    dayLow: '$177.80'
  },
  {
    name: 'Netflix Inc.',
    code: 'NFLX',
    price: '$485.00',
    change: '-$2.55',
    changePercent: '-0.52%',
    isPositive: false,
    volume: '12.8M',
    marketCap: '$214B',
    dayHigh: '$490.20',
    dayLow: '$483.50'
  }
];

// Sample user data
const sampleUser = {
  name: 'John Doe',
  email: 'john@example.com',
  totalAssets: '125000',
  return: '+12.5%'
};

// Sample holdings data
const sampleHoldings = [
  {
    userId: 'user123',
    name: 'Apple Inc.',
    code: 'AAPL',
    shares: 10,
    avgPrice: '175.00',
    currentPrice: '187.50',
    gainLoss: '125.00',
    returnPercent: '7.14'
  },
  {
    userId: 'user123',
    name: 'Tesla Inc.',
    code: 'TSLA',
    shares: 3,
    avgPrice: '250.00',
    currentPrice: '237.50',
    gainLoss: '-37.50',
    returnPercent: '-5.00'
  },
  {
    userId: 'user123',
    name: 'Microsoft Corp.',
    code: 'MSFT',
    shares: 5,
    avgPrice: '380.00',
    currentPrice: '395.00',
    gainLoss: '75.00',
    returnPercent: '3.95'
  }
];

// Sample transactions data
const sampleTransactions = [
  {
    userId: 'user123',
    date: 'Jan 15, 2024',
    name: 'Apple Inc.',
    code: 'AAPL',
    type: 'Buy',
    shares: 10,
    price: '187.50',
    amount: '1875.00'
  },
  {
    userId: 'user123',
    date: 'Jan 10, 2024',
    name: 'Meta Platforms',
    code: 'META',
    type: 'Sell',
    shares: 15,
    price: '385.00',
    amount: '5775.00'
  },
  {
    userId: 'user123',
    date: 'Jan 8, 2024',
    name: 'Microsoft Corp.',
    code: 'MSFT',
    type: 'Buy',
    shares: 5,
    price: '380.00',
    amount: '1900.00'
  },
  {
    userId: 'user123',
    date: 'Jan 5, 2024',
    name: 'Tesla Inc.',
    code: 'TSLA',
    type: 'Buy',
    shares: 3,
    price: '250.00',
    amount: '750.00'
  }
];

/**
 * Seed the database with sample data
 * WARNING: This will add new documents to your database
 */
export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Add stocks
    console.log('Adding stocks...');
    for (const stock of sampleStocks) {
      const id = await addDocument('stocks', stock);
      console.log(`Added stock: ${stock.code} (ID: ${id})`);
    }

    // Add user (with specific ID)
    console.log('Adding user...');
    // Note: For specific document IDs, you'd need to use setDoc instead
    // This will create with auto-generated ID
    const userId = await addDocument('users', sampleUser);
    console.log(`Added user: ${sampleUser.name} (ID: ${userId})`);

    // Add holdings
    console.log('Adding holdings...');
    for (const holding of sampleHoldings) {
      const id = await addDocument('holdings', holding);
      console.log(`Added holding: ${holding.code} (ID: ${id})`);
    }

    // Add transactions
    console.log('Adding transactions...');
    for (const transaction of sampleTransactions) {
      const id = await addDocument('transactions', transaction);
      console.log(`Added transaction: ${transaction.code} - ${transaction.type} (ID: ${id})`);
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📝 Note: Watchlist items will be created when you add stocks to your watchlist from the Stock Page.');
    return { success: true };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return { success: false, error };
  }
}

// Export sample data in case you want to use it elsewhere
export { sampleStocks, sampleUser, sampleHoldings, sampleTransactions };

