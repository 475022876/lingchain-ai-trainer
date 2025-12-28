"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function TrainerPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userText }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "（当前无法连接 AI 服务）" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 16, maxWidth: 640, margin: "0 auto" }}>
      <h2>LingChain · AI Trainer</h2>

      <div style={{ minHeight: 320, marginBottom: 12 }}>
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.role === "user" ? "👤" : "🤖"}</strong>{" "}
            {m.text}
          </p>
        ))}
        {loading && <p>🤖 正在思考中…</p>}
      </div>

      <input
        style={{
          width: "100%",
          padding: 10,
          fontSize: 14,
          boxSizing: "border-box",
        }}
        placeholder="随便说一句，开始训练 AI…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />

      <button
        style={{
          marginTop: 8,
          width: "100%",
          padding: 10,
          fontSize: 14,
        }}
        onClick={send}
      >
        发送
      </button>
    </main>
  );
}
