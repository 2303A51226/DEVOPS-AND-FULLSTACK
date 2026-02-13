// Dashboard Module
// Handles aggregation and display of financial data

class Dashboard {
  constructor() {
    this.totalIncome = 0;
    this.totalExpenses = 0;
  }

  updateFromData(incomeData, expenseData) {
    this.totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0);
    this.totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  }

  getBalance() {
    return this.totalIncome - this.totalExpenses;
  }

  getNetWorth() {
    return this.getBalance();
  }

  getSummary() {
    return {
      totalIncome: this.totalIncome,
      totalExpenses: this.totalExpenses,
      balance: this.getBalance(),
      savingsRate: this.totalIncome > 0 ? ((this.getBalance() / this.totalIncome) * 100).toFixed(2) : 0
    };
  }
}

module.exports = Dashboard;
