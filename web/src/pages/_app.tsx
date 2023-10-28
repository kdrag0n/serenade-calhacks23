import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

// Productionize .env
const convex = new ConvexReactClient("https://fiery-panda-598.convex.cloud");

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider publishableKey="pk_test_aGVscGZ1bC1nb2JibGVyLTgxLmNsZXJrLmFjY291bnRzLmRldiQ">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Component {...pageProps} />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}