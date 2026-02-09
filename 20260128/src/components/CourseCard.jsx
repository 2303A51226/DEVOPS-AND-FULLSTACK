import React from 'react';
import './CourseCard.css';

// Question 3 & 5: Small, reusable functional component
// This component receives data via props and displays a single course
// Benefits: Highly reusable, testable, maintainable, and composable
const CourseCard = ({
  title,
  description,
  instructor,
  duration,
  level,
  students,
  rating,
  price,
  image
}) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <span className="course-image-placeholder">{image}</span>
      </div>
      <div className="course-content">
        <div className="course-header">
          <h3>{title}</h3>
          <span className={`level-badge level-${level.toLowerCase()}`}>
            {level}
          </span>
        </div>
        <p className="course-description">{description}</p>
        <div className="course-meta">
          <div className="meta-item">
            <span className="icon">⏱️</span>
            <span>{duration}</span>
          </div>
          <div className="meta-item">
            <span className="icon">👥</span>
            <span>{students} students</span>
          </div>
          <div className="meta-item">
            <span className="icon">⭐</span>
            <span>{rating} rating</span>
          </div>
        </div>
        <div className="course-footer">
          <div className="instructor">By {instructor}</div>
          <div className="price">${price}</div>
        </div>
        <button className="enroll-btn">Enroll Now</button>
      </div>
    </div>
  );
};

export default CourseCard;
