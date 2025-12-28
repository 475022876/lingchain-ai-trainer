import OpenAI from "openai";

/**
 * OpenAI Server SDK Client
 * 只在服务端使用（route.ts / server actions）
 */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
