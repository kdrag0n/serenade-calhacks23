import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api.js';


const emojiBank = '😀,😁,🥹,😅,😂,🥲,😊,🙂,😌,🥰,😋,😝,🤪,😎,🤩,🥳,😒,😞,😔,😟,😖,😩,🥺,😢,😭,😤,😡,🤬,🤯,😳,😱,😰,😓,🤗,🤭,😐,😬,😯,😧,😮,😴,😪,😮,‍🤐,🤧,😷,🤒,🤕,🤠'

export default function Mood() {
    const CLIENT_ID = "1526c36afb8b45ac8e684bb8729215b6";
    const REDIRECT_URI = "http://localhost:3000/mood";
    const emojiBank = '😀,😁,🥹,😅,😂,🥲,😊,🙂,😌,🥰,😋,😝,🤪,😎,🤩,🥳,😒,😞,😔,😟,😖,😩,🥺,😢,😭,😤,😡,🤬,🤯,😳,😱,😰,😓,🤗,🤭,😐,😬,😯,😧,😮,😴,😪,😮,‍🤐,🤧,😷,🤒,🤕,🤠';
    let [mood, setMood] = useState(emojiBank.split(',')[0]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        console.log('Code:', code);
        if (code) {
            axios.post('https://fiery-panda-598.convex.cloud/getAuth', { code }).then((response) => {
                const accessToken = response.data.accessToken;
                axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }).then((response) => {
                    const playlists = response.data.items;
                    playlists.forEach((playlist: any) => {
                        axios.get('https://api.spotify.com/v1/me/tracks', {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        }).then((response) => {
                            const tracks = response.data.items;
                            tracks.forEach((track: any) => {
                                console.log(track.track.name);
                            });
                        });
                    });
                });
            });
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className='flex flex-row items-center justify-center flex-wrap'>
                {emojiBank.split(',').map((emoji, i) => (
                    <button key={i} onClick={() => setMood(emoji)} className='text-6xl'>
                        {emoji}
                    </button>
                ))}
            </div> 
        </div>   
    );
}