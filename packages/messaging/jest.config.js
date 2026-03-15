/** @type {import('jest').Config} */
module.exports = {
  displayName: "@diet-ai/messaging",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleNameMapper: {
    "^@diet-ai/shared$": "<rootDir>/../shared/src/index.ts",
  },
};
