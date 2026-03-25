import OpenAI from "openai";
import { AbacusAIProvider } from "../abacusai";

function makeMockClient(content: string | null) {
  return {
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content } }],
        }),
      },
    },
  } as unknown as OpenAI;
}

const VALID_PARSE_PAYLOAD = {
  intent: "log_meal",
  needs_clarification: false,
  clarification_question: null,
  meal_occasion: "lunch",
  consumed_at: null,
  items: [{ food_name: "chicken breast", quantity: 200, unit: "g" }],
};

const VALID_EDIT_PAYLOAD = {
  intent: "edit_meal",
  target_meal_id: null,
  target_occasion: "lunch",
  target_date: "today",
  operations: [{ type: "remove_item", item_ref: "chicken breast", new_quantity: null, new_unit: null, food_name: null }],
  needs_clarification: false,
  clarification_question: null,
};

describe("AbacusAIProvider.parseMessage", () => {
  it("returns a valid MealParseResult for a well-formed response", async () => {
    const provider = new AbacusAIProvider(makeMockClient(JSON.stringify(VALID_PARSE_PAYLOAD)));
    const result = await provider.parseMessage("200g chicken breast for lunch", "2026-03-25", "12:30");
    expect(result.intent).toBe("log_meal");
    expect(result.needs_clarification).toBe(false);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].food_name).toBe("chicken breast");
  });

  it("throws LLMParseError with 'Malformed JSON' for invalid JSON", async () => {
    const provider = new AbacusAIProvider(makeMockClient("not valid json {"));
    await expect(provider.parseMessage("test", "2026-03-25", "12:30"))
      .rejects.toMatchObject({ name: "LLMParseError", message: expect.stringContaining("Malformed JSON") });
  });

  it("throws LLMParseError with 'Schema mismatch' for valid JSON that fails schema", async () => {
    const provider = new AbacusAIProvider(makeMockClient(JSON.stringify({ foo: "bar" })));
    await expect(provider.parseMessage("test", "2026-03-25", "12:30"))
      .rejects.toMatchObject({ name: "LLMParseError", message: expect.stringContaining("Schema mismatch") });
  });

  it("returns needs_clarification: true with a populated clarification_question", async () => {
    const payload = {
      ...VALID_PARSE_PAYLOAD,
      needs_clarification: true,
      clarification_question: "Did you have fried or grilled chicken?",
    };
    const provider = new AbacusAIProvider(makeMockClient(JSON.stringify(payload)));
    const result = await provider.parseMessage("I had chicken", "2026-03-25", "12:30");
    expect(result.needs_clarification).toBe(true);
    expect(result.clarification_question).not.toBeNull();
  });

  it("throws LLMParseError when API returns null content", async () => {
    const provider = new AbacusAIProvider(makeMockClient(null));
    await expect(provider.parseMessage("test", "2026-03-25", "12:30"))
      .rejects.toMatchObject({ name: "LLMParseError" });
  });
});

describe("AbacusAIProvider.editMessage", () => {
  it("returns a valid EditInstruction for a well-formed response", async () => {
    const provider = new AbacusAIProvider(makeMockClient(JSON.stringify(VALID_EDIT_PAYLOAD)));
    const result = await provider.editMessage("remove chicken from lunch", "2026-03-25", []);
    expect(result.intent).toBe("edit_meal");
    expect(result.operations).toHaveLength(1);
  });

  it("throws LLMParseError with 'Malformed JSON' for invalid JSON", async () => {
    const provider = new AbacusAIProvider(makeMockClient("{ bad json"));
    await expect(provider.editMessage("test", "2026-03-25", []))
      .rejects.toMatchObject({ name: "LLMParseError", message: expect.stringContaining("Malformed JSON") });
  });

  it("throws LLMParseError with 'Schema mismatch' for empty operations array", async () => {
    const payload = { ...VALID_EDIT_PAYLOAD, operations: [] };
    const provider = new AbacusAIProvider(makeMockClient(JSON.stringify(payload)));
    await expect(provider.editMessage("test", "2026-03-25", []))
      .rejects.toMatchObject({ name: "LLMParseError", message: expect.stringContaining("Schema mismatch") });
  });
});
