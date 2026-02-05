import type { Metadata } from "next"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/navbar"
import { siteConfig } from "@/lib/config"
import "./globals.css"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
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
