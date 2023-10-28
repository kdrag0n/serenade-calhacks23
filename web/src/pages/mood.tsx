import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api.js';


const emojiBank = '😀,😁,🥹,😅,😂,🥲,😊,🙂,😌,🥰,😋,😝,🤪,😎,🤩,🥳,😒,😞,😔,😟,😖,😩,🥺,😢,😭,😤,😡,🤬,🤯,😳,😱,😰,😓,🤗,🤭,😐,😬,😯,😧,😮,😴,😪,😮,‍🤐,🤧,😷,🤒,🤕,🤠'

export default function Mood() {
    const emojiBank = '😀,😁,🥹,😅,😂,🥲,😊,🙂,😌,🥰,😋,😝,🤪,😎,🤩,🥳,😒,😞,😔,😟,😖,😩,🥺,😢,😭,😤,😡,🤬,🤯,😳,😱,😰,😓,🤗,🤭,😐,😬,😯,😧,😮,😴,😪,😮,‍🤐,🤧,😷,🤒,🤕,🤠';

    let [mood, setMood] = useState(emojiBank.split(',')[0])

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
