import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './contact.css';
import meetingImage from './siteimageee.jpg';
import headerImage from './digital-wealth-partners-skyline21.jpg';
import countryList from 'react-select-country-list';

const Contact = () => {
  const navigate = useNavigate();
  const countries = useMemo(() => countryList().getData(), []);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    },
    clientType: '',
    hasLLCTrust: '',
    LLCTrustName: '',
    hasCryptoIRA: '',
    cryptoIRACompany: '',
    currentAllocation: '',
    hasXRP: '',
    digitalAssets: '',
    referralSource: '',
    message: '',
    isExistingClient: '',
    acceptedComms: false
  });

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Required field validation
    if (!formData.firstName.trim()) {
      tempErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      tempErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone.replace(/\s+/g, ''))) {
      tempErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }
    if (!formData.clientType) {
      tempErrors.clientType = 'Please select a client type';
      isValid = false;
    }
    if (!formData.hasLLCTrust) {
      tempErrors.hasLLCTrust = 'Please select an option';
      isValid = false;
    }
    if (!formData.currentAllocation) {
      tempErrors.currentAllocation = 'Please select an allocation range';
      isValid = false;
    }
    if (!formData.hasXRP) {
      tempErrors.hasXRP = 'Please select an option';
      isValid = false;
    }
    if (!formData.digitalAssets.trim()) {
      tempErrors.digitalAssets = 'Please list your digital assets';
      isValid = false;
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
      isValid = false;
    }
    if (!formData.acceptedComms) {
      tempErrors.acceptedComms = 'You must accept the communications policy';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);
      try {
        // Send data to backend
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data.success) {
          setSubmitStatus('success');
          // Wait for 1 second to show success message before navigating
          setTimeout(() => {
            navigate('/insert');
          }, 1000);
        } else {
          throw new Error('Submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to submit form. Please try again.'
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <>
      <div className="contact-header-wrapper">
        <header className="contact-header">
          <div className="contact-header-overlay" 
            style={{ 
              backgroundImage: `url(${headerImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          ></div>
          <div className="contact-header-container">
            <h1 className="contact-header-title">Contact Us</h1>
          </div>
        </header>
      </div>
      <div className="contact-main">
        <div className="contact-row">
        <div className="contact-column left">
          <div className="contact-intro">
            <p>Thank you for your interest in working with Digital Wealth Partners. Please complete the form below and a member of our team will be in contact as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group half">
                <label>Name <span className="required">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                <span className="field-hint">First</span>
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>
              <div className="form-group half">
                <label>&nbsp;</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                <span className="field-hint">Last</span>
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Email <span className="required">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              <div className="form-group half">
                <label>Phone <span className="required">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="address.line1"
                  value={formData.address.line1}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  name="address.line2"
                  value={formData.address.line2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-row three-columns" style={{ marginBottom: '10px' }}>
                <div>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                  />
                  <span className="field-hint">City</span>
                </div>
                <div>
                  <input
                    type="text"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                  />
                  <span className="field-hint">State/Province</span>
                </div>
                <div>
                  <input
                    type="text"
                    name="address.zip"
                    value={formData.address.zip}
                    onChange={handleInputChange}
                  />
                  <span className="field-hint">Zip/Postal</span>
                </div>
              </div>
              <select
                name="address.country"
                value={formData.address.country}
                onChange={handleInputChange}
              >
                <option value="">Select Country</option>
                {countries.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Client Type <span className="required">*</span></label>
              <select
                name="clientType"
                value={formData.clientType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select One</option>
                <option value="Individual">Individual</option>
                <option value="Family Office">Family Office</option>
                <option value="RIA Firm">RIA Firm</option>
                <option value="TAMP">TAMP</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Do you have a LLC, Trust, or Corporation? <span className="required">*</span></label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="hasLLCTrust"
                      value="Yes"
                      checked={formData.hasLLCTrust === 'Yes'}
                      onChange={handleInputChange}
                    /> Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="hasLLCTrust"
                      value="No"
                      checked={formData.hasLLCTrust === 'No'}
                      onChange={handleInputChange}
                    /> No
                  </label>
                </div>
              </div>
              {formData.hasLLCTrust === 'Yes' && (
                <div className="form-group half">
                  <label>Name of LLC/Trust/Corp?</label>
                  <input
                    type="text"
                    name="LLCTrustName"
                    value={formData.LLCTrustName}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Current Allocation to Digital Assets <span className="required">*</span></label>
              <select
                name="currentAllocation"
                value={formData.currentAllocation}
                onChange={handleInputChange}
                required
              >
                <option value="">Select One</option>
                <option value="Less than $500k USD">Less than $500k USD</option>
                <option value="Greater than $100k USD">Greater than $100k USD</option>
              </select>
            </div>

            <div className="form-group">
              <label>Do you currently hold 100,000 or more XRP Tokens? <span className="required">*</span></label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="hasXRP"
                    value="Yes"
                    checked={formData.hasXRP === 'Yes'}
                    onChange={handleInputChange}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="hasXRP"
                    value="No"
                    checked={formData.hasXRP === 'No'}
                    onChange={handleInputChange}
                  /> No
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Please list all digital assets you are interested in transferring to institutional custody: <span className="required">*</span></label>
              <input
                type="text"
                name="digitalAssets"
                value={formData.digitalAssets}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message <span className="required">*</span></label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                maxLength={750}
              ></textarea>
              <div className="char-count">{formData.message.length} of 750 max characters</div>
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="acceptedComms"
                    checked={formData.acceptedComms}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      acceptedComms: e.target.checked
                    }))}
                    required
                  />
                  <span>I understand that if I receive any communication outside of official channels, I should report it to DWP immediately. DWP will never request seed phrases or ask to send cryptocurrency via email, Discord, Telegram, or any other informal platform.</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Next'}
              </button>
              {submitStatus === 'success' && (
                <div className="success-message">Form submitted successfully!</div>
              )}
              {submitStatus === 'error' && (
                <div className="error-message">{errors.submit}</div>
              )}
            </div>
          </form>
        </div>

        <div className="contact-column right">
          <div className="image-container">
            <img src={meetingImage} alt="Team Meeting" className="contact-image" />
            <div className="shape-dots top"></div>
            <div className="shape-dots bottom"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
