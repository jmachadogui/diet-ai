/** @type {import('jest').Config} */
module.exports = {
  displayName: "@diet-ai/api",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleNameMapper: {
    "^@diet-ai/shared$": "<rootDir>/../../packages/shared/src/index.ts",
    "^@diet-ai/db$": "<rootDir>/../../packages/db/src/index.ts",
    "^@diet-ai/llm$": "<rootDir>/../../packages/llm/src/index.ts",
    "^@diet-ai/nutrition$": "<rootDir>/../../packages/nutrition/src/index.ts",
    "^@diet-ai/messaging$": "<rootDir>/../../packages/messaging/src/index.ts",
  },
};
