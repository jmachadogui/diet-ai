export const LLM_MODELS = {
  parse: process.env.ABACUSAI_PARSE_MODEL ?? "claude-sonnet-4-5",
  edit:  process.env.ABACUSAI_EDIT_MODEL  ?? "claude-sonnet-4-5",
} as const;
