const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
const store = {
  expenses: [],
  income: [],
  expenseId: 0,
  incomeId: 0
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Personal Finance Tracker API running' });
});

// ==================== DASHBOARD API ====================

app.get('/api/dashboard', (req, res) => {
  try {
    const totalIncome = store.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = store.expenses.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalExpenses;

    const expensesByCategory = {};
    store.expenses.forEach(expense => {
      expensesByCategory[expense.category] = (expensesByCategory[expense.category] || 0) + expense.amount;
    });

    const incomeBySource = {};
    store.income.forEach(item => {
      incomeBySource[item.source] = (incomeBySource[item.source] || 0) + item.amount;
    });

    res.json({
      success: true,
      data: {
        totalIncome: parseFloat(totalIncome.toFixed(2)),
        totalExpenses: parseFloat(totalExpenses.toFixed(2)),
        balance: parseFloat(balance.toFixed(2)),
        expensesByCategory,
        incomeBySource,
        transactionCount: store.expenses.length + store.income.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== EXPENSES API ====================

// Create expense
app.post('/api/expenses', (req, res) => {
  try {
    const { category, amount, description } = req.body;

    if (!category || !amount) {
      return res.status(400).json({ 
        success: false, 
        error: 'Category and amount are required' 
      });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Amount must be a positive number' 
      });
    }

    const expense = {
      id: ++store.expenseId,
      category,
      amount: parseFloat(amount.toFixed(2)),
      description: description || '',
      date: new Date().toISOString()
    };

    store.expenses.push(expense);

    res.status(201).json({
      success: true,
      data: expense,
      message: 'Expense created successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all expenses
app.get('/api/expenses', (req, res) => {
  try {
    res.json({
      success: true,
      data: store.expenses,
      count: store.expenses.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get expense by ID
app.get('/api/expenses/:id', (req, res) => {
  try {
    const expense = store.expenses.find(e => e.id === parseInt(req.params.id));
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        error: 'Expense not found'
      });
    }

    res.json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== INCOME API ====================

// Create income
app.post('/api/income', (req, res) => {
  try {
    const { source, amount, description } = req.body;

    if (!source || !amount) {
      return res.status(400).json({ 
        success: false, 
        error: 'Source and amount are required' 
      });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Amount must be a positive number' 
      });
    }

    const income = {
      id: ++store.incomeId,
      source,
      amount: parseFloat(amount.toFixed(2)),
      description: description || '',
      date: new Date().toISOString()
    };

    store.income.push(income);

    res.status(201).json({
      success: true,
      data: income,
      message: 'Income created successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all income
app.get('/api/income', (req, res) => {
  try {
    res.json({
      success: true,
      data: store.income,
      count: store.income.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get income by ID
app.get('/api/income/:id', (req, res) => {
  try {
    const incomeItem = store.income.find(i => i.id === parseInt(req.params.id));
    
    if (!incomeItem) {
      return res.status(404).json({
        success: false,
        error: 'Income not found'
      });
    }

    res.json({
      success: true,
      data: incomeItem
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== ERROR HANDLING ====================

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Route not found' 
  });
});

// Start server
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`Personal Finance Tracker API running on port ${PORT}`);
  });
}

module.exports = { app, server };
