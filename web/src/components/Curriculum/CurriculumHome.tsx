import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { DASHBOARD_LEVELS, getDashboardForLevel } from "../../curriculum/curriculumDashboardConfig";
import type { DashboardCourseType, DashboardUnitLink } from "../../curriculum/curriculumDashboardConfig";
import type { CurriculumLevel } from "../../curriculum/types";
import type { LanguageCode } from "../../curriculum/types";

const COUNTRY_EXPLORATION_LEVELS: CurriculumLevel[] = ["K1", "K2", "K3"];

const COUNTRY_EXPLORATION_COUNTRIES = [
  { flag: "🇨🇳", name: "China", zhName: "中国" },
  { flag: "🇺🇸", name: "USA", zhName: "美国" },
  { flag: "🇬🇧", name: "UK", zhName: "英国" },
  { flag: "🇷🇺", name: "Russia", zhName: "俄罗斯" },
  { flag: "🇩🇪", name: "Germany", zhName: "德国" },
  { flag: "🇮🇹", name: "Italy", zhName: "意大利" },
  { flag: "🇫🇷", name: "France", zhName: "法国" },
  { flag: "🇳🇱", name: "Netherlands", zhName: "荷兰" },
  { flag: "🇰🇷", name: "South Korea", zhName: "韩国" },
  { flag: "🇹🇭", name: "Thailand", zhName: "泰国" },
  { flag: "🇦🇺", name: "Australia", zhName: "澳大利亚" },
  { flag: "🇳🇿", name: "New Zealand", zhName: "新西兰" },
  { flag: "🇨🇦", name: "Canada", zhName: "加拿大" },
  { flag: "🇲🇽", name: "Mexico", zhName: "墨西哥" },
  { flag: "🇧🇷", name: "Brazil", zhName: "巴西" },
  { flag: "🇲🇬", name: "Madagascar", zhName: "马达加斯加" },
  { flag: "🇪🇬", name: "Egypt", zhName: "埃及" },
  { flag: "🇸🇬", name: "Singapore", zhName: "新加坡" },
  { flag: "🇿🇦", name: "South Africa", zhName: "南非" },
  { flag: "🇰🇪", name: "Kenya", zhName: "肯尼亚" },
  { flag: "🇲🇦", name: "Morocco", zhName: "摩洛哥" },
  { flag: "🌐", name: "Polar Regions", zhName: "极地（北极 + 南极）" },
];

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
              {courseLine.slug === "world-exploration" && COUNTRY_EXPLORATION_LEVELS.includes(selectedLevel) ? (
                <CountryExplorationList isZh={isZh} selectedLevel={selectedLevel} />
              ) : (
                courseLine.units.map((unit) => (
                  <UnitButton courseLineName={courseLine.officialName} isZh={isZh} key={unit.unit} unit={unit} />
                ))
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CountryExplorationList({ selectedLevel, isZh }: { selectedLevel: CurriculumLevel; isZh: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="country-exploration-panel" aria-label={isZh ? `${selectedLevel} 国家探索` : `${selectedLevel} Country Exploration`}>
      <button
        aria-expanded={isExpanded}
        className="country-exploration-toggle"
        onClick={() => setIsExpanded((current) => !current)}
        type="button"
      >
        <span className="country-exploration-toggle-icon" aria-hidden="true">
          {isExpanded ? "−" : "+"}
        </span>
        <span>{isZh ? "展开国家列表" : "Show countries"}</span>
      </button>
      {isExpanded ? (
        <div className="country-exploration-list">
          {COUNTRY_EXPLORATION_COUNTRIES.map((country) => (
            <span
              className="country-exploration-chip"
              key={country.name}
              role="button"
              title={isZh ? "课程页面设计中" : "Course page in design"}
            >
              <span className="country-exploration-flag" aria-hidden="true">
                {country.flag}
              </span>
              <span className="country-exploration-text">
                <strong>{country.name}</strong>
                <small>{country.zhName}</small>
              </span>
            </span>
          ))}
        </div>
      ) : null}
    </div>
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
