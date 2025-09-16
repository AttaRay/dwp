const { updateUser, fetchLiveCryptoPrices } = require('./userManager');

// Process withdrawal request - adds withdrawal transaction to user account
const processWithdrawal = async () => {
  // STEP 1: Set the user's UID and withdrawal details
  const userUID = "PASTE_USER_UID_HERE";  // 👈 Replace with actual UID
  const withdrawalAmount = 15000;          // 👈 Amount to withdraw (positive number)
  const withdrawalReason = "User withdrawal request - Bank transfer"; // 👈 Reason/description
  
  console.log('💰 Processing Withdrawal Request');
  console.log('=====================================');
  console.log(`👤 User UID: ${userUID}`);
  console.log(`💵 Amount: $${withdrawalAmount.toLocaleString()}`);
  console.log(`📝 Reason: ${withdrawalReason}`);
  console.log('=====================================');
  
  if (userUID === "PASTE_USER_UID_HERE") {
    console.error('❌ Please replace "PASTE_USER_UID_HERE" with the actual user UID');
    console.log('💡 Get the UID from the withdrawal request email or Firebase Console');
    return;
  }
  
  if (!withdrawalAmount || withdrawalAmount <= 0) {
    console.error('❌ Please set a valid withdrawal amount');
    return;
  }
  
  try {
    // Create withdrawal transaction data
    const userData = {
      email: "user@example.com",     // Will be updated based on actual user
      name: "User",                  // Will be updated based on actual user
      
      // Withdrawal transaction
      transactions: [
        {
          date: new Date(),
          type: 'withdrawal',
          description: withdrawalReason,
          amount: -withdrawalAmount,  // Negative amount (money going out)
          status: 'completed',
          processedBy: 'admin',
          processedDate: new Date().toISOString()
        }
      ]
    };
    
    console.log('📊 Fetching live crypto prices...');
    const livePrices = await fetchLiveCryptoPrices();
    
    console.log('🔄 Processing withdrawal...');
    const result = await updateUser(userUID, userData, false, livePrices);
    
    if (result && result.success) {
      console.log('=====================================');
      console.log('✅ Withdrawal processed successfully!');
      console.log(`💸 $${withdrawalAmount.toLocaleString()} has been withdrawn from user account`);
      console.log('📧 Consider sending confirmation email to user');
      console.log('=====================================');
    } else {
      console.log('⚠️ Withdrawal processing completed but no success confirmation received');
    }
  } catch (error) {
    console.error('❌ Withdrawal processing failed:', error.message);
  }
};

// Quick reference for common withdrawal amounts
const quickWithdrawals = {
  small: 1000,
  medium: 5000,
  large: 25000,
  custom: (amount) => amount
};

console.log('💰 Withdrawal Processing Script');
console.log('==============================');
console.log('Instructions:');
console.log('1. Set the userUID from withdrawal request email');
console.log('2. Set the withdrawalAmount');
console.log('3. Update the withdrawalReason');
console.log('4. Run the script');
console.log('');
console.log('Quick amounts available:');
console.log(`- Small: $${quickWithdrawals.small.toLocaleString()}`);
console.log(`- Medium: $${quickWithdrawals.medium.toLocaleString()}`);
console.log(`- Large: $${quickWithdrawals.large.toLocaleString()}`);
console.log('');

// Run the withdrawal processing
processWithdrawal();
