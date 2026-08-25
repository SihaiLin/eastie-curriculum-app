import type {
  LanguageReviewAutoClassification,
  LanguageReviewDecision,
  LanguageReviewSource,
} from "./types";

// ---------------------------------------------------------------------------
// Heuristic auto-classification for Power Up language items.
//
// Buckets:
//   - "keep"     → keep as keyword (newKeywords if source="new", recycledKeywords otherwise)
//   - "sentence" → promote to targetSentences
//   - "error"    → reviewIssue, issueType="error"
//   - "extend"   → reviewIssue, issueType="needs_extension"
//
// Confidence is a soft 0..1 hint — below LANGUAGE_REVIEW_CONFIDENCE_THRESHOLD
// the item flows into the "Needs Review" lane by default.
// ---------------------------------------------------------------------------

const CATEGORY_KEYWORDS: ReadonlySet<string> = new Set([
  "colours",
  "colors",
  "colour",
  "color",
  "numbers",
  "number",
  "names",
  "name",
  "animals",
  "animal",
  "emotions",
  "food",
  "fruit",
  "sports",
  "toys",
  "things",
  "people",
  "family",
  "rooms",
  "room",
  "school",
  "classroom",
  "home",
  "nature",
  "town",
  "classroom words",
  "classroom objects",
  "school words",
  "home objects",
  "parts of the body",
  "body parts",
  "action verbs",
  "free time activities",
  "prepositions",
  "prepositions of place",
  "adjectives for describing appearance",
  "adjectives",
  "adverbs of frequency",
  "adverbs",
  "present continuous",
  "can/can't",
  "can / can't",
  "adverbs of see story on pupil's book pages 38-39 frequency",
  "days of the week",
  "objects",
  "picture",
  "pictures",
  "friends and family",
  "friends",
  "questions",
  "answers",
  "language from L4",
  "language from the text",
  "phrases",
  "prepositions of place",
]);

const EXTENSION_PHRASES: readonly string[] = [
  "adjectives for describing",
  "adverbs of ",
  "parts of the body",
  "school words",
  "classroom words",
  "classroom objects",
  "home objects",
  "free time activities",
  "days of the week",
  "prepositions of place",
];

// Broken PU segmentation markers (these appear AFTER PU's ｜| split, so the broken
// piece is already in its own item — we just need to flag the artifact).
const ORPHAN_YES_NO = /^\s*(Yes|No|He is|She is|They are|It is|I'm not|I'm)\s*[.。]?\s*$/i;
// "Question? Yes" — Yes got glued to the prompt instead of becoming its own answer.
const TRAILING_YES_NO = /[?？]\s*(Yes|No)\s*\.?\s*$/i;
// "I/we have. No" / "I can. No" / "He hasn't. No" — a yes/no answer starter
// got glued to the previous line.
const ANSWER_TRAILING_NO = /\b(I|We|You|They|He|She|It|Yes,?\s*he|Yes,?\s*she|Yes,?\s*they|Yes,?\s*we|Yes,?\s*I)\s+(have|has|haven't|hasn't|have not|has not|am not|aren't|isn't|are not|is not|do|does|did|don't|doesn't|didn't|can|could|will|would|am|is|are|was|were)\.?\s+No\s*\.?\s*$/i;
// "I/we have. Yes" — same shape with yes at the end.
const ANSWER_TRAILING_YES = /\b(I|We|You|They|He|She|It)\s+(have|has|haven't|hasn't|have not|has not|am not|aren't|isn't|are not|is not|do|does|did|don't|doesn't|didn't|can|could|will|would|am|is|are|was|were)\.?\s+Yes\s*\.?\s*$/i;
// Bare "No" / "Yes" at start followed by period.
const BARE_YES_NO = /^\s*(Yes|No)\.?\s*$/i;
// "label: long sentence. (continuation)" — PU segmentation glued a label and a long
// sentence into a single item. Triggered by 20+ chars of content between the first
// ":" and the first ".".
const PU_BROKEN_LABEL_SENTENCES = /^[A-Za-z][A-Za-z\s']+:\s+[A-Za-z][^.]{20,}\./;
// Markdown bleed — k3 Unit 3 has "See story on Pupil's Book pages N-N" which is a
// markdown reference, not a teachable item. The text should never reach us like this.
const MARKDOWN_BLEED = /See story on Pupil's Book pages/i;
// Chained "X. / No" / "X. / Yes" — answer fragment glued to the previous line.
const CHAINED_ANSWER_SLASH = /\.\s*\/\s*(No|Yes|yes|no)\.?\s*$/i;
// Chained "Question? Sentence" — e.g. "What's your favourite ...? My favourite ..."
const CHAINED_QUESTION = /^[A-Z].{15,}\?\s+[A-Z]/;
// Chained "Sentence. Another [Capitalised]" — multiple sentences glued together
// without a question mark (e.g. "You're right. comparative adjectives",
// "I never get up late. always", "he/she doesn't. He/She wants...").
const CHAINED_SENTENCES = /^[A-Z][^.]{20,}\.\s+[A-Z]/;

// Sentence detectors
const SENTENCE_PUNCT = /[?？!！]/;
const STARTS_WITH_CAPITAL_VERB = /^(What|Where|When|Who|Who's|What's|Where is|Where are|Is|Are|Do|Does|Did|Have|Has|Can|Could|Will|Would|He|She|It|They|I|You|We|My|Your|His|Her|There|Here|Yes|No|How|Why|Which|That's|This is|These are|Those are|It is|It's|I'm|You're|We're|They're|He's|She's|Come|Sit|Look|Open|Close|Listen|Point|Stand|Turn|Let's)\b/;
const PLACEHOLDER_OR_SLASH = /(\([^)]*\)|\b\w+\s*\/\s*\w+\b)/;

function normalize(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"');
}

export function autoClassifyLanguageItem(
  rawText: string,
  _source: LanguageReviewSource,
): LanguageReviewAutoClassification {
  const text = normalize(rawText);
  if (!text) {
    return { decision: "keep", confidence: 0.5, reasons: ["Empty item, defaulting to keep."] };
  }

  // 1. error detection — broken PU segmentation (post-split artifacts)
  if (ANSWER_TRAILING_NO.test(text) || ANSWER_TRAILING_YES.test(text)) {
    return {
      decision: "error",
      confidence: 0.92,
      reasons: ["'<verb>. Yes/No' shape — broken PU segmentation between answer and response."],
    };
  }
  if (TRAILING_YES_NO.test(text)) {
    return {
      decision: "error",
      confidence: 0.92,
      reasons: ["Question ended with '? Yes' / '? No' — looks like a fragmented answer starter glued to the prompt."],
    };
  }
  if (BARE_YES_NO.test(text) || ORPHAN_YES_NO.test(text)) {
    return {
      decision: "error",
      confidence: 0.9,
      reasons: ["Orphan 'Yes' / 'No' — should be a response starter, not its own item."],
    };
  }
  if (PU_BROKEN_LABEL_SENTENCES.test(text)) {
    return {
      decision: "error",
      confidence: 0.9,
      reasons: ["'label: sentence. Sentence' — broken PU segmentation glued a label and two sentences together."],
    };
  }
  if (MARKDOWN_BLEED.test(text)) {
    return {
      decision: "error",
      confidence: 0.95,
      reasons: ["Contains 'See story on Pupil's Book pages' — markdown reference leaked into vocabulary, not a teachable item."],
    };
  }
  if (CHAINED_ANSWER_SLASH.test(text)) {
    return {
      decision: "error",
      confidence: 0.9,
      reasons: ["'<phrase>. / No|Yes' — chained answer fragment glued to the previous line; should be split."],
    };
  }
  if (CHAINED_SENTENCES.test(text)) {
    return {
      decision: "error",
      confidence: 0.9,
      reasons: ["'Sentence. Another' — multiple sentences chained into one item; should be split."],
    };
  }
  if (CHAINED_QUESTION.test(text)) {
    return {
      decision: "error",
      confidence: 0.9,
      reasons: ["'Question? Sentence' — question chained with its answer; should be split."],
    };
  }
  // Chained with lowercase or alphanumeric follow-up — "X. always" /
  // "X. comparative adjectives" / "X. 1Sicae" (PU kept two items glued).
  // Skip if the whole text is short (single short sentence ending in period).
  if (/^[A-Z][^.]{10,}\.\s+[a-z0-9]/i.test(text)) {
    return {
      decision: "error",
      confidence: 0.88,
      reasons: ["'Sentence. followup' — second item (lower-cased or digit-led) was glued to the first; should be split."],
    };
  }

  // 2. needs_extension detection — category / umbrella
  const lower = text.toLowerCase();
  if (CATEGORY_KEYWORDS.has(lower)) {
    return {
      decision: "extend",
      confidence: 0.95,
      reasons: [`"${text}" is a category umbrella, not concrete teachable language.`],
    };
  }
  for (const phrase of EXTENSION_PHRASES) {
    if (lower.includes(phrase)) {
      return {
        decision: "extend",
        confidence: 0.85,
        reasons: [`Phrase "${phrase}" is a category / umbrella description.`],
      };
    }
  }
  // Heuristic: "adjectives / adverbs / nouns / verbs / words / vocabulary / phrases / expressions of/for/in ..."
  if (/^(adjectives|adverbs|nouns|verbs|phrases|expressions|words|vocabulary)\s+(for|of|in)\b/i.test(text)) {
    return {
      decision: "extend",
      confidence: 0.9,
      reasons: ["Starts with a part-of-speech or scope phrase — sounds like a category umbrella."],
    };
  }
  // "one of the family" — kept as a normal keyword (alias-mapped to family
  // for expansion hints), not treated as an extend umbrella anymore.
  // (Removed the "extend" rule per 2026-08-18 review call.)

  // 3. sentence detection
  // 3a. ends with ? ! 。
  if (SENTENCE_PUNCT.test(text) && (text.endsWith("?") || text.endsWith("!") || text.endsWith("？") || text.endsWith("！"))) {
    return {
      decision: "sentence",
      confidence: 0.9,
      reasons: ["Ends with ? / ! — looks like a question or imperative."],
    };
  }
  // 3b. contains a placeholder or slash variant + multi-word + starts with capital
  // (more specific, so it should win over the generic 3c below).
  if (PLACEHOLDER_OR_SLASH.test(text) && /\s/.test(text) && /^[A-Z]/.test(text) && text.split(/\s+/).length >= 2) {
    return {
      decision: "sentence",
      confidence: 0.88,
      reasons: ["Has placeholder / slash variant and looks like a sentence pattern."],
    };
  }
  // 3c. imperative / statement sentence pattern (e.g. "Come here!", "Sit down.", "Here you are.")
  if (STARTS_WITH_CAPITAL_VERB.test(text) && /\s/.test(text) && text.length >= 6 && text.length <= 60) {
    if (text.split(/\s+/).length >= 2) {
      // Canonical short sentences get a higher confidence floor — they're
      // well-known child-English phrases, not ambiguous mid-confidence guesses.
      const SHORT_CANONICAL_SENTENCE = new Set([
        "I'm sorry", "Here you are", "I don't know", "Let's go",
        "Can I have some chocolate",
        "I am ...-ing", "I enjoy ...-ing", "I like ...-ing", "I love ...-ing",
        "Do you ever ... 2",
      ]);
      if (SHORT_CANONICAL_SENTENCE.has(text)) {
        return {
          decision: "sentence",
          confidence: 0.9,
          reasons: ["Canonical short sentence — high confidence."],
        };
      }
      // "Let's... Yes" — PU has a placeholder glued to a Yes answer. The actual
      // item is the imperative template "Let's..."; the trailing "Yes" is a split
      // artifact. formatLessonBlock trims the trailing "Yes" / "No" off the
      // sentence before rendering, so the auto decision can be confident.
      if (text === "Let's... Yes") {
        return {
          decision: "sentence",
          confidence: 0.9,
          reasons: ["Imperative template 'Let's...' with a 'Yes' answer glued on. The trailing 'Yes' is a PU split artifact and will be trimmed on render."],
        };
      }
      // Period-ending statement pattern → higher confidence.
      const endsWithPeriod = /\.\s*$/.test(text);
      return {
        decision: "sentence",
        confidence: endsWithPeriod ? 0.88 : 0.7,
        reasons: [
          endsWithPeriod
            ? "Capitalised statement ending in a period — likely a sentence."
            : "Starts with a capital word followed by more words — likely a sentence.",
        ],
      };
    }
  }
  // 3d. lowercase grammar pattern with slash variants — but only for known
  // teacher-facing grammar patterns (modal/aux pairs, contraction pairs).
  // Plain vocab lists like "in/on/under", "baby/babies", "at home/school"
  // are NOT grammar patterns — they should fall through to keep.
  const GRAMMAR_SLASH_WHITELIST = new Set([
    "have/has got",
    "have/haven't got",
    "haven't/hasn't got",
    "like / don't like",
    "don't like / doesn't like",
    "can / can't",
    "can/ can't",
    "can/can't",
    "must/mustn't",
  ]);
  if (/^[a-z]/.test(text) && GRAMMAR_SLASH_WHITELIST.has(text)) {
    return {
      decision: "sentence",
      confidence: 0.85,
      reasons: ["Lowercase grammar pattern with slash variants — treat as a sentence template."],
    };
  }
  // 3e. imperative / verb phrase with placeholder, e.g. "be kind to (someone)"
  if (/^be \w+ to \([^)]+\)$/i.test(text) && text.length <= 40) {
    return {
      decision: "sentence",
      confidence: 0.85,
      reasons: ["Imperative pattern with placeholder — treat as a sentence template."],
    };
  }
  // 3f. short verb-phrase templates like "have got" / "has got" — pattern, not a single word.
  if (/^(have got|has got)$/i.test(text)) {
    return {
      decision: "sentence",
      confidence: 0.85,
      reasons: ["Verb-phrase template (have got / has got) — treat as a sentence pattern."],
    };
  }

  // 4. default = keep
  return {
    decision: "keep",
    confidence: 0.9,
    reasons: ["Single word / short phrase — default to keep."],
  };
}

export function needsReview(state: { confidence: number; decision: LanguageReviewDecision }): boolean {
  // error: broken PU segmentation — always needs a human to decide what to do with it.
  // (Note: the export pipeline separately consults errorSuggestions.ts to
  // auto-resolve well-known errors. The Needs Review lane is a separate concern.)
  if (state.decision === "error") return true;
  // extend: high-confidence category umbrellas ("colours", "numbers", "language from the story",
  // "unit language", ...) are unambiguous. Let them through without reviewer confirmation.
  if (state.decision === "extend" && state.confidence >= 0.85) return false;
  // Mid-confidence extend + low-confidence keep / sentence still need a look.
  return state.confidence < 0.8;
}
