import crypto from "node:crypto";
import type { Response, NextFunction } from "express";
import { config, isProduction } from "./config.js";
import { addDays, hashToken } from "./crypto.js";
import { db } from "./db.js";
import { findUserById, toAuthUser } from "./users.js";
import type { AuthedRequest, AuthMethod } from "./types.js";

interface SessionRow {
  id: string;
  user_id: string;
  token_hash: string;
  auth_method: AuthMethod;
  expires_at: string;
  revoked_at: string | null;
}

export function createSession(userId: string, authMethod: AuthMethod = "password") {
  const token = crypto.randomBytes(32).toString("base64url");
  const sessionId = crypto.randomUUID();
  const expiresAt = addDays(config.sessionDays);

  db.prepare(`
    INSERT INTO sessions (id, user_id, token_hash, auth_method, expires_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(sessionId, userId, hashToken(token), authMethod, expiresAt);

  return { expiresAt, token };
}

export function setSessionCookie(res: Response, token: string) {
  res.cookie(config.cookieName, token, {
    httpOnly: true,
    maxAge: config.sessionDays * 24 * 60 * 60 * 1000,
    sameSite: "lax",
    secure: isProduction,
  });
}

export function clearSessionCookie(res: Response) {
  res.clearCookie(config.cookieName, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
  });
}

export function revokeSessionToken(token?: string) {
  if (!token) return;
  db.prepare("UPDATE sessions SET revoked_at = datetime('now') WHERE token_hash = ? AND revoked_at IS NULL").run(hashToken(token));
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.[config.cookieName];
  if (!token) {
    res.status(401).json({ error: "Authentication required." });
    return;
  }

  const session = db.prepare(`
    SELECT * FROM sessions
    WHERE token_hash = ?
      AND revoked_at IS NULL
      AND expires_at > datetime('now')
  `).get(hashToken(token)) as SessionRow | undefined;

  if (!session) {
    clearSessionCookie(res);
    res.status(401).json({ error: "Session is invalid or expired." });
    return;
  }

  const user = findUserById(session.user_id);
  if (!user) {
    clearSessionCookie(res);
    res.status(401).json({ error: "Session user no longer exists." });
    return;
  }
  if (user.status !== "active") {
    clearSessionCookie(res);
    res.status(403).json({ error: "This EASTIE account is disabled." });
    return;
  }

  req.user = toAuthUser(user);
  req.sessionId = session.id;
  req.authMethod = session.auth_method;
  next();
}

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== "admin") {
    res.status(403).json({ error: "Admin role required." });
    return;
  }
  next();
}
