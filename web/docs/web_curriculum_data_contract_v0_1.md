# Web Curriculum Data Contract v0.1

Status: locked

Locked date: 2026-06-10

Workspace:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web/
```

Primary implementation file:

```text
src/curriculum/types.ts
```

Reference implementation:

```text
src/curriculum/data/pkNonLanguageUnit08.ts
```

---

## 1. Purpose

This document locks the first reusable curriculum data contract for the dynamic EASTIE curriculum frontend.

The goal of v0.1 is not to model every future curriculum detail perfectly. The goal is to provide a stable enough structure for the next dynamic unit experiments without immediately breaking when adding:

- PG non-language Unit 8;
- PG/PK language Unit 6;
- future K1/K2/K3 language pages;
- bilingual display;
- feedback context;
- route-loaded unit rendering.

---

## 2. Scope

This contract covers frontend curriculum rendering data.

It does not define:

- backend database schema;
- authentication schema;
- final curriculum source markdown format;
- translation source workflow;
- full assessment or reporting models.

---

## 3. Locked Type Direction

### Language

```ts
type LanguageCode = "en" | "zh";
type LocalizedText = Record<LanguageCode, string>;
```

### Level

```ts
type CurriculumLevel = "PG" | "PK" | "K1" | "K2" | "K3";
```

### Course Type

```ts
type CourseType = "language" | "non-language";
```

### Status

The locked v0.1 status values are:

```ts
type CurriculumStatus = "prototype" | "draft" | "review" | "locked";
```

Meaning:

```text
prototype = engineering or content experiment; useful but not a source-final unit
draft     = active curriculum draft under review
review    = ready for curriculum / leadership review
locked    = approved current source for teacher-facing rendering
```

Do not add new status values casually. If more are needed, revise the contract.

---

## 4. Source Reference

The locked v0.1 source reference shape is:

```ts
interface CurriculumSourceRef {
  workspace: string;
  path: string;
}
```

Meaning:

```text
workspace = human-readable source workspace label
path      = path inside that workspace, or a known relative source location
```

Current example:

```ts
sourceRef: {
  workspace: "PG_PK_Language_Syllabus",
  path: "06_curriculum_design/pk/non_language_courses/unit_08_nature_weather_animals",
}
```

This shape is sufficient for v0.1.

Future versions may add:

```text
version
sourceType
lastReviewedAt
contentHash
```

Do not add these until the import/generation workflow is clearer.

---

## 5. Curriculum Unit

The v0.1 unit shape is:

```ts
interface CurriculumUnit {
  unitId: string;
  slug: string;
  status: CurriculumStatus;
  level: CurriculumLevel;
  courseType: CourseType;
  unitNumber: number;
  title: LocalizedText;
  theme: string;
  sourceRef?: CurriculumSourceRef;
  overview: LocalizedText;
  languageSections: LanguageSection[];
  weeklySubthemes: WeeklySubtheme[];
  courses: CourseTrack[];
}
```

Rules:

- `unitId` must be stable.
- `slug` should be route-friendly.
- `title` replaces the older `unitTitle`.
- `theme` is a concise machine-friendly theme label.
- `sourceRef` is optional but recommended for any imported or derived unit.
- `languageSections` must be flexible enough for language and non-language courses.

---

## 6. Language Sections

The v0.1 language section shape is:

```ts
interface LanguageSection {
  id: string;
  title: LocalizedText;
  items: string[];
  variant?: "core" | "support" | "optional";
}
```

Rules:

- Use `core` only for true primary vocabulary.
- Use `support` for functional, movement, care, sound, or other secondary language groups.
- Use `optional` for readiness-based challenge language.
- Do not create unit-specific hard-coded fields such as `animalSounds` or `careLanguage` in the root unit schema.

---

## 7. Weekly Subthemes

```ts
interface WeeklySubtheme {
  week: number;
  title: LocalizedText;
  summary: LocalizedText;
}
```

This is intentionally light.

Detailed weekly planning should not be forced into v0.1 unless a future course type needs it.

---

## 8. Course Tracks

```ts
interface CourseTrack {
  code: string;
  title: LocalizedText;
  purpose: LocalizedText;
  lessons: Lesson[];
}
```

Rules:

- `code` is a string so it can support `A`, `B`, `C1`, `C2`, Power Up lesson codes, or future course structures.
- Do not lock course codes to PK non-language A-G only.

---

## 9. Lessons

```ts
interface Lesson {
  number: number;
  title: LocalizedText;
  week: number;
  outcome: LocalizedText;
  languageFocus: string[];
  activitySeeds: string[];
}
```

Rules:

- `number` is a number, not a fixed union.
- `week` allows lessons to map back to a weekly rhythm without forcing all courses to have exactly four lessons forever.
- `languageFocus` and `activitySeeds` are intentionally lightweight for v0.1.

Future versions may replace these with richer structured blocks after more unit types are tested.

---

## 10. Feedback Context

Feedback context should be derived from unit/course/lesson data, not hard-coded in render paths.

Current helper:

```text
src/feedback/feedbackContext.ts
```

The frontend should provide enough context for the backend to attach feedback to:

- level;
- course type;
- unit;
- course;
- lesson;
- page URL;
- logged-in user;
- timestamp.

The backend should eventually infer user and timestamp.

---

## 11. Routing

The v0.1 routing direction is:

```text
/curriculum/:level/:courseType/unit-:unitNumber
/curriculum/:level/:courseType/unit-:unitNumber/course-:courseCode
/curriculum/:level/:courseType/unit-:unitNumber/course-:courseCode/lesson-:lessonNumber
```

Current implementation may still use a transitional unit slug route, but the renderer should use registry lookup rather than direct page-specific imports.

Current lookup helper:

```text
src/curriculum/curriculumRegistry.ts
```

---

## 12. Known Limits

v0.1 does not yet solve:

- final markdown-to-data generation;
- schema validation with Zod or JSON Schema;
- backend persistence;
- login;
- content versioning;
- rich block rendering for complex course pages;
- K1/K2/K3-specific language structures.

These should be handled in later contract versions after one or two more unit shapes are tested.

---

## 13. Lock Decision

The v0.1 contract is approved for the next engineering step:

```text
Use v0.1 to add one additional dynamic unit shape for compatibility testing.
```

Recommended next unit for compatibility testing:

```text
PG Non-Language Unit 8
```

Do not scale all units yet.

