import { useEffect, useMemo, useState } from "react";

type ResourceRole = "teacher-book" | "pupil-book" | "activity-book";

type ManifestPdf = {
  role: "TB" | "PB" | "AB";
  lesson: number;
  page: number;
  filename: string;
  publicPath: string;
};

type ManifestLesson = {
  lesson: number;
  pdfs: ManifestPdf[];
};

type ResourceManifest = {
  grade: "k1" | "k2" | "k3";
  unit: string;
  lessons: ManifestLesson[];
  summary: {
    pdfCount: number;
    lessonCount: number;
  };
};

type ManifestState =
  | { status: "loading" }
  | { status: "missing" }
  | { status: "ready"; manifest: ResourceManifest };

const GRADES = [
  { id: "k1", label: "K1 / Starters" },
  { id: "k2", label: "K2 / Level 1" },
  { id: "k3", label: "K3 / Level 2" },
] as const;

const UNITS = ["unit-uh", "unit-01", "unit-02", "unit-03", "unit-04", "unit-05", "unit-06", "unit-07", "unit-08", "unit-09"] as const;

const ROLE_LABELS: Record<ResourceRole, string> = {
  "teacher-book": "TB",
  "pupil-book": "PB",
  "activity-book": "AB",
};

const ROLE_FROM_MANIFEST: Record<ManifestPdf["role"], ResourceRole> = {
  TB: "teacher-book",
  PB: "pupil-book",
  AB: "activity-book",
};

export function PowerUpResourceReviewPage() {
  const [selectedGrade, setSelectedGrade] = useState<(typeof GRADES)[number]["id"]>("k1");
  const [selectedUnit, setSelectedUnit] = useState<(typeof UNITS)[number]>("unit-01");
  const [manifestState, setManifestState] = useState<ManifestState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setManifestState({ status: "loading" });

    fetch(`/curriculum-resources/power-up/${selectedGrade}/${selectedUnit}/resource-manifest.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Missing manifest");
        return response.json() as Promise<ResourceManifest>;
      })
      .then((manifest) => {
        if (!cancelled) setManifestState({ status: "ready", manifest });
      })
      .catch(() => {
        if (!cancelled) setManifestState({ status: "missing" });
      });

    return () => {
      cancelled = true;
    };
  }, [selectedGrade, selectedUnit]);

  const totals = useMemo(() => {
    if (manifestState.status !== "ready") return null;
    const counts: Record<ResourceRole, number> = {
      "teacher-book": 0,
      "pupil-book": 0,
      "activity-book": 0,
    };
    for (const lesson of manifestState.manifest.lessons) {
      for (const pdf of lesson.pdfs) counts[ROLE_FROM_MANIFEST[pdf.role]] += 1;
    }
    return counts;
  }, [manifestState]);

  return (
    <main className="unit-page unit8-shell powerup-review-shell">
      <header className="unit-hero unit8-hero">
        <div>
          <p className="unit-kicker">Power Up Resource Review</p>
          <h1>PDF Review Board</h1>
          <p className="unit-subtitle">Public TB / PB / AB resources for K1-K3 language review.</p>
        </div>
      </header>

      <section className="unit8-card powerup-review-controls">
        <div>
          <h2>Choose Level and Unit</h2>
          <p>This is a resource review page. It does not mean the formal curriculum content page has been locked.</p>
        </div>
        <div className="powerup-review-selector-row">
          {GRADES.map((grade) => (
            <button
              className={selectedGrade === grade.id ? "powerup-review-chip active" : "powerup-review-chip"}
              key={grade.id}
              onClick={() => setSelectedGrade(grade.id)}
              type="button"
            >
              {grade.label}
            </button>
          ))}
        </div>
        <div className="powerup-review-selector-row">
          {UNITS.map((unit) => (
            <button
              className={selectedUnit === unit ? "powerup-review-chip active" : "powerup-review-chip"}
              key={unit}
              onClick={() => setSelectedUnit(unit)}
              type="button"
            >
              {unit === "unit-uh" ? "UH" : unit.replace("unit-", "U")}
            </button>
          ))}
        </div>
      </section>

      {manifestState.status === "loading" ? <section className="unit8-card">Loading resource manifest...</section> : null}
      {manifestState.status === "missing" ? (
        <section className="unit8-card">
          <h2>No Manifest Found</h2>
          <p>Run the Power Up resource sync for this level/unit before reviewing PDFs.</p>
        </section>
      ) : null}
      {manifestState.status === "ready" ? (
        <section className="unit8-card">
          <div className="powerup-review-summary">
            <div>
              <span>Lessons</span>
              <strong>{manifestState.manifest.summary.lessonCount}</strong>
            </div>
            <div>
              <span>Teacher Book</span>
              <strong>{totals?.["teacher-book"] ?? 0}</strong>
            </div>
            <div>
              <span>Pupil Book</span>
              <strong>{totals?.["pupil-book"] ?? 0}</strong>
            </div>
            <div>
              <span>Activity Book</span>
              <strong>{totals?.["activity-book"] ?? 0}</strong>
            </div>
          </div>

          <div className="powerup-review-lesson-list">
            {manifestState.manifest.lessons.map((lesson) => (
              <article className="powerup-review-lesson" key={lesson.lesson}>
                <h3>{selectedUnit === "unit-uh" ? `UH Lesson ${lesson.lesson}` : `Lesson ${lesson.lesson}`}</h3>
                <div className="powerup-review-pdf-grid">
                  {(["teacher-book", "pupil-book", "activity-book"] as ResourceRole[]).map((role) => {
                    const pdf = lesson.pdfs.find((item) => ROLE_FROM_MANIFEST[item.role] === role);
                    return pdf ? (
                      <a className={`source-button source-button-${role}`} href={pdf.publicPath} key={role} rel="noreferrer" target="_blank">
                        <span>{ROLE_LABELS[role]}</span>
                        <small>p{pdf.page}</small>
                      </a>
                    ) : (
                      <span className="source-button source-button-missing" key={role}>
                        <span>{ROLE_LABELS[role]}</span>
                        <small>TBD</small>
                      </span>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
