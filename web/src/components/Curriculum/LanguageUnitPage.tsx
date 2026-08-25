import { Link, useParams } from "react-router-dom";
import { Fragment, type ReactNode } from "react";
import { FeedbackButton } from "../Feedback/FeedbackButton";
import type { FeedbackContext } from "../../feedback/feedbackTypes";
import type { CurriculumLevel } from "../../curriculum/types";

export type LanguageUnitData = {
  unitId: string;
  level: CurriculumLevel;
  courseType: "language";
  unitNumber: number;
  slug: string;
  title: string;
  overview: {
    title: string;
    sections: ReadonlyArray<{ title: string; body: string }>;
  };
  weeks: ReadonlyArray<LanguageUnitWeek>;
};

type LanguageUnitWeek = {
  id: string;
  week: number;
  title: string;
  sourceWeek: string;
  weeklyOutcome: string;
  coreLanguage: string;
  repeatedRoutine: string;
  lessons: ReadonlyArray<LanguageUnitLesson>;
};

type LanguageUnitLesson = {
  id: string;
  lesson: number;
  title: string;
  fields: Record<string, string>;
};

const fieldOrder = [
  "Source Mini Progression Step",
  "Lesson Outcome",
  "New Language",
  "Recycled Language",
  "Baseline Child Response",
  "Baseline Output Opportunity",
  "Incidental Imitation / Optional Exposure",
  "Optional Challenge",
  "Suggested Activity / Game",
] as const;

export function LanguageUnitPage({ unit }: { unit: LanguageUnitData }) {
  const params = useParams();
  const selectedId = params.courseSlug;
  const selectedWeek = unit.weeks.find((week) => week.id === selectedId);
  const selectedLesson = unit.weeks.flatMap((week) => week.lessons.map((lesson) => ({ lesson, week }))).find((item) => item.lesson.id === selectedId);

  return (
    <main className="unit-page unit8-shell language-unit-shell">
      <LanguageLessonDirectory selectedId={selectedId} unit={unit} />
      <section className="content unit8-main">
        {selectedLesson ? (
          <LessonPackDetail lesson={selectedLesson.lesson} unit={unit} week={selectedLesson.week} />
        ) : selectedWeek ? (
          <WeekOverview unit={unit} week={selectedWeek} />
        ) : (
          <LanguageUnitOverview unit={unit} />
        )}
      </section>
    </main>
  );
}

function LanguageLessonDirectory({ selectedId, unit }: { selectedId?: string; unit: LanguageUnitData }) {
  const unitPath = getUnitPath(unit);
  const currentPath = selectedId ? `${unitPath}/${selectedId}` : unitPath;
  const unitLabel = getUnitLabel(unit);
  const options = [
    { label: `${unitLabel} Overview`, value: unitPath },
    ...unit.weeks.flatMap((week) => [
      { label: `Week ${week.week} Overview · ${shortWeekTitle(week)}`, value: `${unitPath}/${week.id}` },
      ...week.lessons.map((lesson) => ({
        label: `Week ${week.week} Lesson ${lesson.lesson} · ${lesson.title}`,
        value: `${unitPath}/${lesson.id}`,
      })),
    ]),
  ];

  return (
    <aside className="sidebar unit8-sidebar language-lesson-sidebar" aria-label="Lesson navigation">
      <h2>Lesson Directory</h2>
      <label className="mobile-select-label course-select-label" htmlFor="mobile-lesson-nav">
        Lesson Directory
      </label>
      <select
        aria-label="Lesson navigation"
        className="mobile-course-select"
        id="mobile-lesson-nav"
        onChange={(event) => {
          window.location.href = event.target.value;
        }}
        value={currentPath}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Link className={`sidebar-link ${!selectedId ? "active" : ""}`} to={unitPath}>
        <span>Unit</span>
        <strong>{unitLabel} Overview</strong>
      </Link>
      {unit.weeks.map((week) => (
        <section className="lesson-week-nav" key={week.id}>
          <Link className={`sidebar-link week-overview-link ${selectedId === week.id ? "active" : ""}`} to={`${unitPath}/${week.id}`}>
            <span>Week {week.week}</span>
            <strong>{shortWeekTitle(week)}</strong>
          </Link>
          <div className="lesson-week-nav-list">
            {week.lessons.map((lesson) => (
              <Link
                className={`lesson-nav-link ${selectedId === lesson.id ? "active" : ""}`}
                key={lesson.id}
                to={`${unitPath}/${lesson.id}`}
              >
                <span>Lesson {lesson.lesson}</span>
                <strong>{lesson.title}</strong>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </aside>
  );
}

function LanguageUnitOverview({ unit }: { unit: LanguageUnitData }) {
  return (
    <>
      <LanguageHero eyebrow={`${unit.level} Curriculum / ${getUnitLabel(unit)} / Language`} title={unit.overview.title} />
      <section className="dashboard-section language-overview-grid">
        {unit.overview.sections.map((section) => (
          <article className={`unit8-card card-kind-${getLanguageSectionKind(section.title)}`} key={section.title}>
            <div className={`field-orb ${getOrbClass(section.title)}`} aria-hidden="true">
              <span>{getOrbLabel(section.title)}</span>
            </div>
            <div className="unit8-card-body">
              <h3>{section.title}</h3>
              <MarkdownText sectionTitle={section.title} text={section.body} />
            </div>
          </article>
        ))}
      </section>
      <section className="dashboard-section">
        <div className="section-title">
          <h2>{unit.weeks.length}-Week Lesson Pack</h2>
          <p>Open a week or lesson to review the full light lesson frame.</p>
        </div>
        <div className="week-grid language-week-grid">
          {unit.weeks.map((week) => (
            <Link className="week-card language-week-card" key={week.id} to={`${getUnitPath(unit)}/${week.id}`}>
              <p className="week-label">Week {week.week}</p>
              <h3>{shortWeekTitle(week)}</h3>
              <p>{week.weeklyOutcome}</p>
              <span className="track-link-label">Open week overview</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function WeekOverview({ unit, week }: { unit: LanguageUnitData; week: LanguageUnitWeek }) {
  return (
    <>
      <LanguageHero eyebrow={`${unit.level} ${getUnitLabel(unit)} / Week ${week.week} / Overview`} title={`Week ${week.week}: ${shortWeekTitle(week)}`} />
      <section className="unit8-card card-kind-weekly language-week-overview">
        <div className="field-orb field-step" aria-hidden="true">
          <span>W{week.week}</span>
        </div>
        <div className="unit8-card-body">
          <h3>Weekly Outcome</h3>
          <p>{week.weeklyOutcome}</p>
          <h3>Core Language</h3>
          <ChipRow text={week.coreLanguage} />
          <h3>Repeated Routine</h3>
          <RoutineFlow text={week.repeatedRoutine} />
        </div>
      </section>
      <section className="dashboard-section">
        <div className="section-title">
          <h2>Week {week.week} Lessons</h2>
          <p>Five light lesson frames for this weekly progression.</p>
        </div>
        <div className="lesson-grid language-lesson-grid">
          {week.lessons.map((lesson) => (
            <Link className="lesson-card language-lesson-card" key={lesson.id} to={`${getUnitPath(unit)}/${lesson.id}`}>
              <span>Week {week.week} / Lesson {lesson.lesson}</span>
              <h5>{lesson.title}</h5>
              <p>{lesson.fields["Lesson Outcome"]}</p>
              <span className="track-link-label">Open lesson frame</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function LessonPackDetail({ lesson, unit, week }: { lesson: LanguageUnitLesson; unit: LanguageUnitData; week: LanguageUnitWeek }) {
  return (
    <>
      <header className="course-hero unit8-hero" id="overview">
        <div>
          <p className="breadcrumb">{unit.level} {getUnitLabel(unit)} / Week {week.week} / Lesson {lesson.lesson}</p>
          <h1>
            Week {week.week} / Lesson {lesson.lesson}: <span>{lesson.title}</span>
          </h1>
          <div className="hero-rule" aria-hidden="true" />
        </div>
        <div className="hero-art" aria-hidden="true">
          <img src="/assets/eastie_dolphins.png" alt="" />
        </div>
        <Link className="back-link" to={`${getUnitPath(unit)}/${week.id}`}>
          Back to Week Overview
        </Link>
      </header>
      {fieldOrder
        .filter((field) => lesson.fields[field])
        .map((field) => (
          <LessonFieldCard field={field} key={field} value={lesson.fields[field]} />
        ))}
      <FeedbackButton context={createLanguageFeedbackContext(unit, week, lesson)} />
    </>
  );
}

function LessonFieldCard({ field, value }: { field: string; value: string }) {
  const kind = getLanguageSectionKind(field);
  return (
    <section className={`unit8-card card-kind-${kind}`}>
      <div className={`field-orb ${getOrbClass(field)}`} aria-hidden="true">
        <span>{getOrbLabel(field)}</span>
      </div>
      <div className="unit8-card-body">
        <h3>{field}</h3>
        <MarkdownText sectionTitle={field} text={value} />
      </div>
    </section>
  );
}

function LanguageHero({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header className="hero unit8-hero" id="overview">
      <div>
        <p className="breadcrumb">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="hero-rule" aria-hidden="true" />
      </div>
      <div className="hero-art" aria-hidden="true">
        <img src="/assets/eastie_dolphins.png" alt="" />
      </div>
    </header>
  );
}

function MarkdownText({ sectionTitle, text }: { sectionTitle?: string; text: string }) {
  const blocks = parseMarkdownText(text, isLanguageChipSection(sectionTitle));
  const tokenVariant = getTokenVariant(sectionTitle);
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "heading") return <h4 key={index}>{block.text}</h4>;
        if (block.type === "chips") return <ChipRow key={index} text={block.text} variant={tokenVariant} />;
        if (block.type === "options") return <ActivityOptions key={index} options={block.options} />;
        if (block.type === "routine") return <RoutineFlow key={index} text={block.text} />;
        if (block.type === "rule") return null;
        return <p key={index}>{renderInlineMarkdown(block.text)}</p>;
      })}
    </>
  );
}

function ActivityOptions({ options }: { options: Array<{ title: string; body: string }> }) {
  return (
    <div className="activity-option-grid language-option-grid">
      {options.map((option, index) => (
        <article className="activity-option-card" key={option.title}>
          <span>{index + 1}</span>
          <h4>{option.title.replace(/^Option\s+\d+:\s*/, "")}</h4>
          <p>{option.body}</p>
        </article>
      ))}
    </div>
  );
}

function ChipRow({ text, variant = "language" }: { text: string; variant?: "language" | "support" }) {
  const items = text.split("｜").map(cleanText).filter(Boolean);
  return (
    <div className={variant === "support" ? "chip-row support-chip-row" : "chip-row"}>
      {items.map((item) => (
        <span className={getChipClassName(item, variant)} key={item}>
          {item.replace(/\[Optional Challenge\]\s*/g, "")}
        </span>
      ))}
    </div>
  );
}

function RoutineFlow({ text }: { text: string }) {
  const items = text.replace(/---/g, "").split("→").map(cleanText).filter(Boolean);
  return (
    <div className="routine-flow">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function parseMarkdownText(text: string, allowChipLists = false) {
  const normalized = text.trim();
  if (!normalized) return [];

  if (/^####\s+Option\s+\d+:/m.test(normalized)) {
    const parts = normalized.split(/^####\s+/m).filter(Boolean);
    return [
      {
        type: "options" as const,
        options: parts.map((part) => {
          const [title = "", ...body] = part.split(/\r?\n/);
          return { title: cleanText(title), body: cleanOptionBody(body.join(" ")) };
        }),
      },
    ];
  }

  const blocks: Array<{ type: "heading" | "paragraph" | "chips" | "routine" | "rule"; text: string }> = [];
  for (const chunk of normalized.split(/\n{2,}/)) {
    const clean = compactText(chunk);
    if (!clean) continue;
    if (/^-{3,}$/.test(clean)) {
      blocks.push({ type: "rule", text: clean });
    } else if (/^#{3,4}\s+/.test(clean)) {
      blocks.push({ type: "heading", text: cleanText(clean.replace(/^#{3,4}\s+/, "")) });
    } else if (allowChipLists && isTokenList(clean)) {
      blocks.push({ type: "chips", text: clean });
    } else if (clean.includes("→")) {
      blocks.push({ type: "routine", text: clean });
    } else {
      blocks.push({ type: "paragraph", text: clean });
    }
  }
  return blocks;
}

function createLanguageFeedbackContext(unit: LanguageUnitData, week: LanguageUnitWeek, lesson: LanguageUnitLesson): FeedbackContext {
  return {
    course_code: `W${week.week}`,
    course_title: shortWeekTitle(week),
    course_type: "language",
    language: "en",
    lesson_id: `${unit.level.toLowerCase()}-${unit.unitNumber === 0 ? "uh" : `u${String(unit.unitNumber).padStart(2, "0")}`}-week-${week.week}-lesson-${lesson.lesson}`,
    lesson_title: lesson.title,
    level: unit.level,
    page_url: window.location.pathname,
    unit_id: unit.unitId,
    unit_number: unit.unitNumber,
    unit_title: unit.title,
  };
}

function getUnitPath(unit: LanguageUnitData) {
  const unitSlug = unit.unitNumber === 0 ? "unit-uh" : `unit-${String(unit.unitNumber).padStart(2, "0")}`;
  return `/curriculum/${unit.level.toLowerCase()}/language/${unitSlug}`;
}

function getUnitLabel(unit: LanguageUnitData) {
  return unit.unitNumber === 0 ? "Unit Hello" : `Unit ${unit.unitNumber}`;
}

function shortWeekTitle(week: LanguageUnitWeek) {
  return week.sourceWeek.replace(/^Week\s+\d+:\s*/, "");
}

function cleanText(value: string) {
  return value.replace(/\*\*(.*?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1").replace(/\s+/g, " ").trim();
}

function cleanOptionBody(value: string) {
  return cleanText(value.replace(/(?:^|\s)-{3,}\s*$/g, ""));
}

function compactText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isTokenList(value: string) {
  if (!value.includes("｜")) return false;
  const withoutMarkdown = value.replace(/^#{3,4}\s+/gm, "").trim();
  if (/[。！？]/.test(withoutMarkdown)) return false;
  const parts = withoutMarkdown.split("｜").map((item) => item.trim()).filter(Boolean);
  if (parts.length < 2) return false;
  const longProseParts = parts.filter((part) => part.split(/\s+/).length > 8);
  return longProseParts.length === 0;
}

function getTokenVariant(sectionTitle?: string) {
  const normalized = sectionTitle?.toLowerCase() ?? "";
  if (normalized.includes("yle") || normalized.includes("not yet")) return "support";
  return "language";
}

function shouldForceTokenLists(sectionTitle?: string) {
  return isLanguageChipSection(sectionTitle);
}

function renderInlineMarkdown(text: string): ReactNode {
  const displayText = text.replace(/\[Optional Challenge\]\s*/g, "");
  if (isTokenList(displayText)) {
    return renderInlineTokenList(displayText);
  }
  const parts = displayText.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <Fragment key={index}>{renderInlineTokenList(part.slice(1, -1))}</Fragment>;
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={index}>{part.replace(/\s*｜\s*/g, ", ")}</Fragment>;
  });
}

function renderInlineTokenList(text: string): ReactNode {
  const items = text.split("｜").map((item) => item.trim()).filter(Boolean);
  if (items.length < 2) {
    return <code className="inline-token">{text}</code>;
  }
  return items.map((item, index) => (
    <Fragment key={`${item}-${index}`}>
      {index > 0 ? <span className="inline-token-separator">, </span> : null}
      <code className="inline-token">{cleanText(item)}</code>
    </Fragment>
  ));
}

function isLanguageChipSection(sectionTitle?: string) {
  const normalized = sectionTitle?.toLowerCase() ?? "";
  return (
    normalized === "unit language" ||
    normalized === "core vocabulary" ||
    normalized === "new language" ||
    normalized === "recycled language" ||
    normalized === "core language" ||
    normalized === "teacher input"
  );
}

function getChipClassName(item: string, variant: "language" | "support") {
  if (variant === "support") return "chip chip-support";
  return item.includes("[Optional Challenge]") ? "chip optional" : "chip";
}

function getLanguageSectionKind(title: string) {
  const normalized = title.toLowerCase();
  if (normalized.includes("language") || normalized.includes("vocabulary")) return "language";
  if (normalized.includes("outcome")) return "outcome";
  if (normalized.includes("challenge") || normalized.includes("not yet") || normalized.includes("optional exposure")) return "boundary";
  if (normalized.includes("activity") || normalized.includes("game")) return "activity";
  if (normalized.includes("response") || normalized.includes("output")) return "teacher";
  if (normalized.includes("progression") || normalized.includes("routine")) return "weekly";
  return "overview";
}

function getOrbClass(title: string) {
  const kind = getLanguageSectionKind(title);
  if (kind === "language" || kind === "teacher") return "field-language";
  if (kind === "outcome" || kind === "boundary") return "field-outcome";
  if (kind === "activity") return "field-activity";
  return "field-step";
}

function getOrbLabel(title: string) {
  const kind = getLanguageSectionKind(title);
  if (kind === "language") return "Aa";
  if (kind === "outcome") return "◎";
  if (kind === "boundary") return "!";
  if (kind === "activity") return "✦";
  if (kind === "teacher") return "◌";
  return "↗";
}
