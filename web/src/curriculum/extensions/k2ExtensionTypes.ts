export type ExtensionType = "vocabulary" | "sentence" | "activity_idea";

export type ExtensionSource = "manual" | "yle_word_bank";

export type ExtensionStatus = "draft" | "submitted" | "approved" | "archived";

export interface ExtensionEntry {
  id: string;
  content: string;
  userId: string;
  userName: string;
  source: ExtensionSource;
  status: ExtensionStatus;
}

export interface LessonExtensionState {
  vocabulary: ExtensionEntry[];
  sentences: ExtensionEntry[];
  activities: ExtensionEntry[];
}

export type ReportStatus = "open" | "reviewed" | "resolved" | "dismissed";

export interface ReportItem {
  id: string;
  field: string | null;
  message: string;
  status: ReportStatus;
  created_by: string;
  created_by_name: string;
  created_at: string;
  resolution_note: string;
}

export interface YleWordBankItem {
  id: string;
  yle_level: string;
  display_item: string;
  item: string;
  primary_category: string;
  categories: string;
  source_note: string;
}

export interface YleSearchResult {
  records: YleWordBankItem[];
  total: number;
}
