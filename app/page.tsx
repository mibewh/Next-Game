"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Next.js</h1>
      <p className="text-muted-foreground">
        Get started by editing <code className="bg-muted px-1 py-0.5 rounded">app/page.tsx</code>
      </p>

      {session && (
        <div className="flex justify-center mt-8">
          <Link href="/explore">
            <Button size="lg">Explore</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
