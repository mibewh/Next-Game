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
  const db = await getDb()
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  const result = await db.run(
    "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
    [username, email.toLowerCase(), passwordHash]
  )

  const user = await db.get<User>("SELECT * FROM users WHERE id = ?", [
    result.lastID,
  ])

  if (!user) throw new Error("Failed to create user")
  return user
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDb()
  return db.get<User>("SELECT * FROM users WHERE email = ?", [
    email.toLowerCase(),
  ])
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}
