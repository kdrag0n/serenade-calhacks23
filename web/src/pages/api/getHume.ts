import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const blob = await req.query.blob as string;

  const url = 'https://api.hume.ai/v0/batch/jobs';
    try {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json; charset=utf-8',
          'content-type': 'application/json; charset=utf-8',
          'X-Hume-Api-Key': 'w6QBGcy6FAEyBoSykwcBZhq6eCPnEsiHA8CAAM7Ke6fAdTY8'
        },
        body: JSON.stringify({
          models: {
            prosody: {
              granularity: 'utterance',
              window: {
                length: 4,
                step: 1,
              },
            },
          },
          transcription: {
            language: null,
            identify_speakers: false,
            confidence_threshold: 0.5,
          },
          urls: [],
          notify: false,
        }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
};
