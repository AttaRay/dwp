import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './thank.css';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 12000); // 12 seconds

    // Cleanup the timer if component unmounts
    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <>
      <div className="thank-you-page">
        <div className="thank-you-container">
          <div className="thank-you-icon">
            <FaCheckCircle style={{ color: '#fff', fontSize: '40px' }} />
          </div>
          <h1 className="thank-you-title">Thank You!</h1>
          <p className="thank-you-text">
            Your XRP holdings have been successfully validated.
          </p>
          <p className="thank-you-text">
            Our team will reach out to you via email or phone within the next{' '}
            <strong>72 hours</strong> to guide you through your preferred{' '}
            <strong>LLC or Trust setup</strong>.
          </p>
          <p className="thank-you-text">
            We appreciate your patience and look forward to assisting you in protecting 
            and growing your assets.
          </p>
          <p className="thank-you-text signature">
            The Digital Ascension Team
          </p>
        </div>
      </div>
    </>
  );
};

export default ThankYou;
