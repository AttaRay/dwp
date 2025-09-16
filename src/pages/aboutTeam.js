import React from 'react';
import './aboutus.css';

const AboutTeam = () => {
    return (
        <div className="about-container">
            <div className="about-text-column">
                <header className="section-title">
                    <h1>
                        Me the <span>team</span><br />
                        members
                    </h1>
                    <h6 className="subtitle">
                        Digital Wealth Partners (DWP) is a pioneering Registered Investment Advisor (RIA) 
                        that specializes in digital assets and alternative investments, catering to 
                        Family Offices, High Net Worth Individuals (HNWI), and other RIAs. Leveraging 
                        a hedge fund type model and fee structure, DWP offers a unique blend of expertise 
                        in the burgeoning field of digital assets, including cryptocurrencies, 
                        blockchain-based assets, and other non-traditional investment opportunities. 
                        Our goal is to provide sophisticated, high-return investment strategies that are 
                        tailored to the risk tolerance and investment objectives of our discerning clientele.
                    </h6>
                </header>
            </div>
            
            <div className="about-image-column">
                <div className="photo-group">
                    <div className="first-image-wrapper" style={{"--card-index": 1}}>
                        <img 
                            src="https://digitalwealthpartners.b-cdn.net/wp-content/uploads/2025/05/dallas-downtown.jpg"
                            alt="Dallas Downtown"
                        />
                    </div>
                    <div className="second-image-wrapper">
                        <img 
                            src="https://digitalwealthpartners.b-cdn.net/wp-content/uploads/2024/05/Webinar-logo.png"
                            alt="Digital Wealth Partners"
                        />
                    </div>
                    <div className="shape-dots top"></div>
                    <div className="shape-dots bottom"></div>
                </div>
            </div>

     <section className="mission-section"> 
      <div className="mission-wrapper"> 
        <div className="mission-icon"> 
          <FaUniversity /> 
        </div> 
        <div className="mission-text"> 
          <h4 className="mission-heading">Mission Statement</h4> 
          <p> 
            To redefine wealth management for the digital age by providing unparalleled expertise 
in digital assets and alternative investments, delivering customized, high-performance 
investment solutions to our clients. 
</p> 
</div> 
</div> 
</section>
        </div>
    );
};

export default AboutTeam;
