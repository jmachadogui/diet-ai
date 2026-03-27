import axios from "axios";
import { getAccessToken, resetTokenCache } from "../fatsecret/tokenManager";
import { NutritionAPIError } from "../provider";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  resetTokenCache();
  jest.clearAllMocks();
});

describe("getAccessToken", () => {
  it("fetches token on first call", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: "tok1", expires_in: 3600 },
    });

    const token = await getAccessToken("id", "secret");
    expect(token).toBe("tok1");
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it("reuses token on second call within expiry window", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { access_token: "tok1", expires_in: 3600 },
    });

    await getAccessToken("id", "secret");
    const token = await getAccessToken("id", "secret");
    expect(token).toBe("tok1");
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it("refreshes token after expiry", async () => {
    mockedAxios.post
      .mockResolvedValueOnce({ data: { access_token: "tok1", expires_in: 0 } })
      .mockResolvedValueOnce({ data: { access_token: "tok2", expires_in: 3600 } });

    await getAccessToken("id", "secret");
    const token = await getAccessToken("id", "secret");
    expect(token).toBe("tok2");
    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
  });

  it("throws NutritionAPIError when OAuth endpoint returns an error", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("401 Unauthorized"));

    await expect(getAccessToken("id", "secret")).rejects.toThrow(NutritionAPIError);
  });
});
