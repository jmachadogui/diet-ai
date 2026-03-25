import { AbacusAIProvider } from "./abacusai";
import type { LLMProvider } from "./provider";

export function createLLMProvider(): LLMProvider {
  const provider = process.env.LLM_PROVIDER ?? "abacusai";
  if (provider === "abacusai") {
    return new AbacusAIProvider();
  }
  throw new Error(`Unknown LLM_PROVIDER: "${provider}"`);
}
