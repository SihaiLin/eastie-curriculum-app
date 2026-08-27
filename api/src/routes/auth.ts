import { Router } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { config } from "../config.js";
import { addMinutes, createOpaqueToken, hashToken } from "../crypto.js";
import { db } from "../db.js";
import { sendLoginCodeEmail, sendPasswordResetEmail } from "../email.js";
import { clearSessionCookie, createSession, requireAuth, revokeSessionToken, setSessionCookie } from "../sessions.js";
import { findUserByEmail, findUserById, setUserPassword, toAuthUser, verifyPassword } from "../users.js";
import type { AuthedRequest } from "../types.js";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const requestLoginCodeSchema = z.object({
  email: z.string().email(),
});

const verifyLoginCodeSchema = z.object({
  email: z.string().email(),
  code: z.string().regex(/^\d{6}$/),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  token: z.string().min(20),
  newPassword: z.string().trim().min(1),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().trim().min(1),
});

const setPasswordSchema = z.object({
  newPassword: z.string().trim().min(1),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Valid email and password are required." });
    return;
  }

  const user = findUserByEmail(parsed.data.email);
  if (user?.status === "disabled") {
    res.status(403).json({ error: "This EASTIE account is disabled." });
    return;
  }
  if (!user || !(await verifyPassword(user, parsed.data.password))) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }

  const session = createSession(user.id, "password");
  setSessionCookie(res, session.token);
  res.json({ user: toAuthUser(user) });
});

router.post("/request-login-code", async (req, res) => {
  const parsed = requestLoginCodeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Valid email is required." });
    return;
  }

  const email = normalizeEmail(parsed.data.email);
  const user = findUserByEmail(email);
  if (!user) {
    res.status(403).json({ error: "This email is not on the EASTIE teacher allowlist." });
    return;
  }
  if (user.status !== "active") {
    res.status(403).json({ error: "This EASTIE account is disabled." });
    return;
  }

  db.prepare(`
    UPDATE email_login_codes
    SET used_at = datetime('now')
    WHERE email = ?
      AND used_at IS NULL
  `).run(email);

  const code = createSixDigitCode();
  db.prepare(`
    INSERT INTO email_login_codes (id, email, code_hash, expires_at)
    VALUES (?, ?, ?, ?)
  `).run(crypto.randomUUID(), email, hashLoginCode(email, code), addMinutes(config.loginCodeMinutes));

  try {
    await sendLoginCodeEmail(email, code);
  } catch (error) {
    console.error("Failed to send EASTIE login code", {
      email,
      error: error instanceof Error ? error.message : String(error),
    });
    res.status(502).json({ error: "Could not send login code. Please try again later or contact EASTIE admin." });
    return;
  }

  const response: {
    ok: true;
    message: string;
    dev?: { loginCode: string };
  } = {
    ok: true,
    message: `A login code was sent to ${email}.`,
  };

  if (!config.smtpHost && config.nodeEnv !== "production") {
    response.dev = { loginCode: code };
  }

  res.json(response);
});

router.post("/verify-login-code", (req, res) => {
  const parsed = verifyLoginCodeSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Valid email and 6-digit code are required." });
    return;
  }

  const email = normalizeEmail(parsed.data.email);
  const user = findUserByEmail(email);
  if (!user) {
    res.status(403).json({ error: "This email is not on the EASTIE teacher allowlist." });
    return;
  }
  if (user.status !== "active") {
    res.status(403).json({ error: "This EASTIE account is disabled." });
    return;
  }

  const loginCode = db.prepare(`
    SELECT *
    FROM email_login_codes
    WHERE email = ?
      AND used_at IS NULL
    ORDER BY created_at DESC
    LIMIT 1
  `).get(email) as { id: string; attempt_count: number; code_hash: string; expires_at: string } | undefined;

  if (!loginCode) {
    res.status(400).json({ error: "Login code is invalid or expired." });
    return;
  }

  if (loginCode.expires_at <= new Date().toISOString().slice(0, 19).replace("T", " ")) {
    res.status(400).json({ error: "Login code is invalid or expired." });
    return;
  }

  if (loginCode.attempt_count >= 5) {
    res.status(429).json({ error: "Too many attempts. Please request a new login code." });
    return;
  }

  if (loginCode.code_hash !== hashLoginCode(email, parsed.data.code)) {
    db.prepare("UPDATE email_login_codes SET attempt_count = attempt_count + 1 WHERE id = ?").run(loginCode.id);
    res.status(400).json({ error: "Login code is incorrect." });
    return;
  }

  db.prepare("UPDATE email_login_codes SET used_at = datetime('now') WHERE id = ?").run(loginCode.id);
  const session = createSession(user.id, "email_code");
  setSessionCookie(res, session.token);
  res.json({ user: toAuthUser(user) });
});

router.get("/me", requireAuth, (req: AuthedRequest, res) => {
  res.json({ user: req.user });
});

router.post("/logout", (req, res) => {
  revokeSessionToken(req.cookies?.[config.cookieName]);
  clearSessionCookie(res);
  res.json({ ok: true });
});

router.post("/forgot-password", async (req, res) => {
  const parsed = forgotPasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Valid email is required." });
    return;
  }

  const user = findUserByEmail(parsed.data.email);
  if (user) {
    const token = createOpaqueToken();
    db.prepare(`
      INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at)
      VALUES (?, ?, ?, ?)
    `).run(crypto.randomUUID(), user.id, hashToken(token), addMinutes(config.resetTokenMinutes));

    const resetUrl = `${config.appUrl}/login?resetToken=${encodeURIComponent(token)}`;
    await sendPasswordResetEmail(user.email, resetUrl);
  }

  res.json({ ok: true, message: "If that email belongs to an EASTIE account, a reset link will be sent." });
});

router.post("/reset-password", async (req, res) => {
  const parsed = resetPasswordSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Reset token and a new password are required." });
    return;
  }

  const tokenHash = hashToken(parsed.data.token);
  const reset = db.prepare(`
    SELECT * FROM password_reset_tokens
    WHERE token_hash = ?
      AND used_at IS NULL
      AND expires_at > datetime('now')
  `).get(tokenHash) as { id: string; user_id: string } | undefined;

  if (!reset) {
    res.status(400).json({ error: "Reset token is invalid or expired." });
    return;
  }

  const user = findUserById(reset.user_id);
  if (!user) {
    res.status(400).json({ error: "Reset token user no longer exists." });
    return;
  }

  await setUserPassword(user.id, parsed.data.newPassword);
  db.prepare("UPDATE password_reset_tokens SET used_at = datetime('now') WHERE id = ?").run(reset.id);
  db.prepare("UPDATE sessions SET revoked_at = datetime('now') WHERE user_id = ? AND revoked_at IS NULL").run(user.id);

  res.json({ ok: true, message: "Password has been reset. Please sign in with the new password." });
});

router.post("/change-password", requireAuth, async (req: AuthedRequest, res) => {
  const parsed = changePasswordSchema.safeParse(req.body);
  if (!parsed.success || !req.user) {
    res.status(400).json({ error: "Current password and a new password are required." });
    return;
  }

  const user = findUserById(req.user.id);
  if (!user || !(await verifyPassword(user, parsed.data.currentPassword))) {
    res.status(400).json({ error: "Current password is incorrect." });
    return;
  }

  await setUserPassword(user.id, parsed.data.newPassword);
  db.prepare("UPDATE sessions SET revoked_at = datetime('now') WHERE user_id = ? AND id <> ? AND revoked_at IS NULL").run(user.id, req.sessionId);

  res.json({ ok: true, message: "Password changed." });
});

router.post("/set-password", requireAuth, async (req: AuthedRequest, res) => {
  const parsed = setPasswordSchema.safeParse(req.body);
  if (!parsed.success || !req.user) {
    res.status(400).json({ error: "New password is required." });
    return;
  }
  if (req.authMethod !== "email_code") {
    res.status(403).json({ error: "Please verify your email with a login code before setting a password." });
    return;
  }

  await setUserPassword(req.user.id, parsed.data.newPassword);
  db.prepare("UPDATE sessions SET revoked_at = datetime('now') WHERE user_id = ? AND id <> ? AND revoked_at IS NULL").run(req.user.id, req.sessionId);

  res.json({ ok: true, message: "Password saved. You can use it next time with your email." });
});

export const authRouter = router;

function createSixDigitCode() {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

function hashLoginCode(email: string, code: string) {
  return hashToken(`${normalizeEmail(email)}:${code}`);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}
