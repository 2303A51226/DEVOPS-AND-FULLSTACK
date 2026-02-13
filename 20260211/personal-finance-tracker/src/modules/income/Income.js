// Income Module
// Handles income tracking and management

class Income {
  constructor() {
    this.incomes = [];
    this.nextId = 1;
  }

  addIncome(source, amount, description = '') {
    if (amount <= 0) {
      throw new Error('Income amount must be greater than 0');
    }
    if (!source) {
      throw new Error('Income source is required');
    }

    const income = {
      id: this.nextId++,
      source,
      amount,
      description,
      date: new Date().toISOString()
    };

    this.incomes.push(income);
    return income;
  }

  deleteIncome(id) {
    const index = this.incomes.findIndex(inc => inc.id === id);
    if (index === -1) {
      throw new Error('Income not found');
    }
    return this.incomes.splice(index, 1)[0];
  }

  getTotalIncome() {
    return this.incomes.reduce((sum, inc) => sum + inc.amount, 0);
  }

  getIncomeBySource(source) {
    return this.incomes.filter(inc => inc.source === source);
  }

  getAllIncomes() {
    return [...this.incomes];
  }
}

module.exports = Income;
