type TrainingRow = {
  type: "worldview" | "rule" | "tone" | "forbidden";
  content: string;
};

export function buildSystemPrompt(rows: TrainingRow[]) {
  const sections: Record<string, string[]> = {
    worldview: [],
    rule: [],
    tone: [],
    forbidden: [],
  };

  rows.forEach((row) => {
    sections[row.type].push(row.content);
  });

  let prompt = `你是 LingChain AI。\n\n`;

  if (sections.worldview.length) {
    prompt += `【世界观】\n`;
    sections.worldview.forEach((t) => (prompt += `- ${t}\n`));
    prompt += `\n`;
  }

  if (sections.rule.length) {
    prompt += `【行为规则】\n`;
    sections.rule.forEach((t) => (prompt += `- ${t}\n`));
    prompt += `\n`;
  }

  if (sections.tone.length) {
    prompt += `【语气风格】\n`;
    sections.tone.forEach((t) => (prompt += `- ${t}\n`));
    prompt += `\n`;
  }

  if (sections.forbidden.length) {
    prompt += `【禁止事项】\n`;
    sections.forbidden.forEach((t) => (prompt += `- ${t}\n`));
    prompt += `\n`;
  }

  prompt += `请严格遵循以上设定进行回答。`;

  return prompt;
}
