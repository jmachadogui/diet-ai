import request from "supertest";
import jwt from "jsonwebtoken";

jest.mock("bcrypt", () => ({
  hash: jest.fn(async (_data: string, _rounds: number) => "$2b$10$mockedhash"),
  compare: jest.fn(async (_data: string, _hash: string) => true),
}));
jest.mock("@diet-ai/llm", () => ({ createLLMProvider: jest.fn(() => ({})) }));
jest.mock("@diet-ai/nutrition", () => ({ createNutritionProvider: jest.fn(() => ({})) }));
jest.mock("@diet-ai/messaging", () => ({
  createMessagingAdapters: jest.fn(() => [
    { registerWebhook: jest.fn(), onMessage: jest.fn(), platform: "telegram" },
  ]),
}));
jest.mock("bullmq", () => ({
  Queue: jest.fn().mockImplementation(() => ({ add: jest.fn() })),
  Worker: jest.fn().mockImplementation(() => ({ on: jest.fn() })),
}));
jest.mock("@diet-ai/db", () => ({
  prisma: {},
  createUser: jest.fn(),
  findUserByEmail: jest.fn(),
  findUserById: jest.fn(),
  updateUser: jest.fn(),
  recordWeight: jest.fn(),
  createToken: jest.fn(),
  findValidToken: jest.fn(),
  markTokenUsed: jest.fn(),
  upsertIdentity: jest.fn(),
}));
jest.mock("../queue/connection", () => ({
  redisConnection: { on: jest.fn() },
}));

process.env.JWT_SECRET = "test-secret";
process.env.TELEGRAM_BOT_NAME = "TestBot";

const { app } = require("../index");
const db = require("@diet-ai/db");

const validToken = jwt.sign({ sub: "user-1", email: "test@example.com" }, "test-secret");

const mockMagicLinkToken = {
  id: "token-id-1",
  userId: "user-1",
  platform: "telegram",
  token: "abc123def456",
  expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  usedAt: null,
  createdAt: new Date(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/v1/auth/magic-link/generate", () => {
  it("returns 200 with token and deep link URL for authenticated user", async () => {
    db.createToken.mockResolvedValue(mockMagicLinkToken);

    const res = await request(app)
      .post("/api/v1/auth/magic-link/generate")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ platform: "telegram" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.deepLinkUrl).toMatch(/^https:\/\/t\.me\/TestBot\?start=/);
    expect(db.createToken).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "user-1", platform: "telegram" })
    );
  });

  it("returns 401 when no JWT is provided", async () => {
    const res = await request(app)
      .post("/api/v1/auth/magic-link/generate")
      .send({ platform: "telegram" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("UNAUTHORIZED");
  });

  it("returns 400 when platform is missing", async () => {
    const res = await request(app)
      .post("/api/v1/auth/magic-link/generate")
      .set("Authorization", `Bearer ${validToken}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });

  it("returns 400 when platform is invalid", async () => {
    const res = await request(app)
      .post("/api/v1/auth/magic-link/generate")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ platform: "whatsapp" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });
});

describe("GET /api/v1/auth/magic-link/verify", () => {
  it("returns 200 and creates UserIdentity for a valid token", async () => {
    db.findValidToken.mockResolvedValue(mockMagicLinkToken);
    db.markTokenUsed.mockResolvedValue({ ...mockMagicLinkToken, usedAt: new Date() });
    db.upsertIdentity.mockResolvedValue({});

    const res = await request(app)
      .get("/api/v1/auth/magic-link/verify")
      .query({ token: "abc123def456", platformUserId: "tg-user-999" });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Account linked successfully");
    expect(db.findValidToken).toHaveBeenCalledWith("abc123def456");
    expect(db.markTokenUsed).toHaveBeenCalledWith("token-id-1");
    expect(db.upsertIdentity).toHaveBeenCalledWith(
      expect.objectContaining({
        platform: "telegram",
        platformUserId: "tg-user-999",
        userId: "user-1",
      })
    );
  });

  it("returns 400 for an unknown token", async () => {
    db.findValidToken.mockResolvedValue(null);

    const res = await request(app)
      .get("/api/v1/auth/magic-link/verify")
      .query({ token: "unknown-token", platformUserId: "tg-user-999" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
    expect(res.body.message).toMatch(/invalid|expired|used/i);
  });

  it("returns 400 for an expired token (findValidToken returns null)", async () => {
    db.findValidToken.mockResolvedValue(null);

    const res = await request(app)
      .get("/api/v1/auth/magic-link/verify")
      .query({ token: "expired-token", platformUserId: "tg-user-999" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });

  it("returns 400 for an already-used token (findValidToken returns null)", async () => {
    db.findValidToken.mockResolvedValue(null);

    const res = await request(app)
      .get("/api/v1/auth/magic-link/verify")
      .query({ token: "used-token", platformUserId: "tg-user-999" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });

  it("returns 400 when token query param is missing", async () => {
    const res = await request(app)
      .get("/api/v1/auth/magic-link/verify")
      .query({ platformUserId: "tg-user-999" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });

  it("returns 400 when platformUserId query param is missing", async () => {
    const res = await request(app)
      .get("/api/v1/auth/magic-link/verify")
      .query({ token: "abc123def456" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });

  it("does not call markTokenUsed or upsertIdentity when token is invalid", async () => {
    db.findValidToken.mockResolvedValue(null);

    await request(app)
      .get("/api/v1/auth/magic-link/verify")
      .query({ token: "bad-token", platformUserId: "tg-user-999" });

    expect(db.markTokenUsed).not.toHaveBeenCalled();
    expect(db.upsertIdentity).not.toHaveBeenCalled();
  });

  it("after linking, upsertIdentity is called with correct userId from token", async () => {
    const tokenForUser2 = { ...mockMagicLinkToken, userId: "user-2", id: "token-id-2" };
    db.findValidToken.mockResolvedValue(tokenForUser2);
    db.markTokenUsed.mockResolvedValue({});
    db.upsertIdentity.mockResolvedValue({});

    await request(app)
      .get("/api/v1/auth/magic-link/verify")
      .query({ token: "abc123def456", platformUserId: "tg-user-777" });

    expect(db.upsertIdentity).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "user-2", platformUserId: "tg-user-777" })
    );
  });
});
