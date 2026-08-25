import type { CourseTrack, CurriculumUnit, Lesson } from "../curriculum/types";
import type { FeedbackContext } from "./feedbackTypes";

export function createFeedbackPayload(
  unit: CurriculumUnit,
  context?: {
    course?: CourseTrack;
    language?: "en" | "zh";
    lesson?: Lesson;
  },
): FeedbackContext {
  const course = context?.course;
  const lesson = context?.lesson;
  const language = context?.language ?? "en";

  return {
    course_code: course?.code ?? "",
    course_title: course?.title[language] ?? course?.title.en ?? "",
    course_type: unit.courseType,
    language,
    lesson_id: lesson && course ? `${unit.level.toLowerCase()}-u${String(unit.unitNumber).padStart(2, "0")}-course-${course.code.toLowerCase()}-lesson-${String(lesson.number).padStart(2, "0")}` : "",
    lesson_title: lesson?.title[language] ?? lesson?.title.en ?? "",
    level: unit.level,
    page_url: window.location.pathname,
    unit_id: unit.unitId,
    unit_number: unit.unitNumber,
    unit_title: unit.title[language] ?? unit.title.en,
  };
}
