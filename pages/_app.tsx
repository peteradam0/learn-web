import { NextUIProvider } from "@nextui-org/react";
import { CookiesProvider } from "react-cookie";

import { ClerkProvider } from "@clerk/nextjs";
import "modern-normalize/modern-normalize.css";
import { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Use at the root of our app
    <ClerkProvider>
      <NextUIProvider>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </NextUIProvider>
    </ClerkProvider>
  );
}
export default MyApp;
