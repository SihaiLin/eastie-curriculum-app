#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
function getArg(flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null;
}

const level = getArg("--level") ?? "pg";
const unit = getArg("--unit") ?? "06";
const unitTitle = getArg("--title") ?? "Toys and Space";
const sourceRoot = getArg("--source-root");
const unitSlug = getArg("--unit-slug") ?? "toys_and_space";
const unitKey = getArg("--unit-key");
const weekCount = Number(getArg("--weeks") ?? 4);

if (!sourceRoot || !fs.existsSync(sourceRoot)) {
  console.error("Usage: node scripts/sync-language-unit.mjs --level pg|pk --unit 06 --title \"Toys and Space\" --source-root <workspace_root> --unit-slug toys_and_space [--unit-key 06|hello] [--weeks 4]");
  console.error("Missing or invalid --source-root");
  process.exit(1);
}

const LEVEL = level.toUpperCase();
const UNIT = unit.padStart(2, "0");
const exportName = `${level}LanguageUnit${UNIT}`;
const sourceUnitKey = unitKey ?? UNIT;
const unitDisplayName = UNIT === "00" ? "Unit Hello" : `Unit ${UNIT}`;
const legacyOverviewDir = path.join(sourceRoot, "unit_layer_design");
const legacyLessonDir = path.join(sourceRoot, "lesson_layer_design");

const pgCanonicalTitles = [
  "Unit Focus",
  "YLE Support",
  "Unit Outcomes",
  "Unit Language",
  "Not Yet",
];

const pkCanonicalTitles = [
  "Core Focus",
  "YLE Support",
  "Unit Outcomes",
  "Not Yet",
  "Core Vocabulary",
];

const pgRequiredFields = [
  "Lesson Title",
  "Source Mini Progression Step",
  "Lesson Outcome",
  "New Language",
  "Recycled Language",
  "Baseline Child Response",
  "Incidental Imitation / Optional Exposure",
  "Suggested Activity / Game",
];

const pkRequiredFields = [
  "Lesson Title",
  "Source Mini Progression Step",
  "Lesson Outcome",
  "New Language",
  "Recycled Language",
  "Baseline Child Response",
  "Baseline Output Opportunity",
  "Optional Challenge",
  "Suggested Activity / Game",
];

const canonicalTitles = LEVEL === "PK" ? pkCanonicalTitles : pgCanonicalTitles;
const requiredLessonFields = LEVEL === "PK" ? pkRequiredFields : pgRequiredFields;

const outputPath = path.join(webRoot, `src/curriculum/generated/${exportName}.ts`);

function existsOrThrow(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing file: ${filePath}`);
  return filePath;
}

function readMarkdown(filePath) {
  return fs.readFileSync(existsOrThrow(filePath), "utf8");
}

function stripInlineMarkdown(value) {
  return value.replace(/\*\*(.*?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").trim();
}

function cleanMarkdownBody(value) {
  return value.replace(/\n-{3,}\s*$/g, "").trim();
}

function firstLine(value) {
  return value.split(/\r?\n/).map((l) => l.trim()).find(Boolean) ?? "";
}

function parseSectionMap(markdown, headingLevel = 2) {
  const lines = markdown.split(/\r?\n/);
  const prefix = "#".repeat(headingLevel);
  const sections = [];
  let current = null;

  for (const line of lines) {
    const match = line.match(new RegExp(`^${prefix}\\s+(.+)\\s*$`));
    if (match) {
      current = { title: stripInlineMarkdown(match[1]), body: [] };
      sections.push(current);
      continue;
    }
    if (current) current.body.push(line);
  }

  return sections.map((s) => ({
    title: s.title,
    body: s.body.join("\n").trim(),
  }));
}

function hasDirectUnitLayout() {
  return fs.existsSync(path.join(sourceRoot, "00_overview.md"));
}

function getOverviewDir() {
  return hasDirectUnitLayout() ? sourceRoot : legacyOverviewDir;
}

function getLessonDir() {
  return hasDirectUnitLayout() ? sourceRoot : legacyLessonDir;
}

function findOverviewFile() {
  if (hasDirectUnitLayout()) {
    return path.join(sourceRoot, "00_overview.md");
  }

  const overviewDir = getOverviewDir();
  const candidates = [
    path.join(overviewDir, `${level}_unit_${sourceUnitKey}_${unitSlug}_unit_overview_1_1.md`),
    path.join(overviewDir, `${level}_unit_${sourceUnitKey}_${unitSlug}_unit_overview_1_0.md`),
    path.join(overviewDir, `${level}_unit_${sourceUnitKey}_${unitSlug}_unit_design_1_0.md`),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  const fallback = fs.readdirSync(overviewDir)
    .filter((f) => f.startsWith(`${level}_unit_${sourceUnitKey}`) && f.endsWith(".md"))
    .sort();
  if (fallback.length) return path.join(overviewDir, fallback[0]);
  throw new Error(`Could not find overview file for ${level} unit ${UNIT} in ${overviewDir}`);
}

function findWeekFile(weekNumber) {
  if (hasDirectUnitLayout()) {
    const directCandidates = [
      path.join(sourceRoot, `${String(weekNumber).padStart(2, "0")}_week_${weekNumber}.md`),
      path.join(sourceRoot, `0${weekNumber}_week_${weekNumber}.md`),
      path.join(sourceRoot, `week_${weekNumber}.md`),
      path.join(sourceRoot, `week-${weekNumber}.md`),
    ];
    for (const candidate of directCandidates) {
      if (fs.existsSync(candidate)) return candidate;
    }
  }

  const lessonDir = getLessonDir();
  const candidates = [
    path.join(lessonDir, `${level}_unit_${sourceUnitKey}_${unitSlug}_week_${weekNumber}_light_lesson_frames_1_0.md`),
    path.join(lessonDir, `${level}_unit_${sourceUnitKey}_${unitSlug}_week_${weekNumber}_light_lesson_frames_1_1.md`),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  const fallback = fs.readdirSync(lessonDir)
    .filter((f) => f.startsWith(`${level}_unit_${sourceUnitKey}`) && f.includes(`week_${weekNumber}`) && f.endsWith(".md"))
    .sort();
  if (fallback.length) return path.join(lessonDir, fallback[0]);
  throw new Error(`Could not find week ${weekNumber} file for ${level} unit ${UNIT} in ${lessonDir}`);
}

function parseOverview(markdown) {
  const sections = parseSectionMap(markdown, 2);
  const sectionMap = Object.fromEntries(sections.map((s) => [s.title, s.body]));
  const progressionTitle = `${weekCount}-Week Progression Logic`;
  const expectedTitles = [...canonicalTitles, progressionTitle];

  const missing = expectedTitles.filter((t) => !sectionMap[t]);
  if (missing.length) {
    throw new Error(
      `${LEVEL} Language Unit ${UNIT} overview missing canonical sections:\n` +
      `  Expected: ${expectedTitles.join(", ")}\n` +
      `  Missing: ${missing.join(", ")}\n` +
      `  Available: ${Object.keys(sectionMap).join(", ")}`
    );
  }

  return expectedTitles.map((title) => ({
    title,
    body: cleanMarkdownBody(sectionMap[title]),
  }));
}

function parseWeek(markdown, weekNumber) {
  const title = stripInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? `Week ${weekNumber}`);
  const sections = parseSectionMap(markdown, 2);
  const lessonIndexes = sections
    .map((s, i) => ({ index: i, match: s.title.match(/^Lesson\s+(\d+)$/i) }))
    .filter((item) => item.match);

  const metaSections = sections.slice(0, lessonIndexes[0]?.index ?? sections.length);
  const meta = Object.fromEntries(metaSections.map((s) => [s.title, s.body]));
  const lessons = lessonIndexes.map((item) => {
    const lessonSections = parseSectionMap(sections[item.index].body, 3);
    const fields = Object.fromEntries(lessonSections.map((s) => [s.title, s.body]));
    if (!fields["Suggested Activity / Game"] && fields["Suggested Activity / Play"]) {
      fields["Suggested Activity / Game"] = fields["Suggested Activity / Play"];
    }
    const missing = requiredLessonFields.filter((f) => !fields[f]);
    if (missing.length) {
      throw new Error(`Week ${weekNumber} Lesson ${item.match[1]} missing fields: ${missing.join(", ")}`);
    }
    return {
      id: `week-${weekNumber}-lesson-${item.match[1]}`,
      lesson: Number(item.match[1]),
      title: firstLine(fields["Lesson Title"]),
      fields,
    };
  });

  if (lessons.length !== 5) {
    throw new Error(`Week ${weekNumber}: expected 5 lessons, found ${lessons.length}`);
  }

  return {
    id: `week-${weekNumber}`,
    week: weekNumber,
    title,
    sourceWeek: firstLine(meta["Source Week"] ?? `Week ${weekNumber}`),
    weeklyOutcome: meta["Weekly Outcome"] ?? "",
    coreLanguage: meta["Core Language"] ?? "",
    repeatedRoutine: meta["Repeated Routine"] ?? "",
    lessons,
  };
}

const overviewPath = findOverviewFile();
console.log(`Reading overview: ${overviewPath}`);

const weekFiles = Array.from({ length: weekCount }, (_, index) => index + 1).map((n) => {
  const wp = findWeekFile(n);
  console.log(`Reading week ${n}: ${wp}`);
  return { week: n, path: wp };
});

const overviewMarkdown = readMarkdown(overviewPath);
const weeks = weekFiles.map((wf) => parseWeek(readMarkdown(wf.path), wf.week));
const overview = parseOverview(overviewMarkdown);

const generated = `// Generated from ${LEVEL} Language Unit ${UNIT} markdown source files.
// Do not edit curriculum wording here; regenerate from source markdown instead.

export const ${exportName} = ${JSON.stringify(
  {
    unitId: `${level}-language-unit-${UNIT}`,
    level: LEVEL,
    courseType: "language",
    unitNumber: Number(UNIT),
    slug: `${level}-language-unit-${UNIT}`,
    title: unitTitle,
    overview: {
    title: `${LEVEL} ${unitDisplayName}: ${unitTitle}`,
      sections: overview,
    },
    weeks,
  },
  null,
  2,
)} as const;
`;

fs.writeFileSync(outputPath, generated);

console.log(`Synced ${LEVEL} Language Unit ${UNIT} markdown.`);
console.log(`Weeks checked: ${weeks.length}; lessons checked: ${weeks.reduce((sum, w) => sum + w.lessons.length, 0)}.`);
console.log(`Generated: ${outputPath}`);
