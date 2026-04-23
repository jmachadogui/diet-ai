import { OpenAIProvider } from "./openai";
import type { LLMProvider } from "./provider";

export function createLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER ?? "openai";
  if (provider === "openai") {
    return new OpenAIProvider();
  }
  throw new Error(`Unknown LLM_PROVIDER: "${provider}"`);
}
