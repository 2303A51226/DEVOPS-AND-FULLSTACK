import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  // Initialize state with useState hook
  const [count, setCount] = useState(0);
  const [stepValue, setStepValue] = useState(1);
  const [history, setHistory] = useState([0]);

  // Increment counter
  const handleIncrement = () => {
    const newCount = count + stepValue;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  // Decrement counter (with constraint: prevent going below 0)
  const handleDecrement = () => {
    const newCount = Math.max(0, count - stepValue);
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  // Reset counter to 0
  const handleReset = () => {
    setCount(0);
    setStepValue(1);
    setHistory([0]);
  };

  // Handle step value change
  const handleStepChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setStepValue(value);
  };

  // Determine message based on counter value
  const getMessage = () => {
    if (count === 0) return '🚀 Ready to count! Start incrementing.';
    if (count === 5) return '🎯 You reached 5! Keep going!';
    if (count === 10) return '🌟 Milestone! You hit 10!';
    if (count === 20) return '🏆 Awesome! You reached 20!';
    if (count === 50) return '🎉 Amazing! You hit 50! You\'re a counting champion!';
    if (count === 100) return '👑 LEGENDARY! You reached 100! Absolutely incredible!';
    if (count > 100) return `💎 You are absolutely crushing it at ${count}!`;
    return '';
  };

  // Determine background color based on counter value
  const getBackgroundClass = () => {
    if (count === 0) return 'bg-neutral';
    if (count > 0 && count < 10) return 'bg-low';
    if (count >= 10 && count < 50) return 'bg-medium';
    if (count >= 50 && count < 100) return 'bg-high';
    if (count >= 100) return 'bg-legendary';
    return 'bg-neutral';
  };

  return (
    <div className={`counter-container ${getBackgroundClass()}`}>
      <div className="counter-card">
        <div className="counter-display">
          <div className="counter-label">Current Count</div>
          <div className="counter-value">{count}</div>
          <div className="counter-stats">
            <span>Highest: {Math.max(...history)}</span>
            <span>Steps: {history.length - 1}</span>
          </div>
        </div>

        {getMessage() && (
          <div className="message-box">
            {getMessage()}
          </div>
        )}

        <div className="step-control">
          <label htmlFor="step-input">Step Value:</label>
          <input
            id="step-input"
            type="number"
            min="1"
            max="100"
            value={stepValue}
            onChange={handleStepChange}
            className="step-input"
          />
        </div>

        <div className="button-group">
          <button
            className="btn btn-decrement"
            onClick={handleDecrement}
            disabled={count === 0}
            title="Decrement counter by step value"
          >
            <span className="btn-icon">➖</span>
            <span className="btn-text">Decrement</span>
          </button>

          <button
            className="btn btn-reset"
            onClick={handleReset}
            title="Reset counter to zero"
          >
            <span className="btn-icon">🔄</span>
            <span className="btn-text">Reset</span>
          </button>

          <button
            className="btn btn-increment"
            onClick={handleIncrement}
            title="Increment counter by step value"
          >
            <span className="btn-icon">➕</span>
            <span className="btn-text">Increment</span>
          </button>
        </div>

        <div className="info-section">
          <h3>How It Works</h3>
          <ul className="info-list">
            <li>Use <strong>Increment</strong> to add the step value to counter</li>
            <li>Use <strong>Decrement</strong> to subtract (stops at 0)</li>
            <li>Adjust <strong>Step Value</strong> to control increment amount</li>
            <li>Use <strong>Reset</strong> to start over</li>
            <li>Watch for special <strong>milestone messages</strong> at certain values!</li>
          </ul>
        </div>

        <div className="history-section">
          <h3>Count History</h3>
          <div className="history-list">
            {history.length > 0 ? (
              <div className="history-items">
                {history.map((value, index) => (
                  <span key={index} className="history-item">
                    {value}
                  </span>
                ))}
              </div>
            ) : (
              <p>No history yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="learning-guide">
        <h2>📚 React State Learning Guide</h2>
        <div className="guide-section">
          <h3>useState Hook</h3>
          <p>The <code>useState</code> hook is how we add state to functional components.</p>
          <pre>const [count, setCount] = useState(0);</pre>
          <ul>
            <li><strong>count</strong> - Current state value</li>
            <li><strong>setCount</strong> - Function to update state</li>
            <li><strong>0</strong> - Initial state value</li>
          </ul>
        </div>

        <div className="guide-section">
          <h3>State Update Causes Re-render</h3>
          <p>When you call a setter function like <code>setCount()</code>, React:</p>
          <ol>
            <li>Updates the state value</li>
            <li>Re-renders the component</li>
            <li>Reflects changes in the UI</li>
          </ol>
        </div>

        <div className="guide-section">
          <h3>Multiple State Variables</h3>
          <p>You can use multiple <code>useState</code> calls:</p>
          <pre>
const [count, setCount] = useState(0);
const [stepValue, setStepValue] = useState(1);
const [history, setHistory] = useState([0]);
          </pre>
        </div>

        <div className="guide-section">
          <h3>Bonus Features in This Counter</h3>
          <ul>
            <li>✅ <strong>Prevent Below Zero</strong> - Using <code>Math.max()</code> constraint</li>
            <li>✅ <strong>Milestone Messages</strong> - Displayed at 5, 10, 20, 50, 100</li>
            <li>✅ <strong>Step Control</strong> - Customize increment/decrement amount</li>
            <li>✅ <strong>History Tracking</strong> - Records all count changes</li>
            <li>✅ <strong>Dynamic Styling</strong> - CSS class changes based on value</li>
            <li>✅ <strong>Statistics</strong> - Shows highest count and number of steps</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Counter;
