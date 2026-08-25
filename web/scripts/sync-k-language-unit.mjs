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

const level = getArg("--level") ?? "k2";
const unit = getArg("--unit") ?? "01";
const unitTitle = getArg("--title") ?? "Our New School";
const sourceRoot = getArg("--source-root");

if (!sourceRoot || !fs.existsSync(sourceRoot)) {
  console.error("Usage: node scripts/sync-k-language-unit.mjs --level k2 --unit 01 --title \"Our New School\" --source-root <unit_dir>");
  console.error("Missing or invalid --source-root");
  process.exit(1);
}

const LEVEL = level.toUpperCase();
const UNIT = unit.padStart(2, "0");
const exportName = `${level}LanguageUnit${UNIT}`;
const outputPath = path.join(webRoot, `src/curriculum/generated/${exportName}.ts`);

const structureTitle = UNIT === "00" ? "Unit Structure" : "4-Week Structure";
const canonicalTitles = [
  "Unit Outcomes",
  "Language Summary",
  structureTitle,
  "Showcase",
];

const missionTitleAlternatives = ["Power Up Mission", "Power Up Mini Mission"];

// Regular Power Up lessons need these fields
const requiredLessonFields = [
  "Lesson Role",
  "Source",
  "Lesson Outcome",
  "New Language",
  "Recycled Language",
];

// Extend/showcase lessons only need Role + Status (handled in getExtendFields)

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
      if (current) sections.push(current);
      current = { title: stripInlineMarkdown(match[1]), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push(current);

  return sections.map((s) => ({
    title: s.title,
    body: s.body.join("\n").trim(),
  }));
}

function parseOverview(markdown) {
  const sections = parseSectionMap(markdown, 2);
  const sectionMap = Object.fromEntries(sections.map((s) => [s.title, s.body]));

  const missing = canonicalTitles.filter((t) => !sectionMap[t]);
  if (missing.length) {
    throw new Error(
      `${LEVEL} Language Unit ${UNIT} overview missing canonical sections:\n` +
      `  Expected: ${canonicalTitles.join(", ")}\n` +
      `  Missing: ${missing.join(", ")}\n` +
      `  Available: ${Object.keys(sectionMap).join(", ")}`
    );
  }

  // Find mission section by either title
  const missionTitle = missionTitleAlternatives.find((a) => sectionMap[a]);
  if (!missionTitle) {
    throw new Error(
      `${LEVEL} Language Unit ${UNIT} overview missing mission section.\n` +
      `  Expected one of: ${missionTitleAlternatives.join(", ")}\n` +
      `  Available: ${Object.keys(sectionMap).join(", ")}`
    );
  }

  const title = stripInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? `${LEVEL} Unit ${UNIT}: ${unitTitle}`);

  const allTitles = [...canonicalTitles];
  // Insert mission section after Language Summary (index 2)
  allTitles.splice(2, 0, missionTitle);

  return {
    title,
    sections: allTitles.map((t) => ({
      title: t,
      body: sectionMap[t],
    })),
  };
}

function isRegularLesson(title) {
  return /^lesson\s+\d+/i.test(title);
}

function isMissionExtend(title) {
  return /^mission\s+extend/i.test(title);
}

function isMediaExtend(title) {
  return /^media\s+extend/i.test(title);
}

function isMiniMission(title) {
  return /^mini\s+mission/i.test(title);
}

function isShowcaseLesson(title) {
  return /^showcase\s+lesson/i.test(title);
}

function getLessonType(title) {
  if (isRegularLesson(title)) return "regular";
  if (isMissionExtend(title)) return "mission-extend";
  if (isMediaExtend(title)) return "media-extend";
  if (isMiniMission(title)) return "mini-mission";
  if (isShowcaseLesson(title)) return "showcase";
  return null;
}

function getExtendFields(lessonType) {
  return ["Lesson Role", "Status"];
}

function buildLessonId(lessonType, weekNumber, lessonNum, lessonTitle) {
  if (lessonType === "mission-extend") return `mission-extend-${weekNumber}`;
  if (lessonType === "media-extend") return `media-extend-${weekNumber}`;
  if (lessonType === "mini-mission") return `mini-mission-${weekNumber}`;
  if (lessonType === "showcase") return `showcase-lesson-${lessonNum}`;
  return `pu-l${lessonNum}`;
}

// Track the Power Up lesson counter across all weeks
let puCounter = 0;

function resetPuCounter() {
  puCounter = 0;
}

function parseWeek(markdown, weekNumber) {
  const title = stripInlineMarkdown(markdown.match(/^#\s+(.+)$/m)?.[1] ?? `Week ${weekNumber}`);
  const lines = markdown.split(/\r?\n/);

  // Extract h2 metadata sections and h3 lesson sections in one pass
  const h2Sections = [];
  const h3Sections = [];
  let currentH2 = null;
  let currentH3 = null;
  let afterH2 = false;

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)\s*$/);
    const h3Match = line.match(/^###\s+(.+)\s*$/);
    const h1Match = line.match(/^#\s+(.+)\s*$/);

    if (h1Match) {
      // Skip the h1 title
      continue;
    }

    if (h2Match) {
      if (currentH2) h2Sections.push(currentH2);
      currentH2 = { title: stripInlineMarkdown(h2Match[1]), bodyLines: [] };
      currentH3 = null;
      continue;
    }

    if (h3Match) {
      if (currentH3) h3Sections.push(currentH3);
      currentH3 = { title: stripInlineMarkdown(h3Match[1]), bodyLines: [], parentH2: currentH2?.title ?? "" };
      continue;
    }

    if (currentH3) {
      currentH3.bodyLines.push(line);
    } else if (currentH2) {
      currentH2.bodyLines.push(line);
    }
  }
  if (currentH2) h2Sections.push(currentH2);
  if (currentH3) h3Sections.push(currentH3);

  const meta = Object.fromEntries(h2Sections.map((s) => [s.title, s.bodyLines.join("\n").trim()]));

  // Filter only lesson-like sections
  const lessonSections = h3Sections.filter((s) => getLessonType(s.title));

  const lessons = lessonSections.map((item) => {
    const fieldsSection = parseSectionMap(item.bodyLines.join("\n"), 4);
    const fields = Object.fromEntries(fieldsSection.map((s) => [s.title, s.body]));

    const lessonType = getLessonType(item.title);

    if (lessonType === "regular") {
      puCounter += 1;
      const lessonNum = puCounter;
      const lessonMatch = item.title.match(/^Lesson\s+(\d+)/i);
      const rawLessonNum = lessonMatch ? Number(lessonMatch[1]) : lessonNum;

      const missing = requiredLessonFields.filter((f) => !fields[f]);
      if (missing.length) {
        throw new Error(`Week ${weekNumber} ${item.title} missing fields: ${missing.join(", ")}`);
      }

      return {
        id: buildLessonId("regular", weekNumber, rawLessonNum),
        lesson: rawLessonNum,
        title: firstLine(fields["Lesson Title"] ?? item.title.replace(/^Lesson\s+\d+[:：]?\s*/i, "")),
        fields,
      };
    }

    if (lessonType === "mission-extend" || lessonType === "media-extend" || lessonType === "mini-mission") {
      const extendFields = getExtendFields(lessonType);
      const missing = extendFields.filter((f) => !fields[f]);
      if (missing.length) {
        throw new Error(`Week ${weekNumber} ${item.title} missing fields: ${missing.join(", ")}`);
      }
      return {
        id: buildLessonId(lessonType, weekNumber, 0, item.title),
        lesson: 0,
        title: item.title,
        fields,
      };
    }

    if (lessonType === "showcase") {
      const missing = getExtendFields("showcase").filter((f) => !fields[f]);
      if (missing.length) {
        throw new Error(`Week ${weekNumber} ${item.title} missing fields: ${missing.join(", ")}`);
      }
      const lessonNum = Number(item.title.match(/\d+/)?.[0] ?? 1);
      return {
        id: buildLessonId("showcase", weekNumber, lessonNum, item.title),
        lesson: 0,
        title: item.title,
        fields,
      };
    }

    return null;
  }).filter(Boolean);

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

function findOverviewFile(dir) {
  const candidates = [
    path.join(dir, "00_overview.md"),
    path.join(dir, "overview.md"),
    path.join(dir, "unit_overview.md"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && /overview/i.test(f));
  if (files.length) return path.join(dir, files[0]);
  throw new Error(`No overview markdown found in ${dir}`);
}

function findWeekFiles(dir) {
  const expectedWeeks = UNIT === "00" ? [1] : [1, 2, 3, 4];
  const candidates = expectedWeeks.map((n) => {
    const patterns = [
      `${String(n).padStart(2, "0")}_week_${n}.md`,
      `week_${n}.md`,
      `week-${n}.md`,
    ];
    for (const p of patterns) {
      const fullPath = path.join(dir, p);
      if (fs.existsSync(fullPath)) return { week: n, path: fullPath };
    }
    return null;
  });

  // Try glob fallback
  const allMd = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !/overview/i.test(f));
  for (let i = 0; i < candidates.length; i++) {
    if (!candidates[i]) {
      const weekNumber = expectedWeeks[i];
      const fallback = allMd.find((f) => f.includes(`week_${weekNumber}`) || f.includes(`week-${weekNumber}`));
      if (fallback) candidates[i] = { week: weekNumber, path: path.join(dir, fallback) };
    }
  }

  const missing = candidates.filter((c) => !c);
  if (missing.length) {
    throw new Error(`Missing week files for weeks: ${missing.map((m) => m.week).join(", ")} in ${dir}`);
  }

  return candidates;
}

console.log(`Syncing ${LEVEL} Language Unit ${UNIT}...`);

const overviewPath = findOverviewFile(sourceRoot);
const weekFiles = findWeekFiles(sourceRoot);

console.log(`Reading overview: ${overviewPath}`);
weekFiles.forEach((wf) => console.log(`Reading week ${wf.week}: ${wf.path}`));

resetPuCounter();

const overviewMarkdown = readMarkdown(overviewPath);
const weeks = weekFiles.map((wf) => {
  const weekMd = readMarkdown(wf.path);
  return parseWeek(weekMd, wf.week);
});
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
    overview,
    weeks,
  },
  null,
  2,
)} as const;
`;

fs.writeFileSync(outputPath, generated);

const totalLessons = weeks.reduce((s, w) => s + w.lessons.length, 0);
console.log(`Synced ${LEVEL} Language Unit ${UNIT} markdown.`);
console.log(`Weeks: ${weeks.length}; lessons: ${totalLessons}.`);
console.log(`Generated: ${outputPath}`);
