import { AuthButton } from "@/components/auth-button"

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Welcome to Next.js</h1>
      <AuthButton />
      <p style={{ marginTop: "1rem" }}>
        Get started by editing <code>app/page.tsx</code>
      </p>
    </main>
  )
}
