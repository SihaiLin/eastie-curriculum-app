import crypto from "node:crypto";

export function createOpaqueToken() {
  return crypto.randomBytes(32).toString("base64url");
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function nowIso() {
  return toSqliteDateTime(new Date());
}

export function addMinutes(minutes: number) {
  return toSqliteDateTime(new Date(Date.now() + minutes * 60 * 1000));
}

export function addDays(days: number) {
  return toSqliteDateTime(new Date(Date.now() + days * 24 * 60 * 60 * 1000));
}

function toSqliteDateTime(date: Date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}
