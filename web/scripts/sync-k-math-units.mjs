#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const sourceRoot = "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design";
const outputPath = path.join(webRoot, "src/curriculum/generated/kMathUnits.ts");
const levels = ["k1", "k2", "k3"];

function readFile(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing source file: ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function cleanInlineMarkdown(value) {
  return value
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .trim();
}

function sectionBetween(markdown, startHeading, endHeadingRegex) {
  const start = markdown.indexOf(startHeading);
  if (start === -1) return "";
  const bodyStart = start + startHeading.length;
  const rest = markdown.slice(bodyStart);
  const endMatch = rest.match(endHeadingRegex);
  return (endMatch ? rest.slice(0, endMatch.index) : rest).trim();
}

function extractHeadingBody(section, heading) {
  return cleanInlineMarkdown(sectionBetween(section, heading, /\n#{1,4}\s/).replace(/\n+/g, " "));
}

function parseList(section) {
  return section
    .split("\n")
    .map((line) => cleanInlineMarkdown(line.replace(/^-\s+/, "")))
    .filter(Boolean);
}

function parseCodeText(section) {
  const match = section.match(/```(?:text)?\n([\s\S]*?)```/);
  const text = match ? match[1] : section;
  return text
    .split(/｜|\n/)
    .map((item) => cleanInlineMarkdown(item))
    .filter(Boolean);
}

function parseLessonSequence(section) {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map((line) => cleanInlineMarkdown(line.replace(/^\d+\.\s+/, "")));
}

function parseActivities(section) {
  const activityMatches = [...section.matchAll(/^###\s+(\d+)\.\s+(.+)$/gm)];
  return activityMatches.map((match, index) => {
    const start = match.index ?? 0;
    const next = activityMatches[index + 1]?.index ?? section.length;
    const body = section.slice(start + match[0].length, next).trim().replace(/\n+/g, " ");
    return {
      title: cleanInlineMarkdown(match[2]),
      description: cleanInlineMarkdown(body),
    };
  });
}

function parseLesson(section, lessonNumber, title) {
  const outcomeBlock = sectionBetween(section, "## Lesson Outcome", /\n## Math Growing Ladder Alignment/);
  const ladderBlock = sectionBetween(section, "## Math Growing Ladder Alignment", /\n## Theme Story Context/);
  const themeStoryContext = sectionBetween(section, "## Theme Story Context", /\n## Light Theme Language/).replace(/\n+/g, " ");
  const lightThemeLanguageBlock = sectionBetween(section, "## Light Theme Language", /\n## Teacher Routine Language/);
  const teacherRoutineLanguageBlock = sectionBetween(section, "## Teacher Routine Language", /\n## Optional Extension/);
  const optionalExtensionBlock = sectionBetween(section, "## Optional Extension", /\n## Suggested Activities \/ Games/).replace(/\n+/g, " ");
  const activitiesBlock = sectionBetween(section, "## Suggested Activities / Games", /\n---|\n# Lesson\s+\d+:/);

  return {
    id: `lesson-${String(lessonNumber).padStart(2, "0")}`,
    lessonNumber,
    title,
    outcome: {
      cognitive: extractHeadingBody(outcomeBlock, "### 1. Cognitive Objectives"),
      skill: extractHeadingBody(outcomeBlock, "### 2. Skill-based Objectives"),
      affective: extractHeadingBody(outcomeBlock, "### 3. Affective Objectives"),
    },
    ladder: {
      domain: extractHeadingBody(ladderBlock, "### Domain"),
      stageFocus: extractHeadingBody(ladderBlock, "### Stage Focus"),
      support: extractHeadingBody(ladderBlock, "### How This Lesson Supports the Ladder"),
    },
    themeStoryContext: cleanInlineMarkdown(themeStoryContext),
    lightThemeLanguage: parseCodeText(lightThemeLanguageBlock),
    teacherRoutineLanguage: parseCodeText(teacherRoutineLanguageBlock),
    optionalExtension: cleanInlineMarkdown(optionalExtensionBlock),
    activities: parseActivities(activitiesBlock),
  };
}

function parseLessons(markdown) {
  const lessonMatches = [...markdown.matchAll(/^# Lesson\s+(\d+):\s+(.+)$/gm)];
  return lessonMatches.map((match, index) => {
    const start = match.index ?? 0;
    const next = lessonMatches[index + 1]?.index ?? markdown.length;
    const section = markdown.slice(start, next).trim();
    return parseLesson(section, Number(match[1]), cleanInlineMarkdown(match[2]));
  });
}

function titleCaseUnitSlug(unitSlug) {
  const smallWords = new Set(["a", "an", "and", "at", "in", "of", "on", "the", "to"]);
  return unitSlug
    .split("_")
    .map((word, index) => {
      if (index > 0 && smallWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function discoverMathUnits() {
  return levels.flatMap((level) => {
    const courseRoot = path.join(sourceRoot, level, "non_language_courses");
    return fs
      .readdirSync(courseRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && /^unit_\d{2}_/.test(entry.name))
      .map((entry) => {
        const unitNumber = Number(entry.name.match(/^unit_(\d{2})_/)?.[1]);
        const unitSlug = entry.name.replace(/^unit_\d{2}_/, "");
        const sourceMarkdownPath = path.join(
          courseRoot,
          entry.name,
          "01_course_tracks",
          `${level}_unit_${String(unitNumber).padStart(2, "0")}_math_growing_ladder.md`,
        );
        return {
          expectedLessons: level === "k1" ? 4 : 8,
          level: level.toUpperCase(),
          sourceMarkdownPath,
          title: titleCaseUnitSlug(unitSlug),
          unitId: `${level}-math-unit-${String(unitNumber).padStart(2, "0")}`,
          unitNumber,
        };
      });
  }).sort((a, b) => a.level.localeCompare(b.level) || a.unitNumber - b.unitNumber);
}

function buildUnit(config) {
  const markdown = readFile(config.sourceMarkdownPath);
  const overviewMarkdown = sectionBetween(markdown, "## Course Overview", /\n---\n/);
  const lessons = parseLessons(markdown);

  if (lessons.length !== config.expectedLessons) {
    throw new Error(
      `Expected ${config.expectedLessons} ${config.level} Unit ${config.unitNumber} math lessons, found ${lessons.length}`,
    );
  }

  return {
    unitId: config.unitId,
    level: config.level,
    courseType: "non-language",
    track: "math-growing-ladder",
    courseCode: "A",
    unitNumber: config.unitNumber,
    title: config.title,
    displayTitle: `${config.level} Unit ${String(config.unitNumber).padStart(2, "0")}: Math Growing Ladder`,
    status: "working-test-unit",
    sourceMarkdownPath: config.sourceMarkdownPath,
    sourceMarkdown: markdown,
    overview: {
      courseType: extractHeadingBody(overviewMarkdown, "### Course Type"),
      unitOutcomes: parseList(sectionBetween(overviewMarkdown, "### Unit Outcomes", /\n### Math Lesson Sequence/))
        .filter((item) => !item.endsWith(":")),
      lessonSequence: parseLessonSequence(sectionBetween(overviewMarkdown, "### Math Lesson Sequence", /\n?$/)),
    },
    lessons,
  };
}

const generatedUnits = discoverMathUnits().map(buildUnit);

const generated = `// Generated from K1/K2/K3 Math Growing Ladder markdown.
// Do not edit lesson wording here; regenerate from source markdown instead.

export const kMathUnits = ${JSON.stringify(generatedUnits, null, 2)} as const;

export type KMathUnit = typeof kMathUnits[number];
export type KMathLesson = KMathUnit["lessons"][number];
export type KMathLevel = KMathUnit["level"];

export function getKMathUnit(level: string, unitNumber: number): KMathUnit | undefined {
  return kMathUnits.find(
    (unit) => unit.level.toLowerCase() === level.toLowerCase() && unit.unitNumber === unitNumber,
  );
}
`;

fs.writeFileSync(outputPath, generated);

console.log("Synced K1/K2/K3 Math Growing Ladder units from markdown.");
for (const level of ["K1", "K2", "K3"]) {
  const units = generatedUnits.filter((unit) => unit.level === level);
  console.log(`${level}: ${units.length} units, ${units.reduce((total, unit) => total + unit.lessons.length, 0)} lessons`);
}
console.log(`Generated: ${outputPath}`);
