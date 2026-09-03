import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const webRoot = path.resolve(path.dirname(__filename), "..");
const repoRoot = path.resolve(webRoot, "..");
const sourceRoot = path.join(repoRoot, "docs", "curriculum", "country_exploration");
const outputPath = path.join(webRoot, "src", "curriculum", "countryExploration", "generated.ts");

const countries = [
  {
    slug: "china",
    name: "China",
    zhName: "中国",
    flag: "🇨🇳",
  },
  {
    slug: "usa",
    name: "USA",
    zhName: "美国",
    flag: "🇺🇸",
  },
  {
    slug: "kenya",
    name: "Kenya",
    zhName: "肯尼亚",
    flag: "🇰🇪",
  },
  {
    slug: "germany",
    name: "Germany",
    zhName: "德国",
    flag: "🇩🇪",
  },
];

const grades = ["k1", "k2", "k3"];
const lessonFiles = [
  "01_lesson_1.md",
  "02_lesson_2.md",
  "03_lesson_3.md",
  "04_lesson_4.md",
];

const data = countries.map((country) => ({
  ...country,
  grades: Object.fromEntries(
    grades.map((grade) => {
      const gradeRoot = path.join(sourceRoot, country.slug, grade);
      return [
        grade.toUpperCase(),
        {
          overview: {
            en: readMarkdown(path.join(gradeRoot, "00_overview.md")),
            zh: readMarkdown(path.join(gradeRoot, "00_overview_zh.md")),
          },
          lessons: lessonFiles.map((fileName, index) => ({
            number: index + 1,
            markdown: {
              en: readMarkdown(path.join(gradeRoot, fileName)),
              zh: readMarkdown(path.join(gradeRoot, fileName.replace(".md", "_zh.md"))),
            },
          })),
        },
      ];
    }),
  ),
}));

const source = `import type { CountryExplorationCountry } from "./types";

export const countryExplorationCountries = ${JSON.stringify(data, null, 2)} satisfies CountryExplorationCountry[];
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, source);
console.log(`Synced ${data.length} country exploration country to ${path.relative(webRoot, outputPath)}`);

function readMarkdown(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing Country Exploration source file: ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8").trim();
}
