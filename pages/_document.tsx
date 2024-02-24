import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <html
        lang="en"
        className="dark"
        style={{ colorScheme: "dark", background: "#12181f" }}
      >
        <body style={{ background: "#12181f", height: "100%" }}>
          <Main />
          <NextScript />
        </body>
      </html>
    </Html>
  )
}
