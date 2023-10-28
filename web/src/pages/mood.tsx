import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api.js';

const getSpotifyToken = useMutation(api.functions.getSpotifyToken);

const emojiBank = '😀,😁,🥹,😅,😂,🥲,😊,🙂,😌,🥰,😋,😝,🤪,😎,🤩,🥳,😒,😞,😔,😟,😖,😩,🥺,😢,😭,😤,😡,🤬,🤯,😳,😱,😰,😓,🤗,🤭,😐,😬,😯,😧,😮,😴,😪,😮,‍🤐,🤧,😷,🤒,🤕,🤠'

export default function Mood() {
    const getSpotifyToken = useMutation(api.functions.getSpotifyToken);
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const CLIENT_ID = process.env.CLIENT_ID;

    let [mood, setMood] = useState(emojiBank.split(',')[0])
        useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        console.log('Code:', code)
        if (code) {
            getSpotifyToken({ code }).then((accessToken: any) => {
                axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }).then((response: any) => {
                    const playlists = response.data.items;
                    playlists.forEach((playlist: any) => {
                        axios.get('https://api.spotify.com/v1/me/tracks', {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }).then((response: any) => {
                            const tracks = response.data.items;
                            tracks.forEach((track: any) => {
                                console.log(track.track.name);
                            });
                        });
                    });
                });
            }); 
        }
    }, []) 
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* mood picker */}
        <div className='flex flex-row items-center justify-center flex-wrap'>
            {emojiBank.split(',').map((emoji, i) => (
            <button key={i} onClick={() => setMood(emoji)} className='text-6xl'>
                {emoji}
            </button>
            ))}
        </div> 
      </div>   
    )
}