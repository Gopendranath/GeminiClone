import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_API_KEY


const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

async function run(prompt) {
  const completion = await openai.chat.completions.create({
    model: 'nvidia/llama-3.3-nemotron-super-49b-v1:free',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content
}

export default run;


// run("What is Nodejs ?")
