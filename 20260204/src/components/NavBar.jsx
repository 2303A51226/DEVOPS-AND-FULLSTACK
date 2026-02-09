import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>🎓 Student Dashboard</h1>
        </div>
        
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              📊 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/courses" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              📚 Courses
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              👤 Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
