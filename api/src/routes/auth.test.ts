import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { before, describe, it } from "node:test";
import request from "supertest";

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eastie-auth-test-"));
process.env.DATABASE_URL = path.join(tempDir, "test.sqlite");
process.env.NODE_ENV = "test";
process.env.BCRYPT_ROUNDS = "4";

const { createApp } = await import("../app.js");
const { db } = await import("../db.js");
const { upsertUser } = await import("../users.js");

const app = createApp();

describe("email code auth", () => {
  before(async () => {
    await upsertUser({
      displayName: "Active Teacher",
      email: "active.teacher@eastie.test",
      password: "teacher-password",
      role: "teacher",
      status: "active",
    });
    await upsertUser({
      displayName: "Disabled Teacher",
      email: "disabled.teacher@eastie.test",
      password: "teacher-password",
      role: "teacher",
      status: "disabled",
    });
    await upsertUser({
      displayName: "Sihai",
      email: "sihai@eastie.com.cn",
      password: "admin-password",
      role: "admin",
      status: "active",
    });
  });

  it("blocks unknown emails from requesting login codes", async () => {
    await request(app)
      .post("/api/auth/request-login-code")
      .send({ email: "unknown@eastie.test" })
      .expect(403);
  });

  it("blocks disabled users from requesting login codes", async () => {
    await request(app)
      .post("/api/auth/request-login-code")
      .send({ email: "disabled.teacher@eastie.test" })
      .expect(403);
  });

  it("allows an active teacher to request and verify a login code", async () => {
    const agent = request.agent(app);
    const requestResponse = await agent
      .post("/api/auth/request-login-code")
      .send({ email: "active.teacher@eastie.test" })
      .expect(200);

    const code = requestResponse.body.dev.loginCode;
    assert.match(code, /^\d{6}$/);

    const verifyResponse = await agent
      .post("/api/auth/verify-login-code")
      .send({ email: "active.teacher@eastie.test", code })
      .expect(200);

    assert.equal(verifyResponse.body.user.email, "active.teacher@eastie.test");

    const meResponse = await agent.get("/api/auth/me").expect(200);
    assert.equal(meResponse.body.user.displayName, "Active Teacher");
  });

  it("rejects wrong login codes", async () => {
    await request(app)
      .post("/api/auth/request-login-code")
      .send({ email: "active.teacher@eastie.test" })
      .expect(200);

    await request(app)
      .post("/api/auth/verify-login-code")
      .send({ email: "active.teacher@eastie.test", code: "000000" })
      .expect(400);

    const row = db.prepare(`
      SELECT attempt_count
      FROM email_login_codes
      WHERE email = ?
        AND used_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1
    `).get("active.teacher@eastie.test") as { attempt_count: number };

    assert.equal(row.attempt_count, 1);
  });

  it("rejects expired login codes", async () => {
    const requestResponse = await request(app)
      .post("/api/auth/request-login-code")
      .send({ email: "active.teacher@eastie.test" })
      .expect(200);

    db.prepare(`
      UPDATE email_login_codes
      SET expires_at = datetime('now', '-1 minute')
      WHERE email = ?
    `).run("active.teacher@eastie.test");

    await request(app)
      .post("/api/auth/verify-login-code")
      .send({ email: "active.teacher@eastie.test", code: requestResponse.body.dev.loginCode })
      .expect(400);
  });

  it("logs out by revoking the session cookie", async () => {
    const agent = request.agent(app);
    const requestResponse = await agent
      .post("/api/auth/request-login-code")
      .send({ email: "active.teacher@eastie.test" })
      .expect(200);

    await agent
      .post("/api/auth/verify-login-code")
      .send({ email: "active.teacher@eastie.test", code: requestResponse.body.dev.loginCode })
      .expect(200);

    await agent.post("/api/auth/logout").expect(200);
    await agent.get("/api/auth/me").expect(401);
  });

  it("allows Sihai to sign in as admin with an email code", async () => {
    const agent = request.agent(app);
    const requestResponse = await agent
      .post("/api/auth/request-login-code")
      .send({ email: "sihai@eastie.com.cn" })
      .expect(200);

    const verifyResponse = await agent
      .post("/api/auth/verify-login-code")
      .send({ email: "sihai@eastie.com.cn", code: requestResponse.body.dev.loginCode })
      .expect(200);

    assert.equal(verifyResponse.body.user.email, "sihai@eastie.com.cn");
    assert.equal(verifyResponse.body.user.role, "admin");
    assert.equal(verifyResponse.body.user.status, "active");
  });
});
