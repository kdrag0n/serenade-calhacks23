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
  const [data, setSpotData] = useState<string | null>(null);
  const [chatCompletion, setChatCompletion] = useState(''); // Declare the state variable here

  const fetchDataFromExternalResource = async () => {
    try {
      const response = await fetch(`/api/getTracks?userId=${userId}`);
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error fetching data from external resource:", error);
      return null;
    }
  };

  useEffect(() => {
    if (isAuthenticated === false && isLoading === false) {
      router.push('/auth');
    } if (isAuthenticated === true && userId) {
      fetchDataFromExternalResource().then((data) => {
        setSpotData(JSON.stringify(data));
      })
    }
  }, [isAuthenticated, isLoading, isLoaded, router]);


  useEffect(() => {
    if (isAuthenticated) {
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        prompt: 'Translate the following English text to French: "{text}"',
        max_tokens: 60,
        engine: 'text-davinci-003',
        temperature: 0.5,
      })
      })
      .then(response => response.json())
      .then(data => setChatCompletion(data.choices[0].message.content)) // Set the chat completion
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
            {data}
          </div>
          </>
        ) : "Logged out or still loading"}
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
        {chatCompletion} // Display the chat completion here
      </div>
    </main>
  )
}
