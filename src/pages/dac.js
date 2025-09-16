import React from "react";
import { useNavigate } from "react-router-dom";
import "./dac.css";
import { FaCheck } from "react-icons/fa";
import logo1 from './sitelogo.png';

const DACSection = () => {
    const navigate = useNavigate();

    const handleContactClick = () => {
        navigate('/contact');
    };

    const features = [
    {
      title: "Strong Security Framework:",
      text: "Our technology implements multiple security layers, providing thorough protection while maintaining efficient transaction processing. Your assets receive protection against external threats and internal risks."
    },
    {
      title: "Balanced Access:",
      text: "Our custody solutions maintain security while enabling asset accessibility."
    },
    {
      title: "Regulation-Aligned Practice:",
      text: "Asset management follows current regulations, helping reduce legal and operational risks."
    },
    {
      title: "Straightforward Management:",
      text: "You can concentrate on investment decisions while we handle asset security. The client portal makes portfolio management clear and direct."
    },
    {
      title: "Financial Sector Background:",
      text: "Our experience in traditional finance informs our practices in digital asset management."
    },
    {
      title: "Adaptable Technology:",
      text: "As digital assets continue to develop, our systems adapt to support new assets and opportunities."
    },
    {
      title: "Protected Holdings:",
      text: "Your assets receive protection through both technical measures and insurance coverage."
    }
  ];

  
  return (
    <div className="dac-main">
        <section className="dac-section">
          <div className="cb-container cb-no-icon content-left disable-box-shadow" style={{ marginTop: "60px" }}>
              <div className="cb-wrapper">
                  <div className="cb-text-area">
                      <h4 className="cb-heading">
                          Digital Asset Custody with Digital Wealth Partners
                      </h4>
                      <p>
                          Digital Asset Custody plays an important role in the changing world
                          of cryptocurrencies and blockchain-based assets. With the market
                          value exceeding $1 trillion and financial institutions entering the
                          space, secure custody solutions support investor confidence and
                          wider adoption. These services provide secure storage of
                          cryptographic keys, which establish ownership and enable
                          transactions of digital assets.
                      </p>
                  </div>
              </div>
          </div>
      </section><section className="dac-cta-section">
              <div className="dac-cta-container">
                  {/* Left block */}
                  <div className="dac-cta-card">
                      <div className="dac-cta-text">
                          <h2>Build Your Strategy</h2>
                          <p>
                              Ready to get started? Contact Digital Wealth Partners to discuss
                              how our custody solutions can support your specific requirements.
                          </p>
                      </div>
                      <div className="dac-cta-btncontainer">
                          <button
                              onClick={handleContactClick}
                              className="dac-cta-button"
                          >
                              Contact Us
                          </button>
                      </div>
                  </div>

                  {/* Right block */}
                  <div className="dac-cta-card">
                      <div className="dac-cta-text">
                          <h2>Already a Client?</h2>
                          <p>
                              If you're already a Digital Wealth Partners client and need to
                              pay your onboarding fee, click this button to enter your payment
                              details.
                          </p>
                      </div>
                      <div className="dac-cta-btncontainer">
                          <button
                              onClick={handleContactClick}
                              className="dac-cta-button"
                          >
                              Pay Onboarding Fee
                          </button>
                      </div>
                  </div>
              </div>
          </section>
           <section className="dac-secure-section">
      {/* Top separator */}
      <div className="dac-row-separator">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M0 0 0 10 A 90 59, 0, 0, 1, 100 10 L 100 0 Z"></path>
        </svg>
      </div>

      <div className="dac-secure-content">
        {/* Left Column */}
        <div className="dac-secure-text">
          <h2>Secure Digital Asset Custody</h2>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>
                <FaCheck className="dac-icon" />
                <span>
                  <strong>{feature.title}</strong> {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="dac-secure-image">
          <img
            src={logo1}
            alt="Digital Wealth Partners"
          />
        </div>
      </div>
    </section>

    </div>
          
         
  );
};

export default DACSection;
