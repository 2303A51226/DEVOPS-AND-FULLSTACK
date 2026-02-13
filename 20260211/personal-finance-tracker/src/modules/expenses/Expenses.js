// Expenses Module
// Handles expense tracking and management

class Expenses {
  constructor() {
    this.expenses = [];
    this.nextId = 1;
  }

  addExpense(category, amount, description = '') {
    if (amount <= 0) {
      throw new Error('Expense amount must be greater than 0');
    }
    if (!category) {
      throw new Error('Category is required');
    }

    const expense = {
      id: this.nextId++,
      category,
      amount,
      description,
      date: new Date().toISOString()
    };

    this.expenses.push(expense);
    return expense;
  }

  deleteExpense(id) {
    const index = this.expenses.findIndex(exp => exp.id === id);
    if (index === -1) {
      throw new Error('Expense not found');
    }
    return this.expenses.splice(index, 1)[0];
  }

  getTotalExpenses() {
    return this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }

  getExpensesByCategory(category) {
    return this.expenses.filter(exp => exp.category === category);
  }

  getAllExpenses() {
    return [...this.expenses];
  }
}

module.exports = Expenses;
