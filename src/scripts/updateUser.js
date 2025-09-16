const { updateUser, fetchLiveCryptoPrices } = require('./userManager');

// Direct user update by UID (no password required)
const updateUserDirectly = async () => {
  // STEP 1: Set the user's UID directly (get this from Firebase Console or when they login)
  const userUID = "ZbB6OTkiWmRRKfpCU7kTja0Xs4r1";  // 👈 Replace with actual UID
  
  // STEP 2: Define the new data to add
  const userData = {
    email: "crypto.trader2@example.com",     // For reference only
    name: "Crypto Trader",                   // For reference only
    
    // Updated portfolio values (will merge with existing)
    availableCash: 84000,                    // Updated available cash
    monthlyChange: 15.3,                     // New monthly change
    investmentChange: 18.7,                  // New investment change
    
    // DON'T specify xrpAmount/xlmAmount here - let transactions calculate totals
    // xrpAmount: 300000,   // ❌ REMOVED - causes double counting
    // xlmAmount: 750000,   // ❌ REMOVED - causes double counting
    
    // Updated performance metrics
    totalReturn: 45000,       // Updated total profit from crypto investments
    returnPercentage: 35.2,   // Updated return percentage
    dividendYield: 0,         // Crypto doesn't have dividends
    
    // NEW transactions to add to existing transaction history
    // These will be counted to calculate total crypto holdings
    transactions: [
      {
        date: new Date('2025-09-01'),
        type: 'deposit',
        description: 'Bank Transfer - Additional Funding',
        amount: 75000,
        status: 'completed'
      },
      {
        date: new Date('2025-09-05'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XRP',
        amount: -26000,
        cryptoAmount: 50000,    // This will add 50k XRP
        price: 0.52,
        description: 'September XRP Investment Purchase',
        status: 'completed'
      },
      {
        date: new Date('2025-09-09'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XLM',
        amount: -30000,
        cryptoAmount: 250000,   // This will add 250k XLM
        price: 0.12,
        description: 'September XLM Investment Purchase',
        status: 'completed'
      },
      {
        date: new Date('2025-09-10'),
        type: 'return',
        description: 'September Crypto Portfolio Gains',
        amount: 20000,
        status: 'completed'
      },
      {
        date: new Date('2025-04-15'),
        type: 'crypto_purchase',
        action: 'buy',
        symbol: 'XLM',
        amount: -27500,
        cryptoAmount: 250000,   // This will add another 250k XLM
        price: 0.11,
        description: 'Additional XLM Investment Purchase',
        status: 'completed'
      },
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
  
  console.log('🔄 Starting direct user update...');
  console.log('=====================================');
  console.log(`👤 Updating user UID: ${userUID}`);
  
  if (userUID === "PASTE_USER_UID_HERE") {
    console.error('❌ Please replace "PASTE_USER_UID_HERE" with the actual user UID');
    console.log('💡 You can find the UID in:');
    console.log('   1. Firebase Console > Authentication > Users');
    console.log('   2. Browser dev tools when user is logged in (user.uid)');
    console.log('   3. Ask the user to run: console.log(auth.currentUser.uid) in browser');
    return;
  }
  
  try {
    // Fetch live crypto prices
    console.log('� Fetching live crypto prices...');
    const livePrices = await fetchLiveCryptoPrices();
    
    // Update user directly with UID
    const result = await updateUser(userUID, userData, false, livePrices);
    
    if (result && result.success) {
      console.log('=====================================');
      console.log('✅ User updated successfully!');
      console.log('📊 New transactions, performance data, and holdings added!');
      console.log('💰 Live crypto prices applied to all transactions');
      console.log('=====================================');
    } else {
      console.log('⚠️ Update completed but no success confirmation received');
    }
  } catch (error) {
    console.error('❌ Update failed:', error.message);
  }
};

// Run the direct update
updateUserDirectly();
