import React from 'react';
import './Courses.css';

const Courses = () => {
  const courses = [
    {
      id: 1,
      code: 'MATH101',
      name: 'Calculus I',
      instructor: 'Dr. Sarah Johnson',
      semester: 'Fall 2026',
      credits: 4,
      status: 'In Progress',
      progress: 75
    },
    {
      id: 2,
      code: 'ENG201',
      name: 'Literature & Composition',
      instructor: 'Prof. Michael Chen',
      semester: 'Fall 2026',
      credits: 3,
      status: 'In Progress',
      progress: 82
    },
    {
      id: 3,
      code: 'SCI301',
      name: 'Biology II',
      instructor: 'Dr. Emily Watson',
      semester: 'Fall 2026',
      credits: 4,
      status: 'In Progress',
      progress: 68
    },
    {
      id: 4,
      code: 'HIST101',
      name: 'World History',
      instructor: 'Prof. James Mitchell',
      semester: 'Fall 2026',
      credits: 3,
      status: 'In Progress',
      progress: 88
    },
    {
      id: 5,
      code: 'PE101',
      name: 'Physical Fitness',
      instructor: 'Coach David Lee',
      semester: 'Fall 2026',
      credits: 1,
      status: 'In Progress',
      progress: 95
    },
    {
      id: 6,
      code: 'ART101',
      name: 'Introduction to Art',
      instructor: 'Ms. Lisa Anderson',
      semester: 'Fall 2026',
      credits: 2,
      status: 'Completed',
      progress: 100
    }
  ];

  return (
    <div className="courses-page">
      <div className="page-header">
        <h2>Enrolled Courses</h2>
        <p>View all your enrolled courses and progress</p>
      </div>

      <div className="courses-stats">
        <div className="courses-stat">
          <span className="stat-label">Total Courses:</span>
          <span className="stat-value">{courses.length}</span>
        </div>
        <div className="courses-stat">
          <span className="stat-label">Credits Enrolled:</span>
          <span className="stat-value">{courses.reduce((sum, c) => sum + c.credits, 0)}</span>
        </div>
        <div className="courses-stat">
          <span className="stat-label">In Progress:</span>
          <span className="stat-value">{courses.filter(c => c.status === 'In Progress').length}</span>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <h3>{course.name}</h3>
              <span className={`course-status ${course.status.toLowerCase().replace(' ', '-')}`}>
                {course.status}
              </span>
            </div>
            
            <div className="course-details">
              <p><strong>Code:</strong> {course.code}</p>
              <p><strong>Instructor:</strong> {course.instructor}</p>
              <p><strong>Semester:</strong> {course.semester}</p>
              <p><strong>Credits:</strong> {course.credits}</p>
            </div>

            {course.status === 'In Progress' && (
              <div className="progress-section">
                <div className="progress-label">
                  <span>Course Progress</span>
                  <span className="progress-percent">{course.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button className="course-btn">
              {course.status === 'In Progress' ? 'Continue Course' : 'View Details'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
