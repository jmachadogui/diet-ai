import type { Job } from "bullmq";
import type { MessageProcessJob } from "../workers/messageProcessor";

const mockFindIdentity = jest.fn();
const mockFindLogsByUser = jest.fn();
const mockCreateLog = jest.fn();
const mockUpdateLog = jest.fn();
const mockCreateMealWithItems = jest.fn();
const mockFindMealsByDay = jest.fn();
const mockFindUserById = jest.fn();

jest.mock("@diet-ai/db", () => ({
  prisma: {},
  findIdentity: (...args: unknown[]) => mockFindIdentity(...args),
  findLogsByUser: (...args: unknown[]) => mockFindLogsByUser(...args),
  createLog: (...args: unknown[]) => mockCreateLog(...args),
  updateLog: (...args: unknown[]) => mockUpdateLog(...args),
  createMealWithItems: (...args: unknown[]) => mockCreateMealWithItems(...args),
  findMealsByDay: (...args: unknown[]) => mockFindMealsByDay(...args),
  findUserById: (...args: unknown[]) => mockFindUserById(...args),
}));

const mockParseMessage = jest.fn();
const mockLLMProvider = { parseMessage: mockParseMessage };

const mockLookup = jest.fn();
const mockNutritionProvider = { lookup: mockLookup, vendorName: "fatsecret" };

const mockSendMessage = jest.fn();
const mockMessagingAdapter = {
  platform: "telegram",
  sendMessage: mockSendMessage,
  registerWebhook: jest.fn(),
  onMessage: jest.fn(),
};

const mockRedisGet = jest.fn();
const mockRedisSet = jest.fn();
const mockRedisDel = jest.fn();
const mockRedisExists = jest.fn();
const mockRedis = {
  get: mockRedisGet,
  set: mockRedisSet,
  del: mockRedisDel,
  exists: mockRedisExists,
};

import { processMessage } from "../workers/messageProcessor";
import { NutritionAPIError } from "@diet-ai/nutrition";

function makeJob(data: Partial<MessageProcessJob> = {}): Job<MessageProcessJob> {
  return {
    data: {
      rawText: "I had 200g grilled chicken and a banana for lunch",
      platform: "telegram",
      platformUserId: "tg-user-1",
      platformMessageId: "msg-1",
      messageTimestamp: new Date("2026-03-28T12:00:00.000Z").toISOString(),
      ...data,
    },
  } as Job<MessageProcessJob>;
}

const mockIdentity = { userId: "user-uuid-1", platform: "telegram", platformUserId: "tg-user-1" };

const mockLLMResult = {
  intent: "log_meal",
  needs_clarification: false,
  clarification_question: null,
  meal_occasion: "lunch",
  consumed_at: null,
  items: [
    { food_name: "grilled chicken", quantity: 200, unit: "g" },
    { food_name: "banana", quantity: 1, unit: "unit" },
  ],
};

const mockChickenNutrition = {
  food_name: "grilled chicken",
  api_ref_id: "ref-chicken",
  calories: 330,
  protein_g: 62,
  carbs_g: 0,
  fat_g: 7.2,
  api_response_snapshot: {},
  resolution_confidence: "high",
};

const mockBananaNutrition = {
  food_name: "banana",
  api_ref_id: "ref-banana",
  calories: 89,
  protein_g: 1.1,
  carbs_g: 23,
  fat_g: 0.3,
  api_response_snapshot: {},
  resolution_confidence: "high",
};

const mockLog = { id: "log-uuid-1", processingStatus: "processing", clarificationPrompt: null };

const mockMeal = {
  id: "meal-uuid-1",
  totalCalories: 419,
  totalProteinG: 63.1,
  totalCarbsG: 23,
  totalFatG: 7.5,
};

beforeEach(() => {
  jest.clearAllMocks();
  mockFindLogsByUser.mockResolvedValue([]);
  mockRedisExists.mockResolvedValue(0);
  mockRedisGet.mockResolvedValue(null);
});

describe("processMessage — happy path (meal log)", () => {
  it("creates Log, Meal, MealItems and sends reply", async () => {
    mockFindIdentity.mockResolvedValue(mockIdentity);
    mockCreateLog.mockResolvedValue(mockLog);
    mockUpdateLog.mockResolvedValue({ ...mockLog, processingStatus: "success" });
    mockParseMessage.mockResolvedValue(mockLLMResult);
    mockLookup
      .mockResolvedValueOnce(mockChickenNutrition)
      .mockResolvedValueOnce(mockBananaNutrition);
    mockCreateMealWithItems.mockResolvedValue({
      meal: mockMeal,
      items: [
        { id: "item-1", foodName: "grilled chicken" },
        { id: "item-2", foodName: "banana" },
      ],
    });

    await processMessage(
      makeJob(),
      [mockMessagingAdapter as any],
      mockLLMProvider as any,
      mockNutritionProvider as any,
      mockRedis as any
    );

    expect(mockCreateLog).toHaveBeenCalledWith(
      expect.objectContaining({
        processingStatus: "processing",
        rawText: "I had 200g grilled chicken and a banana for lunch",
      })
    );

    expect(mockLookup).toHaveBeenCalledTimes(2);
    expect(mockLookup).toHaveBeenCalledWith({ food_name: "grilled chicken", quantity: 200, unit: "g" });
    expect(mockLookup).toHaveBeenCalledWith({ food_name: "banana", quantity: 1, unit: "unit" });

    expect(mockCreateMealWithItems).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "user-uuid-1",
        sourceLogId: "log-uuid-1",
        occasion: "lunch",
      }),
      expect.arrayContaining([
        expect.objectContaining({ foodName: "grilled chicken", calories: 330 }),
        expect.objectContaining({ foodName: "banana", calories: 89 }),
      ])
    );

    expect(mockUpdateLog).toHaveBeenCalledWith(
      "log-uuid-1",
      expect.objectContaining({ processingStatus: "success", intent: "log_meal" })
    );

    expect(mockSendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        platformUserId: "tg-user-1",
        platform: "telegram",
        text: expect.stringContaining("Logged:"),
      })
    );
    expect(mockSendMessage.mock.calls[0][0].text).toContain("419");
  });
});

describe("processMessage — unlinked user", () => {
  it("sends account linking message and does not create a Log", async () => {
    mockFindIdentity.mockResolvedValue(null);

    await processMessage(
      makeJob(),
      [mockMessagingAdapter as any],
      mockLLMProvider as any,
      mockNutritionProvider as any,
      mockRedis as any
    );

    expect(mockCreateLog).not.toHaveBeenCalled();
    expect(mockSendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining("not linked"),
      })
    );
  });
});

describe("processMessage — nutrition API failure", () => {
  it("marks Log as failed and sends error reply; no Meal created", async () => {
    mockFindIdentity.mockResolvedValue(mockIdentity);
    mockCreateLog.mockResolvedValue(mockLog);
    mockUpdateLog.mockResolvedValue({});
    mockParseMessage.mockResolvedValue(mockLLMResult);
    mockLookup.mockRejectedValue(new NutritionAPIError("FatSecret unreachable"));

    await processMessage(
      makeJob(),
      [mockMessagingAdapter as any],
      mockLLMProvider as any,
      mockNutritionProvider as any,
      mockRedis as any
    );

    expect(mockCreateMealWithItems).not.toHaveBeenCalled();
    expect(mockUpdateLog).toHaveBeenCalledWith(
      "log-uuid-1",
      expect.objectContaining({ processingStatus: "failed", errorCode: "NUTRITION_API_ERROR" })
    );
    expect(mockSendMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining("Unable to fetch nutrition data"),
      })
    );
  });
});

describe("processMessage — clarification flow", () => {
  it("first message: sends clarification question, sets Redis key, no Meal created", async () => {
    const clarificationResult = {
      intent: "log_meal",
      needs_clarification: true,
      clarification_question: "What type of cereal did you have?",
      meal_occasion: "breakfast",
      consumed_at: null,
      items: [{ food_name: "cereal", quantity: 1, unit: "serving" }],
    };

    mockFindIdentity.mockResolvedValue(mockIdentity);
    mockCreateLog.mockResolvedValue(mockLog);
    mockUpdateLog.mockResolvedValue({});
    mockParseMessage.mockResolvedValue(clarificationResult);

    await processMessage(
      makeJob({ rawText: "I had cereal for breakfast" }),
      [mockMessagingAdapter as any],
      mockLLMProvider as any,
      mockNutritionProvider as any,
      mockRedis as any
    );

    expect(mockRedisSet).toHaveBeenCalledWith(
      "clarification:user-uuid-1",
      expect.stringContaining("What type of cereal"),
      "EX",
      300
    );
    expect(mockUpdateLog).toHaveBeenCalledWith(
      "log-uuid-1",
      expect.objectContaining({ clarificationPrompt: "What type of cereal did you have?" })
    );
    expect(mockSendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ text: "What type of cereal did you have?" })
    );
    expect(mockCreateMealWithItems).not.toHaveBeenCalled();
  });

  it("second message: resolves clarification, deletes Redis key, creates Meal", async () => {
    const storedClarification = JSON.stringify({
      logId: "log-uuid-0",
      originalText: "I had cereal for breakfast",
      question: "What type of cereal did you have?",
    });

    mockRedisExists.mockResolvedValue(1);
    mockRedisGet.mockResolvedValue(storedClarification);
    mockRedisDel.mockResolvedValue(1);

    mockFindIdentity.mockResolvedValue(mockIdentity);
    mockCreateLog.mockResolvedValue({ ...mockLog, id: "log-uuid-2" });
    mockUpdateLog.mockResolvedValue({});
    mockParseMessage.mockResolvedValue({
      ...mockLLMResult,
      items: [{ food_name: "oatmeal", quantity: 1, unit: "serving" }],
      meal_occasion: "breakfast",
    });
    mockLookup.mockResolvedValue({
      food_name: "oatmeal",
      api_ref_id: "ref-oatmeal",
      calories: 150,
      protein_g: 5,
      carbs_g: 27,
      fat_g: 3,
      api_response_snapshot: {},
      resolution_confidence: "high",
    });
    mockCreateMealWithItems.mockResolvedValue({
      meal: { id: "meal-uuid-2", totalCalories: 150, totalProteinG: 5, totalCarbsG: 27, totalFatG: 3 },
      items: [{ id: "item-3", foodName: "oatmeal" }],
    });

    await processMessage(
      makeJob({ rawText: "Oatmeal" }),
      [mockMessagingAdapter as any],
      mockLLMProvider as any,
      mockNutritionProvider as any,
      mockRedis as any
    );

    expect(mockRedisDel).toHaveBeenCalledWith("clarification:user-uuid-1");
    expect(mockUpdateLog).toHaveBeenCalledWith(
      "log-uuid-0",
      expect.objectContaining({ clarificationResponse: "Oatmeal" })
    );
    expect(mockCreateMealWithItems).toHaveBeenCalled();
    expect(mockSendMessage).toHaveBeenCalledWith(
      expect.objectContaining({ text: expect.stringContaining("Logged:") })
    );
  });
});
