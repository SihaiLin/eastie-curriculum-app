import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pg/unit_08_nature_weather_animals";

function readFile(p) {
  return fs.readFileSync(p, "utf-8");
}

function escapeForTS(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

function templateLiterals(str) {
  return "`" + escapeForTS(str) + "`";
}

// Common info
const commonInfoEn = readFile(path.join(ROOT, "00_common_info/pg_unit_08_nature_weather_animals_common_info.md"));
const commonInfoZh = readFile(path.join(ROOT, "02_translations/zh_cn/00_common_info/pg_unit_08_nature_weather_animals_common_info_zh_cn.md"));

// Course tracks
const courseFiles = [
  "pg_unit_08_course_a_self_care_daily_routine",
  "pg_unit_08_course_b_sensory_object_exploration",
  "pg_unit_08_course_c1_story_puppet_experience",
  "pg_unit_08_course_c2_pretend_role_play_experience",
  "pg_unit_08_course_d_creative_expression",
  "pg_unit_08_course_e_music_rhythm_movement",
  "pg_unit_08_course_f_construction_small_world_play",
  "pg_unit_08_course_g_psed_safety",
];

const codeMapping = {
  pg_unit_08_course_a_self_care_daily_routine: "A",
  pg_unit_08_course_b_sensory_object_exploration: "B",
  pg_unit_08_course_c1_story_puppet_experience: "C1",
  pg_unit_08_course_c2_pretend_role_play_experience: "C2",
  pg_unit_08_course_d_creative_expression: "D",
  pg_unit_08_course_e_music_rhythm_movement: "E",
  pg_unit_08_course_f_construction_small_world_play: "F",
  pg_unit_08_course_g_psed_safety: "G",
};

const outputLines = [
  `// Auto-generated from source markdown files.`,
  `// Do not edit manually; regenerate via: node scripts/generate-markdown.mjs`,
  ``,
  `import type { LocalizedText } from "../types";`,
  ``,
];

// Common info
outputLines.push(`export const pgUnit08CommonInfoMarkdown: LocalizedText = {`);
outputLines.push(`  en: ${templateLiterals(commonInfoEn)},`);
outputLines.push(`  zh: ${templateLiterals(commonInfoZh)},`);
outputLines.push(`};\n`);

// Course exports
for (const name of courseFiles) {
  const code = codeMapping[name];
  const safeCode = code.replace(/[^A-Z0-9]/g, "");
  const en = readFile(path.join(ROOT, `01_course_tracks/${name}.md`));
  const zhPath = path.join(ROOT, `02_translations/zh_cn/01_course_tracks/${name}_zh_cn.md`);
  const zh = readFile(zhPath);
  const varName = `pgUnit08Course${safeCode}Markdown`;
  outputLines.push(`export const ${varName}: LocalizedText = {`);
  outputLines.push(`  en: ${templateLiterals(en)},`);
  outputLines.push(`  zh: ${templateLiterals(zh)},`);
  outputLines.push(`};\n`);
}

const outPath = path.join(__dirname, "..", "src/curriculum/generated/pgUnit08Markdown.ts");
fs.writeFileSync(outPath, outputLines.join("\n"), "utf-8");
console.log(`Generated ${outPath}`);
