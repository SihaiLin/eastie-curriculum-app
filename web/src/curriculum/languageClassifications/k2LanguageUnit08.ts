import type { UnitLanguageClassificationMap } from "./types";

// Auto-classified K language classifications for k2-language-unit-08.
// Generated from the Language Classification Review tool using the default
// auto-classifier + errorSuggestions.ts (no reviewer overrides).

export const k2LanguageUnit08Classifications: UnitLanguageClassificationMap = {
  "pu-l1": {
    recycledKeywords: [
      { text: "house", source: "PU" },
    ],
  },
  "pu-l2": {
    newKeywords: [
      { text: "bath", source: "PU" },
      { text: "bathroom", source: "PU" },
      { text: "bed", source: "PU" },
      { text: "bedroom", source: "PU" },
      { text: "dining room", source: "PU" },
      { text: "kitchen", source: "PU" },
      { text: "living room", source: "PU" },
      { text: "mirror", source: "PU" },
      { text: "radio", source: "PU" },
    ],
    recycledKeywords: [
      { text: "doors", source: "PU" },
      { text: "house", source: "PU" },
      { text: "windows", source: "PU" },
    ],
    reviewIssues: [
      { text: "home", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["café","home","school","house","shop","beach","town","park","zoo","world"] },
    ],
  },
  "pu-l3": {
    newKeywords: [
      { text: "dance", source: "PU" },
      { text: "look at", source: "PU" },
    ],
    recycledKeywords: [
      { text: "ride a horse", source: "PU" },
      { text: "sing", source: "PU" },
      { text: "swim", source: "PU" },
    ],
    targetSentences: [
      { text: "I can ...", source: "PU" },
      { text: "Can you ...?", source: "PU" },
    ],
  },
  "pu-l4": {
    newKeywords: [
      { text: "morning", source: "PU" },
      { text: "afternoon", source: "PU" },
      { text: "evening", source: "PU" },
    ],
    recycledKeywords: [
      { text: "sports and hobbies", source: "PU" },
    ],
    reviewIssues: [
      { text: "days of the week", originalSource: "new", issueType: "needs_extension", note: "", expansionHint: ["evening","morning","afternoon","today","yesterday"] },
      { text: "can/can't", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["can","must"] },
    ],
  },
  "pu-l5": {
    newKeywords: [
      { text: "armchair", source: "PU" },
      { text: "clock", source: "PU" },
      { text: "floor", source: "PU" },
      { text: "hall", source: "PU" },
      { text: "lamp", source: "PU" },
      { text: "painting", source: "PU" },
      { text: "phone", source: "PU" },
      { text: "rug", source: "PU" },
      { text: "sofa", source: "PU" },
    ],
    targetSentences: [
      { text: "There is/are", source: "PU" },
    ],
    reviewIssues: [
      { text: "colours", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["blue","green","orange","purple","red","yellow","black","brown"] },
      { text: "prepositions of place", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["under","in","next to","on","behind","between","in front of"] },
    ],
  },
  "pu-l6": {
    newKeywords: [
      { text: "behind", source: "PU" },
      { text: "between", source: "PU" },
      { text: "in front of", source: "PU" },
    ],
    recycledKeywords: [
      { text: "next to", source: "PU" },
      { text: "rooms and furniture in a house", source: "PU" },
    ],
  },
  "pu-l7": {
    newKeywords: [
      { text: "detached house", source: "PU" },
      { text: "flats", source: "PU" },
      { text: "houseboat", source: "PU" },
      { text: "hut", source: "PU" },
      { text: "ranch", source: "PU" },
      { text: "stilt-house", source: "PU" },
    ],
    reviewIssues: [
      { text: "adjectives", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["new","nice","big","small","long","short","beautiful","dirty","old","clean","hot","ugly","cold","pretty","fat","tall","thin"] },
    ],
  },
  "pu-l8": {
    newKeywords: [
      { text: "different", source: "PU" },
      { text: "same", source: "PU" },
    ],
    recycledKeywords: [
      { text: "things found in houses", source: "PU" },
    ],
    targetSentences: [
      { text: "have got", source: "PU" },
    ],
    reviewIssues: [
      { text: "can/can't", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["can","must"] },
      { text: "numbers", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["six"] },
      { text: "rooms", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["garden","house","room","bathroom","bedroom","kitchen","living room","big house"] },
    ],
  },
  "pu-l9": {
    newKeywords: [
      { text: "bounce", source: "PU" },
      { text: "hit", source: "PU" },
      { text: "mat", source: "PU" },
      { text: "ugly", source: "PU" },
    ],
    recycledKeywords: [
      { text: "furniture", source: "PU" },
      { text: "verbs (catch", source: "PU" },
      { text: "kick", source: "PU" },
      { text: "play", source: "PU" },
      { text: "throw)", source: "PU" },
    ],
    reviewIssues: [
      { text: "can/can't", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["can","must"] },
      { text: "rooms", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["garden","house","room","bathroom","bedroom","kitchen","living room","big house"] },
    ],
  },
  "pu-l10": {
    newKeywords: [
      { text: "come down", source: "PU" },
      { text: "shocked", source: "PU" },
    ],
    recycledKeywords: [
      { text: "angry", source: "PU" },
      { text: "happy", source: "PU" },
      { text: "sad", source: "PU" },
      { text: "sorry", source: "PU" },
      { text: "rooms and furniture", source: "PU" },
      { text: "verbs (bounce", source: "PU" },
      { text: "catch", source: "PU" },
      { text: "kick", source: "PU" },
      { text: "throw)", source: "PU" },
    ],
    reviewIssues: [
      { text: "can/can't", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["can","must"] },
    ],
  },
  "pu-l11": {
    newKeywords: [
      { text: "milk", source: "PU" },
      { text: "pineapple", source: "PU" },
    ],
    recycledKeywords: [
      { text: "words and phrases describing furniture and things in a house", source: "PU" },
    ],
    reviewIssues: [
      { text: "colours", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["blue","green","orange","purple","red","yellow","black","brown"] },
      { text: "prepositions", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["under","in","next to","on","behind","between","in front of"] },
    ],
  },
  "pu-l12": {
    recycledKeywords: [
      { text: "unit language", source: "PU" },
    ],
  },
};
