// Hand-curated suggestions for every known Power Up segmentation / data error.
//
// Each entry tells the export pipeline two things:
//
//   - `kind: "resolved"`  → the item is fully hand-fixed. The export will
//     re-classify it as either targetSentences (via `resolvedItems`) or
//     newKeywords / recycledKeywords (via `expandedKeywords`) depending on
//     which field the entry fills in. The reviewer does not need to re-confirm
//     in the UI; the resolved text replaces the broken raw entry entirely
//     (the raw `text` is never emitted into the export).
//
//   - `kind: "sourceIssue"` → the item is a markdown-source data error in PU
//     (e.g. a stray "See story on Pupil's Book pages" reference). The export
//     keeps it in `reviewIssues` with the `note` so Codex can fix the source.

export type ErrorSuggestionKind = "resolved" | "sourceIssue";

export interface ErrorSuggestionEntry {
  kind: ErrorSuggestionKind;
  /** Human-readable note, surfaced in the export's reviewIssues and console warnings. */
  note: string;
  /** Hand-written replacement sentences — each goes to `targetSentences` with `source: "PU"`.
   *  These are page-renderable child-English patterns (Q + A pairs, example sentences, etc.). */
  resolvedItems?: string[];
  /** Hand-written replacement vocabulary — each goes to `newKeywords` (if the original item's
   *  source was "new") or `recycledKeywords` (if source was "recycled") with `source: "PU"`.
   *  Used when a resolved error block contains trailing vocab words like "huge" or "bus stop"
   *  that need to land in the keyword list, not the sentence list. */
  expandedKeywords?: string[];
}

/** Look up a suggestion entry. Returns undefined if none registered. */
export function getErrorSuggestion(text: string): ErrorSuggestionEntry | undefined {
  return ERROR_SUGGESTIONS[text];
}

export const ERROR_SUGGESTIONS: Readonly<Record<string, ErrorSuggestionEntry>> = {
  // --- "Q? Yes" pattern: question + "Yes" confirmation glued together ---
  "I've/You've/We've got ... Have you/we got ... ? Yes": {
    kind: "resolved",
    note: 'Resolved. Full exchange: "Have you/we got ...? Yes, I/we have. No, I/we haven\'t."',
    resolvedItems: [
      "Have you/we got ...?",
      "Yes, I/we have.",
      "No, I/we haven't.",
    ],
  },
  "I've/We've/They've got ... Have you/we got ...? Yes": {
    kind: "resolved",
    note: 'Resolved. Full exchange: "Have you/we got ...? Yes, I/we/they\'ve got ... No, I/we/they haven\'t."',
    resolvedItems: [
      "Have you/we got ...?",
      "Yes, I/we/they've got ...",
      "No, I/we/they haven't.",
    ],
  },
  "He's/She's got ... Has he/she got ...? Yes": {
    kind: "resolved",
    note: 'Resolved. Full exchange: "Has he/she got ...? Yes, he/she has. No, he/she hasn\'t."',
    resolvedItems: [
      "Has he/she got ...?",
      "Yes, he/she has.",
      "No, he/she hasn't.",
    ],
  },
  "Can you ... ? Yes": {
    kind: "resolved",
    note: "Resolved. Full exchange: \"Can you ...? Yes, I/you/we can. No, I can't.\"",
    resolvedItems: [
      "Can you ...?",
      "Yes, I/you/we can.",
      "No, I can't.",
    ],
  },
  "Can you...? Yes": {
    kind: "resolved",
    note: "Resolved. Full exchange: \"Can you ...? Yes, I/you/we can. No, I can't.\"",
    resolvedItems: [
      "Can you ...?",
      "Yes, I/you/we can.",
      "No, I can't.",
    ],
  },
  "Is he/she ...ing? Yes": {
    kind: "resolved",
    note: 'Resolved. Full exchange: "Is he/she ...ing? Yes, he/she is. No, he/she isn\'t."',
    resolvedItems: [
      "Is he/she ...ing?",
      "Yes, he/she is.",
      "No, he/she isn't.",
    ],
  },
  "I want/don't want... Do you want (your) ...? Yes": {
    kind: "resolved",
    note: "Resolved. Full exchange: \"Do you want (your) ...? Yes, I do. No, I don't.\"",
    resolvedItems: [
      "Do you want (your) ...?",
      "Yes, I do.",
      "No, I don't.",
    ],
  },
  "It's got... It hasn't got... Has it got...? Yes": {
    kind: "resolved",
    note: 'Resolved. Full exchange: "Has it got ...? Yes, it has. No, it hasn\'t."',
    resolvedItems: [
      "Has it got ...?",
      "Yes, it has.",
      "No, it hasn't.",
    ],
  },
  "Does he/she want...? Yes": {
    kind: "resolved",
    note: 'Resolved. Full exchange: "Does he/she want ...? Yes, he/she does. No, he/she doesn\'t."',
    resolvedItems: [
      "Does he/she want ...?",
      "Yes, he/she does.",
      "No, he/she doesn't.",
    ],
  },
  "Are you/we/they ...-ing? Is he/she ...-ing? Yes": {
    kind: "resolved",
    note: 'Resolved — two Q+A patterns chained. "Is he/she ...-ing? Yes, he/she is." / "Are you/we/they ...-ing? Yes, we/they are."',
    resolvedItems: [
      "Is he/she ...-ing?",
      "Yes, he/she is.",
      "Are you/we/they ...-ing?",
      "Yes, we/they are.",
    ],
  },
  "Can we play tennis? Yes": {
    kind: "resolved",
    note: "Resolved. Full exchange: \"Can we play tennis? Yes, we can. No, we can't.\"",
    resolvedItems: [
      "Can we play tennis?",
      "Yes, we can.",
      "No, we can't.",
    ],
  },
  "Are you reading a book? No": {
    kind: "resolved",
    note: "Resolved. Full exchange: \"Are you reading a book? No, I'm not (reading a book).\"",
    resolvedItems: [
      "Are you reading a book?",
      "No, I'm not (reading a book).",
    ],
  },
  "Did they (eat)? Yes": {
    kind: "resolved",
    note: "Resolved. Full exchange: \"Did they (eat)? Yes, they did. No, they didn't.\"",
    resolvedItems: [
      "Did they (eat)?",
      "Yes, they did.",
      "No, they didn't.",
    ],
  },
  "There were some / lots of ... Would you like... ? Yes": {
    kind: "resolved",
    note: 'Resolved. Full exchange: "Would you like ...? Yes, please. / No, thank you."',
    resolvedItems: [
      "Would you like ...?",
      "Yes, please.",
      "No, thank you.",
    ],
  },
  "Was there a scarf in the bedroom? Yes": {
    kind: "resolved",
    note: "Resolved. Full exchange: \"Was there a scarf in the bedroom? Yes, there was. No, there wasn't.\"",
    resolvedItems: [
      "Was there a scarf in the bedroom?",
      "Yes, there was.",
      "No, there wasn't.",
    ],
  },
  "Were your grandparents here last weekend? Yes": {
    kind: "resolved",
    note: "Resolved. Full exchange: \"Were your grandparents here last weekend? Yes, they were. No, they weren't.\"",
    resolvedItems: [
      "Were your grandparents here last weekend?",
      "Yes, they were.",
      "No, they weren't.",
    ],
  },
  "they weren't. Were you at school on Tuesday? Yes": {
    kind: "resolved",
    note: "Resolved — chained dialogue. \"They weren't (here last weekend). Were you at school on Tuesday? Yes, I was.\"",
    resolvedItems: [
      "They weren't (here last weekend).",
      "Were you at school on Tuesday?",
      "Yes, I was.",
    ],
  },
  "there wasn't. Were there any boots in the bedroom? Yes": {
    kind: "resolved",
    note: "Resolved — chained dialogue. \"There wasn't a scarf. Were there any boots? Yes, there were.\"",
    resolvedItems: [
      "There wasn't a scarf.",
      "Were there any boots in the bedroom?",
      "Yes, there were.",
    ],
  },
  "lunch and dinner. Do you ever get up late? No": {
    kind: "resolved",
    note: "Resolved — chained. \"I have lunch and dinner. Do you ever get up late? No, I don't.\"",
    resolvedItems: [
      "I have lunch and dinner.",
      "Do you ever get up late?",
      "No, I don't.",
    ],
  },

  // --- "A. No" pattern: short confirmation + "No" — should be negative response ---
  "I/we have. No": { kind: "resolved", note: "Resolved. \"No, I/we haven't.\"", resolvedItems: ["No, I/we haven't."] },
  "I can. No": { kind: "resolved", note: "Resolved. \"No, I can't.\"", resolvedItems: ["No, I can't."] },
  "I do. No": { kind: "resolved", note: "Resolved. \"No, I don't.\"", resolvedItems: ["No, I don't."] },
  "he/she is. No": { kind: "resolved", note: "Resolved. \"No, he/she isn't.\"", resolvedItems: ["No, he/she isn't."] },
  "he/she does. No": { kind: "resolved", note: "Resolved. \"No, he/she doesn't.\"", resolvedItems: ["No, he/she doesn't."] },
  "they are. No": { kind: "resolved", note: "Resolved. \"No, they aren't.\"", resolvedItems: ["No, they aren't."] },
  "it has. No": { kind: "resolved", note: "Resolved. \"No, it hasn't.\"", resolvedItems: ["No, it hasn't."] },
  "you can. No": { kind: "resolved", note: "Resolved. \"No, I/you can't.\"", resolvedItems: ["No, I/you can't."] },
  "Ido. / No": { kind: "resolved", note: "Resolved. \"No, I don't.\"", resolvedItems: ["No, I don't."] },
  "I was. / No": { kind: "resolved", note: "Resolved. \"No, I wasn't.\"", resolvedItems: ["No, I wasn't."] },
  "I did. / No": { kind: "resolved", note: "Resolved. \"No, I didn't.\"", resolvedItems: ["No, I didn't."] },
  "they were. / No": { kind: "resolved", note: "Resolved. \"No, they weren't.\"", resolvedItems: ["No, they weren't."] },
  "there was. / No": { kind: "resolved", note: "Resolved. \"No, there wasn't.\"", resolvedItems: ["No, there wasn't."] },
  "there were. / No": { kind: "resolved", note: "Resolved. \"No, there weren't.\"", resolvedItems: ["No, there weren't."] },
  "they are. / Yes": { kind: "resolved", note: "Resolved. \"Yes, they are.\"", resolvedItems: ["Yes, they are."] },
  "they did. / No": { kind: "resolved", note: "Resolved. \"No, they didn't.\"", resolvedItems: ["No, they didn't."] },
  "please. / No": { kind: "resolved", note: 'Resolved. "No, thank you." (rejoin the polite exchange)', resolvedItems: ["No, thank you."] },

  // --- Bare "Yes" / "No" (orphan answer fragments) ---
  "Yes": { kind: "resolved", note: 'Resolved. Orphan "Yes" — pair with preceding question. "Yes, please." is the safest child-English affirmative (food/sharing context).', resolvedItems: ["Yes, please."] },
  "No": { kind: "resolved", note: 'Resolved. Orphan "No" — pair with preceding question. "No, thank you." is the safest child-English negative (food/sharing context).', resolvedItems: ["No, thank you."] },
  "I'm not.": { kind: "resolved", note: "Resolved. \"No, I'm not (doing it).\"", resolvedItems: ["No, I'm not."] },
  "she is.": { kind: "resolved", note: "Resolved. \"Yes, she is.\"", resolvedItems: ["Yes, she is."] },

  // --- Q + A pattern (single Q + A) ---
  "What are you doing? I'm ...ing.": {
    kind: "resolved",
    note: 'Resolved. Full sentence pattern: "What are you doing? I\'m ...ing."',
    resolvedItems: [
      "What are you doing?",
      "I'm ...ing.",
    ],
  },
  "What is he/she doing? What are you doing? I am ...-ing. / You are ...-ing.": {
    kind: "resolved",
    note: 'Resolved — chained Q+A. "What is he/she doing? I am ...-ing." / "What are you doing? You are ...-ing."',
    resolvedItems: [
      "What is he/she doing? I am ...-ing.",
      "What are you doing? You are ...-ing.",
    ],
  },
  "Have you got ...? I've/We've/They've got ...": {
    kind: "resolved",
    note: 'Resolved. "Have you got ...? Yes, I/we/they\'ve got ..."',
    resolvedItems: [
      "Have you got ...?",
      "Yes, I/we/they've got ...",
    ],
  },
  "What's this? It's a... / What are these? They're...": {
    kind: "resolved",
    note: 'Resolved — two Q+A. "What\'s this? It\'s a ..." / "What are these? They\'re ..."',
    resolvedItems: [
      "What's this? It's a ...",
      "What are these? They're ...",
    ],
  },
  "What's it made of? It's made of ...": {
    kind: "resolved",
    note: "Resolved. \"What's it made of? It's made of ...\"",
    resolvedItems: [
      "What's it made of?",
      "It's made of ...",
    ],
  },
  "How many ... are there? There are (two / a lot)": {
    kind: "resolved",
    note: 'Resolved. "How many ... are there? There are (two / a lot)."',
    resolvedItems: [
      "How many ... are there?",
      "There are (two / a lot).",
    ],
  },
  "How many ...? Where is/are ...? It's/They're in/on ...": {
    kind: "resolved",
    note: 'Resolved — chained Q. "How many ...?" / "Where is/are ...? It\'s/They\'re in/on ..."',
    resolvedItems: [
      "How many ...?",
      "Where is/are ...? It's/They're in/on ...",
    ],
  },
  "Whose... is this? It's his/her... It's ...'s...": {
    kind: "resolved",
    note: 'Resolved — chained Q+A. "Whose ... is this? It\'s his/her ..." / "Whose ... is this? It\'s ...\'s ..."',
    resolvedItems: [
      "Whose ... is this? It's his/her ...",
      "Whose ... is this? It's ...'s ...",
    ],
  },
  "What's the weather like? It's ...": {
    kind: "resolved",
    note: "Resolved. \"What's the weather like? It's ...\"",
    resolvedItems: [
      "What's the weather like?",
      "It's ...",
    ],
  },
  "What's the weather like today? What was the weather like yesterday?": {
    kind: "resolved",
    note: 'Resolved — two Qs. "What\'s the weather like today?" / "What was the weather like yesterday?"',
    resolvedItems: [
      "What's the weather like today?",
      "What was the weather like yesterday?",
    ],
  },
  "How often do you clean your teeth? I always clean them after breakfast": {
    kind: "resolved",
    note: 'Resolved. "How often do you clean your teeth? I always clean them after breakfast."',
    resolvedItems: [
      "How often do you clean your teeth?",
      "I always clean them after breakfast.",
    ],
  },

  // --- "X. / No" / chained answer fragments ---
  "he/she isn't. Are they ...ing? Yes": {
    kind: "resolved",
    note: 'Resolved — different subject. "No, he/she isn\'t." / "Yes, they are."',
    resolvedItems: [
      "No, he/she isn't.",
      "Yes, they are.",
    ],
  },

  // --- Chained sentences (X. word) ---
  "he/she doesn't. He/She wants...": {
    kind: "resolved",
    note: 'Resolved — different verbs (present vs wants). "No, he/she doesn\'t." / "He/She wants ..." (separate items)',
    resolvedItems: [
      "No, he/she doesn't.",
      "He/She wants ...",
    ],
  },
  "I never get up late. always": {
    kind: "resolved",
    note: 'Resolved. "I never get up late." (drop the stray "always" adverb note — see adverb of frequency in extend list).',
    resolvedItems: ["I never get up late."],
  },
  "You're right. comparative adjectives": {
    kind: "resolved",
    note: 'Resolved. "You\'re right." (drop the "comparative adjectives" grammar note).',
    resolvedItems: ["You're right."],
  },
  "What's your favourite ... ? My favourite ... 1Sicae": {
    kind: "resolved",
    note: 'Resolved — chained Q+A. "What\'s your favourite ...?" / "My favourite ... is A/C/E." (the trailing "1Sicae" was a typo for "is A/C/E").',
    resolvedItems: [
      "What's your favourite ...?",
      "My favourite ... is A/C/E.",
    ],
  },

  // --- Multi-sentence items ---
  "Iwent swimming last Saturday. I didn't go shopping yesterday. Did you go to the park? Yes": {
    kind: "resolved",
    note: 'Resolved — multi-sentence with "Iwent" (missing space). "I went swimming last Saturday." / "I didn\'t go shopping yesterday." / "Did you go to the park? Yes, I did. / No, I didn\'t."',
    resolvedItems: [
      "I went swimming last Saturday.",
      "I didn't go shopping yesterday.",
      "Did you go to the park?",
      "Yes, I did.",
      "No, I didn't.",
    ],
  },
  "Ihave to see the eye doctor at the hospital. My brother has to wear glasses. Do you have to wear glasses? Yes": {
    kind: "resolved",
    note: 'Resolved — multi-sentence with "Ihave" (missing space). "I have to see the eye doctor at the hospital." / "My brother has to wear glasses." / "Do you have to wear glasses? Yes, I do. / No, I don\'t."',
    resolvedItems: [
      "I have to see the eye doctor at the hospital.",
      "My brother has to wear glasses.",
      "Do you have to wear glasses?",
      "Yes, I do.",
      "No, I don't.",
    ],
  },
  "please? Here you are. Would you like some cake? Yes": {
    kind: "resolved",
    note: "Resolved — chained. \"Would you like some cake? ... please. Here you are. Yes, please. / No, thank you.\"",
    resolvedItems: [
      "Would you like some cake?",
      "Here you are.",
      "Yes, please.",
      "No, thank you.",
    ],
  },

  // --- Long multi-sentence / vocab-explanation blocks (k2U3 / k3U2 / k3U3 / k3U4 / k3U5 etc.) ---
  "like / don't like: I like chocolate. Harry likes mangoes. I don't like books. Harry doesn't like chocolate. Do you like chocolate? Does Harry like shoes?": {
    kind: "resolved",
    note: 'Resolved — grammar pair + example sentences. "like / don\'t like" + "I like chocolate." / "Harry likes mangoes." / "I don\'t like books." / "Harry doesn\'t like chocolate." / "Do you like chocolate?" / "Does Harry like shoes?"',
    resolvedItems: [
      "like / don't like",
      "I like chocolate.",
      "Harry likes mangoes.",
      "I don't like books.",
      "Harry doesn't like chocolate.",
      "Do you like chocolate?",
      "Does Harry like shoes?",
    ],
  },
  "What mustI do? You mustn't wear your skates in the house. You must put them in the cupboard. helmet": {
    kind: "resolved",
    note: 'Resolved — multi-sentence with "mustI" (missing space) + trailing vocab "helmet".',
    resolvedItems: [
      "What must I do?",
      "You mustn't wear your skates in the house.",
      "You must put them in the cupboard.",
    ],
    expandedKeywords: ["helmet"],
  },
  "He never works at the weekend. It's Friday. He's working today. I don't often listen to the radio. I'm not listening to it now. Do you eat meatballs? What are you eating at the moment? at the moment": {
    kind: "resolved",
    note: 'Resolved — multi-sentence block. "He never works at the weekend." / "It\'s Friday." / "He\'s working today." / "I don\'t often listen to the radio." / "I\'m not listening to it now." / "Do you eat meatballs?" / "What are you eating at the moment?" / "at the moment" (sentence frame).',
    resolvedItems: [
      "He never works at the weekend.",
      "It's Friday.",
      "He's working today.",
      "I don't often listen to the radio.",
      "I'm not listening to it now.",
      "Do you eat meatballs?",
      "What are you eating at the moment?",
      "at the moment",
    ],
  },
  "He's/She's got (brown) hair/eyes. His/Her (hat) is (blue). possessive pronouns": {
    kind: "resolved",
    note: 'Resolved — vocab / grammar explanation block. "He\'s/She\'s got (brown) hair/eyes." / "His/Her (hat) is (blue)." (the "possessive pronouns" tag is a grammar note, not a teachable item — dropped from the export).',
    resolvedItems: [
      "He's/She's got (brown) hair/eyes.",
      "His/Her (hat) is (blue).",
    ],
  },
  "Why are you asking a lot of questions? Because I love asking questions.": {
    kind: "resolved",
    note: 'Resolved. "Why are you asking a lot of questions? Because I love asking questions."',
    resolvedItems: [
      "Why are you asking a lot of questions?",
      "Because I love asking questions.",
    ],
  },
  "Gracie's ears are long. They're longer than Shelly's ears. Those puppies are both fat": {
    kind: "resolved",
    note: "Resolved — multi-sentence comparison. \"Gracie's ears are long.\" / \"They're longer than Shelly's ears.\" / \"Those puppies are both fat.\"",
    resolvedItems: [
      "Gracie's ears are long.",
      "They're longer than Shelly's ears.",
      "Those puppies are both fat.",
    ],
  },
  "but the brown puppy's fatter than the white one. My cousin's hair is curly. It's curlier than my uncle's. Shelly's singing is bad. It's worse than Gracie's singing.": {
    kind: "resolved",
    note: "Resolved — multi-sentence comparison chained. \"But the brown puppy's fatter than the white one.\" / \"My cousin's hair is curly.\" / \"It's curlier than my uncle's.\" / \"Shelly's singing is bad.\" / \"It's worse than Gracie's singing.\"",
    resolvedItems: [
      "But the brown puppy's fatter than the white one.",
      "My cousin's hair is curly.",
      "It's curlier than my uncle's.",
      "Shelly's singing is bad.",
      "It's worse than Gracie's singing.",
    ],
  },
  "My baby sister's the youngest in our family. This kitten's the prettiest. That puppy's the fattest. These ice skates are the best. ice skates": {
    kind: "resolved",
    note: 'Resolved — multi-sentence + trailing vocab "ice skates".',
    resolvedItems: [
      "My baby sister's the youngest in our family.",
      "This kitten's the prettiest.",
      "That puppy's the fattest.",
      "These ice skates are the best.",
    ],
    expandedKeywords: ["ice skates"],
  },
  "The bat's above the tree. The snail's below the flower. The parrot's near the cage. The bus stop's opposite the zoo. bus stop": {
    kind: "resolved",
    note: 'Resolved — multi-sentence prepositions + trailing vocab "bus stop".',
    resolvedItems: [
      "The bat's above the tree.",
      "The snail's below the flower.",
      "The parrot's near the cage.",
      "The bus stop's opposite the zoo.",
    ],
    expandedKeywords: ["bus stop"],
  },
  "find:I found my old hat. lose: I lost my cousin in the forest. buy: He bought it last year. come: We came to the farm last year. huge": {
    kind: "resolved",
    note: 'Resolved — per-word vocab + example sentences + trailing vocab "huge".',
    resolvedItems: [
      "find — I found my old hat.",
      "lose — I lost my cousin in the forest.",
      "buy — He bought it last year.",
      "come — We came to the farm last year.",
    ],
    expandedKeywords: ["huge"],
  },

  // --- Chained "they didn't. I didn't (see). What did you (put in the soup)?" — k3U2 chained past tense ---
  "they didn't. I didn't (see). What did you (put in the soup)?": {
    kind: "resolved",
    note: 'Resolved — chained past-tense responses + question. "They didn\'t." / "I didn\'t (see)." / "What did you (put in the soup)?"',
    resolvedItems: [
      "They didn't.",
      "I didn't (see).",
      "What did you (put in the soup)?",
    ],
  },

  // --- Vocabulary explanation blocks ---
  "like: I liked cooking them! fry: I fried the onions. stop/start: I stopped because you started asking me questions.": {
    kind: "resolved",
    note: 'Resolved — per-word vocab + example sentences. "like — I liked cooking them!" / "fry — I fried the onions." / "stop/start — I stopped because you started asking me questions."',
    resolvedItems: [
      "like — I liked cooking them!",
      "fry — I fried the onions.",
      "stop/start — I stopped because you started asking me questions.",
    ],
  },
  "beautiful: This city is one of the most beautiful in the world. frightened: In my family": {
    kind: "resolved",
    note: 'Resolved — vocab explanation block. "This city is one of the most beautiful in the world." + the vocab word "frightened" (the original PU example sentence for "frightened" was truncated/missing — kept as a keyword for Codex to add a proper example).',
    resolvedItems: [
      "This city is one of the most beautiful in the world.",
    ],
    expandedKeywords: ["frightened"],
  },
  "beautiful: Circus clothes are more beautiful than these. exciting: The circus is more exciting than the farm! dangerous: And now": {
    kind: "resolved",
    note: 'Resolved — vocab explanation block. "Circus clothes are more beautiful than these." / "The circus is more exciting than the farm!" + the vocab word "dangerous" (the original PU example sentence for "dangerous" was truncated — kept as a keyword for Codex to add a proper example).',
    resolvedItems: [
      "Circus clothes are more beautiful than these.",
      "The circus is more exciting than the farm!",
    ],
    expandedKeywords: ["dangerous"],
  },

  // --- Lowercase variants of bare "yes" / "no" (auto-classifier's BARE_YES_NO regex
  //     uses the `i` flag, so it flags these as errors too — separate keys to keep
  //     the dictionary fully self-describing) ---
  "yes": { kind: "resolved", note: 'Resolved. Lowercase "yes" — same resolution as bare "Yes".', resolvedItems: ["Yes, please."] },
  "no": { kind: "resolved", note: 'Resolved. Lowercase "no" — same resolution as bare "No".', resolvedItems: ["No, thank you."] },

  // --- Chained Q+Q typos / multi-sentence k1U00 / k3U00 patterns ---
  "What colour's this? What's number's this?": {
    kind: "resolved",
    note: 'Resolved — chained Qs with possessives. "What colour\'s this?" was "What colour is this?" / "What number\'s this?" was "What number is this?" (the PU source glued two Q\'s together with the "is" dropped in each).',
    resolvedItems: [
      "What colour is this?",
      "What number is this?",
    ],
  },
  "This is ... What's this? It's a...": {
    kind: "resolved",
    note: 'Resolved — chained frame + Q+A. "This is ..." (sentence frame) / "What\'s this? It\'s a ..." (Q+A pair).',
    resolvedItems: [
      "This is ...",
      "What's this? It's a ...",
    ],
  },
  "What's your name? My name's (Jim). How old are you? I'm (seven). Where do you live? I live in (London). present continuous": {
    kind: "resolved",
    note: 'Resolved — multi-Q+A + trailing grammar note. "present continuous" is a grammar note, not a teachable item — dropped from the export.',
    resolvedItems: [
      "What's your name?",
      "My name's (Jim).",
      "How old are you?",
      "I'm (seven).",
      "Where do you live?",
      "I live in (London).",
    ],
  },
  "He's got (long hair). I like ...-ing": {
    kind: "resolved",
    note: 'Resolved — different verbs (have got vs like). "He\'s got (long hair)." / "I like ...-ing."',
    resolvedItems: [
      "He's got (long hair).",
      "I like ...-ing.",
    ],
  },

  // --- Markdown bleed (PU source data error, keep in reviewIssues for Codex) ---
  "adverbs of See story on Pupil's Book pages 38-39 frequency": {
    kind: "sourceIssue",
    note: 'PU source data error — k3Unit03 "Recycled Language" contains a markdown reference "See story on Pupil\'s Book pages 38-39" that leaked into the field. Likely the original was "adverbs of frequency" with a separate story reference. **Fix in markdown source.**',
  },
};
