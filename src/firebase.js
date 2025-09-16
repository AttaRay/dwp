import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, query, orderBy, limit, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support offline persistence');
    }
});

// Helper functions to fetch user data
export const getUserData = async (userId) => {
  try {
    const summaryDoc = await getDoc(doc(db, `users/${userId}/portfolio/summary`));
    const allocDoc = await getDoc(doc(db, `users/${userId}/allocation/current`));
    const withdrawalDoc = await getDoc(doc(db, `users/${userId}/settings/withdrawal`));
    
    // Calculate crypto holdings from ALL transactions
    const calculatedCryptoHoldings = await calculateCryptoHoldingsFromTransactions(userId);
    
    return {
      portfolio: summaryDoc.exists() ? summaryDoc.data() : {},
      allocation: allocDoc.exists() ? allocDoc.data() : {},
      cryptoInvestments: calculatedCryptoHoldings, // Use calculated amounts instead of stored amounts
      withdrawalSettings: withdrawalDoc.exists() ? withdrawalDoc.data() : {}
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    if (error.message.includes('offline')) {
      throw new Error('Unable to fetch data - please check your internet connection');
    }
    throw error;
  }
};

// Calculate crypto holdings by summing all crypto_purchase transactions
export const calculateCryptoHoldingsFromTransactions = async (userId) => {
  try {
    // Get ALL transactions
    const q = query(collection(db, `users/${userId}/transactions`));
    const snapshot = await getDocs(q);
    
    let totalXrp = 0;
    let totalXlm = 0;
    let latestXrpPrice = 0.52; // fallback price
    let latestXlmPrice = 0.12; // fallback price
    
    // Sum up all crypto purchases
    snapshot.docs.forEach(doc => {
      const transaction = doc.data();
      if (transaction.type === 'crypto_purchase') {
        if (transaction.symbol === 'XRP') {
          totalXrp += transaction.cryptoAmount || 0;
          if (transaction.price) latestXrpPrice = transaction.price; // Keep latest price
        } else if (transaction.symbol === 'XLM') {
          totalXlm += transaction.cryptoAmount || 0;
          if (transaction.price) latestXlmPrice = transaction.price; // Keep latest price
        }
      }
    });
    
    console.log(`📊 Calculated crypto holdings from transactions:`);
    console.log(`   XRP: ${totalXrp.toLocaleString()} tokens`);
    console.log(`   XLM: ${totalXlm.toLocaleString()} tokens`);
    
    return {
      xrp: {
        amount: totalXrp,
        price: latestXrpPrice,
        value: totalXrp * latestXrpPrice
      },
      xlm: {
        amount: totalXlm,
        price: latestXlmPrice,
        value: totalXlm * latestXlmPrice
      },
      calculatedFromTransactions: true,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error calculating crypto holdings from transactions:', error);
    return {
      xrp: { amount: 0, price: 0.52, value: 0 },
      xlm: { amount: 0, price: 0.12, value: 0 },
      calculatedFromTransactions: false
    };
  }
};

export const getUserInvestments = async (userId) => {
  try {
    const q = query(
      collection(db, `users/${userId}/investments`),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching investment data:', error);
    if (error.message.includes('offline')) {
      throw new Error('Unable to fetch investment data - please check your internet connection');
    }
    throw error;
  }
};

export const getUserTransactions = async (userId, limitCount = 10) => {
  try {
    const q = query(
      collection(db, `users/${userId}/transactions`),
      orderBy('date', 'desc'),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    if (error.message.includes('offline')) {
      throw new Error('Unable to fetch transactions - please check your internet connection');
    }
    throw error;
  }
};

export const getUserPerformance = async (userId) => {
  try {
    const q = query(
      collection(db, `users/${userId}/performance`),
      orderBy('month')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching performance data:', error);
    if (error.message.includes('offline')) {
      throw new Error('Unable to fetch performance data - please check your internet connection');
    }
    throw error;
  }
};
