import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserData, getUserTransactions, getUserPerformance, auth } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import WithdrawalRequest from './WithdrawalRequest';
import { 
  LineChart, Line, 
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer,
  Legend,
} from 'recharts';
import CryptoChart from '../components/CryptoChart';
import ChartEmptyState from '../components/ChartEmptyState';
import ChartSkeleton from '../components/ChartSkeleton';
import MobileNav from '../components/MobileNav';
import './dashboard.css';

const Dashboard = ({ initialTab = 'overview' }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [dataStatus, setDataStatus] = useState('loading');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    portfolio: {},
    transactions: [],
    performance: [],
    allocation: {}
  });
  
  // All state declarations at the top level
  const [accountData, setAccountData] = useState({
    totalBalance: 0,
    totalInvestments: 0,
    availableCash: 0,
    monthlyChange: 0,
    investmentChange: 0,
    name: "",
    recentTransactions: [],
    totalReturn: 0,
    returnPercentage: 0,
    dividendYield: 0
  });

  const [cryptoHoldings, setCryptoHoldings] = useState({
    xrp: { units: 0, avgCost: 0, currentPrice: 0, marketValue: 0, return: 0 },
    xlm: { units: 0, avgCost: 0, currentPrice: 0, marketValue: 0, return: 0 }
  });

  const [withdrawalSettings, setWithdrawalSettings] = useState({
    availableForWithdrawal: 0,
    pendingWithdrawals: 0,
    minimumWithdrawal: 100,
    maximumWithdrawal: 0,
    processingTime: "2-3 business days",
    methods: ["Bank Transfer", "Wire Transfer"]
  });
  
  // Format number as currency
  const formatDollarAmount = (amount) => {
    if (amount === undefined || amount === null) return "$0";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  const [performanceData, setPerformanceData] = useState([]);
  const [monthlyReturnsData, setMonthlyReturnsData] = useState([]);
  const [allocationData, setAllocationData] = useState([]);
  
  useEffect(() => {
    const checkUserAndFetchData = async () => {
      if (user) {
        try {

          setDataStatus('loading');
          const data = await getUserData(user.uid);
          const transactions = await getUserTransactions(user.uid, 50); // Get more transactions to include all
          const performance = await getUserPerformance(user.uid);
          
          // Check if data exists
          if (!data.portfolio || Object.keys(data.portfolio).length === 0) {
            setDataStatus('empty');
            return;
          }

          // Set account data
          setAccountData({
            totalBalance: data?.portfolio?.totalBalance || 0,
            totalInvestments: data?.portfolio?.totalInvestments || 0,
            availableCash: data?.portfolio?.availableCash || 0,
            monthlyChange: data?.portfolio?.monthlyChange || 0,
            investmentChange: data?.portfolio?.investmentChange || 0,
            name: data?.portfolio?.name || "User",
            recentTransactions: [],  // Initialize empty array for transactions
            totalReturn: data?.portfolio?.totalReturn || 0,
            returnPercentage: data?.portfolio?.returnPercentage || 0,
            dividendYield: data?.portfolio?.dividendYield || 0
          });

          // Set crypto holdings data
          const investmentsData = data?.investments || {};
          setCryptoHoldings({
            xrp: investmentsData.xrp || { units: 0, avgCost: 0, currentPrice: 0, marketValue: 0, return: 0 },
            xlm: investmentsData.xlm || { units: 0, avgCost: 0, currentPrice: 0, marketValue: 0, return: 0 }
          });

          // Set withdrawal settings
          const withdrawalData = data?.withdrawalSettings || {};
          setWithdrawalSettings({
            availableForWithdrawal: withdrawalData.availableForWithdrawal || 0,
            pendingWithdrawals: withdrawalData.pendingWithdrawals || 0,
            minimumWithdrawal: withdrawalData.minimumWithdrawal || 100,
            maximumWithdrawal: withdrawalData.maximumWithdrawal || 0,
            processingTime: withdrawalData.processingTime || "2-3 business days",
            methods: withdrawalData.methods || ["Bank Transfer", "Wire Transfer"]
          });

          // Set allocation data with XRP/XLM
          const allocData = [
            { name: 'XRP', value: data?.allocation?.xrp || 0 },
            { name: 'XLM', value: data?.allocation?.xlm || 0 },
            { name: 'Cash', value: data?.allocation?.cash || 0 },
          ];
          setAllocationData(allocData);

          // Set performance data
          setPerformanceData(performance && Array.isArray(performance) ? performance.map(p => ({
            month: p.month,
            value: p.value
          })) : []);

          // Set monthly returns
          setMonthlyReturnsData(performance && Array.isArray(performance) ? performance.map(p => ({
            month: p.month,
            return: p.return
          })) : []);

          // Set dashboard data for other components
          setDashboardData({
            portfolio: data.portfolio,
            allocation: data.allocation,
            cryptoInvestments: data.cryptoInvestments,
            transactions,
            performance
          });
          
          setDataStatus('ready');
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setDataStatus('error');
        }
      }
    };

    checkUserAndFetchData();
  }, [user, navigate]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await auth.signOut();
    navigate('/login');
  };

  const handleMobileNavigation = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (dataStatus === 'empty') {
    return (
      <div className="dashboard-container">
        {/* Mobile Navigation for empty state */}
        <MobileNav 
          activeTab={activeTab}
          onTabChange={handleMobileNavigation}
          onSignOut={handleSignOut}
          userName="User"
          isSigningOut={isSigningOut}
        />
        
        <div className="dashboard-empty-state">
          <h3>Your Dashboard is Being Prepared</h3>
          <p>Thank you for logging in! Your personalized dashboard is currently being set up. 
             Please check back later to view your portfolio and investment details.</p>
          <p>This typically takes a few minutes to complete.</p>
          <button 
            className="sign-out-btn error-sign-out"
            disabled={isSigningOut}
            onClick={handleSignOut}
            style={{ marginTop: '1.5rem' }}
          >
            {isSigningOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    );
  }

  if (dataStatus === 'loading') {
    return (
      <div className="dashboard-container">
        {/* Mobile Navigation for loading state */}
        <MobileNav 
          activeTab={activeTab}
          onTabChange={handleMobileNavigation}
          onSignOut={handleSignOut}
          userName="User"
          isSigningOut={isSigningOut}
        />
        
        <div className="dashboard-loading">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  if (dataStatus === 'error') {
    return (
      <div className="dashboard-container">
        {/* Mobile Navigation for error state */}
        <MobileNav 
          activeTab={activeTab}
          onTabChange={handleMobileNavigation}
          onSignOut={handleSignOut}
          userName="User"
          isSigningOut={isSigningOut}
        />
        
        <div className="dashboard-empty-state">
          <h3>Oops! Something went wrong</h3>
          <p>We're having trouble loading your dashboard. Please try again later or contact support if the problem persists.</p>
          <button 
            className="sign-out-btn error-sign-out"
            disabled={isSigningOut}
            onClick={handleSignOut}
            style={{ marginTop: '1.5rem' }}
          >
            {isSigningOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    );
  }

  // Constants for formatting and display

  const COLORS = ['#2C3342', '#AD7F4E', '#445781', '#E3C5A4'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="value">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <div className="balance-cards">
              <div className="balance-card">
                <h3>Total Portfolio Value</h3>
                <p className="balance-amount">{formatDollarAmount(accountData.totalBalance)}</p>
                <span className="balance-change positive">{accountData.monthlyChange}% this month</span>
              </div>
              <div className="balance-card">
                <h3>Total Investments</h3>
                <div className="crypto-investments">
                  {dashboardData.cryptoInvestments?.xrp?.amount > 0 && (
                    <p className="crypto-amount">{dashboardData.cryptoInvestments.xrp.amount.toLocaleString()} XRP</p>
                  )}
                  {dashboardData.cryptoInvestments?.xlm?.amount > 0 && (
                    <p className="crypto-amount">{dashboardData.cryptoInvestments.xlm.amount.toLocaleString()} XLM</p>
                  )}
                  {(!dashboardData.cryptoInvestments?.xrp?.amount || dashboardData.cryptoInvestments.xrp.amount === 0) && 
                   (!dashboardData.cryptoInvestments?.xlm?.amount || dashboardData.cryptoInvestments.xlm.amount === 0) && (
                    <p className="balance-amount">No Investments</p>
                  )}
                </div>
                <span className={`balance-change ${accountData.investmentChange >= 0 ? 'positive' : 'negative'}`}>
                  {accountData.investmentChange >= 0 ? '+' : ''}{accountData.investmentChange}% this month
                </span>
              </div>
              <div className="balance-card">
                <h3>Available Cash</h3>
                <p className="balance-amount">{formatDollarAmount(accountData.availableCash)}</p>
                <span className="balance-label">Ready to invest</span>
              </div>
            </div>

            {/* Crypto Holdings Overview */}
            <div className="crypto-holdings-overview">
              <h3>Your Crypto Holdings</h3>
              <div className="holdings-cards">
                {cryptoHoldings.xrp.units > 0 && (
                  <div className="holding-card">
                    <div className="holding-header">
                      <span className="crypto-name">XRP</span>
                      <span className="crypto-symbol">XRP</span>
                    </div>
                    <div className="holding-details">
                      <div className="units">{cryptoHoldings.xrp.units.toLocaleString()} XRP</div>
                      <div className="value">{formatDollarAmount(cryptoHoldings.xrp.marketValue)}</div>
                      <div className={`return ${cryptoHoldings.xrp.return >= 0 ? 'positive' : 'negative'}`}>
                        {cryptoHoldings.xrp.return >= 0 ? '+' : ''}{cryptoHoldings.xrp.return.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                )}
                {cryptoHoldings.xlm.units > 0 && (
                  <div className="holding-card">
                    <div className="holding-header">
                      <span className="crypto-name">Stellar Lumens</span>
                      <span className="crypto-symbol">XLM</span>
                    </div>
                    <div className="holding-details">
                      <div className="units">{cryptoHoldings.xlm.units.toLocaleString()} XLM</div>
                      <div className="value">{formatDollarAmount(cryptoHoldings.xlm.marketValue)}</div>
                      <div className={`return ${cryptoHoldings.xlm.return >= 0 ? 'positive' : 'negative'}`}>
                        {cryptoHoldings.xlm.return >= 0 ? '+' : ''}{cryptoHoldings.xlm.return.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                )}
                {cryptoHoldings.xrp.units === 0 && cryptoHoldings.xlm.units === 0 && (
                  <div className="no-holdings">
                    <p>No crypto investments found. Contact support to add investments.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-container performance-chart">
                <h3>Portfolio Performance</h3>
                {dataStatus === 'loading' ? (
                  <ChartSkeleton height="300px" />
                ) : performanceData && performanceData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#AD7F4E" 
                        strokeWidth={3}
                        dot={{ fill: '#AD7F4E', strokeWidth: 2 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <ChartEmptyState 
                    title="No Performance Data"
                    message="Portfolio performance data will appear here once your investments are tracked over time."
                    icon="📊"
                    height="300px"
                  />
                )}
              </div>
              
              <div className="chart-container performance-chart">
                <h3>Monthly Returns</h3>
                {dataStatus === 'loading' ? (
                  <ChartSkeleton height="300px" />
                ) : monthlyReturnsData && monthlyReturnsData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyReturnsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip 
                        formatter={(value) => `${value}%`}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Bar 
                        dataKey="return"
                        fill={(data) => data.return >= 0 ? '#4CAF50' : '#F44336'}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ChartEmptyState 
                    title="No Returns Data"
                    message="Monthly returns will be calculated and displayed here as your portfolio grows."
                    icon="📈"
                    height="300px"
                  />
                )}
              </div>

              <div className="chart-container allocation-chart">
                <h3>Asset Allocation</h3>
                {dataStatus === 'loading' ? (
                  <ChartSkeleton height="300px" />
                ) : allocationData && allocationData.length > 0 && allocationData.some(item => item.value > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [
                          `${formatCurrency(value)} (${((value/250000)*100).toFixed(1)}%)`,
                          name
                        ]}
                      />
                      <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        formatter={(value, entry) => {
                          const { payload } = entry;
                          return `${value}: ${((payload.value/250000)*100).toFixed(1)}%`;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <ChartEmptyState 
                    title="No Asset Allocation"
                    message="Your asset allocation breakdown will appear here once you have investments."
                    icon="🥧"
                    height="300px"
                  />
                )}
              </div>

              <div className="crypto-charts-grid">
                <div className="crypto-chart-container">
                  <CryptoChart symbol="XRP" />
                </div>
                <div className="crypto-chart-container">
                  <CryptoChart symbol="XLM" />
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <div className="section-header">
                <h3>Recent Activity</h3>
                <button 
                  onClick={() => {
                    setActiveTab('transactions');
                    navigate('/dashboard/transactions');
                  }} 
                  className="view-all"
                >
                  View All
                </button>
              </div>
              <div className="transactions-list">
                {dashboardData.transactions && dashboardData.transactions.length > 0 ? (
                  dashboardData.transactions.slice(0, 5).map(transaction => (
                    <div key={transaction.id} className="transaction-item">
                      <div className="transaction-info">
                        <span className="transaction-date">
                          {transaction.date instanceof Date ? 
                            transaction.date.toLocaleDateString() : 
                            new Date(transaction.date.seconds * 1000).toLocaleDateString()}
                        </span>
                        <span className="transaction-description">{transaction.description}</span>
                      </div>
                      <span className={`transaction-amount ${
                        transaction.amount >= 0 ? 'positive' : 'negative'
                      }`}>
                        {transaction.amount >= 0 ? '+' : ''}{formatDollarAmount(transaction.amount)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="no-transactions">No recent transactions</div>
                )}
              </div>
            </div>
          </div>
        );
      case 'investments':
        return (
          <div className="dashboard-investments">
            <div className="investment-header">
              <h3>Investment Portfolio</h3>
              <button 
                className="invest-btn contact-support"
                onClick={() => {
                  alert('To make a new investment, please contact your financial advisor for assistance.\n\nEmail: support@dwp.com\nPhone: (555) 123-4567');
                }}
              >
                Contact Support for Investment
              </button>
            </div>
            
            <div className="investment-summary">
              <div className="summary-card total-value">
                <span className="summary-label">Total Portfolio Value</span>
                <span className="summary-amount">{formatDollarAmount(accountData.totalBalance)}</span>
                <span className="summary-change positive">+{accountData.returnPercentage}% YTD</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">Total Return</span>
                <span className="summary-amount">{formatDollarAmount(accountData.totalReturn)}</span>
                <span className="summary-change positive">+{accountData.returnPercentage}%</span>
              </div>
              <div className="summary-card">
                <span className="summary-label">Dividend Yield</span>
                <span className="summary-amount">{accountData.dividendYield}%</span>
                <span className="summary-subtext">Last 12 months</span>
              </div>
            </div>

            <div className="investment-table-container">
              <table className="investment-table">
                <thead>
                  <tr>
                    <th>Investment</th>
                    <th>Category</th>
                    <th>Units</th>
                    <th>Avg. Cost</th>
                    <th>Current Price</th>
                    <th>Market Value</th>
                    <th>Return</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.cryptoInvestments?.xrp?.amount > 0 && (
                    <tr>
                      <td className="investment-name">
                        <div className="investment-info">
                          <span className="name">XRP</span>
                          <span className="symbol">XRP</span>
                        </div>
                      </td>
                      <td>Cryptocurrency</td>
                      <td>{dashboardData.cryptoInvestments.xrp.amount.toLocaleString()}</td>
                      <td>${dashboardData.cryptoInvestments.xrp.price.toFixed(4)}</td>
                      <td>${dashboardData.cryptoInvestments.xrp.price.toFixed(4)}</td>
                      <td>{formatDollarAmount(dashboardData.cryptoInvestments.xrp.value)}</td>
                      <td className="return positive">
                        +12.5%
                      </td>
                    </tr>
                  )}
                  {dashboardData.cryptoInvestments?.xlm?.amount > 0 && (
                    <tr>
                      <td className="investment-name">
                        <div className="investment-info">
                          <span className="name">Stellar Lumens</span>
                          <span className="symbol">XLM</span>
                        </div>
                      </td>
                      <td>Cryptocurrency</td>
                      <td>{dashboardData.cryptoInvestments.xlm.amount.toLocaleString()}</td>
                      <td>${dashboardData.cryptoInvestments.xlm.price.toFixed(4)}</td>
                      <td>${dashboardData.cryptoInvestments.xlm.price.toFixed(4)}</td>
                      <td>{formatDollarAmount(dashboardData.cryptoInvestments.xlm.value)}</td>
                      <td className="return positive">
                        +8.3%
                      </td>
                    </tr>
                  )}
                  {(!dashboardData.cryptoInvestments?.xrp?.amount || dashboardData.cryptoInvestments.xrp.amount === 0) && 
                   (!dashboardData.cryptoInvestments?.xlm?.amount || dashboardData.cryptoInvestments.xlm.amount === 0) && (
                    <tr>
                      <td colSpan="7" style={{textAlign: 'center', padding: '2rem'}}>
                        No investments found. Contact support to add investments.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Mobile Investment Cards */}
              <div className="mobile-investment-cards">
                {dashboardData.cryptoInvestments?.xrp?.amount > 0 && (
                  <div className="mobile-investment-card">
                    <div className="investment-header">
                      <div>
                        <div className="investment-name">XRP</div>
                        <div className="investment-symbol">XRP</div>
                      </div>
                      <div className="investment-return positive">+12.5%</div>
                    </div>
                    <div className="investment-details">
                      <div className="detail-item">
                        <div className="detail-label">Category</div>
                        <div className="detail-value">Cryptocurrency</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Units</div>
                        <div className="detail-value">{dashboardData.cryptoInvestments.xrp.amount.toLocaleString()}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Avg. Cost</div>
                        <div className="detail-value">${dashboardData.cryptoInvestments.xrp.price.toFixed(4)}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Market Value</div>
                        <div className="detail-value">{formatDollarAmount(dashboardData.cryptoInvestments.xrp.value)}</div>
                      </div>
                    </div>
                  </div>
                )}
                {dashboardData.cryptoInvestments?.xlm?.amount > 0 && (
                  <div className="mobile-investment-card">
                    <div className="investment-header">
                      <div>
                        <div className="investment-name">Stellar Lumens</div>
                        <div className="investment-symbol">XLM</div>
                      </div>
                      <div className="investment-return positive">+8.3%</div>
                    </div>
                    <div className="investment-details">
                      <div className="detail-item">
                        <div className="detail-label">Category</div>
                        <div className="detail-value">Cryptocurrency</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Units</div>
                        <div className="detail-value">{dashboardData.cryptoInvestments.xlm.amount.toLocaleString()}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Avg. Cost</div>
                        <div className="detail-value">${dashboardData.cryptoInvestments.xlm.price.toFixed(4)}</div>
                      </div>
                      <div className="detail-item">
                        <div className="detail-label">Market Value</div>
                        <div className="detail-value">{formatDollarAmount(dashboardData.cryptoInvestments.xlm.value)}</div>
                      </div>
                    </div>
                  </div>
                )}
                {(!dashboardData.cryptoInvestments?.xrp?.amount || dashboardData.cryptoInvestments.xrp.amount === 0) && 
                 (!dashboardData.cryptoInvestments?.xlm?.amount || dashboardData.cryptoInvestments.xlm.amount === 0) && (
                  <div className="mobile-investment-card">
                    <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>
                      No investments found. Contact support to add investments.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Investment Transaction History */}
            <div className="investment-history">
              <h3>Investment Purchase History</h3>
              <div className="transactions-table-container">
                <table className="transactions-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Asset</th>
                      <th>Action</th>
                      <th>Amount</th>
                      <th>Price</th>
                      <th>Total Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.transactions && dashboardData.transactions.filter(t => t.type === 'crypto_purchase').length > 0 ? (
                      dashboardData.transactions
                        .filter(transaction => transaction.type === 'crypto_purchase')
                        .map((investment, index) => (
                        <tr key={index}>
                          <td>{new Date(investment.date?.seconds ? investment.date.seconds * 1000 : investment.date).toLocaleDateString()}</td>
                          <td>
                            <div className="investment-info">
                              <span className="symbol">{investment.symbol}</span>
                            </div>
                          </td>
                          <td>
                            <span className={`action ${investment.action}`}>
                              {investment.action.toUpperCase()}
                            </span>
                          </td>
                          <td>{investment.cryptoAmount?.toLocaleString()} {investment.symbol}</td>
                          <td>${investment.price?.toFixed(4)}</td>
                          <td>{formatDollarAmount(Math.abs(investment.amount))}</td>
                          <td>
                            <span className={`status ${investment.status}`}>
                              {investment.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" style={{textAlign: 'center', padding: '2rem'}}>
                          No investment transactions found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Mobile Investment Transaction Cards */}
                <div className="mobile-transaction-cards">
                  {dashboardData.transactions && dashboardData.transactions.filter(t => t.type === 'crypto_purchase').length > 0 ? (
                    dashboardData.transactions
                      .filter(transaction => transaction.type === 'crypto_purchase')
                      .map((investment, index) => (
                      <div key={index} className="mobile-transaction-card">
                        <div className="transaction-header">
                          <div>
                            <div className="transaction-amount positive">
                              {formatDollarAmount(Math.abs(investment.amount))}
                            </div>
                            <div className="transaction-date">
                              {new Date(investment.date?.seconds ? investment.date.seconds * 1000 : investment.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className={`status ${investment.status}`}>
                            {investment.status}
                          </div>
                        </div>
                        <div className="transaction-details">
                          <div className="transaction-description">
                            {investment.cryptoAmount?.toLocaleString()} {investment.symbol} @ ${investment.price?.toFixed(4)}
                          </div>
                          <div className="transaction-meta">
                            <span className={`transaction-type ${investment.action}`}>
                              {investment.action.toUpperCase()}
                            </span>
                            <span className="transaction-symbol">{investment.symbol}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="mobile-transaction-card">
                      <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>
                        No investment transactions found.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'transactions':
        return (
          <div className="dashboard-transactions">
            <div className="transactions-header">
              <h3>Transaction History</h3>
              <div className="transaction-filters">
                <select className="filter-select">
                  <option value="all">All Transactions</option>
                  <option value="deposits">Deposits</option>
                  <option value="withdrawals">Withdrawals</option>
                  <option value="investments">Investments</option>
                  <option value="returns">Returns</option>
                </select>
                <input 
                  type="date" 
                  className="date-filter"
                  onChange={(e) => {/* Date filter functionality to be implemented */}}
                />
              </div>
            </div>

            <div className="transactions-table-container">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.transactions && dashboardData.transactions.length > 0 ? (
                    dashboardData.transactions.map(transaction => (
                      <tr key={transaction.id}>
                        <td>
                          {transaction.date instanceof Date ? 
                            transaction.date.toLocaleDateString() : 
                            new Date(transaction.date.seconds * 1000).toLocaleDateString()}
                        </td>
                        <td><span className={`transaction-type ${transaction.type}`}>{transaction.type}</span></td>
                        <td>{transaction.description}</td>
                        <td className={`amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                          {transaction.amount >= 0 ? '+' : ''}{formatDollarAmount(Math.abs(transaction.amount))}
                        </td>
                        <td><span className={`status ${transaction.status}`}>{transaction.status}</span></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Mobile Transaction Cards */}
              <div className="mobile-transaction-cards">
                {dashboardData.transactions && dashboardData.transactions.length > 0 ? (
                  dashboardData.transactions.map(transaction => (
                    <div key={transaction.id} className="mobile-transaction-card">
                      <div className="transaction-header">
                        <div>
                          <div className={`transaction-amount ${transaction.amount >= 0 ? 'positive' : 'negative'}`}>
                            {transaction.amount >= 0 ? '+' : ''}{formatDollarAmount(Math.abs(transaction.amount))}
                          </div>
                          <div className="transaction-date">
                            {transaction.date instanceof Date ? 
                              transaction.date.toLocaleDateString() : 
                              new Date(transaction.date.seconds * 1000).toLocaleDateString()}
                          </div>
                        </div>
                        <div className={`status ${transaction.status}`}>
                          {transaction.status}
                        </div>
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-description">
                          {transaction.description}
                        </div>
                        <div className="transaction-meta">
                          <span className={`transaction-type ${transaction.type}`}>
                            {transaction.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="mobile-transaction-card">
                    <div style={{textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)'}}>
                      No transactions found
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'withdrawal':
        return (
          <div className="dashboard-withdrawal">
            <WithdrawalRequest
              userData={accountData}
              onClose={() => {}} // No close needed since it's embedded in tab
              isEmbedded={true}   // Flag to indicate it's embedded in dashboard
            />
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Mobile Navigation */}
      <MobileNav 
        activeTab={activeTab}
        onTabChange={handleMobileNavigation}
        onSignOut={handleSignOut}
        userName={accountData.name || 'User'}
        isSigningOut={isSigningOut}
      />

      <div className="dashboard-header">
        <div className="welcome-section">
          <h2>Welcome Back, {accountData.name || 'User'}</h2>
          <p className="date-text">{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
        <button 
          className="sign-out-btn desktop-only"
          disabled={isSigningOut}
          onClick={handleSignOut}
        >
          {isSigningOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>

      <div className="dashboard-tabs desktop-only">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('overview');
            navigate('/dashboard');
          }}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'investments' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('investments');
            navigate('/dashboard/investments');
          }}
        >
          Investments
        </button>
        <button 
          className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('transactions');
            navigate('/dashboard/transactions');
          }}
        >
          Transactions
        </button>
        <button 
          className={`tab-button ${activeTab === 'withdrawal' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('withdrawal');
            navigate('/dashboard/withdrawal');
          }}
        >
          Withdrawal
        </button>
      </div>

      <div className="dashboard-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
