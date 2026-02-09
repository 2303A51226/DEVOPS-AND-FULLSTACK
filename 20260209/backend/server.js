import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock financial data (in a real app, this would come from a database)
const financialData = {
  transactions: [
    { id: 1, type: 'income', amount: 3000, category: 'Salary', date: '2026-02-01' },
    { id: 2, type: 'income', amount: 500, category: 'Freelance', date: '2026-02-05' },
    { id: 3, type: 'expense', amount: 800, category: 'Rent', date: '2026-02-02' },
    { id: 4, type: 'expense', amount: 150, category: 'Groceries', date: '2026-02-05' },
    { id: 5, type: 'expense', amount: 50, category: 'Utilities', date: '2026-02-08' },
    { id: 6, type: 'expense', amount: 100, category: 'Entertainment', date: '2026-02-09' }
  ]
};

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Dashboard endpoint
app.get('/api/dashboard', (req, res) => {
  try {
    // Calculate totals
    const totalIncome = financialData.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = financialData.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    // Simulate network delay
    setTimeout(() => {
      res.json({
        success: true,
        data: {
          totalIncome: parseFloat(totalIncome.toFixed(2)),
          totalExpenses: parseFloat(totalExpenses.toFixed(2)),
          balance: parseFloat(balance.toFixed(2)),
          currency: 'USD',
          lastUpdated: new Date().toISOString()
        }
      });
    }, 500);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard data',
      message: error.message
    });
  }
});

// Get all transactions endpoint
app.get('/api/transactions', (req, res) => {
  res.json({
    success: true,
    data: financialData.transactions
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard API: http://localhost:${PORT}/api/dashboard`);
});
