# Personal Finance Tracker - Integration Testing CI Pipeline

A full-stack Personal Finance Tracker application with comprehensive integration testing and CI/CD pipeline using Jest, Supertest, and GitHub Actions.

## 📋 Overview

This project demonstrates a complete integration testing workflow for a Personal Finance Tracker API with REST endpoints for managing income, expenses, and viewing financial summaries. The CI pipeline automatically runs integration tests on every push and pull request.

## 🎯 Key Features

- **Backend REST APIs**:
  - Dashboard API: Retrieve financial summary and statistics
  - Expenses API: Create and manage expense records
  - Income API: Create and manage income records

- **Integration Testing**:
  - 40+ test cases covering all API endpoints
  - Data consistency validation
  - Error handling verification
  - Input validation testing

- **CI/CD Pipeline**:
  - Automated testing on GitHub Actions
  - Multi-node version testing (16.x, 18.x)
  - Coverage report generation and artifacts
  - Automatic pipeline failure on test errors

## 📁 Project Structure

```
.
├── .github
│   └── workflows
│       └── integration-tests.yml    # GitHub Actions CI configuration
├── backend
│   ├── src
│   │   ├── server.js              # Express server with API routes
│   │   └── modules/               # (Future: Modular business logic)
│   ├── jest.config.js             # Jest configuration
│   ├── package.json               # Backend dependencies and scripts
│   └── package-lock.json
├── tests
│   └── integration
│       ├── dashboard.integration.test.js    # Dashboard API tests
│       ├── expenses.integration.test.js     # Expenses API tests
│       └── income.integration.test.js       # Income API tests
├── frontend/                      # (Future: React dashboard)
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 16.x or higher
- **npm**: 7.x or higher
- **Git**: For version control

### Installation

1. **Clone and Navigate**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Verify Installation**:
   ```bash
   npm run test:watch
   ```

### Running the Application

**Start Development Server**:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

**Start Production Server**:
```bash
npm start
```

### Testing

**Run Integration Tests**:
```bash
npm test
```

**Run Tests in Watch Mode**:
```bash
npm run test:watch
```

**Generate Coverage Report**:
```bash
npm run test:coverage
```

**Run Tests as CI Would**:
```bash
npm run test:ci
```

## 🔌 API Endpoints

### Dashboard API

**Get Financial Summary**
```http
GET /api/dashboard
```

**Response**:
```json
{
  "success": true,
  "data": {
    "totalIncome": 6000.00,
    "totalExpenses": 1300.00,
    "balance": 4700.00,
    "expensesByCategory": {
      "Rent": 1000,
      "Groceries": 300
    },
    "incomeBySource": {
      "Salary": 5000,
      "Freelance": 1000
    },
    "transactionCount": 3
  }
}
```

### Expenses API

**Create Expense**
```http
POST /api/expenses
Content-Type: application/json

{
  "category": "Groceries",
  "amount": 50.75,
  "description": "Weekly shopping"
}
```

**Get All Expenses**
```http
GET /api/expenses
```

**Get Expense by ID**
```http
GET /api/expenses/:id
```

### Income API

**Create Income**
```http
POST /api/income
Content-Type: application/json

{
  "source": "Salary",
  "amount": 5000,
  "description": "Monthly salary"
}
```

**Get All Income**
```http
GET /api/income
```

**Get Income by ID**
```http
GET /api/income/:id
```

## 🧪 Integration Tests

### Test Coverage

The test suite includes **40+ test cases** organized into three main test files:

| Test Suite | Tests | Coverage |
|-----------|-------|----------|
| Dashboard API | 8 tests | GET endpoints, data aggregation, calculations |
| Expenses API | 18 tests | CRUD operations, validation, consistency |
| Income API | 18 tests | CRUD operations, validation, consistency |

### Example Test Cases

**Dashboard Tests**:
- ✓ Returns initial empty state
- ✓ Aggregates income and expenses correctly
- ✓ Calculates balance accurately
- ✓ Groups expenses by category
- ✓ Groups income by source

**Expenses Tests**:
- ✓ Creates expense with valid data
- ✓ Returns 400 for missing required fields
- ✓ Rejects negative amounts
- ✓ Generates unique IDs
- ✓ Maintains data consistency
- ✓ Handles decimal precision

**Income Tests**:
- ✓ Creates income with valid data
- ✓ Validates input fields
- ✓ Rejects invalid amounts
- ✓ Preserves data between calls
- ✓ Supports multiple entries from same source

## ⚙️ CI/CD Pipeline

### Workflow Steps

The GitHub Actions workflow (`integration-tests.yml`) performs:

1. **Checkout**: Pull the latest code
2. **Setup Node.js**: Configure Node.js environment (16.x, 18.x)
3. **Install Dependencies**: Install npm packages
4. **Run Integration Tests**: Execute full test suite
5. **Verify Success**: Ensure all tests pass (fails pipeline if not)
6. **Generate Coverage**: Create coverage reports
7. **Upload Artifacts**: Store coverage and test reports
8. **Publish Summary**: Display results in GitHub
9. **Lint Code**: Check code quality
10. **Notify Status**: Report overall pipeline status

### Running Locally as CI

```bash
NODE_ENV=test npm run test:ci
```

### Artifact Collection

The pipeline generates the following artifacts:

- **Coverage Reports**: HTML, LCOV, JSON formats
- **Test Results**: Detailed test execution logs
- **Summary**: GitHub Step Summary with key metrics

## 📊 Testing Approach

### Data Isolation

Each test runs with a clean state, ensuring tests don't interfere with each other.

### Integration vs Unit Tests

This suite focuses on **integration testing** because it:
- Tests APIs with real HTTP requests using Supertest
- Validates API contract and response format
- Checks data persistence and consistency
- Verifies backend modules work together

### Test Patterns Used

1. **Happy Path**: Valid inputs produce expected results
2. **Edge Cases**: Decimal precision, empty states, repeated categories
3. **Error Handling**: Missing fields, invalid types, out-of-range values
4. **Data Consistency**: Records persist and can be retrieved
5. **Aggregation**: Summary calculations are accurate

## 🔍 Error Handling

All APIs return consistent error responses:

```json
{
  "success": false,
  "error": "Descriptive error message"
}
```

**HTTP Status Codes**:
- `200 OK`: Successful GET request
- `201 Created`: Successful POST request
- `400 Bad Request`: Invalid input data
- `404 Not Found`: Resource not found
- `500 Internal Error`: Server error

## 🛠️ Development

### Adding New Tests

Create test files in `tests/integration/` following the naming pattern: `*.integration.test.js`

```javascript
describe('New API Integration Tests', () => {
  test('should do something', async () => {
    const response = await request(app)
      .get('/api/endpoint')
      .expect(200);
    
    expect(response.body).toHaveProperty('success', true);
  });
});
```

### Adding New Endpoints

1. Update `backend/src/server.js`
2. Add corresponding integration tests
3. Update this README with endpoint documentation

## 📦 Dependencies

### Production
- **express** (^4.18.2): Web framework
- **cors** (^2.8.5): Cross-Origin Resource Sharing

### Development
- **jest** (^29.7.0): Testing framework
- **supertest** (^6.3.3): HTTP assertion library
- **nodemon** (^3.0.1): Development server auto-reload
- **eslint** (^8.51.0): Code quality

## 📝 Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with auto-reload
npm test           # Run integration tests once
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate coverage report
npm run test:ci    # Run tests as CI pipeline would
npm run lint       # Run ESLint with auto-fix
```

## 🔒 Best Practices Implemented

✅ **Test Isolation**: Each test is independent  
✅ **Clear Naming**: Descriptive test and describe block names  
✅ **Comprehensive Coverage**: Happy path, edge cases, error handling  
✅ **Data Validation**: Input checking and error responses  
✅ **Documentation**: Clear comments and structure  
✅ **Pipeline Automation**: Automatic testing on code changes  
✅ **Artifacts**: Coverage reports saved for analysis  
✅ **Performance**: Tests run in ~5-10 seconds  

## 🐛 Debugging

### Enable Verbose Output

```bash
npm test -- --verbose
```

### Run Specific Test File

```bash
npm test -- dashboard.integration.test.js
```

### Run Specific Test Case

```bash
npm test -- --testNamePattern="should create a new expense"
```

## 📈 CI Pipeline Status

View pipeline status and artifacts:

1. Navigate to GitHub repository
2. Go to "Actions" tab
3. Select the latest workflow run
4. View logs and download artifacts

## 🎓 Learning Resources

This project demonstrates:

- **Integration Testing**: Testing APIs with real HTTP requests
- **Jest & Supertest**: Modern testing frameworks for Node.js
- **GitHub Actions**: CI/CD automation
- **REST API Design**: Proper endpoint structure and responses
- **Error Handling**: Graceful failure and validation
- **Data Consistency**: Ensuring data integrity
- **Test Reports**: Coverage and artifact generation

## 🚀 Future Enhancements

- [ ] Add authentication and authorization
- [ ] Implement database persistence (MongoDB/PostgreSQL)
- [ ] Add rate limiting and request validation middleware
- [ ] Create frontend React dashboard
- [ ] Add end-to-end testing with Cypress
- [ ] Implement API documentation with Swagger
- [ ] Add budget tracking and alerts
- [ ] Implement data export features (CSV, PDF)
- [ ] Add performance metrics and analytics

## 📄 License

This project is provided as-is for educational and training purposes.

## 🤝 Support

For issues or questions:
1. Check the error message in test output
2. Review test files for expected behavior
3. Consult API endpoint documentation above
4. Check GitHub Actions logs for pipeline details

---

**Last Updated**: February 2026  
**Status**: Active Development  
**Test Coverage**: 40+ Integration Tests
