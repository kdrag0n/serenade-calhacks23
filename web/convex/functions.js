import { mutation } from "./_generated/server";
import axios from 'axios';
import { v } from "convex/values";

export const getSpotifyToken = mutation({
  args: {
    code: v.string(),
  },

  handler: async (ctx, args) => {
    const response = await axios.post('https://accounts.spotify.com/api/token', {
      grant_type: 'authorization_code',
      code: args.code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  },
});