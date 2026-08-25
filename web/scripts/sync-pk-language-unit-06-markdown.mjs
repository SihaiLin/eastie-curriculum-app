// DEPRECATED: Use sync-language-unit.mjs instead.
// Example: node scripts/sync-language-unit.mjs --level pk --unit 06 --title "Toys and Space" --source-root <workspace_root> --unit-slug toys_and_space

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const overviewPath =
  "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/unit_layer_design/pk_unit_06_toys_and_space_unit_overview_1_1.md";
const lessonRoot = "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/lesson_layer_design";
const outputPath = path.join(webRoot, "src/curriculum/generated/pkLanguageUnit06.ts");

const weekFiles = [1, 2, 3, 4].map((week) => ({
  week,
  path: path.join(lessonRoot, `pk_unit_06_toys_and_space_week_${week}_light_lesson_frames_1_0.md`),
}));

const requiredLessonFields = [
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

function readMarkdown(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing source markdown: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function stripInlineMarkdown(value) {
  return value.replace(/\*\*(.*?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").trim();
}

function parseSectionMap(markdown, headingLevel = 2) {
  const lines = markdown.split(/\r?\n/);
  const headingPrefix = "#".repeat(headingLevel);
  const sections = [];
  let current = null;

  for (const line of lines) {
    const heading = line.match(new RegExp(`^${headingPrefix}\\s+(.+)\\s*$`));
    if (heading) {
      current = { title: stripInlineMarkdown(heading[1]), body: [] };
      sections.push(current);
      continue;
    }
    if (current) current.body.push(line);
  }

  return sections.map((section) => ({
    title: section.title,
    body: section.body.join("\n").trim(),
  }));
}

function parseOverview(markdown) {
  const title = stripInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? "PK Unit 6: Toys and Space");
  const sections = parseSectionMap(markdown, 2);
  return { title, sections };
}

function parseWeek(markdown, weekNumber) {
  const title = stripInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? `Week ${weekNumber}`);
  const sections = parseSectionMap(markdown, 2);
  const lessonIndexes = sections
    .map((section, index) => ({ index, match: section.title.match(/^Lesson\s+(\d+)$/i) }))
    .filter((item) => item.match);

  const metaSections = sections.slice(0, lessonIndexes[0]?.index ?? sections.length);
  const meta = Object.fromEntries(metaSections.map((section) => [section.title, section.body]));
  const lessons = lessonIndexes.map((item) => {
    const lessonSections = parseSectionMap(sections[item.index].body, 3);
    const fields = Object.fromEntries(lessonSections.map((section) => [section.title, section.body]));
    const missing = requiredLessonFields.filter((field) => !fields[field]);
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

function firstLine(value) {
  return value.split(/\r?\n/).map((line) => line.trim()).find(Boolean) ?? "";
}

const overviewMarkdown = readMarkdown(overviewPath);
const weeks = weekFiles.map((weekFile) => parseWeek(readMarkdown(weekFile.path), weekFile.week));
const overview = parseOverview(overviewMarkdown);

const generated = `// Generated from PK Language Unit 6 markdown source files.
// Do not edit curriculum wording here; regenerate from source markdown instead.

export const pkLanguageUnit06 = ${JSON.stringify(
  {
    unitId: "pk-language-unit-06",
    level: "PK",
    courseType: "language",
    unitNumber: 6,
    slug: "pk-language-unit-06",
    title: "Toys and Space",
    overview,
    weeks,
  },
  null,
  2,
)} as const;
`;

fs.writeFileSync(outputPath, generated);

console.log("Synced PK Language Unit 6 markdown.");
console.log(`Weeks checked: ${weeks.length}; lessons checked: ${weeks.reduce((sum, week) => sum + week.lessons.length, 0)}.`);
console.log(`Generated: ${outputPath}`);
