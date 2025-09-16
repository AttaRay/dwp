# User Management Scripts

This folder contains scripts to manage users in the crypto investment platform.

## Scripts Overview

### 1. `createUser.js` - Create New Users
Creates new users with complete portfolio data including:
- ✅ Live crypto pricing (XRP/XLM from CoinGecko API)
- ✅ Initial investment transactions
- ✅ Portfolio summary and allocation
- ✅ Monthly performance history
- ✅ Transaction history (deposits, crypto purchases, returns, withdrawals)

**Usage:**
```bash
node createUser.js
```

**How to modify:**
- Change email, name, and password
- Adjust crypto amounts (xrpAmount, xlmAmount)
- Add/modify transactions array
- Update monthly performance data

### 2. `updateUser.js` - Add Data to Existing Users  
Adds new data to existing users WITHOUT overwriting:
- ✅ Appends new transactions to existing history
- ✅ Adds new monthly performance data
- ✅ Updates portfolio totals and crypto holdings
- ✅ Merges new data with existing data

**Usage:**
```bash
node updateUser.js
```

**How it works:**
- `forceOverwrite: false` = Adds new data (recommended)
- `forceOverwrite: true` = Replaces all data (use carefully)

**Example Update Operations:**
- Add new crypto purchases (investment transactions)
- Add new deposits/withdrawals
- Add monthly performance for new months
- Update portfolio totals after transactions

### 3. `userManager.js` - Core Functions
Contains the main user management functions:
- `manageUser()` - Main function that creates or updates users
- `createUser()` - Creates new Firebase auth users
- `updateUser()` - Updates existing users with new data
- `createUserData()` - Generates user data structure
- `fetchLiveCryptoPrices()` - Gets real-time XRP/XLM prices

## Transaction Types

All transactions are stored in a unified `transactions` array with different `type` fields:

### Transaction Types:
- **`deposit`** - Bank transfers, funding
- **`withdrawal`** - Money withdrawals  
- **`crypto_purchase`** - Investment purchases (shows in both Transactions and Investments tabs)
- **`return`** - Portfolio gains, appreciation

### Dashboard Display Logic:
- **Transactions Tab** → Shows ALL transaction types
- **Investments Tab** → Filters to show only `crypto_purchase` transactions
- **Recent Transactions** → Shows latest transactions of any type

## Live Pricing

The system automatically fetches live XRP and XLM prices from CoinGecko API:
- ✅ Updates crypto purchase transaction prices
- ✅ Calculates current portfolio values
- ✅ Falls back to default prices if API fails
- ✅ No API key required

## Database Structure

Each user's data is stored in Firebase with this structure:
```
users/{userId}/
├── portfolio/
│   ├── summary (main portfolio data)
│   ├── cryptoInvestments (XRP/XLM holdings)
│   └── investments (investment summary)
├── allocation/
│   └── current (asset allocation)
├── transactions/
│   ├── tx_1, tx_2, tx_3... (all transactions)
├── performance/
│   ├── Jan, Feb, Mar... (monthly data)
└── settings/
    └── withdrawal (withdrawal settings)
```

## Usage Examples

### Create a New User:
1. Edit `createUser.js`
2. Change email, crypto amounts, transactions
3. Run: `node createUser.js`

### Add New Data to Existing User:
1. Edit `updateUser.js` 
2. Set correct email of existing user
3. Add new transactions, performance data
4. Set `forceOverwrite: false`
5. Run: `node updateUser.js`

### Add Monthly Data:
```javascript
monthlyPerformance: [
  { month: 'Nov', value: 200000, return: 12.5, xrpPrice: 0.55, xlmPrice: 0.13 }
]
```

### Add Investment Transactions:
```javascript
transactions: [
  {
    date: new Date('2025-11-01'),
    type: 'crypto_purchase',
    action: 'buy', 
    symbol: 'XRP',
    amount: -25000,           // Money spent (negative)
    cryptoAmount: 50000,      // Tokens purchased
    price: 0.50,             // Will be updated with live price
    description: 'November XRP Investment',
    status: 'completed'
  }
]
```

## Important Notes

- ✅ **Live Pricing**: Prices are fetched live and update automatically
- ✅ **No Overwrites**: Update mode adds data without destroying existing data
- ✅ **Unified Transactions**: All transactions in one place, filtered by type for display
- ✅ **Database Driven**: All data comes from Firebase, no hardcoded values
- ⚠️ **Email Required**: Always provide correct email to find existing users
- ⚠️ **Backup Data**: Test scripts on development data first

## Troubleshooting

**User Not Found Error:**
- Check email spelling in updateUser.js
- Ensure user was created first with createUser.js

**API Errors:**
- Scripts will use fallback prices if CoinGecko API is unavailable
- Check internet connection

**Firebase Errors:**  
- Ensure Firebase config is correct in userManager.js
- Check Firebase permissions
