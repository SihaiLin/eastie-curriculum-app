import type { CurriculumLevel } from "./types";

export type DashboardCourseTypeCode = "EL" | "CC" | "CE" | "PE";
export type DashboardUnitLabel = "UH" | `U${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
export type DashboardRouteStatus = "available" | "not-ready" | "prototype" | "reference";

export type DashboardUnitLink = {
  unit: DashboardUnitLabel;
  legacyRouteForUnit?: string;
  futureRoutePattern: string;
  status: DashboardRouteStatus;
};

export type DashboardCourseLine = {
  officialName: string;
  uiShortName: string;
  slug: string;
  units: DashboardUnitLink[];
};

export type DashboardCourseType = {
  code: DashboardCourseTypeCode;
  officialName: string;
  uiShortName: string;
  courseLines: DashboardCourseLine[];
};

export const DASHBOARD_LEVELS: CurriculumLevel[] = ["PG", "PK", "K1", "K2", "K3"];

const STANDARD_UNITS: DashboardUnitLabel[] = ["UH", "U1", "U2", "U3", "U4", "U5", "U6", "U7", "U8", "U9"];
const UNIT_1_TO_9: DashboardUnitLabel[] = ["U1", "U2", "U3", "U4", "U5", "U6", "U7", "U8", "U9"];

const COURSE_TYPES: Record<DashboardCourseTypeCode, Omit<DashboardCourseType, "courseLines">> = {
  EL: { code: "EL", officialName: "English Language", uiShortName: "English" },
  CC: { code: "CC", officialName: "Core Courses", uiShortName: "Core" },
  CE: { code: "CE", officialName: "Creative Enrichment", uiShortName: "Enrichment" },
  PE: { code: "PE", officialName: "Physical Education", uiShortName: "PE" },
};

const PG_PK_CORE_COURSES = [
  {
    officialName: "Self-Care & Daily Routine Experience",
    uiShortName: "Self-Care",
    slug: "self-care-daily-routine",
    legacyCourse: "a",
  },
  {
    officialName: "Sensory & Object Exploration",
    uiShortName: "Sensory",
    slug: "sensory-object-exploration",
    legacyCourse: "b",
  },
  {
    officialName: "PSED & Safety",
    uiShortName: "PSED & Safety",
    slug: "psed-safety",
    legacyCourse: "g",
  },
] as const;

const PG_PK_ENRICHMENT_COURSES = [
  {
    officialName: "Pretend Play & Role-Play Experience",
    uiShortName: "Pretend Play",
    slug: "pretend-play-role-play-experience",
    legacyCourse: "c2",
  },
  {
    officialName: "Story & Puppet Experience",
    uiShortName: "Story & Puppet",
    slug: "story-puppet-experience",
    legacyCourse: "c1",
  },
  {
    officialName: "Creative Expression",
    uiShortName: "Art",
    slug: "creative-expression",
    legacyCourse: "d",
  },
  {
    officialName: "Music, Rhythm & Movement",
    uiShortName: "Music",
    slug: "music-rhythm-movement",
    legacyCourse: "e",
  },
  {
    officialName: "Construction & Small-World Play",
    uiShortName: "Construction",
    slug: "construction-small-world-play",
    legacyCourse: "f",
  },
] as const;

function unitSlug(unit: DashboardUnitLabel) {
  return unit === "UH" ? "unit-uh" : `unit-${unit.slice(1).padStart(2, "0")}`;
}

function languageRoute(level: CurriculumLevel, unit: DashboardUnitLabel) {
  return `/curriculum/${level.toLowerCase()}/language/${unitSlug(unit)}`;
}

function pgPkCourseRoute(level: CurriculumLevel, unit: DashboardUnitLabel, legacyCourse: string) {
  return `/curriculum/${level.toLowerCase()}/non-language/${unitSlug(unit)}/course-${legacyCourse}`;
}

function kCourseRoute(level: CurriculumLevel, unit: DashboardUnitLabel, legacyCourse: "a" | "b" | "c") {
  if (unit === "UH") return undefined;
  return `/curriculum/${level.toLowerCase()}/non-language/${unitSlug(unit)}/course-${legacyCourse}`;
}

function futureRoute(level: CurriculumLevel, category: DashboardCourseTypeCode, slug: string, unit: DashboardUnitLabel) {
  const levelPath = level.toLowerCase();
  if (category === "EL") return `/curriculum/${levelPath}/english-language/${unitSlug(unit)}`;
  if (category === "CC") return `/curriculum/${levelPath}/core/${slug}/${unitSlug(unit)}`;
  if (category === "CE") return `/curriculum/${levelPath}/creative-enrichment/${slug}/${unitSlug(unit)}`;
  return `/curriculum/${levelPath}/physical-education/${slug}/${unitSlug(unit)}`;
}

function makeUnits(
  level: CurriculumLevel,
  category: DashboardCourseTypeCode,
  slug: string,
  routeForUnit: (unit: DashboardUnitLabel) => string | undefined,
  units: DashboardUnitLabel[] = STANDARD_UNITS,
): DashboardUnitLink[] {
  return units.map((unit) => {
    const legacyRouteForUnit = routeForUnit(unit);
    return {
      unit,
      legacyRouteForUnit,
      futureRoutePattern: futureRoute(level, category, slug, unit),
      status: legacyRouteForUnit ? "available" : "not-ready",
    };
  });
}

function makeCourseLine(
  level: CurriculumLevel,
  category: DashboardCourseTypeCode,
  officialName: string,
  uiShortName: string,
  slug: string,
  routeForUnit: (unit: DashboardUnitLabel) => string | undefined,
  units?: DashboardUnitLabel[],
): DashboardCourseLine {
  return {
    officialName,
    uiShortName,
    slug,
    units: makeUnits(level, category, slug, routeForUnit, units),
  };
}

function makePgPkDashboard(level: "PG" | "PK"): DashboardCourseType[] {
  return [
    {
      ...COURSE_TYPES.EL,
      courseLines: [
        makeCourseLine(level, "EL", "English Language", "English", "english-language", (unit) => languageRoute(level, unit)),
      ],
    },
    {
      ...COURSE_TYPES.CC,
      courseLines: PG_PK_CORE_COURSES.map((course) =>
        makeCourseLine(level, "CC", course.officialName, course.uiShortName, course.slug, (unit) =>
          pgPkCourseRoute(level, unit, course.legacyCourse),
        ),
      ),
    },
    {
      ...COURSE_TYPES.CE,
      courseLines: PG_PK_ENRICHMENT_COURSES.map((course) =>
        makeCourseLine(level, "CE", course.officialName, course.uiShortName, course.slug, (unit) =>
          pgPkCourseRoute(level, unit, course.legacyCourse),
        ),
      ),
    },
    {
      ...COURSE_TYPES.PE,
      courseLines: [
        makeCourseLine(level, "PE", "Physical Education", "PE", "physical-education", () => undefined),
      ],
    },
  ];
}

function makeKDashboard(level: "K1" | "K2" | "K3"): DashboardCourseType[] {
  const peCourses =
    level === "K1"
      ? [
          ["Football", "Football", "football"],
          ["Frisbee", "Frisbee", "frisbee"],
        ]
      : level === "K2"
        ? [
            ["Basketball", "Basketball", "basketball"],
            ["Tennis", "Tennis", "tennis"],
          ]
        : [
            ["Volleyball", "Volleyball", "volleyball"],
            ["Rope Skipping", "Rope Skipping", "rope-skipping"],
          ];

  const coreCourseLines: DashboardCourseLine[] = [
    ...(level === "K1"
      ? [
          makeCourseLine(level, "CC", "Self-Care & Daily Routine Experience", "Self-Care", "self-care-daily-routine", () => undefined),
          makeCourseLine(level, "CC", "PSED & Safety", "PSED & Safety", "psed-safety", () => undefined),
        ]
      : []),
    makeCourseLine(level, "CC", "Maths", "Maths", "maths", (unit) => kCourseRoute(level, unit, "a"), UNIT_1_TO_9),
    makeCourseLine(level, "CC", "Graded Reading", "Reading", "graded-reading", (unit) => kCourseRoute(level, unit, "b"), UNIT_1_TO_9),
    makeCourseLine(level, "CC", "World Exploration", "World", "world-exploration", () => undefined, UNIT_1_TO_9),
    ...(level === "K3"
      ? [makeCourseLine(level, "CC", "Chinese Language", "Chinese", "chinese-language", () => undefined)]
      : []),
  ];

  const artRoute = (unit: DashboardUnitLabel) =>
    level === "K2" && unit === "U1" ? kCourseRoute(level, unit, "c") : undefined;

  return [
    {
      ...COURSE_TYPES.EL,
      courseLines: [
        makeCourseLine(level, "EL", "English Language", "English", "english-language", (unit) => languageRoute(level, unit)),
      ],
    },
    {
      ...COURSE_TYPES.CC,
      courseLines: coreCourseLines,
    },
    {
      ...COURSE_TYPES.CE,
      courseLines: [
        makeCourseLine(level, "CE", "Creative Expression", "Art", "creative-expression", artRoute, UNIT_1_TO_9),
        makeCourseLine(level, "CE", "Music, Rhythm & Movement", "Music", "music-rhythm-movement", () => undefined, UNIT_1_TO_9),
        makeCourseLine(level, "CE", "Construction & Small-World Play", "Construction", "construction-small-world-play", () => undefined, UNIT_1_TO_9),
        makeCourseLine(level, "CE", "Cooking & Food Exploration", "Cooking", "cooking-food-exploration", () => undefined, UNIT_1_TO_9),
        makeCourseLine(level, "CE", "Pretend Play & Role-Play", "Drama", "pretend-play-role-play", () => undefined, UNIT_1_TO_9),
        makeCourseLine(level, "CE", "Science Exploration", "Science", "science-exploration", () => undefined, UNIT_1_TO_9),
      ],
    },
    {
      ...COURSE_TYPES.PE,
      courseLines: peCourses.map(([officialName, uiShortName, slug]) =>
        makeCourseLine(level, "PE", officialName, uiShortName, slug, () => undefined, UNIT_1_TO_9),
      ),
    },
  ];
}

export function getDashboardForLevel(level: CurriculumLevel): DashboardCourseType[] {
  if (level === "PG" || level === "PK") return makePgPkDashboard(level);
  return makeKDashboard(level);
}
