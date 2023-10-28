import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const emojiBank = '😀,😁,🥹,😅,😂,🥲,😊,🙂,😌,🥰,😋,😝,🤪,😎,🤩,🥳,😒,😞,😔,😟,😖,😩,🥺,😢,😭,😤,😡,🤬,🤯,😳,😱,😰,😓,🤗,🤭,😐,😬,😯,😧,😮,😴,😪,😮,‍🤐,🤧,😷,🤒,🤕,🤠'

export default function Mood() {

    const CLIENT_ID = "1526c36afb8b45ac8e684bb8729215b6"
    const REDIRECT_URI = "http://localhost:3000/mood"

    let [mood, setMood] = useState(emojiBank.split(',')[0])

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