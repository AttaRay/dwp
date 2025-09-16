const { manageUser } = require('./userManager');

// Quick user creation script
const createQuickUser = async () => {
  // Modify these values for each user you want to create
  const userData = {
    email: "crypto.trader5@example.com",          // REQUIRED: User's email
    password: "TempPass123!",                    // REQUIRED: Temporary password
    name: "Crypto Trader",                       // REQUIRED: User's full name
    
    // Available cash for trading
    availableCash: 30000,
    monthlyChange: 8.2,
    investmentChange: 12.1,
    
    // Crypto investments (when users buy XRP/XLM, these become their investments)
    xrpAmount: 200000,        // 200,000 XRP tokens purchased as investment
    xlmAmount: 500000,        // 500,000 XLM tokens purchased as investment
    // Prices will be fetched live from CoinGecko API
    
    // Performance metrics for the investment portfolio
    totalReturn: 25000,       // Total profit from crypto investments
    returnPercentage: 20.0,   // Return percentage on crypto investments
    dividendYield: 0,         // Crypto doesn't have dividends
    
    // All transaction history (deposits, withdrawals, crypto purchases, returns)
    transactions: [
      // Initial funding
      {
        date: new Date('2025-01-05'),
        type: 'deposit',
        description: 'Bank Transfer - Initial Account Funding',
        amount: 150000,
        status: 'completed'
      },
      // Investment purchases (crypto_purchase type will show in investments tab)
      {
        date: new Date('2025-01-15'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XRP',
        amount: -45000,              // Negative amount (money spent)
        cryptoAmount: 100000,        // 100,000 XRP tokens purchased
        price: 0.45,                 // Price per token at time of purchase
        description: 'Initial XRP Investment Purchase',
        status: 'completed'
      },
      {
        date: new Date('2025-01-25'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XLM',
        amount: -25000,              // Negative amount (money spent)
        cryptoAmount: 250000,        // 250,000 XLM tokens purchased
        price: 0.10,                 // Price per token at time of purchase
        description: 'Initial XLM Investment Purchase',
        status: 'completed'
      },
      {
        date: new Date('2025-02-20'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XRP',
        amount: -23500,              // Negative amount (money spent)
        cryptoAmount: 50000,         // Additional 50,000 XRP tokens
        price: 0.47,                 // Price per token at time of purchase
        description: 'Additional XRP Investment Purchase',
        status: 'completed'
      },
      {
        date: new Date('2025-03-10'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XRP',
        amount: -24000,              // Negative amount (money spent)
        cryptoAmount: 50000,         // Final 50,000 XRP tokens
        price: 0.48,                 // Price per token at time of purchase
        description: 'Final XRP Investment Purchase',
        status: 'completed'
      },
      {
        date: new Date('2025-04-15'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XLM',
        amount: -27500,              // Negative amount (money spent)
        cryptoAmount: 250000,        // Additional 250,000 XLM tokens
        price: 0.11,                 // Price per token at time of purchase
        description: 'Additional XLM Investment Purchase',
        status: 'completed'
      },
      // Investment returns/gains
      {
        date: new Date('2025-05-01'),
        type: 'return',
        description: 'Crypto Price Appreciation - XRP/XLM Gains',
        amount: 15000,
        status: 'completed'
      },
      // Withdrawal example
      {
        date: new Date('2025-06-15'),
        type: 'withdrawal',
        description: 'Withdrawal to Bank Account',
        amount: -5000,
        status: 'completed'
      },
      // Recent return
      {
        date: new Date('2025-08-01'),
        type: 'return',
        description: 'Monthly Crypto Portfolio Gains',
        amount: 10000,
        status: 'completed'
      }
    ],

    // Custom monthly performance (optional)
    monthlyPerformance: [
      { month: 'Jan', value: 100000, return: 5.0, xrpPrice: 0.45, xlmPrice: 0.10 },
      { month: 'Feb', value: 108000, return: 8.0, xrpPrice: 0.47, xlmPrice: 0.105 },
      { month: 'Mar', value: 115000, return: 6.5, xrpPrice: 0.48, xlmPrice: 0.108 },
      { month: 'Apr', value: 125000, return: 8.7, xrpPrice: 0.50, xlmPrice: 0.11 },
      { month: 'May', value: 135000, return: 8.0, xrpPrice: 0.51, xlmPrice: 0.115 },
      { month: 'Jun', value: 142000, return: 5.2, xrpPrice: 0.515, xlmPrice: 0.118 },
      { month: 'Jul', value: 148000, return: 4.2, xrpPrice: 0.52, xlmPrice: 0.12 },
      { month: 'Aug', value: 150000, return: 1.4, xrpPrice: 0.52, xlmPrice: 0.12 }
    ]
  };
  
  // Options
  const options = {
    forceOverwrite: false  // Set to true to overwrite existing user data
  };
  
  console.log('🚀 Starting user creation/update process...');
  console.log('=====================================');
  
  try {
    const result = await manageUser(userData, options);
    
    if (result && result.success) {
      console.log('=====================================');
      console.log('✅ Operation completed successfully!');
      console.log('=====================================');
      
      if (result.userId) {
        console.log('📧 Send these login credentials to the user:');
        console.log(`Email: ${userData.email}`);
        console.log(`Temporary Password: ${userData.password}`);
        console.log('(User should change password on first login)');
      }
    }
  } catch (error) {
    console.error('❌ Operation failed:', error);
  }
};

// Run the script
createQuickUser();
