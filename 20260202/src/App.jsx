import React from 'react';
import Counter from './components/Counter';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app-container">
        <h1>React State Management</h1>
        <p className="subtitle">Understanding useState Hook with a Counter Application</p>
        <Counter />
      </div>
    </div>
  );
}

export default App;
