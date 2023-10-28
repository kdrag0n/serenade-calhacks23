import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { useConvexAuth } from "convex/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <main className="bg-gradient-to-b from-[#11998e] to-[#237A57] min-h-screen">
      <div>
        {isAuthenticated ? "Logged in" : "Logged out or still loading"}
      </div>
    </main>
  )
}
