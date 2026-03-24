import { IncomingMessageSchema, OutgoingMessageSchema } from "../messaging";

describe("IncomingMessageSchema", () => {
  const base = {
    platformMessageId: "msg-1",
    platformUserId: "user-1",
    platform: "telegram",
    text: "I had a banana",
    timestamp: new Date(),
  };

  it("accepts valid object with Date timestamp", () => {
    expect(IncomingMessageSchema.safeParse(base).success).toBe(true);
  });

  it("accepts valid object with ISO string timestamp", () => {
    expect(
      IncomingMessageSchema.safeParse({ ...base, timestamp: "2024-01-01T10:00:00.000Z" }).success
    ).toBe(true);
  });

  it("rejects missing platformMessageId", () => {
    const { platformMessageId, ...rest } = base;
    expect(IncomingMessageSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects invalid platform", () => {
    expect(IncomingMessageSchema.safeParse({ ...base, platform: "sms" }).success).toBe(false);
  });
});

describe("OutgoingMessageSchema", () => {
  const base = {
    platformUserId: "user-1",
    platform: "telegram",
    text: "Logged your meal!",
  };

  it("accepts valid object", () => {
    expect(OutgoingMessageSchema.safeParse(base).success).toBe(true);
  });

  it("rejects missing text", () => {
    const { text, ...rest } = base;
    expect(OutgoingMessageSchema.safeParse(rest).success).toBe(false);
  });
});
