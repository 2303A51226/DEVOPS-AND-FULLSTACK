import React from 'react';
import Welcome from './Welcome';
import CourseDetails from './CourseDetails';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">EduDash</div>
        <nav>
          <a href="#">Home</a>
          <a href="#">Profile</a>
          <a href="#">Settings</a>
        </nav>
      </header>
      <main className="main-content">
        <Welcome />
        <CourseDetails />
      </main>
    </div>
  );
}

export default App;
