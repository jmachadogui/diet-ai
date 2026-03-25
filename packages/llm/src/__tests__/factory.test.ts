import { createLLMProvider } from "../factory";
import { AbacusAIProvider } from "../abacusai";

describe("createLLMProvider", () => {
  const originalProvider = process.env.LLM_PROVIDER;
  const originalKey = process.env.ABACUSAI_API_KEY;

  beforeEach(() => {
    process.env.ABACUSAI_API_KEY = "test-key";
  });

  afterEach(() => {
    if (originalProvider === undefined) {
      delete process.env.LLM_PROVIDER;
    } else {
      process.env.LLM_PROVIDER = originalProvider;
    }
    if (originalKey === undefined) {
      delete process.env.ABACUSAI_API_KEY;
    } else {
      process.env.ABACUSAI_API_KEY = originalKey;
    }
  });

  it("returns an AbacusAIProvider when LLM_PROVIDER is unset", () => {
    delete process.env.LLM_PROVIDER;
    expect(createLLMProvider()).toBeInstanceOf(AbacusAIProvider);
  });

  it("returns an AbacusAIProvider when LLM_PROVIDER=abacusai", () => {
    process.env.LLM_PROVIDER = "abacusai";
    expect(createLLMProvider()).toBeInstanceOf(AbacusAIProvider);
  });

  it("throws for an unknown LLM_PROVIDER value", () => {
    process.env.LLM_PROVIDER = "unknown_provider";
    expect(() => createLLMProvider()).toThrow('Unknown LLM_PROVIDER: "unknown_provider"');
  });
});
