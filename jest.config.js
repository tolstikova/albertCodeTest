const coverageDirectory = () => {
  if (process.env.CI_NODE_INDEX && process.env.CI_NODE_TOTAL) {
    return `<rootDir>/coverage-frontend/jest-${process.env.CI_NODE_INDEX}-${process.env.CI_NODE_TOTAL}`;
  }

  return '<rootDir>/coverage/';
};

module.exports = {
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '.npm',
    '<rootDir>/coverage/',
    '<rootDir>/ios/',
    '<rootDir>/android/',
  ],
  preset: 'react-native',
  transformIgnorePatterns: [
    '!node_modules/react-runtime',
  ],
  setupFiles: ['<rootDir>/jest/setup.js'],
  moduleNameMapper: {
    '\\.(css|jpg|png)$': '<rootDir>/stub.js',
  },
  coverageDirectory: coverageDirectory(),
  collectCoverageFrom: [
    '**/app/**/*.{js,jsx,ts,tsx}',
    'index.js',
    'index.app.js',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/lib/**',
    '!**/jest/**',
  ],
};
