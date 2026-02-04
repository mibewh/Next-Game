"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

interface AuthFormProps {
  mode?: "signin" | "signup"
  callbackUrl?: string
}

export function AuthForm({ mode = "signin", callbackUrl = "/" }: AuthFormProps) {
  const [isSignUp, setIsSignUp] = useState(mode === "signup")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isSignUp) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || "Registration failed")
          setLoading(false)
          return
        }

        await signIn("credentials", { email, password, callbackUrl })
      } else {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          setError("Invalid email or password")
          setLoading(false)
          return
        }

        window.location.href = callbackUrl
      }
    } catch {
      setError("An error occurred")
      setLoading(false)
    }
  }

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "300px",
    margin: "1rem 0",
  }

  const inputStyle: React.CSSProperties = {
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  }

  const buttonStyle: React.CSSProperties = {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#0070f3",
    color: "white",
  }

  const linkStyle: React.CSSProperties = {
    color: "#0070f3",
    cursor: "pointer",
    textDecoration: "underline",
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "inherit",
  }

  return (
    <div>
      <h2>{isSignUp ? "Create Account" : "Sign In"}</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={inputStyle}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          style={inputStyle}
        />

        {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      <p>
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp)
            setError("")
          }}
          style={linkStyle}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>

      <div style={{ marginTop: "1rem" }}>
        <p style={{ color: "#666" }}>Or continue with:</p>
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl })}
          style={{ ...buttonStyle, backgroundColor: "#4285f4" }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
