import type { CurriculumLevel } from "../types";
import type { LanguageCode } from "../types";

export type CountryExplorationLevel = Extract<CurriculumLevel, "K1" | "K2" | "K3">;

export type CountryExplorationGradeContent = {
  overview: Record<LanguageCode, string>;
  lessons: Array<{
    number: number;
    markdown: Record<LanguageCode, string>;
  }>;
};

export type CountryExplorationCountry = {
  slug: string;
  name: string;
  zhName: string;
  flag: string;
  grades: Record<CountryExplorationLevel, CountryExplorationGradeContent>;
};
