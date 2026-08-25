# Schema Generalization Report

Date: 2026-06-10

Workspace:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web
```

## Scope

Generalize the first PK Non-Language Unit 8 prototype schema toward a reusable web curriculum data contract.

No new units were added.

No static curriculum HTML was copied into `web/public`.

No content migration was done.

## Files Modified

```text
src/curriculum/types.ts
src/curriculum/data/pkNonLanguageUnit08.ts
src/curriculum/curriculumRegistry.ts
src/components/Curriculum/UnitPage.tsx
src/app/App.tsx
src/feedback/feedbackContext.ts
```

## Schema Changes

- Generalized `level` to support `PG | PK | K1 | K2 | K3`.
- Generalized `courseType` to support `language | non-language`.
- Renamed `unitTitle` to `title`.
- Added `unitId`, `slug`, `status`, and optional `sourceRef`.
- Replaced Unit 8-specific language buckets with flexible `languageSections`.
- Added `LanguageSection` with `id`, `title`, `items`, and optional `variant`.
- Relaxed `CourseTrack.code` to `string`.
- Relaxed `Lesson.number` to `number`.

## Renderer Changes

- Replaced `UnitPrototypePage` with route-loaded `UnitPage`.
- Added generic lookup through `getUnit(level, courseType, unitNumber)`.
- Extracted modest internal renderer pieces:
  - `CourseDirectory`
  - `UnitOverview`
  - `LanguageSection`
  - `CourseTrackCard`
  - `LessonCard`
- Feedback payloads now derive from unit/course/lesson through `createFeedbackPayload`.

## Validation Reported

```text
npm run build passed
Smoke test passed
Unit Overview renders
8 course tracks render
32 lessons render
5 language sections render
Feedback buttons render
中文 toggle updates title
```

Screenshot reported:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web/dist/pk-unit-08-generalized-schema.png
```

Note: the screenshot file was not present during PM-side file verification after the report, likely because the build output changed. Treat it as reported validation, not an archived artifact.

## Remaining Before v0.1 Lock

- PM/technical review of the generalized schema.
- Decide whether `sourceRef` shape is sufficient.
- Decide whether `status` values should be exactly:

```text
prototype | draft | review | locked
```

- Consider adding schema validation after the next reviewed unit shape.

## PM Decision

Updated after PM review:

```text
web curriculum data contract v0.1 locked
```

Contract document:

```text
web/docs/web_curriculum_data_contract_v0_1.md
```

Approved next step:

```text
Use v0.1 to add one additional dynamic unit shape for compatibility testing.
```

Recommended next unit:

```text
PG Non-Language Unit 8
```
