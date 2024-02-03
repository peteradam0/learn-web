import { NextUIProvider } from "@nextui-org/react";

import { ClerkProvider } from "@clerk/nextjs";
import "modern-normalize/modern-normalize.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    // Use at the root of our app
    <ClerkProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </ClerkProvider>
  );
}
export default MyApp;
