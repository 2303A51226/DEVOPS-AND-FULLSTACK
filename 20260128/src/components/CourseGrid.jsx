import React from 'react';
import CourseCard from './CourseCard';
import { coursesData } from '../data/courseData';
import './CourseGrid.css';

// Question 3 & 5: Functional component that demonstrates composition
// This component combines the CourseCard component to build a larger feature
const CourseGrid = () => {
  return (
    <section className="courses-section" id="courses">
      <div className="courses-container">
        <h2>Featured Courses</h2>
        <p className="section-subtitle">
          Choose from our selection of professional courses designed for your success
        </p>
        <div className="courses-grid">
          {/* Question 5: Mapping over data to create reusable CourseCard components */}
          {/* Each course is rendered with the same reusable CourseCard component */}
          {coursesData.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              instructor={course.instructor}
              duration={course.duration}
              level={course.level}
              students={course.students}
              rating={course.rating}
              price={course.price}
              image={course.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseGrid;
