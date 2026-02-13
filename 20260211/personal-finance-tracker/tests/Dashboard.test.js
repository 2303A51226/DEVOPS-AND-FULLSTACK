const Dashboard = require('../src/modules/dashboard/Dashboard');
const Expenses = require('../src/modules/expenses/Expenses');
const Income = require('../src/modules/income/Income');

describe('Dashboard Module', () => {
  let dashboard;

  beforeEach(() => {
    dashboard = new Dashboard();
  });

  test('should initialize with zero balance', () => {
    expect(dashboard.getBalance()).toBe(0);
  });

  test('should calculate balance correctly', () => {
    const incomeData = [
      { amount: 5000 },
      { amount: 1000 }
    ];
    const expenseData = [
      { amount: 1000 },
      { amount: 500 }
    ];

    dashboard.updateFromData(incomeData, expenseData);
    expect(dashboard.getBalance()).toBe(4500);
  });

  test('should return summary with all financial data', () => {
    const incomeData = [{ amount: 5000 }];
    const expenseData = [{ amount: 2000 }];

    dashboard.updateFromData(incomeData, expenseData);
    const summary = dashboard.getSummary();

    expect(summary.totalIncome).toBe(5000);
    expect(summary.totalExpenses).toBe(2000);
    expect(summary.balance).toBe(3000);
    expect(summary.savingsRate).toBe('60.00');
  });

  test('should calculate savings rate correctly', () => {
    const incomeData = [{ amount: 10000 }];
    const expenseData = [{ amount: 7000 }];

    dashboard.updateFromData(incomeData, expenseData);
    const summary = dashboard.getSummary();

    expect(parseFloat(summary.savingsRate)).toBe(30);
  });

  test('should handle zero income gracefully', () => {
    const incomeData = [];
    const expenseData = [{ amount: 500 }];

    dashboard.updateFromData(incomeData, expenseData);
    const summary = dashboard.getSummary();

    expect(summary.savingsRate).toBe(0);
  });

  test('should calculate net worth correctly', () => {
    const incomeData = [{ amount: 8000 }];
    const expenseData = [{ amount: 3000 }];

    dashboard.updateFromData(incomeData, expenseData);
    expect(dashboard.getNetWorth()).toBe(5000);
  });
});
