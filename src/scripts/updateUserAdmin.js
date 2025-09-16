const { updateUserByEmail } = require('./userManager');

// Admin script to update existing users WITHOUT requiring passwords
const updateExistingUserAdmin = async () => {
  // Modify these values to add new data to an existing user
  const userData = {
    email: "crypto.trader2@example.com",          // REQUIRED: User's email (to find existing user)
    name: "Crypto Trader",                       // REQUIRED: User's name
    
    // Updated portfolio values (will merge with existing)
    availableCash: 50000,                        // Updated available cash
    monthlyChange: 15.3,                         // New monthly change
    investmentChange: 18.7,                      // New investment change
    
    // Updated crypto holdings (will merge with existing amounts)
    xrpAmount: 300000,        // Total XRP after new purchases
    xlmAmount: 750000,        // Total XLM after new purchases
    // Prices will be fetched live from CoinGecko API
    
    // Updated performance metrics
    totalReturn: 45000,       // Updated total profit from crypto investments
    returnPercentage: 35.2,   // Updated return percentage
    dividendYield: 0,         // Crypto doesn't have dividends
    
    // NEW transactions to add to existing transaction history
    transactions: [
      // New deposit
      {
        date: new Date('2025-09-01'),
        type: 'deposit',
        description: 'Bank Transfer - Additional Funding',
        amount: 75000,
        status: 'completed'
      },
      // New crypto investment purchases
      {
        date: new Date('2025-09-05'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XRP',
        amount: -26000,              // Negative amount (money spent)
        cryptoAmount: 50000,         // 50,000 additional XRP tokens
        price: 0.52,                 // Will be updated with live price
        description: 'September XRP Investment Purchase',
        status: 'completed'
      },
      {
        date: new Date('2025-09-08'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XLM',
        amount: -30000,              // Negative amount (money spent)
        cryptoAmount: 250000,        // 250,000 additional XLM tokens
        price: 0.12,                 // Will be updated with live price
        description: 'September XLM Investment Purchase',
        status: 'completed'
      },
      // New return/gain
      {
        date: new Date('2025-09-10'),
        type: 'return',
        description: 'September Crypto Portfolio Gains',
        amount: 20000,
        status: 'completed'
      },
      // New withdrawal
      {
        date: new Date('2025-09-11'),
        type: 'withdrawal',
        description: 'Partial Profit Withdrawal',
        amount: -15000,
        status: 'completed'
      }
    ],

    // NEW monthly performance data to add
    monthlyPerformance: [
      { month: 'Sep', value: 180000, return: 15.3, xrpPrice: 0.52, xlmPrice: 0.12 },
      { month: 'Oct', value: 195000, return: 8.3, xrpPrice: 0.54, xlmPrice: 0.125 }
    ]
  };
  
  // Options - set forceOverwrite to false to ADD new data instead of replacing
  const options = {
    forceOverwrite: false  // FALSE = Add new data to existing user
                          // TRUE = Replace all existing data
  };
  
  console.log('🔄 Starting ADMIN user update process...');
  console.log('⚠️  NO PASSWORD REQUIRED - Admin mode');
  console.log('=====================================');
  console.log(`📧 Looking for user: ${userData.email}`);
  
  try {
    const result = await updateUserByEmail(userData.email, userData, options);
    
    if (result && result.success) {
      console.log('=====================================');
      console.log('✅ User updated successfully!');
      console.log('📊 New transactions, performance data, and holdings added!');
      console.log('=====================================');
    } else {
      console.log('=====================================');
      console.log('❌ User update failed or user not found');
      console.log('💡 Make sure the user email exists and has portfolio data');
      console.log('=====================================');
    }
  } catch (error) {
    console.error('❌ Update failed:', error);
  }
};

// Run the admin update script
updateExistingUserAdmin();
