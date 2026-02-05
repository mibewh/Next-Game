"use client"

import { useEffect, useState } from "react"

interface BevyGameProps {
  className?: string
}

export function BevyGame({ className }: BevyGameProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadGame() {
      try {
        // Check if game files exist by trying to fetch the JS
        const response = await fetch("/game/game.js", { method: "HEAD" })
        if (!response.ok) {
          setError("Game not built. Run: cd game && ./build.sh")
          setLoading(false)
          return
        }

        console.log("[BevyGame] Loading game module...")

        // Dynamically import the ES module
        // @ts-expect-error - runtime dynamic import from public folder
        const game = await import(/* webpackIgnore: true */ "/game/game.js")

        console.log("[BevyGame] Module loaded, exports:", Object.keys(game))
        console.log("[BevyGame] Calling default()...")

        await game.default()

        console.log("[BevyGame] Game initialized successfully")
        setLoading(false)
      } catch (err) {
        // Bevy uses this exception for control flow in WASM - it's not a real error
        if (err instanceof Error && err.message.includes("Using exceptions for control flow")) {
          console.log("[BevyGame] Game initialized (Bevy control flow exception - this is normal)")
          setLoading(false)
          return
        }

        console.error("[BevyGame] Failed to load game:", err)
        const errorMessage = err instanceof Error
          ? `${err.name}: ${err.message}`
          : String(err)
        setError(errorMessage)
        setLoading(false)
      }
    }

    loadGame()
  }, [])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`}>
        <div className="text-center p-4 max-w-lg">
          <p className="text-destructive font-mono text-sm whitespace-pre-wrap break-all">
            {error}
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Check browser console (F12) for more details
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <p className="text-muted-foreground">Loading game...</p>
        </div>
      )}
      <canvas
        id="game-canvas"
        className="w-full h-full block"
      />
    </div>
  )
}
