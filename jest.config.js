/** @type {import('jest').Config} */
module.exports = {
  projects: [
    "<rootDir>/packages/shared",
    "<rootDir>/packages/db",
    "<rootDir>/packages/llm",
    "<rootDir>/packages/nutrition",
    "<rootDir>/packages/messaging",
    "<rootDir>/apps/api",
  ],
};
