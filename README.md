# Next-Game

A web application featuring a Bevy game engine running in the browser via WebAssembly, wrapped in a Next.js frontend with user authentication.

## Features

- Rust game built with Bevy 0.15, compiled to WebAssembly
- WebGL2 rendering in the browser
- User authentication with secure sessions
- Modern React 19 frontend with Tailwind CSS

## Prerequisites

- Node.js 20+
- pnpm
- Rust toolchain with `wasm32-unknown-unknown` target
- wasm-pack

### Installing Rust WASM Tools

```bash
rustup target add wasm32-unknown-unknown
cargo install wasm-pack
```

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

3. **Build the game**
   ```bash
   ./game/build.sh dev    # Fast dev build
   # or
   ./game/build.sh        # Optimized release build
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/              # Next.js pages and API routes
├── components/       # React components
├── lib/              # Shared utilities
├── game/             # Rust Bevy game source
│   ├── src/          # Game code
│   └── build.sh      # WASM build script
├── public/game/      # Compiled WASM artifacts
└── data/             # Local database
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run production server |
| `pnpm lint` | Run ESLint |
| `./game/build.sh` | Build game (release) |
| `./game/build.sh dev` | Build game (dev, faster) |
| `./game/build.sh fast` | Build game (release, no LTO) |

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **UI**: Radix UI / shadcn components
- **Auth**: NextAuth.js v5
- **Database**: SQLite (better-sqlite3)
- **Game**: Rust, Bevy 0.15, WebAssembly

## License

MIT
