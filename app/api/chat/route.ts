import OpenAI from "openai";
import { supabase } from "@/lib/supabase";
import { buildSystemPrompt } from "@/lib/promptBuilder";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { input } = await req.json();

  // 1️⃣ 读取所有生效的训练数据
  const { data: rows, error } = await supabase
    .from("training_data")
    .select("type, content")
    .eq("status", "approved")
    .eq("is_active", true);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // 2️⃣ 拼 system prompt
  const systemPrompt = buildSystemPrompt(rows || []);

  // 3️⃣ 调 OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: input },
    ],
    temperature: 0.6,
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}
