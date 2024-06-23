/**
 * @typedef {import("jest").Config}
 */
module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testMatch: ['**/__tests__/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '.*\\.d\\.ts$'],
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageReporters: ['lcov', 'json', 'json-summary'],
};
