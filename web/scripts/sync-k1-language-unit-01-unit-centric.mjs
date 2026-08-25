#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(webRoot, "..");
const sourceRoot = path.join(
  projectRoot,
  "content/curriculum/k-language-unit-centric-v0_1/k1/unit_01_friends_and_family",
);
const outputPath = path.join(webRoot, "src/curriculum/generated/k1LanguageUnit01.ts");

const dayIds = [
  "pu-l1",
  "pu-l2",
  "pu-l3",
  "media-extend-1",
  "mini-mission-1",
  "pu-l4",
  "pu-l5",
  "pu-l6",
  "media-extend-2",
  "mini-mission-2",
  "pu-l7",
  "pu-l8",
  "pu-l9",
  "media-extend-3",
  "pu-l10",
  "showcase-lesson-1",
  "showcase-lesson-2",
  "showcase-lesson-3",
  "showcase-lesson-4",
  "showcase-lesson-5",
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function stripInlineMarkdown(value) {
  return value.replace(/\*\*(.*?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").trim();
}

function parseHeadingTree(markdown) {
  const lines = markdown.split(/\r?\n/);
  const headings = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(lines[index]);
    if (match) headings.push({ line: index, level: match[1].length, title: stripInlineMarkdown(match[2]) });
  }
  return { lines, headings };
}

function getHeadingBody(markdown, level, title) {
  const { lines, headings } = parseHeadingTree(markdown);
  const heading = headings.find((item) => item.level === level && item.title === title);
  if (!heading) return "";
  const next = headings.find((item) => item.line > heading.line && item.level <= heading.level);
  const end = next ? next.line : lines.length;
  return lines.slice(heading.line + 1, end).join("\n").trim();
}

function getSubsectionBody(markdown, parentLevel, parentTitle, childLevel, childTitle) {
  const parentBody = getHeadingBody(markdown, parentLevel, parentTitle);
  if (!parentBody) return "";
  return getHeadingBody(parentBody, childLevel, childTitle);
}

function parseMetadata(body) {
  const out = {};
  for (const line of body.split(/\r?\n/)) {
    const match = /^-\s+([^:]+):\s*(.*)$/.exec(line.trim());
    if (!match) continue;
    out[toCamel(match[1])] = match[2].trim();
  }
  return out;
}

function toCamel(value) {
  return value
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}

function parseSimpleList(body) {
  return body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => stripInlineMarkdown(line.replace(/^-\s+/, "")))
    .filter(Boolean);
}

function parseKeyValueBullets(body) {
  const out = {};
  let currentKey = "";
  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    const match = /^-\s+([^:]+):\s*(.*)$/.exec(line.trim());
    if (match) {
      currentKey = match[1].trim();
      out[currentKey] = stripInlineMarkdown(match[2].trim());
      continue;
    }
    if (currentKey && /^\s+\S/.test(rawLine)) {
      const nextLine = stripInlineMarkdown(line.trim());
      out[currentKey] = [out[currentKey], nextLine].filter(Boolean).join("\n");
    } else if (line.trim()) {
      currentKey = "";
    }
  }
  return out;
}

function parseUnit(filePath) {
  const markdown = read(filePath);
  const metadata = parseMetadata(getHeadingBody(markdown, 2, "Unit Metadata"));
  const outcomes = parseSimpleList(getHeadingBody(markdown, 2, "Unit Outcomes"));
  const languageBank = getHeadingBody(markdown, 2, "Language Bank");
  const sequence = getHeadingBody(markdown, 2, "Unit Sequence");
  const showcase = getHeadingBody(markdown, 3, "Showcase (Week 4 — DESIGNED)");
  return {
    metadata,
    overview: {
      title: markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "K1 Unit 1: Friends and Family",
      sections: [
        { title: "Unit Outcomes", body: outcomes.join(" ｜ ") },
        { title: "Language Summary", body: flattenLanguageBank(languageBank) },
        { title: "4-Week Structure", body: sequence.replace(/^###\s+/gm, "").trim() },
        { title: "Showcase", body: showcase || "Friends and Family Fair across Days 16-20." },
      ],
    },
  };
}

function flattenLanguageBank(body) {
  const items = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => stripInlineMarkdown(line.replace(/^-\s+/, "")));
  return `${items.length} unit language items ｜ ${items.join(" ｜ ")}`;
}

function parseDay(filePath, index) {
  const markdown = read(filePath);
  const metadata = parseMetadata(getHeadingBody(markdown, 2, "Day Metadata"));
  const dayFocus = parseSimpleList(getHeadingBody(markdown, 2, "Day Focus")).join("\n");
  const circle = parseKeyValueBullets(getSubsectionBody(markdown, 2, "Displayed Content", 3, "Circle Time"));
  const clil = parseKeyValueBullets(getSubsectionBody(markdown, 2, "Displayed Content", 3, "CLIL Class"));
  const phonics = parseKeyValueBullets(getSubsectionBody(markdown, 2, "Displayed Content", 3, "Phonics"));
  const story = parseKeyValueBullets(getSubsectionBody(markdown, 2, "Displayed Content", 3, "Story"));
  const id = dayIds[index];
  const lessonNumber = Number(/PU L(\d+)/.exec(metadata.powerUpLesson ?? "")?.[1] ?? 0);
  return {
    id,
    lesson: lessonNumber,
    title: titleFromDay(id, metadata, clil),
    fields: compact({
      "Day Focus": dayFocus,
      "Lesson Role": metadata.lessonRole,
      "Circle Time Topic": circle.Topic,
      "Circle Time Song": circle.Song,
      "Lesson Outcome": clil["Lesson Outcome"],
      "Source": normalizeSource(clil.Source),
      "New Keywords": normalizeItems(clil["New Keywords"]),
      "Recycled Keywords": normalizeItems(clil["Recycled Keywords"]),
      "Target Sentences": normalizeItems(clil["Target Sentences"]),
      "Suggested Activity / Game": normalizeActivities(clil["Activities and Games"]),
      "Phonics Content": phonics.Content,
      "Story": normalizeStory(story),
      "Source Audit": getHeadingBody(markdown, 2, "Source Audit"),
      "Review Issues": getHeadingBody(markdown, 2, "Review Issues"),
    }),
  };
}

function compact(value) {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => typeof v === "string" && v.trim()));
}

function titleFromDay(id, metadata, clil) {
  if (id.startsWith("media-extend")) return `Media Extend ${metadata.week}`;
  if (id.startsWith("mini-mission")) return `Mini Mission ${metadata.week}`;
  if (id.startsWith("showcase")) return `Showcase Lesson ${id.replace("showcase-lesson-", "")}`;
  const role = metadata.lessonRole ?? "";
  return role.replace(/^PU L\d+\s+[—-]\s+/, "") || clil["Lesson Outcome"] || id;
}

function normalizeItems(value = "") {
  if (!value || value.trim() === "— (none new; consolidates Week 1 friend / family words)") return "";
  return value
    .replace(/^—\s*/, "")
    .split(/\s*[|｜,]\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ｜ ");
}

function normalizeActivities(value = "") {
  if (!value) return "";
  return value
    .split(/\n(?=\d+\.\s+)/)
    .map((item) => item.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)
    .map((item, index) => `${index + 1}. ${item}`)
    .join("\n");
}

function normalizeStory(story) {
  const lines = [];
  if (story["Book / Story"]) lines.push(`Book / Story: ${story["Book / Story"]}`);
  for (const [key, value] of Object.entries(story)) {
    if (key === "Book / Story") continue;
    if (value) lines.push(`${key}: ${value}`);
  }
  return lines.join("\n");
}

function normalizeSource(value = "") {
  if (!value) return "";
  return value
    .replace(/\s*\|\s*/g, " ｜ ")
    .replace(/\bAudio\s+/g, "")
    .replace(/\bAB\s+(\d+\.\d+)/g, "AB $1");
}

function weekForDay(dayIndex) {
  return Math.floor(dayIndex / 5) + 1;
}

const unitFile = path.join(sourceRoot, "00_unit.md");
const daysRoot = path.join(sourceRoot, "days");
const parsedUnit = parseUnit(unitFile);
const lessons = Array.from({ length: 20 }, (_, index) => {
  const dayPath = path.join(daysRoot, `day_${String(index + 1).padStart(2, "0")}.md`);
  return parseDay(dayPath, index);
});

const weeks = Array.from({ length: 4 }, (_, index) => {
  const week = index + 1;
  return {
    id: `week-${week}`,
    week,
    title: `Week ${week}`,
    sourceWeek: `Week ${week}`,
    weeklyOutcome: "",
    coreLanguage: "",
    repeatedRoutine: "",
    lessons: lessons.filter((_, dayIndex) => weekForDay(dayIndex) === week),
  };
});

const unit = {
  unitId: "k1-language-unit-01",
  level: "K1",
  courseType: "language",
  unitNumber: 1,
  slug: "k1-language-unit-01",
  title: parsedUnit.metadata.unitTheme || "Friends and Family",
  overview: parsedUnit.overview,
  weeks,
};

const source = `// Generated from K1 Unit 1 unit-centric markdown source files.
// Do not edit curriculum wording here; regenerate from source markdown instead.

export const k1LanguageUnit01 = ${JSON.stringify(unit, null, 2)} as const;
`;

write(outputPath, source);
console.log(`Generated ${outputPath}`);
console.log(`Lessons: ${lessons.length}`);
