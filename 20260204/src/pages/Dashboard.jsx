import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const performanceData = [
    { subject: 'Mathematics', score: 92, grade: 'A' },
    { subject: 'English', score: 88, grade: 'A' },
    { subject: 'Science', score: 85, grade: 'B+' },
    { subject: 'History', score: 90, grade: 'A' },
    { subject: 'Physical Education', score: 95, grade: 'A+' }
  ];

  const stats = {
    gpa: 3.9,
    attendanceRate: 97,
    assignmentsCompleted: 48,
    totalAssignments: 50
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h2>Student Performance Overview</h2>
        <p>Welcome to your academic dashboard</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>GPA</h3>
            <p className="stat-value">{stats.gpa}</p>
            <span className="stat-label">Overall GPA</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>Attendance</h3>
            <p className="stat-value">{stats.attendanceRate}%</p>
            <span className="stat-label">Attendance Rate</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Assignments</h3>
            <p className="stat-value">{stats.assignmentsCompleted}/{stats.totalAssignments}</p>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h3>Rank</h3>
            <p className="stat-value">#5</p>
            <span className="stat-label">In Class</span>
          </div>
        </div>
      </div>

      <div className="performance-section">
        <h3>Recent Subject Performance</h3>
        <table className="performance-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td className="score">{item.score}%</td>
                <td className={`grade grade-${item.grade.toLowerCase().replace('+', 'plus')}`}>
                  {item.grade}
                </td>
                <td className="status">
                  {item.score >= 90 ? '⭐ Excellent' : item.score >= 80 ? '✨ Good' : '👍 Satisfactory'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
