// DEPRECATED: Use sync-non-language-unit.mjs instead.
// Example: node scripts/sync-non-language-unit.mjs --level pk --unit 08 --source-root <path>

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const sourceRoot =
  "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pk/non_language_courses/unit_08_nature_weather_animals";
const outputPath = path.join(webRoot, "src/curriculum/generated/pkUnit08Markdown.ts");

const markdownPairs = [
  [
    "pkUnit08CommonInfoMarkdown",
    "00_common_info/pk_unit_08_nature_weather_animals_common_info_v1_1.md",
    "02_translations/zh_cn/00_common_info/pk_unit_08_nature_weather_animals_common_info_v1_1_zh_cn.md",
  ],
  [
    "pkUnit08CourseAMarkdown",
    "01_course_tracks/pk_unit_08_course_a_daily_life_self_care_independence.md",
    "02_translations/zh_cn/01_course_tracks/pk_unit_08_course_a_daily_life_self_care_independence_zh_cn.md",
  ],
  [
    "pkUnit08CourseBMarkdown",
    "01_course_tracks/pk_unit_08_course_b_sensory_object_early_inquiry.md",
    "02_translations/zh_cn/01_course_tracks/pk_unit_08_course_b_sensory_object_early_inquiry_zh_cn.md",
  ],
  [
    "pkUnit08CourseC1Markdown",
    "01_course_tracks/pk_unit_08_course_c1_story_puppet_early_retelling.md",
    "02_translations/zh_cn/01_course_tracks/pk_unit_08_course_c1_story_puppet_early_retelling_zh_cn.md",
  ],
  [
    "pkUnit08CourseC2Markdown",
    "01_course_tracks/pk_unit_08_course_c2_pretend_play_social_role_play.md",
    "02_translations/zh_cn/01_course_tracks/pk_unit_08_course_c2_pretend_play_social_role_play_zh_cn.md",
  ],
  [
    "pkUnit08CourseDMarkdown",
    "01_course_tracks/pk_unit_08_course_d_creative_expression_making.md",
    "02_translations/zh_cn/01_course_tracks/pk_unit_08_course_d_creative_expression_making_zh_cn.md",
  ],
  [
    "pkUnit08CourseEMarkdown",
    "01_course_tracks/pk_unit_08_course_e_music_rhythm_movement.md",
    "02_translations/zh_cn/01_course_tracks/pk_unit_08_course_e_music_rhythm_movement_zh_cn.md",
  ],
  [
    "pkUnit08CourseFMarkdown",
    "01_course_tracks/pk_unit_08_course_f_construction_small_world_play.md",
    "02_translations/zh_cn/01_course_tracks/pk_unit_08_course_f_construction_small_world_play_zh_cn.md",
  ],
  [
    "pkUnit08CourseGMarkdown",
    "01_course_tracks/pk_unit_08_course_g_psed_safety_social_participation.md",
    "02_translations/zh_cn/01_course_tracks/pk_unit_08_course_g_psed_safety_social_participation_zh_cn.md",
  ],
];

const coursePairs = markdownPairs.slice(1);

function readMarkdown(relativePath) {
  const absolutePath = path.join(sourceRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing source markdown: ${absolutePath}`);
  }

  return fs.readFileSync(absolutePath, "utf8");
}

function countLessonHeadings(markdown, language) {
  const lessonHeadingPattern =
    language === "zh" ? /^#\s*第[一二三四五六七八九十0-9]+课/gm : /^#\s*Lesson\s+\d+\b/gim;
  return [...markdown.matchAll(lessonHeadingPattern)].length;
}

function validateMarkdownPair(name, en, zh) {
  if (name === "pkUnit08CommonInfoMarkdown") {
    return [];
  }

  const issues = [];
  const enLessonCount = countLessonHeadings(en, "en");
  const zhLessonCount = countLessonHeadings(zh, "zh");

  if (enLessonCount !== 4) {
    issues.push(`${name}: expected 4 English lesson headings, found ${enLessonCount}`);
  }

  if (zhLessonCount !== 4) {
    issues.push(`${name}: expected 4 Chinese lesson headings, found ${zhLessonCount}`);
  }

  return issues;
}

const generated = [
  "// Generated from PK Unit 8 markdown source files.",
  "// Do not edit curriculum wording here; regenerate from the source markdown instead.",
  "",
  'import type { LocalizedText } from "../types";',
  "",
];
const validationIssues = [];

for (const [exportName, enPath, zhPath] of markdownPairs) {
  const en = readMarkdown(enPath);
  const zh = readMarkdown(zhPath);
  validationIssues.push(...validateMarkdownPair(exportName, en, zh));

  generated.push(`export const ${exportName}: LocalizedText = ${JSON.stringify({ en, zh }, null, 2)};`);
  generated.push("");
}

if (validationIssues.length > 0) {
  throw new Error(`PK Unit 8 markdown validation failed:\n- ${validationIssues.join("\n- ")}`);
}

fs.writeFileSync(outputPath, `${generated.join("\n")}\n`);

console.log(`Synced ${markdownPairs.length} PK Unit 8 markdown pairs.`);
console.log(`Courses checked: ${coursePairs.length}; lesson headings checked: ${coursePairs.length * 4} English + ${coursePairs.length * 4} Chinese.`);
console.log(`Generated: ${outputPath}`);
