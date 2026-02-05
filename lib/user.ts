import bcrypt from "bcrypt"
import { getDb } from "./db"

const SALT_ROUNDS = 10

export interface User {
  id: number
  username: string
  email: string
  password_hash: string
  created_at: string
}

export async function createUser(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const db = getDb()
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  const stmt = db.prepare(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)"
  )
  const result = stmt.run(username, email.toLowerCase(), passwordHash)

  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(result.lastInsertRowid) as User | undefined

  if (!user) throw new Error("Failed to create user")
  return user
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = getDb()
  return db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email.toLowerCase()) as User | undefined
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
