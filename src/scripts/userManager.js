const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc, collection, getDocs } = require('firebase/firestore');
const { getAuth, createUserWithEmailAndPassword, updatePassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');
const https = require('https');

// Function to fetch live crypto prices from CoinGecko API
const fetchLiveCryptoPrices = () => {
  return new Promise((resolve, reject) => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ripple,stellar&vs_currencies=usd';
    
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const prices = JSON.parse(data);
          const result = {
            xrpPrice: prices.ripple?.usd || 0.52, // Fallback to default if API fails
            xlmPrice: prices.stellar?.usd || 0.12, // Fallback to default if API fails
            timestamp: new Date().toISOString()
          };
          
          console.log('✅ Live crypto prices fetched successfully:');
          console.log(`   XRP: $${result.xrpPrice}`);
          console.log(`   XLM: $${result.xlmPrice}`);
          console.log(`   Timestamp: ${result.timestamp}`);
          
          resolve(result);
        } catch (error) {
          console.warn('⚠️ Error parsing price data, using fallback prices');
          resolve({
            xrpPrice: 0.52,
            xlmPrice: 0.12,
            timestamp: new Date().toISOString()
          });
        }
      });
    }).on('error', (error) => {
      console.warn('⚠️ Error fetching live prices, using fallback prices:', error.message);
      resolve({
        xrpPrice: 0.52,
        xlmPrice: 0.12,
        timestamp: new Date().toISOString()
      });
    });
  });
};

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3fem9zq_Qw8OkjUviC3Z4nV9WAj7iQgw",
  authDomain: "dwpweb-cfb81.firebaseapp.com",
  projectId: "dwpweb-cfb81",
  storageBucket: "dwpweb-cfb81.firebasestorage.app",
  messagingSenderId: "426124573000",
  appId: "1:426124573000:web:c03347bd24e22e483b9b7d",
  measurementId: "G-W8J847W8NB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// User data template - now uses live crypto prices
const createUserData = (userData, livePrices = null) => {
  const {
    email,
    name,
    totalBalance = 100000,
    availableCash = 20000,
    monthlyChange = 2.5,
    investmentChange = 3.2,
    xrpAmount = 100000, // Amount of XRP tokens
    xlmAmount = 50000,  // Amount of XLM tokens
    xrpPrice = livePrices?.xrpPrice || 0.52,    // Use live price or fallback
    xlmPrice = livePrices?.xlmPrice || 0.12,    // Use live price or fallback
    monthlyPerformance = [],
    transactions = [], // All transactions including investments
    totalReturn = 12500,
    returnPercentage = 8.5,
    dividendYield = 2.8
  } = userData;

  // Update crypto purchase transactions with live prices if needed
  const updateTransactionPrices = (transactions, livePrices) => {
    if (!livePrices) return transactions;
    
    return transactions.map(transaction => {
      // Only update crypto_purchase transactions with low prices (indicating they need updating)
      if (transaction.type === 'crypto_purchase' && transaction.price && transaction.price <= 0.50) {
        if (transaction.symbol === 'XRP') {
          return {
            ...transaction,
            price: livePrices.xrpPrice,
            amount: -(transaction.cryptoAmount * livePrices.xrpPrice) // Negative for money spent
          };
        } else if (transaction.symbol === 'XLM') {
          return {
            ...transaction,
            price: livePrices.xlmPrice,
            amount: -(transaction.cryptoAmount * livePrices.xlmPrice) // Negative for money spent
          };
        }
      }
      return transaction;
    });
  };

  // Calculate investment values based on crypto purchases
  // When users buy XRP/XLM, these become their investments
  const xrpValue = xrpAmount * xrpPrice;
  const xlmValue = xlmAmount * xlmPrice;
  const totalInvestments = xrpValue + xlmValue;  // Total value of crypto investments
  const calculatedTotalBalance = totalInvestments + availableCash;

  // Update transactions with live prices
  const updatedTransactions = updateTransactionPrices(transactions, livePrices);

  return {
    portfolio: {
      totalBalance: totalBalance || calculatedTotalBalance,
      totalInvestments,           // Total value of all crypto investments
      availableCash,              // Cash available for new crypto purchases
      monthlyChange,
      investmentChange,
      name,
      totalReturn,               // Profit/loss from crypto investments
      returnPercentage,          // Return percentage on crypto investments
      dividendYield
    },
    allocation: {
      xrp: xrpValue,            // Value of XRP investments
      xlm: xlmValue,            // Value of XLM investments
      cash: availableCash,      // Available cash for trading
      totalValue: totalBalance || calculatedTotalBalance
    },
    cryptoInvestments: {        // Renamed from cryptoHoldings to emphasize these are investments
      xrp: {
        amount: xrpAmount,      // Number of XRP tokens owned as investment
        price: xrpPrice,        // Current price per XRP token
        value: xrpValue,        // Total value of XRP investment
        symbol: 'XRP'
      },
      xlm: {
        amount: xlmAmount,      // Number of XLM tokens owned as investment
        price: xlmPrice,        // Current price per XLM token
        value: xlmValue,        // Total value of XLM investment
        symbol: 'XLM'
      }
    },
    monthlyPerformance: monthlyPerformance.length > 0 ? monthlyPerformance : [
      { month: 'Jan', value: (totalBalance || calculatedTotalBalance) * 0.85, return: 2.1, xrpPrice: 0.48, xlmPrice: 0.11 },
      { month: 'Feb', value: (totalBalance || calculatedTotalBalance) * 0.87, return: 2.3, xrpPrice: 0.49, xlmPrice: 0.115 },
      { month: 'Mar', value: (totalBalance || calculatedTotalBalance) * 0.89, return: 2.8, xrpPrice: 0.50, xlmPrice: 0.116 },
      { month: 'Apr', value: (totalBalance || calculatedTotalBalance) * 0.92, return: 3.2, xrpPrice: 0.51, xlmPrice: 0.118 },
      { month: 'May', value: (totalBalance || calculatedTotalBalance) * 0.95, return: 2.9, xrpPrice: 0.515, xlmPrice: 0.119 },
      { month: 'Jun', value: (totalBalance || calculatedTotalBalance) * 0.97, return: 2.1, xrpPrice: 0.518, xlmPrice: 0.1195 },
      { month: 'Jul', value: (totalBalance || calculatedTotalBalance), return: 3.1, xrpPrice: 0.52, xlmPrice: 0.12 },
      { month: 'Aug', value: (totalBalance || calculatedTotalBalance) * 1.02, return: 2.0, xrpPrice: 0.521, xlmPrice: 0.1205 },
      { month: 'Sep', value: (totalBalance || calculatedTotalBalance) * 1.05, return: 2.9, xrpPrice: 0.525, xlmPrice: 0.121 }
    ],
    transactions: updatedTransactions.length > 0 ? updatedTransactions : [
      {
        date: new Date(),
        type: "deposit",
        description: "Initial USD Deposit",
        amount: (totalBalance || calculatedTotalBalance) * 0.2,
        status: "completed"
      },
      {
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        type: "crypto_buy",
        description: `Purchase ${xrpAmount.toLocaleString()} XRP`,
        amount: -xrpValue,
        status: "completed",
        cryptoAmount: xrpAmount,
        cryptoSymbol: "XRP",
        cryptoPrice: xrpPrice
      },
      {
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        type: "crypto_buy",
        description: `Purchase ${xlmAmount.toLocaleString()} XLM`,
        amount: -xlmValue,
        status: "completed",
        cryptoAmount: xlmAmount,
        cryptoSymbol: "XLM",
        cryptoPrice: xlmPrice
      },
      {
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        type: "return",
        description: "Crypto Price Appreciation",
        amount: (totalBalance || calculatedTotalBalance) * 0.02,
        status: "completed"
      }
    ],
    holdings: [
      {
        name: "XRP",
        symbol: "XRP",
        category: "Cryptocurrency",
        amount: xrpAmount,
        avgCost: xrpPrice * 0.95, // Slightly lower avg cost to show profit
        currentPrice: xrpPrice,
        marketValue: xrpValue,
        return: ((xrpPrice - (xrpPrice * 0.95)) / (xrpPrice * 0.95) * 100).toFixed(1)
      },
      {
        name: "Stellar Lumens",
        symbol: "XLM",
        category: "Cryptocurrency",
        amount: xlmAmount,
        avgCost: xlmPrice * 0.92, // Slightly lower avg cost to show profit
        currentPrice: xlmPrice,
        marketValue: xlmValue,
        return: ((xlmPrice - (xlmPrice * 0.92)) / (xlmPrice * 0.92) * 100).toFixed(1)
      }
    ]
  };
};

// Direct update function for admin use - no password required
const updateUserByEmail = async (email, userData, options = {}) => {
  const { forceOverwrite = false } = options;
  
  try {
    console.log(`🔍 Looking for user with email: ${email}`);
    
    // Fetch live crypto prices
    console.log('📊 Fetching live crypto prices...');
    const livePrices = await fetchLiveCryptoPrices();
    
    // Since we can't query by email easily, we'll search through existing users
    // This is a workaround - in production you'd use Firebase Admin SDK
    
    // For now, let's try a different approach - check common UID patterns
    // or iterate through possible user documents
    
    console.log('🔍 Searching for user in Firestore...');
    
    // Try to find user by checking portfolio documents
    // We'll use a collection group query if possible, or iterate through users
    
    const usersSnapshot = await getDocs(collection(db, 'users'));
    console.log(`📁 Checking ${usersSnapshot.size} user directories...`);
    
    for (const userDoc of usersSnapshot.docs) {
      try {
        const portfolioDoc = await getDoc(doc(db, `users/${userDoc.id}/portfolio/summary`));
        if (portfolioDoc.exists()) {
          const portfolioData = portfolioDoc.data();
          if (portfolioData.email === email) {
            console.log(`✅ Found user! UID: ${userDoc.id}`);
            return await updateUser(userDoc.id, userData, forceOverwrite, livePrices);
          }
        }
      } catch (error) {
        // Skip this user if we can't read their portfolio
        continue;
      }
    }
    
    console.log(`❌ User with email ${email} not found in Firestore`);
    console.log(`💡 User might exist in Auth but not have portfolio data yet`);
    return { success: false, message: 'User not found in Firestore' };
    
  } catch (error) {
    console.error('❌ Error updating user:', error);
    throw error;
  }
};

// Get user UID by signing them in temporarily
const getUserUid = async (email, password) => {
  try {
    console.log(`🔐 Signing in user to get UID: ${email}`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    console.log(`✅ User UID obtained: ${uid}`);
    
    // Sign out immediately after getting UID
    await signOut(auth);
    console.log(`🔓 User signed out`);
    
    return uid;
  } catch (error) {
    console.error('❌ Error getting user UID:', error.message);
    throw error;
  }
};

// Check if user exists in Firebase Auth
const checkUserExists = async (email) => {
  try {
    console.log(`🔍 Checking if user exists: ${email}`);
    
    // Since we can't query Firebase Auth directly from client SDK,
    // we'll try to create the user and catch the "email-already-in-use" error
    // This tells us the user exists in Auth
    
    // For now, let's assume user exists if we're running updateUser
    // and look for their portfolio data using a different method
    
    // Try to find user by checking all potential UIDs
    // This is a workaround since we can't query Auth by email from client SDK
    console.log(`⚠️ Cannot directly query Firebase Auth from client SDK`);
    console.log(`🔄 Assuming user exists and will let the creation process handle Auth check`);
    
    return { exists: false, userId: null, assumeExists: true };
  } catch (error) {
    console.error('Error checking user existence:', error);
    return { exists: false, userId: null };
  }
};

// Create new user
const createUser = async (userData, livePrices = null) => {
  const { email, password, name } = userData;
  
  try {
    console.log(`Creating new user: ${email}`);
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    
    // Create user data with live prices
    const userDataStructure = createUserData({ ...userData, email, name }, livePrices);
    
    // Save portfolio summary
    await setDoc(doc(db, `users/${userId}/portfolio/summary`), {
      ...userDataStructure.portfolio,
      email
    });
    
    // Save asset allocation
    await setDoc(doc(db, `users/${userId}/allocation/current`), userDataStructure.allocation);
    
    // Save crypto investments data
    await setDoc(doc(db, `users/${userId}/portfolio/cryptoInvestments`), userDataStructure.cryptoInvestments);
    
    // Save monthly performance with crypto prices
    for (const [index, monthData] of userDataStructure.monthlyPerformance.entries()) {
      await setDoc(doc(db, `users/${userId}/performance/${monthData.month}`), monthData);
    }
    
    // Save investment holdings
    await setDoc(doc(db, `users/${userId}/portfolio/investments`), {
      totalValue: userDataStructure.portfolio.totalBalance,
      totalReturn: userDataStructure.portfolio.totalReturn,
      returnPercentage: userDataStructure.portfolio.returnPercentage,
      dividendYield: userDataStructure.portfolio.dividendYield,
      holdings: userDataStructure.holdings
    });
    
    // Save transactions
    for (const [index, transaction] of userDataStructure.transactions.entries()) {
      await setDoc(doc(db, `users/${userId}/transactions/tx_${index + 1}`), transaction);
    }
    
    // Save withdrawal settings
    await setDoc(doc(db, `users/${userId}/settings/withdrawal`), {
      availableForWithdrawal: userDataStructure.portfolio.availableCash,
      pendingWithdrawals: 0,
      minimumWithdrawal: 100,
      maximumWithdrawal: userDataStructure.portfolio.availableCash,
      processingTime: "2-3 business days",
      methods: ["Bank Transfer", "Wire Transfer"]
    });
    
    console.log('✅ User created successfully!');
    console.log(`User ID: ${userId}`);
    console.log(`Email: ${email}`);
    console.log(`Name: ${name}`);
    return { success: true, userId };
    
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    return { success: false, error: error.message };
  }
};

// Update existing user
const updateUser = async (userId, userData, overwrite = false, livePrices = null) => {
  try {
    console.log(`${overwrite ? 'Overwriting' : 'Adding new data to'} user ID: ${userId}`);
    
    const userDataStructure = createUserData(userData, livePrices);
    
    if (overwrite) {
      console.log('🔄 Overwriting all user data...');
      
      // Overwrite portfolio summary
      await setDoc(doc(db, `users/${userId}/portfolio/summary`), {
        ...userDataStructure.portfolio,
        email: userData.email
      });
      
      // Overwrite asset allocation
      await setDoc(doc(db, `users/${userId}/allocation/current`), userDataStructure.allocation);
      
      // Overwrite crypto holdings
      await setDoc(doc(db, `users/${userId}/portfolio/cryptoInvestments`), userDataStructure.cryptoInvestments);
      
      // Overwrite monthly performance
      for (const monthData of userDataStructure.monthlyPerformance) {
        await setDoc(doc(db, `users/${userId}/performance/${monthData.month}`), monthData);
      }
      
      // Overwrite all transactions
      for (const [index, transaction] of userDataStructure.transactions.entries()) {
        await setDoc(doc(db, `users/${userId}/transactions/tx_${index + 1}`), transaction);
      }
      
      // Overwrite investment holdings
      await setDoc(doc(db, `users/${userId}/portfolio/investments`), {
        totalValue: userDataStructure.portfolio.totalBalance,
        totalReturn: userDataStructure.portfolio.totalReturn,
        returnPercentage: userDataStructure.portfolio.returnPercentage,
        dividendYield: userDataStructure.portfolio.dividendYield,
        holdings: userDataStructure.holdings
      });
      
    } else {
      console.log('🔄 Adding new data to existing user...');
      
      // Simply add new transactions - crypto totals will be calculated dynamically from transactions
      console.log('� Crypto holdings will be calculated automatically from all transactions');
      
      // Get existing transaction count to append new transactions
      const existingTransactions = await getDocs(collection(db, `users/${userId}/transactions`));
      const nextTransactionId = existingTransactions.size + 1;
      
      // Add new transactions (append to existing)
      if (userData.transactions && userData.transactions.length > 0) {
        console.log(`📝 Adding ${userData.transactions.length} new transactions...`);
        for (const [index, transaction] of userData.transactions.entries()) {
          await setDoc(doc(db, `users/${userId}/transactions/tx_${nextTransactionId + index}`), transaction);
        }
        
        // Log crypto purchases for visibility
        const cryptoPurchases = userData.transactions.filter(t => t.type === 'crypto_purchase');
        if (cryptoPurchases.length > 0) {
          console.log('💰 New crypto purchases added:');
          cryptoPurchases.forEach(purchase => {
            console.log(`   ${purchase.cryptoAmount.toLocaleString()} ${purchase.symbol} at $${purchase.price}`);
          });
          console.log('📊 Total holdings will be recalculated from all transactions when displayed');
        }
      }
      
      // Add/update monthly performance (only new months)
      if (userData.monthlyPerformance && userData.monthlyPerformance.length > 0) {
        console.log('📊 Adding/updating monthly performance data...');
        for (const monthData of userData.monthlyPerformance) {
          await setDoc(doc(db, `users/${userId}/performance/${monthData.month}`), monthData, { merge: true });
        }
      }
      
      // Update portfolio totals (merge with existing)
      console.log('💰 Updating portfolio summary...');
      const userDataStructure = createUserData(userData, livePrices);
      await setDoc(doc(db, `users/${userId}/portfolio/summary`), {
        ...userDataStructure.portfolio,
        email: userData.email
      }, { merge: true });
      
      // Update asset allocation (merge)
      await setDoc(doc(db, `users/${userId}/allocation/current`), userDataStructure.allocation, { merge: true });
      
      // No need to update cryptoInvestments document - it's calculated dynamically from transactions
      
      // Update investment portfolio data with recalculated values
      await setDoc(doc(db, `users/${userId}/portfolio/investments`), {
        totalValue: userDataStructure.portfolio.totalBalance,
        totalReturn: userDataStructure.portfolio.totalReturn,
        returnPercentage: userDataStructure.portfolio.returnPercentage,
        dividendYield: userDataStructure.portfolio.dividendYield,
        holdings: userDataStructure.holdings
      }, { merge: true });
      
      console.log('✅ New data added successfully to existing user!');
    }
    
    console.log('✅ User data updated successfully!');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Error updating user:', error.message);
    return { success: false, error: error.message };
  }
};

// Main function to handle user operations
const manageUser = async (userData, options = {}) => {
  const { email, password, name } = userData;
  const { forceOverwrite = false } = options;
  
  if (!email || !name) {
    console.error('❌ Email and name are required');
    return;
  }

  // Fetch live crypto prices first
  console.log('📊 Fetching live crypto prices...');
  const livePrices = await fetchLiveCryptoPrices();
  
  if (!password) {
    console.error('❌ Password is required to verify user and perform operations');
    return;
  }
  
  try {
    // Try to get user UID by signing in
    const uid = await getUserUid(email, password);
    
    // Check if user has existing portfolio data
    const portfolioDoc = await getDoc(doc(db, `users/${uid}/portfolio/summary`));
    
    if (portfolioDoc.exists()) {
      console.log(`✅ User exists with portfolio data. Updating...`);
      return await updateUser(uid, userData, forceOverwrite, livePrices);
    } else {
      console.log(`⚠️ User exists in Auth but no portfolio data found. Creating portfolio...`);
      return await createUser(userData, livePrices);
    }
    
  } catch (error) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      console.log(`❌ Invalid credentials or user not found. Creating new user...`);
      return await createUser(userData, livePrices);
    } else if (error.code === 'auth/email-already-in-use') {
      console.log(`✅ User exists but wrong password provided for update operation`);
      console.error('❌ Cannot update existing user without correct password');
      return;
    } else {
      console.error('❌ Error during user operation:', error.message);
      throw error;
    }
  }
};

module.exports = {
  manageUser,
  createUser,
  updateUser,
  updateUserByEmail,
  checkUserExists,
  getUserUid,
  fetchLiveCryptoPrices
};

// Export for direct script execution
if (require.main === module) {
  // Example usage - modify these values as needed
  const userData = {
    email: "user@example.com",
    password: "SecurePass123!",
    name: "John Doe",
    totalBalance: 150000,
    totalInvestments: 120000,
    availableCash: 30000,
    monthlyChange: 3.2,
    investmentChange: 4.1,
    stocks: 60000,
    bonds: 40000,
    realEstate: 20000,
    cash: 30000
  };
  
  // Run the management function
  manageUser(userData, { forceOverwrite: false })
    .then(() => {
      console.log('Script execution completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Script execution failed:', error);
      process.exit(1);
    });
}
