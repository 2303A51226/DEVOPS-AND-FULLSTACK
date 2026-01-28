import React from 'react';

const CourseDetails = () => {
    const courses = [
        { id: 1, title: 'React Fundamentals', progress: '80%', status: 'In Progress' },
        { id: 2, title: 'Advanced JavaScript', progress: '100%', status: 'Completed' },
        { id: 3, title: 'UI/UX Design Principles', progress: '40%', status: 'In Progress' }
    ];

    return (
        <div className="course-card">
            <h2>Your Courses</h2>
            <div className="course-list">
                {courses.map(course => (
                    <div key={course.id} className="course-item">
                        <div className="course-info">
                            <h3>{course.title}</h3>
                            <span className={`status ${course.status.toLowerCase().replace(' ', '-')}`}>
                                {course.status}
                            </span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: course.progress }}
                            ></div>
                        </div>
                        <p className="progress-text">{course.progress} Complete</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseDetails;
