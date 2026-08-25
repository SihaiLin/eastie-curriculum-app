import { useSearchParams } from "react-router-dom";
import type { ReactNode } from "react";
import {
  kLanguageUnitCentricPreview,
  kLanguageUnitCentricPreviewSummary,
} from "../../curriculum/generated/kLanguageUnitCentricPreview";

type UnitCentricPreview = typeof kLanguageUnitCentricPreview;
type UnitCentricDay = UnitCentricPreview["days"][number];
type MarkdownSection = Readonly<{
  title: string;
  body: string;
}>;

function dayKey(day: UnitCentricDay) {
  return String(day.metadata.day).padStart(2, "0");
}

function unitTitle() {
  return `${kLanguageUnitCentricPreview.level} Unit ${kLanguageUnitCentricPreview.unitNumber}: ${kLanguageUnitCentricPreview.unitTheme}`;
}

export function KLanguageUnitCentricPreviewPage() {
  const [params, setParams] = useSearchParams();
  const selectedDayKey = params.get("day") ?? "unit";
  const selectedDay = kLanguageUnitCentricPreview.days.find((day) => dayKey(day) === selectedDayKey);

  const chooseDay = (key: string) => {
    setParams({ day: key });
  };

  return (
    <main className="k-canonical-preview-page">
      <header className="k-canonical-preview-hero">
        <div>
          <p className="k-canonical-eyebrow">K Language Unit-Centric MD v0.1 Preview</p>
          <h1>{unitTitle()}</h1>
          <p>
            This page previews the new unit-centric content package. Unit-level locked content is treated
            as the authority, and daily files are displayed in day order.
          </p>
        </div>
        <div className="k-canonical-summary-card" aria-label="Unit-centric preview summary">
          <strong>{kLanguageUnitCentricPreviewSummary.unitCount}</strong>
          <span>unit</span>
          <strong>{kLanguageUnitCentricPreviewSummary.dayCount}</strong>
          <span>days</span>
          <strong>v0.1</strong>
          <span>unit-centric</span>
        </div>
      </header>

      <div className="k-canonical-preview-shell">
        <aside className="k-canonical-day-nav" aria-label="Unit-centric day navigation">
          <div className="k-canonical-nav-title">
            <span>Directory</span>
            <strong>{unitTitle()}</strong>
          </div>
          <button
            className={`k-canonical-day-link${selectedDayKey === "unit" ? " active" : ""}`}
            onClick={() => chooseDay("unit")}
            type="button"
          >
            <span>U</span>
            <div>
              <strong>00 Unit</strong>
              <em>Locked content</em>
            </div>
          </button>
          <div className="k-canonical-day-list">
            {kLanguageUnitCentricPreview.days.map((day) => {
              const key = dayKey(day);
              return (
                <button
                  className={`k-canonical-day-link${selectedDayKey === key ? " active" : ""}`}
                  key={key}
                  onClick={() => chooseDay(key)}
                  type="button"
                >
                  <span>D{Number(day.metadata.day)}</span>
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
          {selectedDay ? <DayPreview day={selectedDay} /> : <UnitPreview />}
        </section>
      </div>
    </main>
  );
}

function UnitPreview() {
  const unit = kLanguageUnitCentricPreview.unit;
  return (
    <article className="k-canonical-document">
      <p className="k-canonical-eyebrow">{kLanguageUnitCentricPreview.level} · English Learning</p>
      <h2>{unit.title}</h2>
      <PreviewSection title="Unit Purpose">
        <MarkdownLite value={unit.unitPurpose} />
      </PreviewSection>
      <PreviewSection title="Unit Outcomes">
        <BulletList items={unit.unitOutcomes} />
      </PreviewSection>
      <PreviewSection title="Locked Content Evidence">
        <MarkdownLite value={unit.lockedContentEvidenceIndex.body} />
      </PreviewSection>
      <PreviewSection title="Source Summary">
        <BulletList items={unit.sourceSummary} />
      </PreviewSection>
      <PreviewSection title="Language Bank">
        <SectionGrid sections={unit.languageBank} />
      </PreviewSection>
      <PreviewSection title="Unit Sequence">
        <SectionGrid sections={unit.unitSequence} />
      </PreviewSection>
      <PreviewSection title="Open Items">
        <SectionGrid sections={unit.openItems} />
      </PreviewSection>
      <p className="k-canonical-source-path">{unit.sourcePath}</p>
    </article>
  );
}

function DayPreview({ day }: { day: UnitCentricDay }) {
  return (
    <article className="k-canonical-document">
      <p className="k-canonical-eyebrow">
        {kLanguageUnitCentricPreview.level} · {kLanguageUnitCentricPreview.unitTheme} · Day {day.metadata.day}
      </p>
      <h2>{day.title}</h2>
      <div className="k-canonical-meta-strip">
        <span>{day.metadata.dayType}</span>
        <span>{day.metadata.powerUpLesson}</span>
        <span>{day.metadata.lessonRole}</span>
      </div>

      <PreviewSection title="Day Focus">
        <BulletList items={day.dayFocus} />
      </PreviewSection>

      {day.displayedContent.map((section) => (
        <PreviewSection title={section.title} key={section.title}>
          <MarkdownLite value={section.body} />
        </PreviewSection>
      ))}

      <PreviewSection title="Source Audit" muted>
        <MarkdownLite value={day.sourceAudit} />
      </PreviewSection>

      <PreviewSection title="Review Issues" muted>
        <MarkdownLite value={day.reviewIssues} />
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

function SectionGrid({ sections }: { sections: readonly MarkdownSection[] }) {
  if (!sections.length) return <p>TBD</p>;
  return (
    <div className="k-canonical-week-grid">
      {sections.map((section) => (
        <div className="k-canonical-mini-panel" key={section.title}>
          <h4>{section.title}</h4>
          <MarkdownLite value={section.body} />
        </div>
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

function MarkdownLite({ value }: { value: string }) {
  if (!value) return <p>TBD</p>;
  const blocks = value.split(/\n{2,}/).filter((block) => block.trim());
  if (!blocks.length) return <p>TBD</p>;
  return (
    <div className="k-canonical-markdown-lite">
      {blocks.map((block) => {
        if (block.includes("\n- ")) {
          const [lead, ...rest] = block.split(/\n/);
          const items = rest
            .map((line) => line.trim())
            .filter((line) => line.startsWith("- "))
            .map((line) => line.replace(/^-\s+/, ""));
          return (
            <div key={block}>
              {lead.trim() ? <p>{formatInline(lead)}</p> : null}
              <BulletList items={items} />
            </div>
          );
        }
        return <p key={block}>{formatInline(block)}</p>;
      })}
    </div>
  );
}

function formatInline(value: string) {
  return value.replace(/\*\*/g, "").replace(/`/g, "");
}
