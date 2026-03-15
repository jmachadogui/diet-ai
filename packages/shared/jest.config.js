/** @type {import('jest').Config} */
module.exports = {
  displayName: "@diet-ai/shared",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleNameMapper: {
    "^@diet-ai/shared$": "<rootDir>/src/index.ts",
  },
};
