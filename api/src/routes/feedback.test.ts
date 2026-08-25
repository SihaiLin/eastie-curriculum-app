import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { before, describe, it } from "node:test";
import request from "supertest";

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "eastie-api-test-"));
process.env.DATABASE_URL = path.join(tempDir, "test.sqlite");
process.env.NODE_ENV = "test";
process.env.BCRYPT_ROUNDS = "4";

const { createApp } = await import("../app.js");
const { upsertUser } = await import("../users.js");

const app = createApp();

const feedbackPayload = {
  context: {
    course_code: "A",
    course_title: "Exploring Weather",
    course_type: "non-language",
    language: "en",
    lesson_id: "pg-u08-course-a-lesson-01",
    lesson_title: "Cloud Watch",
    level: "PG",
    page_url: "/curriculum/pg/non-language/unit-08/course-a",
    unit_id: "pg-non-language-unit-08",
    unit_number: 8,
    unit_title: "Nature, Weather and Animals",
  },
  category: "content",
  message: "The activity timing needs a little more room.",
  status: "resolved",
};

describe("feedback integration", () => {
  const teacher = request.agent(app);
  const admin = request.agent(app);
  let feedbackId = "";

  before(async () => {
    await upsertUser({
      displayName: "Teacher Preview",
      email: "teacher@eastie.test",
      password: "teacher-password",
      role: "teacher",
    });
    await upsertUser({
      displayName: "Admin Preview",
      email: "admin@eastie.test",
      password: "admin-password",
      role: "admin",
    });

    await teacher.post("/api/auth/login").send({
      email: "teacher@eastie.test",
      password: "teacher-password",
    }).expect(200);
    await admin.post("/api/auth/login").send({
      email: "admin@eastie.test",
      password: "admin-password",
    }).expect(200);
  });

  it("allows a teacher to create feedback and ignores client-provided resolved status", async () => {
    const response = await teacher.post("/api/feedback").send(feedbackPayload).expect(201);

    feedbackId = response.body.feedback.id;
    assert.equal(response.body.feedback.status, "open");
    assert.equal(response.body.feedback.user.email, "teacher@eastie.test");
  });

  it("blocks teachers from listing feedback", async () => {
    await teacher.get("/api/feedback").expect(403);
  });

  it("allows admins to list feedback", async () => {
    const response = await admin.get("/api/feedback").expect(200);

    assert.ok(response.body.feedback.length >= 1);
    assert.equal(response.body.feedback[0].id, feedbackId);
  });

  it("allows admins to filter feedback", async () => {
    const matching = await admin.get("/api/feedback?unit_id=pg-non-language-unit-08&status=open").expect(200);
    const nonMatching = await admin.get("/api/feedback?lesson_id=no-such-lesson").expect(200);

    assert.ok(matching.body.feedback.some((item: { id: string }) => item.id === feedbackId));
    assert.equal(nonMatching.body.feedback.length, 0);
  });

  it("allows admins to patch feedback status", async () => {
    const response = await admin.patch(`/api/feedback/${feedbackId}`).send({ status: "reviewed" }).expect(200);

    assert.equal(response.body.feedback.status, "reviewed");
  });
});
