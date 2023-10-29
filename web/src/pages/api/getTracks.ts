import { Clerk } from '@clerk/clerk-sdk-node';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Initialize Clerk
  const clerk = Clerk({ secretKey: 'sk_test_tuvlhnoT55OF5X28tq0sGR1G3PRLCkJU3eInTjivtP' });
  const userId = await req.query.id as string;

  try {
    // Get the user's OAuth token
    const OAuthAccessToken = await clerk.users.getUserOauthAccessToken(userId, 'oauth_spotify');
    const token = OAuthAccessToken[0].token;
    // Fetch data from the external resource
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=1', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
