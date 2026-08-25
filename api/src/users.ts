import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { db } from "./db.js";
import { config } from "./config.js";
import type { AuthUser, UserRole, UserStatus } from "./types.js";

interface UserRow {
  id: string;
  email: string;
  display_name: string;
  role: UserRole;
  status: UserStatus;
  password_hash: string;
}

export function toAuthUser(row: UserRow): AuthUser {
  return {
    id: row.id,
    displayName: row.display_name,
    email: row.email,
    role: row.role,
    status: row.status,
  };
}

export function findUserByEmail(email: string): UserRow | undefined {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email.trim().toLowerCase()) as UserRow | undefined;
}

export function findUserById(id: string): UserRow | undefined {
  return db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRow | undefined;
}

export async function verifyPassword(user: UserRow, password: string) {
  return bcrypt.compare(password, user.password_hash);
}

export async function setUserPassword(userId: string, password: string) {
  const passwordHash = await bcrypt.hash(password, config.bcryptRounds);
  db.prepare("UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?").run(passwordHash, userId);
}

export async function upsertUser(input: {
  displayName: string;
  email: string;
  password: string;
  role: UserRole;
  status?: UserStatus;
}) {
  const passwordHash = await bcrypt.hash(input.password, config.bcryptRounds);
  const existing = findUserByEmail(input.email);
  const id = existing?.id ?? crypto.randomUUID();

  db.prepare(`
    INSERT INTO users (id, email, display_name, role, status, password_hash)
    VALUES (@id, @email, @displayName, @role, @status, @passwordHash)
    ON CONFLICT(email) DO UPDATE SET
      display_name = excluded.display_name,
      role = excluded.role,
      status = @status,
      password_hash = excluded.password_hash,
      updated_at = datetime('now')
  `).run({
    displayName: input.displayName,
    email: input.email.trim().toLowerCase(),
    id,
    passwordHash,
    role: input.role,
    status: input.status ?? "active",
  });

  return toAuthUser(findUserById(id)!);
}
