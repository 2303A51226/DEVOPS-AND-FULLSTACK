const request = require('supertest');
const { app } = require('../../src/server');

describe('Income API Integration Tests', () => {
  describe('POST /api/income', () => {
    test('should create a new income entry with valid data', async () => {
      const response = await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 5000,
          description: 'Monthly salary'
        })
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'Income created successfully');
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('source', 'Salary');
      expect(response.body.data).toHaveProperty('amount', 5000);
      expect(response.body.data).toHaveProperty('description', 'Monthly salary');
      expect(response.body.data).toHaveProperty('date');
    });

    test('should create income without description', async () => {
      const response = await request(app)
        .post('/api/income')
        .send({
          source: 'Freelance',
          amount: 1500
        })
        .expect(201);

      expect(response.body.data).toHaveProperty('source', 'Freelance');
      expect(response.body.data).toHaveProperty('amount', 1500);
      expect(response.body.data.description).toBe('');
    });

    test('should return 400 if source is missing', async () => {
      const response = await request(app)
        .post('/api/income')
        .send({
          amount: 5000,
          description: 'No source'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toMatch(/required/i);
    });

    test('should return 400 if amount is missing', async () => {
      const response = await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          description: 'No amount'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toMatch(/required/i);
    });

    test('should return 400 if amount is negative', async () => {
      const response = await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: -5000,
          description: 'Negative amount'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toMatch(/positive/i);
    });

    test('should return 400 if amount is zero', async () => {
      const response = await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 0,
          description: 'Zero amount'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toMatch(/positive/i);
    });

    test('should return 400 if amount is not a number', async () => {
      const response = await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 'five thousand',
          description: 'String amount'
        })
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });

    test('should generate unique IDs for income entries', async () => {
      const response1 = await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 5000
        })
        .expect(201);

      const response2 = await request(app)
        .post('/api/income')
        .send({
          source: 'Bonus',
          amount: 2000
        })
        .expect(201);

      expect(response1.body.data.id).not.toBe(response2.body.data.id);
    });

    test('should format amount to 2 decimal places', async () => {
      const response = await request(app)
        .post('/api/income')
        .send({
          source: 'Freelance',
          amount: 1500.999,
          description: 'Testing decimals'
        })
        .expect(201);

      expect(response.body.data.amount).toBe(1501);
    });

    test('should handle various income sources', async () => {
      const sources = ['Salary', 'Freelance', 'Investment', 'Bonus', 'Side Business'];

      for (const source of sources) {
        const response = await request(app)
          .post('/api/income')
          .send({
            source,
            amount: 1000
          })
          .expect(201);

        expect(response.body.data.source).toBe(source);
      }
    });
  });

  describe('GET /api/income', () => {
    test('should return empty array initially', async () => {
      const response = await request(app)
        .get('/api/income')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body).toHaveProperty('count');
    });

    test('should return all income entries after creation', async () => {
      // Create 3 income entries
      await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 5000
        })
        .expect(201);

      await request(app)
        .post('/api/income')
        .send({
          source: 'Freelance',
          amount: 1500
        })
        .expect(201);

      await request(app)
        .post('/api/income')
        .send({
          source: 'Investment',
          amount: 500
        })
        .expect(201);

      // Fetch all income
      const response = await request(app)
        .get('/api/income')
        .expect(200);

      expect(response.body.data.length).toBe(3);
      expect(response.body.count).toBe(3);
      expect(response.body.data[0]).toHaveProperty('source');
      expect(response.body.data[0]).toHaveProperty('amount');
      expect(response.body.data[0]).toHaveProperty('id');
    });

    test('should have proper response structure', async () => {
      const response = await request(app)
        .get('/api/income')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
    });

    test('should return all entries in order of creation', async () => {
      const entries = [
        { source: 'First', amount: 100 },
        { source: 'Second', amount: 200 },
        { source: 'Third', amount: 300 }
      ];

      for (const entry of entries) {
        await request(app)
          .post('/api/income')
          .send(entry)
          .expect(201);
      }

      const response = await request(app)
        .get('/api/income')
        .expect(200);

      expect(response.body.data[0].source).toBe('First');
      expect(response.body.data[1].source).toBe('Second');
      expect(response.body.data[2].source).toBe('Third');
    });
  });

  describe('GET /api/income/:id', () => {
    test('should return specific income entry by ID', async () => {
      // Create an income entry
      const createResponse = await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 5000,
          description: 'Monthly salary'
        })
        .expect(201);

      const incomeId = createResponse.body.data.id;

      // Fetch the income entry
      const response = await request(app)
        .get(`/api/income/${incomeId}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body.data).toHaveProperty('id', incomeId);
      expect(response.body.data).toHaveProperty('source', 'Salary');
      expect(response.body.data).toHaveProperty('amount', 5000);
    });

    test('should return 404 for non-existent income entry', async () => {
      const response = await request(app)
        .get('/api/income/9999')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Income not found');
    });

    test('should handle invalid ID format gracefully', async () => {
      const response = await request(app)
        .get('/api/income/invalid-id')
        .expect(404);

      expect(response.body).toHaveProperty('success', false);
    });
  });

  describe('Data Consistency Tests', () => {
    test('should maintain data consistency across create and fetch operations', async () => {
      const testData = [
        { source: 'Salary', amount: 5000 },
        { source: 'Freelance', amount: 1500 },
        { source: 'Investment', amount: 500 }
      ];

      const createdIds = [];

      // Create all income entries
      for (const data of testData) {
        const response = await request(app)
          .post('/api/income')
          .send(data)
          .expect(201);

        createdIds.push(response.body.data.id);
      }

      // Verify all entries can be fetched
      const allIncomes = await request(app)
        .get('/api/income')
        .expect(200);

      expect(allIncomes.body.count).toBe(testData.length);

      // Verify each entry
      for (let i = 0; i < createdIds.length; i++) {
        const response = await request(app)
          .get(`/api/income/${createdIds[i]}`)
          .expect(200);

        expect(response.body.data.source).toBe(testData[i].source);
        expect(response.body.data.amount).toBe(testData[i].amount);
      }
    });

    test('should preserve data between multiple API calls', async () => {
      // Create first income
      const response1 = await request(app)
        .post('/api/income')
        .send({
          source: 'Source1',
          amount: 1000
        })
        .expect(201);

      const id1 = response1.body.data.id;

      // Create second income
      await request(app)
        .post('/api/income')
        .send({
          source: 'Source2',
          amount: 2000
        })
        .expect(201);

      // Check if first entry still exists and is unchanged
      const checkResponse = await request(app)
        .get(`/api/income/${id1}`)
        .expect(200);

      expect(checkResponse.body.data.source).toBe('Source1');
      expect(checkResponse.body.data.amount).toBe(1000);
    });

    test('should support creating multiple income entries from same source', async () => {
      const response1 = await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 5000
        })
        .expect(201);

      const response2 = await request(app)
        .post('/api/income')
        .send({
          source: 'Salary',
          amount: 2500
        })
        .expect(201);

      // Verify both exist with different IDs
      expect(response1.body.data.id).not.toBe(response2.body.data.id);

      // Verify the get-all endpoint shows both
      const allIncome = await request(app)
        .get('/api/income')
        .expect(200);

      const salaryEntries = allIncome.body.data.filter(
        entry => entry.source === 'Salary'
      );
      expect(salaryEntries.length).toBeGreaterThanOrEqual(2);
    });
  });
});
