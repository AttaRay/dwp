import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { FiArrowDown } from 'react-icons/fi';
import { FaBriefcase, FaRegStickyNote, FaChalkboard } from 'react-icons/fa';
import speakerImg from './speaker.jpg'
import pic1 from './siteimage.PNG';
import logo1 from './icon1final.png'
import logo2 from './icon2final.png'
import logo3 from './icon3final.png'
import logo4 from './icon4final.png'
import digitalpic from './digital.jpg';



const services = [
  {
    title: 'Digital Asset Expertise',
    description:
      'Our partners are deeply rooted in cryptocurrency trends and innovative investment strategies.',
  },
  {
    title: 'Education Mindset',
    description:
      'Learn about the complex world of digital assets from credentialed experts.',
  },
  {
    title: 'Bespoke Investment Solutions',
    description:
      'Personalized strategies aligned with your goals and risk tolerance in mind.',
  },
  {
    title: 'Security and Trust',
    description:
      "We're committed to robust security measures, regulatory compliance and transparent communication.",
  },
];

const servicesDigital = [
  {
    icon: <FaBriefcase style={{ color: '#0a2c5f', fontSize: '1.7rem' }} />,
    title: 'Digital Asset Management',
    description:
      'Active management and secure custody of cryptocurrency and blockchain asset portfolios.',
  },
  {
    icon: <FaRegStickyNote style={{ color: '#0a2c5f', fontSize: '1.7rem' }} />,
    title: 'Curated Investment Opportunities',
    description:
      'Access to exclusive, vetted opportunities curated by our network.',
  },
  {
    icon: <FaChalkboard style={{ color: '#0a2c5f', fontSize: '1.7rem' }} />,
    title: 'Customized Investment Solutions',
    description:
      'Strategies tailored to align with risk profiles and investment goals of our clients.',
  },
];

const Home = () => {
  return (
    <><section className="hero">
      <div className="hero-left">
        <h1 className="hero-title">
          Unlock the Future of Wealth with Digital Assets
        </h1>
        <h6 className="hero-subtext">
          Digital Wealth Partners: Your Gateway to Digital Investments. Experience Tailored Strategies for Family Offices, HNWIs, and RIAs.
        </h6>
        <div className="hero-buttons">
          <Link to="/contact" className="btn-primary">Get Started →</Link>
          <Link to="/services" className="btn-secondary">View Services</Link>
        </div>
        <div className="scroll-indicator">
          <FiArrowDown size={20} />
        </div>
      </div>

      <div className="hero-right">
        <div className="dotted-shape1" />
        <div className="hero-image">
          {/* Replace with actual image if needed */}
          <img src={pic1} alt="Cityscape" />
        </div>
        <div className="dotted-shape" />
      </div>
    </section>
    
    <section className="mission-section">
        <div className="mission-left">
          <h2 className="mission-title">
            Our Mission: Redefine Wealth Management for the Digital Age
          </h2>
          <p className="mission-text">
            We provide unparalleled expertise in digital assets and alternative investments, delivering customized, high-performance solution for our clients.
          </p>
          <Link to="/services" className="mission-btn">Our Services {'>'}</Link>
          
        </div>

        <div className="mission-right">
          <div className="dots-top-right" />
          <div className="mission-col-left">
            <div className="service-card">
              <span className="service-icon">
                <img src={logo1}alt="Service Icon" className="service-img-icon" />
              </span>
              <h3 className="service-title">{services[0].title}</h3>
              <p className="service-desc">{services[0].description}</p>
              <Link to="/services" className="learn-btn">Learn More</Link>
            </div>
            <div className="service-card">
              <span className="service-icon">
                <img src={logo2} alt="Service Icon" className="service-img-icon" />
              </span>
              <h3 className="service-title">{services[2].title}</h3>
              <p className="service-desc">{services[2].description}</p>
              <Link to="/services" className="learn-btn">Learn More</Link>
            </div>
          </div>
          <div className="mission-col-right">
            <div className="service-card">
              <span className="service-icon">
                <img src={logo3} alt="Service Icon" className="service-img-icon" />
              </span>
              <h3 className="service-title">{services[1].title}</h3>
              <p className="service-desc">{services[1].description}</p>
              <Link to="/services" className="learn-btn">Learn More</Link>
            </div>
            <div className="service-card">
              <span className="service-icon">
                <img src={logo4} alt="Service Icon" className="service-img-icon" />
              </span>
              <h3 className="service-title">{services[3].title}</h3>
              <p className="service-desc">{services[3].description}</p>
              <Link to="/services" className="learn-btn">Learn More</Link>
            </div>
          </div>
          <div className="dots-bottom-right" />
        </div>
      </section>

      <section className="expertise-section">
      <div className="expertise-overlay">
        <p className="expertise-text">
          DWP offers a unique blend of expertise in the burgeoning field of digital assets, including cryptocurrencies, blockchain-based assets, and other non-traditional investment opportunities. Our goal is to provide sophisticated, high-return investment strategies that are tailored to the risk tolerance and investment objectives of our discerning clientele.
        </p>
        <h1 className="expertise-title">Your Gateway to Digital Investments</h1>
        <Link to="/contact" className="expertise-btn">Get Started</Link>
      </div>
    </section>

   <section className="digital-section">
  <div className="digital-image-stack">
    <img src={digitalpic} alt="Background" className="digital-pic-img" />
    <img src={speakerImg} alt="Speaker" className="speaker-img" />
  </div>

  <div className="digital-content-container">
    <h2>Comprehensive Digital Asset Services</h2>
    <p className="digital-subheading">
      Secure Management, Exclusive Opportunities, Tailored Solutions, and Expert Advisory for the Modern Investor
    </p>
    <ul className="digital-services-list">
      {servicesDigital.map((service, index) => (
        <li key={index} className="digital-service-item">
          <span className="digital-icon">{service.icon}</span>
          <div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        </li>
      ))}
    </ul>
    <div className="digital-dotted-accent" />
  </div>
</section>

 <section className="cta-section">
      <h2 className="cta-text">
        See why clients choose to work <br />
        with Digital Wealth Partners.
      </h2>
      <Link to="/contact" className="cta-button">Contact Us</Link>
    </section>
      
      
      </>
  );
};

export default Home;