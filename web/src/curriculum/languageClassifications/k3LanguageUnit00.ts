import type { UnitLanguageClassificationMap } from "./types";

// Auto-classified K language classifications for k3-language-unit-00.
// Generated from the Language Classification Review tool using the default
// auto-classifier + errorSuggestions.ts (no reviewer overrides).
// 2 error items auto-resolved via errorSuggestions.ts → emitted as 8 target sentences.

export const k3LanguageUnit00Classifications: UnitLanguageClassificationMap = {
  "pu-l1": {
    newKeywords: [
      { text: "cook (n)", source: "PU" },
      { text: "thank you. Nice to meet you.", source: "PU" },
    ],
    recycledKeywords: [
      { text: "character names", source: "PU" },
      { text: "sports and hobbies", source: "PU" },
      { text: "farm", source: "PU" },
      { text: "tractor", source: "PU" },
    ],
    targetSentences: [
      { text: "How are you? I'm fine", source: "PU" },
      { text: "What's your name?", source: "PU" },
      { text: "My name's (Jim).", source: "PU" },
      { text: "How old are you?", source: "PU" },
      { text: "I'm (seven).", source: "PU" },
      { text: "Where do you live?", source: "PU" },
      { text: "I live in (London).", source: "PU" },
    ],
    reviewIssues: [
      { text: "animals", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["bird","cat","animals","rabbit","animal","cow","sheep","monster","dog","elephant","flamingo","frog","toad","duck","horse","mouse","bear","crocodile","monkey","snake","tiger","lion"] },
      { text: "family", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["Dad","Mum","man","woman","boy","girl","family","friend","twins","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"] },
    ],
  },
  "pu-l2": {
    newKeywords: [
      { text: "asleep", source: "PU" },
      { text: "good at ...-ing", source: "PU" },
      { text: "model", source: "PU" },
      { text: "show (n)", source: "PU" },
      { text: "singer", source: "PU" },
    ],
    recycledKeywords: [
      { text: "barn", source: "PU" },
      { text: "book", source: "PU" },
      { text: "ear", source: "PU" },
      { text: "eat", source: "PU" },
      { text: "fun", source: "PU" },
      { text: "game", source: "PU" },
      { text: "hair", source: "PU" },
      { text: "paper", source: "PU" },
      { text: "photo", source: "PU" },
      { text: "sing", source: "PU" },
      { text: "sleep", source: "PU" },
      { text: "be + adjective (She's beautiful)", source: "PU" },
      { text: "Don't ...", source: "PU" },
    ],
    targetSentences: [
      { text: "He's got (long hair).", source: "PU" },
      { text: "I like ...-ing.", source: "PU" },
      { text: "You can't...", source: "PU" },
    ],
    reviewIssues: [
      { text: "adjectives", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["new","nice","big","small","long","short","beautiful","dirty","old","clean","hot","ugly","cold","pretty","fat","tall","thin"] },
      { text: "animals", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["bird","cat","animals","rabbit","animal","cow","sheep","monster","dog","elephant","flamingo","frog","toad","duck","horse","mouse","bear","crocodile","monkey","snake","tiger","lion"] },
      { text: "family", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["Dad","Mum","man","woman","boy","girl","family","friend","twins","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"] },
      { text: "present continuous", originalSource: "recycled", issueType: "needs_extension", note: "" },
    ],
  },
};
