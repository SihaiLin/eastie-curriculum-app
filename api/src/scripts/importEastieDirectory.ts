import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import xlsx from "xlsx";
import { config } from "../config.js";
import { db } from "../db.js";
import type { UserRole } from "../types.js";

const defaultDirectoryPath = "/Users/Lucia/Downloads/伊思迪通讯录.xlsx";
const directoryPath = process.env.EASTIE_DIRECTORY_XLSX ?? defaultDirectoryPath;
const disableUnlisted = process.env.DISABLE_UNLISTED_EASTIE_USERS === "true";
const fallbackPassword = process.env.SEED_FALLBACK_PASSWORD ?? crypto.randomBytes(24).toString("base64url");

const workbook = xlsx.readFile(directoryPath, { cellDates: false });
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rows = xlsx.utils.sheet_to_json<Array<string | number | undefined>>(worksheet, {
  blankrows: false,
  defval: "",
  header: 1,
});

const headerIndex = rows.findIndex((row) => row.some((value) => String(value).trim() === "企业邮箱"));
if (headerIndex < 0) {
  throw new Error(`Could not find 企业邮箱 header row in ${directoryPath}`);
}

const header = rows[headerIndex].map((value) => String(value).trim());
const nameIndex = header.indexOf("姓名");
const emailIndex = header.indexOf("企业邮箱");
const eastieSpaceIndexes = header
  .map((value, index) => ({ index, value }))
  .filter((item) => item.value === "EASTIE Space")
  .map((item) => item.index);

if (nameIndex < 0 || emailIndex < 0 || eastieSpaceIndexes.length === 0) {
  throw new Error("Directory sheet must contain 姓名, 企业邮箱, and EASTIE Space columns.");
}

const activeUsers = new Map<string, { displayName: string; email: string; role: UserRole }>();

for (const row of rows.slice(headerIndex + 1)) {
  const displayName = String(row[nameIndex] ?? "").trim();
  const email = String(row[emailIndex] ?? "").trim().toLowerCase();
  if (!displayName || !email.endsWith("@eastie.com.cn")) continue;

  const markers = eastieSpaceIndexes.map((index) => String(row[index] ?? "").trim().toLowerCase());
  const hasAdmin = markers.includes("admin");
  const hasActive = markers.includes("active");
  if (!hasAdmin && !hasActive) continue;

  activeUsers.set(email, {
    displayName,
    email,
    role: hasAdmin ? "admin" : "teacher",
  });
}

const passwordHash = await bcrypt.hash(fallbackPassword, config.bcryptRounds);
const importedAt = new Date().toISOString().slice(0, 19).replace("T", " ");

const upsert = db.prepare(`
  INSERT INTO users (id, email, display_name, role, status, password_hash)
  VALUES (@id, @email, @displayName, @role, 'active', @passwordHash)
  ON CONFLICT(email) DO UPDATE SET
    display_name = excluded.display_name,
    role = excluded.role,
    status = 'active',
    updated_at = datetime('now')
`);

const existing = db.prepare("SELECT id FROM users WHERE email = ?").pluck();
const importMany = db.transaction(() => {
  for (const user of activeUsers.values()) {
    upsert.run({
      displayName: user.displayName,
      email: user.email,
      id: existing.get(user.email) ?? crypto.randomUUID(),
      passwordHash,
      role: user.role,
    });
  }

  if (disableUnlisted) {
    const placeholders = [...activeUsers.keys()].map(() => "?").join(", ");
    if (placeholders) {
      db.prepare(`
        UPDATE users
        SET status = 'disabled', updated_at = datetime('now')
        WHERE email LIKE '%@eastie.com.cn'
          AND email NOT IN (${placeholders})
      `).run(...activeUsers.keys());
    }
  }
});

importMany();

const roleCounts = [...activeUsers.values()].reduce(
  (counts, user) => {
    counts[user.role] += 1;
    return counts;
  },
  { admin: 0, teacher: 0 },
);

console.info("Imported EASTIE Space allowlist", {
  activeUsers: activeUsers.size,
  admins: roleCounts.admin,
  disableUnlisted,
  directoryPath,
  importedAt,
  sheetName,
  teachers: roleCounts.teacher,
});

if (!process.env.SEED_FALLBACK_PASSWORD) {
  console.info("Generated temporary password fallback for imported users. Email-code login is the default; set SEED_FALLBACK_PASSWORD if you need known password fallback.");
}
