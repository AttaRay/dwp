import React from 'react';
import './footer.css';
import brokerCheckImage from './brokercheck-dwp-300x80.png';

const Footer = () => {
  return (
    <footer id="footer" className="classic-underline-effect">
      <div className="upper-footer">
        <div className="footer-container">
          <div className="footer-bar">
            <div className="footer-nav-menu">
              <ul className="navbar-footer">
                <li><a href="/">Home</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/contact">Contact us</a></li>
              </ul>
            </div>
            <div className="footer-socials-bar">
              <ul className="social-media-list">
                <li>
                  <a href="https://www.linkedin.com/company/digital-wealth-partners/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn square">
                    <i className="fab fa-linkedin-square"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/DWP_advisors" target="_blank" rel="noopener noreferrer" aria-label="X Twitter">
                    <i className="fab fa-x-twitter"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-widget-area">
            <div className="widget-column">
              <div className="footer-widget">
                <ul className="navbar-footer mobile-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/services">Services</a></li>
                  <li><a href="/about-us">About Us</a></li>
                  <li><a href="/contact">Contact us</a></li>
                </ul>
                <p>Our clients have built wealth through innovation, hard work, and wise decision-making. They came to us to take the next steps towards safeguarding and growing that wealth. Digital Wealth Partners is here to support you.</p>
                <div className="footer-links desktop-only">
                  <div className="links-container">
                    <p>
                      <a href="#">Disclaimer</a> |
                      <a href="#">Privacy Policy</a> |
                      <a href="#">Terms of Service</a>
                    </p>
                    <p>
                      <a href="#">Legal</a> |
                      <a href="#">Onboarding Fee Refund Policy</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="widget-column">
              <div className="footer-widget">
                <div className="broker-check-image">
                  <a href="https://brokercheck.finra.org/" target="_blank" rel="noopener noreferrer">
                    <img src={brokerCheckImage} alt="Broker Check" />
                  </a>
                </div>
              </div>
            </div>

            <div className="widget-column mobile-only">
              <div className="footer-links">
                <div className="links-container">
                  <p>
                    <a href="#">Disclaimer</a> |
                    <a href="#">Privacy Policy</a> |
                    <a href="#">Terms of Service</a>
                  </p>
                  <p>
                    <a href="#">Legal</a> |
                    <a href="#">Onboarding Fee Refund Policy</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lower-footer">
        <div className="container-1">
          <span>© {new Date().getFullYear()}</span>
          <span><a href="/" target="_blank" rel="noopener noreferrer">Digital Wealth Partners</a></span>
          <span>All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
