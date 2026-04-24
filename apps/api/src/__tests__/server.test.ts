import request from "supertest";
import jwt from "jsonwebtoken";

jest.mock("bcryptjs", () => ({
  hash: jest.fn(async () => "$2b$10$mockedhash"),
  compare: jest.fn(async () => true),
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
jest.mock("@diet-ai/db", () => ({ prisma: {} }));
jest.mock("../queue/connection", () => ({
  redisConnection: { on: jest.fn() },
}));

process.env.JWT_SECRET = "test-secret";

const { app } = require("../index");

describe("GET /health", () => {
  it("returns 200 { status: ok }", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("Route stubs return 501", () => {
  const validToken = jwt.sign({ sub: "user-1", email: "a@b.com" }, "test-secret");
  const authHeader = `Bearer ${validToken}`;

  const publicStubs: Array<[string, string]> = [];

  const protectedStubs: Array<[string, string]> = [
    ["get", "/api/v1/meals"],
    ["get", "/api/v1/meals/some-id"],
    ["patch", "/api/v1/meals/some-id/items/some-item"],
    ["delete", "/api/v1/meals/some-id/items/some-item"],
    ["delete", "/api/v1/meals/some-id"],
    ["get", "/api/v1/logs"],
  ];

  for (const [method, path] of publicStubs) {
    it(`${method.toUpperCase()} ${path} → 501`, async () => {
      const res = await (request(app) as any)[method](path);
      expect(res.status).toBe(501);
      expect(res.body.error).toBe("NOT_IMPLEMENTED");
    });
  }

  for (const [method, path] of protectedStubs) {
    it(`${method.toUpperCase()} ${path} with valid JWT → 501`, async () => {
      const res = await (request(app) as any)[method](path).set("Authorization", authHeader);
      expect(res.status).toBe(501);
      expect(res.body.error).toBe("NOT_IMPLEMENTED");
    });
  }
});

describe("Protected routes without JWT → 401", () => {
  const protectedRoutes: Array<[string, string]> = [
    ["get", "/api/v1/users/me"],
    ["get", "/api/v1/meals"],
    ["get", "/api/v1/logs"],
  ];

  for (const [method, path] of protectedRoutes) {
    it(`${method.toUpperCase()} ${path} with no Authorization → 401`, async () => {
      const res = await (request(app) as any)[method](path);
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("UNAUTHORIZED");
    });
  }
});

describe("Protected routes with invalid JWT → 401", () => {
  it("GET /api/v1/users/me with invalid token → 401", async () => {
    const res = await request(app)
      .get("/api/v1/users/me")
      .set("Authorization", "Bearer invalid-token");
    expect(res.status).toBe(401);
    expect(res.body.error).toBe("UNAUTHORIZED");
  });
});

describe("Unhandled error → 500 with JSON body, no stack trace", () => {
  it("returns 500 with structured error body", async () => {
    const { errorHandler } = require("../middleware/errorHandler");
    const expressLib = require("express");
    const testApp = expressLib();
    testApp.use(expressLib.json());
    testApp.get("/test-error", (_req: any, _res: any, next: any) => {
      next(new Error("boom"));
    });
    testApp.use(errorHandler);

    const res = await request(testApp).get("/test-error");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    });
    expect(res.body.stack).toBeUndefined();
  });
});
