import type {
  ExtensionEntry,
  ExtensionStatus,
  ExtensionType,
  LessonExtensionState,
  ReportItem,
  YleWordBankItem,
  YleSearchResult,
} from "./k2ExtensionTypes";
import yleGapBank from "./data/yle_gap_bank.json";

interface CurrentUser {
  id: string;
  name: string;
  role: string;
}

function getCurrentUser(): CurrentUser {
  const w = typeof window !== "undefined" ? (window as unknown as Record<string, unknown>) : undefined;
  if (w?.EASTIE_CURRENT_USER) {
    return w.EASTIE_CURRENT_USER as CurrentUser;
  }
  return { id: "demo-teacher-001", name: "Demo Teacher", role: "teacher" };
}

function userHeaders(): Record<string, string> {
  const user = getCurrentUser();
  return {
    "x-eastie-user-id": user.id,
    "x-eastie-user-name": user.name,
    "x-eastie-user-role": user.role,
  };
}

export interface LanguageExtensionContext {
  level: string;
  unitId: string;
}

function extensionUrl(context: LanguageExtensionContext, lessonId: string): string {
  return `/api/${normalizeLevel(context.level)}/language/units/${encodeURIComponent(context.unitId)}/lessons/${encodeURIComponent(lessonId)}/extensions`;
}

function singleExtensionUrl(context: LanguageExtensionContext, extensionId: string): string {
  return `/api/${normalizeLevel(context.level)}/language/extensions/${encodeURIComponent(extensionId)}`;
}

function reportUrl(context: LanguageExtensionContext, lessonId: string): string {
  return `/api/${normalizeLevel(context.level)}/language/units/${encodeURIComponent(context.unitId)}/lessons/${encodeURIComponent(lessonId)}/reports`;
}

function normalizeLevel(level: string): string {
  return level.trim().toLowerCase();
}

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...userHeaders(),
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

export async function fetchExtensions(context: LanguageExtensionContext, lessonId: string): Promise<LessonExtensionState> {
  const data = await fetchJson<{ extensions: ExtensionEntryRaw[] }>(extensionUrl(context, lessonId));
  const state: LessonExtensionState = { vocabulary: [], sentences: [], activities: [] };
  for (const raw of data.extensions) {
    if (raw.status === "archived") continue;
    const entry: ExtensionEntry = {
      id: raw.id,
      content: raw.content,
      userId: raw.created_by,
      userName: raw.created_by_name,
      source: raw.source,
      status: raw.status,
    };
    if (raw.extension_type === "vocabulary") state.vocabulary.push(entry);
    else if (raw.extension_type === "sentence") state.sentences.push(entry);
    else if (raw.extension_type === "activity_idea") state.activities.push(entry);
  }
  return state;
}

interface ExtensionEntryRaw {
  id: string;
  extension_type: ExtensionType;
  content: string;
  source: ExtensionEntry["source"];
  status: ExtensionEntry["status"];
  created_by: string;
  created_by_name: string;
}

export async function createExtension(
  context: LanguageExtensionContext,
  lessonId: string,
  extensionType: ExtensionType,
  content: string,
  source: ExtensionEntry["source"] = "manual",
): Promise<ExtensionEntry> {
  const data = await fetchJson<{ extension: ExtensionEntryRaw }>(extensionUrl(context, lessonId), {
    method: "POST",
    body: JSON.stringify({ extension_type: extensionType, content, source, status: "draft" }),
  });
  return {
    id: data.extension.id,
    content: data.extension.content,
    userId: data.extension.created_by,
    userName: data.extension.created_by_name,
    source: data.extension.source,
    status: data.extension.status,
  };
}

export async function deleteExtension(context: LanguageExtensionContext, extensionId: string): Promise<void> {
  await fetchJson(singleExtensionUrl(context, extensionId), { method: "DELETE" });
}

export async function submitReport(
  context: LanguageExtensionContext,
  lessonId: string,
  message: string,
  field?: string,
): Promise<{ id: string; status: string; message: string }> {
  const data = await fetchJson<{ report: { id: string; status: string } }>(reportUrl(context, lessonId), {
    method: "POST",
    body: JSON.stringify({ message, ...(field ? { field } : {}) }),
  });
  return { ...data.report, message };
}

export async function fetchReports(context: LanguageExtensionContext, lessonId: string): Promise<ReportItem[]> {
  const data = await fetchJson<{ reports: ReportItem[] }>(reportUrl(context, lessonId));
  return data.reports ?? [];
}

export async function searchYleWordBank(
  query?: string,
  level?: string,
  category?: string,
): Promise<YleSearchResult> {
  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (level) params.set("level", level);
  if (category) params.set("category", category);
  const qs = params.toString();
  try {
    return await fetchJson<YleSearchResult>(`/api/yle-word-bank${qs ? `?${qs}` : ""}`);
  } catch {
    return searchLocalYleWordBank(query, level, category);
  }
}

type LocalYleWordBankFile = {
  records: Array<Omit<YleWordBankItem, "id"> & { id?: string }>;
};

function searchLocalYleWordBank(query?: string, level?: string, category?: string): YleSearchResult {
  const q = (query ?? "").trim().toLowerCase();
  const lvl = (level ?? "").trim();
  const cat = (category ?? "").trim().toLowerCase();
  const records = (yleGapBank as LocalYleWordBankFile).records
    .map((record, index) => ({
      ...record,
      id: record.id ?? `${record.yle_level}-${record.item}-${index}`,
    }))
    .filter((record) => {
      const text = `${record.display_item} ${record.item} ${record.primary_category} ${record.categories}`.toLowerCase();
      const matchesQuery = !q || text.includes(q);
      const matchesLevel = !lvl || record.yle_level === lvl;
      const matchesCategory = !cat || record.primary_category.toLowerCase() === cat;
      return matchesQuery && matchesLevel && matchesCategory;
    });

  return {
    records,
    total: records.length,
  };
}
