const express = require('express');
const Dashboard = require('./modules/dashboard/Dashboard');
const Expenses = require('./modules/expenses/Expenses');
const Income = require('./modules/income/Income');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize modules
const dashboard = new Dashboard();
const expenses = new Expenses();
const income = new Income();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Personal Finance Tracker API' });
});

app.get('/api/dashboard', (req, res) => {
  dashboard.updateFromData(income.getAllIncomes(), expenses.getAllExpenses());
  res.json(dashboard.getSummary());
});

app.post('/api/expenses', (req, res) => {
  try {
    const { category, amount, description } = req.body;
    const expense = expenses.addExpense(category, amount, description);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/expenses', (req, res) => {
  res.json(expenses.getAllExpenses());
});

app.post('/api/income', (req, res) => {
  try {
    const { source, amount, description } = req.body;
    const newIncome = income.addIncome(source, amount, description);
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/income', (req, res) => {
  res.json(income.getAllIncomes());
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
