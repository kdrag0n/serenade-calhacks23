import { httpAction } from '../convex/_generated/server.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const storeYoutubeFile = httpAction(async (ctx: any, req: any): Promise<Response> => {
    // Extract the YouTube file from the request
    const file = req.body.file;
    const fileName = req.body.fileName;

    // Define the path where the file will be stored
    const filePath = path.join(__dirname, '/youtubeFiles/', fileName);

    // Write the file to the server
    fs.writeFileSync(filePath, file);

    // Return the file path as the response
    return new Response(JSON.stringify({ filePath }), {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
});