import OpenAI from "openai";

// Reads API key from .env
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // only for hackathon demo
});

export async function getFreshnessScore(text) {
  try {
    const prompt = `You are a food safety assistant. 
    Rate the freshness of this food description on a scale of 1 (stale, unsafe) to 10 (very fresh, safe). 
    Just return the number only.

    Food: ${text}`;

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const score = res.choices[0].message.content.trim();
    return parseInt(score) || 5; // default 5 if unclear
  } catch (err) {
    console.error("AI Error:", err);
    return 5;
  }
}
