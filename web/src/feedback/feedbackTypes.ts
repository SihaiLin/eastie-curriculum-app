import type { CourseType, CurriculumLevel, LanguageCode } from "../curriculum/types";

export type FeedbackCategory = "content" | "translation" | "layout" | "bug" | "other";
export type FeedbackStatus = "open" | "reviewed" | "resolved";

export interface FeedbackContext {
  unit_id: string;
  unit_title: string;
  level: CurriculumLevel;
  course_type: CourseType;
  unit_number: number;
  course_code: string;
  course_title: string;
  lesson_id: string;
  lesson_title: string;
  page_url: string;
  language?: LanguageCode;
}

export interface FeedbackPayload {
  context: FeedbackContext;
  message: string;
  category?: FeedbackCategory;
}

export interface FeedbackItem {
  id: string;
  context: FeedbackContext;
  message: string;
  category: FeedbackCategory | null;
  status: FeedbackStatus;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    email: string;
    display_name: string;
    role: "admin" | "teacher";
  } | null;
}

export interface FeedbackResult {
  ok: boolean;
  message: string;
  feedbackId?: string;
}
