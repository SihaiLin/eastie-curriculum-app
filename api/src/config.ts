import "dotenv/config";
import path from "node:path";

const rootDir = path.resolve(process.cwd());

export const config = {
  appUrl: process.env.APP_URL ?? "http://localhost:5173",
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 12),
  cookieName: process.env.SESSION_COOKIE_NAME ?? "eastie_session",
  databaseUrl: process.env.DATABASE_URL ?? path.join(rootDir, "db", "eastie.sqlite"),
  emailFrom: process.env.EMAIL_FROM ?? "EASTIE Curriculum <no-reply@eastie.local>",
  loginCodeMinutes: Number(process.env.LOGIN_CODE_MINUTES ?? 10),
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  resetTokenMinutes: Number(process.env.RESET_TOKEN_MINUTES ?? 30),
  sessionDays: Number(process.env.SESSION_DAYS ?? 7),
  smtpHost: process.env.SMTP_HOST,
  smtpPass: process.env.SMTP_PASS,
  smtpPort: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined,
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER,
};

export const isProduction = config.nodeEnv === "production";
