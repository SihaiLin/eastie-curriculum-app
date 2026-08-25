# Curriculum Content Sync Workflow

Status: active workflow note

Last updated: 2026-06-12

This document explains how reviewed Markdown curriculum content is synced into the dynamic EASTIE web app.

The current frontend does **not** read Markdown files directly in the browser. The workflow is:

```text
reviewed Markdown source
↓
sync script
↓
generated TypeScript snapshot
↓
React dynamic renderer
```

---

## 1. Source of Truth

Curriculum source files currently remain in the historical curriculum workspace:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

Do not treat `Downloads` as source of truth.

Do not treat generated TypeScript snapshot files as curriculum source of truth.

The clean engineering workspace is:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/
```

For now, its `content/` folder stays intentionally empty until curriculum source files are cleaned and locked for formal migration.

---

## 2. Current Synced Units

### PG Non-Language Unit 8

Source folder:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pg/unit_08_nature_weather_animals/
```

Sync command:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run sync:pg-unit-08
```

Generated snapshot:

```text
src/curriculum/generated/pgUnit08Markdown.ts
```

Data file that references the generated snapshot:

```text
src/curriculum/data/pgNonLanguageUnit08.ts
```

### PK Non-Language Unit 8

Source folder:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pk/non_language_courses/unit_08_nature_weather_animals/
```

Sync command:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run sync:pk-unit-08
```

Generated snapshot:

```text
src/curriculum/generated/pkUnit08Markdown.ts
```

Data file that references the generated snapshot:

```text
src/curriculum/data/pkNonLanguageUnit08.ts
```

---

## 3. Standard Update Steps

When a curriculum Markdown file changes:

1. Edit or review the Markdown source file in the historical curriculum workspace.
2. Run the relevant sync command.
3. Run the frontend build.
4. Open the affected page in the local app and visually check it.

Example:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run sync:pk-unit-08
npm run build
npm run dev
```

Then check:

```text
http://localhost:5173/curriculum/pk/non-language/unit-08
http://localhost:5173/curriculum/pk/non-language/unit-08/course-a
```

---

## 4. Files That Should Not Be Hand-Edited

Do not manually edit generated Markdown snapshot files:

```text
src/curriculum/generated/pgUnit08Markdown.ts
src/curriculum/generated/pkUnit08Markdown.ts
```

These files are overwritten by sync scripts.

If wording is wrong, edit the source Markdown file and rerun the sync command.

---

## 5. Files That May Be Edited Carefully

These files connect generated content to the web curriculum registry and route renderer:

```text
src/curriculum/data/pgNonLanguageUnit08.ts
src/curriculum/data/pkNonLanguageUnit08.ts
src/curriculum/curriculumRegistry.ts
src/components/Curriculum/UnitPage.tsx
src/styles/eastie.css
```

Use these files for:

- metadata;
- route-level unit registration;
- renderer behavior;
- visual styling;
- feedback context connection.

Do not use these files as the primary place to rewrite curriculum wording.

---

## 6. Validation Checklist

After syncing content, verify:

- `npm run build` passes;
- the unit overview opens;
- each Course A-G page opens;
- English and Chinese toggles show the expected content;
- lesson feedback still appears;
- no raw Markdown markers are visible, such as `**bold**` or backticks;
- no old summary-only lesson cards appear where full lesson frames should be shown;
- mobile course selector is not covered by the top navigation.

Known current build warning:

```text
Some chunks are larger than 500 kB after minification.
```

This is expected for now because PG/PK Unit 8 Markdown snapshots are bundled into the main app. Before adding many more units, add unit-level data lazy loading or route-level code splitting.

---

## 7. Adding a New Unit Sync

For a future unit, follow the current Unit 8 pattern:

1. Confirm the Markdown source folder is reviewed and stable enough to sync.
2. Create a sync script under:

```text
scripts/
```

3. Generate a snapshot under:

```text
src/curriculum/generated/
```

4. Create or update the unit data file under:

```text
src/curriculum/data/
```

5. Register the unit in:

```text
src/curriculum/curriculumRegistry.ts
```

6. Run build and visual checks.

Do not migrate many units at once. Add one controlled unit at a time and report any schema pressure points.

---

## 8. PG Non-Language Units 1-7 Handoff Rule

Future PG non-language units should be handed off only after the source package is complete in:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pg/non_language_courses/unit_XX_unit_name/
```

Design handoff rule:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/07_design_final_notes/pg/non_language_courses/pg_non_language_unit_expansion_and_web_handoff.md
```

Template folder:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pg/non_language_courses/_unit_template/
```

### Naming Convention

For PG Non-Language Unit X:

```text
scripts/sync-pg-unit-XX-markdown.mjs
src/curriculum/generated/pgUnitXXMarkdown.ts
src/curriculum/data/pgNonLanguageUnitXX.ts
```

Package script:

```json
"sync:pg-unit-XX": "node scripts/sync-pg-unit-XX-markdown.mjs"
```

Example:

```text
scripts/sync-pg-unit-01-markdown.mjs
src/curriculum/generated/pgUnit01Markdown.ts
src/curriculum/data/pgNonLanguageUnit01.ts
npm run sync:pg-unit-01
```

### Required Web Checks

Before PM approval, check:

- Unit Overview route;
- Course A route;
- Course E route if music-specific content exists;
- Course G route for PSED / safety boundary;
- English display;
- Chinese display;
- lesson feedback button;
- mobile course selector;
- no raw Markdown markers;
- no summary-only fallback cards.

### Current Caution

PG Unit 8 currently uses a historical source path:

```text
06_curriculum_design/pg/unit_08_nature_weather_animals/
```

Do not use that legacy location as the default for new units. Use:

```text
06_curriculum_design/pg/non_language_courses/unit_XX_unit_name/
```
