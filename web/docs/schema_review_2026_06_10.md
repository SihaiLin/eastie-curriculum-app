# Web Curriculum Schema Review

Date: 2026-06-10

Scope:

```text
First-stage dynamic frontend prototype
PK Non-Language Unit 8
```

Reviewed files:

```text
src/curriculum/types.ts
src/curriculum/data/pkNonLanguageUnit08.ts
src/components/Curriculum/UnitPrototypePage.tsx
src/components/LanguageToggle/LanguageToggle.tsx
src/components/Feedback/FeedbackButton.tsx
src/components/Layout/AppLayout.tsx
src/app/App.tsx
```

## Review Conclusion

The current schema is suitable as:

```text
prototype schema v0.0
```

It is not ready to lock as:

```text
web curriculum data contract v0.1
```

Reason:

The current implementation supports PK Non-Language Unit 8 well, but it is still too specific to that unit and would likely require breaking changes when adding PG Unit 8, PG/PK Language Unit 6, or future K1/K2/K3 language pages.

---

## Main Schema Blockers

- `level: "PK"` is too narrow. It should become `"PG" | "PK" | "K1" | "K2" | "K3"`.
- `courseType: "non-language"` is too narrow. It should become `"language" | "non-language"` or a broader program type.
- `CourseTrack.code` is fixed to `"A" | "B" | "C1" | ...`, which fits PK non-language but not all language courses or future K levels.
- `Lesson.number: 1 | 2 | 3 | 4` assumes all units have exactly four lessons.
- `language` is too Unit 8-specific because it contains fixed buckets such as `animalSounds` and `careLanguage`.
- `overview`, `purpose`, and `outcome` are currently single rich-ish strings. This is acceptable for the prototype, but may need structured blocks later.
- Feedback context is not part of the curriculum data contract yet and is reconstructed in components with hard-coded values.

---

## Recommended Schema Changes Before v0.1

1. Generalize `level`.
2. Generalize `courseType`.
3. Rename `unitTitle` to `title`.
4. Rename `language` to `languageSections` or `vocabularySections`.
5. Replace fixed language buckets with flexible sections:

```ts
sections: Array<{
  id: string;
  title: LocalizedText;
  items: string[];
}>
```

6. Add reusable metadata:

```text
level
courseType
unitNumber
slug
status
sourceRef
```

7. Add or derive stable feedback identity fields:

```text
level
courseType
unitId
unitNumber
unitTitle
courseCode
lessonNumber
```

8. Relax course codes and lesson numbers:

```text
CourseTrack.code: string
Lesson.number: number
```

---

## Component Review

Reusable already:

- `LanguageToggle.tsx`
- `FeedbackButton.tsx`
- `AppLayout.tsx`

Needs extraction before v0.1:

- `UnitOverview`
- `CourseTrackCard`
- `LessonCard`
- `LanguageSection` / `VocabularySection`
- `CourseDirectory`

Current risk:

- `UnitPrototypePage.tsx` imports `pkNonLanguageUnit08` directly, so it is not a generic unit renderer.
- Feedback payloads are hard-coded in component render paths.
- UI labels are local `useMemo` literals. This is acceptable for one prototype but should become shared labels or i18n helpers before scaling.

---

## Route Review

Current prototype route:

```text
/curriculum/pk/non-language/unit-08
```

Recommended scalable route direction:

```text
/curriculum/:level/:courseType/unit-:unitNumber
/curriculum/:level/:courseType/unit-:unitNumber/course-:courseCode
/curriculum/:level/:courseType/unit-:unitNumber/course-:courseCode/lesson-:lessonNumber
```

Add a unit lookup helper:

```ts
getUnit(level, courseType, unitNumber)
```

Do not keep routing tied to a direct import of `pkNonLanguageUnit08`.

---

## Data Authoring Direction

Keep `pkNonLanguageUnit08.ts` hand-authored for the first prototype and possibly one more unit.

Long-term direction:

```text
reviewed markdown/source content
↓
generator/import script
↓
normalized JSON/TS data
↓
schema validation
↓
dynamic frontend render
```

Add a validation layer after the schema begins to stabilize.

Candidate tools:

```text
Zod
JSON Schema
```

---

## Decision

Initial review result: do not lock schema v0.1 yet.

Next web engineering task should be:

```text
Generalize prototype schema v0.0 toward web curriculum data contract v0.1.
```

Do not add more units before this generalization pass is reviewed.

## Follow-Up

The schema generalization pass was completed after this review.

Final v0.1 contract:

```text
web/docs/web_curriculum_data_contract_v0_1.md
```
