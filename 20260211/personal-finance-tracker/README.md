# Personal Finance Tracker

[![CI Pipeline](https://github.com/your-username/personal-finance-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/personal-finance-tracker/actions/workflows/ci.yml)

A robust personal finance tracking application built with Node.js and Express.

## Features

- **Dashboard**: View financial summary with total income, expenses, balance, and savings rate
- **Expense Tracking**: Add, delete, and categorize expenses
- **Income Tracking**: Manage multiple income sources
- **Comprehensive Testing**: Full unit test coverage for all modules
- **CI/CD Pipeline**: Automated testing and building with GitHub Actions

## Project Structure

```
personal-finance-tracker/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI configuration
├── src/
│   ├── modules/
│   │   ├── dashboard/
│   │   │   └── Dashboard.js    # Dashboard module
│   │   ├── expenses/
│   │   │   └── Expenses.js     # Expenses module
│   │   └── income/
│   │       └── Income.js       # Income module
│   └── server.js               # Express server setup
├── tests/
│   ├── Dashboard.test.js        # Dashboard tests
│   ├── Expenses.test.js         # Expenses tests
│   └── Income.test.js           # Income tests
├── jest.config.js              # Jest configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Installation

```bash
npm install
```

## Running Tests

Run all tests with coverage:
```bash
npm test
```

Watch mode (re-run tests on file changes):
```bash
npm run test:watch
```

## Building

Build the application:
```bash
npm run build
```

## Starting the Server

Start the development server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Dashboard
- `GET /api/dashboard` - Get financial summary

### Expenses
- `POST /api/expenses` - Add new expense
  - Body: `{ category: string, amount: number, description?: string }`
- `GET /api/expenses` - Get all expenses

### Income
- `POST /api/income` - Add new income
  - Body: `{ source: string, amount: number, description?: string }`
- `GET /api/income` - Get all income entries

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration. The pipeline automatically:

1. **Triggers on**: 
   - Push to main/develop branches
   - Pull requests to main/develop branches

2. **Runs on**: Ubuntu latest with Node.js 16.x and 18.x

3. **Steps**:
   - Checkout code
   - Set up Node.js
   - Install dependencies (`npm install`)
   - Run tests (`npm test`)
   - Build application (`npm run build`)
   - Upload coverage reports

4. **Failure Handling**: The pipeline **fails if any test fails**, ensuring quality code is always deployed.

## Test Coverage

The project includes comprehensive unit tests:

### Dashboard Test Suite
- ✅ Initialize with zero balance
- ✅ Calculate balance correctly
- ✅ Return summary with financial data
- ✅ Calculate savings rate
- ✅ Handle zero income gracefully
- ✅ Calculate net worth

### Expenses Test Suite
- ✅ Initialize with empty list
- ✅ Add new expense
- ✅ Validate expense amounts (> 0)
- ✅ Require category
- ✅ Delete expenses
- ✅ Calculate total expenses
- ✅ Filter by category
- ✅ Assign unique IDs

### Income Test Suite
- ✅ Initialize with empty list
- ✅ Add new income
- ✅ Validate income amounts (> 0)
- ✅ Require source
- ✅ Delete income
- ✅ Calculate total income
- ✅ Filter by source
- ✅ Assign unique IDs
- ✅ Include date in records

## Dependencies

### Production
- `express`: Web framework for Node.js

### Development
- `jest`: Testing framework

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Note**: The CI badge link should be updated with your actual GitHub username and repository name.
