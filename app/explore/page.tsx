import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { BevyGame } from "@/components/bevy-game"

export default async function ExplorePage() {
  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Explore</h1>
      <p className="text-muted-foreground mb-4">
        Welcome, {session.user?.name}!
      </p>
      <div className="rounded-lg overflow-hidden border">
        <BevyGame className="w-full h-[600px]" />
      </div>
    </div>
  )
}
