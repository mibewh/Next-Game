"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <button disabled>Loading...</button>
  }

  if (session) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {session.user?.image && (
          <img
            src={session.user.image}
            alt="Profile"
            style={{ width: 32, height: 32, borderRadius: "50%" }}
          />
        )}
        <span>{session.user?.name}</span>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <Link href="/auth/signin">
      <button>Sign in</button>
    </Link>
  )
}
