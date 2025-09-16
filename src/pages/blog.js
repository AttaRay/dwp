import React, { useState } from 'react';
import './blog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faFolder, faComment } from '@fortawesome/free-regular-svg-icons';
import { faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Import blog images
import maxKahnImage from '../assets/blog/Digital-Wealth-Partners-Appoints-Max-Kahn-as-Chief-Executive-Officer.jpg';
import partnershipModelsImage from '../assets/blog/Digital-Wealth-Partners-Announces-New-Partnership-Models-for-RIAs-to-Access-Digital-Asset-Expertise.jpg';
import xlmSupportImage from '../assets/blog/DWP-XLM.jpg';
import cryptoIrasImage from '../assets/blog/a-guide-to-crypto-based-IRAs.jpg';

// Article PropTypes definition
const ArticleShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string
};

const articles = [
  {
    id: "max-kahn-ceo",
    title: "Digital Wealth Partners Appoints Max Kahn as Chief Executive Officer",
    date: "July 8, 2025",
    category: "News",
    excerpt: "Digital Wealth Partners has announced the appointment of Max Kahn as its new Chief Executive Officer. Kahn transitions from his role as [...]",
    image: maxKahnImage
  },
  {
    id: "debt-reduction-plan",
    title: "How to Make a Debt Reduction Plan that Works for You",
    date: "June 27, 2025",
    category: "General",
    excerpt: "Staring at a pile of bills and feeling like you're drowning? I get it. Debt has this sneaky way of [...]",
    image: null
  },
  {
    id: "new-partnership-models",
    title: "Digital Wealth Partners Announces New Partnership Models for RIAs to Access Digital Asset Expertise",
    date: "April 16, 2025",
    category: "News",
    excerpt: "Digital Wealth Partners (DWP), a provider of digital asset investment solutions, announces the launch of partnership models designed for Registered [...]",
    image: partnershipModelsImage
  },
  {
    id: "xlm-custody-support",
    title: "Digital Wealth Partners Enables Access to Custody Support for Stellar Lumens (XLM)",
    date: "April 3, 2025",
    category: "News",
    excerpt: "Digital Wealth Partners is pleased to announce that clients can now access custody support for Stellar Lumens (XLM) through its [...]",
    image: xlmSupportImage
  },
  {
    id: "crypto-iras-guide",
    title: "A Guide to Crypto-Based IRAs",
    date: "April 12, 2025",
    category: "General",
    excerpt: "What is a Crypto-Based IRA? A crypto-based IRA combines the tax advantages of traditional Individual Retirement Accounts (IRAs) with the [...]",
    image: cryptoIrasImage
  }
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className="blog-title-section">
        <div className="container">
        </div>
      </div>
      <div id="posts-content" className="container use-sidebar blog-img-top-list">
        <div className="col-xs-12 col-sm-12 col-lg-8">
        {articles.map(article => (
          <article key={article.id} className="post">
            {article.image && (
              <div className="entry-image">
                <a href={`/blog/${article.id}`}>
                  <img 
                    src={article.image}
                    alt={article.title}
                    width="800"
                    height="418"
                  />
                </a>
              </div>
            )}

            <div className="entry-meta">
              <span className="published">
                <FontAwesomeIcon icon={faClock} />
                <a href={`/blog/${article.id}`}>{article.date}</a>
              </span>
              <span className="author">
                <FontAwesomeIcon icon={faUser} />
                <a href="/about">Digital Wealth Partners</a>
              </span>
              <span className="blog-label">
                <FontAwesomeIcon icon={faFolder} />
                <a href={`/category/${article.category.toLowerCase()}`}>{article.category}</a>
              </span>
              <span className="comment-count">
                <FontAwesomeIcon icon={faComment} />
                <span>Comments Off</span>
              </span>
            </div>

            <h2 className="blog-single-title">
              <a href={`/blog/${article.id}`}>{article.title}</a>
            </h2>

            <div className="entry-content">
              <div className="page-content">
                <p>{article.excerpt}</p>
              </div>
              <a className="tt_button tt_primary_button btn_primary_color hover_solid_secondary post_button" href={`/blog/${article.id}`}>
                <span className="prim_text">Read more</span>
                <FontAwesomeIcon icon={faChevronRight} className="iconita" />
              </a>
            </div>
          </article>
        ))}

        <nav className="blog-pagination">
          <ul className="blog-page-numbers">
            <li className="active"><a href="/blog">1</a></li>
            <li><a href="/blog/page/2">2</a></li>
            <li><a href="/blog/page/3">3</a></li>
            <li><a href="/blog/page/4">4</a></li>
            <li className="next-post-link">
              <a href="/blog/page/2">Next Page »</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar */}
      <div className="col-xs-12 col-sm-12 col-lg-4">
        <div className="right-sidebar">
          {/* Search Widget */}
          <div className="blog_widget widget widget_search">
            <h5 className="widget-title"><span>Search</span></h5>
            <form role="search" className="search-form" onSubmit={(e) => {
              e.preventDefault();
              // TODO: Implement search functionality
              console.log('Search submitted:', searchTerm);
            }}>
              <label>
                <span className="screen-reader-text">Search for:</span>
                <input 
                  type="search" 
                  className="search-field" 
                  placeholder="Search …" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
              <input type="submit" className="search-submit" value="" />
            </form>
          </div>

          {/* Recent Posts Widget */}
          <div className="blog_widget widget widget_recent_entries">
            <h5 className="widget-title"><span>Recent Posts</span></h5>
            <ul>
              {articles.slice(0, 3).map(article => (
                <li key={article.id}>
                  <a href={`/blog/${article.id}`}>
                    {article.image && (
                      <div className="recent-post-thumbnail">
                        <img src={article.image} alt={article.title} />
                      </div>
                    )}
                    <div className="recent-post-title">
                      {article.title}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons Widget */}
          <div className="blog_widget widget redux-social-icons-display">
            <h5 className="widget-title"><span>Follow Us</span></h5>
            <ul className="redux-social-media-list clearfix">
              <li>
                <a href="https://www.linkedin.com/company/digital-wealth-partners" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com/DigitalWealthP" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

Blog.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape(ArticleShape))
};

export default Blog;
