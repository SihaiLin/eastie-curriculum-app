# PG/PK Non-Language Unit Expansion Checklist

**Status:** Active expansion checklist  
**Last Updated:** 2026-06-24

This checklist is the practical execution layer for expanding new PG or PK non-language units after Unit 8.

Use it when creating Unit 1-7 for:

- PG non-language
- PK non-language

This checklist assumes the shared canonical structure and level-specific rules already exist.

Read these first:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pk_pg_non_language_canonical_structure_note.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pg/pg_non_language_rules.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pk/pk_non_language_rules.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/dynamic_unit_execution_standard.md`

## 1. Source Folder Setup

Before writing content, confirm the unit folder exists in the historical curriculum workspace.

Expected structure:

```text
06_curriculum_design/[pg or pk]/[track path]/unit_XX_unit_slug/
├── 00_common_info/
├── 01_course_tracks/
├── 02_translations/
├── 03_resources_notes/
└── 99_archive/
```

Check:

- English source files are not still sitting only in Downloads
- the slug, unit number, and naming pattern are stable
- active files use `course_`, not `lesson_`

## 2. Common Info Checklist

Confirm the English common-info file contains exactly these section headings in this order:

```markdown
## 1. Unit Theme Overview
## 2. Unit Language
## 3. Weekly Subthemes
## 4. Eight Course Track Files
## 5. Teacher Input Pool
## 6. Expected [PG/PK] Response Modes
## 7. Theme Songs / Chants
## 8. Spaces and Materials
## 9. Boundary Notes
## 10. Unit-Level Observation Focus
```

Check:

- no `File Role`
- no `Feedback Interface Placeholder`
- no `SSS Song Recommendations` as a top-level section
- no old `Resource Opportunities` heading in newly created units

## 3. Course Track Checklist

Confirm all 8 active course tracks exist:

- Course A
- Course B
- Course C1
- Course C2
- Course D
- Course E
- Course F
- Course G

Each file must:

- include `## Course Overview`
- include `### Course Type`
- include `### Course Purpose`
- contain exactly 4 lessons

Each lesson must include:

```markdown
## Lesson Outcome
### 1. Cognitive Objectives
### 2. Skill-based Objectives
### 3. Affective Objectives
## HighScope KDI Alignment
## Theme Story Context
## Light Theme Language
## Teacher Routine Language
## Suggested Activities / Games
```

Track-specific notes:

- PK may include `## Optional Challenge`
- Course E may include `## Suggested Songs / Chants`

## 4. Translation Checklist

Confirm the Chinese translation mirrors the English file set one-to-one.

Check:

- heading depth matches exactly
- section order matches exactly
- song titles remain English
- teacher input items may stay English
- no broken placeholders
- no mixed bilingual headings in English files

## 5. Structural Audit Checklist

Before sync or page integration, do a quick structural audit.

Minimum checks:

- common-info headings are canonical
- all 8 course tracks exist
- each course track has 4 lessons
- no obsolete top-level sections were reintroduced
- the unit preserves level boundaries

Recommended output:

```text
[level]_unit_XX_non_language_structure_audit_YYYY_MM_DD.md
```

Place audit notes under:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/[level]/
```

## 6. Dynamic Integration Checklist

When the unit is ready for dynamic onboarding:

1. run the correct sync/generation path
2. register the unit in the dynamic manifest
3. build the web app
4. verify the route

Minimum verification:

- unit overview renders
- the 8 course-track navigation is present
- lesson content renders correctly
- English and Chinese both work if bilingual is required
- feedback button still appears where expected

## 7. Documentation Update Checklist

After the unit is successfully onboarded:

- update `DYNAMIC_PAGE_INVENTORY.md`
- update `PROJECT_STATUS.md` if active coverage changed
- update `RULES_INDEX.md` if a new stable rule or audit note was created

## 8. Stop Conditions

Do not continue to the next unit yet if:

- the source structure still uses unstable headings
- translations are structurally inconsistent
- the renderer needs one-off hacks for that unit
- manifest registration is unclear
- build or route validation is failing

The point is controlled expansion, not fast accumulation of messy units.

## 9. Current Intended Use

This checklist is intended to support:

- PG Non-Language Units 1-7 first
- PK Non-Language Units 1-7 afterward, or as separately approved
