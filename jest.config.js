const patternLibModules = 'node_modules/toom-ui-pattern-library/node_modules/';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  }
};
