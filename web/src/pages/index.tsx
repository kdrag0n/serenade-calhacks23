import { Inter } from 'next/font/google';
import { use, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { useConvexAuth } from "convex/react";
import { SignOutButton } from '@clerk/clerk-react';
import { useAuth } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const [spotData, setSpotData] = useState<string[] | null>(null);
  const [youtubeLink, setYoutubeLink] = useState<string | null>(null);
  const [chatCompletion, setChatCompletion] = useState(''); // Declare the state variable here

  const fetchSpotifyTopTrack = async () => {
    try {
      const response = await fetch(`/api/getTracks?userId=${userId}`);
      const data = await response.json();
      const title = data.items[0].name;
      const artist = data.items[0].artists[0].name;
      const album = data.items[0].album.name;
      const link = data.items[0].external_urls.spotify;
      return [`Song titled ${title} on the album ${album} by ${artist}`, `${link}`]; 
    } catch (error) {
      console.error("Error fetching data from external resource:", error);
      return null;
    }
  };

  const convertSpotifyToYoutube = async () => {
    try {
      const response = await fetch(`/api/linkApi?spotifyUrl=${spotData![1]}`);
      const data = await response.json();
      return data.linksByPlatform.youtube.url;
    }
    catch (error) {
      console.error("Error fetching data from external resource:", error);
      return null;
    }
  }

  useEffect(() => {
    if (isAuthenticated === false && isLoading === false) {
      router.push('/auth');
    } if (isAuthenticated === true && userId) {
      fetchSpotifyTopTrack().then((sData) => {
        setSpotData(sData);
      })
    }
  }, [isAuthenticated, isLoading, isLoaded, router]);

  useEffect(() => {
    if (spotData !== null) {
      convertSpotifyToYoutube().then((yData) => {
        setYoutubeLink(yData);
      })
    }
  }, [spotData]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/openai?promptText=This is a test')
      .then(response => response.json())
      .then(data => {
        console.log(data.choices[0].message.content);
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          setChatCompletion(data.choices[0].message.content);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [isAuthenticated]);

  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#11998e] to-[#237A57] flex-col items-center space-y-10 p-24">
      <div>
        {isAuthenticated ? (
          <>
          <div>
            {spotData !== null ? (
              <ul>
                {spotData.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Loading...</p>
            )}        
          </div>
          <div>
            {youtubeLink}
          </div>
          </>
        ) : "Loading..."}
      </div>
      <div>
        {isAuthenticated ? (
          <>
          <div>
            logged in
          </div>
          </>
        ) : "Logged out or still loading"}
      </div>
      <button className="btn btn-success">
        <SignOutButton />
      </button>
      <div>
        {chatCompletion}
      </div>
    </main>
  )
}
