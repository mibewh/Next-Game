import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ExplorePage() {
  const session = await auth()

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Explore</h1>
      <p className="text-muted-foreground">
        Welcome, {session.user?.name}! This page is only visible to authenticated users.
      </p>
    </div>
  )
}
