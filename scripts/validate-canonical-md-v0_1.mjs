// Validate the K Language canonical MD v0.1 structure.
// Scans the 74 .md files under content/curriculum/k-language-canonical-v0_1/.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, basename } from "node:path";

const ROOT = "/Users/Lucia/Desktop/eastie_curriculum_project/content/curriculum/k-language-canonical-v0_1";

const REQUIRED_DAY_H1 = /^# Day (\d+), Week (\d+)\s*$/m;
const REQUIRED_DAY_H2 = [
  "## Day Metadata",
  "## Circle Time",
  "## CLIL Class",
  "## Phonics",
  "## Story",
  "## Review Issues",
];
const REQUIRED_CLIL_H3 = [
  "### Lesson Outcome",
  "### Source",
  "### New Keywords",
  "### Recycled Keywords",
  "### Target Sentences",
  "### Activities and Games",
  "### Teacher / Design Guidance",
];
const REQUIRED_OVERVIEW_H2 = [
  "## Unit Metadata",
  "## Unit Focus",
  "## Unit Learning Outcomes",
  "## Power Up Alignment",
  "## 4-Week Teaching Flow",
  "## Teacher / Design Guidance",
  "## Open Design Tasks",
];

// ---------------------------------------------------------------------------
// Walk helpers
// ---------------------------------------------------------------------------
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (s.isFile() && p.endsWith(".md")) out.push(p);
  }
  return out;
}

function readMd(p) {
  return readFileSync(p, "utf-8");
}

// ---------------------------------------------------------------------------
// Strip code fences (``` ... ```) so heading checks don't false-positive on
// example markdown inside the file.
// ---------------------------------------------------------------------------
function stripCodeFences(text) {
  // Remove ```...``` blocks (incl. ```text, ```markdown, etc.)
  return text.replace(/```[\s\S]*?```/g, "");
}

// ---------------------------------------------------------------------------
// Validate one file.
// ---------------------------------------------------------------------------
function validateFile(p) {
  const text = readMd(p);
  const stripped = stripCodeFences(text);
  const name = basename(p);
  const issues = [];
  const stats = {
    hasTBD: false,
    tbdCount: 0,
    dayType: null,
    dayHeading: null,
    needsExtensionCount: 0,
    sourceIssueCount: 0,
  };

  const isOverview = name === "00_unit_overview.md";

  if (isOverview) {
    for (const h2 of REQUIRED_OVERVIEW_H2) {
      if (!stripped.includes(h2)) issues.push(`missing overview heading: ${h2}`);
    }
  } else {
    // day file
    const h1Match = text.match(REQUIRED_DAY_H1);
    if (!h1Match) {
      issues.push(`day file missing or malformed H1 "# Day X, Week Y"`);
    } else {
      stats.dayHeading = `# Day ${h1Match[1]}, Week ${h1Match[2]}`;
    }
    for (const h2 of REQUIRED_DAY_H2) {
      if (!stripped.includes(h2)) issues.push(`missing day heading: ${h2}`);
    }
    for (const h3 of REQUIRED_CLIL_H3) {
      if (!stripped.includes(h3)) issues.push(`missing CLIL sub-heading: ${h3}`);
    }
    // Detect day type from the metadata block.
    const dayTypeMatch = stripped.match(/- Day Type:\s*([^\n]+)/);
    if (dayTypeMatch) stats.dayType = dayTypeMatch[1].trim();

    // Count TBD occurrences.
    const tbdMatches = text.match(/^TBD$/gm);
    if (tbdMatches) {
      stats.tbdCount = tbdMatches.length;
      stats.hasTBD = true;
    }
    // Count needs-extension items.
    const umbrellas = text.match(/^- Umbrella item:/gm);
    if (umbrellas) stats.needsExtensionCount = umbrellas.length;
    // Count source-issue items (we currently only have Source Issues when a
    // real error item is kept; this counts "Issue:" lines under Source Issues).
    const issues2 = text.match(/- Issue:/gm);
    if (issues2) stats.sourceIssueCount = issues2.length;
  }

  return { path: p, name, isOverview, issues, stats };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  const all = walk(ROOT);
  const overviews = [];
  const dayFiles = [];
  for (const p of all) {
    const r = validateFile(p);
    if (r.isOverview) overviews.push(r);
    else dayFiles.push(r);
  }
  overviews.sort((a, b) => a.path.localeCompare(b.path));
  dayFiles.sort((a, b) => a.path.localeCompare(b.path));

  // ---- Day type distribution ----
  const byType = {};
  for (const d of dayFiles) {
    const t = d.stats.dayType || "(missing)";
    byType[t] = (byType[t] ?? 0) + 1;
  }

  // ---- Aggregate TBD count ----
  let totalTBD = 0;
  for (const d of dayFiles) totalTBD += d.stats.tbdCount;

  // ---- Days with Needs Extension / Source Issues ----
  const daysWithNeedsExt = dayFiles.filter((d) => d.stats.needsExtensionCount > 0);
  const daysWithSourceIssues = dayFiles.filter((d) => d.stats.sourceIssueCount > 0);
  const totalNeedsExt = dayFiles.reduce((s, d) => s + d.stats.needsExtensionCount, 0);
  const totalSourceIssues = dayFiles.reduce((s, d) => s + d.stats.sourceIssueCount, 0);

  // ---- Suspicious empty sections (heading has no content before next same-level heading) ----
  // A heading is "empty" only if it has neither content lines nor sub-headings
  // before the next same-or-higher-level heading. So `## Circle Time` followed
  // by `### Topic` is NOT empty — it has sub-headings, even if the sub-headings
  // are `TBD`.
  const suspicious = [];
  const allFiles = [...overviews, ...dayFiles];
  for (const f of allFiles) {
    const text = readMd(f.path);
    const lines = text.split("\n");
    // Parse headings with their positions.
    const headings = []; // {line, level, title}
    for (let i = 0; i < lines.length; i += 1) {
      const m = /^(#{1,4})\s+(.+?)\s*$/.exec(lines[i]);
      if (m) headings.push({ line: i, level: m[1].length, title: m[2].trim() });
    }
    for (let i = 0; i < headings.length; i += 1) {
      const h = headings[i];
      // Find the next heading with level <= h.level (same level or higher).
      let j = i + 1;
      while (j < headings.length && headings[j].level > h.level) j += 1;
      let hasSub = false;
      let hasContent = false;
      const ownEnd = j < headings.length ? headings[j].line : lines.length;
      for (let k = h.line + 1; k < ownEnd; k += 1) {
        const sub = /^(#{1,4})\s+/.exec(lines[k]);
        if (sub) {
          if (sub[1].length > h.level) hasSub = true;
        } else if (lines[k].trim() !== "") {
          hasContent = true;
        }
      }
      if (!hasSub && !hasContent) {
        // Check if this is a required heading; flag if so.
        if (
          REQUIRED_DAY_H2.includes(`## ${h.title}`) ||
          REQUIRED_CLIL_H3.includes(`### ${h.title}`) ||
          REQUIRED_OVERVIEW_H2.includes(`## ${h.title}`)
        ) {
          suspicious.push(`${f.path.replace(ROOT, "")} :: ${"#".repeat(h.level)} ${h.title} (line ${h.line + 1}) is empty (no content, no sub-headings)`);
        }
      }
    }
  }

  // ---- Inconsistent day metadata ----
  const metaIssues = [];
  for (const d of dayFiles) {
    const text = readMd(d.path);
    const level = /- Level:\s*([A-Z]\d)/.exec(text)?.[1];
    const unitNum = /- Unit Number:\s*([^\n]+)/.exec(text)?.[1]?.trim();
    const unitTheme = /- Unit Theme:\s*([^\n]+)/.exec(text)?.[1]?.trim();
    const day = /- Day:\s*(\d+)/.exec(text)?.[1];
    const week = /- Week:\s*(\d+)/.exec(text)?.[1];
    const dayType = /- Day Type:\s*([^\n]+)/.exec(text)?.[1]?.trim();
    const pu = /- Power Up Lesson:\s*([^\n]+)/.exec(text)?.[1]?.trim();
    const role = /- Lesson Role:\s*([^\n]+)/.exec(text)?.[1]?.trim();
    const status = /- Status:\s*([^\n]+)/.exec(text)?.[1]?.trim();
    const fields = { level, unitNum, unitTheme, day, week, dayType, pu, role, status };

    // Check required fields present.
    if (!level) metaIssues.push(`${d.path.replace(ROOT, "")}: missing Level`);
    if (!day) metaIssues.push(`${d.path.replace(ROOT, "")}: missing Day`);
    if (!week) metaIssues.push(`${d.path.replace(ROOT, "")}: missing Week`);
    if (!dayType) metaIssues.push(`${d.path.replace(ROOT, "")}: missing Day Type`);
    if (!pu) metaIssues.push(`${d.path.replace(ROOT, "")}: missing Power Up Lesson`);
    if (!role) metaIssues.push(`${d.path.replace(ROOT, "")}: missing Lesson Role`);

    // For non-PU days, Status should be present.
    if (dayType && dayType !== "Power Up" && !status) {
      metaIssues.push(`${d.path.replace(ROOT, "")}: non-PU day missing Status`);
    }
  }

  // ---- Build report ----
  const report = [];
  report.push("=== K Language Canonical MD v0.1 Validation Report ===");
  report.push(`Root: ${ROOT}`);
  report.push(`Generated: ${new Date().toISOString()}`);
  report.push("");
  report.push("## 1. File Counts");
  report.push(`  Unit overview files: ${overviews.length}`);
  report.push(`  Day files: ${dayFiles.length}`);
  report.push(`  Total .md files: ${overviews.length + dayFiles.length}`);
  report.push("");
  report.push("## 2. Day Type Distribution");
  for (const t of Object.keys(byType).sort()) report.push(`  ${t}: ${byType[t]}`);
  report.push("");
  report.push("## 3. Heading Coverage (per file)");
  let headingFail = 0;
  for (const f of [...overviews, ...dayFiles]) {
    if (f.issues.length) {
      headingFail += 1;
    }
  }
  report.push(`  Files with at least one missing required heading: ${headingFail} / ${overviews.length + dayFiles.length}`);
  if (headingFail > 0) {
    for (const f of [...overviews, ...dayFiles]) {
      if (f.issues.length) {
        report.push(`    ${f.path.replace(ROOT, "")}:`);
        for (const iss of f.issues) report.push(`      - ${iss}`);
      }
    }
  }
  report.push("");
  report.push("## 4. TBD Field Count");
  report.push(`  Total TBD occurrences across all day files: ${totalTBD}`);
  report.push(`  Day files with at least one TBD: ${dayFiles.filter((d) => d.stats.hasTBD).length} / ${dayFiles.length}`);
  report.push("");
  report.push("## 5. Review Issues Summary");
  report.push(`  Days with at least one Needs Extension item: ${daysWithNeedsExt.length} / ${dayFiles.length}`);
  report.push(`  Total Needs Extension items: ${totalNeedsExt}`);
  report.push(`  Days with at least one Source Issue: ${daysWithSourceIssues.length} / ${dayFiles.length}`);
  report.push(`  Total Source Issues: ${totalSourceIssues}`);
  if (daysWithSourceIssues.length > 0) {
    for (const d of daysWithSourceIssues) {
      report.push(`    ${d.path.replace(ROOT, "")}: ${d.stats.sourceIssueCount}`);
    }
  }
  report.push("");
  report.push("## 6. Suspicious Empty Sections");
  report.push(`  Total: ${suspicious.length}`);
  for (const s of suspicious) report.push(`    - ${s}`);
  report.push("");
  report.push("## 7. Inconsistent Day Metadata");
  report.push(`  Total: ${metaIssues.length}`);
  for (const m of metaIssues) report.push(`    - ${m}`);
  report.push("");
  report.push("## 8. Overall Result");
  const isPass = headingFail === 0 && metaIssues.length === 0 && suspicious.length === 0;
  report.push(`  ${isPass ? "✓ PASS" : "✗ FAIL"}`);
  report.push("");
  report.push("## 9. Recommendations Before Web Sync");
  if (isPass) {
    report.push("  - Structure is consistent. Proceed to web sync test.");
  } else {
    if (headingFail > 0) report.push("  - Fix the missing required headings listed in §3 first.");
    if (metaIssues.length > 0) report.push("  - Reconcile day metadata (Level/Day/Week/Day Type/Power Up Lesson/Lesson Role) per §7.");
    if (suspicious.length > 0) report.push("  - Some required sections are empty; fill or replace with `TBD` per rule 5.");
    if (totalTBD === 0) report.push("  - No TBD fields detected — verify this is expected (rule 5 says missing content should be TBD).");
    if (totalTBD > 0) report.push(`  - ${totalTBD} TBD fields still need to be filled by the course-design session.`);
  }
  report.push("  - Consider a CI hook that runs this script and fails the build if `✗ FAIL`.");
  report.push("  - Suggest adding the same validator into the web sync step before generation regenerates scaffold files.");
  report.push("");

  process.stdout.write(report.join("\n") + "\n");
  if (!isPass) process.exitCode = 1;
}

main();
