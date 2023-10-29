import { useState, useEffect } from 'react';
import { useConvexAuth } from "convex/react";

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const [chatCompletion, setChatCompletion] = useState(''); // Declare the state variable here

  useEffect(() => {
    if (isAuthenticated) {
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
      .then(data => setChatCompletion(data.choices[0].message.content)) // Set the chat completion
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [isAuthenticated]);

  return (
    <main className="bg-gradient-to-b from-[#11998e] to-[#237A57] min-h-screen">
      <div>
        {isAuthenticated ? "Logged in" : "Logged out or still loading"}
      </div>
      <div>
        {chatCompletion} // Display the chat completion here
      </div>
    </main>
  )
}