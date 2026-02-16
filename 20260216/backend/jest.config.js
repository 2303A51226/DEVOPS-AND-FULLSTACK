module.exports = {
  testEnvironment: 'node',
  collectCoverageFom: ['src/**/*.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/__tests__/**/*.js', '**/*.test.js'],
  verbose: true,
  testTimeout: 10000,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  coverageReporters: ['text', 'text-summary', 'json', 'lcov', 'html']
};
