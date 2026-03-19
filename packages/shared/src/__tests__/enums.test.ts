import { PlatformEnum, MealOccasionEnum, IntentEnum } from "../enums";

describe("PlatformEnum", () => {
  it("accepts valid platforms", () => {
    expect(PlatformEnum.safeParse("telegram").success).toBe(true);
    expect(PlatformEnum.safeParse("whatsapp").success).toBe(true);
    expect(PlatformEnum.safeParse("discord").success).toBe(true);
  });

  it("rejects invalid platform", () => {
    expect(PlatformEnum.safeParse("sms").success).toBe(false);
    expect(PlatformEnum.safeParse("").success).toBe(false);
  });
});

describe("MealOccasionEnum", () => {
  it("accepts valid occasions", () => {
    expect(MealOccasionEnum.safeParse("breakfast").success).toBe(true);
    expect(MealOccasionEnum.safeParse("lunch").success).toBe(true);
    expect(MealOccasionEnum.safeParse("dinner").success).toBe(true);
    expect(MealOccasionEnum.safeParse("snack").success).toBe(true);
    expect(MealOccasionEnum.safeParse("unknown").success).toBe(true);
  });

  it("rejects invalid occasion", () => {
    expect(MealOccasionEnum.safeParse("brunch").success).toBe(false);
    expect(MealOccasionEnum.safeParse("supper").success).toBe(false);
  });
});

describe("IntentEnum", () => {
  it("accepts valid intents", () => {
    expect(IntentEnum.safeParse("log_meal").success).toBe(true);
    expect(IntentEnum.safeParse("edit_meal").success).toBe(true);
    expect(IntentEnum.safeParse("summary").success).toBe(true);
    expect(IntentEnum.safeParse("other").success).toBe(true);
  });

  it("rejects invalid intent", () => {
    expect(IntentEnum.safeParse("delete").success).toBe(false);
    expect(IntentEnum.safeParse("query").success).toBe(false);
  });
});
