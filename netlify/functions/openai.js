import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY, // NOTE: NO import.meta.env here
});

export async function handler(event) {
  const { prompt } = JSON.parse(event.body || "{}");

  if (!prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Prompt is required.' }),
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'nvidia/llama-3.3-nemotron-super-49b-v1:free',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: completion.choices[0].message.content,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Unknown error' }),
    };
  }
}
