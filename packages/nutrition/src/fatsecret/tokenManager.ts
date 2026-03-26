import axios from "axios";
import { NutritionAPIError } from "../provider";

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

export async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.accessToken;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const response = await axios.post(
      "https://oauth.fatsecret.com/connect/token",
      "grant_type=client_credentials&scope=basic",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, expires_in } = response.data as { access_token: string; expires_in: number };

    tokenCache = {
      accessToken: access_token,
      expiresAt: Date.now() + expires_in * 1000,
    };

    return tokenCache.accessToken;
  } catch (err) {
    throw new NutritionAPIError("Failed to obtain FatSecret OAuth token", err);
  }
}

export function resetTokenCache(): void {
  tokenCache = null;
}
