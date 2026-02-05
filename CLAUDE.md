# Next-Game

A Next.js application that wraps a Rust Bevy game compiled to WASM, available to authenticated users.

## Tech Stack

### Frontend (Next.js)
- **Framework**: Next.js 16 with App Router
- **React**: 19.x
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI (shadcn/ui)
- **Package Manager**: pnpm

### Authentication & Data
- **Auth**: NextAuth.js v5 (beta)
- **Database**: better-sqlite3
- **Password Hashing**: bcrypt

### Game Engine (Rust/Bevy)
- **Engine**: Bevy 0.15
- **Target**: WebAssembly (WebGL2)
- **Build Tool**: wasm-pack
- **Location**: `game/` subdirectory

## Project Structure

```
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Shared utilities
├── game/             # Rust Bevy project
│   ├── src/          # Rust source code
│   ├── Cargo.toml    # Rust dependencies
│   └── build.sh      # WASM build script
├── public/game/      # Compiled WASM output
└── data/             # SQLite database
```

## Common Commands

```bash
# Next.js development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm lint             # Run linter

# Build Bevy game to WASM
./game/build.sh       # Full release build (optimized, slow)
./game/build.sh dev   # Dev build (fast)
./game/build.sh fast  # Release without LTO (medium)
```

## Notes

- The WASM game is served from `public/game/` and only accessible to authenticated users
- Game uses WebGL2 for rendering in the browser
