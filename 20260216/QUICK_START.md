# Quick Start Guide

## 5-Minute Setup

### 1. Prerequisites
```bash
# Check Node.js version
node --version    # Should be 16.x or higher

# Check npm version
npm --version     # Should be 7.x or higher
```

### 2. Navigate to Backend
```bash
cd backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Server
```bash
npm run dev
```

You should see:
```
Personal Finance Tracker API running on port 5000
```

### 5. In Another Terminal, Run Tests
```bash
cd backend
npm test
```

Tests will execute. Look for:
```
PASS  tests/integration/dashboard.integration.test.js
PASS  tests/integration/expenses.integration.test.js
PASS  tests/integration/income.integration.test.js

Tests:       44 passed, 44 total
```

## Testing the APIs

### Using cURL

**Create an Expense**:
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"category":"Food","amount":50,"description":"Lunch"}'
```

**Get All Expenses**:
```bash
curl http://localhost:5000/api/expenses
```

**Create Income**:
```bash
curl -X POST http://localhost:5000/api/income \
  -H "Content-Type: application/json" \
  -d '{"source":"Salary","amount":5000,"description":"Monthly"}'
```

**View Dashboard**:
```bash
curl http://localhost:5000/api/dashboard
```

### Using VS Code REST Client

1. Install "REST Client" extension
2. Create `test.rest` file:

```
### Get Health
GET http://localhost:5000/api/health

### Create Expense
POST http://localhost:5000/api/expenses
Content-Type: application/json

{
  "category": "Groceries",
  "amount": 75.50,
  "description": "Weekly shopping"
}

### Get All Expenses
GET http://localhost:5000/api/expenses

### Create Income
POST http://localhost:5000/api/income
Content-Type: application/json

{
  "source": "Salary",
  "amount": 5000.00,
  "description": "Monthly salary"
}

### Get Dashboard
GET http://localhost:5000/api/dashboard
```

3. Click "Send Request" on each block

## Common Tasks

### Run Tests Only (No Server Start)
```bash
npm test
```

### Watch Tests (Auto-rerun on file change)
```bash
npm run test:watch
```

### Check Test Coverage
```bash
npm run test:coverage
```
Open `coverage/lcov-report/index.html` in browser

### See Test Output Detailed
```bash
npm test -- --verbose
```

### Run Specific Test File
```bash
npm test -- expenses.integration.test.js
```

### Run Specific Test
```bash
npm test -- --testNamePattern="should create"
```

## File Structure Quick Reference

```
backend/
├── src/server.js              # Main Express server
├── jest.config.js             # Test configuration
├── package.json               # Dependencies & scripts
├── package-lock.json          # Locked versions

tests/
└── integration/
    ├── dashboard.integration.test.js     # Dashboard tests
    ├── expenses.integration.test.js      # Expenses tests
    └── income.integration.test.js        # Income tests

.github/
└── workflows/
    └── integration-tests.yml  # CI configuration
```

## Troubleshooting

### Port 5000 Already in Use
```bash
# Use different port
PORT=3000 npm run dev

# Or on Windows, find and kill the process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Tests Fail Immediately
```bash
# Make sure you're in backend directory
cd backend

# Clear npm cache
npm cache clean --force

# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Module Not Found Errors
```bash
# Make sure pathways are correct in test files
# Should start with "../../src/server" from tests directory

# Verify structure
ls src/server.js     # Should exist
```

## Next Steps

1. ✅ **Run locally**: `npm run dev` + `npm test`
2. 🔍 **Explore tests**: Open `tests/integration/` files
3. 📖 **Read docs**: Check `README.md` and `CI_PIPELINE_ARCHITECTURE.md`
4. 🚀 **Push to GitHub**: Trigger CI pipeline
5. 📊 **Check artifacts**: View coverage reports

## CI Pipeline Status

After pushing to GitHub:
1. Go to repository "Actions" tab
2. Click latest workflow run
3. View test results and download artifacts

## Getting Help

- **Test fails**: Check error message, look at test file
- **API not responding**: Server might not be running (`npm run dev`)
- **Port issues**: Check if another process using port 5000
- **Dependencies issues**: Try `npm cache clean --force` and reinstall

## Performance Tips

- Tests take ~5-10 seconds on first run
- Subsequent runs are faster with cache
- Keep `--detached` in terminal so tests run independently

---

**Ready to code? Start with**: `npm run dev` in one terminal, `npm test` in another!
