import OpenAI from "openai";
import { MealParseResultSchema, EditInstructionSchema } from "@diet-ai/shared";
import type { LLMProvider, MealContext, MealParseResult, EditInstruction } from "./provider";
import { LLMParseError } from "./provider";
import { LLM_MODELS } from "./config";
import { buildParseSystemPrompt } from "./prompts/parse";
import { buildEditSystemPrompt } from "./prompts/edit";

function stripCodeFences(s: string): string {
  return s.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
}

export class OpenAIProvider implements LLMProvider {
  private client: OpenAI;

  constructor(client?: OpenAI) {
    this.client = client ?? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async parseMessage(rawText: string, todayISO: string, userTime: string): Promise<MealParseResult> {
    const systemPrompt = buildParseSystemPrompt(todayISO, userTime);
    const response = await this.client.chat.completions.create({
      model: LLM_MODELS.parse,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: rawText },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? null;
    if (!raw) {
      throw new LLMParseError("Empty response from LLM", "");
    }

    const cleaned = stripCodeFences(raw);
    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new LLMParseError("Malformed JSON", raw);
    }

    const result = MealParseResultSchema.safeParse(parsed);
    if (!result.success) {
      throw new LLMParseError(
        "Schema mismatch: " + result.error.issues.map((i) => i.message).join(", "),
        raw
      );
    }

    return result.data;
  }

  async editMessage(rawText: string, todayISO: string, mealsContext: MealContext[]): Promise<EditInstruction> {
    const systemPrompt = buildEditSystemPrompt(todayISO, mealsContext);
    const response = await this.client.chat.completions.create({
      model: LLM_MODELS.edit,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: rawText },
      ],
    });

    const raw = response.choices[0]?.message?.content ?? null;
    if (!raw) {
      throw new LLMParseError("Empty response from LLM", "");
    }

    const cleaned = stripCodeFences(raw);
    let parsed: unknown;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      throw new LLMParseError("Malformed JSON", raw);
    }

    const result = EditInstructionSchema.safeParse(parsed);
    if (!result.success) {
      throw new LLMParseError(
        "Schema mismatch: " + result.error.issues.map((i) => i.message).join(", "),
        raw
      );
    }

    return result.data;
  }
}
