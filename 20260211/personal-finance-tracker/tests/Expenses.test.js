const Expenses = require('../src/modules/expenses/Expenses');

describe('Expenses Module', () => {
  let expenses;

  beforeEach(() => {
    expenses = new Expenses();
  });

  test('should initialize with empty expenses list', () => {
    expect(expenses.getAllExpenses()).toEqual([]);
  });

  test('should add a new expense', () => {
    const expense = expenses.addExpense('Food', 50, 'Lunch');
    
    expect(expense.category).toBe('Food');
    expect(expense.amount).toBe(50);
    expect(expense.description).toBe('Lunch');
    expect(expense.id).toBe(1);
  });

  test('should throw error for invalid amount', () => {
    expect(() => {
      expenses.addExpense('Food', -50);
    }).toThrow('Expense amount must be greater than 0');

    expect(() => {
      expenses.addExpense('Food', 0);
    }).toThrow('Expense amount must be greater than 0');
  });

  test('should throw error for missing category', () => {
    expect(() => {
      expenses.addExpense('', 50);
    }).toThrow('Category is required');
  });

  test('should delete an expense', () => {
    expenses.addExpense('Food', 50);
    expenses.addExpense('Transport', 30);
    
    expenses.deleteExpense(1);
    
    expect(expenses.getAllExpenses()).toHaveLength(1);
    expect(expenses.getAllExpenses()[0].id).toBe(2);
  });

  test('should throw error when deleting non-existent expense', () => {
    expect(() => {
      expenses.deleteExpense(999);
    }).toThrow('Expense not found');
  });

  test('should calculate total expenses correctly', () => {
    expenses.addExpense('Food', 50);
    expenses.addExpense('Transport', 30);
    expenses.addExpense('Entertainment', 40);
    
    expect(expenses.getTotalExpenses()).toBe(120);
  });

  test('should filter expenses by category', () => {
    expenses.addExpense('Food', 50);
    expenses.addExpense('Food', 30);
    expenses.addExpense('Transport', 40);
    
    const foodExpenses = expenses.getExpensesByCategory('Food');
    
    expect(foodExpenses).toHaveLength(2);
    expect(foodExpenses.every(exp => exp.category === 'Food')).toBe(true);
  });

  test('should assign unique IDs to expenses', () => {
    const exp1 = expenses.addExpense('Food', 50);
    const exp2 = expenses.addExpense('Transport', 30);
    const exp3 = expenses.addExpense('Entertainment', 40);
    
    expect(exp1.id).toBe(1);
    expect(exp2.id).toBe(2);
    expect(exp3.id).toBe(3);
  });
});
