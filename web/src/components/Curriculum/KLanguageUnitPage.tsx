import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useAuth } from "../../auth/AuthProvider";
import {
  createExtension,
  deleteExtension,
  fetchExtensions,
  submitReport,
} from "../../curriculum/extensions/k2ExtensionClient";
import type { LanguageExtensionContext } from "../../curriculum/extensions/k2ExtensionClient";
import type {
  ExtensionEntry,
  ExtensionType,
  LessonExtensionState,
} from "../../curriculum/extensions/k2ExtensionTypes";
import type { LanguageUnitData } from "./LanguageUnitPage";
import type { CurriculumLevel } from "../../curriculum/types";
import { getLessonLanguageClassification } from "../../curriculum/languageClassifications";
import type { ClassifiedLanguageItem } from "../../curriculum/languageClassifications";
import { YleWordBankDialog } from "./YleWordBankDialog";
import {
  buildPowerUpSourceGroups,
  loadPowerUpResourceManifest,
  type PowerUpSourceResource,
} from "../../curriculum/resources/powerUpResources";
import {
  deleteLessonOverride,
  fetchLessonOverrides,
  saveLessonOverride,
  type LessonOverrideValue,
} from "../../curriculum/overrides/languageLessonOverridesClient";

const K2_FIELD_ORDER = [
  "Lesson Role",
  "Lesson Outcome",
  "New Language",
  "Recycled Language",
  "Mission",
  "Mini Mission",
  "Source",
] as const;

const PLACEHOLDER_FIELD_ORDER = [
  "Lesson Role",
  "Status",
] as const;

const fieldOrbClass: Record<string, string> = {
  "Lesson Role": "field-step",
  "Source": "field-challenge",
  "Lesson Outcome": "field-outcome",
  "New Language": "field-language",
  "Recycled Language": "field-recycled",
  "Mission": "field-output",
  "Mini Mission": "field-output",
  "Status": "field-challenge",
};

const fieldOrbLabel: Record<string, string> = {
  "Lesson Role": "↗",
  "Source": "↗",
  "Lesson Outcome": "◎",
  "New Language": "Aa",
  "Recycled Language": "↻",
  "Mission": "M",
  "Mini Mission": "M",
  "Status": "…",
};

export function KLanguageUnitPage({ unit }: { unit: LanguageUnitData }) {
  const params = useParams();
  const selectedId = params.courseSlug;

  const selectedWeek = unit.weeks.find((w) => w.id === selectedId);
  const allLessons = unit.weeks.flatMap((w) => w.lessons.map((l) => ({ lesson: l, week: w })));
  const selectedLessonItem = allLessons.find((item) => item.lesson.id === selectedId);

  const viewLabel = selectedLessonItem
    ? `Week ${selectedLessonItem.week.week} / Day ${getDayNumber(selectedLessonItem.week, selectedLessonItem.lesson)}`
    : selectedWeek
    ? `Week ${selectedWeek.week} / Overview`
    : "Unit Overview";

  const options = [
    { label: "Unit 1 Overview", value: getUnitPath(unit) },
    ...unit.weeks.flatMap((week) => [
      { label: `Week ${week.week} Overview · ${shortWeekLabel(week)}`, value: `${getUnitPath(unit)}/${week.id}` },
      ...week.lessons.map((lesson) => ({
        label: `Week ${week.week} Day ${getDayNumber(week, lesson)} · ${lesson.title}`,
        value: `${getUnitPath(unit)}/${lesson.id}`,
      })),
    ]),
  ];
  const currentPath = selectedId ? `${getUnitPath(unit)}/${selectedId}` : getUnitPath(unit);

  return (
    <main className="lesson-pack-shell">
      <aside className="lesson-directory-wrap" aria-label="Lesson navigation">
        <div className="lesson-directory-title">
          <h1>Lesson Directory</h1>
        </div>
        <select
          className="mobile-directory-select"
          aria-label="Lesson navigation"
          onChange={(e) => { window.location.href = e.target.value; }}
          value={currentPath}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <nav className="lesson-directory">
          <button
            className={`unit-summary-button unit-overview-item${!selectedId ? " active" : ""}`}
            type="button"
            data-unit-overview-id="unit-overview"
            onClick={() => { window.location.href = getUnitPath(unit); }}
          >
            <span>Unit 1 Overview</span>
          </button>
          {unit.weeks.map((week) => (
            <details className={`lesson-week-group${selectedId === week.id ? " active" : ""}`} data-week={week.week} key={week.id} open>
              <summary
                onClick={() => {
                  window.location.href = `${getUnitPath(unit)}/${week.id}`;
                }}
              >
                <span>Week {week.week}</span>
                <strong>{shortWeekLabel(week)}</strong>
              </summary>
              <div className="lesson-week-list">
                {week.lessons.map((lesson) => (
                  <Link
                    className={`lesson-directory-item${selectedId === lesson.id ? " active" : ""}`}
                    data-lesson-id={lesson.id}
                    key={lesson.id}
                    to={`${getUnitPath(unit)}/${lesson.id}`}
                  >
                    <span className="lesson-kicker">Day {getDayNumber(week, lesson)}</span>
                    <strong className="lesson-name">
                      {unit.level !== "PK" && lesson.lesson > 0 ? (
                        <span className="k-language-pu-id">PU L{lesson.lesson}</span>
                      ) : null}
                      {lesson.title}
                    </strong>
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </nav>
      </aside>
      <section className="lesson-content-panel">
        {selectedLessonItem ? null : (
          <header className="lesson-pack-header">
            <div>
              <p className="lesson-breadcrumb">{unit.level} {unitLabel(unit)} / {viewLabel}</p>
              <h2>{unit.level} {unitLabel(unit)}: {unit.title}</h2>
              <div className="hero-rule" aria-hidden="true" />
            </div>
            <div className="hero-art" aria-hidden="true">
              <img src="/assets/eastie_dolphins.png" alt="" />
            </div>
          </header>
        )}
        <article className="lesson-frame">
          {selectedLessonItem ? (
            <KLessonDetail
              key={`${unit.unitId}-${selectedLessonItem.lesson.id}`}
              lesson={selectedLessonItem.lesson}
              unit={unit}
              week={selectedLessonItem.week}
            />
          ) : selectedWeek ? (
            <KWeekOverview unit={unit} week={selectedWeek} />
          ) : (
            <KLanguageUnitOverview unit={unit} />
          )}
        </article>
      </section>
    </main>
  );
}

function shortWeekLabel(week: LanguageUnitData["weeks"][number]) {
  let label = week.title.replace(/^Week \d+: /, "");
  label = label.replace(/^Power Up Starter /, "PU ");
  label = label.replace(/^Power Up /, "PU ");
  label = label.replace(/^Showcase Week/, "Showcase");
  label = label.replace(/(\w\d-\d+) \+ /, "$1+ ");
  return label;
}

function getLessonLabel(week: { week: number }, lesson: { lesson: number; title: string; id: string }, level?: string) {
  if (level === "PK" && lesson.lesson > 0) return `Lesson ${lesson.lesson}`;
  if (lesson.lesson > 0) return `PU L${lesson.lesson}`;
  if (lesson.id.startsWith("mission-extend")) return `Mission Extend ${week.week}`;
  return `Showcase L${lesson.id.replace("showcase-lesson-", "")}`;
}

/* ── Unit Overview ── */

function KLanguageUnitOverview({ unit }: { unit: LanguageUnitData }) {
  const overviewOverrides = useUnitLanguageOverrides(unit);

  function findSection(...titles: string[]) {
    for (const t of titles) {
      const s = unit.overview.sections.find((s) => s.title === t);
      if (s) return s;
    }
    return null;
  }

  const outcomesSection = findSection("Unit Outcomes");
  const missionSection = findSection("Power Up Mini Mission", "Power Up Mission");
  const showcaseSection = findSection("Showcase");
  const languageSummary = useMemo(
    () => buildUnitLanguageSummary(unit, overviewOverrides.overridesByLesson),
    [overviewOverrides.overridesByLesson, unit],
  );

  const outcomeItems = outcomesSection
    ? outcomesSection.body.split(/[｜|]/).map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <>
      <section className="lesson-field-card unit-overview-field">
        <div className="lesson-field-body">
          <h3>Unit Outcomes</h3>
          {outcomeItems.length > 0 ? (
            <ul>{outcomeItems.map((item) => <li key={item}>{item}</li>)}</ul>
          ) : (
            <p>{outcomesSection?.body}</p>
          )}
        </div>
      </section>
      <section className="lesson-field-card unit-overview-field">
        <div className="lesson-field-body">
          <h3>Language Summary</h3>
          <p className="muted">
            Latest lesson-level language after teacher edits; duplicates removed.
            {overviewOverrides.status === "loading" ? " Loading edits..." : null}
          </p>
          <div className="k-language-overview-summary">
            <section>
              <div className="k-language-overview-heading">
                <h4>Keywords</h4>
                <span>{languageSummary.keywords.length}</span>
              </div>
              {languageSummary.keywords.length ? (
                <div className="k-language-token-row">
                  {languageSummary.keywords.map((item) => <span className="k-language-token keyword-chip" key={`keyword-${item.text}`}>{item.text}</span>)}
                </div>
              ) : (
                <p className="k-language-empty-note">No keywords listed yet.</p>
              )}
            </section>
            <section>
              <div className="k-language-overview-heading">
                <h4>Target Language</h4>
                <span>{languageSummary.targetLanguage.length}</span>
              </div>
              {languageSummary.targetLanguage.length ? (
                <div className="k-language-token-row">
                  {languageSummary.targetLanguage.map((item) => <span className="k-language-token target-chip selected-as-sentence" key={`target-${item.text}`}>{item.text}</span>)}
                </div>
              ) : (
                <p className="k-language-empty-note">No target language listed yet.</p>
              )}
            </section>
          </div>
        </div>
      </section>
      {missionSection ? (
        <section className="lesson-field-card unit-overview-field">
          <div className="lesson-field-body">
            <h3>{missionSection.title}</h3>
            <ParagraphDisplay value={missionSection.body} />
          </div>
        </section>
      ) : null}
      <section className="lesson-field-card unit-overview-field">
        <div className="lesson-field-body">
          <h3>4-Week Structure</h3>
          <div className="week-grid" style={{ marginTop: "10px" }}>
            {unit.weeks.map((week) => (
              <article className="week-card" key={week.id}>
                <p className="week-label">Week {week.week}</p>
                <h4>{shortWeekLabel(week)}</h4>
                <p>{week.weeklyOutcome}</p>
                <Link className="track-link-label" to={`${getUnitPath(unit)}/${week.id}`}>Open week</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      {showcaseSection ? (
        <section className="lesson-field-card unit-overview-field">
          <div className="lesson-field-body">
            <h3>Showcase</h3>
            <ParagraphDisplay value={showcaseSection.body} />
          </div>
        </section>
      ) : null}
    </>
  );
}

/* ── Week Overview ── */

function KWeekOverview({
  unit,
  week,
}: {
  unit: LanguageUnitData;
  week: LanguageUnitData["weeks"][number];
}) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const overviewOverrides = useUnitLanguageOverrides(unit);
  const weekSummary = useMemo(
    () => buildWeekLanguageSummary(unit, week, overviewOverrides.overridesByLesson),
    [overviewOverrides.overridesByLesson, unit, week],
  );
  const teacherSummaryText = buildWeekSummaryText({
    unitTitle: unit.title,
    weekTheme: shortWeekLabel(week),
    keywords: weekSummary.keywords,
    targetLanguage: weekSummary.targetLanguage,
    phonics: weekSummary.phonics,
    songs: weekSummary.songs,
  });

  return (
    <>
      <section className="lesson-field-card unit-overview-field">
        <div className="lesson-field-body">
          <div className="k-week-overview-head">
            <div>
              <h3>Week {week.week} Overview</h3>
              <p className="muted">
                Auto-generated from this week's lesson content.
                {overviewOverrides.status === "loading" ? " Loading teacher edits..." : null}
              </p>
            </div>
            <button className="k-language-summary-button" type="button" onClick={() => setSummaryOpen(true)}>
              Generate Week Summary
            </button>
          </div>
          <p>{week.weeklyOutcome}</p>
          <div className="k-week-summary-grid">
            <SummaryLine label="Unit Theme" value={unit.title} />
            <SummaryLine label="Week Theme" value={shortWeekLabel(week)} />
            <SummaryLine label="Key Words">
              <SummaryChipRow items={weekSummary.keywords} emptyText="No keywords listed yet" />
            </SummaryLine>
            <SummaryLine label="Target Language">
              <SummaryChipRow items={weekSummary.targetLanguage} emptyText="No target language listed yet" sentence />
            </SummaryLine>
            <SummaryLine label="Phonics" value={weekSummary.phonics.join(" / ")} />
            <SummaryLine label="Songs" value={weekSummary.songs.join(", ")} />
          </div>
        </div>
      </section>
      {week.coreLanguage ? (
        <section className="lesson-field-card unit-overview-field">
          <div className="lesson-field-body">
            <h3>Core Language</h3>
            <PillDisplay value={week.coreLanguage} />
          </div>
        </section>
      ) : null}
      <section className="lesson-field-card unit-overview-field">
        <div className="lesson-field-body">
          <h3>Week {week.week} Lessons</h3>
          <div className="lesson-grid" style={{ marginTop: "10px" }}>
            {week.lessons.map((lesson) => (
              <Link
                className="k2-week-lesson-card"
                key={lesson.id}
                to={`${getUnitPath(unit)}/${lesson.id}`}
              >
                <span className="lesson-kicker">Day {getDayNumber(week, lesson)}</span>
                <h5>{lesson.title}</h5>
                {lesson.fields["Lesson Outcome"] && lesson.fields["Lesson Outcome"] !== "(none listed)" ? (
                  <p>{lesson.fields["Lesson Outcome"]}</p>
                ) : null}
                <span className="track-link-label">Open lesson frame</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {summaryOpen ? <DailySummaryDialog title="Week Summary" text={teacherSummaryText} onClose={() => setSummaryOpen(false)} /> : null}
    </>
  );
}

function SummaryLine({ label, value, children }: { label: string; value?: string; children?: ReactNode }) {
  return (
    <div className="k-week-summary-line">
      <span>{label}</span>
      {children ?? <strong>{value || "Not listed yet"}</strong>}
    </div>
  );
}

function SummaryChipRow({
  emptyText,
  items,
  sentence = false,
}: {
  emptyText: string;
  items: ClassifiedLanguageItem[];
  sentence?: boolean;
}) {
  if (!items.length) return <strong>{emptyText}</strong>;
  return (
    <div className="k-week-summary-chip-row">
      {items.map((item) => (
        <span
          className={`k-language-token source-${(item.source ?? "PU").toLowerCase()}${sentence ? " selected-as-sentence" : ""}`}
          key={`${sentence ? "target" : "keyword"}-${item.text}`}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}

/* ── Lesson Detail ── */

function KLessonDetail({
  lesson,
  unit,
  week,
}: {
  lesson: LanguageUnitData["weeks"][number]["lessons"][number];
  unit: LanguageUnitData;
  week: LanguageUnitData["weeks"][number];
}) {
  const isPk = unit.level === "PK";
  const isPowerUp = !isPk && lesson.lesson > 0;
  const [reportOpen, setReportOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const dayNumber = getDayNumber(week, lesson);
  const editor = useLanguageOverrideEditor(unit, lesson.id);
  const baseLanguageFocus = buildLanguageFocus(unit.unitId, lesson);
  const languageFocus = {
    keywords: editor.getKeywords(baseLanguageFocus.keywords),
    targetLanguage: editor.getTargetLanguage(baseLanguageFocus.targetLanguage),
  };
  const targetLanguageItems = languageFocus.targetLanguage;
  const lessonRole = editor.getText("Lesson Role", lesson.fields["Lesson Role"] ?? "");
  const lessonOutcome = editor.getText("Lesson Outcome", lesson.fields["Lesson Outcome"] ?? "");
  const source = editor.getText("Source", lesson.fields["Source"] ?? "");
  const mission = lesson.fields["Mission"] || lesson.fields["Mini Mission"] || "";
  const activities = editor.getText("Suggested Activity / Game", lesson.fields["Suggested Activity / Game"] ?? "");
  const differentiation = editor.getText("Differentiation", lesson.fields["Differentiation"] ?? "");
  const circleTopic = editor.getText("Circle Time Topic", lesson.fields["Circle Time Topic"] ?? "To be added in EASTIE circle-time content.");
  const circleSong = editor.getText("Circle Time Song", lesson.fields["Circle Time Song"] ?? "To be added in EASTIE circle-time content.");
  const phonicsContent = editor.getText("Phonics Content", lesson.fields["Phonics Content"] ?? "Phonics content placeholder. This will be filled from EASTIE day-level design.");
  const storyContent = editor.getText("Story", lesson.fields["Story"] ?? "Story content placeholder. This will be filled from EASTIE day-level design.");

  const dailySummaryText = buildDailySummaryText({
    unitTitle: unit.title,
    lessonOutcome,
    circleTopic,
    circleSong,
    storyContent,
    phonicsContent,
    keywords: languageFocus.keywords,
    targetLanguage: languageFocus.targetLanguage,
  });

  if (!isPowerUp) {
    return (
      <KNonPowerUpDayDetail
        dayNumber={dayNumber}
        lesson={lesson}
        unit={unit}
        week={week}
      />
    );
  }

  return (
    <div className="k-language-day-page">
      <header className="k-language-day-header">
        <div>
          <p className="k-language-day-meta">
            {unit.level} / {unitLabel(unit)}
            <span>Theme: {unit.title}</span>
          </p>
          <h1>Day {dayNumber}, Week {week.week}</h1>
        </div>
        <div className="k-language-day-header-actions">
          <button className="k-language-summary-button" type="button" onClick={() => setSummaryOpen(true)}>
            Generate Daily Summary
          </button>
        </div>
      </header>

      <KDayPart title="Circle Time">
        <div className="k-language-placeholder-grid">
          <PlaceholderBlock title="Topic" value={circleTopic} actionLabel="Edit" onAction={() => editor.openText("Circle Time Topic", "Circle Time Topic", lesson.fields["Circle Time Topic"] ?? "")} modified={editor.isModified("Circle Time Topic")} />
          <PlaceholderBlock title="Song" value={circleSong} actionLabel="Edit" onAction={() => editor.openText("Circle Time Song", "Circle Time Song", lesson.fields["Circle Time Song"] ?? "")} modified={editor.isModified("Circle Time Song")} />
        </div>
      </KDayPart>

      <KDayPart
        title="CLIL Class"
        subtitle={
          <span className="k-language-role-chip">
            <strong>{getLessonLabel(week, lesson, unit.level)}</strong>
            {lessonRole || lesson.title}
          </span>
        }
      >
        {lessonOutcome ? (
          <KDayCard title="Lesson Outcome" actionLabel="Edit" onAction={() => editor.openText("Lesson Outcome", "Lesson Outcome", lesson.fields["Lesson Outcome"] ?? "")} modified={editor.isModified("Lesson Outcome")}>
            <p>{lessonOutcome}</p>
          </KDayCard>
        ) : null}
        {source ? (
          <KDayCard title="Source" actionLabel="Report Issues" onAction={() => setReportOpen(true)}>
            <SourceDisplay value={source} lessonId={lesson.id} level={unit.level} unitNumber={unit.unitNumber} />
          </KDayCard>
        ) : null}
        {mission ? (
          <KDayCard title={lesson.fields["Mission"] ? "Mission" : "Mini Mission"}>
            <ParagraphDisplay value={mission} />
          </KDayCard>
        ) : null}
        <div className="k-language-clil-card-grid">
          <LanguageFocusGroup
            title="Keywords"
            actionLabel="Edit"
            onAction={() => editor.openItems("Keywords", "Keywords", baseLanguageFocus.keywords)}
            items={languageFocus.keywords}
            modified={editor.isKeywordsModified()}
          />
          <KDayCard title="Target Language" actionLabel="Edit" onAction={() => editor.openItems("Target Language", "Target Language", baseLanguageFocus.targetLanguage)} modified={editor.isTargetLanguageModified()}>
            {targetLanguageItems.length ? (
              <div className="k-language-target-review">
                <div className="k-language-token-row">
                  {targetLanguageItems.map((item) => (
                    <span className="k-language-token selected-as-sentence" key={`target-${item.text}`}>
                      {item.text}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="k-language-empty-note">No target language is classified for this day yet.</p>
            )}
          </KDayCard>
        </div>

        <KDayCard title="Activities and Games" actionLabel="Edit" onAction={() => editor.openText("Suggested Activity / Game", "Activities and Games", lesson.fields["Suggested Activity / Game"] ?? "")} modified={editor.isModified("Suggested Activity / Game")}>
          {activities ? (
            <ActivityList value={activities} />
          ) : (
            <p className="k-language-empty-note">Activities and games will be added in EASTIE day-level design.</p>
          )}
        </KDayCard>
        {differentiation ? (
          <KDayCard title="Differentiation" actionLabel="Edit" onAction={() => editor.openText("Differentiation", "Differentiation", lesson.fields["Differentiation"] ?? "")} modified={editor.isModified("Differentiation")}>
            <ParagraphDisplay value={differentiation} />
          </KDayCard>
        ) : null}
      </KDayPart>

      <KDayPart title="Phonics">
        <PlaceholderBlock value={phonicsContent} actionLabel="Edit" onAction={() => editor.openText("Phonics Content", "Phonics", lesson.fields["Phonics Content"] ?? "")} modified={editor.isModified("Phonics Content")} />
      </KDayPart>

      <KDayPart title="Story">
        <StoryDisplay value={storyContent} onEdit={() => editor.openText("Story", "Story", lesson.fields["Story"] ?? "")} modified={editor.isModified("Story")} />
      </KDayPart>

      <KReportDialog
        extensionContext={{ level: unit.level, unitId: unit.unitId }}
        lessonId={lesson.id}
        open={reportOpen}
        onOpenChange={setReportOpen}
      />
      {summaryOpen ? <DailySummaryDialog text={dailySummaryText} onClose={() => setSummaryOpen(false)} /> : null}
      {editor.dialog}
    </div>
  );
}

function KNonPowerUpDayDetail({
  dayNumber,
  lesson,
  unit,
  week,
}: {
  dayNumber: number;
  lesson: LanguageUnitData["weeks"][number]["lessons"][number];
  unit: LanguageUnitData;
  week: LanguageUnitData["weeks"][number];
}) {
  const editor = useLanguageOverrideEditor(unit, lesson.id);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const baseLanguageFocus = buildLanguageFocus(unit.unitId, lesson);
  const languageFocus = {
    keywords: editor.getKeywords(baseLanguageFocus.keywords),
    targetLanguage: editor.getTargetLanguage(baseLanguageFocus.targetLanguage),
  };
  const lessonRole = editor.getText("Lesson Role", lesson.fields["Lesson Role"] || lesson.title);
  const lessonStatus = lesson.fields["Status"] ?? "";
  const lessonOutcome = editor.getText("Lesson Outcome", lesson.fields["Lesson Outcome"] ?? "");
  const source = editor.getText("Source", lesson.fields["Source"] ?? "");
  const activities = editor.getText("Suggested Activity / Game", lesson.fields["Suggested Activity / Game"] ?? "");
  const differentiation = editor.getText("Differentiation", lesson.fields["Differentiation"] ?? "");
  const circleTopic = editor.getText("Circle Time Topic", lesson.fields["Circle Time Topic"] ?? "To be added in EASTIE circle-time content.");
  const circleSong = editor.getText("Circle Time Song", lesson.fields["Circle Time Song"] ?? "To be added in EASTIE circle-time content.");
  const phonicsContent = editor.getText("Phonics Content", lesson.fields["Phonics Content"] ?? "Phonics content placeholder. This will be filled from EASTIE day-level design.");
  const storyContent = editor.getText("Story", lesson.fields["Story"] ?? "Story content placeholder. This will be filled from EASTIE day-level design.");

  const dailySummaryText = buildDailySummaryText({
    unitTitle: unit.title,
    lessonOutcome,
    circleTopic,
    circleSong,
    storyContent,
    phonicsContent,
    keywords: languageFocus.keywords,
    targetLanguage: languageFocus.targetLanguage,
  });

  return (
    <div className="k-language-day-page">
      <header className="k-language-day-header">
        <div>
          <p className="k-language-day-meta">
            {unit.level} / {unitLabel(unit)}
            <span>Theme: {unit.title}</span>
          </p>
          <h1>Day {dayNumber}, Week {week.week}</h1>
        </div>
        <div className="k-language-day-header-actions">
          <button className="k-language-summary-button" type="button" onClick={() => setSummaryOpen(true)}>
            Generate Daily Summary
          </button>
        </div>
      </header>

      <KDayPart title="Circle Time">
        <div className="k-language-placeholder-grid">
          <PlaceholderBlock title="Topic" value={circleTopic} actionLabel="Edit" onAction={() => editor.openText("Circle Time Topic", "Circle Time Topic", lesson.fields["Circle Time Topic"] ?? "")} modified={editor.isModified("Circle Time Topic")} />
          <PlaceholderBlock title="Song" value={circleSong} actionLabel="Edit" onAction={() => editor.openText("Circle Time Song", "Circle Time Song", lesson.fields["Circle Time Song"] ?? "")} modified={editor.isModified("Circle Time Song")} />
        </div>
      </KDayPart>

      <KDayPart
        title="CLIL Class"
        subtitle={
          <span className="k-language-role-chip eastie-role-chip">
            <strong>EASTIE</strong>
            {lessonRole}
          </span>
        }
      >
        <KDayCard title="Lesson Outcome" actionLabel="Edit" onAction={() => editor.openText("Lesson Outcome", "Lesson Outcome", lesson.fields["Lesson Outcome"] ?? "")} modified={editor.isModified("Lesson Outcome")}>
          {lessonOutcome ? <p>{lessonOutcome}</p> : <p className="k-language-empty-note">Lesson outcome will be added in EASTIE day-level design.</p>}
          {lessonStatus ? <ParagraphDisplay value={lessonStatus} /> : null}
        </KDayCard>

        {unit.level === "PK" ? null : (
          <KDayCard title="Source" actionLabel="Edit" onAction={() => editor.openText("Source", "Source", lesson.fields["Source"] ?? "")} modified={editor.isModified("Source")}>
            {source ? (
              <SourceDisplay value={source} lessonId={lesson.id} level={unit.level} unitNumber={unit.unitNumber} />
            ) : (
              <p className="k-language-empty-note">Teacher-provided source or classroom material reference will be added here.</p>
            )}
          </KDayCard>
        )}

        <div className="k-language-clil-card-grid">
          <LanguageFocusGroup
            title="Keywords"
            actionLabel="Edit"
            onAction={() => editor.openItems("Keywords", "Keywords", baseLanguageFocus.keywords)}
            items={languageFocus.keywords}
            modified={editor.isKeywordsModified()}
            emptyText="Keywords will be added in EASTIE day-level design."
          />
          <KDayCard title="Target Language" actionLabel="Edit" onAction={() => editor.openItems("Target Language", "Target Language", baseLanguageFocus.targetLanguage)} modified={editor.isTargetLanguageModified()}>
            {languageFocus.targetLanguage.length ? (
              <div className="k-language-token-row">
                {languageFocus.targetLanguage.map((item) => (
                  <span className="k-language-token selected-as-sentence" key={`target-${item.text}`}>
                    {item.text}
                  </span>
                ))}
              </div>
            ) : (
              <p className="k-language-empty-note">Target language will be added in EASTIE day-level design.</p>
            )}
          </KDayCard>
        </div>

        <KDayCard title="Activities and Games" actionLabel="Edit" onAction={() => editor.openText("Suggested Activity / Game", "Activities and Games", lesson.fields["Suggested Activity / Game"] ?? "")} modified={editor.isModified("Suggested Activity / Game")}>
          {activities ? <ActivityList value={activities} /> : <p className="k-language-empty-note">Activities and games will be added in EASTIE day-level design.</p>}
        </KDayCard>
        {differentiation ? (
          <KDayCard title="Differentiation" actionLabel="Edit" onAction={() => editor.openText("Differentiation", "Differentiation", lesson.fields["Differentiation"] ?? "")} modified={editor.isModified("Differentiation")}>
            <ParagraphDisplay value={differentiation} />
          </KDayCard>
        ) : null}
      </KDayPart>

      <KDayPart title="Phonics">
        <PlaceholderBlock value={phonicsContent} actionLabel="Edit" onAction={() => editor.openText("Phonics Content", "Phonics", lesson.fields["Phonics Content"] ?? "")} modified={editor.isModified("Phonics Content")} />
      </KDayPart>

      <KDayPart title="Story">
        <StoryDisplay value={storyContent} onEdit={() => editor.openText("Story", "Story", lesson.fields["Story"] ?? "")} modified={editor.isModified("Story")} />
      </KDayPart>
      {summaryOpen ? <DailySummaryDialog text={dailySummaryText} onClose={() => setSummaryOpen(false)} /> : null}
      {editor.dialog}
    </div>
  );
}

function KLessonFieldCard({ field, value, lessonId, isPowerUp, level, unitNumber }: { field: string; value: string; lessonId?: string; isPowerUp?: boolean; level?: string; unitNumber?: number }) {
  const isSource = field === "Source";
  const isPillField = field === "New Language" || field === "Recycled Language";
  const optionalClass = isPowerUp === false ? " k2-placeholder-field" : "";
  const kind = getFieldKind(field);

  return (
    <section className={`lesson-field-card lesson-detail-field card-kind-${kind}${optionalClass}`}>
      <div className={`field-orb ${fieldOrbClass[field] ?? "field-step"}`} aria-hidden="true">
        <span>{fieldOrbLabel[field] ?? "↗"}</span>
      </div>
      <div className="lesson-field-body">
        <h3>{field}</h3>
        {isSource ? (
          <SourceDisplay value={value} lessonId={lessonId ?? ""} level={level} unitNumber={unitNumber} />
        ) : isPillField ? (
          <PillDisplay value={value} />
        ) : (
          <ParagraphDisplay value={value} />
        )}
      </div>
    </section>
  );
}

function KDayPart({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="k-language-day-part">
      <div className="k-language-part-head">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className="k-language-part-body">{children}</div>
    </section>
  );
}

function KDayCard({
  title,
  actionLabel,
  onAction,
  modified = false,
  className,
  children,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  modified?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`k-language-day-card${className ? ` ${className}` : ""}`}>
      <div className="k-language-card-head">
        <div className="k-language-card-title-row">
          <h3>{title}</h3>
          {modified ? <span className="k-language-modified-badge">Edited</span> : null}
        </div>
        {actionLabel ? <button className="k-language-modify-button" type="button" onClick={onAction}>{actionLabel}</button> : null}
      </div>
      <div className="k-language-card-body">{children}</div>
    </section>
  );
}

function PlaceholderBlock({
  title,
  value,
  actionLabel,
  onAction,
  modified = false,
}: {
  title?: string;
  value: string;
  actionLabel?: string;
  onAction?: () => void;
  modified?: boolean;
}) {
  return (
    <div className="k-language-placeholder-block">
      <div className={`k-language-placeholder-head${title ? "" : " no-title"}`}>
        {title ? (
          <span className="k-language-placeholder-title-row">
            <h4>{title}</h4>
            {modified ? <span className="k-language-modified-badge">Edited</span> : null}
          </span>
        ) : modified ? <span className="k-language-modified-badge">Edited</span> : null}
        {actionLabel ? <button className="k-language-modify-button" type="button" onClick={onAction}>{actionLabel}</button> : null}
      </div>
      <p>{value}</p>
    </div>
  );
}

function StoryDisplay({ value, onEdit, modified = false }: { value: string; onEdit?: () => void; modified?: boolean }) {
  const sections = splitKeyedContent(value);
  if (!sections.length) {
    return <PlaceholderBlock value={value} actionLabel="Edit" onAction={onEdit} modified={modified} />;
  }

  return (
    <div className="k-language-story-grid">
      {sections.map((section) => (
        <div className="k-language-story-block" key={`${section.title}-${section.body}`}>
          <div className="k-language-story-block-head">
            <span className="k-language-placeholder-title-row">
              <h3>{section.title}</h3>
              {modified ? <span className="k-language-modified-badge">Edited</span> : null}
            </span>
            <button className="k-language-modify-button" type="button" onClick={onEdit}>Edit</button>
          </div>
          <p>{section.body}</p>
        </div>
      ))}
    </div>
  );
}

function LanguageFocusGroup({
  title,
  actionLabel,
  onAction,
  items,
  selectedItems,
  onToggleItem,
  modified = false,
  separated = false,
  emptyText = "No items listed yet.",
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  items: ClassifiedLanguageItem[];
  selectedItems?: Set<string>;
  onToggleItem?: (item: ClassifiedLanguageItem) => void;
  modified?: boolean;
  separated?: boolean;
  emptyText?: string;
}) {
  return (
    <KDayCard title={title} actionLabel={actionLabel} onAction={onAction} modified={modified} className={separated ? "k-language-separated-card" : undefined}>
      <div className="k-language-focus-group">
      {items.length ? (
        <div className="k-language-token-row">
          {items.map((item) => {
            const selected = selectedItems?.has(item.text) ?? false;
            if (!onToggleItem) {
              return (
                <span className={`k-language-token source-${(item.source ?? "PU").toLowerCase()}`} key={`${title}-${item.text}`}>
                  {item.text}
                </span>
              );
            }
            return (
              <button
                className={`k-language-token source-${(item.source ?? "PU").toLowerCase()} selectable${selected ? " selected-as-sentence" : ""}`}
                key={`${title}-${item.text}`}
                type="button"
                aria-pressed={selected}
                onClick={() => onToggleItem(item)}
              >
                {item.text}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="k-language-empty-note">{emptyText}</p>
      )}
    </div>
    </KDayCard>
  );
}

function ActivityList({ value }: { value: string }) {
  const items = splitActivityItems(value);
  if (!items.length) return <ParagraphDisplay value={value} />;
  return (
    <ol className="k-language-activity-list">
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>
          <span>{index + 1}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

function ParagraphDisplay({ value }: { value: string }) {
  if (!value || value.trim() === "None listed") {
    return <span className="empty">None listed</span>;
  }
  const paragraphs = value.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i}>{p.replace(/\n+/g, " ")}</p>
      ))}
    </>
  );
}

/* ── Source Field ── */

function SourceDisplay({ value, lessonId, level, unitNumber }: { value: string; lessonId: string; level?: string; unitNumber?: number }) {
  const [manifest, setManifest] = useState<Awaited<ReturnType<typeof loadPowerUpResourceManifest>>>(null);

  useEffect(() => {
    let active = true;
    loadPowerUpResourceManifest(level, unitNumber).then((nextManifest) => {
      if (active) setManifest(nextManifest);
    });
    return () => { active = false; };
  }, [level, unitNumber]);

  const { pdfItems, pupilBookAudio, activityBookAudio, sharedAudio, otherItems } = buildPowerUpSourceGroups(value, lessonId, manifest);
  return (
    <div className="source-ref-row">
      {pdfItems.length > 0 ? (
        <div className="source-ref-group">
          <div className="source-ref-group-title">PDF Pages</div>
          <div className="source-ref-group-items">
            {pdfItems.map((res) => (
              <SourceButton key={res.label} resource={res} />
            ))}
          </div>
        </div>
      ) : null}
      {pupilBookAudio.length > 0 || activityBookAudio.length > 0 || sharedAudio.length > 0 ? (
        <div className="source-ref-group">
          <div className="source-ref-group-title">Soundtrack</div>
          <div className="source-ref-subgroups">
            {sharedAudio.length > 0 ? (
              <div className="source-ref-subgroup">
                <div className="source-ref-subgroup-title">Pupil's Book + Activity Book</div>
                <div className="source-ref-group-items">
                  {sharedAudio.map((res) => <SourceButton key={res.label} resource={res} />)}
                </div>
              </div>
            ) : null}
            {pupilBookAudio.length > 0 ? (
              <div className="source-ref-subgroup">
                <div className="source-ref-subgroup-title">Pupil's Book</div>
                <div className="source-ref-group-items">
                  {pupilBookAudio.map((res) => <SourceButton key={res.label} resource={res} />)}
                </div>
              </div>
            ) : null}
            {activityBookAudio.length > 0 ? (
              <div className="source-ref-subgroup">
                <div className="source-ref-subgroup-title">Activity Book</div>
                <div className="source-ref-group-items">
                  {activityBookAudio.map((res) => <SourceButton key={res.label} resource={res} />)}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {otherItems.length > 0 ? (
        <div className="source-ref-group">
          <div className="source-ref-group-title">References</div>
          <div className="source-ref-group-items">
            {otherItems.map((res) => (
              <SourceButton key={res.label} resource={res} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SourceButton({ resource }: { resource: PowerUpSourceResource }) {
  const filename = resource.href?.split("/").pop()?.replace(/%20/g, " ") ?? "";
  return (
    <span className="source-audio-pair">
      <a className="source-ref" href={resource.href || "#"} target="_blank" rel="noopener">
        <span className={`source-ref-icon ${resource.role ? `source-ref-icon-${resource.role.toLowerCase()}` : ""}`} aria-hidden="true">{resource.icon}</span>
        <span className="source-ref-text">
          <span className="source-ref-label">{resource.label}</span>
        </span>
      </a>
      {resource.download && resource.href ? (
        <a className="source-ref source-download" href={resource.href} download={filename} target="_blank" rel="noopener"
          title={`Download ${resource.label}`} aria-label={`Download ${resource.label}`}>
          <span className="source-ref-icon" aria-hidden="true">↓</span>
        </a>
      ) : null}
    </span>
  );
}

function PillDisplay({ value }: { value: string }) {
  if (!value || value.trim() === "None listed") return <span className="empty">None listed</span>;
  if (!value.includes("｜")) return <p>{value}</p>;
  const items = value.split("｜").map((s) => s.trim()).filter(Boolean);
  return (
    <div className="pill-row">
      {items.map((item) => (
        <span className="pill" key={item}>{item}</span>
      ))}
    </div>
  );
}

/* ── Extension Tools ── */

function KLessonExtensions({
  lessonId, unit, week, lesson,
  reportOpen, onReportOpenChange,
}: {
  lessonId: string;
  unit: LanguageUnitData;
  week: LanguageUnitData["weeks"][number];
  lesson: LanguageUnitData["weeks"][number]["lessons"][number];
  reportOpen: boolean;
  onReportOpenChange: (v: boolean) => void;
}) {
  const [extensions, setExtensions] = useState<LessonExtensionState>({ vocabulary: [], sentences: [], activities: [] });
  const [extVocabInput, setExtVocabInput] = useState("");
  const [extSentenceInput, setExtSentenceInput] = useState("");
  const [extActivityInput, setExtActivityInput] = useState("");
  const [reportText, setReportText] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [reportError, setReportError] = useState("");
  const [loadingExt, setLoadingExt] = useState(true);
  const [extError, setExtError] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [yleOpen, setYleOpen] = useState(false);
  const { currentUser } = useAuth();
  const currentUserId = currentUser?.id ?? "";
  const extensionContext: LanguageExtensionContext = {
    level: unit.level,
    unitId: unit.unitId,
  };

  useEffect(() => {
    setLoadingExt(true);
    setExtError("");
    fetchExtensions(extensionContext, lessonId).then((state) => setExtensions(state)).catch((err) => setExtError(err.message)).finally(() => setLoadingExt(false));
  }, [lessonId, extensionContext.level, extensionContext.unitId]);

  const handleAddExt = useCallback(async (type: ExtensionType, content: string, inputSetter: (v: string) => void) => {
    if (!content.trim()) return;
    try {
      const entry = await createExtension(extensionContext, lessonId, type, content.trim());
      const key = type === "vocabulary" ? "vocabulary" : type === "sentence" ? "sentences" : "activities";
      setExtensions((prev) => ({ ...prev, [key]: [...prev[key], entry] }));
      inputSetter("");
    } catch { setExtError("Failed to add. Please try again."); }
  }, [lessonId, extensionContext.level, extensionContext.unitId]);

  const handleDeleteExt = useCallback(async (entryId: string, type: ExtensionType) => {
    try {
      await deleteExtension(extensionContext, entryId);
      const key = type === "vocabulary" ? "vocabulary" : type === "sentence" ? "sentences" : "activities";
      setExtensions((prev) => ({ ...prev, [key]: prev[key].filter((e) => e.id !== entryId) }));
    } catch { setExtError("Failed to delete. Please try again."); }
  }, [extensionContext.level, extensionContext.unitId]);

  const handleReportSubmit = useCallback(async () => {
    if (!reportText.trim()) return;
    setReportSubmitting(true);
    setReportError("");
    try {
      await submitReport(extensionContext, lessonId, reportText.trim());
      setReportSent(true);
    } catch { setReportError("Failed to submit report. Please try again."); }
    setReportSubmitting(false);
  }, [lessonId, reportText, extensionContext.level, extensionContext.unitId]);

  const renderGroupedEntries = (entries: ExtensionEntry[], type: ExtensionType) => {
    const groups = groupBy(entries, (e) => e.userId);
    if (!groups.length) return <span className="empty">No items yet.</span>;
    return groups.map((group) => (
      <div className="extension-user-group" key={group.key}>
        <div className="extension-user-name">{group.items[0].userName}</div>
        <div className={type === "vocabulary" ? "extension-user-items" : "extension-sentence-list"}>
          {group.items.map((entry) => {
            const isOwn = entry.userId === currentUserId;
            return (
              <span className={`extension-token${isOwn ? "" : " extension-locked"}`} key={entry.id}>
                {entry.content}
                {isOwn ? <button className="extension-delete" type="button" aria-label="Remove" onClick={() => handleDeleteExt(entry.id, type)}>×</button> : null}
              </span>
            );
          })}
        </div>
      </div>
    ));
  };

  const handleYleWordAdded = useCallback((entry: ExtensionEntry) => {
    setExtensions((prev) => ({ ...prev, vocabulary: [...prev.vocabulary, entry] }));
  }, []);

  return (
    <>
      <div className="eastie-extension-divider">
        <span>Above: original Power Up materials</span>
        <strong>Below: EASTIE extension content</strong>
      </div>
      {extError ? (
        <p className="lesson-feedback extension-status-note">
          EASTIE extension content is not connected for this page yet.
        </p>
      ) : null}

      <ExtensionSection title="Extended Vocabulary" inputPlaceholder="Add a vocabulary item"
        entries={extensions.vocabulary} type="vocabulary" inputValue={extVocabInput}
        onInputChange={setExtVocabInput} onAdd={handleAddExt} renderGrouped={renderGroupedEntries} loading={loadingExt}
        extraButton={<button className="extension-secondary-button" type="button" onClick={() => setYleOpen(true)}>YLE Word Bank</button>} />
      <ExtensionSection title="Extended Sentence" inputPlaceholder="Add a sentence"
        entries={extensions.sentences} type="sentence" inputValue={extSentenceInput}
        onInputChange={setExtSentenceInput} onAdd={handleAddExt} renderGrouped={renderGroupedEntries} loading={loadingExt} />
      <ExtensionSection title="Activity Ideas" inputPlaceholder="Add a classroom game or activity idea"
        entries={extensions.activities} type="activity_idea" inputValue={extActivityInput}
        onInputChange={setExtActivityInput} onAdd={handleAddExt} renderGrouped={renderGroupedEntries} loading={loadingExt} />

      {reportOpen ? (
        <div className="auth-dialog-backdrop" onClick={() => onReportOpenChange(false)}>
          <div className="k2-dialog" onClick={(e) => e.stopPropagation()} style={{ display: "grid" }}>
            <div className="dialog-body">
              <h2>Report Issues</h2>
              {reportSent ? (
                <>
                  <div className="report-success">Report submitted. Thank you.</div>
                  <div className="dialog-actions">
                    <button className="dialog-button" type="button" onClick={() => onReportOpenChange(false)}>Close</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="muted">Report issues with the original Power Up content. Your feedback helps the curriculum team.</p>
                  {reportError ? <p style={{ color: "var(--eastie-brick)" }}>{reportError}</p> : null}
                  <textarea className="dialog-textarea" placeholder="Describe the issue or suggestion..." value={reportText} onChange={(e) => setReportText(e.target.value)} />
                  <div className="dialog-actions">
                    <button className="extension-secondary-button" type="button" onClick={() => onReportOpenChange(false)}>Cancel</button>
                    <button className="dialog-button" type="button" onClick={handleReportSubmit} disabled={reportSubmitting || !reportText.trim()}>{reportSubmitting ? "Sending..." : "Send"}</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {yleOpen ? (
        <YleWordBankDialog
          lessonId={lessonId}
          extensionContext={extensionContext}
          currentVocabulary={extensions.vocabulary}
          currentUserId={currentUserId}
          onWordAdded={handleYleWordAdded}
          onClose={() => setYleOpen(false)}
        />
      ) : null}
    </>
  );
}

function ExtensionSection({
  title, inputPlaceholder, entries, type, inputValue, onInputChange, onAdd, renderGrouped, loading, extraButton,
}: {
  title: string; inputPlaceholder: string; entries: ExtensionEntry[]; type: ExtensionType;
  inputValue: string; onInputChange: (v: string) => void;
  onAdd: (type: ExtensionType, content: string, inputSetter: (v: string) => void) => void;
  renderGrouped: (entries: ExtensionEntry[], type: ExtensionType) => React.ReactNode; loading: boolean;
  extraButton?: React.ReactNode;
}) {
  const orbClass = type === "activity_idea" ? "field-activity" : "field-language";
  const orbLabel = type === "activity_idea" ? "✦" : "+";
  return (
    <section className="lesson-field-card lesson-detail-field">
      <div className={`field-orb ${orbClass}`} aria-hidden="true"><span>{orbLabel}</span></div>
      <div className="lesson-field-body">
        <h3>{title}</h3>
        <div className="extension-panel">
          <div className="extension-input-row">
            <input className="extension-input" type="text" placeholder={inputPlaceholder} value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAdd(type, inputValue, onInputChange); } }} />
            <button className="extension-add-button" type="button" onClick={() => onAdd(type, inputValue, onInputChange)} disabled={!inputValue.trim()}>Add</button>
            {extraButton}
          </div>
          <div className="extension-token-row">
            {loading ? <span className="empty">Loading...</span> : renderGrouped(entries, type)}
          </div>
        </div>
      </div>
    </section>
  );
}

function KReportDialog({
  extensionContext,
  lessonId,
  open,
  onOpenChange,
}: {
  extensionContext: LanguageExtensionContext;
  lessonId: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [reportText, setReportText] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [reportError, setReportError] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);

  const handleReportSubmit = useCallback(async () => {
    if (!reportText.trim()) return;
    setReportSubmitting(true);
    setReportError("");
    try {
      await submitReport(extensionContext, lessonId, reportText.trim());
      setReportSent(true);
    } catch {
      setReportError("Failed to submit report. Please try again.");
    }
    setReportSubmitting(false);
  }, [extensionContext.level, extensionContext.unitId, lessonId, reportText]);

  if (!open) return null;

  return (
    <div className="auth-dialog-backdrop" onClick={() => onOpenChange(false)}>
      <div className="k2-dialog" onClick={(e) => e.stopPropagation()} style={{ display: "grid" }}>
        <div className="dialog-body">
          <h2>Report Issues</h2>
          {reportSent ? (
            <>
              <div className="report-success">Report submitted. Thank you.</div>
              <div className="dialog-actions">
                <button className="dialog-button" type="button" onClick={() => onOpenChange(false)}>Close</button>
              </div>
            </>
          ) : (
            <>
              <p className="muted">Report issues with the original Power Up content. Your feedback helps the curriculum team.</p>
              {reportError ? <p style={{ color: "var(--eastie-brick)" }}>{reportError}</p> : null}
              <textarea className="dialog-textarea" placeholder="Describe the issue or suggestion..." value={reportText} onChange={(e) => setReportText(e.target.value)} />
              <div className="dialog-actions">
                <button className="extension-secondary-button" type="button" onClick={() => onOpenChange(false)}>Cancel</button>
                <button className="dialog-button" type="button" onClick={handleReportSubmit} disabled={reportSubmitting || !reportText.trim()}>{reportSubmitting ? "Sending..." : "Send"}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type OverrideMap = Record<string, LessonOverrideValue>;
type UnitOverrideMap = Record<string, OverrideMap>;

type EditDraft =
  | { fieldKey: string; title: string; type: "text"; originalText: string; text: string }
  | { fieldKey: string; title: string; type: "items"; originalItems: string[]; items: string[] };

function useLanguageOverrideEditor(unit: LanguageUnitData, lessonId: string) {
  const [overrides, setOverrides] = useState<OverrideMap>({});
  const [draft, setDraft] = useState<EditDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const context = {
    level: unit.level,
    lessonId,
    unitId: unit.unitId,
  };

  useEffect(() => {
    let active = true;
    setError("");
    fetchLessonOverrides(context)
      .then((next) => {
        if (active) setOverrides(next);
      })
      .catch((err) => {
        if (active) setError(err.message || "Failed to load edits.");
      });
    return () => { active = false; };
  }, [context.level, context.unitId, context.lessonId]);

  const getText = useCallback((fieldKey: string, original: string) => {
    const override = overrides[fieldKey];
    return override?.type === "text" ? override.text : original;
  }, [overrides]);

  const getItems = useCallback((fieldKey: string, original: ClassifiedLanguageItem[]) => {
    const override = overrides[fieldKey];
    if (override?.type === "items") {
      return override.items.map((text) => ({ text, source: "PU" as const }));
    }
    return original;
  }, [overrides]);

  const getKeywords = useCallback((original: ClassifiedLanguageItem[]) => {
    const merged = overrides["Keywords"];
    if (merged?.type === "items") {
      return merged.items.map((text) => ({ text, source: "PU" as const }));
    }
    const legacyNew = overrides["New Keywords"];
    const legacyRecycled = overrides["Recycled Keywords"];
    if (legacyNew?.type === "items" || legacyRecycled?.type === "items") {
      const parts: ClassifiedLanguageItem[][] = [];
      if (legacyNew?.type === "items") parts.push(legacyNew.items.map((text) => ({ text, source: "PU" as const })));
      if (legacyRecycled?.type === "items") parts.push(legacyRecycled.items.map((text) => ({ text, source: "PU" as const })));
      return mergeClassifiedItems(...parts);
    }
    return original;
  }, [overrides]);

  const getTargetLanguage = useCallback((original: ClassifiedLanguageItem[]) => {
    const merged = overrides["Target Language"];
    if (merged?.type === "items") {
      return merged.items.map((text) => ({ text, source: "PU" as const }));
    }
    const legacy = overrides["Target Sentences"];
    if (legacy?.type === "items") {
      return legacy.items.map((text) => ({ text, source: "PU" as const }));
    }
    return original;
  }, [overrides]);

  const isModified = useCallback((fieldKey: string) => Boolean(overrides[fieldKey]), [overrides]);

  const isKeywordsModified = useCallback(
    () => Boolean(overrides["Keywords"] || overrides["New Keywords"] || overrides["Recycled Keywords"]),
    [overrides],
  );

  const isTargetLanguageModified = useCallback(
    () => Boolean(overrides["Target Language"] || overrides["Target Sentences"]),
    [overrides],
  );

  const openText = useCallback((fieldKey: string, title: string, originalText: string) => {
    setDraft({
      fieldKey,
      originalText,
      text: getText(fieldKey, originalText),
      title,
      type: "text",
    });
  }, [getText]);

  const openItems = useCallback((fieldKey: string, title: string, originalItems: ClassifiedLanguageItem[]) => {
    const originalValues = originalItems.map((item) => item.text);
    const override = overrides[fieldKey];
    setDraft({
      fieldKey,
      items: override?.type === "items" ? override.items : originalValues,
      originalItems: originalValues,
      title,
      type: "items",
    });
  }, [overrides]);

  const close = useCallback(() => {
    setDraft(null);
    setError("");
  }, []);

  const save = useCallback(async (nextDraft: EditDraft) => {
    setSaving(true);
    setError("");
    try {
      const value: LessonOverrideValue = nextDraft.type === "text"
        ? { type: "text", text: nextDraft.text }
        : { type: "items", items: nextDraft.items.map((item) => item.trim()).filter(Boolean) };
      await saveLessonOverride(context, nextDraft.fieldKey, value);
      setOverrides((prev) => ({ ...prev, [nextDraft.fieldKey]: value }));
      setDraft(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save edit.");
    } finally {
      setSaving(false);
    }
  }, [context.level, context.unitId, context.lessonId]);

  const reset = useCallback(async (nextDraft: EditDraft) => {
    setSaving(true);
    setError("");
    try {
      await deleteLessonOverride(context, nextDraft.fieldKey);
      const legacyKeys =
        nextDraft.fieldKey === "Keywords"
          ? (["New Keywords", "Recycled Keywords"] as const)
          : nextDraft.fieldKey === "Target Language"
          ? (["Target Sentences"] as const)
          : [];
      await Promise.all(
        legacyKeys.filter((key) => overrides[key]).map((key) => deleteLessonOverride(context, key).catch(() => undefined)),
      );
      setOverrides((prev) => {
        const copy = { ...prev };
        delete copy[nextDraft.fieldKey];
        for (const key of legacyKeys) delete copy[key];
        return copy;
      });
      setDraft(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset edit.");
    } finally {
      setSaving(false);
    }
  }, [context.level, context.unitId, context.lessonId, overrides]);

  return {
    dialog: draft ? (
      <KEditDialog
        draft={draft}
        error={error}
        modified={Boolean(overrides[draft.fieldKey])}
        saving={saving}
        onClose={close}
        onReset={reset}
        onSave={save}
      />
    ) : null,
    getItems,
    getKeywords,
    getTargetLanguage,
    getText,
    isModified,
    isKeywordsModified,
    isTargetLanguageModified,
    openItems,
    openText,
  };
}

function useUnitLanguageOverrides(unit: LanguageUnitData) {
  const [overridesByLesson, setOverridesByLesson] = useState<UnitOverrideMap>({});
  const [status, setStatus] = useState<"idle" | "loading" | "ready">("idle");
  const lessonKeys = useMemo(
    () => unit.weeks.flatMap((week) => week.lessons.map((lesson) => lesson.id)).join("|"),
    [unit],
  );

  useEffect(() => {
    let active = true;
    setStatus("loading");
    const lessons = unit.weeks.flatMap((week) => week.lessons);
    Promise.all(
      lessons.map(async (lesson) => {
        try {
          const overrides = await fetchLessonOverrides({
            level: unit.level,
            lessonId: lesson.id,
            unitId: unit.unitId,
          });
          return [lesson.id, overrides] as const;
        } catch {
          return [lesson.id, {}] as const;
        }
      }),
    ).then((entries) => {
      if (!active) return;
      setOverridesByLesson(Object.fromEntries(entries));
      setStatus("ready");
    });
    return () => { active = false; };
  }, [lessonKeys, unit.level, unit.unitId, unit.weeks]);

  return { overridesByLesson, status };
}

function KEditDialog({
  draft,
  error,
  modified,
  saving,
  onClose,
  onReset,
  onSave,
}: {
  draft: EditDraft;
  error: string;
  modified: boolean;
  saving: boolean;
  onClose: () => void;
  onReset: (draft: EditDraft) => void;
  onSave: (draft: EditDraft) => void;
}) {
  const [localDraft, setLocalDraft] = useState<EditDraft>(draft);

  useEffect(() => {
    setLocalDraft(draft);
  }, [draft]);

  const addItem = () => {
    if (localDraft.type !== "items") return;
    setLocalDraft((current) => {
      if (current.type !== "items") return current;
      return { ...current, items: [...current.items, ""] };
    });
  };

  const updateItem = (index: number, value: string) => {
    if (localDraft.type !== "items") return;
    setLocalDraft((current) => {
      if (current.type !== "items") return current;
      return {
        ...current,
        items: current.items.map((item, i) => (i === index ? value : item)),
      };
    });
  };

  const removeItem = (index: number) => {
    if (localDraft.type !== "items") return;
    setLocalDraft((current) => {
      if (current.type !== "items") return current;
      return {
        ...current,
        items: current.items.filter((_, i) => i !== index),
      };
    });
  };

  const canSave = true;

  return (
    <div className="auth-dialog-backdrop" onClick={onClose}>
      <div className="k-language-edit-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="k-language-edit-header">
          <div>
            <p>Teacher Edit</p>
            <h2>{localDraft.title}</h2>
          </div>
          <button className="auth-close-button" type="button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <p className="k-language-edit-note">
          This saves your own teaching version only. The canonical curriculum file stays unchanged.
        </p>
        {localDraft.type === "text" ? (
          <textarea
            className="dialog-textarea k-language-edit-textarea"
            value={localDraft.text}
            onChange={(e) => setLocalDraft({ ...localDraft, text: e.target.value })}
          />
        ) : (
          <div className="k-language-edit-items">
            {localDraft.items.map((item, index) => (
              <div className="k-language-edit-item-row" key={`item-${index}`}>
                <input
                  className="k-language-edit-input"
                  value={item}
                  placeholder={`Item ${index + 1}`}
                  onChange={(e) => updateItem(index, e.target.value)}
                />
                <button className="extension-secondary-button" type="button" onClick={() => removeItem(index)}>Remove</button>
              </div>
            ))}
            <button className="k-language-modify-button" type="button" onClick={addItem}>Add item</button>
          </div>
        )}
        {error ? <p className="k-language-edit-error">{error}</p> : null}
        <div className="dialog-actions">
          {modified ? (
            <button className="extension-secondary-button" type="button" onClick={() => onReset(localDraft)} disabled={saving}>
              Reset to original
            </button>
          ) : null}
          <button className="extension-secondary-button" type="button" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="dialog-button" type="button" onClick={() => onSave(localDraft)} disabled={saving || !canSave}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ── */

function getDayNumber(week: LanguageUnitData["weeks"][number], lesson: LanguageUnitData["weeks"][number]["lessons"][number]) {
  const index = week.lessons.findIndex((item) => item.id === lesson.id);
  return index >= 0 ? index + 1 : lesson.lesson || 1;
}

function buildLanguageFocus(unitId: string, lesson: LanguageUnitData["weeks"][number]["lessons"][number]) {
  const classification = getLessonLanguageClassification(unitId, lesson.id);
  const fieldKeywords = splitLanguageItems(lesson.fields["Keywords"] ?? "");
  const fieldNewKeywords = splitLanguageItems(lesson.fields["New Keywords"] ?? "");
  const fieldRecycledKeywords = splitLanguageItems(lesson.fields["Recycled Keywords"] ?? "");
  const fieldTargetLanguage = splitLanguageItems(lesson.fields["Target Language"] ?? "");
  const fieldTargetSentences = splitLanguageItems(lesson.fields["Target Sentences"] ?? "");
  return {
    keywords: fieldKeywords.length
      ? fieldKeywords
      : fieldNewKeywords.length || fieldRecycledKeywords.length
      ? mergeClassifiedItems(fieldNewKeywords, fieldRecycledKeywords)
      : mergeClassifiedItems(
          classification?.newKeywords ?? [],
          classification?.recycledKeywords ?? [],
          splitLanguageItems(lesson.fields["New Language"] ?? ""),
          splitLanguageItems(lesson.fields["Recycled Language"] ?? ""),
        ),
    targetLanguage: fieldTargetLanguage.length
      ? fieldTargetLanguage
      : fieldTargetSentences.length
      ? fieldTargetSentences
      : classification?.targetSentences ?? [],
  };
}

function buildUnitLanguageSummary(unit: LanguageUnitData, overridesByLesson: UnitOverrideMap) {
  const keywordGroups: ClassifiedLanguageItem[][] = [];
  const targetGroups: ClassifiedLanguageItem[][] = [];

  for (const week of unit.weeks) {
    for (const lesson of week.lessons) {
      const base = buildLanguageFocus(unit.unitId, lesson);
      const overrides = overridesByLesson[lesson.id] ?? {};
      const keywordOverride = overrides["Keywords"];
      const targetOverride = overrides["Target Language"];

      keywordGroups.push(
        keywordOverride?.type === "items"
          ? keywordOverride.items.map((text) => ({ text, source: "PU" as const }))
          : base.keywords,
      );
      targetGroups.push(
        targetOverride?.type === "items"
          ? targetOverride.items.map((text) => ({ text, source: "PU" as const }))
          : base.targetLanguage,
      );
    }
  }

  return {
    keywords: mergeClassifiedItems(...keywordGroups),
    targetLanguage: mergeClassifiedItems(...targetGroups),
  };
}

function buildWeekLanguageSummary(
  unit: LanguageUnitData,
  week: LanguageUnitData["weeks"][number],
  overridesByLesson: UnitOverrideMap,
) {
  const keywordGroups: ClassifiedLanguageItem[][] = [];
  const targetGroups: ClassifiedLanguageItem[][] = [];
  const phonics: string[] = [];
  const songs: string[] = [];

  for (const lesson of week.lessons) {
    const base = buildLanguageFocus(unit.unitId, lesson);
    const overrides = overridesByLesson[lesson.id] ?? {};
    const keywordOverride = overrides["Keywords"];
    const targetOverride = overrides["Target Language"];
    const phonicsOverride = overrides["Phonics Content"];
    const songOverride = overrides["Circle Time Song"];

    keywordGroups.push(
      keywordOverride?.type === "items"
        ? keywordOverride.items.map((text) => ({ text, source: "PU" as const }))
        : base.keywords,
    );
    targetGroups.push(
      targetOverride?.type === "items"
        ? targetOverride.items.map((text) => ({ text, source: "PU" as const }))
        : base.targetLanguage,
    );

    const phonicsText = phonicsOverride?.type === "text" ? phonicsOverride.text : lesson.fields["Phonics Content"] ?? "";
    const songText = songOverride?.type === "text" ? songOverride.text : lesson.fields["Circle Time Song"] ?? "";
    if (!isContentTBD(phonicsText)) phonics.push(...splitSummaryItems(phonicsText));
    if (!isContentTBD(songText)) songs.push(...splitSummaryItems(songText));
  }

  return {
    keywords: mergeClassifiedItems(...keywordGroups),
    targetLanguage: mergeClassifiedItems(...targetGroups),
    phonics: uniqueSummaryItems(phonics),
    songs: uniqueSummaryItems(songs),
  };
}

/** Placeholder text used when a field has no real content yet. */
const TBD_MARKERS = [
  "TBD",
  "Phonics content placeholder. This will be filled from EASTIE day-level design.",
  "Story content placeholder. This will be filled from EASTIE day-level design.",
  "To be added in EASTIE circle-time content.",
];

function isContentTBD(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (/^tbd$/i.test(trimmed)) return true;
  return TBD_MARKERS.some((marker) => trimmed === marker);
}

/** Joins a list of classified language items into a single readable line. */
function joinLanguageItems(items: ClassifiedLanguageItem[], separator: string): string {
  return items.map((item) => item.text.trim()).filter(Boolean).join(separator);
}

/**
 * Builds the teacher-facing Daily Summary text. Sections load in a fixed order.
 * Phonics Learning is omitted entirely when it has no real content (TBD).
 */
function buildDailySummaryText(opts: {
  unitTitle: string;
  lessonOutcome: string;
  circleTopic: string;
  circleSong: string;
  storyContent: string;
  phonicsContent: string;
  keywords: ClassifiedLanguageItem[];
  targetLanguage: ClassifiedLanguageItem[];
}): string {
  const blocks: Array<{ label: string; body: string }> = [
    { label: "Unit Theme", body: opts.unitTitle },
    { label: "Learning Outcome", body: opts.lessonOutcome },
    { label: "Circle Time Topic", body: opts.circleTopic },
    { label: "Song", body: opts.circleSong },
    { label: "Story", body: opts.storyContent },
    { label: "Keywords", body: joinLanguageItems(opts.keywords, "、") },
    { label: "Target Language", body: joinLanguageItems(opts.targetLanguage, " / ") },
  ];

  const lines: string[] = [];
  for (const block of blocks) {
    lines.push(`${block.label}: ${block.body}`);
    lines.push("");
  }

  // Phonics Learning — only include when there is real content.
  if (!isContentTBD(opts.phonicsContent)) {
    lines.push(`Phonics Learning: ${opts.phonicsContent}`);
    lines.push("");
  }

  return lines.join("\n").replace(/\n+$/, "\n");
}

function buildWeekSummaryText(opts: {
  unitTitle: string;
  weekTheme: string;
  keywords: ClassifiedLanguageItem[];
  targetLanguage: ClassifiedLanguageItem[];
  phonics: string[];
  songs: string[];
}): string {
  const blocks: Array<{ label: string; body: string }> = [
    { label: "Unit Theme", body: opts.unitTitle },
    { label: "Week Theme", body: opts.weekTheme },
    { label: "Key Words", body: joinLanguageItems(opts.keywords, ", ") },
    { label: "Target Language", body: joinLanguageItems(opts.targetLanguage, " / ") },
    { label: "Phonics", body: opts.phonics.join(" / ") || "Not listed yet" },
    { label: "Songs", body: opts.songs.join(", ") || "Not listed yet" },
  ];

  return blocks.map((block) => `${block.label}: ${block.body}`).join("\n") + "\n";
}

function splitSummaryItems(value: string): string[] {
  return value
    .split(/\n|[;,，、|｜]/)
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

function uniqueSummaryItems(items: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const key = item.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

/** Copies text to the clipboard, with a legacy fallback for non-secure contexts. */
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

function DailySummaryDialog({ text, onClose, title = "Daily Summary" }: { text: string; onClose: () => void; title?: string }) {
  const [value, setValue] = useState(text);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copySummaryText(value);
    setCopied(ok);
    if (ok) {
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div
      className="k-language-summary-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="k-language-summary-modal">
        <div className="k-language-summary-head">
          <h3>{title}</h3>
          <button
            className="k-language-summary-close"
            type="button"
            aria-label="Close"
            onClick={onClose}
          >
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

function mergeClassifiedItems(...groups: ClassifiedLanguageItem[][]): ClassifiedLanguageItem[] {
  const seen = new Set<string>();
  const out: ClassifiedLanguageItem[] = [];
  for (const group of groups) {
    for (const item of group) {
      const key = item.text.trim().toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      out.push(item);
    }
  }
  return out;
}

function splitLanguageItems(value: string) {
  if (!value || value.trim() === "None listed") return [];
  return value
    .split(/[｜|]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((text) => ({ text, source: "PU" as const }));
}

function splitActivityItems(value: string) {
  if (!value || value.trim() === "None listed") return [];
  const normalized = value.replace(/\r\n/g, "\n").trim();
  const numbered = normalized
    .split(/\n(?=\s*\d+[.)]\s+)/)
    .map((item) => item.replace(/^\s*\d+[.)]\s*/, "").trim())
    .filter(Boolean);
  if (numbered.length > 1) return numbered;
  return normalized
    .split(/\n+/)
    .map((item) => item.replace(/^\s*[-*]\s*/, "").trim())
    .filter(Boolean);
}

function splitKeyedContent(value: string) {
  if (!value || value.trim() === "None listed") return [];
  return value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = /^([^:]+):\s*(.+)$/.exec(line);
      if (!match) return null;
      return {
        title: match[1].trim(),
        body: match[2].trim(),
      };
    })
    .filter((item): item is { title: string; body: string } => Boolean(item));
}

function getUnitPath(unit: LanguageUnitData) {
  const unitSlug = unit.unitNumber === 0 ? "unit-uh" : `unit-${String(unit.unitNumber).padStart(2, "0")}`;
  return `/curriculum/${unit.level.toLowerCase()}/language/${unitSlug}`;
}

function unitLabel(unit: LanguageUnitData) {
  return unit.unitNumber === 0 ? "Unit Hello" : `Unit ${unit.unitNumber}`;
}

function getFieldKind(field: string) {
  const f = field.toLowerCase();
  if (f.includes("language") || f.includes("vocabulary")) return "language";
  if (f.includes("outcome") || f.includes("role")) return "outcome";
  if (f.includes("mission") || f.includes("design") || f.includes("status")) return "weekly";
  if (f.includes("source")) return "resources";
  return "overview";
}

function groupBy<T>(items: T[], keyFn: (item: T) => string): Array<{ key: string; items: T[] }> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = keyFn(item);
    const group = map.get(key);
    if (group) group.push(item);
    else map.set(key, [item]);
  }
  return Array.from(map.entries()).map(([key, items]) => ({ key, items }));
}
