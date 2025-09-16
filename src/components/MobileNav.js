import React, { useState } from 'react';
import './MobileNav.css';

const MobileNav = ({ activeTab, onTabChange, onSignOut, userName, isSigningOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTabClick = (tab, path) => {
    onTabChange(tab, path);
    setIsMenuOpen(false); // Close menu after selection
  };

  const handleSignOut = () => {
    onSignOut();
    setIsMenuOpen(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', path: '/dashboard' },
    { id: 'investments', label: 'Investments', path: '/dashboard/investments' },
    { id: 'transactions', label: 'Transactions', path: '/dashboard/transactions' },
    { id: 'withdrawal', label: 'Withdrawal', path: '/dashboard/withdrawal' }
  ];

  return (
    <>
      <div className="mobile-nav-container">
        <div className="mobile-nav-header">
          <div className="mobile-user-info">
            <h3>Hello, {userName}</h3>
            <span className="menu-text">Menu</span>
          </div>
          <button 
            className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      {/* Slide-out menu */}
      <div className={`mobile-nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <h4>Navigation</h4>
          <button 
            className="close-menu-btn"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="mobile-menu-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`mobile-nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id, tab.path)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <button 
            className="mobile-sign-out-btn"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;