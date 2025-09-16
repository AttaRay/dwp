import React from 'react'
import './aboutus.css';
import { FaUniversity } from 'react-icons/fa';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import tpic1 from './Max-Kahn.jpg';
import tpic2 from './matthew-snider-mba-headshot.jpg';
import tpic3 from './connor-mclachlan-headshot.jpg';
import tpic4 from './fred-weisbrod.jpg';
import tpic5 from './Tom-Teal.jpg';
import logopic from './Webinar-logo.png';
import wall from './dallas-downtown.jpg';



const teamMembers = [
  {
    name: 'Max Kahn',
    title: 'Chief Executive Officer',
    image: tpic1,
    linkedin: 'https://www.linkedin.com/in/max-kahn-0903/',
    description: [
      'Max Kahn is the Chief Executive Officer of Digital Wealth Partners. With over a decade of experience in financial services and business strategy, Max specializes in guiding institutions and individuals through the evolving digital asset landscape.',
      'Before joining DWP, Max served as Director of Strategy at Digital Asset Research and at YieldX, where he led institutional partnerships, product launches, and oversaw compliance processes.',
      'Max also contributes thought leadership on digital asset strategies and has been pivotal in launching groundbreaking indexes and financial solutions. He is a licensed securities professional.'
    ]
  },
  {
    name: 'Matthew Snider',
    title: 'Chief Investment Officer',
    image: tpic2,
    linkedin: 'https://www.linkedin.com/in/matthewjamessnider/',
    twitter: 'https://twitter.com/block3strategy',
    description: [
      'Matthew Snider is the Chief Investment Officer of Digital Wealth Partners. He is a Registered Investment Advisor Representative, public speaker, guest lecturer, and published author of "Warren Buffet in a Web3 World".',
      'Matthew began his post-MBA career as a management consultant at both Big4 and boutique firms specializing in financial risk management and marketing data analytics.',
      'He received his MBA from Loyola Marymount University and his BA in economics from Boston University.'
    ]
  },
  {
    name: 'Connor McLaughlin',
    title: 'Wealth Advisor',
    image: tpic3,
    linkedin: 'https://www.linkedin.com/in/connor-b-mclaughlin/',
    twitter: 'https://x.com/xrpmickle',
    description: [
      'Connor McLaughlin brings a unique blend of technical expertise and financial acumen to Digital Wealth Partners.',
      'He has successfully navigated the complex worlds of stock and cryptocurrency investing, earning a reputation for his strategic approach.',
      'Connor is passionate about guiding clients through the dynamic landscape of modern finance.'
    ]
  },
  {
    name: 'Fred Weisbrod',
    title: 'Wealth Advisor',
    image: tpic4,
    linkedin: 'https://www.linkedin.com/in/fredweisbrod/',
    description: [
      'Fred Weisbrod brings extensive experience in wealth management and digital assets to Digital Wealth Partners.',
      'His comprehensive understanding of both traditional and digital investment strategies helps clients navigate the evolving financial landscape.',
      'Fred is dedicated to providing personalized wealth management solutions that align with clients\' long-term financial goals.'
    ]
  },
  {
    name: 'Tom Teal',
    title: 'Head of Financial Planning',
    image: tpic5,
    linkedin: 'https://www.linkedin.com/in/tom-teal/',
    description: [
      'Tom Teal leads the financial planning initiatives at Digital Wealth Partners.',
      'With his extensive background in financial planning and wealth management, Tom helps clients develop comprehensive strategies that incorporate both traditional and digital assets.',
      'He focuses on creating personalized financial plans that adapt to the changing investment landscape while maintaining strong risk management principles.'
    ]
  }
];


const About = () => {
  
  return (

    <div className='about-main'>
       <div className="about-container">
      <div className="about-text-column">
        <header className="section-title">
          <h1>
            Meet the <span>team</span><br />
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
          <div className="first-image-wrapper">
            <img
              src={wall}
              alt="Dallas Downtown" />
          </div>
          <div className="second-image-wrapper">
            <img
              src={logopic}
              alt="Digital Wealth Partners" />
          </div>
          <div className="shape-dots top"></div>
          <div className="shape-dots bottom"></div>
        </div>
      </div>
    </div>
    
    
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
      

      <section className="team-profiles">
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="profile-card" style={{"--card-index": index + 1}}>
              <div className="profile-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="profile-content">
                <h5>{member.name}</h5>
                <span className="profile-title">{member.title}</span>
                {member.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <div className="profile-socials">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedinIn />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About