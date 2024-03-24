import type { Metadata } from "next"

import { Inter } from "next/font/google"
import "@uploadthing/react/styles.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Providers } from "./providers"

import "modern-normalize/modern-normalize.css"
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "learn-web"
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body className={inter.className}>
          <div className="primaryBackGround">
            <Providers>{children}</Providers>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
