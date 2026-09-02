import type { CourseType, CurriculumLevel } from "./types";

export function getDynamicUnitPath(
  level: string,
  courseType: string,
  unitNumber: number,
) {
  const normalizedLevel = level.toLowerCase();
  const normalizedCourseType = normalizeCourseType(courseType);

  if (!isKnownDynamicUnit(normalizedLevel, normalizedCourseType, unitNumber)) {
    return null;
  }

  const unitSlug = unitNumber === 0 ? "unit-uh" : `unit-${String(unitNumber).padStart(2, "0")}`;
  return `/curriculum/${normalizedLevel}/${normalizedCourseType}/${unitSlug}`;
}

function isKnownDynamicUnit(level: string, courseType: CourseType, unitNumber: number) {
  if (unitNumber < 0 || unitNumber > 9) return false;

  if (courseType === "language") {
    return ["pg", "pk", "k1", "k2", "k3"].includes(level);
  }

  if (level === "pg" || level === "pk") {
    return true;
  }

  return ["k1", "k2", "k3"].includes(level) && unitNumber >= 1;
}

function normalizeCourseType(courseType: string): CourseType {
  return courseType.toLowerCase() === "language" ? "language" : "non-language";
}

export function unitPath(level: CurriculumLevel, courseType: CourseType, unitNumber: number) {
  const unitSlug = unitNumber === 0 ? "unit-uh" : `unit-${String(unitNumber).padStart(2, "0")}`;
  return `/curriculum/${level.toLowerCase()}/${courseType}/${unitSlug}`;
}
