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
}));
jest.mock("../queue/connection", () => ({
  redisConnection: { on: jest.fn() },
}));

process.env.JWT_SECRET = "test-secret";

const { app } = require("../index");
const db = require("@diet-ai/db");
const bcrypt = require("bcrypt");

const mockUser = {
  id: "user-1",
  email: "test@example.com",
  passwordHash: "$2b$10$mockedhash",
  age: 30,
  sex: "male",
  heightCm: 180,
  weightKg: 80,
  activityLevel: "moderate",
  dailyCalorieGoal: 2200,
  createdAt: new Date("2026-01-01"),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/v1/auth/register", () => {
  it("creates a user and returns 201 with token and user", async () => {
    db.findUserByEmail.mockResolvedValue(null);
    db.createUser.mockResolvedValue(mockUser);

    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.id).toBe("user-1");
    expect(res.body.user.email).toBe("test@example.com");
    expect(res.body.user.passwordHash).toBeUndefined();
  });

  it("stores password as bcrypt hash, never plaintext", async () => {
    db.findUserByEmail.mockResolvedValue(null);
    db.createUser.mockImplementation(async (data: any) => ({ ...mockUser, passwordHash: data.passwordHash }));

    await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "test@example.com", password: "password123" });

    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    const callArg = db.createUser.mock.calls[0][0];
    expect(callArg.passwordHash).not.toBe("password123");
    expect(callArg.password).toBeUndefined();
  });

  it("returns 409 when email is already registered", async () => {
    db.findUserByEmail.mockResolvedValue(mockUser);

    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.status).toBe(409);
    expect(res.body.error).toBe("CONFLICT");
  });

  it("returns 400 when email is missing", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ password: "password123" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });

  it("returns 400 when password is too short", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "test@example.com", password: "short" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });

  it("returns 400 when email is invalid", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ email: "not-an-email", password: "password123" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });
});

describe("POST /api/v1/auth/login", () => {
  it("returns 200 with token for correct credentials", async () => {
    db.findUserByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();

    const decoded = jwt.verify(res.body.token, "test-secret") as any;
    expect(decoded.sub).toBe("user-1");
    expect(decoded.email).toBe("test@example.com");
  });

  it("returns 401 for wrong password", async () => {
    db.findUserByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("UNAUTHORIZED");
  });

  it("returns 401 for unknown email", async () => {
    db.findUserByEmail.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "unknown@example.com", password: "password123" });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe("UNAUTHORIZED");
  });

  it("returns 400 for missing email", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ password: "password123" });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("BAD_REQUEST");
  });
});

describe("GET /api/v1/users/me", () => {
  const validToken = jwt.sign({ sub: "user-1", email: "test@example.com" }, "test-secret");

  it("returns 200 with user profile for valid JWT", async () => {
    db.findUserById.mockResolvedValue(mockUser);

    const res = await request(app)
      .get("/api/v1/users/me")
      .set("Authorization", `Bearer ${validToken}`);

    expect(res.status).toBe(200);
    expect(res.body.user.id).toBe("user-1");
    expect(res.body.user.email).toBe("test@example.com");
    expect(res.body.user.passwordHash).toBeUndefined();
  });

  it("returns 401 with no JWT", async () => {
    const res = await request(app).get("/api/v1/users/me");
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("UNAUTHORIZED");
  });

  it("returns 401 with invalid JWT", async () => {
    const res = await request(app)
      .get("/api/v1/users/me")
      .set("Authorization", "Bearer invalid-token");
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("UNAUTHORIZED");
  });
});

describe("PATCH /api/v1/users/me", () => {
  const validToken = jwt.sign({ sub: "user-1", email: "test@example.com" }, "test-secret");

  it("returns 200 with updated user profile", async () => {
    const updatedUser = { ...mockUser, dailyCalorieGoal: 2500 };
    db.findUserById.mockResolvedValue(mockUser);
    db.updateUser.mockResolvedValue(updatedUser);

    const res = await request(app)
      .patch("/api/v1/users/me")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ dailyCalorieGoal: 2500 });

    expect(res.status).toBe(200);
    expect(res.body.user.dailyCalorieGoal).toBe(2500);
    expect(res.body.user.passwordHash).toBeUndefined();
  });

  it("calls recordWeight and writes UserWeightHistory when weightKg changes", async () => {
    const updatedUser = { ...mockUser, weightKg: 75 };
    db.findUserById.mockResolvedValue(mockUser);
    db.recordWeight.mockResolvedValue({});
    db.updateUser.mockResolvedValue(updatedUser);

    const res = await request(app)
      .patch("/api/v1/users/me")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ weightKg: 75 });

    expect(res.status).toBe(200);
    expect(db.recordWeight).toHaveBeenCalledWith("user-1", 75, "web");
    expect(res.body.user.weightKg).toBe(75);
  });

  it("does not call recordWeight when weightKg is not in the payload", async () => {
    db.findUserById.mockResolvedValue(mockUser);
    db.updateUser.mockResolvedValue({ ...mockUser, dailyCalorieGoal: 2000 });

    await request(app)
      .patch("/api/v1/users/me")
      .set("Authorization", `Bearer ${validToken}`)
      .send({ dailyCalorieGoal: 2000 });

    expect(db.recordWeight).not.toHaveBeenCalled();
  });

  it("returns 401 with no JWT", async () => {
    const res = await request(app).patch("/api/v1/users/me").send({ dailyCalorieGoal: 2000 });
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("UNAUTHORIZED");
  });
});
