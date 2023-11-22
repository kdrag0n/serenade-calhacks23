import { Inter } from 'next/font/google';
import { use, useEffect, useRef, useState } from "react";
import styled, { keyframes } from 'styled-components'
import { useRouter } from 'next/router';
import { useConvexAuth } from "convex/react";
import { SignOutButton } from '@clerk/clerk-react';
import { useAuth } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { fetchJson } from '@/util';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

const enterDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`

const enterUp = keyframes`
  0% {
    opacity: 0;
    transform: perspective(500px) translateY(15px) rotateX(3deg);
  }
  100% {
    opacity: 1;
    transform: perspective(500px) translateY(0px) rotateX(0deg);
  }
`

interface AnimateInProps {
  stagger?: number
}
const AnimateIn = styled.div<AnimateInProps>`
  animation: ${enterDown} 750ms ease both;
  animation-delay: ${p => (p.stagger ?? 0) * 150}ms;
`

const ProductAnimateIn = styled.div<AnimateInProps>`
  animation: ${enterUp} 1000ms ease both;
  animation-delay: ${p => (p.stagger ?? 0) * 150}ms;
`

function GeneratingOverlay() {
  return <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex flex-col items-center justify-center z-30">
    <Loader2 className="w-24 h-24 animate-spin" />
    <h1 className="text-2xl text-white">Happy times soon…</h1>
  </div>
}

function Mood({ spotData }: {
  spotData: string[] | null
}) {
  const emojiBank = '😀,😁,🥹,😅,😂,🥲,😊,🙂,😌,🥰,😋,😝,🤪,😎,🤩,🥳,😒,😞,😔,😟,😖,😩,🥺,😢,😭,😤,😡,🤬,🤯,😳,😱,😰,😓,🤗,🤭,😐,😬,😯,😧,😮,😴,😪,😮,‍🤐,🤧,😷,🤒,🤕,🤠';

  let { userId } = useAuth()
  let [mood, setMood] = useState<string|null>(null)
  let [generating, setGenerating] = useState(false)
  let [audioUrl, setAudioUrl] = useState<string|null>(null)
  let audioRef = useRef<HTMLAudioElement>(null)
  let done = !!audioUrl

  async function generateClip() {
    // request
    setGenerating(true)
    let output = await fetchJson(`/api/generate_clip?userId=${encodeURIComponent(userId!)}&emoji=${encodeURIComponent(mood!)}`, {
      method: 'POST',
    })
    setGenerating(false)
    console.log('api', output)

    // play from blob
    setAudioUrl(output.audioUrl)
  }

  return done ? <>
    <div className="flex min-h-screen flex-col items-center gap-12">
      <h1 className=' text-6xl font-medium'>Relax and enjoy 🎶</h1>

      {audioUrl && <audio ref={audioRef} src={audioUrl} controls autoPlay loop />}
  </div>
  </> : <div className="flex min-h-screen flex-col items-center gap-10">

    {mood !== null ? <>
      <AnimateIn stagger={3}><h1 className=' text-4xl font-medium'>You like this song, don’t you?</h1></AnimateIn>
      {spotData && <AnimateIn stagger={8}><div className='flex flex-col items-center justify-center flex-wrap'>
        <h1 className=' text-xl'>{spotData[0]}</h1>
        <h1 className=' text-md'>{spotData[1]}</h1>
      </div></AnimateIn>}
      {!spotData && <Loader2 className="w-10 h-10 animate-spin" />}

      <button className='btn btn-success' onClick={generateClip} disabled={mood === null}>Cheer me up</button>
    </> : <>
      <AnimateIn><h1 className=' text-8xl font-extrabold'>Hi.</h1></AnimateIn>
      <AnimateIn stagger={5}><h1 className=' text-6xl font-medium'>How are you feeling?</h1></AnimateIn>
      <ProductAnimateIn stagger={10}><div className='flex flex-row items-center justify-center flex-wrap'>
          {emojiBank.split(',').map((emoji, i) => (
            <button key={i} onClick={() => setMood(emoji)} className={clsx('text-6xl hover:z-20 hover:scale-150 transition-all duration-300 ease-out drop-shadow-lg peer active:scale-125 ', mood === emoji && 'scale-150 z-10', (mood !== emoji && mood !== null) && 'opacity-50 hover:opacity-80')} >
              {emoji}
            </button>
          ))}
      </div> 
      </ProductAnimateIn>
    </>}

    {audioUrl && <audio ref={audioRef} src={audioUrl} controls autoPlay loop />}

    {generating && <GeneratingOverlay />}
  </div>
}

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [spotData, setSpotData] = useState<string[] | null>(null);

  const fetchSpotifyTopTrack = async () => {
    try {
      const response = await fetch(`/api/getTracks?userId=${userId}`);
      const data = await response.json();
      const title = data.items[0].name;
      const artist = data.items[0].artists[0].name;
      const album = data.items[0].album.name;
      const link = data.items[0].external_urls.spotify;
      return [title, artist, link]
    } catch (error) {
      console.error("Error fetching data from external resource:", error);
      return null;
    }
  };

  useEffect(() => {
    if (isAuthenticated === false && isLoading === false) {
      router.push('/auth');
    } else if (isAuthenticated === true && userId) {
      fetchSpotifyTopTrack().then((sData) => {
        setSpotData(sData);
      })
    }
  }, [isAuthenticated, isLoading, isLoaded, router, userId]);

  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#11998e] to-[#237A57] flex-col items-center space-y-10 p-24 text-white">
      <Image src="/SerenadeLogo.png" alt="logo" width={48} height={48} className="fixed top-0 left-0 m-4" />
      {isAuthenticated ? <>
        <Mood spotData={spotData} />
      </> : <Loader2 className="w-10 h-10 animate-spin" />}
      {/* TODO fix react error */}
      <button className="fixed top-0 right-0 m-4 btn btn-error">
        <SignOutButton />
      </button>
    </main>
  )
}
