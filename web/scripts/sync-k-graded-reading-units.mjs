#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const sourceRoot = "/Users/Lucia/Desktop/RAZ/graded_reading_lesson_designs";
const curriculumSourceRoot = "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design";
const outputPath = path.join(webRoot, "src/curriculum/generated/kGradedReadingUnits.ts");
const resourceManifestOutputPath = "/Users/Lucia/Desktop/RAZ/graded_reading_resources_manifest.json";
const razCoverRoot = "/Users/Lucia/Desktop/RAZ/covers";
const razCoverManifestPath = "/Users/Lucia/Desktop/RAZ/covers/manifest.json";
const webCoverPublicDir = path.join(webRoot, "public/curriculum-resources/raz-covers/k-graded-reading");
const webCoverUrlBase = "/curriculum-resources/raz-covers/k-graded-reading";
const razResourceRoot = "/Users/Lucia/Desktop/RAZ";
const webResourcePublicDir = path.join(webRoot, "public/curriculum-resources/raz/k-graded-reading");
const webResourceUrlBase = "/curriculum-resources/raz/k-graded-reading";

function readFile(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing source file: ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function cleanInlineMarkdown(value) {
  return value
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .replace(/\.\./g, ".")
    .trim();
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function slugifyFileName(value) {
  return slugify(value).replace(/_/g, "-");
}

function normalizeResourceText(value) {
  return slugify(value)
    .replace(/^aa_/, "")
    .replace(/^(a|b|c|d)_/, "")
    .replace(/^(raz_)?l?l?(aa|a|b|c|d)\d*_/, "")
    .replace(/^(raz_)?l?(aa|a|b|c|d)\d*_/, "")
    .replace(/^(raz_)?l?(aa|a|b|c|d)_/, "")
    .replace(/_password_removed/g, "")
    .replace(/_password/g, "")
    .replace(/_passwor/g, "")
    .replace(/_(lp|wksh|worksheet|quiz|cq|dc)$/g, "")
    .replace(/^_+|_+$/g, "");
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

function resolveUnitTitle(level, unitNumber) {
  const root = path.join(curriculumSourceRoot, level.toLowerCase(), "non_language_courses");
  if (!fs.existsSync(root)) return `Unit ${unitNumber}`;
  const prefix = `unit_${String(unitNumber).padStart(2, "0")}_`;
  const unitDir = fs.readdirSync(root).find((entry) => entry.startsWith(prefix));
  return unitDir ? titleCaseUnitSlug(unitDir.slice(prefix.length)) : `Unit ${unitNumber}`;
}

function loadRazCoverManifest() {
  if (!fs.existsSync(razCoverManifestPath)) {
    console.warn(`RAZ cover manifest not found: ${razCoverManifestPath}`);
    return new Map();
  }

  const manifest = JSON.parse(readFile(razCoverManifestPath));
  const entries = Array.isArray(manifest.covers) ? manifest.covers : [];
  return new Map(entries.map((entry) => [`${entry.level}:${entry.book_slug}`, entry]));
}

const razCoverMap = loadRazCoverManifest();
const razResourceMap = scanRazResources();

function copyCoverImage(level, title) {
  const manifestEntry = razCoverMap.get(`${level}:${slugify(title)}`);
  const sourcePath = manifestEntry?.cover_path ?? (
    manifestEntry?.cover_jpg ? path.join(razCoverRoot, manifestEntry.cover_jpg) : null
  );
  if (!sourcePath || !fs.existsSync(sourcePath)) return null;

  fs.mkdirSync(webCoverPublicDir, { recursive: true });
  const fileName = `${level.toLowerCase()}_${manifestEntry.book_slug}_cover.jpg`;
  fs.copyFileSync(sourcePath, path.join(webCoverPublicDir, fileName));
  return `${webCoverUrlBase}/${fileName}`;
}

function resolveBookCredits(level, title) {
  const manifestEntry = razCoverMap.get(`${level}:${slugify(title)}`);
  return {
    writer: manifestEntry?.author ?? null,
    illustrator: manifestEntry?.illustrator ?? null,
    visuals: manifestEntry?.visuals ?? null,
  };
}

function copyResourceFile(relativePath, unitKey, level, title, fieldName) {
  if (!relativePath) return null;

  const sourcePath = path.isAbsolute(relativePath) ? relativePath : path.join(razResourceRoot, relativePath);
  if (!fs.existsSync(sourcePath)) return null;

  const bookSlug = slugify(title);
  const fileSlug = slugifyFileName(title);
  const extension = path.extname(sourcePath);
  const targetDir = path.join(webResourcePublicDir, unitKey, level.toLowerCase(), bookSlug);
  fs.mkdirSync(targetDir, { recursive: true });
  const targetName = `level-${level.toLowerCase()}-${fileSlug}-${fieldName}${extension}`;
  fs.copyFileSync(sourcePath, path.join(targetDir, targetName));
  return `${webResourceUrlBase}/${unitKey}/${level.toLowerCase()}/${bookSlug}/${targetName}`;
}

function resolveBookResources(unitKey, level, title) {
  const manifestEntry = razResourceMap.get(`${level}:${slugify(title)}`);
  if (!manifestEntry) return {};

  return {
    pdf: copyResourceFile(manifestEntry.book_pdf, unitKey, level, title, "book"),
    audio: copyResourceFile(manifestEntry.audio, unitKey, level, title, "audio"),
    video: copyResourceFile(manifestEntry.video, unitKey, level, title, "video"),
    lesson_plan: copyResourceFile(manifestEntry.lesson_plan_pdf, unitKey, level, title, "lesson-plan"),
    worksheet: copyResourceFile(manifestEntry.worksheet_pdf, unitKey, level, title, "worksheet"),
    discussion_card: copyResourceFile(manifestEntry.discussion_card, unitKey, level, title, "discussion-card"),
    comprehension_quiz: copyResourceFile(manifestEntry.comprehension_quiz, unitKey, level, title, "comprehension-quiz"),
  };
}

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkFiles(fullPath);
    return [fullPath];
  });
}

function resourceLevel(filePath) {
  const match = filePath.match(/\/RAZ (AA|A|B|C|D)\//);
  return match?.[1] ?? null;
}

function resourceKind(filePath) {
  const normalizedPath = filePath.toLowerCase();
  const extension = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath, extension).toLowerCase();

  if (extension === ".mp3") return "audio";
  if (extension === ".mp4") return "video";
  if (extension !== ".pdf") return null;
  if (normalizedPath.includes("绘本pdf") || normalizedPath.includes("级别pdf")) return "book_pdf";
  if (normalizedPath.includes("discussion-card") || /(^|[_-])dc($|[_-])/.test(name)) return "discussion_card";
  if (normalizedPath.includes("quiz") || /(^|[_-])(quiz|cq)($|[_-])/.test(name)) return "comprehension_quiz";
  if (normalizedPath.includes("worksheet") || normalizedPath.includes("练习") || name.includes("wksh")) return "worksheet_pdf";
  if (normalizedPath.includes("lesson plan") || normalizedPath.includes("教案") || /(^|[_-])lp($|[_-])/.test(name)) return "lesson_plan_pdf";
  return null;
}

function candidateKeys(filePath) {
  const extension = path.extname(filePath);
  const basename = path.basename(filePath, extension);
  const parent = path.basename(path.dirname(filePath));
  const grandparent = path.basename(path.dirname(path.dirname(filePath)));
  const parts = [basename, parent, grandparent]
    .map((part) => normalizeResourceText(part))
    .filter(Boolean);
  return [...new Set(parts)];
}

function getResourceScore(bookSlug, filePath) {
  const keys = candidateKeys(filePath);
  let best = 0;
  for (const key of keys) {
    if (key === bookSlug) best = Math.max(best, 100);
    else if (key.endsWith(`_${bookSlug}`) || key.startsWith(`${bookSlug}_`)) best = Math.max(best, 90);
    else if (key.includes(bookSlug)) best = Math.max(best, 80);
    else if (bookSlug.includes(key) && key.length >= 5) best = Math.max(best, 70);
  }
  return best;
}

function setBestResource(resources, level, title, kind, filePath) {
  const bookSlug = slugify(title);
  const key = `${level}:${bookSlug}`;
  const score = getResourceScore(bookSlug, filePath);
  if (score < 70) return;

  const current = resources.get(key) ?? {
    level,
    book: title,
    book_pdf: null,
    audio: null,
    video: null,
    lesson_plan_pdf: null,
    worksheet_pdf: null,
    discussion_card: null,
    comprehension_quiz: null,
  };
  const currentScore = current[`${kind}_score`] ?? 0;
  if (score > currentScore) {
    current[kind] = path.relative(razResourceRoot, filePath);
    current[`${kind}_score`] = score;
  }
  resources.set(key, current);
}

function collectRequiredBooks() {
  const books = new Map();
  for (const level of ["K1", "K2", "K3"]) {
    for (let unitNumber = 1; unitNumber <= 9; unitNumber += 1) {
      const lessonPlanPath = path.join(sourceRoot, `${level}_U${String(unitNumber).padStart(2, "0")}_Graded_Reading_Compact_Lesson_Plan.md`);
      const markdown = readFile(lessonPlanPath);
      const matches = [...markdown.matchAll(/^## (?:Core|Support) Book: Level ([A-Z]+) - (.+)$/gm)];
      for (const match of matches) {
        const bookLevel = match[1];
        const title = cleanInlineMarkdown(match[2]);
        books.set(`${bookLevel}:${slugify(title)}`, { level: bookLevel, title });
      }
    }
  }
  return [...books.values()];
}

function scanRazResources() {
  const requiredBooks = collectRequiredBooks();
  const resources = new Map();
  const searchRoots = ["RAZ AA", "RAZ A", "RAZ B", "RAZ C", "RAZ D"]
    .map((dir) => path.join(razResourceRoot, dir));
  const files = searchRoots.flatMap(walkFiles).filter((filePath) =>
    [".pdf", ".mp3", ".mp4"].includes(path.extname(filePath).toLowerCase()),
  );

  for (const filePath of files) {
    const level = resourceLevel(filePath);
    const kind = resourceKind(filePath);
    if (!level || !kind) continue;
    for (const book of requiredBooks.filter((entry) => entry.level === level)) {
      setBestResource(resources, book.level, book.title, kind, filePath);
    }
  }

  const manifest = {
    generated_at: new Date().toISOString(),
    source_root: razResourceRoot,
    resources: [...resources.values()].map((entry) => {
      const cleanEntry = { ...entry };
      for (const key of Object.keys(cleanEntry)) {
        if (key.endsWith("_score")) delete cleanEntry[key];
      }
      return cleanEntry;
    }).sort((a, b) => a.level.localeCompare(b.level) || a.book.localeCompare(b.book)),
  };
  fs.writeFileSync(resourceManifestOutputPath, `${JSON.stringify(manifest, null, 2)}\n`);

  return new Map(manifest.resources.map((entry) => [`${entry.level}:${slugify(entry.book)}`, entry]));
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

function parseMarkdownTable(section) {
  const lines = section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|") && !line.includes("---"));
  if (lines.length < 2) return [];

  const headers = lines[0].split("|").map((cell) => cleanInlineMarkdown(cell)).filter(Boolean);
  return lines.slice(1).map((line) => {
    const cells = line.split("|").map((cell) => cleanInlineMarkdown(cell)).filter(Boolean);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
  });
}

function parseBookSet(markdown) {
  const table = sectionBetween(markdown, "### Unit Book Set", /\n# Lesson\s+\d+:/);
  return parseMarkdownTable(table).map((row) => ({
    lesson: row.Lesson ?? row.Week ?? "",
    session: row.Session ?? null,
    lessonFocus: row["Lesson Focus"] ?? "",
    coreBook: row["Core Book"] ?? row.Primary ?? row["Primary Book"] ?? "",
    supportBook: row["Support Book"] ?? row.Support ?? null,
    targetLanguage: row["Target Language"] ?? null,
  }));
}

function parseSource(sourceBlock) {
  const source = {};
  for (const line of sourceBlock.split("\n")) {
    const match = line.match(/^-\s+\*\*(.+?):\*\*\s*(.+)$/);
    if (!match) continue;
    const key = match[1].toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
    source[key] = cleanInlineMarkdown(match[2]);
  }
  return source;
}

function parseActivities(section) {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\.\s+/.test(line))
    .map((line) => {
      const text = cleanInlineMarkdown(line.replace(/^\d+\.\s+/, ""));
      const [title, ...bodyParts] = text.split(":");
      return {
        title: title.trim(),
        description: bodyParts.join(":").trim(),
      };
    });
}

function parseRoutine(section) {
  return section
    .split("\n")
    .map((line) => cleanInlineMarkdown(line.replace(/^-\s+/, "")))
    .filter(Boolean);
}

function parseVocabulary(value) {
  return value
    .split(",")
    .map((item) => cleanInlineMarkdown(item))
    .filter(Boolean);
}

function parseBook(section, kind, unitKey) {
  const headingMatch = section.match(new RegExp(`## ${kind} Book: Level ([A-Z]+) - (.+)`));
  if (!headingMatch) throw new Error(`Missing ${kind} Book heading.`);
  const level = headingMatch[1];
  const title = cleanInlineMarkdown(headingMatch[2]);
  const sourceBlock = sectionBetween(section, "### Source", /\n### Language Pattern/);
  const languagePatternBlock = sectionBetween(section, "### Language Pattern", /\n### Story Context/);
  const sentenceFrame = extractHeadingBody(languagePatternBlock, "#### Sentence Frame");
  const keyVocabulary = extractHeadingBody(languagePatternBlock, "#### Key Vocabulary");
  const storyContext = sectionBetween(section, "### Story Context", /\n### Suggested Activities \/ Games/).replace(/\n+/g, " ");
  const activitiesBlock = sectionBetween(section, "### Suggested Activities / Games", /\n## |\n# /);

  return {
    level,
    title,
    coverImage: copyCoverImage(level, title),
    credits: resolveBookCredits(level, title),
    source: {
      ...parseSource(sourceBlock),
      ...resolveBookResources(unitKey, level, title),
    },
    sentenceFrame,
    vocabulary: parseVocabulary(keyVocabulary),
    storyContext: cleanInlineMarkdown(storyContext),
    activities: parseActivities(activitiesBlock),
  };
}

function parseLessons(markdown, unitKey) {
  const lessonMatches = [...markdown.matchAll(/^# Lesson\s+(\d+):\s+(.+)$/gm)];
  return lessonMatches.map((match, index) => {
    const start = match.index ?? 0;
    const next = lessonMatches[index + 1]?.index ?? markdown.length;
    const section = markdown.slice(start, next).trim();
    const supportStart = section.search(/\n## Support Book:/);
    const routineStart = section.search(/\n## Teacher Routine Language/);
    if (routineStart === -1) throw new Error(`Lesson ${match[1]} is missing Teacher Routine Language.`);

    const coreEnd = supportStart === -1 ? routineStart : supportStart;
    const coreSection = section.slice(0, coreEnd);
    const supportSection = supportStart === -1 ? "" : section.slice(supportStart, routineStart);
    const routineSection = sectionBetween(section, "## Teacher Routine Language", /\n# Lesson\s+\d+:/);
    const support = supportSection ? parseBook(supportSection, "Support", unitKey) : null;

    return {
      id: `lesson-${String(match[1]).padStart(2, "0")}`,
      lessonNumber: Number(match[1]),
      title: cleanInlineMarkdown(match[2]),
      books: {
        core: parseBook(coreSection, "Core", unitKey),
        support,
      },
      teacherRoutineLanguage: parseRoutine(routineSection),
    };
  });
}

function buildUnit(level, unitNumber) {
  const unitKey = `${level.toLowerCase()}-u${String(unitNumber).padStart(2, "0")}`;
  const lessonPlanPath = path.join(sourceRoot, `${level}_U${String(unitNumber).padStart(2, "0")}_Graded_Reading_Compact_Lesson_Plan.md`);
  const markdown = readFile(lessonPlanPath);
  const overviewMarkdown = sectionBetween(markdown, "## Course Overview", /\n# Lesson\s+1:/);
  const lessons = parseLessons(markdown, unitKey);
  const expectedLessons = level === "K1" ? 4 : 8;

  if (lessons.length !== expectedLessons) {
    throw new Error(`Expected ${expectedLessons} ${level} Unit ${unitNumber} graded reading lessons, found ${lessons.length}`);
  }

  return {
    unitId: `${level.toLowerCase()}-graded-reading-unit-${String(unitNumber).padStart(2, "0")}`,
    level,
    courseType: "non-language",
    track: "graded-reading",
    courseCode: "B",
    unitNumber,
    title: resolveUnitTitle(level, unitNumber),
    displayTitle: `${level} Unit ${String(unitNumber).padStart(2, "0")}: Graded Reading`,
    status: "working-test-unit",
    sourceRoot,
    sourceMarkdownPath: lessonPlanPath,
    sourceMarkdown: markdown,
    overview: {
      courseType: extractHeadingBody(overviewMarkdown, "### Course Type"),
      coursePurpose: extractHeadingBody(overviewMarkdown, "### Course Purpose"),
      relationshipToPowerUp: extractHeadingBody(overviewMarkdown, "### Relationship to PowerUp"),
      bookSet: parseBookSet(markdown),
    },
    lessons,
  };
}

fs.rmSync(webResourcePublicDir, { recursive: true, force: true });

const units = ["K1", "K2", "K3"].flatMap((level) =>
  Array.from({ length: 9 }, (_, index) => buildUnit(level, index + 1)),
);

const generated = `// Generated from K1/K2/K3 graded reading compact lesson plan markdown.
// Do not edit lesson wording here; regenerate from source markdown instead.

export const kGradedReadingUnits = ${JSON.stringify(units, null, 2)} as const;

export type KGradedReadingUnit = typeof kGradedReadingUnits[number];
export type KGradedReadingLesson = KGradedReadingUnit["lessons"][number];
export type KGradedReadingBook = KGradedReadingLesson["books"]["core"] | NonNullable<KGradedReadingLesson["books"]["support"]>;

export function getKGradedReadingUnit(level: string, unitNumber: number): KGradedReadingUnit | undefined {
  return kGradedReadingUnits.find(
    (unit) => unit.level.toLowerCase() === level.toLowerCase() && unit.unitNumber === unitNumber,
  );
}
`;

fs.writeFileSync(outputPath, generated);

console.log("Synced K1/K2/K3 Graded Reading units from markdown.");
for (const level of ["K1", "K2", "K3"]) {
  const levelUnits = units.filter((unit) => unit.level === level);
  console.log(`${level}: ${levelUnits.length} units, ${levelUnits.reduce((total, unit) => total + unit.lessons.length, 0)} lessons`);
}
console.log(`Generated: ${outputPath}`);
