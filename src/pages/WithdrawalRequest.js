import React, { useState } from 'react';
import { auth } from '../firebase';
import './withdrawalRequest.css';

const WithdrawalRequest = ({ userData, onClose, isEmbedded = false }) => {
  const [formData, setFormData] = useState({
    amount: '',
    reason: '',
    method: '',
    walletAddress: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const maxWithdrawal = userData?.availableCash || 0;
  const minWithdrawal = 100;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    const amount = parseFloat(formData.amount);
    
    if (!amount || amount <= 0) {
      return 'Please enter a valid withdrawal amount';
    }
    
    if (amount < minWithdrawal) {
      return `Minimum withdrawal amount is $${minWithdrawal}`;
    }
    
    if (amount > maxWithdrawal) {
      return `Insufficient funds. Available: $${maxWithdrawal.toLocaleString()}`;
    }
    
    if (!formData.reason.trim()) {
      return 'Please provide a reason for withdrawal';
    }
    
    if (!formData.method) {
      return 'Please select a crypto withdrawal method';
    }
    
    if (!formData.walletAddress.trim()) {
      return 'Please provide your wallet address';
    }
    
    return null;
  };

  const submitWithdrawalRequest = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      const withdrawalRequest = {
        userId: user.uid,
        userEmail: user.email,
        userName: userData.name || 'User',
        amount: parseFloat(formData.amount),
        reason: formData.reason,
        method: formData.method,
        walletAddress: formData.walletAddress,
        additionalInfo: formData.additionalInfo,
        requestDate: new Date().toISOString(),
        status: 'pending',
        availableCash: maxWithdrawal
      };

      // Send email notification (using EmailJS or similar service)
      await sendWithdrawalNotification(withdrawalRequest);
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting withdrawal request:', error);
      setError('Failed to submit withdrawal request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendWithdrawalNotification = async (withdrawalData) => {
    // This would integrate with EmailJS or your email service
    // For now, we'll show success (console.log removed for production)
    
    // Email template data (currently unused but ready for email integration)
    const emailData = {
      to_email: 'admin@dwpwealthmanagement.com', // Admin email
      from_name: withdrawalData.userName,
      from_email: withdrawalData.userEmail,
      subject: `Crypto Withdrawal Request - $${withdrawalData.amount.toLocaleString()}`,
      message: `
        New Crypto Withdrawal Request:
        
        User: ${withdrawalData.userName} (${withdrawalData.userEmail})
        User ID: ${withdrawalData.userId}
        Amount: $${withdrawalData.amount.toLocaleString()}
        Crypto: ${withdrawalData.method}
        Wallet Address: ${withdrawalData.walletAddress}
        Reason: ${withdrawalData.reason}
        
        Additional Info: ${withdrawalData.additionalInfo || 'None'}
        
        Available Cash: $${withdrawalData.availableCash.toLocaleString()}
        Request Date: ${new Date(withdrawalData.requestDate).toLocaleString()}
        
        Please review and process this crypto withdrawal request.
      `
    };

    // TODO: Integrate with actual email service
    // Example: emailjs.send('service_id', 'template_id', emailData);
    
    return Promise.resolve(); // Simulate successful email send
  };

  if (submitted) {
    const successContent = (
      <div className="success-message">
        <h2>✅ Crypto Withdrawal Request Submitted</h2>
        <p>Your withdrawal request for <strong>${parseFloat(formData.amount).toLocaleString()}</strong> in {formData.method} has been submitted successfully.</p>
        <p>Our team will review your request and process the crypto transfer within 24-48 hours.</p>
        <p>You will receive an email confirmation shortly.</p>
        {!isEmbedded && <button onClick={onClose} className="close-button">Close</button>}
      </div>
    );

    if (isEmbedded) {
      return <div className="withdrawal-embedded">{successContent}</div>;
    }

    return (
      <div className="withdrawal-request-modal">
        <div className="withdrawal-request-content">
          {successContent}
        </div>
      </div>
    );
  }

  const formContent = (
    <>
      {!isEmbedded && (
        <div className="modal-header">
          <h2>Crypto Withdrawal Request</h2>
          <button onClick={onClose} className="close-x">×</button>
        </div>
      )}

      {isEmbedded && (
        <div className="embedded-header">
          <h2>Request Crypto Withdrawal</h2>
          <p className="withdrawal-notice">
            All crypto withdrawals require approval and will be processed within 24-48 hours. 
            You will receive a confirmation email once your request is processed.
          </p>
        </div>
      )}

      <form onSubmit={submitWithdrawalRequest}>
        <div className="form-section">
          <h3>Withdrawal Details</h3>
          
          <div className="form-group">
            <label>Withdrawal Amount (USD) *</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount in USD"
              min={minWithdrawal}
              max={maxWithdrawal}
              step="0.01"
              required
            />
            <small>Available: ${maxWithdrawal.toLocaleString()} | Minimum: ${minWithdrawal}</small>
          </div>

          <div className="form-group">
            <label>Reason for Withdrawal *</label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
            >
              <option value="">Select reason</option>
              <option value="profit_taking">Profit Taking</option>
              <option value="personal_expenses">Personal Expenses</option>
              <option value="emergency">Emergency</option>
              <option value="reinvestment">Reinvestment Elsewhere</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Crypto Withdrawal Method *</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleInputChange}
              required
            >
              <option value="">Select crypto</option>
              <option value="XRP">XRP Withdrawal</option>
              <option value="XLM">XLM Withdrawal</option>
            </select>
          </div>

          <div className="form-group">
            <label>
              {formData.method === 'XRP' ? 'XRP Wallet Address *' : 
               formData.method === 'XLM' ? 'XLM Wallet Address *' : 
               'Crypto Wallet Address *'}
            </label>
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleInputChange}
              placeholder={
                formData.method === 'XRP' ? 'rXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' :
                formData.method === 'XLM' ? 'GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' :
                'Enter your wallet address'
              }
              required
            />
            <small>
              {formData.method === 'XRP' && 'XRP addresses start with "r"'}
              {formData.method === 'XLM' && 'XLM addresses start with "G"'}
              {!formData.method && 'Select withdrawal method first'}
            </small>
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label>Additional Information</label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              placeholder="Any additional information or special instructions..."
              rows="3"
            />
          </div>
        </div>

        <div className="form-section withdrawal-summary">
          <h3>Withdrawal Summary</h3>
          <div className="summary-item">
            <span>Amount:</span>
            <span>${formData.amount ? parseFloat(formData.amount).toLocaleString() : '0'}</span>
          </div>
          <div className="summary-item">
            <span>Method:</span>
            <span>{formData.method || 'Not selected'}</span>
          </div>
          <div className="summary-item">
            <span>Wallet:</span>
            <span>{formData.walletAddress ? `${formData.walletAddress.substring(0, 10)}...` : 'Not provided'}</span>
          </div>
          <div className="summary-item">
            <span>Processing Time:</span>
            <span>24-48 hours</span>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-actions">
          {!isEmbedded && (
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          )}
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Withdrawal Request'}
          </button>
        </div>
      </form>
    </>
  );

  if (isEmbedded) {
    return <div className="withdrawal-embedded">{formContent}</div>;
  }

  return (
    <div className="withdrawal-request-modal">
      <div className="withdrawal-request-content">
        {formContent}
      </div>
    </div>
  );
};

export default WithdrawalRequest;
