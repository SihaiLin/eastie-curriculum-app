import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { DASHBOARD_LEVELS, getDashboardForLevel } from "../../curriculum/curriculumDashboardConfig";
import type { DashboardCourseType, DashboardUnitLink } from "../../curriculum/curriculumDashboardConfig";
import type { CurriculumLevel } from "../../curriculum/types";
import type { LanguageCode } from "../../curriculum/types";

const COUNTRY_EXPLORATION_LEVELS: CurriculumLevel[] = ["K1", "K2", "K3"];
const CURRENT_COUNTRY_EXPLORATION_GROUP = "A";

const COUNTRY_EXPLORATION_GROUPS = [
  {
    code: "A",
    countries: [
      { flag: "🇨🇳", name: "China", zhName: "中国", slug: "china" },
      { flag: "🇺🇸", name: "USA", zhName: "美国", slug: "usa" },
      { flag: "🇰🇪", name: "Kenya", zhName: "肯尼亚", slug: "kenya" },
      { flag: "🇩🇪", name: "Germany", zhName: "德国", slug: "germany" },
    ],
  },
  {
    code: "B",
    countries: [
      { flag: "🇬🇧", name: "UK", zhName: "英国" },
      { flag: "🇳🇿", name: "New Zealand", zhName: "新西兰" },
      { flag: "🇧🇷", name: "Brazil", zhName: "巴西" },
      { flag: "🇰🇷", name: "South Korea", zhName: "韩国" },
    ],
  },
  {
    code: "C",
    countries: [
      { flag: "🇨🇳", name: "China", zhName: "中国", slug: "china" },
      { flag: "🇷🇺", name: "Russia", zhName: "俄罗斯" },
      { flag: "🇲🇬", name: "Madagascar", zhName: "马达加斯加" },
      { flag: "🇫🇷", name: "France", zhName: "法国" },
    ],
  },
  {
    code: "D",
    countries: [
      { flag: "🇸🇬", name: "Singapore", zhName: "新加坡" },
      { flag: "🇦🇺", name: "Australia", zhName: "澳大利亚" },
      { flag: "🇲🇦", name: "Morocco", zhName: "摩洛哥" },
      { flag: "🇲🇽", name: "Mexico", zhName: "墨西哥" },
    ],
  },
  {
    code: "E",
    countries: [
      { flag: "🇨🇳", name: "China", zhName: "中国", slug: "china" },
      { flag: "🇨🇦", name: "Canada", zhName: "加拿大" },
      { flag: "🇮🇹", name: "Italy", zhName: "意大利" },
      { flag: "🇹🇭", name: "Thailand", zhName: "泰国" },
    ],
  },
  {
    code: "F",
    countries: [
      { flag: "🌐", name: "Polar Regions", zhName: "极地（北极 + 南极）" },
      { flag: "🇿🇦", name: "South Africa", zhName: "南非" },
      { flag: "🇳🇱", name: "Netherlands", zhName: "荷兰" },
      { flag: "🇪🇬", name: "Egypt", zhName: "埃及" },
    ],
  },
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
        <span>{isZh ? "Show countries" : "Show countries"}</span>
        <small>Current group: {CURRENT_COUNTRY_EXPLORATION_GROUP}</small>
      </button>
      {isExpanded ? (
        <div className="country-exploration-groups">
          {COUNTRY_EXPLORATION_GROUPS.map((group) => (
            <section
              className={`country-exploration-group ${group.code === CURRENT_COUNTRY_EXPLORATION_GROUP ? "is-current" : ""}`}
              key={group.code}
            >
              <h4>Group {group.code}</h4>
              <div className="country-exploration-list">
                {group.countries.map((country) => (
                  <CountryExplorationCountryItem
                    country={country}
                    isZh={isZh}
                    key={`${group.code}-${country.name}`}
                    selectedLevel={selectedLevel}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CountryExplorationCountryItem({
  country,
  isZh,
  selectedLevel,
}: {
  country: (typeof COUNTRY_EXPLORATION_GROUPS)[number]["countries"][number];
  isZh: boolean;
  selectedLevel: CurriculumLevel;
}) {
  const content = (
    <>
      <span className="country-exploration-flag" aria-hidden="true">
        {country.flag}
      </span>
      <span className="country-exploration-text">
        <strong>{country.name}</strong>
        <small>{country.zhName}</small>
      </span>
    </>
  );

  if ("slug" in country) {
    return (
      <Link className="country-exploration-chip is-available" to={`/curriculum/${selectedLevel.toLowerCase()}/core/world-exploration/${country.slug}`}>
        {content}
      </Link>
    );
  }

  return (
    <span
      className="country-exploration-chip"
      role="button"
      title={isZh ? "课程页面设计中" : "Course page in design"}
    >
      {content}
    </span>
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
