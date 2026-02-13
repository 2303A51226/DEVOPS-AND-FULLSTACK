const Income = require('../src/modules/income/Income');

describe('Income Module', () => {
  let income;

  beforeEach(() => {
    income = new Income();
  });

  test('should initialize with empty incomes list', () => {
    expect(income.getAllIncomes()).toEqual([]);
  });

  test('should add a new income', () => {
    const newIncome = income.addIncome('Salary', 5000, 'Monthly salary');
    
    expect(newIncome.source).toBe('Salary');
    expect(newIncome.amount).toBe(5000);
    expect(newIncome.description).toBe('Monthly salary');
    expect(newIncome.id).toBe(1);
  });

  test('should throw error for invalid amount', () => {
    expect(() => {
      income.addIncome('Salary', -5000);
    }).toThrow('Income amount must be greater than 0');

    expect(() => {
      income.addIncome('Salary', 0);
    }).toThrow('Income amount must be greater than 0');
  });

  test('should throw error for missing source', () => {
    expect(() => {
      income.addIncome('', 5000);
    }).toThrow('Income source is required');
  });

  test('should delete an income', () => {
    income.addIncome('Salary', 5000);
    income.addIncome('Bonus', 1000);
    
    income.deleteIncome(1);
    
    expect(income.getAllIncomes()).toHaveLength(1);
    expect(income.getAllIncomes()[0].id).toBe(2);
  });

  test('should throw error when deleting non-existent income', () => {
    expect(() => {
      income.deleteIncome(999);
    }).toThrow('Income not found');
  });

  test('should calculate total income correctly', () => {
    income.addIncome('Salary', 5000);
    income.addIncome('Bonus', 1000);
    income.addIncome('Freelance', 500);
    
    expect(income.getTotalIncome()).toBe(6500);
  });

  test('should filter incomes by source', () => {
    income.addIncome('Salary', 5000);
    income.addIncome('Salary', 5000);
    income.addIncome('Bonus', 1000);
    
    const salaryIncomes = income.getIncomeBySource('Salary');
    
    expect(salaryIncomes).toHaveLength(2);
    expect(salaryIncomes.every(inc => inc.source === 'Salary')).toBe(true);
  });

  test('should assign unique IDs to incomes', () => {
    const inc1 = income.addIncome('Salary', 5000);
    const inc2 = income.addIncome('Bonus', 1000);
    const inc3 = income.addIncome('Freelance', 500);
    
    expect(inc1.id).toBe(1);
    expect(inc2.id).toBe(2);
    expect(inc3.id).toBe(3);
  });

  test('should include date in income record', () => {
    const newIncome = income.addIncome('Salary', 5000);
    
    expect(newIncome.date).toBeDefined();
    expect(typeof newIncome.date).toBe('string');
  });
});
