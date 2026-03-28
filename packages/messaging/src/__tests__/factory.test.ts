import { createMessagingAdapters } from "../factory";
import { TelegramAdapter } from "../telegram/adapter";

describe("createMessagingAdapters", () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns a TelegramAdapter when MESSAGING_PLATFORMS=telegram", () => {
    process.env.MESSAGING_PLATFORMS = "telegram";
    const adapters = createMessagingAdapters();
    expect(adapters).toHaveLength(1);
    expect(adapters[0]).toBeInstanceOf(TelegramAdapter);
  });

  it("returns a TelegramAdapter when MESSAGING_PLATFORMS is unset", () => {
    delete process.env.MESSAGING_PLATFORMS;
    const adapters = createMessagingAdapters();
    expect(adapters).toHaveLength(1);
    expect(adapters[0]).toBeInstanceOf(TelegramAdapter);
  });

  it("returns two TelegramAdapters when MESSAGING_PLATFORMS=telegram,telegram", () => {
    process.env.MESSAGING_PLATFORMS = "telegram,telegram";
    const adapters = createMessagingAdapters();
    expect(adapters).toHaveLength(2);
    adapters.forEach((a) => expect(a).toBeInstanceOf(TelegramAdapter));
  });

  it("throws for an unknown platform entry", () => {
    process.env.MESSAGING_PLATFORMS = "unknown";
    expect(() => createMessagingAdapters()).toThrow(/unknown/i);
  });
});
