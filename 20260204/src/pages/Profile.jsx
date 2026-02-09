import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    studentId: 'STU-2026-001',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '2008-05-15',
    major: 'Computer Science',
    minor: 'Mathematics',
    academicYear: 'Sophomore',
    enrollmentDate: '2024-09-01',
    address: '123 College Avenue, University City, CA 90000'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    // In a real app, this would send data to backend
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h2>Student Profile</h2>
        <p>Manage your personal and academic information</p>
      </div>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">👨‍🎓</div>
            <div className="profile-basic">
              <h3>{profileData.firstName} {profileData.lastName}</h3>
              <p className="student-id">ID: {profileData.studentId}</p>
              <p className="academic-year">{profileData.academicYear} • {profileData.major}</p>
            </div>
            <button 
              className="edit-btn"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? '❌ Cancel' : '✏️ Edit'}
            </button>
          </div>

          <div className="profile-form">
            <div className="form-section">
              <h4>Personal Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Academic Information</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={profileData.studentId}
                    disabled={true}
                    className="disabled-field"
                  />
                </div>
                <div className="form-group">
                  <label>Academic Year</label>
                  <input
                    type="text"
                    name="academicYear"
                    value={profileData.academicYear}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Major</label>
                  <input
                    type="text"
                    name="major"
                    value={profileData.major}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
                <div className="form-group">
                  <label>Minor</label>
                  <input
                    type="text"
                    name="minor"
                    value={profileData.minor}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Enrollment Date</label>
                  <input
                    type="date"
                    name="enrollmentDate"
                    value={profileData.enrollmentDate}
                    disabled={true}
                    className="disabled-field"
                  />
                </div>
              </div>
            </div>

            {editMode && (
              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>💾 Save Changes</button>
                <button className="cancel-btn" onClick={() => setEditMode(false)}>❌ Cancel</button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="sidebar-card">
            <h4>📊 Quick Stats</h4>
            <div className="quick-stat">
              <span>Current GPA:</span>
              <strong>3.9</strong>
            </div>
            <div className="quick-stat">
              <span>Credits Earned:</span>
              <strong>64</strong>
            </div>
            <div className="quick-stat">
              <span>Courses Completed:</span>
              <strong>21</strong>
            </div>
            <div className="quick-stat">
              <span>Dean's List:</span>
              <strong>3 times</strong>
            </div>
          </div>

          <div className="sidebar-card">
            <h4>🎯 Achievements</h4>
            <div className="achievement">🏆 Honor Roll</div>
            <div className="achievement">🌟 Perfect Attendance</div>
            <div className="achievement">📚 Knowledge Master</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
