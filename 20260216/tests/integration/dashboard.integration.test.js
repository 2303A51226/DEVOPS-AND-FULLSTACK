const request = require('supertest');
const { app } = require('../../src/server');

describe('Dashboard API Integration Tests', () => {
  beforeEach(async () => {
    // Clear data before each test by resetting the store
    // We'll make API calls to reset the state
  });

  describe('GET /api/dashboard', () => {
    test('should return dashboard with initial empty state', async () => {
      const response = await request(app)
        .get('/api/dashboard')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('totalIncome', 0);
      expect(response.body.data).toHaveProperty('totalExpenses', 0);
      expect(response.body.data).toHaveProperty('balance', 0);
      expect(response.body.data).toHaveProperty('expensesByCategory');
      expect(response.body.data).toHaveProperty('incomeBySource');
      expect(response.body.data).toHaveProperty('transactionCount', 0);
    });

    test('should return correct summary data after creating income entries', async () => {
      // Create income
      await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 5000,
          description: 'Monthly salary'
        })
        .expect(201);

      await request(app)
        .post('/api/income')
        .send({
          source: 'Freelance',
          amount: 1000,
          description: 'Project payment'
        })
        .expect(201);

      // Get dashboard
      const response = await request(app)
        .get('/api/dashboard')
        .expect(200);

      expect(response.body.data.totalIncome).toBe(6000);
      expect(response.body.data.balance).toBe(6000);
      expect(response.body.data.incomeBySource['Salary']).toBe(5000);
      expect(response.body.data.incomeBySource['Freelance']).toBe(1000);
    });

    test('should return correct summary after creating expenses', async () => {
      // Create income
      await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 3000,
          description: 'Monthly salary'
        })
        .expect(201);

      // Create expenses
      await request(app)
        .post('/api/expenses')
        .send({
          category: 'Rent',
          amount: 1000,
          description: 'Monthly rent'
        })
        .expect(201);

      await request(app)
        .post('/api/expenses')
        .send({
          category: 'Groceries',
          amount: 300,
          description: 'Weekly groceries'
        })
        .expect(201);

      // Get dashboard
      const response = await request(app)
        .get('/api/dashboard')
        .expect(200);

      expect(response.body.data.totalIncome).toBe(3000);
      expect(response.body.data.totalExpenses).toBe(1300);
      expect(response.body.data.balance).toBe(1700);
      expect(response.body.data.expensesByCategory['Rent']).toBe(1000);
      expect(response.body.data.expensesByCategory['Groceries']).toBe(300);
      expect(response.body.data.transactionCount).toBe(3);
    });

    test('should correctly aggregate data when categories repeat', async () => {
      // Create multiple expenses in same category
      await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          amount: 50,
          description: 'Lunch'
        })
        .expect(201);

      await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          amount: 40,
          description: 'Dinner'
        })
        .expect(201);

      await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          amount: 35,
          description: 'Breakfast'
        })
        .expect(201);

      // Get dashboard
      const response = await request(app)
        .get('/api/dashboard')
        .expect(200);

      expect(response.body.data.totalExpenses).toBe(125);
      expect(response.body.data.expensesByCategory['Food']).toBe(125);
    });

    test('should have proper response structure', async () => {
      const response = await request(app)
        .get('/api/dashboard')
        .expect(200);

      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('data');
      expect(typeof response.body.data.totalIncome).toBe('number');
      expect(typeof response.body.data.totalExpenses).toBe('number');
      expect(typeof response.body.data.balance).toBe('number');
      expect(typeof response.body.data.expensesByCategory).toBe('object');
      expect(typeof response.body.data.incomeBySource).toBe('object');
    });
  });

  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('message');
    });
  });
});
