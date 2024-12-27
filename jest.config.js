module.exports = {
    testEnvironment: 'jest-environment-jsdom', // Simulates a browser-like environment for React components
    transform: {
      "^.+\\.(ts|tsx)$": "babel-jest", // Use ts-jest for TypeScript files
      '^.+\\.jsx?$': 'babel-jest', // Use babel-jest for JavaScript files
    },
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup file for additional configurations
    testMatch: ['**/*.(test|spec).(js|jsx|ts|tsx)'], // Match test files
    moduleDirectories: ['node_modules', 'src'], // Resolve imports from 'src' and 'node_modules'
  };