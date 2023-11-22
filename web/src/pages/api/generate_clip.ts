import type { NextApiRequest, NextApiResponse } from 'next'
import { Clerk } from '@clerk/clerk-sdk-node';
import { fetchJson } from '@/util';
import { runProcess } from '@/util_server';
import Replicate from 'replicate';
import { rm } from 'fs/promises';
import { httpAction } from '../../../convex/_generated/server.js';
import { mutation } from '../../../convex/_generated/server.js';
import { useMutation } from "convex/react";

const contextLen = 10 // sec

const replicate = new Replicate({
  auth: 'r8_NZ4YhCM33FkeBJOrWN10Ui7N7C0yGgz1ZUR2r'
})

async function getTopSong(userId: string) {
  // Initialize Clerk
  const clerk = Clerk({ secretKey: 'sk_test_tuvlhnoT55OF5X28tq0sGR1G3PRLCkJU3eInTjivtP' });

  
  // Get the user's OAuth token
  const OAuthAccessToken = await clerk.users.getUserOauthAccessToken(userId, 'oauth_spotify');
  const token = OAuthAccessToken[0].token;
  // Fetch data from the external resource
  return await fetchJson('https://api.spotify.com/v1/me/top/tracks?limit=1', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

async function convertSpotifyToYtUrl(spotifyUrl: string) {
  let data = await fetchJson(`https://api.song.link/v1-alpha.1/links?url=${spotifyUrl}`, {});
  console.log('spotify yt', data)
  return data.linksByPlatform.youtube.url
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != 'POST') {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method Not Allowed`);
  }

  // res.status(200).json({ 
  //   audioUrl: 'https://replicate.delivery/pbxt/F5wXHeQalswlGSCt9g68bz8OpqZeCqvNwwX9f2RkSTPUL6ljA/out.wav',
  // })
  // return

  const userId = req.query.userId as string;
  const emoji = req.query.emoji as string;

  const songData = await getTopSong(userId);
  const songTitle = songData.items[0].name;
  const songArtist = songData.items[0].artists[0].name;
  const songAlbum = songData.items[0].album.name;
  const songUrl = songData.items[0].external_urls.spotify;
  // broken for some songs (missing yt link)
  //const ytUrl = await convertSpotifyToYtUrl(songUrl);

  // 1. gpt
  let completion = await fetchJson('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_KEY}`
    },
    body: JSON.stringify({
      max_tokens: 100,
      model: 'gpt-3.5-turbo',
      messages: [
<<<<<<< HEAD
        {'role': 'user', 'content': `I’m feeling like ${emoji}. What’s a good prompt for MusicGen, an AI music generation model, to cheer me up through therapeutic music? Please base it on my favorite song: ${songTitle}`},
=======
        {'role': 'user', 'content': `I’m feeling like ${emoji}. What’s a good prompt for MusicGen, an AI music generation model, to cheer me up through therapeutic music? Please base it on my favorite song: ${songTitle}. ONLY return the prompt without ANY explanation or lead-up. Keywords only, not full sentences.

Example 1: Edo25 major g melodies that sound triumphant and cinematic. Leading up to a crescendo that resolves in a 9th harmonic
Example 2: A grand orchestral arrangement with thunderous percussion, epic brass fanfares, and soaring strings, creating a cinematic atmosphere fit for a heroic battle.

Use whatever instruments you want for medically-proven therapeutic purposes.`},
>>>>>>> 8a71b74007bfeafd86a96931e1245c8d2f17000e
      ],
    })
  })
  // TODO function calling
  let musicGenPrompt = completion.choices[0].message.content as string
  console.log('prompt', musicGenPrompt)

  // 2. yt-dlp
  let tmpDir = `/tmp/serenade/${Math.random()}`
  let dlFile = `${tmpDir}/dl.m4a`
  let finalTrimmed = `${tmpDir}/final.m4a`
  //yt-dlp -f m4a -o $o $ytUrl
  console.log('downloading', songUrl)
  let ytdlOut = await runProcess('yt-dlp', ['-f', 'm4a', '-o', dlFile, `ytsearch1:${songTitle} ${songArtist}`])
  console.log('ytdl:', ytdlOut)

  // 3. ffmpeg
  //ffmpeg -i audiofile -c:a copy -ss 25 -t 10 out.ogg
  // get duration of audio
  //let ffprobe = await runProcess(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', dlFile])
  let midStart = 15 // TODO middle
  console.log('trimming', midStart, contextLen)
  let ffmpegOut = await runProcess('ffmpeg', ['-i', dlFile, '-c:a', 'copy', '-ss', String(midStart), '-t', String(contextLen), finalTrimmed])
  console.log('ffmpeg:', ffmpegOut)

  // upload audio
  let postUrl = await ctx.uploadFile(finalTrimmed)

  // 4. replicate
  let replicateOut = await replicate.run('meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906', {
    input: {
      model_version: 'melody',
      prompt: musicGenPrompt,
      input_audio: finalTrimmed, // TODO upload?
      continuation: false, // true for longer
      duration: 3, // TODO increase for prod
      seed: 982348912,
      // network is slow
      output_format: 'mp3',
    },
  }) as {
    output: string
  }
  console.log('got', replicateOut)

  // delete temp
  await rm(tmpDir, { recursive: true, force: true })

  // return
  res.status(200).json({ 
    audioUrl: replicateOut.output,
  })
}
