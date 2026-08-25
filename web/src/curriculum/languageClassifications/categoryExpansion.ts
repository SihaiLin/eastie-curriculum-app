// ---------------------------------------------------------------------------
// Category expansion — map an "umbrella / needs_extension" word to the concrete
// vocabulary items that have been taught in earlier K language lessons.
//
// Example:
//   "colours"  → ["red", "blue", "green", "yellow", "black", "white"]
//   "numbers"  → ["one", "two", "three", "four", "five"]
//   "family"   → ["mum", "dad", "brother", "sister", "baby"]
//
// The category → concrete-words map is hand-curated (this file) but the actual
// expansion is computed at runtime by scanning every lesson that comes before
// the current one in the (level, unitNumber, lesson) order. So "what was
// already taught" is always live against the current generated data, not
// stale hard-coded examples.
// ---------------------------------------------------------------------------

import { dynamicUnitManifest } from "../dynamicUnitManifest";
import type { KLanguageDynamicUnitEntry } from "../dynamicUnitManifest";
import type { LanguageUnitData } from "../../components/Curriculum/LanguageUnitPage";

// ---------------------------------------------------------------------------
// Category → concrete-word set (hand-curated, normalised to lower case)
// ---------------------------------------------------------------------------

export const CATEGORY_TO_WORDS: Record<string, string[]> = {
  colours: [
    "red", "blue", "green", "yellow", "black", "white", "pink", "orange",
    "purple", "brown", "grey", "gray", "gold", "silver", "colour", "color",
  ],
  numbers: [
    "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "zero",
  ],
  family: [
    "mum", "dad", "mom", "mother", "father", "brother", "sister", "grandma",
    "grandpa", "baby", "boy", "girl", "man", "woman", "family", "twins", "pet",
    "friend", "friends", "teddy",
  ],
  parts_of_body: [
    "head", "face", "hair", "ear", "ears", "eye", "eyes", "mouth", "nose",
    "tooth", "teeth", "arm", "arms", "hand", "hands", "leg", "legs", "foot",
    "feet", "body", "back", "finger", "fingers", "tail",
  ],
  food: [
    "apple", "banana", "bread", "cake", "chicken", "egg", "fish", "ice cream",
    "juice", "milk", "rice", "water", "food", "fruit", "watermelon", "burger",
    "noodles", "pizza", "biscuit", "chocolate", "sweet", "sweets", "lunch",
    "dinner", "breakfast",
  ],
  animals: [
    "cat", "dog", "bird", "horse", "mouse", "rabbit", "duck", "elephant",
    "flamingo", "frog", "toad", "monster", "crocodile", "snake", "tiger",
    "lion", "monkey", "bear", "sheep", "cow", "pig", "animal", "animals",
    "elephants",
  ],
  feelings: [
    "happy", "sad", "angry", "excited", "surprised", "worried", "kind", "scared",
    "tired", "hungry", "thirsty", "hot", "cold", "poor",
  ],
  shapes: ["circle", "square", "rectangle", "triangle", "star", "heart"],
  rooms: [
    "bathroom", "bedroom", "kitchen", "living room", "garden", "room", "house",
    "big house",
  ],
  furniture: [
    "bed", "chair", "desk", "lamp", "mirror", "clock", "computer", "cupboard",
    "door", "paper", "playground", "ruler", "wall", "window", "bookcase", "board",
    "sofa", "table",
  ],
  school: [
    "book", "crayon", "pencil", "rubber", "bag", "classroom", "teacher", "school",
    "student", "homework",
  ],
  toys: ["doll", "ball", "kite", "toy", "toys", "balloon", "bike"],
  clothes: ["shirt", "trousers", "shoes", "hat", "socks", "jacket", "dress"],
  weather: ["sun", "rain", "cloud", "snow", "wind"],
  places: [
    "park", "shop", "zoo", "beach", "home", "house", "school", "café", "cafe",
    "town", "city", "country", "world",
  ],
  actions: [
    "run", "runs", "running", "walk", "walks", "walking", "jump", "swim", "swims",
    "eat", "eats", "eating", "drink", "drinks", "drinking", "sleep", "sleeps",
    "sleeping", "read", "reads", "reading", "write", "writes", "writing", "draw",
    "draws", "drawing", "play", "plays", "playing", "sing", "sings", "singing",
    "dance", "dances", "dancing", "sit", "sits", "sitting", "stand", "stands",
    "standing", "open", "opens", "opening", "close", "closes", "closing", "wash",
    "brush", "touch", "help", "share", "work", "listen", "look", "find", "race",
    "win", "clean", "keep", "rule", "take", "look for", "smile", "cry", "clap",
    "kick", "throw", "catch", "swimming", "running", "walking", "dancing",
    "drawing", "singing", "playing", "writing", "reading", "looking",
  ],
  appearance: [
    "big", "small", "long", "short", "beautiful", "nice", "new", "old", "good",
    "bad", "tall", "fat", "thin", "pretty", "ugly", "clean", "dirty", "hot", "cold",
  ],
  grammar_structures: [
    "have got", "have/haven't got", "has got", "has/haven't got", "have", "has",
    "present continuous", "past simple", "future", "modal verbs", "can", "can't",
    "like", "don't like", "like / don't like",
  ],
  questions: [
    "what", "where", "when", "who", "how", "why", "which",
  ],
  responses: ["yes", "no", "ok", "okay", "thanks", "thank you", "please", "sorry"],
  greetings: ["hello", "hi", "goodbye", "bye", "good morning", "good afternoon", "good night"],
  time: [
    "morning", "afternoon", "evening", "night", "today", "tomorrow", "yesterday",
    "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  ],
  prepositions: ["in", "on", "under", "next to", "behind", "in front of", "between"],
  modal_verbs: ["can", "can't", "cannot", "could", "will", "would", "should", "must", "may"],
  grammar: [
    "have got", "has got", "have/haven't got", "has/haven't got",
    "present continuous", "past simple", "future", "can/can't", "can / can't",
    "like", "don't like", "like / don't like",
  ],
};

// Quick map: lower-cased concrete word → list of category labels it belongs to.
const WORD_TO_CATEGORIES = (() => {
  const map = new Map<string, string[]>();
  for (const [category, words] of Object.entries(CATEGORY_TO_WORDS)) {
    for (const word of words) {
      const key = word.toLowerCase().trim();
      const list = map.get(key);
      if (list) list.push(category);
      else map.set(key, [category]);
    }
  }
  return map;
})();

// Alias map for category umbrellas (the extend word) → which internal category
// it should map to. Keys are lower-cased common forms of the umbrella.
export const UMBRELLA_TO_CATEGORY: Record<string, string> = {
  colours: "colours",
  colors: "colours",
  colour: "colours",
  color: "colours",
  numbers: "numbers",
  number: "numbers",
  family: "family",
  friends: "family",
  friends_and_family: "family",
  "friends and family": "family",
  "one of the family": "family",
  parts_of_the_body: "parts_of_body",
  body: "parts_of_body",
  "body parts": "parts_of_body",
  "parts of the body": "parts_of_body",
  food: "food",
  fruit: "food",
  foods: "food",
  animals: "animals",
  animal: "animals",
  emotions: "feelings",
  feelings: "feelings",
  shapes: "shapes",
  shape: "shapes",
  rooms: "rooms",
  room: "rooms",
  "home objects": "furniture",
  furniture: "furniture",
  school_words: "school",
  "school words": "school",
  classroom_words: "school",
  "classroom words": "school",
  classroom_objects: "school",
  "classroom objects": "school",
  toys: "toys",
  toy: "toys",
  clothes: "clothes",
  weather: "weather",
  places: "places",
  action_verbs: "actions",
  "action verbs": "actions",
  "free time activities": "actions",
  prepositions: "prepositions",
  prepositions_of_place: "prepositions",
  "prepositions of place": "prepositions",
  "adjectives for describing appearance": "appearance",
  appearance: "appearance",
  questions: "questions",
  responses: "responses",
  greetings: "greetings",
  time: "time",
  "days of the week": "time",
  modal_verbs: "modal_verbs",
  "can / can't": "modal_verbs",
  "can/can't": "modal_verbs",
  // Single-word umbrella aliases (lowercase)
  objects: "school",
  object: "school",
  picture: "school",
  pictures: "school",
  names: "family",
  name: "family",
  school: "school",
  home: "places",
  classroom: "school",
  sports: "actions",
  sport: "actions",
  nature: "animals",
  people: "family",
  town: "places",
  city: "places",
  country: "places",
  adjectives: "appearance",
  "adverbs of frequency": "actions",
  present_continuous: "grammar",
  "have got": "grammar",
  "have/haven't got": "grammar",
  "like / don't like": "grammar",
  "be kind to (someone)": "grammar",
  "school and home objects": "school",
  "verbs of movement": "actions",
  // No-mapping umbrellas (kept for clarity — they really are "all prior content" pointers)
  // "language from the story", "unit language", "story language", "language from the poem"
  // intentionally omitted — they have no concrete children to map to.
};

function normalise(text: string): string {
  return text.toLowerCase().trim();
}

// ---------------------------------------------------------------------------
// Runtime scan: collect concrete words taught before a given unit
// ---------------------------------------------------------------------------

interface ScannedItem {
  level: string;
  unitNumber: number;
  lessonId: string;
  text: string;
}

function scanAllKLanguageItems(): ScannedItem[] {
  const entries = dynamicUnitManifest
    .filter((entry): entry is KLanguageDynamicUnitEntry => entry.renderer === "k-language")
    .sort((a, b) => {
      if (a.level !== b.level) return a.level.localeCompare(b.level);
      return a.unitNumber - b.unitNumber;
    });

  const out: ScannedItem[] = [];
  for (const entry of entries) {
    collectFromUnit(entry.unit, out);
  }
  return out;
}

function collectFromUnit(unit: LanguageUnitData, out: ScannedItem[]): void {
  for (const week of unit.weeks) {
    for (const lesson of week.lessons) {
      if (lesson.lesson <= 0) continue; // skip media-extend / mini-mission / placeholders
      const fields = lesson.fields;
      for (const fieldKey of ["New Language", "Recycled Language"]) {
        const value = fields[fieldKey];
        if (!value || value.trim() === "None listed") continue;
        for (const raw of value.split(/[｜|]/)) {
          const text = raw.trim();
          if (!text) continue;
          out.push({
            level: unit.level,
            unitNumber: unit.unitNumber,
            lessonId: lesson.id,
            text,
          });
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ExpansionHint {
  /** Concrete vocabulary words from earlier lessons that fall under the umbrella. */
  children: string[];
  /** Which earlier (level, unit, lesson) entries contributed the children. Order matches `children`. */
  sources: { level: string; unitNumber: number; lessonId: string }[];
}

const CACHE = new Map<string, ScannedItem[]>();

/**
 * Build an expansion hint for an "umbrella / needs_extension" word in the
 * context of a given unit. Returns the concrete children that have been
 * taught in earlier K language units/lessons, in the order they first appear.
 */
export function buildExpansionHint(umbrella: string, currentUnitId: string): ExpansionHint {
  const allItems = loadScannedItems();
  const children: string[] = [];
  const sources: ExpansionHint["sources"] = [];
  const seen = new Set<string>();

  const umbrellaKey = normalise(umbrella);
  const category = UMBRELLA_TO_CATEGORY[umbrellaKey];
  if (!category) {
    return { children: [], sources: [] };
  }
  const targetWords = new Set(
    (CATEGORY_TO_WORDS[category] ?? []).map((w) => normalise(w)),
  );

  for (const item of allItems) {
    if (item.level === "" || item.text === "") continue;
    if (isAfterOrSameUnit(item, currentUnitId)) continue;
    const itemKey = normalise(item.text);
    if (!targetWords.has(itemKey)) continue;
    if (seen.has(itemKey)) continue;
    seen.add(itemKey);
    children.push(item.text);
    sources.push({ level: item.level, unitNumber: item.unitNumber, lessonId: item.lessonId });
  }

  return { children, sources };
}

function isAfterOrSameUnit(item: ScannedItem, currentUnitId: string): boolean {
  // currentUnitId like "k1-language-unit-03"
  const match = currentUnitId.match(/^([a-z]+)(\d+)-language-unit-(\d+)$/i);
  if (!match) return false;
  const curLevel = match[1].toLowerCase();
  const curUnit = Number(match[3]);
  if (item.level.toLowerCase() !== curLevel) return false;
  return item.unitNumber >= curUnit;
}

function loadScannedItems(): ScannedItem[] {
  // dynamicUnitManifest is module-singleton; cache is invalidated only on full reload.
  if (CACHE.size > 0) return [...(CACHE.get("all") ?? [])];
  const items = scanAllKLanguageItems();
  CACHE.set("all", items);
  return items;
}

/**
 * Which category does this umbrella word map to (lower case)? Returns null
 * if no mapping is known. Useful for hint reasons.
 */
export function umbrellaCategory(umbrella: string): string | null {
  return UMBRELLA_TO_CATEGORY[normalise(umbrella)] ?? null;
}

/** Lookup helper used by the UI: is `word` a known concrete child of `umbrella`? */
export function isChildOf(umbrella: string, word: string): boolean {
  const cat = umbrellaCategory(umbrella);
  if (!cat) return false;
  return (CATEGORY_TO_WORDS[cat] ?? []).some((w) => normalise(w) === normalise(word));
}

/** All known umbrella keys (lower case). Used to detect extend items at runtime. */
export const KNOWN_UMBRELLAS: ReadonlySet<string> = new Set(
  Object.keys(UMBRELLA_TO_CATEGORY),
);
