import { httpAction } from 'convex/_generated/server.js';

export const spotifyAuth = httpAction({
    handler: async (ctx: any, req: any) => {
    // Extract the authorization code from the request
    const code = req.query.code;
    
    },
});