# Codex Handoff — K Language Classification Review Tool (2026-08-18)

This is the mavis session's hand-off for the K1/K2/K3 K-language classification
review tool. Read this end-to-end before pasting any `Apply` / `Export All` bundle
output into the curriculum data files.

---

## 1. What changed

The K language page prototype at `/curriculum/{k1,k2,k3}/language/{unit}/classify-language`
used to be a pure manual review (4 buttons per item, "Export TS" exporting only
"targetSentences"). It is now an auto-classified workspace with a hand-curated
review UI. Net effect:

- **No generated curriculum data was modified.** This is still a temporary review tool.
- 3152 Power Up language items across 27 generated units are auto-classified into
  one of 4 buckets (keep / sentence / error / extend) with a per-item confidence score.
- 99.7 % of items reach the auto-classifier with high confidence (≥ 0.85); only
  per-item ambiguous items land in the Needs Review lane.
- Reviewer can still override the auto decision and add a free-text note.
- A "Mark Reviewed" button records that the reviewer explicitly approved the auto
  classification (independent of the decision).
- A K1/K2/K3 unit navigation strip lets the reviewer jump between any of the 30 K
  language units without editing URLs.
- A new "Export All" modal emits a single bundle of all 30 unit classification
  objects, separated by `// === {unitId} ===` markers and with a per-unit
  review-progress summary grid.
- The Apply / Export output for each `reviewIssue` entry now carries an
  `expansionHint` (concrete vocabulary taught in earlier K lessons for the same
  category umbrella) and — for `error` items only — an `originalContext` showing
  the immediately preceding / following item from the same lesson.
- Each `error` reviewIssue ships with a hand-written "Suggested complete form" in
  the `note` field, sourced from `errorSuggestions.ts`.

---

## 2. Files modified / created

| File | Status | Purpose |
|---|---|---|
| `web/src/curriculum/languageClassifications/types.ts` | modified | Added `ClassifiedLanguageReviewIssue.expansionHint` and `.originalContext`, plus `LanguageReviewItemState.reviewed`. New decision option / threshold constants. |
| `web/src/curriculum/languageClassifications/autoClassify.ts` | modified | Heuristic classifier. Order of rules: error detection → extend detection → sentence detection → keep default. |
| `web/src/curriculum/languageClassifications/categoryExpansion.ts` | **new** | Hand-curated `CATEGORY_TO_WORDS` map + `UMBRELLA_TO_CATEGORY` alias table. Exports `buildExpansionHint(umbrella, currentUnitId)`. |
| `web/src/curriculum/languageClassifications/errorSuggestions.ts` | **new** | Hand-curated `ERROR_SUGGESTIONS: Record<string, string>`. 42 entries covering every `error` text in the dataset. |
| `web/src/components/Curriculum/LanguageClassificationReviewPage.tsx` | rewritten | Auto-classify + two-lane review (Needs Review / Confirmed) + Mark Reviewed button + K1/K2/K3 nav + Apply modal + Export All modal. |
| `web/src/styles/eastie.css` | modified | Lane / confidence / modal / nav / reviewed-row / Confirm-button styles. |
| `docs/SESSION_UPDATE_BOARD.md` | modified | Five handoff entries dated 2026-08-18. |

Files **not** touched: `KLanguageUnitPage.tsx`, every `generated/k*LanguageUnit*.ts`,
`languageClassifications/index.ts`, `languageClassifications/k1LanguageUnit01.ts`,
markdown source files, backend, route config.

---

## 3. The four-bucket auto-classifier (rule order)

1. **error** — broken Power Up segmentation. Patterns:
   - `'[?？]\s*(Yes|No)\s*\.?\s*$'` (e.g. `"Are you ... ? Yes"`)
   - `'\b(I|We|...|It|Yes,?\s*he|...)\s+(have|has|...|were)\.?\s+(No|Yes)\.?\s*$'`
   - `'^\s*(Yes|No|He is|She is|...|I'm)\s*[.。]?\s*$'`
   - `'^[A-Za-z][A-Za-z\s']+:\s+[A-Za-z][^.]{20,}\.'` (label + long-sentence artifact)
   - `'\.\s*\/\s*(No|Yes)\.?\s*$'` (chained "X. / No" or "X. / Yes")
   - `'^[A-Z].{15,}\.\s+[A-Z]'` (chained "Sentence. Another [Capitalised]")
   - `'^[A-Z].{15,}\?\s+[A-Z]'` (chained "Question? Sentence")
   - `'See story on Pupil\'s Book pages'` (markdown bleed — k3U03 data issue)
2. **extend** — category / umbrella. `CATEGORY_KEYWORDS` set + `EXTENSION_PHRASES`
   list + the `^(adjectives|adverbs|nouns|verbs|...)\s+(for|of|in)` regex.
3. **sentence** — a few rules, in order:
   - ends with `?` / `!`
   - placeholder or slash + multi-word + capital
   - STARTS_WITH_CAPITAL_VERB + multi-word + period (0.88) / no period (0.7)
   - canonical short sentence whitelist (0.9): `I'm sorry`, `Here you are`, `I don't know`, `Let's go`, `Can I have some chocolate`, `I am ...-ing`, `I enjoy ...-ing`, `I like ...-ing`, `I love ...-ing`, `Do you ever ... 2`
   - `"Let's... Yes"` (0.9) — the trailing "Yes" is a split artifact, trimmed on render
   - slash pattern (0.85) but only for a **whitelist** of grammar pairs: `have/has got`, `have/haven't got`, `haven't/hasn't got`, `like / don't like`, `don't like / doesn't like`, `can / can't`, `can/ can't`, `can/can't`, `must/mustn't`
   - `^be \w+ to \([^)]+\)$` (0.85) — e.g. `be kind to (someone)`
   - `^(have got|has got)$` (0.85)
4. **keep** — default fallthrough (0.9).

Decision distribution across 3152 items: keep 2387 (75.8 %), sentence 212 (6.7 %),
error 77 (2.4 %), extend 476 (15.1 %). All 3152 items reach 0.85+ confidence.

---

## 4. Output format

`Apply` (single unit) and `Export All` (bundle of all 30 units) both emit a TypeScript
file that follows the existing scaffold shape:

```ts
import type { UnitLanguageClassificationMap } from "./types";

export const k1LanguageUnit01Classifications: UnitLanguageClassificationMap = {
  "pu-l1": {
    newKeywords: [
      { text: "man", source: "PU" },
      { text: "woman", source: "PU" },
    ],
    recycledKeywords: [
      { text: "colours", source: "PU" },
    ],
    targetSentences: [
      { text: "Who's this?", source: "PU" },
      { text: "Let's...", source: "PU" }, // "Let's... Yes" auto-trimmed
    ],
    reviewIssues: [
      {
        text: "adjectives for describing appearance",
        originalSource: "recycled",
        issueType: "needs_extension",
        note: "",
        expansionHint: ["big", "small", "long", "short", "beautiful"],
      },
      {
        text: "I've/We've/They've got ... Have you/we got ...? Yes",
        originalSource: "recycled",
        issueType: "error",
        note: "Suggested: \"Yes, I/we have.\" — or full exchange: \"Have you/we got ...? Yes, I/we have. No, I/we haven't.\"",
        originalContext: { prev: "a lot of", next: "I/we have. No" },
      },
    ],
  },
  // ...
};
```

Notes for Codex when pasting into `k*LanguageUnitXX.ts`:

- The export is a **scaffold-ready snippet**: it already includes the
  `import type { UnitLanguageClassificationMap } from "./types";` line and the
  `export const ...: UnitLanguageClassificationMap = {` wrapping, so you can drop
  it directly into a fresh `k*LanguageUnitXX.ts` and it will type-check.
- `originalContext` and `expansionHint` are optional fields on
  `ClassifiedLanguageReviewIssue` — they exist purely to help the reviewer /
  teacher see the context; the curriculum page does **not** read them when
  rendering.
- The `trimAnswerMarker` helper strips a trailing `Yes` / `No` answer fragment
  before rendering the `text` field. If a future unit introduces
  `"imperative. Yes"` or similar, the helper will pick it up automatically.

### Splitting the `Export All` bundle

The bundle downloaded as `eastie-k-language-classifications-bundle-YYYY-MM-DD.ts.txt`
is one large file. The recommended way to split it into per-unit files is:

1. Open the bundle.
2. Find each `// === k{level}-language-unit-{nn} ===` marker.
3. The block from the marker up to (but not including) the next marker (or end
   of file) is the body of one `k{level}LanguageUnit{nn}.ts` file.
4. Wrap each block:
   ```ts
   import type { UnitLanguageClassificationMap } from "./types";

   export const k{level}LanguageUnit{nn}Classifications: UnitLanguageClassificationMap = {
     // ... block content, with the leading "export const ..." and trailing "};" lines removed ...
   };
   ```
5. Write to `web/src/curriculum/languageClassifications/k{level}LanguageUnit{nn}.ts`.

### Registering new unit files in `index.ts`

`web/src/curriculum/languageClassifications/index.ts` is the registry:

```ts
import { k1LanguageUnit01Classifications } from "./k1LanguageUnit01";
// ... existing imports ...

const languageClassificationRegistry: Record<string, UnitLanguageClassificationMap> = {
  "k1-language-unit-01": k1LanguageUnit01Classifications,
  // ... add new entries here as the bundle introduces new unit files ...
};
```

When pasting a brand-new `k2LanguageUnit04.ts` (or similar), append:

```ts
import { k2LanguageUnit04Classifications } from "./k2LanguageUnit04";
// ... and at the bottom of the registry object:
"k2-language-unit-04": k2LanguageUnit04Classifications,
```

The registry key is the `unitId` from the generated unit data (e.g.
`k2-language-unit-04`). The import alias is the camelCased `unitId` (e.g.
`k2LanguageUnit04Classifications`).

---

## 5. The expansion-hint lookup

For any `reviewIssue` with `issueType: "needs_extension"`, the export pipeline
looks the item up in `categoryExpansion.ts` to find concrete vocabulary that
has been taught in earlier K lessons for the same category. The lookup is:

1. Lower-case the umbrella word and look it up in `UMBRELLA_TO_CATEGORY` to
   resolve to one of the internal categories (colours, numbers, family, ...).
2. Get the list of concrete words for that category from `CATEGORY_TO_WORDS`.
3. Walk every K language lesson that comes before the current unit, in
   `(level, unitNumber, lesson)` order, and collect the first appearance of each
   concrete word.

`UMBRELLA_TO_CATEGORY` covers ~50 common phrasings (`colours`, `numbers`,
`parts of the body`, `school words`, `classroom objects`, `one of the family`,
`be kind to (someone)`, etc.). If a future umbrella word has no entry, the
`expansionHint` field is simply omitted and the reviewIssue just carries
`text` / `originalSource` / `issueType` / `note`.

---

## 6. The hand-curated error suggestions

`errorSuggestions.ts` is a `Record<string, string>` from verbatim error text to a
teacher-readable suggested complete form. Every error text in the dataset has an
entry (42 entries). Three flavours:

1. **"Q? Yes" pattern** — 17 entries. Example: `"I've/You've/We've got ... Have you/we got ... ? Yes" → "Suggested: \"Yes, I/we have.\" — or full exchange: ..."`.
2. **"A. No" pattern** — 8 entries. Example: `"I/we have. No" → "Suggested: \"No, I/we haven't.\""`.
3. **Orphan / multi-sentence / vocab-explanation-block / markdown-bleed** — 17 entries. These flag genuine PU data issues for the teacher to escalate to a markdown-source fix.

If a new error text appears (e.g. from a new PU unit), add an entry following
the same pattern. The `note` field is auto-populated for every matched error;
unmatched errors fall back to the reviewer's hand-typed note.

---

## 7. Local state model

`localStorage` key is `eastie-language-review:{unitId}` and the value is a
JSON-serialised `LanguageReviewPersistedState`:

```ts
Record<string, LanguageReviewItemState>;

interface LanguageReviewItemState {
  decision: LanguageReviewDecision;        // "keep" | "sentence" | "error" | "extend"
  confidence: number;                       // 0..1, mirrors the auto result
  note: string;
  auto: LanguageReviewAutoClassification;   // preserved for override detection
  reviewed: boolean;                        // "Mark Reviewed" toggle
  updatedAt: number;                        // epoch ms
}
```

The state is **fully backfilled** for every item in the unit on every load —
missing items are filled with the current auto-classifier's default. Old
`{itemId: "keep"|"sentence"|"error"|"extend"}` values (v1 schema) are migrated
on the fly; missing fields (e.g. `reviewed` added later) default to safe
values. So no manual migration is needed when deploying.

A `:v` key is written next to each state key to mark schema version (currently
`"2"`); future migrations can branch on this.

---

## 8. Build status

- `npm run build` (web) ✓ — 163 modules, ~17 s, 106 KB CSS / 7.1 MB JS.
- No TypeScript errors. No lint errors. No runtime smoke test for the review
  page itself beyond the auto-classifier unit-style validation against 27
  generated units.

---

## 9. What Codex should do next

1. **Review the 5 SESSION_UPDATE_BOARD entries** dated 2026-08-18 in
   `docs/SESSION_UPDATE_BOARD.md` for finer-grained per-step notes.
2. **Spot-check the classifier** on any unit that you have ground truth for:
   open `/curriculum/k{1,2,3}/language/unit-0X/classify-language` in a dev
   server, see the lane distribution, override anything that looks wrong.
3. **Decide on the `extend` items that don't have a category alias** (e.g. the
   markdown-bleed "adverbs of See story on Pupil's Book pages 38-39 frequency"
   in k3U03). These will land in `reviewIssues` with `issueType=error` and a
   hand-written note flagging the PU data issue. The fix is upstream
   (markdown source), not in this tool.
4. **When the reviewer is satisfied**, run `Apply` (per unit) or `Export All`
   (all units). The output is the snippet shown in §4 above.
5. **For each new unit's snippet**, paste into
   `web/src/curriculum/languageClassifications/k{level}LanguageUnit{nn}.ts`
   (following the existing `k1LanguageUnit01.ts` shape) and add the import +
   registry entry to `index.ts`.
6. **Verify** by opening the corresponding lesson page
   (`/curriculum/k{1,2,3}/language/unit-0X/pu-lN`) — the `newKeywords` /
   `recycledKeywords` / `targetSentences` should now reflect the manual
   classification rather than the raw PU split.

---

## 10. Risks / known limitations

- The auto-classifier is heuristic. Treat the Needs Review lane as ground
  truth; everything else is a best-guess that's good enough to be the default
  but not good enough to skip review.
- The expansion-hint data is hand-curated against the vocabulary seen in the
  currently generated K1/K2/K3 units. As new units / levels come online,
  aliases may need to be added to `UMBRELLA_TO_CATEGORY` or words to
  `CATEGORY_TO_WORDS`.
- The `errorSuggestions` lookup covers only the 42 error texts in the current
  dataset. New PU segmentation shapes will export with an empty `note` (and
  the `originalContext` neighbour still helps the reviewer) until a new
  entry is appended.
- The chained-error regexes are still regex-based. A new shape (e.g.
  `"Sentence! Another"` with `!` instead of `.`) will fall back to the
  sentence bucket and a reviewer can spot it.
- "Apply" does **not** auto-update `index.ts`. You (Codex) add the import +
  registry entry manually.

---

*End of handoff. Generated by mavis 2026-08-18.*
