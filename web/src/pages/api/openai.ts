import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case 'GET':
      // Handle GET request
      break;
    case 'POST':
        const promptText = req.query.promptText as string;

      // Handle POST request
      await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          prompt: promptText,
          max_tokens: 60,
          engine: 'text-davinci-003',
          temperature: 0.5,
        })
      })
      .then(response => response.json())
      .then(data => {
        res.status(200).json(data);
      }) 
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}