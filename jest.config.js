const pack = require('./package.json');

module.exports = {
  coveragePathIgnorePatterns: ['node_modules', 'build'],
  coverageReporters: ['json', 'text', 'html'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  verbose: true,
  moduleFileExtensions: ['js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build'],
  resetModules: false,
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  roots: ['<rootDir>/src'],
  displayName: pack.name,
  name: pack.name,
};
