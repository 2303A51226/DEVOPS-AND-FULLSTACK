import React from 'react';
import './WelcomeSection.css';

// Question 3: Functional component demonstrating simple UI presentation
// Question 5: This component is reusable - it encapsulates the welcome section logic
const WelcomeSection = () => {
  return (
    <section className="welcome-section">
      <div className="welcome-content">
        <h2>Welcome to LearnHub!</h2>
        <p>
          Learn new skills, explore courses, and grow your knowledge with our comprehensive
          learning platform.
        </p>
        <div className="cta-buttons">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-secondary">View Courses</button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
