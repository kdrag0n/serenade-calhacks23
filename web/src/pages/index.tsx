import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const emojiBank = '😀,😃,😄,😁,😆,🥹,😅,😂,🤣,🥲,😊,😇,🙂,🙃,😉,😌,😍,🥰,😘,😗,😙,😚,😋,😛,😝,😜,🤪,🤨,🧐,🤓,😎,🥸,🤩,🥳,😏,😒,😞,😔,😟,😕,🙁,☹,️,😣,😖,😫,😩,🥺,😢,😭,😤,😠,😡,🤬,🤯,😳,🥵,🥶,😶,‍,🌫,️,😱,😨,😰,😥,😓,🤗,🤔,🫣,🤭,🫢,🫡,🤫,🫠,🤥,😶,🫥,😐,🫤,😑,🫨,😬,🙄,😯,😦,😧,😮,😲,🥱,😴,🤤,😪,😮,‍,💨,😵,😵,‍,💫,🤐,🥴,🤢,🤮,🤧,😷,🤒,🤕,🤑,🤠'

export default function Home() {
  let [mood, setMood] = useState(emojiBank.split(',')[0])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {/* mood picker */}
      <div className='flex flex-row items-center justify-center flex-wrap'>
        {emojiBank.split(',').map((emoji, i) => (
          <button key={i} onClick={() => setMood(emoji)} className='text-6xl'>
            {emoji}
          </button>
        ))}
      </div>
    </main>
  )
}
