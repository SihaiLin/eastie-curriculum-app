import { Router } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { db } from "../db.js";
import { requireAuth } from "../sessions.js";
import type { AuthedRequest } from "../types.js";

const router = Router({ mergeParams: true });

const paramsSchema = z.object({
  level: z.enum(["k1", "k2", "k3"]),
  unitId: z.string().min(1),
  lessonId: z.string().min(1),
});

const createExtensionSchema = z.object({
  extension_type: z.enum(["vocabulary", "sentence", "activity_idea"]),
  content: z.string().trim().min(1),
  source: z.enum(["manual", "yle_word_bank"]).default("manual"),
  status: z.enum(["draft", "submitted", "approved", "archived"]).default("draft"),
});

const createReportSchema = z.object({
  field: z.string().trim().min(1).optional(),
  message: z.string().trim().min(1),
});

router.get("/:level/language/units/:unitId/lessons/:lessonId/extensions", requireAuth, (req, res) => {
  const params = paramsSchema.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Valid level, unit, and lesson are required." });
    return;
  }

  const rows = db.prepare(`
    SELECT * FROM language_lesson_extensions
    WHERE level = @level
      AND unit_id = @unitId
      AND lesson_id = @lessonId
      AND status <> 'archived'
    ORDER BY created_at ASC
  `).all(params.data);

  res.json({ extensions: rows.map(toExtensionResponse) });
});

router.post("/:level/language/units/:unitId/lessons/:lessonId/extensions", requireAuth, (req: AuthedRequest, res) => {
  const params = paramsSchema.safeParse(req.params);
  const body = createExtensionSchema.safeParse(req.body);
  if (!params.success || !body.success || !req.user) {
    res.status(400).json({ error: "Valid extension content is required." });
    return;
  }

  const id = crypto.randomUUID();
  db.prepare(`
    INSERT INTO language_lesson_extensions (
      id, user_id, user_email, user_display_name, user_role,
      level, unit_id, lesson_id, extension_type, content, source, status
    )
    VALUES (
      @id, @userId, @userEmail, @userDisplayName, @userRole,
      @level, @unitId, @lessonId, @extensionType, @content, @source, @status
    )
  `).run({
    content: body.data.content,
    extensionType: body.data.extension_type,
    id,
    lessonId: params.data.lessonId,
    level: params.data.level,
    source: body.data.source,
    status: body.data.status,
    unitId: params.data.unitId,
    userDisplayName: req.user.displayName,
    userEmail: req.user.email,
    userId: req.user.id,
    userRole: req.user.role,
  });

  res.status(201).json({ extension: getExtensionById(id) });
});

router.delete("/:level/language/extensions/:extensionId", requireAuth, (req: AuthedRequest, res) => {
  const parsed = z.object({
    extensionId: z.string().min(1),
    level: z.enum(["k1", "k2", "k3"]),
  }).safeParse(req.params);
  if (!parsed.success || !req.user) {
    res.status(400).json({ error: "Valid extension id is required." });
    return;
  }

  const row = db.prepare(`
    SELECT * FROM language_lesson_extensions
    WHERE id = @extensionId AND level = @level
  `).get(parsed.data) as ExtensionRow | undefined;

  if (!row) {
    res.status(404).json({ error: "Extension not found." });
    return;
  }
  if (row.user_id !== req.user.id && req.user.role !== "admin") {
    res.status(403).json({ error: "You can only delete your own extension items." });
    return;
  }

  db.prepare(`
    UPDATE language_lesson_extensions
    SET status = 'archived', updated_at = datetime('now')
    WHERE id = ?
  `).run(parsed.data.extensionId);

  res.json({ ok: true });
});

router.post("/:level/language/units/:unitId/lessons/:lessonId/reports", requireAuth, (req: AuthedRequest, res) => {
  const params = paramsSchema.safeParse(req.params);
  const body = createReportSchema.safeParse(req.body);
  if (!params.success || !body.success || !req.user) {
    res.status(400).json({ error: "Valid report message is required." });
    return;
  }

  const id = crypto.randomUUID();
  db.prepare(`
    INSERT INTO language_lesson_reports (
      id, user_id, user_email, user_display_name, user_role,
      level, unit_id, lesson_id, field, message, status
    )
    VALUES (
      @id, @userId, @userEmail, @userDisplayName, @userRole,
      @level, @unitId, @lessonId, @field, @message, 'open'
    )
  `).run({
    field: body.data.field ?? null,
    id,
    lessonId: params.data.lessonId,
    level: params.data.level,
    message: body.data.message,
    unitId: params.data.unitId,
    userDisplayName: req.user.displayName,
    userEmail: req.user.email,
    userId: req.user.id,
    userRole: req.user.role,
  });

  res.status(201).json({ report: getReportById(id) });
});

router.get("/:level/language/units/:unitId/lessons/:lessonId/reports", requireAuth, (req, res) => {
  const params = paramsSchema.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Valid level, unit, and lesson are required." });
    return;
  }

  const rows = db.prepare(`
    SELECT * FROM language_lesson_reports
    WHERE level = @level
      AND unit_id = @unitId
      AND lesson_id = @lessonId
    ORDER BY created_at DESC
  `).all(params.data);

  res.json({ reports: rows.map(toReportResponse) });
});

interface ExtensionRow {
  id: string;
  extension_type: "vocabulary" | "sentence" | "activity_idea";
  content: string;
  source: "manual" | "yle_word_bank";
  status: "draft" | "submitted" | "approved" | "archived";
  user_id: string | null;
  user_display_name: string | null;
}

function getExtensionById(id: string) {
  const row = db.prepare("SELECT * FROM language_lesson_extensions WHERE id = ?").get(id);
  return row ? toExtensionResponse(row) : undefined;
}

function getReportById(id: string) {
  const row = db.prepare("SELECT * FROM language_lesson_reports WHERE id = ?").get(id);
  return row ? toReportResponse(row) : undefined;
}

function toExtensionResponse(row: any) {
  return {
    id: row.id,
    extension_type: row.extension_type,
    content: row.content,
    source: row.source,
    status: row.status,
    created_by: row.user_id,
    created_by_name: row.user_display_name,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

function toReportResponse(row: any) {
  return {
    id: row.id,
    field: row.field,
    message: row.message,
    status: row.status,
    created_by: row.user_id,
    created_by_name: row.user_display_name,
    created_at: row.created_at,
    resolution_note: row.resolution_note,
  };
}

export const languageExtensionsRouter = router;
