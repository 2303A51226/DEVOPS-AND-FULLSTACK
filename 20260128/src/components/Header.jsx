import React from 'react';
import './Header.css';

// Question 3: This is a functional component in React
// Functional components are simple JavaScript functions that return JSX
// They can be imported and reused multiple times in the application
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <h1>LearnHub</h1>
        </div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
