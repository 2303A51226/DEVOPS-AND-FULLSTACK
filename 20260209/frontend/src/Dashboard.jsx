import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Fetch dashboard data from backend
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/dashboard');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        setDashboardData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to fetch dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>💰 Personal Finance Dashboard</h1>
        <button 
          className="refresh-btn"
          onClick={fetchDashboardData}
          disabled={loading}
        >
          {loading ? '⏳ Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      {loading && (
        <div className="loading-message">
          <p>📊 Loading your financial summary...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>❌ Error: {error}</p>
          <button onClick={fetchDashboardData}>Try Again</button>
        </div>
      )}

      {dashboardData && !loading && (
        <div className="dashboard-cards">
          {/* Total Income Card */}
          <div className="card income-card">
            <div className="card-header">
              <h2>Total Income</h2>
              <span className="icon">📈</span>
            </div>
            <div className="card-value">
              {formatCurrency(dashboardData.totalIncome)}
            </div>
            <p className="card-meta">YTD Income</p>
          </div>

          {/* Total Expenses Card */}
          <div className="card expense-card">
            <div className="card-header">
              <h2>Total Expenses</h2>
              <span className="icon">📉</span>
            </div>
            <div className="card-value">
              {formatCurrency(dashboardData.totalExpenses)}
            </div>
            <p className="card-meta">YTD Expenses</p>
          </div>

          {/* Balance Card */}
          <div className={`card balance-card ${dashboardData.balance >= 0 ? 'positive' : 'negative'}`}>
            <div className="card-header">
              <h2>Balance</h2>
              <span className="icon">{dashboardData.balance >= 0 ? '✅' : '⚠️'}</span>
            </div>
            <div className="card-value">
              {formatCurrency(dashboardData.balance)}
            </div>
            <p className="card-meta">
              {dashboardData.balance >= 0 ? 'Surplus' : 'Deficit'}
            </p>
          </div>
        </div>
      )}

      {dashboardData && (
        <div className="dashboard-footer">
          <p>Last updated: {new Date(dashboardData.lastUpdated).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
