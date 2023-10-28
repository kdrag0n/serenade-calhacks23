import Link from 'next/link'
import { useState } from 'react'

const emojiBank = '😀,😁,🥹,😅,😂,🥲,😊,🙂,😌,🥰,😋,😝,🤪,😎,🤩,🥳,😒,😞,😔,😟,😖,😩,🥺,😢,😭,😤,😡,🤬,🤯,😳,😱,😰,😓,🤗,🤭,😐,😬,😯,😧,😮,😴,😪,😮,‍🤐,🤧,😷,🤒,🤕,🤠'

export default function Mood() {
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