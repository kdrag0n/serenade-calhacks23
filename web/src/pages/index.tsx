import { Inter } from 'next/font/google'
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { useConvexAuth } from "convex/react";
import { SignOutButton } from '@clerk/clerk-react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const router = useRouter();

  useEffect(() => {
      // Check the user's authentication status
      if (isAuthenticated == false && isLoading == false) {
        // If the user is not authenticated, redirect to the login page
        router.push('/auth');
      }
    }, [isAuthenticated, isLoading]);

  return (
    <main className="flex min-h-screen bg-gradient-to-b from-[#11998e] to-[#237A57] flex-col items-center space-y-10 p-24">
      <div>
        {isAuthenticated ? "Logged in" : "Logged out or still loading"}
      </div>
      <button className="btn btn-success">
        <SignOutButton/>
      </button> 
    </main>
  )
}
