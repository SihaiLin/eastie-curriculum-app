#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const projectRoot = path.resolve(webRoot, "..");
const sourceRoot = path.join(projectRoot, "content/curriculum/k-language-canonical-v0_1");
const validatorPath = path.join(projectRoot, "scripts/validate-canonical-md-v0_1.mjs");
const outputPath = path.join(webRoot, "src/curriculum/generated/kLanguageCanonicalPreview.ts");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, value);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) out.push(...walk(full));
    else if (stat.isFile() && full.endsWith(".md")) out.push(full);
  }
  return out.sort((a, b) => a.localeCompare(b));
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

function getDirectSubsections(markdown, parentLevel, parentTitle, childLevel) {
  const parentBody = getHeadingBody(markdown, parentLevel, parentTitle);
  if (!parentBody) return {};
  const { lines, headings } = parseHeadingTree(parentBody);
  const sections = {};
  for (let i = 0; i < headings.length; i += 1) {
    const heading = headings[i];
    if (heading.level !== childLevel) continue;
    const next = headings.find((item) => item.line > heading.line && item.level <= heading.level);
    const end = next ? next.line : lines.length;
    sections[heading.title] = lines.slice(heading.line + 1, end).join("\n").trim();
  }
  return sections;
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

function parseNumberedList(body) {
  const items = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^\d+[.)]\s+/.test(line))
    .map((line) => stripInlineMarkdown(line.replace(/^\d+[.)]\s+/, "")))
    .filter(Boolean);
  if (items.length) return items;
  const trimmed = body.trim();
  return trimmed && trimmed !== "TBD" ? [trimmed] : [];
}

function parseSource(body) {
  const lines = body.split(/\r?\n/);
  const source = {
    raw: body,
    teacherBook: "",
    pupilBook: "",
    activityBook: "",
    pupilBookAudio: [],
    activityBookAudio: [],
    notes: [],
  };
  let currentAudio = null;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    let match = /^-\s+Teacher's Book:\s*(.*)$/.exec(line);
    if (match) {
      source.teacherBook = match[1].trim();
      currentAudio = null;
      continue;
    }
    match = /^-\s+Pupil's Book:\s*(.*)$/.exec(line);
    if (match) {
      source.pupilBook = match[1].trim();
      currentAudio = null;
      continue;
    }
    match = /^-\s+Activity Book:\s*(.*)$/.exec(line);
    if (match) {
      source.activityBook = match[1].trim();
      currentAudio = null;
      continue;
    }
    if (/^-\s+Pupil's Book Audio:/i.test(line)) {
      currentAudio = "pupil";
      continue;
    }
    if (/^-\s+Activity Book Audio:/i.test(line)) {
      currentAudio = "activity";
      continue;
    }
    match = /^-\s+Track\s+([^:]+):\s*`?([^`]+)`?\s*$/.exec(line);
    if (match && currentAudio) {
      const item = { track: match[1].trim(), path: match[2].trim() };
      if (currentAudio === "pupil") source.pupilBookAudio.push(item);
      else source.activityBookAudio.push(item);
      continue;
    }
    if (line.startsWith("- ")) source.notes.push(stripInlineMarkdown(line.replace(/^-\s+/, "")));
  }
  return source;
}

function parseNeedsExtension(body) {
  if (!body || /-\s+None for this day\./i.test(body)) return [];
  const chunks = body
    .split(/\n(?=- Umbrella item:)/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.startsWith("- Umbrella item:"));
  return chunks.map((chunk) => {
    const umbrella = /^- Umbrella item:\s*(.*)$/m.exec(chunk)?.[1]?.trim() ?? "";
    const originalSource = /^\s+- Original source:\s*(.*)$/m.exec(chunk)?.[1]?.trim() ?? "";
    const suggestedRaw = /^\s+- Suggested concrete words from current scaffold:\s*(.*)$/m.exec(chunk)?.[1]?.trim() ?? "";
    const decisionNeeded = /^\s+- Decision needed:\s*(.*)$/m.exec(chunk)?.[1]?.trim() ?? "";
    return {
      umbrella,
      originalSource,
      suggestedConcreteWords: suggestedRaw ? suggestedRaw.split(/\s*,\s*/).filter(Boolean) : [],
      decisionNeeded,
    };
  });
}

function parseSourceIssues(body) {
  if (!body || /-\s+None for this day\./i.test(body)) return [];
  return body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => stripInlineMarkdown(line.replace(/^-\s+/, "")));
}

function parseOverview(filePath) {
  const markdown = read(filePath);
  const metadataBody = getHeadingBody(markdown, 2, "Unit Metadata");
  const flowBody = getHeadingBody(markdown, 2, "4-Week Teaching Flow");
  return {
    sourcePath: filePath,
    sourceMarkdown: markdown,
    title: markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "",
    metadata: parseMetadata(metadataBody),
    unitFocus: getHeadingBody(markdown, 2, "Unit Focus"),
    unitLearningOutcomes: parseSimpleList(getHeadingBody(markdown, 2, "Unit Learning Outcomes")),
    powerUpAlignment: parseMetadata(getHeadingBody(markdown, 2, "Power Up Alignment")),
    teachingFlow: parseTeachingFlow(flowBody),
    teacherDesignGuidance: getHeadingBody(markdown, 2, "Teacher / Design Guidance"),
    openDesignTasks: parseSimpleList(getHeadingBody(markdown, 2, "Open Design Tasks")),
  };
}

function parseTeachingFlow(body) {
  const { lines, headings } = parseHeadingTree(body);
  return headings
    .filter((heading) => heading.level === 3)
    .map((heading) => {
      const next = headings.find((item) => item.line > heading.line && item.level <= heading.level);
      const end = next ? next.line : lines.length;
      return {
        title: heading.title,
        items: parseSimpleList(lines.slice(heading.line + 1, end).join("\n")),
      };
    });
}

function parseDay(filePath) {
  const markdown = read(filePath);
  const h1 = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "";
  const circle = getDirectSubsections(markdown, 2, "Circle Time", 3);
  const clil = getDirectSubsections(markdown, 2, "CLIL Class", 3);
  const phonics = getDirectSubsections(markdown, 2, "Phonics", 3);
  const story = getDirectSubsections(markdown, 2, "Story", 3);
  const review = getDirectSubsections(markdown, 2, "Review Issues", 3);
  return {
    sourcePath: filePath,
    sourceMarkdown: markdown,
    title: h1,
    metadata: parseMetadata(getHeadingBody(markdown, 2, "Day Metadata")),
    circleTime: {
      topic: circle.Topic ?? "",
      song: circle.Song ?? "",
      teacherNotes: circle["Teacher Notes"] ?? "",
    },
    clilClass: {
      lessonOutcome: clil["Lesson Outcome"] ?? "",
      source: parseSource(clil.Source ?? ""),
      newKeywords: parseSimpleList(clil["New Keywords"] ?? ""),
      recycledKeywords: parseSimpleList(clil["Recycled Keywords"] ?? ""),
      targetSentences: parseSimpleList(clil["Target Sentences"] ?? ""),
      activitiesAndGames: parseNumberedList(clil["Activities and Games"] ?? ""),
      teacherDesignGuidance: clil["Teacher / Design Guidance"] ?? "",
    },
    phonics: {
      content: phonics.Content ?? "",
      teacherNotes: phonics["Teacher Notes"] ?? "",
    },
    story: {
      bookOrStory: story["Book / Story"] ?? "",
      teacherNotes: story["Teacher Notes"] ?? "",
    },
    reviewIssues: {
      childFacing: false,
      needsExtension: parseNeedsExtension(review["Needs Extension"] ?? ""),
      sourceIssues: parseSourceIssues(review["Source Issues"] ?? ""),
    },
  };
}

function buildUnit(unitDir) {
  const overviewPath = path.join(unitDir, "00_unit_overview.md");
  const overview = parseOverview(overviewPath);
  const dayFiles = walk(unitDir).filter((file) => path.basename(file) !== "00_unit_overview.md");
  const days = dayFiles.map(parseDay);
  const metadata = overview.metadata;
  const level = metadata.level ?? path.basename(path.dirname(unitDir)).toUpperCase();
  const unitNumberRaw = metadata.unitNumber ?? "";
  const unitNumber = /hello/i.test(unitNumberRaw) ? 0 : Number(unitNumberRaw);
  const unitFolder = path.basename(unitDir);
  return {
    unitId: `${String(level).toLowerCase()}-language-unit-${unitNumber === 0 ? "00" : String(unitNumber).padStart(2, "0")}`,
    level,
    courseLine: metadata.courseLine ?? "English Learning",
    unitNumber,
    unitFolder,
    unitTheme: metadata.unitTheme ?? "",
    status: metadata.status ?? "Draft",
    sourceBasis: metadata.sourceBasis ?? "",
    sourceDirectory: unitDir,
    overview,
    days,
  };
}

function findUnitDirs() {
  const levels = fs.readdirSync(sourceRoot)
    .map((entry) => path.join(sourceRoot, entry))
    .filter((entry) => fs.statSync(entry).isDirectory())
    .sort((a, b) => a.localeCompare(b));
  const units = [];
  for (const levelDir of levels) {
    for (const entry of fs.readdirSync(levelDir).sort()) {
      const unitDir = path.join(levelDir, entry);
      if (fs.statSync(unitDir).isDirectory() && fs.existsSync(path.join(unitDir, "00_unit_overview.md"))) {
        units.push(unitDir);
      }
    }
  }
  return units;
}

function main() {
  if (!fs.existsSync(sourceRoot)) {
    console.error(`Missing canonical source root: ${sourceRoot}`);
    process.exit(1);
  }
  console.log("Running canonical MD validator...");
  execFileSync("node", [validatorPath], { stdio: "inherit" });

  const unitDirs = findUnitDirs();
  const units = unitDirs.map(buildUnit);
  const summary = {
    sourceRoot,
    generatedAt: new Date().toISOString(),
    unitCount: units.length,
    dayCount: units.reduce((sum, unit) => sum + unit.days.length, 0),
    dayTypeCounts: countBy(units.flatMap((unit) => unit.days), (day) => day.metadata.dayType || "(missing)"),
    tbdCount: units.reduce((sum, unit) => sum + unit.days.reduce((s, day) => s + countStandaloneTbd(day.sourceMarkdown), 0), 0),
    needsExtensionCount: units.reduce((sum, unit) => sum + unit.days.reduce((s, day) => s + day.reviewIssues.needsExtension.length, 0), 0),
    sourceIssueCount: units.reduce((sum, unit) => sum + unit.days.reduce((s, day) => s + day.reviewIssues.sourceIssues.length, 0), 0),
  };

  const output = [
    "// Generated from K Language canonical MD v0.1 preview files.",
    "// Do not edit by hand; regenerate with scripts/sync-k-language-canonical-v0_1-preview.mjs.",
    "// This preview does not replace the current KLanguageUnitPage data source yet.",
    "",
    "export const kLanguageCanonicalPreviewSummary = " + JSON.stringify(summary, null, 2) + " as const;",
    "",
    "export const kLanguageCanonicalPreview = " + JSON.stringify(units, null, 2) + " as const;",
    "",
  ].join("\n");
  write(outputPath, output);

  console.log("");
  console.log("=== K Language Canonical v0.1 Preview Sync ===");
  console.log(`Units parsed: ${summary.unitCount}`);
  console.log(`Day files parsed: ${summary.dayCount}`);
  console.log(`Needs Extension items: ${summary.needsExtensionCount}`);
  console.log(`Source Issues: ${summary.sourceIssueCount}`);
  console.log(`Output: ${outputPath}`);
}

function countBy(items, keyFn) {
  const out = {};
  for (const item of items) {
    const key = keyFn(item);
    out[key] = (out[key] ?? 0) + 1;
  }
  return out;
}

function countStandaloneTbd(value) {
  return (value.match(/^TBD$/gm) ?? []).length;
}

main();
