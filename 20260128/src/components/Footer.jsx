import React from 'react';
import './Footer.css';

// Question 3 & 5: Functional component demonstrating reusability
// This footer component is self-contained and can be used across multiple pages
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>LearnHub</h4>
          <p>Empowering learners worldwide with quality education.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#docs">Documentation</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#facebook">F</a>
            <a href="#twitter">T</a>
            <a href="#linkedin">L</a>
            <a href="#instagram">I</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} LearnHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
