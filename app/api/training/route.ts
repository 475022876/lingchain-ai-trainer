import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * POST /api/training
 * 用于写入训练数据
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, content, createdBy } = body;

    if (!type || !content) {
      return NextResponse.json(
        { error: "Missing type or content" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("training_data").insert([
      {
        type,
        content,
        created_by: createdBy || "unknown",
        status: "approved",
        is_active: true,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Training API error:", err);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 500 }
    );
  }
}

/**
 * 可选：GET /api/training
 * 用于查看当前生效训练数据
 */
export async function GET() {
  const { data, error } = await supabase
    .from("training_data")
    .select("type, content")
    .eq("status", "approved")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ rows: data });
}
