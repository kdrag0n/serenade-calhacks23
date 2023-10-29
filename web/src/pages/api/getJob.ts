import { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'edge';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = await req.query;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json; charset=utf-8',
      'X-Hume-Api-Key': 'w6QBGcy6FAEyBoSykwcBZhq6eCPnEsiHA8CAAM7Ke6fAdTY8',
    },
  };

  try {
    let fetchedHume = false;
    let completion = null;
    while(fetchedHume == false) {
        completion = await fetch(`https://api.hume.ai/v0/batch/jobs/${id}`, options)
        const data = await completion.json();
        if (data.state.status == 'COMPLETED') {
            fetchedHume = true;
        } else {
            console.log("waiting for hume");
            await sleep(5000);
        }
    }

    const predictions = await fetch(`https://api.hume.ai/v0/batch/jobs/${id}/predictions`, options)
    
    if (predictions.status !== 200) {
      throw new Error('Failed to fetch data');
    }

    const json = await predictions.json();
    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ error });
  }
};
