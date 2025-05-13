import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { messages } = req.body;

  const resume = docs.anthonyfox_res.md; // Load from file or hardcoded

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: `You are a helpful assistant answering questions about this resume:\n\n${resume}` },
      ...messages,
    ],
  });

  res.status(200).json({ response: response.choices[0].message });
}
