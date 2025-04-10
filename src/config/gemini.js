async function run(prompt) {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
  
    const data = await response.json();
  
    if (data.error) throw new Error(data.error);
    return data.result;
  }
  
  export default run;
  