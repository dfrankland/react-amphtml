module.exports = {
  setupFilesAfterEnv: ['./setupTest.js'],
  roots: [
    '<rootDir>/src/',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/amphtml/amphtml.js',
    '!<rootDir>/src/amphtml/codegen/**/*.js',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
