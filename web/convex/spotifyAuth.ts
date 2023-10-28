import { httpAction } from '../convex/_generated/server.js';
import axios from 'axios';

export const spotifyAuth = httpAction({
    handler: async (ctx: any, req: any) => {
        const code = req.query.code;

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', 'YOUR_REDIRECT_URI');
        params.append('client_id', 'YOUR_CLIENT_ID');
        params.append('client_secret', 'YOUR_CLIENT_SECRET');

        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.access_token;

    },
});