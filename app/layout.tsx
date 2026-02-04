import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/navbar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Next.js App",
  description: "Created with Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
