
import React, { useEffect, useState } from "react";
import "./services.css";
import { FaShieldAlt, FaTasks, FaChartLine, FaPiggyBank, FaComments } from "react-icons/fa";
import Header from './header';
import image1 from './service image.jpg';
import image2 from './service image2.jpg';

const Services = () => {
  const [menuClass, setMenuClass] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Add grey background after scrolling 50px
      if (currentScroll > 50) {
        setMenuClass((prev) => prev.includes("scrolled") ? prev : prev + " scrolled");
      } else {
        setMenuClass((prev) => prev.replace(" scrolled", ""));
      }

      // Hide only at the bottom
      if (currentScroll + windowHeight >= scrollHeight - 5) {
        setMenuClass((prev) => prev.includes("hidden") ? prev : prev + " hidden");
      } else {
        setMenuClass((prev) => prev.replace(" hidden", ""));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      <Header />
      <div className="digital-asset-page">
        
          <div className={`icon-menu${menuClass}`}>
              <div className="icon-item">
                  <FaShieldAlt className="icon" />
                  <span>Custody</span>
              </div>
              <div className="icon-item">
                  <FaTasks className="icon" />
                  <span>Management</span>
              </div>
              <div className="icon-item">
                  <FaChartLine className="icon" />
                  <span>Opportunities</span>
              </div>
              <div className="icon-item">
                  <FaPiggyBank className="icon" />
                  <span>Investment Solutions</span>
              </div>
              <div className="icon-item">
                  <FaComments className="icon" />
                  <span>Advisory</span>
              </div>
          </div>

          {/* First Section */}
         <section id="digital-asset-custody" className="custody-section">
  <div className="custody-container">
    {/* Left side - text */}
    <div className="custody-text">
      <h2 className="custody-title">Digital Asset Custody</h2>
      <h6 className="custody-subtitle">
        Digital assets require robust protection and reliable accessibility in today’s economy.
      </h6>
      <p>
        Digital Asset Custody plays an important role in the changing world of
        cryptocurrencies and blockchain-based assets. With the market value
        exceeding $1 trillion and financial institutions entering the space,
        secure custody solutions support investor confidence and wider adoption.
        These services provide secure storage of cryptographic keys, which
        establish ownership and enable transactions of digital assets.
      </p>
      <a href="#" className="learn-more">Learn more →</a>
    </div>

    {/* Right side - image */}
    <div className="custody-image">
      <img
        src={image1}
        alt="City skyline"
      />
    </div>
  </div>
</section>

{/* Management Section */}
<section id="digital-asset-management" className="management-section">
  <div className="management-container">
    {/* Left side - text */}
    <div className="management-text">
      <h2 className="management-title">Digital Asset Management</h2>
      <h6 className="management-subtitle">
        Elevating Portfolio Performance through Strategic Digital Asset Management
      </h6>
      <p>
        Our team of experts specializes in the active management of cryptocurrency
        and blockchain asset portfolios, employing a comprehensive risk management
        framework. Leveraging cutting-edge technology and deep market insights, we
        aim to optimize returns while meticulously controlling for volatility and
        security risks, ensuring your investments are both profitable and protected.
      </p>
      <a href="#" className="learn-more">Learn more</a>
    </div>

    {/* Right side - image */}
    <div className="management-image">
      <img
        src={image2}
        alt="Business discussion"
      />
    </div>
  </div>
</section>

 <section id="digital-asset-custody" className="custody-section">
  <div className="custody-container">
    {/* Left side - text */}
    <div className="custody-text">
      <h2 className="custody-title">Alternative Investment Opportunities</h2>
      <h6 className="custody-subtitle">
        Unlocking the Potential of Exclusive Investments:
      </h6>
      <p>
    Gain unparalleled access to a carefully selected range of exclusive,
 vetted opportunities within the digital and alternative investment space. 
 Our network opens doors to innovative and emerging markets, 
 offering you the chance to diversify your portfolio with investments 
 curated for their unique potential and managed with our hallmark precision and insight.
      </p>
      <a href="#" className="learn-more">Learn more →</a>
    </div>

    {/* Right side - image */}
    <div className="custody-image">
      <img
        src={image1}
        alt="City skyline"
      />
    </div>
  </div>
</section>

{/* Management Section */}
<section id="digital-asset-management" className="management-section">
  <div className="management-container">
    {/* Left side - text */}
    <div className="management-text">
      <h2 className="management-title">Customized Investment Solutions</h2>
      <h6 className="management-subtitle">
        Tailoring Success with Personalized Investment Strategies: 
      </h6>
      <p>
        Understanding that each investor’s goals and risk tolerance are unique,
 we offer bespoke investment solutions. Our approach begins
 with a deep dive into your financial aspirations, followed by
 the crafting of tailored strategies that not only align with your personal
  risk profile but also aim to exceed your investment objectives,
   ensuring a truly personalized pathway to financial growth.
      </p>
      <a href="#" className="learn-more">Learn more</a>
    </div>

    {/* Right side - image */}
    <div className="management-image">
      <img
        src={image2}
        alt="Business discussion"
      />
    </div>
  </div>
</section>

<section id="digital-asset-custody" className="custody-section">
  <div className="custody-container">
    {/* Left side - text */}
    <div className="custody-text">
      <h2 className="custody-title">Education and Advisory</h2>
      <h6 className="custody-subtitle">
       Empowering Investors through Expert Advisory and Education
      </h6>
      <p>
       Our commitment to client empowerment extends beyond portfolio management
         to include comprehensive education and advisory services. 
        Stay ahead of the curve with our in-depth analyses of market trends, 
        risk assessment techniques, and strategic investment planning.
         Our experts are dedicated to providing you with the knowledge 
         and tools needed to make informed decisions, fostering a collaborative
          approach to achieving your investment ambitions.
      </p>
      <a href="#" className="learn-more">Learn more →</a>
    </div>

    {/* Right side - image */}
    <div className="custody-image">
      <img
        src={image1}
        alt="City skyline"
      />
    </div>
  </div>
</section>
      </div>
    
      
      </>
  );
};

export default Services;
