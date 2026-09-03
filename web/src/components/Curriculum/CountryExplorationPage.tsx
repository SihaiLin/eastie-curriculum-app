import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import {
  getCountryExplorationCountry,
  isCountryExplorationLevel,
  type CountryExplorationLevel,
} from "../../curriculum/countryExploration";
import type { LanguageCode } from "../../curriculum/types";

type MarkdownNode =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "label"; text: string };

type MarkdownSection = {
  title: string;
  blocks: MarkdownNode[];
  groups: Array<{ title: string; blocks: MarkdownNode[] }>;
};

export function CountryExplorationPage({ language }: { language: LanguageCode }) {
  const params = useParams();
  const level = (params.level ?? "").toUpperCase();
  const lessonNumber = parseLessonSlug(params.lessonSlug);
  const country = getCountryExplorationCountry(params.countrySlug ?? "");

  if (!country || !isCountryExplorationLevel(level)) {
    return (
      <main className="unit-page">
        <section className="content">
          <section className="dashboard-section">
            <h1>Country Exploration page not found</h1>
            <p>The requested country or grade is not available yet.</p>
          </section>
        </section>
      </main>
    );
  }

  const isZh = language === "zh";
  const gradeContent = country.grades[level];
  const selectedLesson = lessonNumber ? gradeContent.lessons.find((lesson) => lesson.number === lessonNumber) : undefined;
  const markdown = selectedLesson?.markdown[language] ?? gradeContent.overview[language];
  const title = selectedLesson ? getMarkdownSubtitle(markdown) ?? `Lesson ${selectedLesson.number}` : isZh ? "概览" : "Overview";

  return (
    <main className="unit-page unit8-shell country-exploration-page">
      <aside className="sidebar unit8-sidebar course-lesson-sidebar" aria-label="Country Exploration navigation">
        <span className="sidebar-kicker">World Exploration</span>
        <h2>
          {country.flag} {country.name}
        </h2>
        <Link
          className={`sidebar-link week-overview-link ${selectedLesson ? "" : "active"}`}
          to={countryOverviewPath(level, country.slug)}
        >
          <span>{level}</span>
          <strong>{isZh ? "概览" : "Overview"}</strong>
        </Link>
        {gradeContent.lessons.map((lesson) => (
          <Link
            className={`lesson-nav-link ${selectedLesson?.number === lesson.number ? "active" : ""}`}
            key={lesson.number}
            to={`${countryOverviewPath(level, country.slug)}/lesson-${String(lesson.number).padStart(2, "0")}`}
          >
            <span>Lesson {lesson.number}</span>
            <strong>{getMarkdownSubtitle(lesson.markdown[language]) ?? `Lesson ${lesson.number}`}</strong>
          </Link>
        ))}
      </aside>
      <section className="content unit8-main">
        <header className="course-hero unit8-hero graded-course-hero country-exploration-hero">
          <div className="graded-hero-context" aria-label="Course context">
            <span>{level} Core Courses</span>
            <span>World Exploration</span>
          </div>
          <h1 className="course-page-title">
            {country.flag} {country.name} <span>{country.zhName}</span>
          </h1>
          <p className="country-hero-focus">{title}</p>
          <div className="hero-rule" aria-hidden="true" />
          <Link className="back-link" to="/curriculum">
            {isZh ? "返回首页" : "Back to Home"}
          </Link>
        </header>
        {selectedLesson ? (
          <CountryLessonDocument language={language} markdown={markdown} />
        ) : (
          <CountryOverviewDocument basePath={countryOverviewPath(level, country.slug)} markdown={markdown} />
        )}
      </section>
    </main>
  );
}

function countryOverviewPath(level: CountryExplorationLevel, countrySlug: string) {
  return `/curriculum/${level.toLowerCase()}/core/world-exploration/${countrySlug}`;
}

function parseLessonSlug(lessonSlug: string | undefined) {
  if (!lessonSlug) return undefined;
  const match = lessonSlug.match(/lesson-(\d+)/i);
  return match ? Number(match[1]) : undefined;
}

function getMarkdownSubtitle(markdown: string) {
  return markdown.split(/\r?\n/).find((line) => line.startsWith("## "))?.replace(/^##\s+/, "").trim();
}

function CountryOverviewDocument({ basePath, markdown }: { basePath: string; markdown: string }) {
  const sections = parseMarkdownSections(markdown);
  const mapSection = sections.find((section) => {
    const title = normalizeTitle(section.title);
    return title.includes("four-lesson map") || title.includes("四课地图");
  });
  const overviewSections = sections.filter((section) => section !== mapSection);

  return (
    <>
      <div className="country-overview-grid" aria-label="Country overview">
        {overviewSections.map((section) => (
          <CountryInfoCard key={section.title} section={section} />
        ))}
      </div>
      {mapSection ? (
        <section className="dashboard-section">
          <h2 className="section-heading">Four-Lesson Map</h2>
          <div className="math-sequence-grid country-lesson-map">
            {mapSection.groups.map((group, index) => (
              <Link className="math-sequence-card" key={group.title} to={`${basePath}/lesson-${String(index + 1).padStart(2, "0")}`}>
                <span>L{index + 1}</span>
                <strong>{stripLessonPrefix(group.title)}</strong>
                <small>{firstParagraph(group.blocks)}</small>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

function CountryLessonDocument({ language, markdown }: { language: LanguageCode; markdown: string }) {
  const sections = parseMarkdownSections(markdown).filter((section) => getCountrySectionKind(section.title) !== "identity");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const summaryText = buildCountryDailySummaryText(markdown, sections, language);

  return (
    <article className="lesson-details lesson-details-single country-lesson-document">
      <div className="lesson-details-content">
        <div className="k-language-day-header non-language-lesson-header">
          <div>
            <p className="lesson-page-kicker">Country Lesson</p>
            <h2 className="section-heading">{getMarkdownSubtitle(markdown)}</h2>
          </div>
          <div className="k-language-day-header-actions">
            <button className="k-language-summary-button" type="button" onClick={() => setSummaryOpen(true)}>
              Generate Daily Summary
            </button>
          </div>
        </div>
        {sections.map((section) => (
          <CountryInfoCard key={section.title} section={section} />
        ))}
        {summaryOpen ? <DailySummaryDialog text={summaryText} onClose={() => setSummaryOpen(false)} /> : null}
      </div>
    </article>
  );
}

function CountryInfoCard({ section }: { section: MarkdownSection }) {
  const kind = getCountrySectionKind(section.title);

  return (
    <section className={`unit8-card country-info-card card-kind-${kind}`}>
      <div className={`field-orb ${getCountryOrbClass(kind)}`} aria-hidden="true">
        <span>{getCountryOrbLabel(kind)}</span>
      </div>
      <div className="unit8-card-body">
        <h3>{stripSectionNumber(section.title)}</h3>
        <MarkdownBlocks blocks={section.blocks} chipLists={kind === "teacher"} />
        {section.groups.length ? (
          <div className={kind === "activities" ? "country-activity-list" : "language-stack"}>
            {section.groups.map((group) => (
              <article className="language-panel country-sub-panel" key={group.title}>
                <h4>{group.title}</h4>
                <MarkdownBlocks blocks={group.blocks} chipLists={kind === "teacher"} />
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function MarkdownBlocks({ blocks, chipLists = false }: { blocks: MarkdownNode[]; chipLists?: boolean }) {
  return (
    <>
      {blocks.map((node, index) => {
        if (node.type === "list") {
          return (
            chipLists ? (
              <div className="graded-chip-list country-language-chip-list" key={index}>
                {node.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            ) : (
              <ul key={index}>
                {node.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          );
        }
        if (node.type === "label") return <h5 key={index}>{node.text}</h5>;
        return <p key={index}>{node.text}</p>;
      })}
    </>
  );
}

function parseMarkdownSections(markdown: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  const lines = markdown.split(/\r?\n/);
  let currentSection: MarkdownSection | null = null;
  let currentGroup: { title: string; blocks: MarkdownNode[] } | null = null;
  let paragraph: string[] = [];
  let listItems: string[] = [];

  const currentBlocks = () => currentGroup?.blocks ?? currentSection?.blocks;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    currentBlocks()?.push({ type: "paragraph", text: cleanInline(paragraph.join(" ")) });
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    currentBlocks()?.push({ type: "list", items: listItems.map(cleanInline) });
    listItems = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const text = cleanInline(heading[2]);
      if (level === 1) continue;
      if (level === 2) {
        if (!/^\d+\.\s+/.test(text) && sections.length === 0) continue;
        currentSection = { title: text, blocks: [], groups: [] };
        currentGroup = null;
        sections.push(currentSection);
        continue;
      }
      if (level === 3 && currentSection) {
        currentGroup = { title: text, blocks: [] };
        currentSection.groups.push(currentGroup);
        continue;
      }
      currentBlocks()?.push({ type: "paragraph", text });
      continue;
    }

    const listItem = trimmed.match(/^-\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      listItems.push(listItem[1]);
      continue;
    }

    const label = trimmed.match(/^\*\*([^*]+):\*\*\s*$/);
    if (label) {
      flushParagraph();
      flushList();
      currentBlocks()?.push({ type: "label", text: label[1] });
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return sections;
}

function cleanInline(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeTitle(title: string) {
  return stripSectionNumber(title).toLowerCase();
}

function stripSectionNumber(title: string) {
  return title.replace(/^\d+\.\s*/, "").trim();
}

function stripLessonPrefix(title: string) {
  return title.replace(/^Lesson\s+\d+:\s*/i, "").replace(/^第\s*\d+\s*课[:：]\s*/, "").trim();
}

function firstParagraph(blocks: MarkdownNode[]) {
  return blocks.find((block): block is { type: "paragraph"; text: string } => block.type === "paragraph")?.text ?? "";
}

function buildCountryDailySummaryText(markdown: string, sections: MarkdownSection[], language: LanguageCode) {
  const isZh = language === "zh";
  const lessonTitle = getMarkdownSubtitle(markdown) ?? "Country Exploration Lesson";
  const objectives = sections.find((section) => getCountrySectionKind(section.title) === "outcome");
  const activities = sections.find((section) => getCountrySectionKind(section.title) === "activities");
  const objectiveItems = objectives?.blocks.flatMap((block) => block.type === "list" ? block.items : []) ?? [];

  const lines = [
    isZh ? "课程类型：" : "Course Type:",
    "World Exploration",
    "",
    isZh ? "课程名字：" : "Course Name:",
    lessonTitle,
  ];

  if (objectiveItems.length) {
    lines.push("", isZh ? "学习目标：" : "Learning Objectives:", ...objectiveItems.map((item) => `- ${item}`));
  }

  if (activities?.groups.length) {
    lines.push(
      "",
      isZh ? "Activities：" : "Activities:",
      ...activities.groups.map((group, index) => `Activity ${index + 1}: ${stripActivityPrefix(group.title)}`),
    );
  }

  return `${lines.join("\n")}\n`;
}

function stripActivityPrefix(title: string) {
  return title.replace(/^Activity\s+\d+:\s*/i, "").replace(/^活动\s*\d+[:：]\s*/, "").trim();
}

function getCountrySectionKind(title: string) {
  const normalized = normalizeTitle(title);
  if (normalized.includes("identity") || normalized.includes("课程身份")) return "identity";
  if (normalized.includes("focus") || normalized.includes("lens") || normalized.includes("重点") || normalized.includes("视角")) return "focus";
  if (normalized.includes("objective") || normalized.includes("学习目标")) return "outcome";
  if (normalized.includes("teacher language") || normalized.includes("教师语言")) return "teacher";
  if (normalized.includes("activities") || normalized.includes("活动")) return "activities";
  if (normalized.includes("setup") || normalized.includes("布置") || normalized.includes("关键元素")) return "resources";
  return "overview";
}

function getCountryOrbClass(kind: string) {
  if (kind === "identity") return "field-step";
  if (kind === "focus") return "field-language";
  if (kind === "outcome") return "field-outcome";
  if (kind === "teacher") return "field-teacher";
  if (kind === "activities") return "field-activity";
  if (kind === "resources") return "field-resources";
  return "field-overview";
}

function getCountryOrbLabel(kind: string) {
  if (kind === "identity") return "ID";
  if (kind === "focus") return "★";
  if (kind === "outcome") return "✓";
  if (kind === "teacher") return "“";
  if (kind === "activities") return "↗";
  if (kind === "resources") return "◇";
  return "i";
}

async function copySummaryText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy path
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function DailySummaryDialog({ text, onClose }: { text: string; onClose: () => void }) {
  const [value, setValue] = useState(text);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copySummaryText(value);
    setCopied(ok);
    if (ok) window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="k-language-summary-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Daily Summary"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="k-language-summary-modal">
        <div className="k-language-summary-head">
          <h3>Daily Summary</h3>
          <button className="k-language-summary-close" type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <textarea
          className="k-language-summary-text"
          value={value}
          spellCheck={false}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className="k-language-summary-actions">
          <button className="k-language-summary-copy" type="button" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
          <button className="k-language-summary-close-btn" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
