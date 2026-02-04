import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"
import path from "path"

let db: Database | null = null

export async function getDb(): Promise<Database> {
  if (db) return db

  const dbPath = path.join(process.cwd(), "data", "users.db")

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  })

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
}
