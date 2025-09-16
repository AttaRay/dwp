const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, getDocs } = require('firebase/firestore');

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

const updateUsersList = async () => {
  try {
    // Get all user folders from the users collection
    const userFolders = await getDocs(collection(db, 'users'));
    
    for (const userFolder of userFolders.docs) {
      const userId = userFolder.id;
      
      // Get user's portfolio summary
      const portfolioDoc = await getDocs(collection(db, `users/${userId}/portfolio`));
      const summaryDoc = portfolioDoc.docs.find(doc => doc.id === 'summary');
      
      if (summaryDoc) {
        const userData = summaryDoc.data();
        
        // Add or update user in usersList collection
        await setDoc(doc(db, 'usersList', userId), {
          userId: userId,
          email: userData.email || 'No email',
          name: userData.name || 'Unnamed User',
          status: 'active',
          createdAt: new Date(), // Since we don't have the original creation date
          totalBalance: userData.totalBalance || 0
        });
        
        console.log(`Added/Updated user ${userData.name} (${userId}) to usersList`);
      }
    }
    
    console.log('=====================================');
    console.log('UsersList collection has been updated! 🎉');
    console.log('=====================================');
    console.log('All existing users should now appear in the admin dashboard');
    console.log('=====================================');

  } catch (error) {
    console.error('Error updating usersList:', error);
  }
};

// Run the update
updateUsersList();
