import type { UnitLanguageClassificationMap } from "./types";

// Auto-classified K language classifications for k1-language-unit-00.
// Generated from the Language Classification Review tool using the default
// auto-classifier + errorSuggestions.ts (no reviewer overrides).
// 6 error items auto-resolved via errorSuggestions.ts → emitted as 8 target sentences.

export const k1LanguageUnit00Classifications: UnitLanguageClassificationMap = {
  "pu-l1": {
    newKeywords: [
      { text: "Friendly family character names", source: "PU" },
      { text: "Dad", source: "PU" },
      { text: "Mum", source: "PU" },
    ],
    targetSentences: [
      { text: "Hello. I'm (Jenny/Jim). Goodbye.", source: "PU" },
    ],
  },
  "pu-l2": {
    newKeywords: [
      { text: "bird", source: "PU" },
      { text: "boat", source: "PU" },
      { text: "book", source: "PU" },
      { text: "bus", source: "PU" },
      { text: "cat", source: "PU" },
    ],
    recycledKeywords: [
      { text: "Friendly family character names", source: "PU" },
    ],
    targetSentences: [
      { text: "No, thank you.", source: "PU" },
      { text: "Yes, please.", source: "PU" },
      { text: "What's this? It's a... This is (a)...", source: "PU" },
      { text: "Hello. I'm (Jenny/Jim). Goodbye.", source: "PU" },
    ],
  },
  "pu-l3": {
    newKeywords: [
      { text: "numbers 1-6", source: "PU" },
      { text: "plurals (book", source: "PU" },
      { text: "books)", source: "PU" },
      { text: "stand up", source: "PU" },
    ],
    recycledKeywords: [
      { text: "Friendly family character names", source: "PU" },
    ],
    targetSentences: [
      { text: "It's (a)...", source: "PU" },
    ],
    reviewIssues: [
      { text: "animals", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["bird","cat","animals","rabbit","animal","cow","sheep","monster","dog","elephant","flamingo","frog","toad","duck","horse","mouse","bear","crocodile","monkey","snake","tiger","lion"] },
      { text: "objects", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["book","crayon","teacher","bag","classroom","pencil","school","rubber"] },
    ],
  },
  "pu-l4": {
    newKeywords: [
      { text: "blue", source: "PU" },
      { text: "green", source: "PU" },
      { text: "orange", source: "PU" },
      { text: "purple", source: "PU" },
      { text: "red", source: "PU" },
      { text: "yellow", source: "PU" },
      { text: "crayon", source: "PU" },
    ],
    recycledKeywords: [
      { text: "numbers 1-6", source: "PU" },
      { text: "plurals", source: "PU" },
      { text: "bus", source: "PU" },
    ],
    targetSentences: [
      { text: "What colour is this?", source: "PU" },
      { text: "What number is this?", source: "PU" },
      { text: "Bus number (3) is (purple).", source: "PU" },
      { text: "No, thank you.", source: "PU" },
      { text: "Yes, please.", source: "PU" },
      { text: "This is ...", source: "PU" },
      { text: "What's this? It's a ...", source: "PU" },
    ],
  },
};
