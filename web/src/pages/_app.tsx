import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth0 } from "convex/react-auth0";
import { Auth0Provider } from "@auth0/auth0-react";

// Productionize .env
const convex = new ConvexReactClient("https://fiery-panda-598.convex.cloud");

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      // Productionize in .env
      domain="dev-1gdhmf8ljgbob4bk.us.auth0.com"
      clientId="yNMjcUBS0m8PrZgrDaZCNHJONBIBFdMq"
      authorizationParams={{
        redirect_uri:
          typeof window === "undefined" ? undefined : window.location.origin,
      }}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <ConvexProviderWithAuth0 client={convex}>
        <Component {...pageProps} />
      </ConvexProviderWithAuth0>
    </Auth0Provider>
  );
}