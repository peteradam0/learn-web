import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    </Html>
  );
}
