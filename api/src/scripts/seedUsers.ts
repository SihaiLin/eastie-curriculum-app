const isProduction = process.env.NODE_ENV === "production";
const allowDemoSeed = process.env.ALLOW_DEMO_SEED === "true";
const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@eastie.demo";
const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "demo-password";
const teacherEmail = process.env.SEED_TEACHER_EMAIL ?? "teacher@eastie.demo";
const teacherPassword = process.env.SEED_TEACHER_PASSWORD ?? "demo-password";
const disabledTeacherEmail = process.env.SEED_DISABLED_TEACHER_EMAIL;

if (isProduction && !allowDemoSeed) {
  console.error("Refusing to seed demo users in production. Set ALLOW_DEMO_SEED=true only for an intentional one-off operation.");
  process.exit(1);
}

const { upsertUser } = await import("../users.js");

await upsertUser({
  displayName: "Admin Preview",
  email: adminEmail,
  password: adminPassword,
  role: "admin",
  status: "active",
});

await upsertUser({
  displayName: "Teacher Preview",
  email: teacherEmail,
  password: teacherPassword,
  role: "teacher",
  status: "active",
});

if (disabledTeacherEmail) {
  await upsertUser({
    displayName: "Disabled Teacher Preview",
    email: disabledTeacherEmail,
    password: process.env.SEED_DISABLED_TEACHER_PASSWORD ?? "demo-password",
    role: "teacher",
    status: "disabled",
  });
}

console.info("Seeded EASTIE users", {
  adminEmail,
  disabledTeacherEmail,
  teacherEmail,
});
