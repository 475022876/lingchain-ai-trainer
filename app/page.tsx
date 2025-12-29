"use client";

import { useState } from "react";

const TRAINING_TYPES = [
  { value: "worldview", label: "世界观 · 核心信念" },
  { value: "tone", label: "语气 · 表达风格" },
  { value: "rule", label: "行为规则 · 原则" },
  { value: "forbidden", label: "禁止事项 · 红线" },
  { value: "tools", label: "工具推荐 · Indie Hacker" },
];

const C = {
  bg: "#0b0f14",
  card: "#111827",
  border: "rgba(255,255,255,0.08)",
  textMain: "#e5e7eb",
  textSub: "rgba(229,231,235,0.6)",
  gold: "#c8b37a",
  accent: "#6ee7b7",
};

export default function TrainerAdminPage() {
  const [type, setType] = useState("worldview");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function submit() {
    if (!content.trim()) return;

    setLoading(true);
    setResult(null);

    const res = await fetch("/api/training", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        content,
        createdBy: "team",
      }),
    });

    if (res.ok) {
      setContent("");
      setResult("✨ 已成功投喂，AI 将在下一次对话中体现");
    } else {
      setResult("⚠️ 投喂失败，请联系技术人员");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        color: C.textMain,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
          background: C.card,
          borderRadius: 16,
          padding: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          border: `1px solid ${C.border}`,
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontWeight: 500 }}>
            LingChain · AI 训练仪式
          </h2>
          <p style={{ marginTop: 6, color: C.textSub, fontSize: 13 }}>
            用自然语言，塑造 LingChain 的人格与边界
          </p>
        </div>

        {/* Type Selector */}
        <label style={{ fontSize: 13, color: C.textSub }}>
          训练类型
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            width: "100%",
            marginTop: 6,
            marginBottom: 16,
            padding: "10px 12px",
            borderRadius: 10,
            background: "#020617",
            color: C.textMain,
            border: `1px solid ${C.border}`,
          }}
        >
          {TRAINING_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>

        {/* Textarea */}
        <label style={{ fontSize: 13, color: C.textSub }}>
          训练内容
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="像对一个正在成长的生命说话一样输入…"
          style={{
            width: "100%",
            marginTop: 6,
            padding: 12,
            borderRadius: 12,
            background: "#020617",
            color: C.textMain,
            border: `1px solid ${C.border}`,
            resize: "none",
            lineHeight: 1.6,
          }}
        />

        {/* Submit */}
        <button
          onClick={submit}
          disabled={loading}
          style={{
            marginTop: 20,
            width: "100%",
            padding: "12px 0",
            borderRadius: 12,
            background: loading ? "#1f2937" : C.gold,
            color: "#000",
            fontSize: 15,
            fontWeight: 500,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          {loading ? "训练中…" : "提交训练"}
        </button>

        {/* Result */}
        {result && (
          <p
            style={{
              marginTop: 14,
              fontSize: 13,
              color: C.accent,
              textAlign: "center",
            }}
          >
            {result}
          </p>
        )}
      </div>
    </div>
  );
}
