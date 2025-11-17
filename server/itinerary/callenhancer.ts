// services/ai/enhancer.service.ts

import { AIEnhancerResponseSchema } from "@/types/ai-response";

export async function callAIEnhancer(prompt: string) {
  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization:
        `Bearer ${process.env.PERPLEXITY_API_KEY}`,

      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    }),
  });

  const data = await res.text();

  if (!res.ok) {
    throw new Error(`Perplexity API error: ${res.status} ${data.slice(0, 100)}`);
  }

  let json;
  try {
    json = JSON.parse(data);
  } catch {
    throw new Error("Invalid JSON from AI");
  }

  const rawContent = json.choices[0]?.message?.content || "";
  
  // Clean JSON from AI (remove markdown)
  const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No JSON array in AI response");

  const parsed = JSON.parse(jsonMatch[0]);
  return AIEnhancerResponseSchema.parse(parsed);
}