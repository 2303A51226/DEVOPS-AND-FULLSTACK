import React from 'react';
import Header from './components/Header';
import WelcomeSection from './components/WelcomeSection';
import CourseGrid from './components/CourseGrid';
import Statistics from './components/Statistics';
import Footer from './components/Footer';
import './App.css';

// Question 3: This is a functional component in React
// Functional components are JavaScript functions that return JSX
function App() {
  return (
    <div className="app">
      {/* Question 4: Components are rendered inside other components using JSX syntax */}
      {/* This demonstrates component composition - combining multiple smaller components */}
      <Header />
      <main className="main-content">
        <WelcomeSection />
        <Statistics />
        <CourseGrid />
      </main>
      <Footer />
    </div>
  );
}

export default App;
