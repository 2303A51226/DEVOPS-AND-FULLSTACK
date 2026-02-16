const request = require('supertest');
const { app } = require('../../src/server');

describe('Expenses API Integration Tests', () => {
  describe('POST /api/expenses', () => {
    test('should create a new expense with valid data', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Groceries',
          amount: 50.75,
          description: 'Weekly groceries'
        })
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Expense created successfully');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('category', 'Groceries');
      expect(response.body.data).toHaveProperty('amount', 50.75);
      expect(response.body.data).toHaveProperty('description', 'Weekly groceries');
      expect(response.body.data).toHaveProperty('date');
    });

    test('should create expense without description', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Utilities',
          amount: 150
        })
        .expect(201);

      expect(response.body.data).toHaveProperty('category', 'Utilities');
      expect(response.body.data).toHaveProperty('amount', 150);
      expect(response.body.data.description).toBe('');
    });

    test('should return 400 if category is missing', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .send({
          amount: 50,
          description: 'No category'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toMatch(/required/i);
    });

    test('should return 400 if amount is missing', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          description: 'No amount'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toMatch(/required/i);
    });

    test('should return 400 if amount is negative', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          amount: -50,
          description: 'Negative amount'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toMatch(/positive/i);
    });

    test('should return 400 if amount is zero', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          amount: 0,
          description: 'Zero amount'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toMatch(/positive/i);
    });

    test('should return 400 if amount is not a number', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          amount: 'fifty',
          description: 'String amount'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });

    test('should generate unique IDs for expenses', async () => {
      const response1 = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          amount: 30
        })
        .expect(201);

      const response2 = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Utilities',
          amount: 100
        })
        .expect(201);

      expect(response1.body.data.id).not.toBe(response2.body.data.id);
    });

    test('should format amount to 2 decimal places', async () => {
      const response = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          amount: 50.999,
          description: 'Testing decimals'
        })
        .expect(201);

      expect(response.body.data.amount).toBe(51);
    });
  });

  describe('GET /api/expenses', () => {
    test('should return empty array initially', async () => {
      const response = await request(app)
        .get('/api/expenses')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body).toHaveProperty('count');
    });

    test('should return all expenses after creation', async () => {
      // Create 3 expenses
      await request(app)
        .post('/api/expenses')
        .send({
          category: 'Food',
          amount: 50
        })
        .expect(201);

      await request(app)
        .post('/api/expenses')
        .send({
          category: 'Transport',
          amount: 30
        })
        .expect(201);

      await request(app)
        .post('/api/expenses')
        .send({
          category: 'Entertainment',
          amount: 25
        })
        .expect(201);

      // Fetch all expenses
      const response = await request(app)
        .get('/api/expenses')
        .expect(200);

      expect(response.body.data.length).toBe(3);
      expect(response.body.count).toBe(3);
      expect(response.body.data[0]).toHaveProperty('category');
      expect(response.body.data[0]).toHaveProperty('amount');
      expect(response.body.data[0]).toHaveProperty('id');
    });

    test('should have proper response structure', async () => {
      const response = await request(app)
        .get('/api/expenses')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('GET /api/expenses/:id', () => {
    test('should return specific expense by ID', async () => {
      // Create an expense
      const createResponse = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Groceries',
          amount: 75.50,
          description: 'Weekly shopping'
        })
        .expect(201);

      const expenseId = createResponse.body.data.id;

      // Fetch the expense
      const response = await request(app)
        .get(`/api/expenses/${expenseId}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id', expenseId);
      expect(response.body.data).toHaveProperty('category', 'Groceries');
      expect(response.body.data).toHaveProperty('amount', 75.50);
    });

    test('should return 404 for non-existent expense', async () => {
      const response = await request(app)
        .get('/api/expenses/9999')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Expense not found');
    });

    test('should handle invalid ID format gracefully', async () => {
      const response = await request(app)
        .get('/api/expenses/invalid-id')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('Data Consistency Tests', () => {
    test('should maintain data consistency across create and fetch operations', async () => {
      const testData = [
        { category: 'Food', amount: 50 },
        { category: 'Transport', amount: 30 },
        { category: 'Entertainment', amount: 25 }
      ];

      const createdIds = [];

      // Create all expenses
      for (const data of testData) {
        const response = await request(app)
          .post('/api/expenses')
          .send(data)
          .expect(201);

        createdIds.push(response.body.data.id);
      }

      // Verify all expenses can be fetched
      const allExpenses = await request(app)
        .get('/api/expenses')
        .expect(200);

      expect(allExpenses.body.count).toBe(testData.length);

      // Verify each expense
      for (let i = 0; i < createdIds.length; i++) {
        const response = await request(app)
          .get(`/api/expenses/${createdIds[i]}`)
          .expect(200);

        expect(response.body.data.category).toBe(testData[i].category);
        expect(response.body.data.amount).toBe(testData[i].amount);
      }
    });

    test('should preserve data between multiple API calls', async () => {
      // Create first expense
      const response1 = await request(app)
        .post('/api/expenses')
        .send({
          category: 'Category1',
          amount: 100
        })
        .expect(201);

      const id1 = response1.body.data.id;

      // Create second expense
      await request(app)
        .post('/api/expenses')
        .send({
          category: 'Category2',
          amount: 200
        })
        .expect(201);

      // Check if first expense still exists
      const checkResponse = await request(app)
        .get(`/api/expenses/${id1}`)
        .expect(200);

      expect(checkResponse.body.data.category).toBe('Category1');
      expect(checkResponse.body.data.amount).toBe(100);
    });
  });
});
