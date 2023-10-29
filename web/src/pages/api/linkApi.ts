import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const spotifyUrl = await req.query.spotifyUrl as string;

  try {
    const response = await fetch(`https://api.song.link/v1-alpha.1/links?url=${spotifyUrl}`, {});
    if (response.status === 200) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Error fetching data from the external resource' });
    }
  } catch (error) {
    console.error('Internal server error: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
