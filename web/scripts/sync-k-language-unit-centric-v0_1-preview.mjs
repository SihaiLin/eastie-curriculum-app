#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(webRoot, "..");
const sourceRoot = path.join(
  projectRoot,
  "content/curriculum/k-language-unit-centric-v0_1/k1/unit_01_friends_and_family",
);
const outputPath = path.join(webRoot, "src/curriculum/generated/kLanguageUnitCentricPreview.ts");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function stripInlineMarkdown(value) {
  return value.replace(/\*\*(.*?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").trim();
}

function parseHeadingTree(markdown) {
  const lines = markdown.split(/\r?\n/);
  const headings = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(lines[index]);
    if (match) headings.push({ line: index, level: match[1].length, title: stripInlineMarkdown(match[2]) });
  }
  return { lines, headings };
}

function getHeadingBody(markdown, level, title) {
  const { lines, headings } = parseHeadingTree(markdown);
  const heading = headings.find((item) => item.level === level && item.title === title);
  if (!heading) return "";
  const next = headings.find((item) => item.line > heading.line && item.level <= heading.level);
  const end = next ? next.line : lines.length;
  return lines.slice(heading.line + 1, end).join("\n").trim();
}

function getSubsections(markdown, parentLevel, parentTitle, childLevel) {
  const parentBody = getHeadingBody(markdown, parentLevel, parentTitle);
  if (!parentBody) return [];
  const { lines, headings } = parseHeadingTree(parentBody);
  return headings
    .filter((heading) => heading.level === childLevel)
    .map((heading) => {
      const next = headings.find((item) => item.line > heading.line && item.level <= heading.level);
      const end = next ? next.line : lines.length;
      return {
        title: heading.title,
        body: lines.slice(heading.line + 1, end).join("\n").trim(),
      };
    });
}

function parseMetadata(body) {
  const out = {};
  for (const line of body.split(/\r?\n/)) {
    const match = /^-\s+([^:]+):\s*(.*)$/.exec(line.trim());
    if (!match) continue;
    out[toCamel(match[1])] = match[2].trim();
  }
  return out;
}

function toCamel(value) {
  return value
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}

function parseSimpleList(body) {
  return body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => stripInlineMarkdown(line.replace(/^-\s+/, "")))
    .filter(Boolean);
}

function parseTables(body) {
  const tables = [];
  const lines = body.split(/\r?\n/);
  let current = [];
  for (const line of lines) {
    if (/^\|.*\|$/.test(line.trim())) {
      current.push(line.trim());
    } else if (current.length) {
      tables.push(current.join("\n"));
      current = [];
    }
  }
  if (current.length) tables.push(current.join("\n"));
  return tables;
}

function parseUnit(filePath) {
  const markdown = read(filePath);
  return {
    sourcePath: filePath,
    sourceMarkdown: markdown,
    title: markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "",
    metadata: parseMetadata(getHeadingBody(markdown, 2, "Unit Metadata")),
    unitPurpose: getHeadingBody(markdown, 2, "Unit Purpose"),
    unitOutcomes: parseSimpleList(getHeadingBody(markdown, 2, "Unit Outcomes")),
    sourceMap: getSubsections(markdown, 2, "Source Map", 3),
    lockedContentEvidenceIndex: {
      body: getHeadingBody(markdown, 2, "Locked Content Evidence Index"),
      tables: parseTables(getHeadingBody(markdown, 2, "Locked Content Evidence Index")),
    },
    sourceSummary: parseSimpleList(getHeadingBody(markdown, 2, "Source Summary")),
    languageBank: getSubsections(markdown, 2, "Language Bank", 3),
    unitSequence: getSubsections(markdown, 2, "Unit Sequence", 3),
    unitLevelNotes: getHeadingBody(markdown, 2, "Unit-Level Notes"),
    openItems: getSubsections(markdown, 2, "Open Items", 3),
  };
}

function parseDay(filePath) {
  const markdown = read(filePath);
  const display = getSubsections(markdown, 2, "Displayed Content", 3);
  return {
    sourcePath: filePath,
    sourceMarkdown: markdown,
    title: markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "",
    metadata: parseMetadata(getHeadingBody(markdown, 2, "Day Metadata")),
    dayFocus: parseSimpleList(getHeadingBody(markdown, 2, "Day Focus")),
    displayedContent: display,
    sourceAudit: getHeadingBody(markdown, 2, "Source Audit"),
    reviewIssues: getHeadingBody(markdown, 2, "Review Issues"),
  };
}

function dayNumber(filePath) {
  return Number(/day_(\d+)\.md$/.exec(path.basename(filePath))?.[1] ?? 0);
}

const unitFile = path.join(sourceRoot, "00_unit.md");
const dayDir = path.join(sourceRoot, "days");
const dayFiles = fs
  .readdirSync(dayDir)
  .filter((name) => /^day_\d+\.md$/.test(name))
  .map((name) => path.join(dayDir, name))
  .sort((a, b) => dayNumber(a) - dayNumber(b));

const payload = {
  unitId: "k1-language-unit-01-unit-centric",
  level: "K1",
  unitNumber: 1,
  unitTheme: "Friends and Family",
  sourceRoot,
  unit: parseUnit(unitFile),
  days: dayFiles.map(parseDay),
};

const source = `// Generated by scripts/sync-k-language-unit-centric-v0_1-preview.mjs
// Do not edit by hand.

export const kLanguageUnitCentricPreview = ${JSON.stringify(payload, null, 2)} as const;

export const kLanguageUnitCentricPreviewSummary = {
  unitCount: 1,
  dayCount: ${payload.days.length},
  sourceRoot: ${JSON.stringify(sourceRoot)},
} as const;
`;

write(outputPath, source);
console.log(`Generated ${outputPath}`);
console.log(`Unit files: 1`);
console.log(`Day files: ${payload.days.length}`);
