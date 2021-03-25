module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  "coverageReporters": ["json", ["lcov", {"projectRoot": "./coverage"}], "text"],
  coverageThreshold: {
    "global": {
      "functions": 10,
      "lines": 10,
      "statements": 10
    }
  },
  moduleDirectories: [
    "node_modules",
  ],
  notify: true,
  notifyMode: "failure-change",
  preset: 'ts-jest',
  roots: [
    "test"
  ],
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  reporters: ['default'],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  verbose: true
};
