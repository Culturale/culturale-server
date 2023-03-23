module.exports = {
  preset: "ts-jest",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleNameMapper: {
    "~/(.*)": "<rootDir>/src/$1",
  },
  testMatch: ["**/*.test.(ts|tsx)"],
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  coveragePathIgnorePatterns: ["<rootDir>/server.ts", ".schema.ts", "index.ts"],
  globals: {
    __TEST__: true,
  },
  setupFiles: ["<rootDir>/test/setup-tests.ts"],
};
