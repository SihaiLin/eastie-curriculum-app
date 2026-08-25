import { Router } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { db } from "../db.js";
import { requireAdmin, requireAuth } from "../sessions.js";
import type { AuthedRequest } from "../types.js";

const router = Router();

const feedbackContextSchema = z.object({
  unit_id: z.string().min(1),
  unit_title: z.string().min(1),
  level: z.enum(["PG", "PK", "K1", "K2", "K3"]),
  course_type: z.enum(["language", "non-language"]),
  unit_number: z.number().int().positive(),
  course_code: z.string().min(1),
  course_title: z.string().min(1),
  lesson_id: z.string().min(1),
  lesson_title: z.string().min(1),
  page_url: z.string().min(1),
  language: z.enum(["en", "zh"]).optional(),
});

const createFeedbackSchema = z.object({
  context: feedbackContextSchema,
  message: z.string().trim().min(1),
  category: z.enum(["content", "translation", "layout", "bug", "other"]).optional(),
});

const patchFeedbackSchema = z.object({
  status: z.enum(["open", "reviewed", "resolved"]).optional(),
  category: z.enum(["content", "translation", "layout", "bug", "other"]).nullable().optional(),
  message: z.string().trim().min(1).optional(),
});

router.post("/", requireAuth, (req: AuthedRequest, res) => {
  const parsed = createFeedbackSchema.safeParse(req.body);
  if (!parsed.success || !req.user) {
    res.status(400).json({ error: "Valid feedback context and message are required." });
    return;
  }

  const id = crypto.randomUUID();
  const { context, message, category } = parsed.data;
  const status = "open";

  db.prepare(`
    INSERT INTO lesson_feedback (
      id, user_id, user_email, user_display_name, user_role,
      unit_id, unit_title, level, course_type, unit_number,
      course_code, course_title, lesson_id, lesson_title, page_url,
      language, message, category, status
    )
    VALUES (
      @id, @userId, @userEmail, @userDisplayName, @userRole,
      @unitId, @unitTitle, @level, @courseType, @unitNumber,
      @courseCode, @courseTitle, @lessonId, @lessonTitle, @pageUrl,
      @language, @message, @category, @status
    )
  `).run({
    category: category ?? null,
    courseCode: context.course_code,
    courseTitle: context.course_title,
    courseType: context.course_type,
    id,
    language: context.language ?? null,
    lessonId: context.lesson_id,
    lessonTitle: context.lesson_title,
    level: context.level,
    message,
    pageUrl: context.page_url,
    status,
    unitId: context.unit_id,
    unitNumber: context.unit_number,
    unitTitle: context.unit_title,
    userDisplayName: req.user.displayName,
    userEmail: req.user.email,
    userId: req.user.id,
    userRole: req.user.role,
  });

  const feedback = getFeedbackById(id);
  res.status(201).json({ feedback });
});

router.get("/", requireAuth, requireAdmin, (req, res) => {
  const filters = {
    course_code: stringQuery(req.query.course_code),
    lesson_id: stringQuery(req.query.lesson_id),
    status: stringQuery(req.query.status),
    unit_id: stringQuery(req.query.unit_id),
  };
  const where: string[] = [];
  const params: Record<string, string> = {};

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      where.push(`${key} = @${key}`);
      params[key] = value;
    }
  }

  const rows = db.prepare(`
    SELECT * FROM lesson_feedback
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY created_at DESC
    LIMIT 200
  `).all(params);

  res.json({ feedback: rows.map(toFeedbackResponse) });
});

router.get("/:id", requireAuth, requireAdmin, (req, res) => {
  const id = String(req.params.id);
  const feedback = getFeedbackById(id);
  if (!feedback) {
    res.status(404).json({ error: "Feedback not found." });
    return;
  }
  res.json({ feedback });
});

router.patch("/:id", requireAuth, requireAdmin, (req, res) => {
  const id = String(req.params.id);
  const parsed = patchFeedbackSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Patch may include status, category, or message." });
    return;
  }

  const existing = getFeedbackById(id);
  if (!existing) {
    res.status(404).json({ error: "Feedback not found." });
    return;
  }

  db.prepare(`
    UPDATE lesson_feedback
    SET
      status = COALESCE(@status, status),
      category = CASE WHEN @hasCategory THEN @category ELSE category END,
      message = COALESCE(@message, message),
      updated_at = datetime('now')
    WHERE id = @id
  `).run({
    category: parsed.data.category ?? null,
    hasCategory: Object.prototype.hasOwnProperty.call(parsed.data, "category") ? 1 : 0,
    id,
    message: parsed.data.message ?? null,
    status: parsed.data.status ?? null,
  });

  res.json({ feedback: getFeedbackById(id) });
});

function stringQuery(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getFeedbackById(id: string) {
  const row = db.prepare("SELECT * FROM lesson_feedback WHERE id = ?").get(id);
  return row ? toFeedbackResponse(row) : undefined;
}

function toFeedbackResponse(row: any) {
  return {
    id: row.id,
    context: {
      course_code: row.course_code,
      course_title: row.course_title,
      course_type: row.course_type,
      language: row.language ?? undefined,
      lesson_id: row.lesson_id,
      lesson_title: row.lesson_title,
      level: row.level,
      page_url: row.page_url,
      unit_id: row.unit_id,
      unit_number: row.unit_number,
      unit_title: row.unit_title,
    },
    category: row.category,
    created_at: row.created_at,
    message: row.message,
    status: row.status,
    updated_at: row.updated_at,
    user: row.user_id
      ? {
          display_name: row.user_display_name,
          email: row.user_email,
          id: row.user_id,
          role: row.user_role,
        }
      : null,
  };
}

export const feedbackRouter = router;
