# CI Pipeline Architecture

## Overview

This document describes the integration testing CI/CD pipeline for the Personal Finance Tracker application. The pipeline is built using GitHub Actions and automatically validates API functionality on every push and pull request.

## Pipeline Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Git Event Trigger                        │
│  (Push to main/develop branch or Pull Request created)    │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                 GitHub Actions Workflow                     │
│                 integration-tests.yml                       │
└────────────────────────────┬────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
         ┌──────────────┐         ┌──────────────┐
         │  Matrix: 16.x│         │  Matrix: 18.x│
         │   Node.js    │         │   Node.js    │
         └──────┬───────┘         └──────┬───────┘
                │                        │
                └────────────┬───────────┘
                             ▼
            ┌─────────────────────────────────┐
            │  1. Checkout Code              │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  2. Setup Node.js Environment  │
            │     - Cache npm dependencies   │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  3. Install Dependencies        │
            │     - npm ci (clean install)    │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  4. Prepare Test Environment   │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  5. Run Integration Tests       │
            │     - Dashboard API tests (8)   │
            │     - Expenses API tests (18)   │
            │     - Income API tests (18)     │
            │     - Total: 44 test cases      │
            │     - Generates coverage       │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  6. Verify Test Success        │
            │     - Fail if any test fails   │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  7. Generate Coverage Report   │
            │     - JSON format              │
            │     - LCOV format              │
            │     - HTML reports             │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  8. Upload Artifacts            │
            │     - Coverage reports         │
            │     - Test results             │
            │     - 30-day retention         │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  9. Lint Code (eslint)         │
            │     - Optional (if available)   │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  10. Generate Summary Report   │
            │      - Publish to GitHub       │
            └────────────┬────────────────────┘
                         ▼
            ┌─────────────────────────────────┐
            │  11. Send Notifications        │
            │      - Slack (optional)        │
            │      - Email (optional)        │
            └─────────────────────────────────┘
```

## Workflow Components

### 1. Trigger Events

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

**When CI runs**:
- Every push to `main` or `develop` branches
- Every pull request to `main` or `develop` branches

### 2. Matrix Strategy

```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x]
```

**Testing across versions**:
- Tests run on Node.js 16.x and 18.x
- Ensures compatibility with multiple environments
- Total of 2 parallel job instances

### 3. Job Steps

#### Step 1: Checkout Code
```yaml
- uses: actions/checkout@v3
```
- Pulls the latest code from the repository
- Makes code available to subsequent steps

#### Step 2: Setup Node.js
```yaml
- uses: actions/setup-node@v3
  with:
    node-version: ${{ matrix.node-version }}
    cache: 'npm'
```
- Installs specified Node.js version
- Caches npm packages for faster installation
- Improves workflow performance

#### Step 3: Install Dependencies
```bash
npm ci
```
- Clean install of dependencies
- Ensures reproducible builds (unlike `npm install`)
- Uses `package-lock.json` for exact versions

#### Step 4-5: Prepare & Run Tests
```bash
NODE_ENV=test npm run test:ci
```
- Sets test environment variable
- Runs integration tests with full coverage
- Timeout: 10 minutes per test run
- Generates coverage reports

#### Step 6: Verify Success
```bash
if: failure()
  run: exit 1
```
- Fails pipeline if any test fails
- Prevents broken code from being merged
- Required for pull request checks

#### Step 7-8: Collect & Upload Artifacts
```yaml
- uses: actions/upload-artifact@v3
  with:
    name: coverage-report-node-${{ matrix.node-version }}
    path: backend/coverage/
    retention-days: 30
```

**Artifacts collected**:
- Coverage reports (HTML, LCOV, JSON)
- Test results and logs
- Code quality reports

**Keeps artifacts for**: 30 days

#### Step 9: Publish Summary
- Creates GitHub Step Summary with key metrics
- Shows test results in PR comments
- Provides quick overview of pipeline status

## Test Execution Flow

```
┌─────────────────────────────────────────┐
│    Jest + Supertest Test Suite          │
└────────────┬────────────────────────────┘
             │
    ┌────────┴─────────┬─────────────────┐
    ▼                  ▼                  ▼
┌─────────────┐   ┌──────────────┐   ┌──────────────┐
│ Dashboard   │   │ Expenses API │   │  Income API  │
│ API Tests   │   │ Tests        │   │ Tests        │
│ (8 tests)   │   │ (18 tests)   │   │ (18 tests)   │
└─────┬───────┘   └──────┬───────┘   └──────┬───────┘
      │                  │                  │
      └──────────────────┼──────────────────┘
                         ▼
            ┌─────────────────────────────┐
            │    Coverage Collection      │
            │  - Function coverage        │
            │  - Branch coverage          │
            │  - Line coverage            │
            │  - Statement coverage       │
            └────────────┬────────────────┘
                         ▼
            ┌─────────────────────────────┐
            │   Test Results Report       │
            │  - Pass/Fail counts         │
            │  - Execution times          │
            │  - Error details            │
            └─────────────────────────────┘
```

## API Testing Strategy

### Request Flow

```
Test Case
    │
    ▼
Supertest (HTTP Client)
    │
    ├─ Method: POST/GET
    ├─ Path: /api/expenses
    ├─ Headers: Content-Type: application/json
    ├─ Body: {category: "Food", amount: 50}
    │
    ▼
Express Server (Running)
    │
    ├─ Middleware: JSON parsing
    ├─ Route handler
    ├─ Validation: Input checking
    ├─ Processing: Business logic
    ├─ Response: {success: true, data: {...}}
    │
    ▼
Jest Assertions
    │
    ├─ Status code check (201)
    ├─ Response body validation
    ├─ Data type verification
    ├─ Error message validation
    │
    ▼
Pass/Fail Result
```

### Data Isolation

Each test maintains clean state:

```
Test 1 Setup
    │
    ├─ Create test data
    │
    ▼
Test 1 Execution
    │
    ├─ API calls
    ├─ Assertions
    │
    ▼
Test 1 Cleanup
    │
    └─ Data cleared (no persistent state)
    
    ▼

Test 2 Setup (Clean State)
    │
    ├─ Fresh start, no Test 1 data
    │
    ▼
    ...
```

## Coverage Report Generation

```
Jest Coverage Reporters
    │
    ├─ text-summary
    │   └─ Console output summary
    │
    ├─ lcov (LCOV format)
    │   └─ Tools integration (IDE, web platforms)
    │
    ├─ html (HTML Report)
    │   └─ Interactive coverage visualization
    │   └─ Drill-down by file/function
    │
    ├─ json (JSON format)
    │   └─ Machine-readable coverage data
    │   └─ CI integration
    │
    └─ GitHub Summary
        └─ Display in Actions UI
```

## Failure Scenarios

### Pipeline Fails If:

1. **Test Fails**
   - Any of 44 test cases fails
   - Assertion error or unexpected behavior
   - Action: Block merge, show error details

2. **Dependency Installation Fails**
   - Missing or incompatible packages
   - Network issues
   - Action: Retry or investigate

3. **Code Checkout Fails**
   - Repository access issues
   - Branch doesn't exist
   - Action: Check permissions and branch

4. **Timeout**
   - Tests exceed 10-minute timeout
   - Infinite loop or hang
   - Action: Investigate performance

5. **Environment Setup Fails**
   - Node.js installation issues
   - Environment variable problems
   - Action: Check Node.js version compatibility

## Success Criteria

Pipeline passes when:

✅ All 44 integration tests pass  
✅ No timeout occurs (< 10 minutes)  
✅ Coverage reports are generated  
✅ No linting errors (if enabled)  
✅ Artifacts are successfully uploaded  

## Performance Optimization

### Cache Strategy
```
npm dependencies cached
    │
    ├─ Key: node-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
    ├─ Reduces installation time
    ├─ Typical save: 20-40 seconds
    └─ Hit rate: 80-90%
```

### Parallel Execution
```
Node 16.x tests
    ├─ Runs in parallel
    │
Node 18.x tests
    │
Both complete faster than sequential
```

### Test Timeout
```
Per test: 10 seconds (Jest testTimeout)
Per job: 10 minutes (GitHub Actions timeout-minutes)
```

## Security Considerations

1. **No Secrets Exposed**
   - Credentials not logged
   - API keys not stored in code
   - Environment variables secured

2. **Dependency Scanning**
   - Lock file validates exact versions
   - npm audit can be added
   - Regular updates recommended

3. **Branch Protection**
   ```
   main branch
       │
       └─ Require status checks
          │
          └─ All CI tests must pass
             │
             └─ Before merge allowed
   ```

## Monitoring & Alerts

### Workflow Insights
- View in Actions tab
- See duration, pass/fail rate
- Identify slow tests

### Metric Tracking
- Test execution time
- Pass rate percentage
- Coverage trends
- Artifact sizes

### Optional Integrations
- Slack notifications
- Email alerts
- Dashboard integration
- Custom webhooks

## Scaling the Pipeline

### Adding Job Types
```
integration-tests (current)
    ├─ Add: test:unit
    ├─ Add: test:e2e
    ├─ Add: test:security
    └─ Add: test:performance
```

### Adding Deployment Steps
```
Tests pass
    │
    ├─ Staging environment
    ├─ Test deployment
    ├─ Smoke tests
    └─ Production deployment
```

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Tests timeout | Slow tests | Optimize or increase timeout |
| Cache miss | Hash mismatch | Clear cache if lock file changes |
| Different results locally | Environment diff | Match test env variables |
| Artifact large | Coverage verbose | Exclude large files |
| Node version issues | Version mismatch | Update matrix versions |

## Best Practices

1. **Keep Pipeline Fast** (< 5 minutes ideal)
2. **Fail Fast** (stop on first error)
3. **Clear Artifacts** (remove old reports)
4. **Monitor Trends** (track test duration)
5. **Document Failures** (clear error messages)
6. **Test Everything** (high coverage target)
7. **Review Artifacts** (check coverage gaps)

## Related Documentation

- [Main README](./README.md) - Project overview
- [API Endpoints](./README.md#-api-endpoints) - Endpoint documentation
- [Test Coverage](./README.md#-integration-tests) - Test details
- [GitHub Actions Docs](https://docs.github.com/en/actions) - Official reference

---

**Last Updated**: February 2026  
**Workflow Version**: 1.0  
**Test Count**: 44 integration tests  
**Supported Node Versions**: 16.x, 18.x
