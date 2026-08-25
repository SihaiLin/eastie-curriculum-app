#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(webRoot, "..");
const contentRoot = path.join(projectRoot, "content/curriculum/k-language-unit-centric-v0_1");
const generatedRoot = path.join(webRoot, "src/curriculum/generated");

const units = [
  { level: "k1", unitNumber: 0, folder: "unit_hello", exportName: "k1LanguageUnit00" },
  { level: "k1", unitNumber: 1, folder: "unit_01_friends_and_family", exportName: "k1LanguageUnit01" },
  { level: "k2", unitNumber: 0, folder: "unit_hello", exportName: "k2LanguageUnit00" },
  { level: "k2", unitNumber: 1, folder: "unit_01_our_new_school", exportName: "k2LanguageUnit01" },
  { level: "k3", unitNumber: 0, folder: "unit_hello", exportName: "k3LanguageUnit00" },
  { level: "k3", unitNumber: 1, folder: "unit_01_a_day_on_the_farm", exportName: "k3LanguageUnit01" },
  { level: "pk", unitNumber: 0, folder: "unit_hello", exportName: "pkLanguageUnit00" },
  { level: "pk", unitNumber: 1, folder: "unit_01_hello_and_my_class", exportName: "pkLanguageUnit01" },
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
    if (match) out[toCamel(match[1])] = match[2].trim();
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

function parseUnit(filePath, fallbackTitle) {
  const markdown = read(filePath);
  const metadata = parseMetadata(getHeadingBody(markdown, 2, "Unit Metadata"));
  const outcomes = parseSimpleList(getHeadingBody(markdown, 2, "Unit Outcomes"));
  const languageBank = getHeadingBody(markdown, 2, "Language Bank");
  const sequence = getHeadingBody(markdown, 2, "Unit Sequence");
  const project = getHeadingBody(markdown, 2, "Unit Project");
  const openItems = getHeadingBody(markdown, 2, "Open Items");
  return {
    metadata,
    overview: {
      title: markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallbackTitle,
      sections: [
        { title: "Unit Purpose", body: getHeadingBody(markdown, 2, "Unit Purpose") },
        { title: "Unit Outcomes", body: outcomes.join(" ｜ ") },
        { title: "Language Summary", body: flattenLanguageBank(languageBank) },
        { title: "Unit Sequence", body: sequence.replace(/^###\s+/gm, "").trim() },
        { title: "Unit Project", body: project },
        { title: "Open Items", body: openItems },
      ].filter((section) => section.body),
    },
  };
}

function flattenLanguageBank(body) {
  const items = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => stripInlineMarkdown(line.replace(/^-\s+/, "")));
  return items.length ? `${items.length} unit language items ｜ ${items.join(" ｜ ")}` : "";
}

function parseDay(filePath, index) {
  const markdown = read(filePath);
  const metadata = parseMetadata(getHeadingBody(markdown, 2, "Day Metadata"));
  const dayFocus = parseSimpleList(getHeadingBody(markdown, 2, "Day Focus")).join("\n");
  const circle = parseKeyValueBullets(getSubsectionBody(markdown, 2, "Displayed Content", 3, "Circle Time"));
  const clil = parseKeyValueBullets(getSubsectionBody(markdown, 2, "Displayed Content", 3, "CLIL Class"));
  const phonics = parseKeyValueBullets(getSubsectionBody(markdown, 2, "Displayed Content", 3, "Phonics"));
  const story = parseKeyValueBullets(getSubsectionBody(markdown, 2, "Displayed Content", 3, "Story"));
  const lessonNumber = Number(/PU L(\d+)/.exec(metadata.powerUpLesson ?? "")?.[1] ?? 0);
  const id = lessonIdFromDay(metadata, lessonNumber, index);
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
      "Keywords": normalizeItems(clil["Keywords"]),
      "Target Language": normalizeItems(clil["Target Language"]),
      "Suggested Activity / Game": normalizeActivities(clil["Activities and Games"]),
      "Differentiation": getHeadingBody(markdown, 3, "Differentiation"),
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

function lessonIdFromDay(metadata, lessonNumber, index) {
  if (lessonNumber > 0) return `pu-l${lessonNumber}`;
  const week = Number(metadata.week ?? Math.floor(index / 5) + 1);
  const dayType = String(metadata.dayType ?? "").toLowerCase();
  if (dayType.includes("media")) return `media-extend-${week}`;
  if (dayType.includes("mini")) return `mini-mission-${week}`;
  if (dayType.includes("mission")) return `mission-extend-${week}`;
  if (dayType.includes("showcase")) return `showcase-lesson-${index + 1 - 15}`;
  return `day-${String(index + 1).padStart(2, "0")}`;
}

function titleFromDay(id, metadata, clil) {
  if (id.startsWith("media-extend")) return `Media Extend ${metadata.week}`;
  if (id.startsWith("mini-mission")) return `Mini Mission ${metadata.week}`;
  if (id.startsWith("mission-extend")) return `Mission Extend ${metadata.week}`;
  if (id.startsWith("showcase")) return `Showcase Lesson ${id.replace("showcase-lesson-", "")}`;
  const role = metadata.lessonRole ?? "";
  return role.replace(/^PU L\d+\s+[—-]\s+/, "") || clil["Lesson Outcome"] || id;
}

function normalizeItems(value = "") {
  if (!value || /^—\s*\(none/i.test(value)) return "";
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
  return value.replace(/\s*\|\s*/g, " ｜ ").replace(/\bAudio\s+/g, "");
}

function buildWeeks(lessons) {
  const grouped = new Map();
  for (const item of lessons) {
    const week = Number(item.metadata.week ?? 1);
    if (!grouped.has(week)) grouped.set(week, []);
    grouped.get(week).push(item.lesson);
  }
  return [...grouped.entries()].map(([week, weekLessons]) => ({
    id: `week-${week}`,
    week,
    title: `Week ${week}`,
    sourceWeek: `Week ${week}`,
    weeklyOutcome: "",
    coreLanguage: "",
    repeatedRoutine: "",
    lessons: weekLessons,
  }));
}

function syncUnit(config) {
  const sourceRoot = path.join(contentRoot, config.level, config.folder);
  const unitFile = path.join(sourceRoot, "00_unit.md");
  const daysRoot = path.join(sourceRoot, "days");
  const parsedUnit = parseUnit(unitFile, `${config.level.toUpperCase()} Unit ${config.unitNumber}`);
  const dayFiles = fs
    .readdirSync(daysRoot)
    .filter((name) => /^day_\d+\.md$/.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => path.join(daysRoot, name));
  const lessonsWithMeta = dayFiles.map((filePath, index) => {
    const parsed = parseDay(filePath, index);
    return { metadata: parseMetadata(getHeadingBody(read(filePath), 2, "Day Metadata")), lesson: parsed };
  });
  const unit = {
    unitId: `${config.level}-language-unit-${String(config.unitNumber).padStart(2, "0")}`,
    level: config.level.toUpperCase(),
    courseType: "language",
    unitNumber: config.unitNumber,
    slug: `${config.level}-language-unit-${String(config.unitNumber).padStart(2, "0")}`,
    title: parsedUnit.metadata.unitTheme || parsedUnit.overview.title,
    overview: parsedUnit.overview,
    weeks: buildWeeks(lessonsWithMeta),
  };
  const source = `// Generated from ${config.level.toUpperCase()} Language Unit ${String(config.unitNumber).padStart(2, "0")} unit-centric markdown source files.
// Do not edit curriculum wording here; regenerate from source markdown instead.

export const ${config.exportName} = ${JSON.stringify(unit, null, 2)} as const;
`;
  const outputPath = path.join(generatedRoot, `${config.exportName}.ts`);
  write(outputPath, source);
  console.log(`Generated ${outputPath} (${dayFiles.length} days)`);
}

for (const unit of units) syncUnit(unit);
