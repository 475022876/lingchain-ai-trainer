import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { input } = body;

  return NextResponse.json({
    reply: `LingChain AI 已记录你的训练输入：「${input}」`,
  });
}
