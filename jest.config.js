module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/test/assetsTransformer.js',
    '^~/test/(.*)$': '<rootDir>/test/$1',
    '^~/storybook/(.*)$': '<rootDir>/storybook/$1',
    '^~/(.*)$': '<rootDir>/app/$1',
  },
  testMatch: ['**/*.test.(ts|tsx)'],
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coveragePathIgnorePatterns: ['<rootDir>/server.ts', '.schema.ts', 'index.ts'],
  globals: {
    __TEST__: true,
  },
};
