const { manageUser } = require('./userManager');

// Batch user creation script
const batchCreateUsers = async () => {
  const users = [
    {
      email: "alice.johnson@example.com",
      password: "TempPass123!",
      name: "Alice Johnson",
      totalBalance: 180000,
      totalInvestments: 150000,
      availableCash: 30000,
      monthlyChange: 4.1,
      investmentChange: 2.8,
      stocks: 90000,
      bonds: 45000,
      realEstate: 15000,
      cash: 30000
    },
    {
      email: "bob.williams@example.com",
      password: "TempPass123!",
      name: "Bob Williams",
      totalBalance: 320000,
      totalInvestments: 280000,
      availableCash: 40000,
      monthlyChange: 6.2,
      investmentChange: 5.1,
      stocks: 180000,
      bonds: 70000,
      realEstate: 30000,
      cash: 40000
    },
    {
      email: "carol.brown@example.com",
      password: "TempPass123!",
      name: "Carol Brown",
      totalBalance: 95000,
      totalInvestments: 75000,
      availableCash: 20000,
      monthlyChange: 2.8,
      investmentChange: 1.9,
      stocks: 35000,
      bonds: 25000,
      realEstate: 15000,
      cash: 20000
    }
  ];
  
  console.log(`🚀 Starting batch creation of ${users.length} users...`);
  console.log('=====================================');
  
  const results = [];
  
  for (let i = 0; i < users.length; i++) {
    const userData = users[i];
    console.log(`\n📝 Processing user ${i + 1}/${users.length}: ${userData.name}`);
    
    try {
      const result = await manageUser(userData, { forceOverwrite: false });
      results.push({
        email: userData.email,
        name: userData.name,
        success: result?.success || false,
        userId: result?.userId || null,
        error: result?.error || null
      });
      
      if (result?.success) {
        console.log(`✅ ${userData.name} processed successfully`);
      } else {
        console.log(`❌ Failed to process ${userData.name}: ${result?.error}`);
      }
      
      // Small delay between users to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error processing ${userData.name}:`, error);
      results.push({
        email: userData.email,
        name: userData.name,
        success: false,
        error: error.message
      });
    }
  }
  
  // Summary report
  console.log('\n=====================================');
  console.log('📊 BATCH CREATION SUMMARY');
  console.log('=====================================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`📊 Total: ${results.length}`);
  
  if (successful.length > 0) {
    console.log('\n✅ SUCCESSFUL USERS:');
    successful.forEach(user => {
      console.log(`  - ${user.name} (${user.email})`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ FAILED USERS:');
    failed.forEach(user => {
      console.log(`  - ${user.name} (${user.email}): ${user.error}`);
    });
  }
  
  console.log('\n📧 LOGIN CREDENTIALS TO SEND:');
  console.log('=====================================');
  successful.forEach(user => {
    const originalUser = users.find(u => u.email === user.email);
    console.log(`${user.name}:`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Password: ${originalUser.password}`);
    console.log('');
  });
};

// Run the batch script
batchCreateUsers();
