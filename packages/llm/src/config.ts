export const LLM_MODELS = {
  parse: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
  edit: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
} as const;
