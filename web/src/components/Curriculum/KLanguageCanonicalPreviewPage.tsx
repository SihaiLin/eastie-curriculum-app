import { useSearchParams } from "react-router-dom";
import type { ReactNode } from "react";
import {
  kLanguageCanonicalPreview,
  kLanguageCanonicalPreviewSummary,
} from "../../curriculum/generated/kLanguageCanonicalPreview";

type PreviewUnit = (typeof kLanguageCanonicalPreview)[number];
type PreviewDay = PreviewUnit["days"][number];

function dayKey(day: PreviewDay) {
  return `${day.metadata.week}-${day.metadata.day}`;
}

function unitLabel(unit: PreviewUnit) {
  return `${unit.level} ${unit.unitNumber === 0 ? "Unit Hello" : `Unit ${unit.unitNumber}`}: ${unit.unitTheme}`;
}

export function KLanguageCanonicalPreviewPage() {
  const [params, setParams] = useSearchParams();
  const selectedUnitId = params.get("unit") ?? kLanguageCanonicalPreview[0]?.unitId ?? "";
  const selectedUnit = kLanguageCanonicalPreview.find((unit) => unit.unitId === selectedUnitId) ?? kLanguageCanonicalPreview[0];
  const selectedDayKey = params.get("day") ?? "overview";
  const selectedDay = selectedUnit.days.find((day) => dayKey(day) === selectedDayKey);

  const chooseUnit = (unitId: string) => {
    setParams({ unit: unitId, day: "overview" });
  };

  const chooseDay = (key: string) => {
    setParams({ unit: selectedUnit.unitId, day: key });
  };

  return (
    <main className="k-canonical-preview-page">
      <header className="k-canonical-preview-hero">
        <div>
          <p className="k-canonical-eyebrow">K Language Canonical MD v0.1 Preview</p>
          <h1>Unit Hello + Unit 1 Rollout Review</h1>
          <p>
            This preview reads the new canonical markdown output only. It does not replace the current
            classroom lesson routes yet.
          </p>
        </div>
        <div className="k-canonical-summary-card" aria-label="Preview sync summary">
          <strong>{kLanguageCanonicalPreviewSummary.unitCount}</strong>
          <span>units</span>
          <strong>{kLanguageCanonicalPreviewSummary.dayCount}</strong>
          <span>days</span>
          <strong>{kLanguageCanonicalPreviewSummary.needsExtensionCount}</strong>
          <span>needs extension</span>
        </div>
      </header>

      <section className="k-canonical-unit-tabs" aria-label="Rollout units">
        {kLanguageCanonicalPreview.map((unit) => (
          <button
            className={`k-canonical-unit-tab${unit.unitId === selectedUnit.unitId ? " active" : ""}`}
            key={unit.unitId}
            onClick={() => chooseUnit(unit.unitId)}
            type="button"
          >
            <span>{unit.level}</span>
            <strong>{unit.unitNumber === 0 ? "Hello" : `U${unit.unitNumber}`}</strong>
            <em>{unit.unitTheme}</em>
          </button>
        ))}
      </section>

      <div className="k-canonical-preview-shell">
        <aside className="k-canonical-day-nav" aria-label="Canonical day navigation">
          <div className="k-canonical-nav-title">
            <span>Directory</span>
            <strong>{unitLabel(selectedUnit)}</strong>
          </div>
          <button
            className={`k-canonical-day-link${selectedDayKey === "overview" ? " active" : ""}`}
            onClick={() => chooseDay("overview")}
            type="button"
          >
            <span>OV</span>
            <div>
              <strong>Unit Overview</strong>
              <em>{selectedUnit.overview.unitLearningOutcomes.length} outcomes</em>
            </div>
          </button>
          <div className="k-canonical-day-list">
            {selectedUnit.days.map((day) => {
              const key = dayKey(day);
              return (
                <button
                  className={`k-canonical-day-link${key === selectedDayKey ? " active" : ""}`}
                  key={`${selectedUnit.unitId}-${key}`}
                  onClick={() => chooseDay(key)}
                  type="button"
                >
                  <span>D{day.metadata.day}</span>
                  <div>
                    <strong>{day.metadata.dayType}</strong>
                    <em>Week {day.metadata.week} · {day.metadata.powerUpLesson}</em>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="k-canonical-preview-content">
          {selectedDay ? <DayPreview day={selectedDay} unit={selectedUnit} /> : <OverviewPreview unit={selectedUnit} />}
        </section>
      </div>
    </main>
  );
}

function OverviewPreview({ unit }: { unit: PreviewUnit }) {
  return (
    <article className="k-canonical-document">
      <p className="k-canonical-eyebrow">{unit.level} · {unit.courseLine}</p>
      <h2>{unitLabel(unit)}</h2>
      <PreviewSection title="Unit Focus">
        <p>{unit.overview.unitFocus || "TBD"}</p>
      </PreviewSection>
      <PreviewSection title="Unit Learning Outcomes">
        <BulletList items={unit.overview.unitLearningOutcomes} />
      </PreviewSection>
      <PreviewSection title="Power Up Alignment">
        <DefinitionGrid entries={unit.overview.powerUpAlignment} />
      </PreviewSection>
      <PreviewSection title="4-Week Teaching Flow">
        <div className="k-canonical-week-grid">
          {unit.overview.teachingFlow.map((week) => (
            <div className="k-canonical-mini-panel" key={week.title}>
              <h4>{week.title}</h4>
              <BulletList items={week.items} />
            </div>
          ))}
        </div>
      </PreviewSection>
      <PreviewSection title="Teacher / Design Guidance">
        <MarkdownLite value={unit.overview.teacherDesignGuidance} />
      </PreviewSection>
      <PreviewSection title="Open Design Tasks">
        <BulletList items={unit.overview.openDesignTasks} />
      </PreviewSection>
    </article>
  );
}

function DayPreview({ day, unit }: { day: PreviewDay; unit: PreviewUnit }) {
  return (
    <article className="k-canonical-document">
      <p className="k-canonical-eyebrow">
        {unit.level} · {unit.unitTheme} · {day.metadata.dayType}
      </p>
      <h2>{day.title}</h2>
      <div className="k-canonical-meta-strip">
        <span>{day.metadata.powerUpLesson}</span>
        <span>{day.metadata.lessonRole}</span>
      </div>

      <PreviewSection title="Circle Time">
        <SubBlock title="Topic" value={day.circleTime.topic} />
        <SubBlock title="Song" value={day.circleTime.song} />
        <SubBlock title="Teacher Notes" value={day.circleTime.teacherNotes} />
      </PreviewSection>

      <PreviewSection title="CLIL Class">
        <SubBlock title="Lesson Outcome" value={day.clilClass.lessonOutcome} />
        <SourceBlock source={day.clilClass.source} />
        <LanguageBuckets day={day} />
        <SubBlock title="Activities and Games" value={day.clilClass.activitiesAndGames.length ? "" : "TBD"}>
          <NumberedList items={day.clilClass.activitiesAndGames} />
        </SubBlock>
        <SubBlock title="Teacher / Design Guidance">
          <MarkdownLite value={day.clilClass.teacherDesignGuidance} />
        </SubBlock>
      </PreviewSection>

      <PreviewSection title="Phonics">
        <SubBlock title="Content" value={day.phonics.content} />
        <SubBlock title="Teacher Notes" value={day.phonics.teacherNotes} />
      </PreviewSection>

      <PreviewSection title="Story">
        <SubBlock title="Book / Story" value={day.story.bookOrStory} />
        <SubBlock title="Teacher Notes" value={day.story.teacherNotes} />
      </PreviewSection>

      <PreviewSection title="Review Issues" muted>
        <p className="k-canonical-note">Not child-facing. These items are kept for curriculum decisions.</p>
        {day.reviewIssues.needsExtension.length ? (
          <div className="k-canonical-issue-list">
            {day.reviewIssues.needsExtension.map((issue) => (
              <div className="k-canonical-issue" key={`${issue.umbrella}-${issue.originalSource}`}>
                <strong>{issue.umbrella}</strong>
                <span>{issue.originalSource}</span>
                <p>{issue.decisionNeeded}</p>
                {issue.suggestedConcreteWords.length ? <TokenRow items={issue.suggestedConcreteWords} variant="soft" /> : null}
              </div>
            ))}
          </div>
        ) : (
          <p>None for this day.</p>
        )}
      </PreviewSection>

      <p className="k-canonical-source-path">{day.sourcePath}</p>
    </article>
  );
}

function PreviewSection({
  title,
  children,
  muted = false,
}: {
  title: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={`k-canonical-section${muted ? " muted" : ""}`}>
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}

function SubBlock({ title, value, children }: { title: string; value?: string; children?: ReactNode }) {
  return (
    <div className="k-canonical-subblock">
      <h4>{title}</h4>
      {children ?? <p>{value || "TBD"}</p>}
    </div>
  );
}

function LanguageBuckets({ day }: { day: PreviewDay }) {
  return (
    <div className="k-canonical-language-grid">
      <SubBlock title="New Keywords">
        <TokenRow items={day.clilClass.newKeywords} />
      </SubBlock>
      <SubBlock title="Recycled Keywords">
        <TokenRow items={day.clilClass.recycledKeywords} />
      </SubBlock>
      <SubBlock title="Target Sentences">
        <TokenRow items={day.clilClass.targetSentences} variant="sentence" />
      </SubBlock>
    </div>
  );
}

function SourceBlock({ source }: { source: PreviewDay["clilClass"]["source"] }) {
  const pdfs = [
    ["Teacher's Book", source.teacherBook],
    ["Pupil's Book", source.pupilBook],
    ["Activity Book", source.activityBook],
  ].filter(([, value]) => value && value !== "TBD");
  return (
    <SubBlock title="Source">
      <div className="k-canonical-source-grid">
        {pdfs.map(([label, value]) => (
          <div className="k-canonical-source-pill" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <AudioList title="Pupil's Book Audio" items={source.pupilBookAudio} />
      <AudioList title="Activity Book Audio" items={source.activityBookAudio} />
      {!pdfs.length && !source.pupilBookAudio.length && !source.activityBookAudio.length ? <p>TBD</p> : null}
    </SubBlock>
  );
}

function AudioList({ title, items }: { title: string; items: readonly { track: string; path: string }[] }) {
  if (!items.length) return null;
  return (
    <div className="k-canonical-audio-list">
      <h5>{title}</h5>
      {items.map((item) => (
        <span key={`${title}-${item.track}-${item.path}`}>Track {item.track}</span>
      ))}
    </div>
  );
}

function TokenRow({ items, variant = "keyword" }: { items: readonly string[]; variant?: "keyword" | "sentence" | "soft" }) {
  if (!items.length) return <p>TBD</p>;
  return (
    <div className={`k-canonical-token-row ${variant}`}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  if (!items.length) return <p>TBD</p>;
  return (
    <ul className="k-canonical-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: readonly string[] }) {
  if (!items.length) return null;
  return (
    <ol className="k-canonical-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}

function DefinitionGrid({ entries }: { entries: Record<string, string> }) {
  const pairs = Object.entries(entries).filter(([, value]) => value);
  if (!pairs.length) return <p>TBD</p>;
  return (
    <dl className="k-canonical-definition-grid">
      {pairs.map(([key, value]) => (
        <div key={key}>
          <dt>{key.replace(/([A-Z])/g, " $1").trim()}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function MarkdownLite({ value }: { value: string }) {
  if (!value) return <p>TBD</p>;
  return (
    <div className="k-canonical-markdown-lite">
      {value.split(/\n{2,}/).map((block) => (
        <p key={block}>{block.replace(/\*\*/g, "")}</p>
      ))}
    </div>
  );
}
