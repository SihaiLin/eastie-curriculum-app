import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, "").split("=");
    return [key, value.join("=")];
  }),
);

const level = (args.level ?? "k2").toLowerCase();
const unitNumber = Number(args.unit ?? 1);
const sourceRoot = args["source-root"] ?? "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs";
const output = args.output ?? "src/curriculum/generated/kArtUnits.ts";
const levelRoot = path.join(sourceRoot, level);
const unitPrefix = unitNumber === 0 ? "unit_hello" : `unit_${String(unitNumber).padStart(2, "0")}_`;
const unitDirName = fs.readdirSync(levelRoot).find((name) => name === unitPrefix || name.startsWith(unitPrefix));

if (!unitDirName) throw new Error(`No Art source directory found for ${level.toUpperCase()} Unit ${unitNumber}`);

const unitDirectory = path.join(levelRoot, unitDirName);
const overviewPath = path.join(unitDirectory, "00_overview.md");
const lessonPaths = fs.readdirSync(unitDirectory)
  .filter((name) => /^\d{2}_lesson_\d+\.md$/.test(name))
  .sort()
  .map((name) => path.join(unitDirectory, name));

const overviewMarkdown = fs.readFileSync(overviewPath, "utf8");
const overviewDocument = parseDocument(overviewMarkdown, "en");
const lessons = lessonPaths.map((lessonPath) => parseLessonFile(lessonPath, "en"));
const zhDirectory = path.join(unitDirectory, "02_translations", "zh_cn");
const zhTranslation = fs.existsSync(zhDirectory) ? buildChineseTranslation(zhDirectory, lessons) : undefined;
const unitTheme = subsectionText(overviewDocument.sections, "Unit Identity", "Unit Theme") || titleTheme(overviewDocument.title);

const artUnit = {
  unitId: `${level}-art-unit-${String(unitNumber).padStart(2, "0")}`,
  level: level.toUpperCase(),
  courseType: "non-language",
  track: "art",
  courseCode: "C",
  unitNumber,
  title: unitTheme,
  displayTitle: overviewDocument.title,
  status: "working-test-unit",
  sourceDirectory: unitDirectory,
  sourceMarkdownPath: overviewPath,
  sourceMarkdown: overviewMarkdown,
  overview: overviewDocument.sections,
  lessons,
  ...(zhTranslation ? { translations: { zh: zhTranslation } } : {}),
};

const targetPath = path.resolve(output);
let units = [];
if (fs.existsSync(targetPath)) {
  const existing = fs.readFileSync(targetPath, "utf8");
  const match = existing.match(/export const kArtUnits = (\[[\s\S]*?\]) as const;/);
  if (match) units = JSON.parse(match[1]);
}
units = units.filter((entry) => !(entry.level === artUnit.level && entry.unitNumber === artUnit.unitNumber));
units.push(artUnit);
units.sort((a, b) => a.level.localeCompare(b.level) || a.unitNumber - b.unitNumber);

const generated = `// Generated from locked K1/K2/K3 Art markdown.\n// Do not edit curriculum wording here; regenerate from source markdown instead.\n\nexport type ArtContentBlock =\n  | { type: "paragraph"; text: string }\n  | { type: "list"; items: readonly string[] };\n\nexport type ArtContentSubsection = {\n  key: string;\n  title: string;\n  blocks: readonly ArtContentBlock[];\n};\n\nexport type ArtContentSection = {\n  key: string;\n  title: string;\n  blocks: readonly ArtContentBlock[];\n  subsections: readonly ArtContentSubsection[];\n};\n\nexport type KArtLesson = {\n  id: string;\n  lessonNumber: number;\n  title: string;\n  sourceMarkdownPath: string;\n  sourceMarkdown: string;\n  sections: readonly ArtContentSection[];\n};\n\nexport type KArtTranslation = {\n  title: string;\n  displayTitle: string;\n  sourceMarkdownPath: string;\n  sourceMarkdown: string;\n  overview: readonly ArtContentSection[];\n  lessons: readonly KArtLesson[];\n};\n\nexport type KArtUnit = {\n  unitId: string;\n  level: string;\n  courseType: "non-language";\n  track: "art";\n  courseCode: "C";\n  unitNumber: number;\n  title: string;\n  displayTitle: string;\n  status: string;\n  sourceDirectory: string;\n  sourceMarkdownPath: string;\n  sourceMarkdown: string;\n  overview: readonly ArtContentSection[];\n  lessons: readonly KArtLesson[];\n  translations?: { zh: KArtTranslation };\n};\n\nexport const kArtUnits = ${JSON.stringify(units, null, 2)} as const;\n\nexport function getKArtUnit(level: string, unitNumber: number): KArtUnit | undefined {\n  return kArtUnits.find(\n    (unit) => unit.level.toLowerCase() === level.toLowerCase() && unit.unitNumber === unitNumber,\n  ) as KArtUnit | undefined;\n}\n`;

fs.mkdirSync(path.dirname(targetPath), { recursive: true });
fs.writeFileSync(targetPath, generated);
console.log(`Synced ${artUnit.level} Art Unit ${unitNumber}: ${lessons.length} lessons${zhTranslation ? " + zh-CN" : ""} -> ${targetPath}`);

function parseLessonFile(lessonPath, locale, canonicalLesson) {
  const markdown = fs.readFileSync(lessonPath, "utf8");
  const document = parseDocument(markdown, locale);
  const parsedTitle = parseLessonTitle(document.title, lessonPath);
  return {
    id: canonicalLesson?.id ?? `lesson-${String(parsedTitle.lessonNumber).padStart(2, "0")}`,
    lessonNumber: canonicalLesson?.lessonNumber ?? parsedTitle.lessonNumber,
    title: parsedTitle.title,
    sourceMarkdownPath: lessonPath,
    sourceMarkdown: markdown,
    sections: document.sections,
  };
}

function buildChineseTranslation(translationDirectory, englishLessons) {
  const overviewTranslationPath = path.join(translationDirectory, "00_overview_zh_cn.md");
  if (!fs.existsSync(overviewTranslationPath)) return undefined;
  const sourceMarkdown = fs.readFileSync(overviewTranslationPath, "utf8");
  const document = parseDocument(sourceMarkdown, "zh");
  const translatedLessons = englishLessons.map((englishLesson) => {
    const lessonPath = path.join(
      translationDirectory,
      `${String(englishLesson.lessonNumber).padStart(2, "0")}_lesson_${englishLesson.lessonNumber}_zh_cn.md`,
    );
    if (!fs.existsSync(lessonPath)) throw new Error(`Missing accepted Art Chinese lesson mirror: ${lessonPath}`);
    return parseLessonFile(lessonPath, "zh", englishLesson);
  });
  return {
    title: subsectionText(document.sections, "Unit Identity", "Unit Theme") || document.title,
    displayTitle: document.title,
    sourceMarkdownPath: overviewTranslationPath,
    sourceMarkdown,
    overview: document.sections,
    lessons: translatedLessons,
  };
}

function parseDocument(markdown, locale) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const rawTitle = lines.find((line) => line.startsWith("# "))?.slice(2).trim() ?? "Untitled Art Unit";
  const title = parseLocalizedHeading(rawTitle, locale).title;
  const sections = [];
  let section;
  let subsection;
  let buffer = [];

  const flush = () => {
    if (!buffer.length) return;
    const blocks = parseBlocks(buffer);
    if (subsection) subsection.blocks.push(...blocks);
    else if (section) section.blocks.push(...blocks);
    buffer = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      const heading = parseLocalizedHeading(line.slice(3).trim(), locale);
      section = { key: heading.key, title: heading.title, blocks: [], subsections: [] };
      sections.push(section);
      subsection = undefined;
    } else if (line.startsWith("### ")) {
      flush();
      if (!section) continue;
      const heading = parseLocalizedHeading(line.slice(4).trim(), locale);
      subsection = { key: heading.key, title: heading.title, blocks: [] };
      section.subsections.push(subsection);
    } else if (!line.startsWith("# ")) {
      buffer.push(line);
    }
  }
  flush();
  return { title, sections };
}

function parseBlocks(lines) {
  const blocks = [];
  let paragraph = [];
  let list = [];
  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) blocks.push({ type: "list", items: list });
    list = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line === "---") {
      flushParagraph();
      flushList();
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2).trim());
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushParagraph();
  flushList();
  return blocks;
}

function parseLocalizedHeading(rawHeading, locale) {
  const [canonical, localized] = rawHeading.split("｜").map((part) => part.trim());
  return { key: canonical, title: locale === "zh" && localized ? localized : canonical };
}

function parseLessonTitle(title, sourcePath) {
  const match = title.match(/^Lesson\s+(\d+)\s*:\s*(.+)$/i) ?? title.match(/^第\s*(\d+)\s*课[：:]\s*(.+)$/);
  if (!match) throw new Error(`Unexpected Art lesson title in ${sourcePath}: ${title}`);
  return { lessonNumber: Number(match[1]), title: match[2].trim() };
}

function subsectionText(sections, sectionKey, subsectionKey) {
  const subsection = sections.find((entry) => entry.key === sectionKey)?.subsections.find((entry) => entry.key === subsectionKey);
  return subsection?.blocks.find((block) => block.type === "paragraph")?.text ?? "";
}

function titleTheme(title) {
  return title.replace(/^K[123]\s+Art\s+Unit\s+\d+\s*:\s*/i, "").trim();
}
