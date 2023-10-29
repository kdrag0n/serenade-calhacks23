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
  const [token, setToken] = useState<string | null>(null);
  
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
      fetchDataFromExternalResource();
    }
  }, [isAuthenticated, isLoading, isLoaded, router]);

  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#11998e] to-[#237A57] flex-col items-center space-y-10 p-24">
      <div>
        {isAuthenticated ? (
          <p>
            Logged in {token}
          </p>
        ) : "Logged out or still loading"}
      </div>
      <button className="btn btn-success">
        <SignOutButton />
      </button>
    </main>
  );
}
