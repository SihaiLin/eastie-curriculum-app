import { dynamicUnitManifest } from "./dynamicUnitManifest";
import type { CourseType, CurriculumLevel } from "./types";

export const curriculumRegistry = dynamicUnitManifest
  .filter((entry) => entry.renderer === "non-language")
  .map((entry) => entry.unit);

export function getUnit(level: string, courseType: string, unitNumber: number) {
  return curriculumRegistry.find(
    (unit) =>
      unit.level.toLowerCase() === level.toLowerCase() &&
      unit.courseType === normalizeCourseType(courseType) &&
      unit.unitNumber === unitNumber,
  );
}

export function normalizeCourseType(courseType: string): CourseType {
  return courseType.toLowerCase() === "language" ? "language" : "non-language";
}

export function isCurriculumLevel(level: string): level is CurriculumLevel {
  return ["PG", "PK", "K1", "K2", "K3"].includes(level.toUpperCase());
}
