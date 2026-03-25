import { buildParseSystemPrompt } from "../prompts/parse";
import { buildEditSystemPrompt } from "../prompts/edit";

describe("buildParseSystemPrompt", () => {
  it("injects TODAY_ISO and USER_TIME, leaving no placeholders", () => {
    const result = buildParseSystemPrompt("2026-03-25", "12:30");
    expect(result).toContain("2026-03-25");
    expect(result).toContain("12:30");
    expect(result).not.toContain("{{TODAY_ISO}}");
    expect(result).not.toContain("{{USER_TIME}}");
  });
});

describe("buildEditSystemPrompt", () => {
  it("injects TODAY_ISO and serialised mealsContext, leaving no placeholders", () => {
    const meals = [
      {
        id: "abc",
        occasion: "lunch",
        consumed_at: null,
        items: [{ id: "i1", food_name: "rice", quantity: 100, unit: "g" }],
      },
    ];
    const result = buildEditSystemPrompt("2026-03-25", meals);
    expect(result).toContain("2026-03-25");
    expect(result).not.toContain("{{TODAY_ISO}}");
    expect(result).not.toContain("{{MEALS_CONTEXT}}");
    expect(result).toContain(JSON.stringify(meals, null, 2));
  });
});
