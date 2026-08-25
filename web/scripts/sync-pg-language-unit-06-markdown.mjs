// DEPRECATED: Use sync-language-unit.mjs instead.
// Example: node scripts/sync-language-unit.mjs --level pg --unit 06 --title "Toys and Space" --source-root <workspace_root> --unit-slug toys_and_space

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const overviewPath =
  "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/unit_layer_design/pg_unit_06_toys_and_space_unit_design_1_0.md";
const lessonRoot = "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/lesson_layer_design";
const outputPath = path.join(webRoot, "src/curriculum/generated/pgLanguageUnit06.ts");

const weekFiles = [1, 2, 3, 4].map((week) => ({
  week,
  path: path.join(lessonRoot, `pg_unit_06_toys_and_space_week_${week}_light_lesson_frames_1_0.md`),
}));

const requiredLessonFields = [
  "Lesson Title",
  "Source Mini Progression Step",
  "Lesson Outcome",
  "New Language",
  "Recycled Language",
  "Baseline Child Response",
  "Incidental Imitation / Optional Exposure",
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
  const title = stripInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? "PG Unit 6: Toys and Space");
  const sections = buildPgOverviewSections(markdown);
  return { title, sections };
}

function buildPgOverviewSections(markdown) {
  const topSections = Object.fromEntries(parseSectionMap(markdown, 2).map((section) => [section.title, section.body]));

  const canonicalTitles = [
    "Unit Focus",
    "YLE Support",
    "Unit Outcomes",
    "Unit Language",
    "Not Yet",
    "4-Week Progression Logic",
  ];

  const hasCanonicalOverview = canonicalTitles.every((title) => topSections[title] !== undefined);
  if (hasCanonicalOverview) {
    return canonicalTitles.map((title) => ({
      title,
      body: cleanMarkdownBody(topSections[title]),
    }));
  }

  const unitGeneral = Object.fromEntries(parseSectionMap(topSections["Unit General"] ?? "", 3).map((section) => [section.title, section.body]));
  const languageFocus = Object.fromEntries(parseSectionMap(topSections["Language Focus"] ?? "", 3).map((section) => [section.title, section.body]));

  return [
    {
      title: "Unit Focus",
      body: cleanMarkdownBody(unitGeneral["Core Focus"] ?? ""),
    },
    {
      title: "YLE Support",
      body: "",
    },
    {
      title: "Unit Outcomes",
      body: buildUnitOutcomes(topSections["Unit Outcomes"] ?? ""),
    },
    {
      title: "Unit Language",
      body: [
        "### Vocabulary",
        "",
        cleanMarkdownBody(languageFocus["Vocabulary"] ?? ""),
        "",
        "### Teacher Input",
        "",
        cleanMarkdownBody(languageFocus["Teacher Input"] ?? ""),
      ].join("\n"),
    },
    {
      title: "Not Yet",
      body: buildNotYet(languageFocus["Not Yet Targeted"] ?? ""),
    },
    {
      title: "4-Week Progression Logic",
      body: "",
    },
  ];
}

function buildUnitOutcomes(body) {
  const cleaned = cleanMarkdownBody(body);
  const sentences = cleaned
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s*｜\s*/g, ", ")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return [
    sentences[0] ?? "",
    "Children will begin to recognise familiar toy and object language through looking, touching, holding, giving, taking, choosing, or moving real objects with adult support.",
    "They will begin to respond to simple container-based action language through physical action, especially putting objects in, taking objects out, opening containers, and closing containers.",
    "They will also begin to participate in simple toy exchange, waiting, and clean-up routines through giving, taking, releasing, pausing briefly, putting toys back, or joining a familiar group routine with adult support.",
    "Independent verbal output is not required.",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildNotYet(body) {
  const cleaned = cleanMarkdownBody(body)
    .replace(/^PG children are not required to:\s*/i, "")
    .trim();

  return [
    "This unit does not expect PG children to handle toys and spatial language at a full Starter lesson level yet.",
    `PG children are not required to ${cleaned}.`,
    "Any verbal imitation, short phrase, or expanded spatial language may be welcomed when it appears naturally, but it should remain optional and readiness-based.",
  ].join("\n\n");
}

function cleanMarkdownBody(value) {
  return value.replace(/\n-{3,}\s*$/g, "").trim();
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

const generated = `// Generated from PG Language Unit 6 markdown source files.
// Do not edit curriculum wording here; regenerate from source markdown instead.

export const pgLanguageUnit06 = ${JSON.stringify(
  {
    unitId: "pg-language-unit-06",
    level: "PG",
    courseType: "language",
    unitNumber: 6,
    slug: "pg-language-unit-06",
    title: "Toys and Space",
    overview,
    weeks,
  },
  null,
  2,
)} as const;
`;

fs.writeFileSync(outputPath, generated);

console.log("Synced PG Language Unit 6 markdown.");
console.log(`Weeks checked: ${weeks.length}; lessons checked: ${weeks.reduce((sum, week) => sum + week.lessons.length, 0)}.`);
console.log(`Generated: ${outputPath}`);
