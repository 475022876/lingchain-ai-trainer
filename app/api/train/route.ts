import { NextResponse } from "next/server";
import { addTraining } from "@/lib/trainingStore";

export async function POST(req: Request) {
  const { content, type, createdBy } = await req.json();

  if (!content || !content.trim()) {
    return NextResponse.json(
      { error: "内容不能为空" },
      { status: 400 }
    );
  }

  await addTraining(
    content,
    type || "worldview",
    createdBy || "team"
  );

  return NextResponse.json({
    ok: true,
    message: "✅ 已写入 LingChain 训练体系"
  });
}
