// DEPRECATED: Use sync-non-language-unit.mjs instead.
// Example: node scripts/sync-non-language-unit.mjs --level pg --unit 08 --source-root <path>

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const sourceRoot =
  "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pg/unit_08_nature_weather_animals";
const outputPath = path.join(webRoot, "src/curriculum/generated/pgUnit08Markdown.ts");

const markdownPairs = [
  [
    "pgUnit08CommonInfoMarkdown",
    "00_common_info/pg_unit_08_nature_weather_animals_common_info.md",
    "02_translations/zh_cn/00_common_info/pg_unit_08_nature_weather_animals_common_info_zh_cn.md",
  ],
  [
    "pgUnit08CourseAMarkdown",
    "01_course_tracks/pg_unit_08_course_a_self_care_daily_routine.md",
    "02_translations/zh_cn/01_course_tracks/pg_unit_08_course_a_self_care_daily_routine_zh_cn.md",
  ],
  [
    "pgUnit08CourseBMarkdown",
    "01_course_tracks/pg_unit_08_course_b_sensory_object_exploration.md",
    "02_translations/zh_cn/01_course_tracks/pg_unit_08_course_b_sensory_object_exploration_zh_cn.md",
  ],
  [
    "pgUnit08CourseC1Markdown",
    "01_course_tracks/pg_unit_08_course_c1_story_puppet_experience.md",
    "02_translations/zh_cn/01_course_tracks/pg_unit_08_course_c1_story_puppet_experience_zh_cn.md",
  ],
  [
    "pgUnit08CourseC2Markdown",
    "01_course_tracks/pg_unit_08_course_c2_pretend_role_play_experience.md",
    "02_translations/zh_cn/01_course_tracks/pg_unit_08_course_c2_pretend_role_play_experience_zh_cn.md",
  ],
  [
    "pgUnit08CourseDMarkdown",
    "01_course_tracks/pg_unit_08_course_d_creative_expression.md",
    "02_translations/zh_cn/01_course_tracks/pg_unit_08_course_d_creative_expression_zh_cn.md",
  ],
  [
    "pgUnit08CourseEMarkdown",
    "01_course_tracks/pg_unit_08_course_e_music_rhythm_movement.md",
    "02_translations/zh_cn/01_course_tracks/pg_unit_08_course_e_music_rhythm_movement_zh_cn.md",
  ],
  [
    "pgUnit08CourseFMarkdown",
    "01_course_tracks/pg_unit_08_course_f_construction_small_world_play.md",
    "02_translations/zh_cn/01_course_tracks/pg_unit_08_course_f_construction_small_world_play_zh_cn.md",
  ],
  [
    "pgUnit08CourseGMarkdown",
    "01_course_tracks/pg_unit_08_course_g_psed_safety.md",
    "02_translations/zh_cn/01_course_tracks/pg_unit_08_course_g_psed_safety_zh_cn.md",
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

function findBrokenFragments(markdown) {
  const lines = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.filter((line) => {
    if (/^-{3,}$/.test(line) || /^```/.test(line)) {
      return false;
    }

    const withoutMarkdown = line.replace(/^#+\s*/, "").replace(/[*_`｜|.,，。:：;；/\s-]/g, "");
    return withoutMarkdown.length === 0;
  });
}

function validateMarkdownPair(name, en, zh) {
  if (name === "pgUnit08CommonInfoMarkdown") {
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
  "// Generated from PG Unit 8 markdown source files.",
  "// Do not edit curriculum wording here; regenerate from the source markdown instead.",
  "",
  'import type { LocalizedText } from "../types";',
  "",
];
const validationIssues = [];
let brokenFragmentCount = 0;

for (const [exportName, enPath, zhPath] of markdownPairs) {
  const en = readMarkdown(enPath);
  const zh = readMarkdown(zhPath);
  validationIssues.push(...validateMarkdownPair(exportName, en, zh));
  brokenFragmentCount += findBrokenFragments(en).length + findBrokenFragments(zh).length;

  generated.push(`export const ${exportName}: LocalizedText = ${JSON.stringify({ en, zh }, null, 2)};`);
  generated.push("");
}

if (validationIssues.length > 0) {
  throw new Error(`PG Unit 8 markdown validation failed:\n- ${validationIssues.join("\n- ")}`);
}

fs.writeFileSync(outputPath, `${generated.join("\n")}\n`);

console.log(`Synced ${markdownPairs.length} PG Unit 8 markdown pairs.`);
console.log(`Courses checked: ${coursePairs.length}; lesson headings checked: ${coursePairs.length * 4} English + ${coursePairs.length * 4} Chinese.`);
console.log(`Generated: ${outputPath}`);

if (brokenFragmentCount > 0) {
  console.warn(`Warning: found ${brokenFragmentCount} punctuation-only markdown fragments. Renderer may hide them.`);
}
