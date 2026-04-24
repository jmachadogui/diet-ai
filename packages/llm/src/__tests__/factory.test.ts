import { createLLMProvider } from "../factory";
import { OpenAIProvider } from "../openai";

describe("createLLMProvider", () => {
  const originalProvider = process.env.LLM_PROVIDER;
  const originalKey = process.env.OPENAI_API_KEY;

  beforeEach(() => {
    process.env.OPENAI_API_KEY = "test-key";
  });

  afterEach(() => {
    if (originalProvider === undefined) {
      delete process.env.LLM_PROVIDER;
    } else {
      process.env.LLM_PROVIDER = originalProvider;
    }
    if (originalKey === undefined) {
      delete process.env.OPENAI_API_KEY;
    } else {
      process.env.OPENAI_API_KEY = originalKey;
    }
  });

  it("returns an OpenAIProvider when LLM_PROVIDER is unset", () => {
    delete process.env.LLM_PROVIDER;
    expect(createLLMProvider()).toBeInstanceOf(OpenAIProvider);
  });

  it("returns an OpenAIProvider when LLM_PROVIDER=openai", () => {
    process.env.LLM_PROVIDER = "openai";
    expect(createLLMProvider()).toBeInstanceOf(OpenAIProvider);
  });

  it("throws for an unknown LLM_PROVIDER value", () => {
    process.env.LLM_PROVIDER = "unknown_provider";
    expect(() => createLLMProvider()).toThrow('Unknown LLM_PROVIDER: "unknown_provider"');
  });
});
