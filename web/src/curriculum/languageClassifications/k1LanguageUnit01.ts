import type { UnitLanguageClassificationMap } from "./types";

// Auto-classified K language classifications for k1-language-unit-01.
// Generated from the Language Classification Review tool using the default
// auto-classifier + errorSuggestions.ts (no reviewer overrides).

export const k1LanguageUnit01Classifications: UnitLanguageClassificationMap = {
  "pu-l1": {
    newKeywords: [
      { text: "man", source: "PU" },
      { text: "woman", source: "PU" },
      { text: "boy", source: "PU" },
      { text: "girl", source: "PU" },
      { text: "café", source: "PU" },
      { text: "find", source: "PU" },
      { text: "friend", source: "PU" },
      { text: "new", source: "PU" },
    ],
    recycledKeywords: [
      { text: "bird", source: "PU" },
      { text: "boat", source: "PU" },
      { text: "book", source: "PU" },
      { text: "crayon", source: "PU" },
    ],
    targetSentences: [
      { text: "Is (Jenny) a (girl)?", source: "PU" },
      { text: "Who's this?", source: "PU" },
      { text: "What's colour's this?", source: "PU" },
      { text: "What's number's this?", source: "PU" },
    ],
    reviewIssues: [
      { text: "family", originalSource: "new", issueType: "needs_extension", note: "", expansionHint: ["Dad","Mum","man","woman","boy","girl","family","friend","twins","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"] },
      { text: "colours", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["blue","green","orange","purple","red","yellow","black","brown"] },
      { text: "numbers", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["six"] },
    ],
  },
  "pu-l2": {
    newKeywords: [
      { text: "twins", source: "PU" },
    ],
    targetSentences: [
      { text: "What's your name?", source: "PU" },
      { text: "My name's (Anna).", source: "PU" },
      { text: "How old are you?", source: "PU" },
      { text: "I'm (six).", source: "PU" },
      { text: "Jenny's (five).", source: "PU" },
      { text: "I'm (Jenny/Jim).", source: "PU" },
      { text: "Who's this?", source: "PU" },
    ],
    reviewIssues: [
      { text: "colours", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["blue","green","orange","purple","red","yellow","black","brown"] },
      { text: "numbers", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["six"] },
      { text: "objects", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["book","crayon","teacher","bag","classroom","pencil","school","rubber"] },
    ],
  },
  "pu-l3": {
    newKeywords: [
      { text: "mum", source: "PU" },
      { text: "dad", source: "PU" },
      { text: "brother", source: "PU" },
      { text: "sister", source: "PU" },
      { text: "pet", source: "PU" },
    ],
    recycledKeywords: [
      { text: "man", source: "PU" },
      { text: "woman", source: "PU" },
      { text: "boy", source: "PU" },
      { text: "girl", source: "PU" },
    ],
    targetSentences: [
      { text: "This is ...", source: "PU" },
      { text: "Who's this?", source: "PU" },
    ],
    reviewIssues: [
      { text: "colours", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["blue","green","orange","purple","red","yellow","black","brown"] },
      { text: "family", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["Dad","Mum","man","woman","boy","girl","family","friend","twins","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"] },
    ],
  },
  "pu-l4": {
    recycledKeywords: [
      { text: "friend", source: "PU" },
    ],
    targetSentences: [
      { text: "He's/She's (six).", source: "PU" },
      { text: "He/She isn't (six).", source: "PU" },
      { text: "Is he/she (six)?", source: "PU" },
      { text: "Yes, he/she is.", source: "PU" },
      { text: "No, he/she isn't.", source: "PU" },
      { text: "How old is he/she?", source: "PU" },
    ],
    reviewIssues: [
      { text: "colours", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["blue","green","orange","purple","red","yellow","black","brown"] },
      { text: "family", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["Dad","Mum","man","woman","boy","girl","family","friend","twins","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"] },
      { text: "numbers", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["six"] },
      { text: "picture", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["book","crayon","teacher","bag","classroom","pencil","school","rubber"] },
    ],
  },
  "pu-l5": {
    newKeywords: [
      { text: "(at) school", source: "PU" },
      { text: "home time", source: "PU" },
      { text: "sit down", source: "PU" },
      { text: "teacher", source: "PU" },
      { text: "They're...", source: "PU" },
    ],
    targetSentences: [
      { text: "Are they ... ?", source: "PU" },
    ],
    reviewIssues: [
      { text: "home", originalSource: "new", issueType: "needs_extension", note: "", expansionHint: ["café","home","school","house","shop","beach","town","park","zoo","world"] },
      { text: "friends and family", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["Dad","Mum","man","woman","boy","girl","family","friend","twins","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"] },
      { text: "numbers", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["six"] },
    ],
  },
  "pu-l6": {
    newKeywords: [
      { text: "happy", source: "PU" },
    ],
    recycledKeywords: [
      { text: "language from the story", source: "PU" },
    ],
  },
  "pu-l7": {
    newKeywords: [
      { text: "menu", source: "PU" },
    ],
    recycledKeywords: [
      { text: "blue", source: "PU" },
      { text: "book", source: "PU" },
      { text: "boy", source: "PU" },
      { text: "brother", source: "PU" },
      { text: "café", source: "PU" },
      { text: "Cameron", source: "PU" },
      { text: "cat", source: "PU" },
      { text: "Matt", source: "PU" },
      { text: "mum", source: "PU" },
    ],
  },
  "pu-l8": {
    newKeywords: [
      { text: "family tree", source: "PU" },
      { text: "grandma", source: "PU" },
      { text: "grandpa", source: "PU" },
    ],
    recycledKeywords: [
      { text: "happy", source: "PU" },
    ],
    reviewIssues: [
      { text: "family", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["Dad","Mum","man","woman","boy","girl","family","friend","twins","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"] },
      { text: "numbers", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["six"] },
    ],
  },
  "pu-l9": {
    newKeywords: [
      { text: "fish", source: "PU" },
      { text: "one of the family", source: "PU" },
    ],
    recycledKeywords: [
      { text: "boy", source: "PU" },
      { text: "cat", source: "PU" },
      { text: "friend", source: "PU" },
      { text: "girl", source: "PU" },
      { text: "happy", source: "PU" },
      { text: "pet", source: "PU" },
    ],
    targetSentences: [
      { text: "Come here!", source: "PU" },
      { text: "Here you are.", source: "PU" },
    ],
    reviewIssues: [
      { text: "colours", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["blue","green","orange","purple","red","yellow","black","brown"] },
      { text: "numbers", originalSource: "recycled", issueType: "needs_extension", note: "", expansionHint: ["six"] },
    ],
  },
  "pu-l10": {
    recycledKeywords: [
      { text: "unit language", source: "PU" },
    ],
  },
};
