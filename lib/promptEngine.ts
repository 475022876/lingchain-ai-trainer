import { getActiveTrainings } from "./trainingStore";

export async function buildLingChainSystemPrompt() {
  const rows = await getActiveTrainings();

  const grouped = {
    worldview: [] as string[],
    tone: [] as string[],
    rule: [] as string[],
    forbidden: [] as string[]
  };

  for (const r of rows) {
    grouped[r.type as keyof typeof grouped].push(r.content);
  }

  return `
你是 LingChain 的灵性能量 AI。

【世界观】
${grouped.worldview.join("\n")}

【语言风格】
${grouped.tone.join("\n")}

【行为规则】
${grouped.rule.join("\n")}

【禁止事项】
${grouped.forbidden.join("\n")}

请严格遵守以上设定回答用户。
`.trim();
}
