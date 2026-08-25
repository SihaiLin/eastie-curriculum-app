# K2 Language Dynamic Page Notes

Status: Draft

Created: 2026-06-16

## Source Files Used

- **Lesson pack HTML**:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/unit_01_our_new_school/02_teacher_review_output/unit_01_our_new_school_lesson_pack_v0.1.html`
- **Interaction design notes**:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/unit_01_our_new_school/03_resources_notes/k2_language_interaction_design_notes.md`
- **Source notes**:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/unit_01_our_new_school/03_resources_notes/source_notes.md`
- **Audio map**:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/unit_01_our_new_school/04_resources/audio/activity_book_class_audio/unit_01_activity_book_audio_map.md`

The HTML was used as a structural reference only. No static HTML content was copied into production.

## Why K2 Language Uses a Separate Renderer

K2 Language follows the **Power Up** curriculum structure, which differs from PG/PK Language:

| Aspect | PG/PK Language | K1/K2/K3 Language |
|--------|---------------|-------------------|
| Curriculum base | EASTIE custom | Power Up (Cambridge) |
| Lesson origin | All EASTIE-authored | `powerup_original` + `eastie_added_placeholder` |
| Field set | Lesson Title, Source Mini Progression Step, Lesson Outcome, New Language, Recycled Language, Baseline Child Response, etc. | Lesson Role, Source, Lesson Outcome, New Language, Recycled Language, Mission |
| Week structure | 5 lessons per week | 5-6 lessons per week (4 PU + 1 Mission Extend or 5 Showcase) |
| Unit overview | Prose sections | Structured: Unit Outcomes, Language Summary, Power Up Mission, 4-Week Structure, Showcase |
| Language display | EN/zh bilingual | English-only (teacher review style) |
| Teacher extension layer | None | Extended Vocabulary, Extended Sentence, Activity Ideas via API |
| Source field rendering | Plain text | Structured source references (TB/PB/AB pages, CD track links) |

K1/K2/K3 Language share a broadly similar Power Up structure and can reuse `KLanguageUnitPage`.

## Data Shape

K2 Language data conforms to the **existing** `LanguageUnitData` type defined in:

```
web/src/components/Curriculum/LanguageUnitPage.tsx
```

No new types were added to `types.ts`.

The `LanguageUnitData.type` weeks + lessons `fields: Record<string, string>` structure accommodates K2 fields. The key difference is in rendering logic (field order, source display, extension tools), handled entirely inside `KLanguageUnitPage`.

## Route Created

```
/curriculum/k2/language/unit-01
```

Route is handled by the existing route pattern `/curriculum/:level/:courseType/:unitSlug`. The `UnitPage.tsx` fallback routes K2 Language Unit 1 to `KLanguageUnitPage`.

## Top Navigation Rule

- **Home icon** / **Home link**: visible
- **Level badge**: shows the current level (e.g. K2)
- **Unit pills**: UH, U1-U8
  - U1 is active for K2 Language Unit 1
  - Other units are disabled
- **No EN/中文 toggle**: already hidden for all `/language/` paths by `AppLayout.tsx`
- **No course A-G sidebar**: K2 Language uses a lesson directory sidebar (same style as PG/PK Language Unit 6)

## Extension API Integration

Backend lives at:

```
/Users/Lucia/Desktop/eastie_sihai_space/apps/web
```

All extension data is stored in `apps/web/data/eastie-web.sqlite`.

### Endpoints Used

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/k2/language/units/:unitId/lessons/:lessonId/extensions` | Load extensions for a lesson |
| POST | `/api/k2/language/units/:unitId/lessons/:lessonId/extensions` | Create a new extension entry |
| DELETE | `/api/k2/language/extensions/:extensionId` | Soft-delete (archive) an extension |
| POST | `/api/k2/language/units/:unitId/lessons/:lessonId/reports` | Submit a report issue |
| GET | `/api/yle-word-bank` | Search YLE Gap Bank |

Current scope: `level=k2`, `course_type=language`, `unit_id=unit_01_our_new_school`.

### API Client Files

```
web/src/curriculum/extensions/k2ExtensionTypes.ts   -- type definitions
web/src/curriculum/extensions/k2ExtensionClient.ts   -- fetch wrappers
```

User identity is passed via request headers:
- `x-eastie-user-id`
- `x-eastie-user-name`
- `x-eastie-user-role`

If no headers are present, the backend falls back to a demo teacher identity.

## Files Created/Modified

### Created
- `web/src/curriculum/data/k2LanguageUnit01.ts` — Unit 1 structured data
- `web/src/curriculum/extensions/k2ExtensionTypes.ts` — Extension data types
- `web/src/curriculum/extensions/k2ExtensionClient.ts` — Extension API client
- `web/src/components/Curriculum/KLanguageUnitPage.tsx` — K1/K2/K3 Language renderer
- `docs/rules/curriculum/k2/k2_language_dynamic_page_notes.md` — This document

### Modified
- `web/src/components/Curriculum/UnitPage.tsx` — Added K2 Language routing fallback
- `web/src/components/Curriculum/CurriculumHome.tsx` — Added K2 Language U1 active link
- `web/src/components/Layout/AppLayout.tsx` — Dynamic topnav unit highlighting
- `web/src/styles/eastie.css` — Added K2 extension/Source/Report styles
- `web/vite.config.ts` — Updated proxy target to backend port 4321
- `docs/RULES_INDEX.md` — Registered this document

### Not Modified
- `web/src/curriculum/types.ts` — No new types added
- `web/src/components/Curriculum/LanguageUnitPage.tsx` — PG/PK Language unchanged
- PG/PK Non-Language Unit 8 data and renderer
- PG/PK Language Unit 6 data and renderer

## What Remains Before This Becomes K1/K2/K3 Shared Language Standard

1. **K1 Unit 1** and **K3 Unit 1** need similar data files and route registration when their content is ready.
2. **Source field** should eventually render clickable PDF/audio links (requires deploying resources or adding a resource manifest).
3. **YLE Word Bank** frontend UI (search dialog + add-to-vocabulary) is currently available via the API client but not connected to a UI component in the dynamic page.
4. **Report Issues** in the admin panel is served at the backend's `/admin/reports` — could be ported to the React admin interface.
5. Theme-level audio maps for later units need to be created in the curriculum workspace.
