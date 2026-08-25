export type LessonOverrideValue =
  | { type: "text"; text: string }
  | { type: "items"; items: string[] };

export interface LessonOverride {
  id: string;
  fieldKey: string;
  value: LessonOverrideValue;
  updatedAt: string;
}

export interface LessonOverrideContext {
  level: string;
  unitId: string;
  lessonId: string;
}

function overrideUrl(context: LessonOverrideContext): string {
  return `/api/${context.level.trim().toLowerCase()}/language/units/${encodeURIComponent(context.unitId)}/lessons/${encodeURIComponent(context.lessonId)}/overrides`;
}

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Request failed.");
  }
  return data;
}

export async function fetchLessonOverrides(context: LessonOverrideContext): Promise<Record<string, LessonOverrideValue>> {
  const data = await fetchJson<{ overrides: LessonOverride[] }>(overrideUrl(context));
  return Object.fromEntries((data.overrides ?? []).map((item) => [item.fieldKey, item.value]));
}

export async function saveLessonOverride(
  context: LessonOverrideContext,
  fieldKey: string,
  value: LessonOverrideValue,
): Promise<LessonOverride> {
  const data = await fetchJson<{ override: LessonOverride }>(overrideUrl(context), {
    method: "PUT",
    body: JSON.stringify({ fieldKey, value }),
  });
  return data.override;
}

export async function deleteLessonOverride(context: LessonOverrideContext, fieldKey: string): Promise<void> {
  await fetchJson(`${overrideUrl(context)}/${encodeURIComponent(fieldKey)}`, { method: "DELETE" });
}
