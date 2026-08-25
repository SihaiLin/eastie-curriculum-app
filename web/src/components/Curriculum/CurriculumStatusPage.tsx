type CoverageRow = {
  level: string;
  track: string;
  ruleDoc: "Yes" | "No";
  sourceTemplate: "Yes" | "No";
  referenceUnit: string;
  dynamicPage: "Yes" | "No";
  status: string;
};

type AlignmentRow = {
  level: string;
  track: string;
  unit: string;
  alignment: "Aligned" | "Mostly aligned" | "Needs follow-up";
  note: string;
};

const COVERAGE_ROWS: CoverageRow[] = [
  { level: "PG", track: "Language", ruleDoc: "Yes", sourceTemplate: "Yes", referenceUnit: "Yes (Unit 6)", dynamicPage: "Yes", status: "Usable, template now exists" },
  { level: "PG", track: "Non-Language", ruleDoc: "Yes", sourceTemplate: "Yes", referenceUnit: "Yes (Unit 8)", dynamicPage: "Yes", status: "Ready for controlled expansion" },
  { level: "PK", track: "Language", ruleDoc: "Yes", sourceTemplate: "Yes", referenceUnit: "Yes (Unit 6)", dynamicPage: "Yes", status: "Usable, template now exists" },
  { level: "PK", track: "Non-Language", ruleDoc: "Yes", sourceTemplate: "Yes", referenceUnit: "Yes (Unit 8)", dynamicPage: "Yes", status: "Usable, template now exists" },
  { level: "K1", track: "Language", ruleDoc: "Yes", sourceTemplate: "Yes", referenceUnit: "Yes (Unit 1)", dynamicPage: "Yes", status: "Usable, template now exists" },
  { level: "K1", track: "Non-Language", ruleDoc: "Yes", sourceTemplate: "Yes", referenceUnit: "No", dynamicPage: "No", status: "Template-ready, reference unit needed" },
  { level: "K2", track: "Language", ruleDoc: "Yes", sourceTemplate: "Yes", referenceUnit: "Yes (Unit 1)", dynamicPage: "Yes", status: "Ready" },
  { level: "K2", track: "Non-Language", ruleDoc: "No", sourceTemplate: "No", referenceUnit: "No", dynamicPage: "No", status: "Blank" },
  { level: "K3", track: "Language", ruleDoc: "Yes", sourceTemplate: "Yes", referenceUnit: "Yes (Unit 1)", dynamicPage: "Yes", status: "Usable, template now exists" },
  { level: "K3", track: "Non-Language", ruleDoc: "No", sourceTemplate: "No", referenceUnit: "No", dynamicPage: "No", status: "Blank" },
];

const PRIORITY_GAPS = [
  "K2 Non-Language",
  "K3 Non-Language",
];

const ALIGNMENT_ROWS: AlignmentRow[] = [
  {
    level: "PG",
    track: "Non-Language",
    unit: "Unit 8",
    alignment: "Aligned",
    note: "Source common-info, sync output, and dynamic renderer were reconciled on 2026-06-24.",
  },
  {
    level: "PK",
    track: "Non-Language",
    unit: "Unit 8",
    alignment: "Aligned",
    note: "Section 4 descriptions and source headings now match the current dynamic overview behavior.",
  },
  {
    level: "PG",
    track: "Language",
    unit: "Unit 6",
    alignment: "Aligned",
    note: "Source markdown, generated snapshot, and LanguageUnitPage field expectations are structurally aligned. Source markdown now lives in the newer unit-directory pattern.",
  },
  {
    level: "PK",
    track: "Language",
    unit: "Unit 6",
    alignment: "Aligned",
    note: "Source markdown, generated snapshot, and LanguageUnitPage field expectations are structurally aligned. Source markdown now lives in the newer unit-directory pattern.",
  },
  {
    level: "K1",
    track: "Language",
    unit: "Unit 1",
    alignment: "Aligned",
    note: "New-structure markdown, sync script expectations, generated snapshot, and KLanguageUnitPage field model are aligned in this pass.",
  },
  {
    level: "K2",
    track: "Language",
    unit: "Unit 1",
    alignment: "Aligned",
    note: "New-structure markdown, sync script expectations, generated snapshot, and KLanguageUnitPage field model are aligned. Resource presentation is not a structure blocker.",
  },
  {
    level: "K3",
    track: "Language",
    unit: "Unit 1",
    alignment: "Aligned",
    note: "New-structure markdown, sync script expectations, generated snapshot, and KLanguageUnitPage field model are aligned in this pass.",
  },
];

function statusClassName(status: string): string {
  const normalized = status.toLowerCase();
  if (normalized.includes("blank")) return "status-blank";
  if (normalized.includes("ready")) return "status-ready";
  if (normalized.includes("partial") || normalized.includes("usable")) return "status-partial";
  return "status-neutral";
}

function alignmentClassName(alignment: AlignmentRow["alignment"]): string {
  if (alignment === "Aligned") return "status-ready";
  if (alignment === "Needs follow-up") return "status-blank";
  return "status-partial";
}

export function CurriculumStatusPage() {
  return (
    <main className="curriculum-status-page">
      <header className="curriculum-status-header">
        <h1>EASTIE Curriculum Status</h1>
        <p>Project-manager view of current curriculum coverage, missing template areas, and expansion readiness.</p>
      </header>

      <section className="status-summary-grid" aria-label="Summary">
        <article className="status-summary-card">
          <span className="status-summary-label">Active Dynamic References</span>
          <strong>7</strong>
          <p>PG/PK non-language, PG/PK language, and K1/K2/K3 language all have at least one active route.</p>
        </article>
        <article className="status-summary-card">
          <span className="status-summary-label">Highest-Priority Blank Areas</span>
          <strong>2</strong>
          <p>K2 and K3 non-language remain fully blank; K1 non-language now has first-pass rules and template but no reference unit yet.</p>
        </article>
        <article className="status-summary-card">
          <span className="status-summary-label">Current Expansion Line</span>
          <strong>PG Non-Language</strong>
          <p>Still the strongest candidate for controlled multi-unit expansion after template gaps are closed.</p>
        </article>
      </section>

      <section className="status-panel">
        <div className="status-panel-heading">
          <h2>Curriculum Coverage Matrix</h2>
          <p>Each row shows whether a level/track already has a rule doc, source template, reference unit, and dynamic page.</p>
        </div>

        <div className="status-table-wrap">
          <table className="status-table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Track</th>
                <th>Rule Doc</th>
                <th>Source Template</th>
                <th>Reference Unit</th>
                <th>Dynamic Page</th>
                <th>Overall Status</th>
              </tr>
            </thead>
            <tbody>
              {COVERAGE_ROWS.map((row) => (
                <tr key={`${row.level}-${row.track}`}>
                  <td>{row.level}</td>
                  <td>{row.track}</td>
                  <td><span className={`matrix-chip ${row.ruleDoc === "Yes" ? "matrix-yes" : "matrix-no"}`}>{row.ruleDoc}</span></td>
                  <td><span className={`matrix-chip ${row.sourceTemplate === "Yes" ? "matrix-yes" : "matrix-no"}`}>{row.sourceTemplate}</span></td>
                  <td>{row.referenceUnit}</td>
                  <td><span className={`matrix-chip ${row.dynamicPage === "Yes" ? "matrix-yes" : "matrix-no"}`}>{row.dynamicPage}</span></td>
                  <td><span className={`matrix-status ${statusClassName(row.status)}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="status-panel">
        <div className="status-panel-heading">
          <h2>Active Unit Alignment</h2>
          <p>Checks whether the current source Markdown and the current dynamic page are aligned closely enough to be used as reliable references.</p>
        </div>

        <div className="status-table-wrap">
          <table className="status-table">
            <thead>
              <tr>
                <th>Level</th>
                <th>Track</th>
                <th>Unit</th>
                <th>Alignment</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {ALIGNMENT_ROWS.map((row) => (
                <tr key={`${row.level}-${row.track}-${row.unit}`}>
                  <td>{row.level}</td>
                  <td>{row.track}</td>
                  <td>{row.unit}</td>
                  <td><span className={`matrix-status ${alignmentClassName(row.alignment)}`}>{row.alignment}</span></td>
                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="status-panel">
        <div className="status-panel-heading">
          <h2>Highest-Priority Blank Areas</h2>
          <p>These are the places where we still need the full first pass: rule doc, source template, reference unit, and dynamic page.</p>
        </div>
        <div className="status-gap-list">
          {PRIORITY_GAPS.map((gap) => (
            <article key={gap} className="status-gap-card">
              <h3>{gap}</h3>
              <p>Needs first-pass template completion before unit expansion can be standardized.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
