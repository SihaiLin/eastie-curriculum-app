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
const unit = getArg("--unit") ?? "08";
const sourceRoot = getArg("--source-root");
const unitNameArg = getArg("--unit-name");
const onlyCourseArg = getArg("--only-course") ?? getArg("--course");
const onlyCourseSlugArg = getArg("--course-slug");

if (!sourceRoot || !fs.existsSync(sourceRoot)) {
  console.error("Usage: node scripts/sync-non-language-unit.mjs --level pg|pk|k1 --unit 08 --source-root <path> [--unit-name 'Unit Name'] [--only-course d --course-slug self_care]");
  console.error(`Provided source-root: ${sourceRoot}`);
  process.exit(1);
}

const LEVEL = level.toUpperCase();
const UNIT = unit.padStart(2, "0");
const expectedLessonCount = UNIT === "00" ? 1 : 4;
const prefix = `${level.toLowerCase()}Unit${UNIT}`;
const exportPrefix = `${level.toLowerCase()}NonLanguageUnit${UNIT}`;
const dataVar = `${prefix}NonLanguage`;
const onlyCourses = onlyCourseArg
  ? onlyCourseArg.split(",").map((course) => course.trim().toUpperCase()).filter(Boolean)
  : [];
const onlyCourse = onlyCourses[0];
const onlyCourseSlugs = onlyCourseSlugArg
  ? onlyCourseSlugArg.split(",").map((slug) => slug.trim().toLowerCase()).filter(Boolean)
  : [];

const zhDir = path.join(sourceRoot, "02_translations/zh_cn");
const outputPath = path.join(webRoot, `src/curriculum/generated/${prefix}Markdown.ts`);
const dataOutputPath = path.join(webRoot, `src/curriculum/generated/${prefix}NonLanguageUnit${UNIT}.ts`);

function existsOrThrow(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing file: ${filePath}`);
  return filePath;
}

function readFile(filePath) {
  return fs.readFileSync(existsOrThrow(filePath), "utf8");
}

function enzh(filePath) {
  return { en: readFile(filePath) };
}

function enzhPair(enPath, zhPath) {
  return { en: readFile(enPath), zh: readFile(zhPath) };
}

function stripInlineMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*+/g, "")
    .trim();
}

function extractValue(text, key) {
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(key)) {
      const values = [];
      for (let j = i + 1; j < lines.length; j++) {
        const trimmed = lines[j].trim();
        if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("---")) break;
        values.push(trimmed);
      }
      return values.join(" ").trim();
    }
  }
  return "";
}

function extractSections(text) {
  const lines = text.split(/\r?\n/);
  const sections = [];
  let current = null;
  for (const line of lines) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      if (current) sections.push(current);
      current = { title: match[1].trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

function extractSubsections(text) {
  const lines = text.split(/\r?\n/);
  const sections = [];
  let current = null;
  for (const line of lines) {
    const match = line.match(/^###\s+(.+?)\s*$/);
    if (match) {
      if (current) sections.push(current);
      current = { title: match[1].trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push(current);
  return sections;
}

function extractCodeBlocks(text) {
  const blocks = [];
  let inCode = false;
  let code = [];
  for (const line of text.split(/\r?\n/)) {
    if (line.trim().startsWith("```")) {
      if (inCode) {
        blocks.push(code.join("\n"));
        code = [];
      }
      inCode = !inCode;
      continue;
    }
    if (inCode) code.push(line);
  }
  if (code.length) blocks.push(code.join("\n"));
  return blocks;
}

function splitLanguageItems(text) {
  return text
    .split(/｜|\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function extractLessonOutcomeSummary(sectionText) {
  const subs = extractSubsections(sectionText);
  if (subs.length) {
    return subs
      .map((sub) => {
        const body = sub.body
          .map((line) => line.trim())
          .filter((line) => line && !line.startsWith("---"))[0] ?? "";
        return body ? `${stripInlineMarkdown(sub.title)}: ${stripInlineMarkdown(body)}` : "";
      })
      .filter(Boolean)
      .join(" ");
  }

  return sectionText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("---"))[0] ?? "";
}

function extractActivitySeeds(sectionText) {
  const lines = sectionText.split(/\r?\n/);
  const items = [];
  for (const line of lines) {
    const match = line.match(/^###\s+\d+\.\s+(.+)/);
    if (match) items.push(stripInlineMarkdown(match[1]));
  }
  return items;
}

function chineseLessonNumberToNumber(value) {
  const normalized = String(value).trim();
  if (/^\d+$/.test(normalized)) return Number(normalized);
  const map = {
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    十: 10,
  };
  if (normalized === "十") return 10;
  if (normalized.startsWith("十")) return 10 + (map[normalized.slice(1)] ?? 0);
  if (normalized.endsWith("十")) return (map[normalized[0]] ?? 1) * 10;
  if (normalized.includes("十")) {
    const [tens, ones] = normalized.split("十");
    return (map[tens] ?? 1) * 10 + (map[ones] ?? 0);
  }
  return map[normalized] ?? 0;
}

function parseLessonBlock(text) {
  const sections = extractSections(text);
  const outcomeSection = sections.find((s) => /lesson outcome|课程目标/i.test(s.title));
  const languageSection = sections.find((s) => /light theme language|轻量主题语言/i.test(s.title));
  const activitiesSection = sections.find((s) => /suggested activit|建议活动|suggested game/i.test(s.title));

  const outcome = outcomeSection
    ? extractLessonOutcomeSummary(outcomeSection.body.join("\n"))
    : "";

  const codeBlocks = languageSection ? extractCodeBlocks(languageSection.body.join("\n")) : [];
  const languageFocus = codeBlocks.length
    ? splitLanguageItems(codeBlocks[0])
    : [];

  const activitySeeds = activitiesSection
    ? extractActivitySeeds(activitiesSection.body.join("\n"))
    : [];

  return { outcome, languageFocus, activitySeeds };
}

function parseLessonBlockZh(text) {
  return parseLessonBlock(text);
}

function parseCourseTrack(enText, zhText, courseCode) {
  const enTitle = extractCourseTitle(enText, courseCode, "en");
  const zhTitle = extractCourseTitle(zhText, courseCode, "zh");

  const enSections = extractSections(enText);
  const zhSections = extractSections(zhText);
  const overviewEn = enSections.find((s) => /course overview|课程概览/i.test(s.title));
  const overviewZh = zhSections.find((s) => /course overview|课程概览/i.test(s.title));

  const enPurpose = overviewEn ? extractValue(overviewEn.body.join("\n"), "Course Purpose") || extractValue(overviewEn.body.join("\n"), "课程目的") : "";
  const zhPurpose = overviewZh ? extractValue(overviewZh.body.join("\n"), "课程目的") || extractValue(overviewZh.body.join("\n"), "Course Purpose") : "";

  const enLessonPattern = /^#\s*Lesson\s+(\d+)[:：]?\s*(.+)$/im;
  const zhLessonPattern = /^#\s*(?:Lesson\s+\d+.*?｜\s*)?第\s*([一二三四五六七八九十\d]+)\s*课[:：]?\s*(.+)$/im;

  const enLessons = [];
  const enParts = enText.split(/\r?\n(?=# Lesson\s+\d+)/);
  const zhParts = zhText.split(/\r?\n(?=#\s*(?:Lesson\s+\d+.*?｜\s*)?第\s*[一二三四五六七八九十\d]+\s*课)/);

  for (let i = 1; i < enParts.length; i++) {
    const enPart = enParts[i];
    const enMatch = enPart.match(enLessonPattern);
    const zhPart = zhParts[i] ?? "";
    const zhMatch = zhPart.match(zhLessonPattern);

    if (!enMatch) continue;

    const lessonNum = Number(enMatch[1]);
    const enTitle = stripInlineMarkdown(enMatch[2]);
    const zhTitle = zhMatch ? stripInlineMarkdown(zhMatch[2]) : "";

    const parsedEn = parseLessonBlock(enPart);

    enLessons.push({
      number: lessonNum,
      week: Math.ceil(lessonNum / 1),
      title: { en: enTitle, zh: zhTitle },
      outcome: { en: parsedEn.outcome, zh: "" },
      languageFocus: parsedEn.languageFocus,
      activitySeeds: parsedEn.activitySeeds,
    });
  }

  const weekMap = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
  enLessons.forEach((lesson, i) => {
    lesson.week = weekMap[i] ?? 4;
    const zhPart = zhParts[i + 1] ?? "";
    const zhParse = i < zhParts.length - 1 ? parseLessonBlockZh(zhPart) : { outcome: "", languageFocus: [], activitySeeds: [] };
    const zhMatch = zhPart.match(zhLessonPattern);
    const zhNumber = zhMatch ? chineseLessonNumberToNumber(zhMatch[1]) : 0;
    lesson.outcome.zh = zhParse.outcome;
    lesson.languageFocusZh = zhNumber === lesson.number ? zhParse.languageFocus : [];
    lesson.activitySeedsZh = zhNumber === lesson.number ? zhParse.activitySeeds : [];
  });

  return {
    code: courseCode,
    title: {
      en: enTitle,
      zh: zhTitle,
    },
    purpose: { en: enPurpose, zh: zhPurpose },
    lessons: enLessons,
  };
}

function extractCourseTitle(markdown, courseCode, language) {
  const escapedCode = courseCode.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const zhCourseLabels = {
    A: ["A", "一"],
    B: ["B", "二"],
    C1: ["C1", "三", "C一"],
    C2: ["C2", "四", "C二"],
    D: ["D", "五"],
    E: ["E", "六"],
    F: ["F", "七"],
    G: ["G", "八"],
  };
  const zhLabelPattern = (zhCourseLabels[courseCode] ?? [courseCode])
    .map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const courseHeading = language === "zh"
    ? new RegExp(`^#\\s*(?:.*?[—–-]\\s*)?课程\\s*(?:${zhLabelPattern})\\s*[:：]\\s*(.+)$`, "im")
    : new RegExp(`^#\\s*(?:.*?[—–-]\\s*)?Course\\s*${escapedCode}\\s*[:：]\\s*(.+)$`, "im");
  const headingMatch = markdown.match(courseHeading);
  if (headingMatch?.[1]) return stripInlineMarkdown(headingMatch[1]);

  const courseOverview = extractSections(markdown)
    .find((section) => /course overview|课程概览/i.test(section.title));
  const courseTypeSection = extractSubsections(courseOverview?.body.join("\n") ?? markdown)
    .find((section) => /course type|课程类型/i.test(section.title));
  const courseTypeText = courseTypeSection?.body.join("\n") ?? "";
  const typeMatch = courseTypeText.match(new RegExp(`${escapedCode}\\s*[.．]\\s*(.+)`, "i"));
  if (typeMatch?.[1]) return stripInlineMarkdown(typeMatch[1]);
  const firstCourseTypeLine = courseTypeText
    .split(/\r?\n/)
    .map((line) => stripInlineMarkdown(line))
    .find((line) => line && !line.startsWith("---"));
  if (firstCourseTypeLine) return firstCourseTypeLine;

  return "";
}

function extractLanguageSections(markdown) {
  const sections = extractSections(markdown);
  const unitLangSection = sections.find((s) => /unit language|单元语言/i.test(s.title));
  if (!unitLangSection) return [];

  const subs = extractSubsections(unitLangSection.body.join("\n"));
  return subs.map((sub) => {
    const items = extractCodeBlocks(sub.body.join("\n")).join("\n")
      .split(/｜|\r?\n/).map(s => s.trim()).filter(Boolean);
    return {
      id: sub.title.toLowerCase().replace(/[\s/]+/g, "-"),
      title: { en: sub.title, zh: sub.title },
      variant: /optional/i.test(sub.title) ? "optional" : /core/i.test(sub.title) ? "core" : "support",
      items,
    };
  });
}

function extractWeeklySubthemes(markdown) {
  const sections = extractSections(markdown);
  const weeklySection = sections.find((s) => /weekly subtheme|每周子主题/i.test(s.title));
  if (!weeklySection) return [];

  const subs = extractSubsections(weeklySection.body.join("\n"));
  return subs.map((sub, idx) => ({
    week: idx + 1,
    title: { en: sub.title, zh: sub.title },
    summary: { en: sub.body.join(" ").trim(), zh: "" },
  }));
}

function extractOverviewText(markdown) {
  const sections = extractSections(markdown);
  const overviewSection = sections.find((s) => /theme overview|主题概览/i.test(s.title));
  if (!overviewSection) return "";
  const body = overviewSection.body.join("\n").trim();
  return body.replace(/^---+\s*/gm, "").trim();
}

function extractUnitTitle(markdown) {
  const firstLine = markdown.split(/\r?\n/)[0]?.trim() ?? "";
  return firstLine.replace(/^#\s*/, "").replace(/[—–-]+\s*Non-Language Course Common Info.*$/i, "").replace(/[—–-]+\s*非语言课程通用信息.*$/i, "").trim();
}

function buildOverviewSections(enText, zhText) {
  const enSections = extractSections(enText);
  const zhSections = extractSections(zhText);
  const findZhBody = (enTitle) => {
    const zh = zhSections.find((s) => s.title.includes(enTitle.replace(/\d+\.\s*/, "").substring(0, 8)));
    return zh ? zh.body.join("\n").trim() : "";
  };

  const result = [];
  const sectionMap = [
    { id: "week-subthemes", enTitle: "Weekly Subthemes", zhTitle: "每周子主题" },
    { id: "teacher-input-pool", enTitle: "Teacher Input Pool", zhTitle: "教师输入资源库" },
    { id: "theme-songs-chants", enTitle: "Theme Songs / Chants", zhTitle: "主题歌曲与韵律" },
    { id: "spaces-and-materials", enTitle: "Spaces and Materials", zhTitle: "空间与材料" },
    { id: "boundaries-and-observation", enTitle: "Boundary Notes", zhTitle: "边界说明" },
  ];

  for (const spec of sectionMap) {
    const enSection = enSections.find((s) => {
      const title = s.title.toLowerCase();
      if (spec.id === "theme-songs-chants") {
        return /theme songs|songs\s*\/\s*chants|歌曲|韵律/i.test(s.title);
      }
      if (spec.id === "spaces-and-materials") {
        return /spaces and materials|resource opportunities|资源|空间|材料/i.test(s.title);
      }
      return new RegExp(spec.enTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(s.title);
    });
    if (!enSection) continue;
    const zhBody = findZhBody(enSection.title);
    const body = enSection.body.join("\n").trim();
    result.push({ id: spec.id, title: { en: spec.enTitle, zh: spec.zhTitle }, body, zhBody });
  }

  return result;
}

function extractSongNames(markdown) {
  const names = [];
  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("---") && !trimmed.startsWith("```") && !trimmed.startsWith(":") && !trimmed.startsWith("/") && !trimmed.includes("Songs are used") && !trimmed.includes("歌曲用于") && trimmed.length > 3) {
      const firstWord = trimmed.split(/[「(]/)[0].trim();
      if (/^[A-Z]/.test(firstWord) && firstWord.length > 3) {
        names.push(firstWord);
      }
    }
  }
  return [...new Set(names)].filter(n => !n.includes(":") && !n.includes("。"));
}

const levelUpper = LEVEL;

console.log(`Syncing ${levelUpper} Non-Language Unit ${UNIT}...`);

const commonInfoDir = fs.existsSync(path.join(sourceRoot, "00_common_info"))
  ? path.join(sourceRoot, "00_common_info")
  : path.join(sourceRoot, "00_unit_overview");
if (!fs.existsSync(commonInfoDir)) throw new Error(`Missing common info directory: ${commonInfoDir}`);
const commonInfoFiles = fs.readdirSync(commonInfoDir).filter(f => f.endsWith(".md") && !f.includes("zh_cn"));
if (!commonInfoFiles.length && !onlyCourses.length) throw new Error(`No English markdown found in ${commonInfoDir}`);
const commonInfoEnPath = commonInfoFiles.length ? path.join(commonInfoDir, commonInfoFiles[0]) : null;
const commonInfoZhDir = path.basename(commonInfoDir);
const commonInfoZhPath = commonInfoFiles.length
  ? path.join(zhDir, commonInfoZhDir, commonInfoFiles[0].replace(".md", "_zh_cn.md"))
  : null;

const enCommon = commonInfoEnPath
  ? readFile(commonInfoEnPath)
  : `# ${LEVEL} Unit ${Number(UNIT)} Non-Language Course ${onlyCourses.join(", ")}\n\n## Theme Overview\n\n${unitNameArg ?? `${LEVEL} Unit ${Number(UNIT)}`}\n`;
const zhCommon = commonInfoZhPath && fs.existsSync(commonInfoZhPath) ? readFile(commonInfoZhPath) : "";

const unitTitle = unitNameArg || extractUnitTitle(enCommon);
const unitTitleZh = zhCommon.trim() ? extractUnitTitle(zhCommon) : unitTitle;
const themeSlug = unitTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const courseDir = path.join(sourceRoot, "01_course_tracks");
const allCourseFiles = fs.readdirSync(courseDir).filter(f => f.endsWith(".md") && !f.includes("zh")).sort();
const zhCourseDir = path.join(zhDir, "01_course_tracks");

const allCourseCodes = ["A", "B", "C1", "C2", "D", "E", "F", "G"];
const courseCodes = onlyCourses.length ? onlyCourses : allCourseCodes;
const courseFiles = onlyCourses.length
  ? onlyCourses.map((course, index) => {
      const requiredSlug = onlyCourseSlugs[index] ?? "";
      return allCourseFiles.find((file) => {
        const normalized = file.toLowerCase();
        const lowerCode = course.toLowerCase();
        const codeMatches = normalized.includes(`_course_${lowerCode}_`);
        const slugMatches = Boolean(requiredSlug && normalized.includes(requiredSlug));
        return (codeMatches || slugMatches) &&
          (!requiredSlug || slugMatches);
      });
    }).filter(Boolean)
  : allCourseFiles;

if (onlyCourses.length && courseFiles.length !== onlyCourses.length) {
  throw new Error(`Expected ${onlyCourses.length} course files (${onlyCourses.join(", ")}), found ${courseFiles.length} in ${courseDir}`);
}

const markdownPairs = [];
const courseData = [];

const commonInfoVar = `${prefix}CommonInfoMarkdown`;
if (commonInfoEnPath) {
  markdownPairs.push([commonInfoVar, commonInfoEnPath, commonInfoZhPath]);
}

for (let i = 0; i < courseCodes.length; i++) {
  const code = courseCodes[i];
  const courseFile = courseFiles[i];
  if (!courseFile) {
    console.warn(`Warning: No course file found for index ${i} (expected ~course ${code})`);
    continue;
  }
  const enCoursePath = path.join(courseDir, courseFile);
  const zhCourseFile = courseFile.replace(".md", "_zh_cn.md");
  const zhCoursePath = path.join(zhCourseDir, zhCourseFile);

  const enText = readFile(enCoursePath);
  const zhText = fs.existsSync(zhCoursePath) ? readFile(zhCoursePath) : "";

  const exportName = `${prefix}Course${code}Markdown`;
  markdownPairs.push([exportName, enCoursePath, zhCoursePath]);

  const parsed = parseCourseTrack(enText, zhText, code);
  courseData.push(parsed);
}

const languageSections = extractLanguageSections(enCommon);
const weeklySubthemes = extractWeeklySubthemes(enCommon);
const overviewText = extractOverviewText(enCommon);
const overviewSections = buildOverviewSections(enCommon, zhCommon);

const songNames = extractSongNames(extractSections(enCommon).find(s => /theme songs|主题歌曲/i.test(s.title))?.body.join("\n") ?? "");

const hasTeacherInput = overviewSections.find(s => s.id === "teacher-input-pool");
const hasSongs = overviewSections.find(s => s.id === "theme-songs-chants");
const hasResources = overviewSections.find(s => s.id === "spaces-and-materials");
const hasBoundaries = overviewSections.find(s => s.id === "boundaries-and-observation");

const generatedMarkdownExports = [
  "// Generated from " + levelUpper + " Non-Language Unit " + UNIT + " markdown source files.",
  "// Do not edit curriculum wording here; regenerate from the source markdown instead.",
  "",
  'import type { LocalizedText } from "../types";',
  "",
];
const validationIssues = [];

for (const course of courseData) {
  if (!course.title.en) {
    validationIssues.push(`Course ${course.code}: missing English course title`);
  }
  if (course.title.en === unitTitle) {
    validationIssues.push(`Course ${course.code}: course title incorrectly matches unit title`);
  }
  if (new RegExp(`^course\\s+${course.code}$`, "i").test(course.title.en.trim())) {
    validationIssues.push(`Course ${course.code}: course title contains only the course code`);
  }
}

for (const [exportName, enPath, zhPath] of markdownPairs) {
  const en = readFile(enPath);
  const zh = fs.existsSync(zhPath) ? readFile(zhPath) : "";
  validationIssues.push(...validateLessonHeadings(exportName, en, zh, expectedLessonCount));
  generatedMarkdownExports.push(`export const ${exportName}: LocalizedText = ${JSON.stringify({ en, zh }, null, 2)};`);
}

if (!commonInfoEnPath) {
  generatedMarkdownExports.push(`export const ${commonInfoVar}: LocalizedText = ${JSON.stringify({ en: enCommon, zh: zhCommon }, null, 2)};`);
}

if (validationIssues.length > 0) {
  throw new Error(`${levelUpper} Unit ${UNIT} markdown validation failed:\n- ${validationIssues.join("\n- ")}`);
}

const courseImports = courseData.map((course) => {
  const code = course.code;
  return `import { ${prefix}Course${code}Markdown } from "./${prefix}Markdown";`;
}).join("\n");

const courseEntries = courseData.map((cd, i) => {
  const markdownVar = `${prefix}Course${cd.code}Markdown`;
  return `  {
    code: "${cd.code}",
    title: { en: ${JSON.stringify(cd.title.en)}, zh: ${JSON.stringify(cd.title.zh)} },
    purpose: { en: ${JSON.stringify(cd.purpose.en)}, zh: ${JSON.stringify(cd.purpose.zh)} },
    sourceMarkdown: ${markdownVar},
    lessons: ${JSON.stringify(cd.lessons.map(l => ({
      ...l,
      title: l.title,
      outcome: l.outcome,
      languageFocus: l.languageFocus,
      activitySeeds: l.activitySeeds,
    })), null, 4).split("\n").map((line, idx) => idx === 0 ? line : "    " + line).join("\n")},
  }`;
}).join(",\n");

const overviewSectionsJson = overviewSections.map(os => {
  const body = os.body || "";
  const zhBody = os.zhBody || "";
  let groups = [];
  if (os.id === "teacher-input-pool") {
    const subs = extractSubsections(body);
    groups = subs.map(sub => ({
      title: { en: sub.title, zh: sub.title },
      items: sub.body.join(" ").trim().split(/\n/).map(l => l.trim()).filter(Boolean),
    }));
  } else if (os.id === "theme-songs-chants") {
    groups = [{ title: { en: "Song Bank", zh: "歌曲库" }, items: songNames }];
  } else if (os.id === "spaces-and-materials") {
    const subs = extractSubsections(body);
    groups = subs.map(sub => ({
      title: { en: sub.title, zh: sub.title },
      items: sub.body.join(" ").trim().split(/\n/).map(l => l.trim()).filter(Boolean),
    }));
  } else if (os.id === "boundaries-and-observation") {
    const obsSection = extractSections(enCommon).find(s => /observation|观察/i.test(s.title));
    const boundarySection = extractSections(enCommon).find(s => /boundary|边界/i.test(s.title));
    groups = [];
    if (boundarySection) {
      groups.push({
        title: { en: "Boundary Notes", zh: "边界说明" },
        items: boundarySection.body.join("\n").trim().split(/\r?\n/).map(l => l.replace(/^- /, "").trim()).filter(Boolean),
      });
    }
    if (obsSection) {
      groups.push({
        title: { en: "Unit-Level Observation Focus", zh: "单元层面观察重点" },
        items: obsSection.body.join("\n").trim().split(/\r?\n/).map(l => l.replace(/^- /, "").trim()).filter(Boolean),
      });
    }
  }

  return {
    id: os.id,
    title: os.title,
    body: body ? { en: body, zh: zhBody || "" } : undefined,
    groups: groups.map(g => ({
      title: g.title,
      items: g.items,
    })),
  };
});

const dataContent = `// Generated from ${levelUpper} Non-Language Unit ${UNIT} markdown source files.
// Do not edit curriculum wording here; regenerate from the source markdown instead.

import type { CurriculumUnit } from "../types";
import { ${prefix}CommonInfoMarkdown } from "./${prefix}Markdown";
${courseImports || ""}

export const ${exportPrefix}: CurriculumUnit = {
  unitId: "${level.toLowerCase()}-non-language-unit-${UNIT}",
  slug: "${level.toLowerCase()}-non-language-unit-${UNIT}",
  status: "prototype",
  level: "${levelUpper}",
  courseType: "non-language",
  unitNumber: ${Number(UNIT)},
  title: {
    en: ${JSON.stringify(unitTitle)},
    zh: ${JSON.stringify(unitTitleZh)},
  },
  theme: "${themeSlug}",
  sourceRef: {
    workspace: "PG_PK_Language_Syllabus",
    path: ${JSON.stringify(sourceRoot.replace("/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/", ""))},
  },
  sourceMarkdown: ${prefix}CommonInfoMarkdown,
  overview: {
    en: ${JSON.stringify(overviewText)},
    zh: "",
  },
  languageSections: ${JSON.stringify(languageSections, null, 2)},
  weeklySubthemes: ${JSON.stringify(weeklySubthemes, null, 2)},
  overviewSections: ${JSON.stringify(overviewSectionsJson, null, 2)},
  courses: [
${courseEntries}
  ],
};
`;

function validateLessonHeadings(name, en, zh, expectedCount) {
  if (name.endsWith("CommonInfoMarkdown")) return [];
  const enCount = (en.match(/^#\s*Lesson\s+\d+/gim) || []).length;
  const zhCount = (zh.match(/^#\s*(?:Lesson\s+\d+.*?｜\s*)?第\s*[一二三四五六七八九十0-9]+\s*课/gm) || []).length;
  const issues = [];
  if (enCount !== expectedCount) issues.push(`${name}: expected ${expectedCount} English lesson headings, found ${enCount}`);
  if (zhCount !== expectedCount && zh.trim()) issues.push(`${name}: expected ${expectedCount} Chinese lesson headings, found ${zhCount}`);
  return issues;
}

fs.writeFileSync(outputPath, `${generatedMarkdownExports.join("\n\n")}\n`);
fs.writeFileSync(dataOutputPath, dataContent);

console.log(`Synced ${markdownPairs.length} ${levelUpper} Non-Language Unit ${UNIT} markdown pairs.`);
console.log(`Courses: ${courseData.length}; lessons parsed: ${courseData.reduce((s, c) => s + c.lessons.length, 0)}.`);
console.log(`Generated: ${outputPath}`);
console.log(`Generated: ${dataOutputPath}`);

if (!onlyCourses.length && !fs.existsSync(path.join(sourceRoot, "02_translations/zh_cn/00_common_info"))) {
  console.warn("Warning: Chinese translations directory not found. Bilingual fields may be incomplete.");
}
