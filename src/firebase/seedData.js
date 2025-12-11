// src/firebase/seedData.js
// This file contains sample data and a function to seed your Firebase database
// Run this once to populate your database with test data

import { addDocument } from './firestore';

// Sample stocks data - 30 popular stocks
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
    name: 'Alphabet Inc.',
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
    name: 'Meta Platforms Inc.',
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
    change: '+$15.50',
    changePercent: '+3.23%',
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
  },
  {
    name: 'JPMorgan Chase & Co.',
    code: 'JPM',
    price: '$165.75',
    change: '+$2.30',
    changePercent: '+1.41%',
    isPositive: true,
    volume: '15.6M',
    marketCap: '$480B',
    dayHigh: '$167.20',
    dayLow: '$163.50'
  },
  {
    name: 'Visa Inc.',
    code: 'V',
    price: '$258.90',
    change: '+$4.20',
    changePercent: '+1.65%',
    isPositive: true,
    volume: '9.2M',
    marketCap: '$540B',
    dayHigh: '$260.50',
    dayLow: '$256.10'
  },
  {
    name: 'Johnson & Johnson',
    code: 'JNJ',
    price: '$152.40',
    change: '-$0.85',
    changePercent: '-0.55%',
    isPositive: false,
    volume: '8.7M',
    marketCap: '$390B',
    dayHigh: '$154.20',
    dayLow: '$151.80'
  },
  {
    name: 'Walmart Inc.',
    code: 'WMT',
    price: '$175.30',
    change: '+$3.50',
    changePercent: '+2.04%',
    isPositive: true,
    volume: '11.3M',
    marketCap: '$480B',
    dayHigh: '$176.80',
    dayLow: '$173.20'
  },
  {
    name: 'Procter & Gamble Co.',
    code: 'PG',
    price: '$148.20',
    change: '+$1.10',
    changePercent: '+0.75%',
    isPositive: true,
    volume: '7.5M',
    marketCap: '$360B',
    dayHigh: '$149.50',
    dayLow: '$147.30'
  },
  {
    name: 'UnitedHealth Group Inc.',
    code: 'UNH',
    price: '$485.60',
    change: '+$8.40',
    changePercent: '+1.76%',
    isPositive: true,
    volume: '4.2M',
    marketCap: '$450B',
    dayHigh: '$488.90',
    dayLow: '$482.50'
  },
  {
    name: 'Home Depot Inc.',
    code: 'HD',
    price: '$325.75',
    change: '-$5.25',
    changePercent: '-1.59%',
    isPositive: false,
    volume: '5.8M',
    marketCap: '$335B',
    dayHigh: '$332.50',
    dayLow: '$324.10'
  },
  {
    name: 'Mastercard Inc.',
    code: 'MA',
    price: '$415.30',
    change: '+$6.80',
    changePercent: '+1.66%',
    isPositive: true,
    volume: '4.5M',
    marketCap: '$395B',
    dayHigh: '$418.20',
    dayLow: '$412.50'
  },
  {
    name: 'Coca-Cola Company',
    code: 'KO',
    price: '$58.95',
    change: '+$0.45',
    changePercent: '+0.77%',
    isPositive: true,
    volume: '16.2M',
    marketCap: '$255B',
    dayHigh: '$59.20',
    dayLow: '$58.40'
  },
  {
    name: 'PepsiCo Inc.',
    code: 'PEP',
    price: '$168.50',
    change: '-$1.20',
    changePercent: '-0.71%',
    isPositive: false,
    volume: '6.3M',
    marketCap: '$233B',
    dayHigh: '$170.30',
    dayLow: '$167.80'
  },
  {
    name: 'Intel Corporation',
    code: 'INTC',
    price: '$42.85',
    change: '+$1.65',
    changePercent: '+4.00%',
    isPositive: true,
    volume: '55.8M',
    marketCap: '$180B',
    dayHigh: '$43.50',
    dayLow: '$41.80'
  },
  {
    name: 'Cisco Systems Inc.',
    code: 'CSCO',
    price: '$51.20',
    change: '+$0.90',
    changePercent: '+1.79%',
    isPositive: true,
    volume: '24.5M',
    marketCap: '$210B',
    dayHigh: '$51.75',
    dayLow: '$50.40'
  },
  {
    name: 'Adobe Inc.',
    code: 'ADBE',
    price: '$565.30',
    change: '-$8.70',
    changePercent: '-1.52%',
    isPositive: false,
    volume: '3.8M',
    marketCap: '$262B',
    dayHigh: '$575.50',
    dayLow: '$563.20'
  },
  {
    name: 'Salesforce Inc.',
    code: 'CRM',
    price: '$285.40',
    change: '+$12.60',
    changePercent: '+4.62%',
    isPositive: true,
    volume: '8.9M',
    marketCap: '$280B',
    dayHigh: '$287.90',
    dayLow: '$278.50'
  },
  {
    name: 'Oracle Corporation',
    code: 'ORCL',
    price: '$118.75',
    change: '+$2.25',
    changePercent: '+1.93%',
    isPositive: true,
    volume: '12.4M',
    marketCap: '$330B',
    dayHigh: '$119.80',
    dayLow: '$117.20'
  },
  {
    name: 'Pfizer Inc.',
    code: 'PFE',
    price: '$28.65',
    change: '-$0.35',
    changePercent: '-1.21%',
    isPositive: false,
    volume: '42.7M',
    marketCap: '$161B',
    dayHigh: '$29.20',
    dayLow: '$28.40'
  },
  {
    name: 'Abbott Laboratories',
    code: 'ABT',
    price: '$105.90',
    change: '+$1.75',
    changePercent: '+1.68%',
    isPositive: true,
    volume: '6.8M',
    marketCap: '$185B',
    dayHigh: '$106.80',
    dayLow: '$104.50'
  },
  {
    name: 'The Walt Disney Company',
    code: 'DIS',
    price: '$95.75',
    change: '-$2.15',
    changePercent: '-2.20%',
    isPositive: false,
    volume: '18.3M',
    marketCap: '$175B',
    dayHigh: '$98.50',
    dayLow: '$95.20'
  },
  {
    name: 'Verizon Communications',
    code: 'VZ',
    price: '$38.45',
    change: '+$0.55',
    changePercent: '+1.45%',
    isPositive: true,
    volume: '21.6M',
    marketCap: '$161B',
    dayHigh: '$38.80',
    dayLow: '$37.90'
  },
  {
    name: 'AT&T Inc.',
    code: 'T',
    price: '$16.25',
    change: '-$0.15',
    changePercent: '-0.91%',
    isPositive: false,
    volume: '48.9M',
    marketCap: '$116B',
    dayHigh: '$16.50',
    dayLow: '$16.15'
  },
  {
    name: 'Exxon Mobil Corporation',
    code: 'XOM',
    price: '$112.30',
    change: '+$3.85',
    changePercent: '+3.55%',
    isPositive: true,
    volume: '25.7M',
    marketCap: '$465B',
    dayHigh: '$113.50',
    dayLow: '$110.80'
  },
  {
    name: 'Chevron Corporation',
    code: 'CVX',
    price: '$158.90',
    change: '+$2.40',
    changePercent: '+1.53%',
    isPositive: true,
    volume: '11.2M',
    marketCap: '$295B',
    dayHigh: '$160.20',
    dayLow: '$157.50'
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

