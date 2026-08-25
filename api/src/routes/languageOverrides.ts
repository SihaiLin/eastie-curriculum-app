import { Router } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import { db } from "../db.js";
import { requireAuth } from "../sessions.js";
import type { AuthedRequest } from "../types.js";

const router = Router({ mergeParams: true });

const paramsSchema = z.object({
  level: z.enum(["pg", "pk", "k1", "k2", "k3"]),
  unitId: z.string().min(1),
  lessonId: z.string().min(1),
});

const fieldParamsSchema = paramsSchema.extend({
  fieldKey: z.string().min(1),
});

const overrideValueSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("items"),
    items: z.array(z.string().trim().min(1)).max(80),
  }),
]);

const upsertOverrideSchema = z.object({
  fieldKey: z.string().trim().min(1),
  value: overrideValueSchema,
});

router.get("/:level/language/units/:unitId/lessons/:lessonId/overrides", requireAuth, (req: AuthedRequest, res) => {
  const params = paramsSchema.safeParse(req.params);
  if (!params.success || !req.user) {
    res.status(400).json({ error: "Valid level, unit, and lesson are required." });
    return;
  }

  const rows = db.prepare(`
    SELECT * FROM language_lesson_overrides
    WHERE user_id = @userId
      AND level = @level
      AND unit_id = @unitId
      AND lesson_id = @lessonId
    ORDER BY updated_at DESC
  `).all({ ...params.data, userId: req.user.id });

  res.json({ overrides: rows.map(toOverrideResponse) });
});

router.put("/:level/language/units/:unitId/lessons/:lessonId/overrides", requireAuth, (req: AuthedRequest, res) => {
  const params = paramsSchema.safeParse(req.params);
  const body = upsertOverrideSchema.safeParse(req.body);
  if (!params.success || !body.success || !req.user) {
    res.status(400).json({ error: "Valid override content is required." });
    return;
  }

  const id = crypto.randomUUID();
  const textValue = body.data.value.type === "text" ? body.data.value.text : null;
  const itemsJson = body.data.value.type === "items" ? JSON.stringify(body.data.value.items) : null;

  db.prepare(`
    INSERT INTO language_lesson_overrides (
      id, user_id, user_email, user_display_name, user_role,
      level, unit_id, lesson_id, field_key, value_type, text_value, items_json
    )
    VALUES (
      @id, @userId, @userEmail, @userDisplayName, @userRole,
      @level, @unitId, @lessonId, @fieldKey, @valueType, @textValue, @itemsJson
    )
    ON CONFLICT(user_id, level, unit_id, lesson_id, field_key)
    DO UPDATE SET
      value_type = excluded.value_type,
      text_value = excluded.text_value,
      items_json = excluded.items_json,
      updated_at = datetime('now')
  `).run({
    fieldKey: body.data.fieldKey,
    id,
    itemsJson,
    lessonId: params.data.lessonId,
    level: params.data.level,
    textValue,
    unitId: params.data.unitId,
    userDisplayName: req.user.displayName,
    userEmail: req.user.email,
    userId: req.user.id,
    userRole: req.user.role,
    valueType: body.data.value.type,
  });

  const row = db.prepare(`
    SELECT * FROM language_lesson_overrides
    WHERE user_id = @userId
      AND level = @level
      AND unit_id = @unitId
      AND lesson_id = @lessonId
      AND field_key = @fieldKey
  `).get({ ...params.data, fieldKey: body.data.fieldKey, userId: req.user.id });

  res.json({ override: toOverrideResponse(row) });
});

router.delete("/:level/language/units/:unitId/lessons/:lessonId/overrides/:fieldKey", requireAuth, (req: AuthedRequest, res) => {
  const rawFieldKey = Array.isArray(req.params.fieldKey) ? req.params.fieldKey[0] : req.params.fieldKey;
  const params = fieldParamsSchema.safeParse({
    ...req.params,
    fieldKey: decodeURIComponent(rawFieldKey ?? ""),
  });
  if (!params.success || !req.user) {
    res.status(400).json({ error: "Valid override field is required." });
    return;
  }

  db.prepare(`
    DELETE FROM language_lesson_overrides
    WHERE user_id = @userId
      AND level = @level
      AND unit_id = @unitId
      AND lesson_id = @lessonId
      AND field_key = @fieldKey
  `).run({ ...params.data, userId: req.user.id });

  res.json({ ok: true });
});

function toOverrideResponse(row: any) {
  const value = row.value_type === "items"
    ? { type: "items", items: safeParseItems(row.items_json) }
    : { type: "text", text: row.text_value ?? "" };
  return {
    id: row.id,
    fieldKey: row.field_key,
    value,
    updatedAt: row.updated_at,
  };
}

function safeParseItems(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export const languageOverridesRouter = router;
