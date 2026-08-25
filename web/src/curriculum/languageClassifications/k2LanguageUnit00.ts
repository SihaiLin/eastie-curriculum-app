import type { UnitLanguageClassificationMap } from "./types";

// Auto-classified K language classifications for k2-language-unit-00.
// Generated from the Language Classification Review tool using the default
// auto-classifier + errorSuggestions.ts (no reviewer overrides).

export const k2LanguageUnit00Classifications: UnitLanguageClassificationMap = {
  "pu-l1": {
    newKeywords: [
      { text: "Hello", source: "PU" },
      { text: "numbers 1-10", source: "PU" },
    ],
    targetSentences: [
      { text: "I'm ...", source: "PU" },
      { text: "How old are you?", source: "PU" },
    ],
    reviewIssues: [
      { text: "colours", originalSource: "new", issueType: "needs_extension", note: "", expansionHint: ["blue","green","orange","purple","red","yellow","black","brown"] },
    ],
  },
  "pu-l2": {
    targetSentences: [
      { text: "How old are you?", source: "PU" },
      { text: "I'm ...", source: "PU" },
      { text: "This is ...", source: "PU" },
      { text: "What's your name?", source: "PU" },
    ],
    reviewIssues: [
      { text: "colours", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["blue","green","orange","purple","red","yellow","black","brown"] },
      { text: "family", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["Dad","Mum","man","woman","boy","girl","family","friend","twins","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"] },
      { text: "names", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["Dad","Mum","man","woman","boy","girl","family","friend","twins","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"] },
    ],
  },
};
