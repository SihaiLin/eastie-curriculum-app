import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { before, describe, it } from "node:test";
import request from "supertest";

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eastie-language-overrides-test-"));
process.env.DATABASE_URL = path.join(tempDir, "test.sqlite");
process.env.NODE_ENV = "test";
process.env.BCRYPT_ROUNDS = "4";

const { createApp } = await import("../app.js");
const { upsertUser } = await import("../users.js");

const app = createApp();

describe("language lesson overrides", () => {
  const teacher = request.agent(app);

  before(async () => {
    await upsertUser({
      displayName: "Teacher Preview",
      email: "teacher-overrides@eastie.test",
      password: "teacher-password",
      role: "teacher",
    });

    await teacher.post("/api/auth/login").send({
      email: "teacher-overrides@eastie.test",
      password: "teacher-password",
    }).expect(200);
  });

  it("allows PG language lesson text overrides", async () => {
    const response = await teacher
      .put("/api/pg/language/units/pg-language-unit-01/lessons/day_01/overrides")
      .send({
        fieldKey: "Lesson Outcome",
        value: {
          type: "text",
          text: "Learners can join the greeting routine with teacher support.",
        },
      })
      .expect(200);

    assert.equal(response.body.override.fieldKey, "Lesson Outcome");
    assert.equal(response.body.override.value.type, "text");
    assert.equal(response.body.override.value.text, "Learners can join the greeting routine with teacher support.");
  });

  it("allows PK language lesson item overrides", async () => {
    const response = await teacher
      .put("/api/pk/language/units/pk-language-unit-01/lessons/day_01/overrides")
      .send({
        fieldKey: "Keywords",
        value: {
          type: "items",
          items: ["hello", "teacher"],
        },
      })
      .expect(200);

    assert.deepEqual(response.body.override.value.items, ["hello", "teacher"]);
  });

  it("allows empty item overrides", async () => {
    const response = await teacher
      .put("/api/k1/language/units/k1-language-unit-01/lessons/day_01/overrides")
      .send({
        fieldKey: "Target Language",
        value: {
          type: "items",
          items: [],
        },
      })
      .expect(200);

    assert.deepEqual(response.body.override.value.items, []);
  });
});
