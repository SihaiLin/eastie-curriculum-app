export type LanguageCode = "en" | "zh";

export type LocalizedText = Record<LanguageCode, string>;

export type CurriculumLevel = "PG" | "PK" | "K1" | "K2" | "K3";

export type CourseType = "language" | "non-language";

export type CurriculumStatus = "prototype" | "draft" | "review" | "locked";

export interface LanguageSection {
  id: string;
  title: LocalizedText;
  items: string[];
  variant?: "core" | "support" | "optional";
}

export interface CurriculumSourceRef {
  workspace: string;
  path: string;
}

export interface UnitOverviewSection {
  id: string;
  title: LocalizedText;
  body?: LocalizedText;
  groups?: UnitOverviewGroup[];
}

export interface UnitOverviewGroup {
  title: LocalizedText;
  items: string[];
}

export interface CurriculumUnit {
  unitId: string;
  slug: string;
  status: CurriculumStatus;
  level: CurriculumLevel;
  courseType: CourseType;
  unitNumber: number;
  title: LocalizedText;
  theme: string;
  sourceRef?: CurriculumSourceRef;
  sourceMarkdown?: LocalizedText;
  overview: LocalizedText;
  languageSections: LanguageSection[];
  weeklySubthemes: WeeklySubtheme[];
  overviewSections?: UnitOverviewSection[];
  courses: CourseTrack[];
}

export interface WeeklySubtheme {
  week: number;
  title: LocalizedText;
  summary: LocalizedText;
}

export interface CourseTrack {
  code: string;
  title: LocalizedText;
  purpose: LocalizedText;
  sourceMarkdown?: LocalizedText;
  lessons: Lesson[];
}

export interface Lesson {
  number: number;
  title: LocalizedText;
  week: number;
  outcome: LocalizedText;
  languageFocus: string[];
  languageFocusZh?: string[];
  activitySeeds: string[];
  activitySeedsZh?: string[];
}
