import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dynamicUnitManifest } from "../../curriculum/dynamicUnitManifest";
import type { KLanguageDynamicUnitEntry } from "../../curriculum/dynamicUnitManifest";
import { autoClassifyLanguageItem, needsReview } from "../../curriculum/languageClassifications/autoClassify";
import { buildExpansionHint } from "../../curriculum/languageClassifications/categoryExpansion";
import { getErrorSuggestion } from "../../curriculum/languageClassifications/errorSuggestions";
import {
  LANGUAGE_REVIEW_CONFIDENCE_THRESHOLD,
  LANGUAGE_REVIEW_DECISION_OPTIONS,
  type LanguageReviewDecision,
  type LanguageReviewItemState,
  type LanguageReviewPersistedState,
  type LanguageReviewSource,
} from "../../curriculum/languageClassifications/types";
import type { LanguageUnitData } from "./LanguageUnitPage";

interface ReviewItem {
  id: string;
  lessonId: string;
  lessonTitle: string;
  lessonLabel: string;
  source: LanguageReviewSource;
  text: string;
}

const decisionLabel: Record<LanguageReviewDecision, string> = {
  keep: "保持不动",
  sentence: "转为 sentences",
  error: "有错误",
  extend: "需要扩展",
};

export function LanguageClassificationReviewPage() {
  const { level, unitSlug } = useParams();
  const unit = findKLanguageUnit(level, unitSlug);

  if (!unit) {
    return (
      <main className="language-review-shell">
        <h1>Language Classification Review</h1>
        <p className="k-language-empty-note">No K language unit was found for this route.</p>
      </main>
    );
  }

  return <LanguageClassificationReview unit={unit} />;
}

function LanguageClassificationReview({ unit }: { unit: LanguageUnitData }) {
  const storageKey = `eastie-language-review:${unit.unitId}`;
  const schemaVersionKey = `${storageKey}:v`;
  const items = useMemo(() => collectReviewItems(unit), [unit]);
  const autoClassifications = useMemo(
    () => new Map(items.map((item) => [item.id, autoClassifyLanguageItem(item.text, item.source)])),
    [items],
  );
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  const loadState = useCallback(
    (key: string): LanguageReviewPersistedState => {
      const loaded = readState(key);
      return mergeWithAuto(loaded, autoClassifications, itemIds);
    },
    [autoClassifications, itemIds],
  );

  const [state, setState] = useState<LanguageReviewPersistedState>(() => loadState(storageKey));
  const [exportOpen, setExportOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy TS");
  const [applyCopyLabel, setApplyCopyLabel] = useState("Copy to clipboard");
  const applyTextRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setState(loadState(storageKey));
  }, [storageKey, loadState]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
    window.localStorage.setItem(schemaVersionKey, "2");
  }, [state, storageKey, schemaVersionKey]);

  const counts = useMemo(() => countByDecision(items, state), [items, state]);
  const reviewedCount = useMemo(() => countReviewed(items, state), [items, state]);
  const needsReviewCount = useMemo(
    () => items.filter((item) => {
      // Auto-resolved errors (entry.kind === "resolved") are excluded from
      // the Needs Review lane — the export pipeline marks them as resolved
      // and they don't need reviewer confirmation.
      const decision = state[item.id]?.decision ?? "keep";
      if (decision === "error" && getErrorSuggestion(item.text)?.kind === "resolved") {
        return false;
      }
      const itemState = state[item.id];
      if (!itemState) return needsReview(fallbackState(autoClassifications.get(item.id)!));
      return needsReview(itemState);
    }).length,
    [items, state, autoClassifications],
  );
  const allKUnits = useMemo(() => collectKLanguageUnits(), []);

  const grouped = groupByLesson(items);
  const exportText = useMemo(() => buildClassificationExport(unit, items, state), [unit, items, state]);
  const applyText = useMemo(() => buildApplyOutput(unit, items, state), [unit, items, state]);
  const filename = `${toScaffoldFileBase(unit.unitId)}.ts`;
  const [bundleOpen, setBundleOpen] = useState(false);
  const [bundleText, setBundleText] = useState<string | null>(null);
  const [bundleSummary, setBundleSummary] = useState<{ unitId: string; level: string; reviewed: number; total: number }[]>([]);
  const bundleFilename = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return `eastie-k-language-classifications-bundle-${today}.ts.txt`;
  }, []);

  return (
    <main className="language-review-shell">
      <header className="language-review-header">
        <div>
          <p>{unit.level} / {unit.unitNumber === 0 ? "Unit Hello" : `Unit ${unit.unitNumber}`}</p>
          <h1>Language Classification Review</h1>
          <span>{unit.title}</span>
        </div>
        <div className="language-review-header-actions">
          <button
            className="k-language-modify-button"
            type="button"
            onClick={() => {
              const { text, summary } = buildAllUnitsBundle();
              setBundleText(text);
              setBundleSummary(summary);
              setBundleOpen(true);
            }}
          >
            Export All
          </button>
          <button className="k-language-modify-button primary" type="button" onClick={() => setApplyOpen(true)}>
            Apply
          </button>
          <button className="k-language-modify-button" type="button" onClick={() => setExportOpen((open) => !open)}>
            {exportOpen ? "Hide Export" : "Export TS"}
          </button>
          <button
            className="k-language-modify-button"
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(exportText);
              setCopyLabel("Copied");
              window.setTimeout(() => setCopyLabel("Copy TS"), 1400);
            }}
          >
            {copyLabel}
          </button>
          <Link className="k-language-modify-button" to={getUnitPath(unit)}>
            Back to Unit
          </Link>
        </div>
      </header>

      <section className="language-review-summary" aria-label="Review summary">
        {LANGUAGE_REVIEW_DECISION_OPTIONS.map((option) => (
          <div key={option.value}>
            <strong>{counts[option.value]}</strong>
            <span>{option.label}</span>
          </div>
        ))}
        <div className="language-review-needs-flag">
          <strong>{needsReviewCount}</strong>
          <span>Needs Review</span>
        </div>
        <div className="language-review-reviewed-flag">
          <strong>{reviewedCount}</strong>
          <span>Reviewed</span>
        </div>
      </section>

      <UnitNav currentUnitId={unit.unitId} units={allKUnits} />

      <section className="language-review-note">
        <strong>Auto-classified workspace.</strong>
        <span>
          Each item is pre-classified with a confidence score. Items below {Math.round(LANGUAGE_REVIEW_CONFIDENCE_THRESHOLD * 100)}%
          or marked error / needs_extension land in the <em>Needs Review</em> lane. Decisions are saved in this
          browser only and do not modify curriculum source files.
        </span>
      </section>

      {exportOpen ? (
        <section className="language-review-export">
          <div>
            <h2>Classification export (all 4 buckets)</h2>
            <p>Paste into a scratch file. Use Apply for a scaffold-ready snippet.</p>
          </div>
          <textarea readOnly value={exportText} />
        </section>
      ) : null}

      {applyOpen ? (
        <div className="language-review-apply-backdrop" role="dialog" aria-modal="true" aria-label="Apply preview">
          <section className="language-review-apply-modal">
            <div className="language-review-apply-head">
              <div>
                <h2>Apply preview · {filename}</h2>
                <p>
                  Paste this into <code>src/curriculum/languageClassifications/{filename}</code> and
                  update <code>index.ts</code> registry if you add a new unit file.
                </p>
              </div>
              <button
                className="k-language-modify-button"
                type="button"
                onClick={() => setApplyOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
            </div>
            <textarea readOnly value={applyText} ref={applyTextRef} />
            <div className="language-review-apply-actions">
              <button
                className="k-language-modify-button primary"
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(applyText);
                  setApplyCopyLabel("Copied");
                  window.setTimeout(() => setApplyCopyLabel("Copy to clipboard"), 1400);
                }}
              >
                {applyCopyLabel}
              </button>
              <button
                className="k-language-modify-button"
                type="button"
                onClick={() => downloadAsFile(applyText, filename)}
              >
                Download {filename}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {bundleOpen ? (
        <div className="language-review-apply-backdrop" role="dialog" aria-modal="true" aria-label="Export all units">
          <section className="language-review-apply-modal">
            <div className="language-review-apply-head">
              <div>
                <h2>Export all K language units</h2>
                <p>
                  One bundle for all 30 units. Split into per-unit files using the
                  <code>// === {"{unitId}"} ===</code> separators and update <code>index.ts</code> registry.
                </p>
              </div>
              <button
                className="k-language-modify-button"
                type="button"
                onClick={() => setBundleOpen(false)}
                aria-label="Close"
              >
                Close
              </button>
            </div>
            {bundleSummary.length > 0 ? (
              <div className="language-review-bundle-summary" aria-label="Per-unit review progress">
                {bundleSummary.map((s) => {
                  const pct = s.total > 0 ? Math.round((s.reviewed / s.total) * 100) : 0;
                  return (
                    <div key={s.unitId} className="language-review-bundle-row">
                      <span className="language-review-bundle-level">{s.level}</span>
                      <span className="language-review-bundle-unitid">{s.unitId}</span>
                      <span className="language-review-bundle-progress">
                        {s.reviewed}/{s.total} reviewed ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : null}
            <textarea readOnly value={bundleText ?? "// (loading)"} />
            <div className="language-review-apply-actions">
              <button
                className="k-language-modify-button primary"
                type="button"
                onClick={async () => {
                  if (!bundleText) return;
                  await navigator.clipboard.writeText(bundleText);
                  const original = "Copy bundle";
                  setApplyCopyLabel("Copied");
                  window.setTimeout(() => setApplyCopyLabel(original), 1400);
                }}
              >
                {applyCopyLabel === "Copy to clipboard" ? "Copy bundle" : applyCopyLabel}
              </button>
              <button
                className="k-language-modify-button"
                type="button"
                onClick={() => bundleText && downloadAsFile(bundleText, bundleFilename)}
              >
                Download {bundleFilename}
              </button>
            </div>
          </section>
        </div>
      ) : null}

      <div className="language-review-lessons">
        {grouped.map((group) => (
          <LessonReviewSection
            key={group.lessonId}
            group={group}
            state={state}
            setState={setState}
            autoClassifications={autoClassifications}
          />
        ))}
      </div>
    </main>
  );
}

interface LessonReviewGroup {
  lessonId: string;
  lessonLabel: string;
  lessonTitle: string;
  items: ReviewItem[];
}

function LessonReviewSection({
  group,
  state,
  setState,
  autoClassifications,
}: {
  group: LessonReviewGroup;
  state: LanguageReviewPersistedState;
  setState: React.Dispatch<React.SetStateAction<LanguageReviewPersistedState>>;
  autoClassifications: Map<string, ReturnType<typeof autoClassifyLanguageItem>>;
}) {
  const [showConfirmed, setShowConfirmed] = useState(false);

  const reviewable: { item: ReviewItem; itemState: LanguageReviewItemState }[] = [];
  const confirmed: { item: ReviewItem; itemState: LanguageReviewItemState }[] = [];
  for (const item of group.items) {
    const auto = autoClassifications.get(item.id);
    if (!auto) continue;
    const itemState = state[item.id] ?? fallbackState(auto);
    // Auto-resolved errors (entry.kind === "resolved") are not in the Needs
    // Review lane even though their decision === "error".
    const isAutoResolved = itemState.decision === "error" && getErrorSuggestion(item.text)?.kind === "resolved";
    if (!isAutoResolved && needsReview(itemState)) reviewable.push({ item, itemState });
    else confirmed.push({ item, itemState });
  }

  const updateItem = (id: string, patch: Partial<LanguageReviewItemState>) => {
    setState((prev) => {
      const existing = prev[id];
      const auto = autoClassifications.get(id);
      if (!auto) return prev;
      const base = existing ?? fallbackState(auto);
      return {
        ...prev,
        [id]: {
          ...base,
          ...patch,
          updatedAt: Date.now(),
        },
      };
    });
  };

  const resetItem = (id: string) => {
    setState((prev) => {
      const auto = autoClassifications.get(id);
      if (!auto) return prev;
      const next = { ...prev };
      next[id] = fallbackState(auto);
      return next;
    });
  };

  return (
    <section className="language-review-lesson" key={group.lessonId}>
      <div className="language-review-lesson-head">
        <span>{group.lessonLabel}</span>
        <h2>{group.lessonTitle}</h2>
        <span className="language-review-lesson-counts">
          {reviewable.length > 0 ? `${reviewable.length} to review` : "all confirmed"}
          {confirmed.length > 0 ? ` · ${confirmed.length} confirmed` : ""}
        </span>
      </div>

      {reviewable.length > 0 ? (
        <div className="language-review-lane language-review-lane-needs">
          <div className="language-review-lane-head">
            <strong>⚠ Needs Review ({reviewable.length})</strong>
            <span>Override the decision if needed, then add a note (optional).</span>
          </div>
          <ReviewTable
            entries={reviewable}
            onUpdate={updateItem}
            onReset={resetItem}
            highlight
          />
        </div>
      ) : null}

      {confirmed.length > 0 ? (
        <div className="language-review-lane language-review-lane-confirmed">
          <button
            className="language-review-lane-toggle"
            type="button"
            onClick={() => setShowConfirmed((open) => !open)}
          >
            {showConfirmed ? "Hide" : "Show"} ✓ Confirmed ({confirmed.length})
          </button>
          {showConfirmed ? (
            <ReviewTable
              entries={confirmed}
              onUpdate={updateItem}
              onReset={resetItem}
              highlight={false}
            />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function ReviewTable({
  entries,
  onUpdate,
  onReset,
  highlight,
}: {
  entries: { item: ReviewItem; itemState: LanguageReviewItemState }[];
  onUpdate: (id: string, patch: Partial<LanguageReviewItemState>) => void;
  onReset: (id: string) => void;
  highlight: boolean;
}) {
  return (
    <div className="language-review-table" role="table">
      <div className="language-review-row language-review-table-head" role="row">
        <span>PU 分类</span>
        <span>Item</span>
        <span>Auto · 置信度</span>
        <span>处理</span>
        <span>Note</span>
      </div>
      {entries.map(({ item, itemState }) => {
        const overridden = itemState.decision !== itemState.auto.decision;
        return (
          <div
            className={`language-review-row${highlight ? " row-needs-review" : ""}${itemState.reviewed ? " row-reviewed" : ""}`}
            role="row"
            key={item.id}
          >
            <span className={`language-review-source source-${item.source}`}>
              {item.source === "new" ? "New Language" : "Recycled Language"}
            </span>
            <div className="language-review-item-text">
              <strong>{item.text}</strong>
              {overridden ? (
                <span className="language-review-override-tag" title="You overrode the auto decision">
                  Overridden
                </span>
              ) : null}
              {itemState.reviewed ? (
                <span className="language-review-reviewed-tag" title="You confirmed this item">
                  ✓ Reviewed
                </span>
              ) : null}
            </div>
            <div className="language-review-auto">
              <span className={`language-review-auto-tag auto-${itemState.auto.decision}`}>
                🤖 {decisionLabel[itemState.auto.decision]}
              </span>
              <ConfidenceBar confidence={itemState.auto.confidence} />
              {itemState.auto.reasons.length > 0 ? (
                <small className="language-review-auto-reason">{itemState.auto.reasons[0]}</small>
              ) : null}
            </div>
            <div className="language-review-actions">
              {LANGUAGE_REVIEW_DECISION_OPTIONS.map((option) => (
                <button
                  className={`language-review-choice${itemState.decision === option.value ? " active" : ""}`}
                  key={option.value}
                  type="button"
                  title={option.description}
                  onClick={() => onUpdate(item.id, { decision: option.value })}
                >
                  {option.label}
                </button>
              ))}
              <button
                className="language-review-reset"
                type="button"
                title="Reset to auto classification"
                onClick={() => onReset(item.id)}
              >
                Reset
              </button>
            </div>
            <div className="language-review-note-cell">
              <input
                className="language-review-note-input"
                placeholder="(optional)"
                value={itemState.note}
                onChange={(event) => onUpdate(item.id, { note: event.target.value })}
              />
              <button
                className={`language-review-confirm${itemState.reviewed ? " active" : ""}`}
                type="button"
                title={itemState.reviewed ? "Mark as not yet reviewed" : "Mark as reviewed (keep current decision)"}
                onClick={() => onUpdate(item.id, { reviewed: !itemState.reviewed })}
              >
                {itemState.reviewed ? "✓ Reviewed" : "Mark Reviewed"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ConfidenceBar({ confidence }: { confidence: number }) {
  const pct = Math.round(confidence * 100);
  const level = confidence >= 0.8 ? "high" : confidence >= 0.6 ? "mid" : "low";
  return (
    <div className={`language-review-confidence level-${level}`} aria-label={`Confidence ${pct}%`}>
      <div className="language-review-confidence-track">
        <div className="language-review-confidence-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="language-review-confidence-text">{pct}%</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data shaping helpers
// ---------------------------------------------------------------------------

function fallbackState(auto: ReturnType<typeof autoClassifyLanguageItem>): LanguageReviewItemState {
  return {
    decision: auto.decision,
    confidence: auto.confidence,
    note: "",
    auto,
    reviewed: false,
    updatedAt: Date.now(),
  };
}

function mergeWithAuto(
  loaded: LanguageReviewPersistedState,
  auto: Map<string, ReturnType<typeof autoClassifyLanguageItem>>,
  allItemIds: string[] = [],
): LanguageReviewPersistedState {
  // Backward-compatible: old schema stored `{ itemId: "keep"|"sentence"|"error"|"extend" }`.
  // New schema stores `{ itemId: LanguageReviewItemState }` and added `reviewed` later.
  const out: LanguageReviewPersistedState = {};
  for (const [id, value] of Object.entries(loaded)) {
    const autoForItem = auto.get(id);
    if (typeof value === "string") {
      if (!autoForItem) continue;
      if (isDecision(value)) {
        out[id] = {
          decision: value,
          confidence: autoForItem.confidence,
          note: "",
          auto: autoForItem,
          reviewed: false,
          updatedAt: Date.now(),
        };
      }
    } else if (value && typeof value === "object" && isDecision(value.decision)) {
      out[id] = {
        decision: value.decision,
        confidence: typeof value.confidence === "number" ? value.confidence : autoForItem?.confidence ?? 0.5,
        note: typeof value.note === "string" ? value.note : "",
        auto: autoForItem ?? { decision: value.decision, confidence: 0.5, reasons: ["Restored from localStorage."] },
        reviewed: typeof (value as unknown as Record<string, unknown>).reviewed === "boolean"
          ? ((value as unknown as Record<string, unknown>).reviewed as boolean)
          : false,
        updatedAt: typeof value.updatedAt === "number" ? value.updatedAt : Date.now(),
      };
    }
  }
  // Backfill: every item in the unit must have a state entry. Missing ones get the
  // auto-classifier's default so the summary and Apply output reflect the real picture.
  for (const id of allItemIds) {
    if (out[id]) continue;
    const autoForItem = auto.get(id);
    if (autoForItem) {
      out[id] = fallbackState(autoForItem);
    }
  }
  return out;
}

function isDecision(value: unknown): value is LanguageReviewDecision {
  return value === "keep" || value === "sentence" || value === "error" || value === "extend";
}

function readState(storageKey: string): LanguageReviewPersistedState {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as LanguageReviewPersistedState;
  } catch {
    return {};
  }
}

function countByDecision(items: ReviewItem[], state: LanguageReviewPersistedState) {
  const counts: Record<LanguageReviewDecision, number> = { keep: 0, sentence: 0, error: 0, extend: 0 };
  for (const item of items) {
    const decision = state[item.id]?.decision ?? "keep";
    counts[decision] += 1;
  }
  return counts;
}

function countReviewed(items: ReviewItem[], state: LanguageReviewPersistedState) {
  let n = 0;
  for (const item of items) {
    if (state[item.id]?.reviewed) n += 1;
  }
  return n;
}

interface KNavEntry {
  level: string;
  levelLabel: string;
  unitNumber: number;
  unitId: string;
  title: string;
  path: string;
}

function collectKLanguageUnits(): KNavEntry[] {
  const entries = dynamicUnitManifest
    .filter((entry): entry is KLanguageDynamicUnitEntry => entry.renderer === "k-language")
    .map((entry) => {
      const slug = entry.unitNumber === 0
        ? "unit-uh"
        : `unit-${String(entry.unitNumber).padStart(2, "0")}`;
      return {
        level: entry.level,
        levelLabel: entry.level,
        unitNumber: entry.unitNumber,
        unitId: entry.unit.unitId,
        title: entry.unit.title,
        path: `/curriculum/${entry.level.toLowerCase()}/language/${slug}/classify-language`,
      };
    });
  entries.sort((a, b) => {
    if (a.level !== b.level) return a.level.localeCompare(b.level);
    return a.unitNumber - b.unitNumber;
  });
  return entries;
}

function UnitNav({ currentUnitId, units }: { currentUnitId: string; units: KNavEntry[] }) {
  const levels = Array.from(new Set(units.map((u) => u.level)));
  return (
    <nav className="language-review-nav" aria-label="K language unit navigation">
      {levels.map((level) => {
        const levelUnits = units.filter((u) => u.level === level);
        return (
          <div key={level} className="language-review-nav-group">
            <span className="language-review-nav-level">{level}</span>
            <div className="language-review-nav-units">
              {levelUnits.map((u) => {
                const isCurrent = u.unitId === currentUnitId;
                return (
                  <Link
                    key={u.unitId}
                    to={u.path}
                    className={`language-review-nav-link${isCurrent ? " active" : ""}`}
                    title={u.title}
                  >
                    {u.unitNumber === 0 ? "Hello" : `U${String(u.unitNumber).padStart(2, "0")}`}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Export + Apply output
// ---------------------------------------------------------------------------

/**
 * Trim a trailing "Yes" / "No" answer fragment that Power Up accidentally
 * glued onto a sentence template (e.g. "Let's... Yes" → "Let's...").
 * Only matches a single answer marker at the very end of the string; leaves
 * ordinary sentences like "Yes, I have." alone because the leading "Yes,"
 * is not preceded by whitespace right before the trailing "Yes".
 */
function trimAnswerMarker(text: string): string {
  return text.replace(/\s+(Yes|No|yes|no)\.?\s*$/, "").trim();
}

/**
 * Build a synthetic ReviewItem for a resolved / expanded item so it can flow
 * through the existing formatLessonBlock pipeline (which expects ReviewItem[]).
 * The synthetic id is namespaced with `__resolved__:` so it never collides with
 * a real item id.
 */
function syntheticResolvedItem(
  parent: ReviewItem,
  index: number,
  text: string,
  kind: "sentence" | "keyword",
): ReviewItem {
  return {
    id: `__resolved__:${parent.id}:${kind}:${index}`,
    lessonId: parent.lessonId,
    lessonLabel: parent.lessonLabel,
    lessonTitle: parent.lessonTitle,
    source: parent.source,
    text,
  };
}

/**
 * Drain a resolved error entry into the bucket. Returns the number of
 * items emitted (sentences + keywords). If the resolved entry has no
 * replacement text, falls back to a reviewIssue and logs a warning so
 * the author can update errorSuggestions.ts.
 */
function drainResolvedError(
  item: ReviewItem,
  entry: { resolvedItems?: string[]; expandedKeywords?: string[] },
  bucket: { newK: ReviewItem[]; recK: ReviewItem[]; tgt: ReviewItem[]; iss: ReviewItem[] },
): { emitted: number; sentenceCount: number; keywordCount: number; fellBack: boolean } {
  const sentences = entry.resolvedItems ?? [];
  const keywords = entry.expandedKeywords ?? [];
  if (sentences.length === 0 && keywords.length === 0) {
    // Validation: a `resolved` entry must provide at least one replacement item.
    // If neither field is filled in, keep the original as a reviewIssue so the
    // content is at least visible (and emit a console warning so the author
    // can update errorSuggestions.ts).
    console.warn(
      `[language-review] "${item.text}" has kind: "resolved" but no resolvedItems or expandedKeywords. ` +
      `Keeping the raw text as a reviewIssue — update errorSuggestions.ts to add the replacement text.`,
    );
    bucket.iss.push(item);
    return { emitted: 1, sentenceCount: 0, keywordCount: 0, fellBack: true };
  }
  for (let i = 0; i < sentences.length; i += 1) {
    bucket.tgt.push(syntheticResolvedItem(item, i, sentences[i], "sentence"));
  }
  for (let i = 0; i < keywords.length; i += 1) {
    if (item.source === "new") bucket.newK.push(syntheticResolvedItem(item, i, keywords[i], "keyword"));
    else bucket.recK.push(syntheticResolvedItem(item, i, keywords[i], "keyword"));
  }
  return {
    emitted: sentences.length + keywords.length,
    sentenceCount: sentences.length,
    keywordCount: keywords.length,
    fellBack: false,
  };
}

function buildClassificationExport(
  unit: LanguageUnitData,
  items: ReviewItem[],
  state: LanguageReviewPersistedState,
): string {
  const buckets = new Map<string, { newK: ReviewItem[]; recK: ReviewItem[]; tgt: ReviewItem[]; iss: ReviewItem[] }>();
  let resolvedErrorCount = 0;
  let resolvedSentenceCount = 0;
  let resolvedKeywordCount = 0;
  let fallbackCount = 0;

  for (const item of items) {
    const itemState = state[item.id] ?? { decision: "keep" as LanguageReviewDecision, auto: { decision: "keep", confidence: 0.5, reasons: [] } };
    const decision = itemState.decision;
    const bucket =
      buckets.get(item.lessonId) ?? {
        newK: [],
        recK: [],
        tgt: [],
        iss: [],
      };
    if (decision === "error") {
      const entry = getErrorSuggestion(item.text);
      if (entry?.kind === "resolved") {
        resolvedErrorCount += 1;
        const result = drainResolvedError(item, entry, bucket);
        resolvedSentenceCount += result.sentenceCount;
        resolvedKeywordCount += result.keywordCount;
        if (result.fellBack) fallbackCount += 1;
        buckets.set(item.lessonId, bucket);
        continue;
      }
    }
    if (decision === "sentence") {
      bucket.tgt.push(item);
    } else if (decision === "error" || decision === "extend") {
      bucket.iss.push(item);
    } else {
      if (item.source === "new") bucket.newK.push(item);
      else bucket.recK.push(item);
    }
    buckets.set(item.lessonId, bucket);
  }

  const blocks = Array.from(buckets.entries())
    .filter(([, b]) => b.newK.length + b.recK.length + b.tgt.length + b.iss.length > 0)
    .map(([lessonId, b]) => formatLessonBlock(lessonId, b, state, unit.unitId, items.filter((i) => i.lessonId === lessonId)));

  if (blocks.length === 0) {
    return `// ${unit.unitId} — no items classified yet.`;
  }
  const lines = [
    `// Generated from auto-classified review for ${unit.unitId}.`,
    `// Copy-paste preview, NOT a scaffold file (use Apply for that).`,
    `// reviewIssues with issueType=needs_extension include expansionHint — the concrete`,
    `// vocabulary taught in earlier K language lessons under that umbrella category.`,
  ];
  if (resolvedErrorCount > 0) {
    const parts: string[] = [];
    parts.push(`${resolvedSentenceCount} target sentence${resolvedSentenceCount === 1 ? "" : "s"}`);
    if (resolvedKeywordCount > 0) {
      parts.push(`${resolvedKeywordCount} keyword${resolvedKeywordCount === 1 ? "" : "s"}`);
    }
    const noun = `${resolvedErrorCount} error item${resolvedErrorCount === 1 ? "" : "s"}`;
    lines.push(
      `// ${noun} auto-resolved via errorSuggestions.ts → emitted as ${parts.join(" + ")} (hand-curated; raw entry NOT emitted as reviewIssue).`,
    );
    if (fallbackCount > 0) {
      lines.push(
        `// ⚠ ${fallbackCount} resolved error${fallbackCount === 1 ? " was" : "s were"} missing resolvedItems / expandedKeywords — kept as reviewIssue. Update errorSuggestions.ts.`,
      );
    }
  }
  lines.push(
    `export const ${toExportName(unit.unitId)} = {`,
    blocks.join("\n\n"),
    `};`,
  );
  return lines.join("\n");
}

function formatLessonBlock(
  lessonId: string,
  bucket: { newK: ReviewItem[]; recK: ReviewItem[]; tgt: ReviewItem[]; iss: ReviewItem[] },
  state: LanguageReviewPersistedState,
  unitId: string,
  allItemsInLesson: ReviewItem[] = [],
): string {
  const lines: string[] = [`  ${JSON.stringify(lessonId)}: {`];
  if (bucket.newK.length) {
    lines.push(`    newKeywords: [`);
    for (const item of bucket.newK) lines.push(`      { text: ${JSON.stringify(item.text)}, source: "PU" },`);
    lines.push(`    ],`);
  }
  if (bucket.recK.length) {
    lines.push(`    recycledKeywords: [`);
    for (const item of bucket.recK) lines.push(`      { text: ${JSON.stringify(item.text)}, source: "PU" },`);
    lines.push(`    ],`);
  }
  if (bucket.tgt.length) {
    lines.push(`    targetSentences: [`);
    for (const item of bucket.tgt) {
      const trimmed = trimAnswerMarker(item.text);
      lines.push(`      { text: ${JSON.stringify(trimmed)}, source: "PU" },`);
    }
    lines.push(`    ],`);
  }
  if (bucket.iss.length) {
    lines.push(`    reviewIssues: [`);
    for (const item of bucket.iss) {
      const issueType = state[item.id]?.decision === "error" ? "error" : "needs_extension";
      const note = state[item.id]?.note ?? "";
      const fields = [
        `text: ${JSON.stringify(item.text)}`,
        `originalSource: ${JSON.stringify(item.source)}`,
        `issueType: ${JSON.stringify(issueType)}`,
        `note: ${JSON.stringify(note)}`,
      ];
      if (issueType === "needs_extension") {
        const hint = buildExpansionHint(item.text, unitId);
        if (hint.children.length > 0) {
          fields.push(`expansionHint: ${JSON.stringify(hint.children)}`);
        }
      }
      if (issueType === "error") {
        // (resolved items never reach this block — caller-side filter drops
        // them before they're added to bucket.iss.) The remaining error items
        // are either sourceIssue (markdown-data problems) or unknown; both
        // surface a hand-curated suggestion in the note when one exists.
        const entry = getErrorSuggestion(item.text);
        const reviewerNote = note.trim();
        const noteParts: string[] = [];
        if (reviewerNote) noteParts.push(reviewerNote);
        if (entry?.note) noteParts.push(entry.note);
        if (noteParts.length > 0) {
          fields.length = 4; // drop the empty `note: ""` placeholder
          fields.push(`note: ${JSON.stringify(noteParts.join("\n"))}`);
        }
        // Surface the immediately preceding / following item so a reviewer can
        // see the broken-apart answer fragment in context.
        const idx = allItemsInLesson.findIndex((other) => other.id === item.id);
        const prev = idx > 0 ? allItemsInLesson[idx - 1] : null;
        const next = idx >= 0 && idx < allItemsInLesson.length - 1 ? allItemsInLesson[idx + 1] : null;
        const context: { prev?: string; next?: string } = {};
        if (prev) context.prev = prev.text;
        if (next) context.next = next.text;
        if (context.prev || context.next) {
          fields.push(`originalContext: ${JSON.stringify(context)}`);
        }
      }
      lines.push(`      { ${fields.join(", ")} },`);
    }
    lines.push(`    ],`);
  }
  lines.push(`  },`);
  return lines.join("\n");
}

function buildApplyOutput(
  unit: LanguageUnitData,
  items: ReviewItem[],
  state: LanguageReviewPersistedState,
): string {
  const buckets = new Map<string, { newK: ReviewItem[]; recK: ReviewItem[]; tgt: ReviewItem[]; iss: ReviewItem[] }>();
  let resolvedErrorCount = 0;
  let resolvedSentenceCount = 0;
  let resolvedKeywordCount = 0;
  let fallbackCount = 0;

  for (const item of items) {
    const itemState = state[item.id];
    const decision: LanguageReviewDecision = itemState?.decision ?? "keep";
    const bucket =
      buckets.get(item.lessonId) ?? {
        newK: [],
        recK: [],
        tgt: [],
        iss: [],
      };
    if (decision === "error") {
      const entry = getErrorSuggestion(item.text);
      if (entry?.kind === "resolved") {
        // Auto-resolve: drain the resolved entry into targetSentences (from
        // resolvedItems) and / or newKeywords / recycledKeywords (from
        // expandedKeywords). The original broken `item.text` is never
        // emitted. If the entry has no replacement text, fall back to a
        // reviewIssue and warn the author.
        resolvedErrorCount += 1;
        const result = drainResolvedError(item, entry, bucket);
        resolvedSentenceCount += result.sentenceCount;
        resolvedKeywordCount += result.keywordCount;
        if (result.fellBack) fallbackCount += 1;
        buckets.set(item.lessonId, bucket);
        continue;
      }
    }
    if (decision === "sentence") {
      bucket.tgt.push(item);
    } else if (decision === "error" || decision === "extend") {
      bucket.iss.push(item);
    } else {
      if (item.source === "new") bucket.newK.push(item);
      else bucket.recK.push(item);
    }
    buckets.set(item.lessonId, bucket);
  }

  const blocks = Array.from(buckets.entries())
    .filter(([, b]) => b.newK.length + b.recK.length + b.tgt.length + b.iss.length > 0)
    .map(([lessonId, b]) => formatLessonBlock(lessonId, b, state, unit.unitId, items.filter((i) => i.lessonId === lessonId)));

  if (blocks.length === 0) {
    return [
      `// ${unit.unitId} — no items classified yet.`,
      `// Auto-classification result: nothing to apply.`,
    ].join("\n");
  }

  const headerLines = [
    `import type { UnitLanguageClassificationMap } from "./types";`,
    ``,
    `// Generated by Language Classification Review tool (auto-classified + reviewed).`,
    `// Paste into src/curriculum/languageClassifications/${toScaffoldFileBase(unit.unitId)}.ts`,
    `// and add the import to index.ts.`,
  ];
  if (resolvedErrorCount > 0) {
    const parts: string[] = [`${resolvedSentenceCount} target sentence${resolvedSentenceCount === 1 ? "" : "s"}`];
    if (resolvedKeywordCount > 0) {
      parts.push(`${resolvedKeywordCount} keyword${resolvedKeywordCount === 1 ? "" : "s"}`);
    }
    const noun = `${resolvedErrorCount} error item${resolvedErrorCount === 1 ? "" : "s"}`;
    headerLines.push(
      ``,
      `// ${noun} auto-resolved via errorSuggestions.ts (hand-curated) → emitted as ${parts.join(" + ")}. Raw broken text is NOT emitted as a reviewIssue.`,
    );
    if (fallbackCount > 0) {
      headerLines.push(
        `// ⚠ ${fallbackCount} resolved error${fallbackCount === 1 ? " was" : "s were"} missing resolvedItems / expandedKeywords — kept as reviewIssue. Update errorSuggestions.ts to add the replacement text.`,
      );
    }
  }
  headerLines.push(
    `export const ${toScaffoldExportName(unit.unitId)}: UnitLanguageClassificationMap = {`,
    blocks.join("\n\n"),
    `};`,
  );
  return headerLines.join("\n");
}

function buildAllUnitsBundle(): { text: string; summary: { unitId: string; level: string; reviewed: number; total: number }[] } {
  const header = [
    `// EASTIE K Language Classification Bundle`,
    `// Generated by Language Classification Review tool (auto-classified + reviewer-confirmed).`,
    `// One bundle covers all K1/K2/K3 K-language units (30 in total).`,
    `// Split into per-unit files using the "// === {unitId} ===" separators and update`,
    `// src/curriculum/languageClassifications/index.ts so each new constant is registered.`,
    `//`,
    `// Each block is a valid UnitLanguageClassificationMap that can be pasted directly into`,
    `// src/curriculum/languageClassifications/{camelCaseUnitId}.ts alongside the existing`,
    `// k1LanguageUnit01Classifications file.`,
    ``,
  ].join("\n");

  const kLanguageEntries = dynamicUnitManifest.filter(
    (entry): entry is KLanguageDynamicUnitEntry => entry.renderer === "k-language",
  );
  kLanguageEntries.sort((a, b) => {
    if (a.level !== b.level) return a.level.localeCompare(b.level);
    return a.unitNumber - b.unitNumber;
  });

  const blocks: string[] = [];
  const summary: { unitId: string; level: string; reviewed: number; total: number }[] = [];

  for (const entry of kLanguageEntries) {
    const unit = entry.unit;
    const items = collectReviewItems(unit);
    const autoMap = new Map(items.map((item) => [item.id, autoClassifyLanguageItem(item.text, item.source)]));
    const storageKey = `eastie-language-review:${unit.unitId}`;
    const loaded = readState(storageKey);
    const state = mergeWithAuto(loaded, autoMap, items.map((i) => i.id));

    const reviewed = items.filter((i) => state[i.id]?.reviewed).length;
    summary.push({
      unitId: unit.unitId,
      level: entry.level,
      reviewed,
      total: items.length,
    });

    const body = buildApplyOutput(unit, items, state);
    if (!body) continue;
    blocks.push(`// === ${unit.unitId} ===\n${body}`);
  }

  if (blocks.length === 0) {
    return {
      text: header + "// No reviewed state found in localStorage for any K language unit.",
      summary,
    };
  }
  return { text: header + blocks.join("\n\n") + "\n", summary };
}

function toExportName(unitId: string) {
  return `${toCamel(unitId)}ClassificationsPreview`;
}

function toScaffoldExportName(unitId: string) {
  return `${toCamel(unitId)}Classifications`;
}

function toCamel(unitId: string) {
  return unitId.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase()).replace(/-/g, "");
}

function toScaffoldFileBase(unitId: string) {
  return unitId.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase()).replace(/-/g, "");
}

function downloadAsFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/typescript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------------------------------------------------------------------------
// Source / unit discovery
// ---------------------------------------------------------------------------

function findKLanguageUnit(level?: string, unitSlug?: string) {
  const unitNumber = parseUnitNumber(unitSlug);
  if (!level || unitNumber === null) return undefined;
  return dynamicUnitManifest.find(
    (entry): entry is KLanguageDynamicUnitEntry =>
      entry.renderer === "k-language" &&
      entry.level.toLowerCase() === level.toLowerCase() &&
      entry.unitNumber === unitNumber,
  )?.unit;
}

function parseUnitNumber(unitSlug?: string) {
  if (!unitSlug) return null;
  if (unitSlug === "unit-uh") return 0;
  const match = unitSlug.match(/^unit-(\d{2})$/);
  return match ? Number(match[1]) : null;
}

function collectReviewItems(unit: LanguageUnitData): ReviewItem[] {
  return unit.weeks.flatMap((week) =>
    week.lessons
      .filter((lesson) => lesson.lesson > 0)
      .flatMap((lesson) => {
        const lessonLabel = `Week ${week.week} / Day ${week.lessons.findIndex((item) => item.id === lesson.id) + 1} / PU L${lesson.lesson}`;
        return [
          ...splitLanguageItemsForReview(lesson.fields["New Language"] ?? "").map((text, index) => ({
            id: `${lesson.id}:new:${index}:${text}`,
            lessonId: lesson.id,
            lessonLabel,
            lessonTitle: lesson.title,
            source: "new" as const,
            text,
          })),
          ...splitLanguageItemsForReview(lesson.fields["Recycled Language"] ?? "").map((text, index) => ({
            id: `${lesson.id}:recycled:${index}:${text}`,
            lessonId: lesson.id,
            lessonLabel,
            lessonTitle: lesson.title,
            source: "recycled" as const,
            text,
          })),
        ];
      }),
  );
}

function splitLanguageItemsForReview(value: string) {
  if (!value || value.trim() === "None listed") return [];
  return value.split(/[｜|]/).map((item) => item.trim()).filter(Boolean);
}

function groupByLesson(items: ReviewItem[]): LessonReviewGroup[] {
  const groups = new Map<string, ReviewItem[]>();
  for (const item of items) {
    const group = groups.get(item.lessonId);
    if (group) group.push(item);
    else groups.set(item.lessonId, [item]);
  }
  return Array.from(groups.entries()).map(([lessonId, lessonItems]) => ({
    lessonId,
    lessonLabel: lessonItems[0].lessonLabel,
    lessonTitle: lessonItems[0].lessonTitle,
    items: lessonItems,
  }));
}

function getUnitPath(unit: LanguageUnitData) {
  const unitSlug = unit.unitNumber === 0 ? "unit-uh" : `unit-${String(unit.unitNumber).padStart(2, "0")}`;
  return `/curriculum/${unit.level.toLowerCase()}/language/${unitSlug}`;
}
