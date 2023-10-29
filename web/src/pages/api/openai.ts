fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_KEY}`
  },
  body: JSON.stringify({
    prompt: 'Translate the following English text to French: "{text}"',
    max_tokens: 60,
    engine: 'text-davinci-003',
    temperature: 0.5,
  })
})
.then(response => response.json())
.then(data => console.log(data.choices[0].message.content)) // Print the chat completion
.catch((error) => {
  console.error('Error:', error);
});