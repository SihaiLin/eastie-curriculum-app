export type LanguageClassificationSource = "PU" | "Ext";

export interface ClassifiedLanguageItem {
  text: string;
  source?: LanguageClassificationSource;
}

export type LanguageClassificationIssueType = "error" | "needs_extension";

export interface ClassifiedLanguageReviewIssue {
  text: string;
  originalSource: "new" | "recycled";
  issueType: LanguageClassificationIssueType;
  note: string;
  /** Concrete vocabulary taught in earlier K lessons that falls under this umbrella. */
  expansionHint?: string[];
  /** PU split context: the immediately preceding / following item from the same lesson.
   *  Useful for "Yes" / "No" answer fragments that should be glued back to a question. */
  originalContext?: { prev?: string; next?: string };
}

export interface LessonLanguageClassification {
  newKeywords?: ClassifiedLanguageItem[];
  recycledKeywords?: ClassifiedLanguageItem[];
  targetSentences?: ClassifiedLanguageItem[];
  reviewIssues?: ClassifiedLanguageReviewIssue[];
}

export type UnitLanguageClassificationMap = Record<string, LessonLanguageClassification>;

// ---------------------------------------------------------------------------
// Reviewer workspace (temporary review tool, browser-localStorage only)
// ---------------------------------------------------------------------------

export type LanguageReviewDecision = "keep" | "sentence" | "error" | "extend";

export type LanguageReviewSource = "new" | "recycled";

export interface LanguageReviewAutoClassification {
  decision: LanguageReviewDecision;
  /** 0..1 — below 0.8 lands in the Needs Review lane by default. */
  confidence: number;
  /** Human-readable reasoning, surfaced in the review UI. */
  reasons: string[];
}

export interface LanguageReviewItemState {
  /** Mirrors the current reviewer decision (post-override). */
  decision: LanguageReviewDecision;
  /** Mirrors the current reviewer confidence (post-override). */
  confidence: number;
  note: string;
  /** What the auto-classifier produced. Preserved so we can detect overrides. */
  auto: LanguageReviewAutoClassification;
  /** Reviewer has explicitly confirmed this item (independent of the decision). */
  reviewed: boolean;
  /** Epoch ms of the last write. */
  updatedAt: number;
}

export type LanguageReviewPersistedState = Record<string, LanguageReviewItemState>;

export const LANGUAGE_REVIEW_CONFIDENCE_THRESHOLD = 0.8;

export const LANGUAGE_REVIEW_DECISION_OPTIONS: Array<{
  value: LanguageReviewDecision;
  label: string;
  description: string;
}> = [
  { value: "keep", label: "保持不变", description: "Default — keep as keyword." },
  { value: "sentence", label: "转为 sentences", description: "Promote to targetSentences." },
  { value: "error", label: "有错误", description: "Broken segmentation / not child language." },
  { value: "extend", label: "需要扩展", description: "Category umbrella, not concrete teachable item." },
];
