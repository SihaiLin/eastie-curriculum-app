import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { DASHBOARD_LEVELS, getDashboardForLevel } from "../../curriculum/curriculumDashboardConfig";
import type { DashboardCourseType, DashboardUnitLink } from "../../curriculum/curriculumDashboardConfig";
import type { CurriculumLevel } from "../../curriculum/types";
import type { LanguageCode } from "../../curriculum/types";

export function CurriculumHome({ language }: { language: LanguageCode }) {
  const isZh = language === "zh";
  const [selectedLevel, setSelectedLevel] = useState<CurriculumLevel>("PG");
  const dashboard = useMemo(() => getDashboardForLevel(selectedLevel), [selectedLevel]);

  return (
    <main className="curriculum-home">
      <header className="curriculum-home-header">
        <div>
          <p className="curriculum-home-kicker">{isZh ? "课程目录" : "Curriculum Directory"}</p>
          <h1>{isZh ? "EASTIE 课程总览" : "EASTIE Curriculum Home"}</h1>
          <p>
            {isZh
              ? "按年级、课程类型、课程线和单元进入当前已上线页面。"
              : "Choose a grade, course type, course line, then open an available unit."}
          </p>
        </div>
      </header>

      <section className="curriculum-grade-selector" aria-label={isZh ? "选择年级" : "Choose grade"}>
        <span>{isZh ? "Grade" : "Grade"}</span>
        <div className="curriculum-grade-tabs">
          {DASHBOARD_LEVELS.map((level) => (
            <button
              className={`curriculum-grade-tab ${selectedLevel === level ? "active" : ""}`}
              key={level}
              onClick={() => setSelectedLevel(level)}
              type="button"
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      <div className="curriculum-dashboard">
        {dashboard.map((courseType) => (
          <CourseTypeSection courseType={courseType} isZh={isZh} key={courseType.code} selectedLevel={selectedLevel} />
        ))}
      </div>
    </main>
  );
}

function CourseTypeSection({
  courseType,
  selectedLevel,
  isZh,
}: {
  courseType: DashboardCourseType;
  selectedLevel: CurriculumLevel;
  isZh: boolean;
}) {
  const availableCount = courseType.courseLines.reduce(
    (count, line) => count + line.units.filter((unit) => unit.legacyRouteForUnit).length,
    0,
  );

  return (
    <section className={`curriculum-type-section curriculum-type-${courseType.code.toLowerCase()}`}>
      <header className="curriculum-type-header">
        <span className="curriculum-type-code">{courseType.code}</span>
        <div>
          <h2>{courseType.officialName}</h2>
          <p>
            {courseType.uiShortName} · {selectedLevel} · {availableCount} {isZh ? "个可用入口" : "available entries"}
          </p>
        </div>
      </header>

      <div className="curriculum-course-lines">
        {courseType.courseLines.map((courseLine) => (
          <article className="curriculum-course-line" key={courseLine.slug}>
            <div className="curriculum-course-line-label">
              <span>{courseLine.uiShortName}</span>
              <strong>{courseLine.officialName}</strong>
            </div>
            <div className="curriculum-unit-buttons">
              {courseLine.units.map((unit) => (
                <UnitButton courseLineName={courseLine.officialName} isZh={isZh} key={unit.unit} unit={unit} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function UnitButton({
  unit,
  courseLineName,
  isZh,
}: {
  unit: DashboardUnitLink;
  courseLineName: string;
  isZh: boolean;
}) {
  const label = unit.unit;
  const ariaLabel = `${courseLineName} ${label}`;

  if (unit.legacyRouteForUnit) {
    return (
      <Link
        aria-label={ariaLabel}
        className={`curriculum-unit-button is-${unit.status}`}
        title={unit.futureRoutePattern}
        to={unit.legacyRouteForUnit}
      >
        {label}
      </Link>
    );
  }

  return (
    <span
      aria-label={`${ariaLabel} ${isZh ? "尚未上线" : "not ready"}`}
      className="curriculum-unit-button is-not-ready"
      role="button"
      title={isZh ? "尚未上线" : "Not ready"}
    >
      {label}
    </span>
  );
}
