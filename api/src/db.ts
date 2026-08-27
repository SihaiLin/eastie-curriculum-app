import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { config } from "./config.js";

fs.mkdirSync(path.dirname(config.databaseUrl), { recursive: true });

export const db = new Database(config.databaseUrl);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      display_name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'teacher')),
      status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      auth_method TEXT NOT NULL DEFAULT 'password' CHECK (auth_method IN ('email_code', 'password')),
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      revoked_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_password_reset_hash ON password_reset_tokens(token_hash);
    CREATE INDEX IF NOT EXISTS idx_password_reset_user_id ON password_reset_tokens(user_id);

    CREATE TABLE IF NOT EXISTS email_login_codes (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL COLLATE NOCASE,
      code_hash TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      used_at TEXT,
      attempt_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_email_login_codes_email
      ON email_login_codes(email, expires_at);
    CREATE INDEX IF NOT EXISTS idx_email_login_codes_hash
      ON email_login_codes(code_hash);

    CREATE TABLE IF NOT EXISTS lesson_feedback (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      user_email TEXT,
      user_display_name TEXT,
      user_role TEXT CHECK (user_role IN ('admin', 'teacher') OR user_role IS NULL),
      unit_id TEXT NOT NULL,
      unit_title TEXT NOT NULL,
      level TEXT NOT NULL CHECK (level IN ('PG', 'PK', 'K1', 'K2', 'K3')),
      course_type TEXT NOT NULL CHECK (course_type IN ('language', 'non-language')),
      unit_number INTEGER NOT NULL,
      course_code TEXT NOT NULL,
      course_title TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      lesson_title TEXT NOT NULL,
      page_url TEXT NOT NULL,
      language TEXT CHECK (language IN ('en', 'zh') OR language IS NULL),
      message TEXT NOT NULL,
      category TEXT CHECK (category IN ('content', 'translation', 'layout', 'bug', 'other') OR category IS NULL),
      status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'reviewed', 'resolved')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_feedback_unit ON lesson_feedback(unit_id);
    CREATE INDEX IF NOT EXISTS idx_feedback_course ON lesson_feedback(course_code);
    CREATE INDEX IF NOT EXISTS idx_feedback_lesson ON lesson_feedback(lesson_id);
    CREATE INDEX IF NOT EXISTS idx_feedback_status ON lesson_feedback(status);
    CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON lesson_feedback(user_id);

    CREATE TABLE IF NOT EXISTS language_lesson_extensions (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      user_email TEXT,
      user_display_name TEXT,
      user_role TEXT CHECK (user_role IN ('admin', 'teacher') OR user_role IS NULL),
      level TEXT NOT NULL CHECK (level IN ('k1', 'k2', 'k3')),
      unit_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      extension_type TEXT NOT NULL CHECK (extension_type IN ('vocabulary', 'sentence', 'activity_idea')),
      content TEXT NOT NULL,
      source TEXT NOT NULL CHECK (source IN ('manual', 'yle_word_bank')),
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'archived')),
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_language_extensions_lesson
      ON language_lesson_extensions(level, unit_id, lesson_id);
    CREATE INDEX IF NOT EXISTS idx_language_extensions_user
      ON language_lesson_extensions(user_id);

    CREATE TABLE IF NOT EXISTS language_lesson_reports (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      user_email TEXT,
      user_display_name TEXT,
      user_role TEXT CHECK (user_role IN ('admin', 'teacher') OR user_role IS NULL),
      level TEXT NOT NULL CHECK (level IN ('k1', 'k2', 'k3')),
      unit_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      field TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'reviewed', 'resolved', 'dismissed')),
      resolution_note TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_language_reports_lesson
      ON language_lesson_reports(level, unit_id, lesson_id);
    CREATE INDEX IF NOT EXISTS idx_language_reports_user
      ON language_lesson_reports(user_id);

    CREATE TABLE IF NOT EXISTS language_lesson_overrides (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      user_email TEXT,
      user_display_name TEXT,
      user_role TEXT CHECK (user_role IN ('admin', 'teacher') OR user_role IS NULL),
      level TEXT NOT NULL CHECK (level IN ('pg', 'pk', 'k1', 'k2', 'k3')),
      unit_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      field_key TEXT NOT NULL,
      value_type TEXT NOT NULL CHECK (value_type IN ('text', 'items')),
      text_value TEXT,
      items_json TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, level, unit_id, lesson_id, field_key)
    );

    CREATE INDEX IF NOT EXISTS idx_language_overrides_lesson
      ON language_lesson_overrides(level, unit_id, lesson_id);
    CREATE INDEX IF NOT EXISTS idx_language_overrides_user
      ON language_lesson_overrides(user_id);
  `);

  addColumnIfMissing("users", "status", "TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled'))");
  addColumnIfMissing("sessions", "auth_method", "TEXT NOT NULL DEFAULT 'password' CHECK (auth_method IN ('email_code', 'password'))");
  widenLanguageOverrideLevels();
}

migrate();

function addColumnIfMissing(tableName: string, columnName: string, definition: string) {
  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all() as Array<{ name: string }>;
  if (columns.some((column) => column.name === columnName)) return;
  db.prepare(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`).run();
}

function widenLanguageOverrideLevels() {
  const row = db.prepare(`
    SELECT sql
    FROM sqlite_master
    WHERE type = 'table'
      AND name = 'language_lesson_overrides'
  `).get() as { sql?: string } | undefined;

  if (!row?.sql || row.sql.includes("'pg'")) return;

  db.exec(`
    DROP INDEX IF EXISTS idx_language_overrides_lesson;
    DROP INDEX IF EXISTS idx_language_overrides_user;

    ALTER TABLE language_lesson_overrides RENAME TO language_lesson_overrides_old;

    CREATE TABLE language_lesson_overrides (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      user_email TEXT,
      user_display_name TEXT,
      user_role TEXT CHECK (user_role IN ('admin', 'teacher') OR user_role IS NULL),
      level TEXT NOT NULL CHECK (level IN ('pg', 'pk', 'k1', 'k2', 'k3')),
      unit_id TEXT NOT NULL,
      lesson_id TEXT NOT NULL,
      field_key TEXT NOT NULL,
      value_type TEXT NOT NULL CHECK (value_type IN ('text', 'items')),
      text_value TEXT,
      items_json TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(user_id, level, unit_id, lesson_id, field_key)
    );

    INSERT INTO language_lesson_overrides (
      id, user_id, user_email, user_display_name, user_role,
      level, unit_id, lesson_id, field_key, value_type, text_value, items_json,
      created_at, updated_at
    )
    SELECT
      id, user_id, user_email, user_display_name, user_role,
      level, unit_id, lesson_id, field_key, value_type, text_value, items_json,
      created_at, updated_at
    FROM language_lesson_overrides_old;

    DROP TABLE language_lesson_overrides_old;

    CREATE INDEX IF NOT EXISTS idx_language_overrides_lesson
      ON language_lesson_overrides(level, unit_id, lesson_id);
    CREATE INDEX IF NOT EXISTS idx_language_overrides_user
      ON language_lesson_overrides(user_id);
  `);
}
