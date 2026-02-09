import React from 'react';
import './Statistics.css';

// Question 3 & 5: Functional component demonstrating reusability
// This component encapsulates the statistics display logic
const Statistics = () => {
  const stats = [
    { label: 'Active Learners', value: '15,234', icon: '👥' },
    { label: 'Available Courses', value: '234', icon: '📖' },
    { label: 'Expert Instructors', value: '89', icon: '👨‍🏫' },
    { label: 'Success Rate', value: '94%', icon: '✅' }
  ];

  return (
    <section className="statistics-section">
      <h2>Platform Statistics</h2>
      <div className="stats-grid">
        {/* Question 5: Demonstrating array mapping for reusable stat cards */}
        {/* Each stat is rendered using the StatCard component (see below) */}
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </section>
  );
};

// Question 5: Small, reusable component for individual stat display
// This component can be used anywhere we need to display a statistic
// Benefits: DRY principle (Don't Repeat Yourself), easier maintenance
const StatCard = ({ icon, label, value }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default Statistics;
