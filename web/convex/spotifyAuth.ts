import { httpAction } from '../convex/_generated/server.js';
import axios from 'axios';

export const spotifyAuth = httpAction(async (ctx: any, req: any): Promise<Response> => {

        // Extract the authorization code from the request
        const code = req.query.code;

         const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', 'http://localhost:3000/mood');
        params.append('client_id', '1526c36afb8b45ac8e684bb8729215b6')


        const response = await axios.post('https://accounts.spotify.com/api/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const accessToken = response.data.access_token;
        return new Response(JSON.stringify({ accessToken }));
});