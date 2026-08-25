# PG/PK Language Source Consolidation Audit

**Date:** 2026-08-17

## 1. Purpose

This audit checks where the editable PG/PK language Markdown source files currently live, compared with the dynamic web snapshots already registered in the React app.

Key finding: PG/PK Language pages are not missing from the web app. Unit Hello + Units 1-9 are already generated and registered. The remaining work is source consolidation into the newer `06_curriculum_design/<level>/language_courses/` pattern.

## 2. Source Locations Checked

- Older editable source root: `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus/`
- Newer curriculum design root: `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/`
- Web generated snapshots: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/`
- Dynamic manifest: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`

## 3. Current Status Summary

| Area | Status | Notes |
|---|---|---|
| PG Language web coverage | Complete | Unit Hello + Units 1-9 generated and registered |
| PK Language web coverage | Complete | Unit Hello + Units 1-9 generated and registered |
| Older editable source | Complete for current generated pages except Unit 6 is now maintained in the newer pattern | `unit_layer_design`, `week_layer_design`, `lesson_layer_design` contain PG/PK Unit Hello + Units 1-5 and 7-9; Unit 6 exists in newer pattern |
| Newer source pattern | Partial | PG/PK currently only show `unit_06_toys_and_space` under `06_curriculum_design/<level>/language_courses/` |
| Immediate risk | Medium | Editing generated TypeScript would break source-of-truth discipline. Future edits need Markdown source migration or clear source lookup. |

## 4. PG Language Unit Source Map

| Unit | Web Generated Snapshot | Older Unit Overview | Older Weekly Frame | Older Lesson Frames | Newer Source Directory | Consolidation Status |
|---|---|---|---|---|---|---|
| Unit Hello | Yes | Yes | Yes | 1/1 | No | Needs migration/copy into newer pattern |
| Unit 1 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 2 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 3 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 4 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 5 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 6 | Yes | Missing | Missing | 0/4 | Yes | Already in newer pattern |
| Unit 7 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 8 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 9 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |

## 4. PK Language Unit Source Map

| Unit | Web Generated Snapshot | Older Unit Overview | Older Weekly Frame | Older Lesson Frames | Newer Source Directory | Consolidation Status |
|---|---|---|---|---|---|---|
| Unit Hello | Yes | Yes | Yes | 1/1 | No | Needs migration/copy into newer pattern |
| Unit 1 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 2 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 3 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 4 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 5 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 6 | Yes | Missing | Missing | 0/4 | Yes | Already in newer pattern |
| Unit 7 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 8 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |
| Unit 9 | Yes | Yes | Yes | 4/4 | No | Needs migration/copy into newer pattern |

## 5. Recommended Consolidation Pattern

For each PG/PK language unit, consolidate source into:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/<pg|pk>/language_courses/unit_XX_slug/
  00_overview.md
  01_week_1.md
  02_week_2.md
  03_week_3.md
  04_week_4.md
  README.md optional
```

Unit Hello may contain only `00_overview.md` and `01_week_1.md` if the unit remains a one-week adaptation unit.

## 6. Recommended Execution Order

1. Do not edit generated TypeScript snapshots directly.
2. For each unit, copy or migrate from the older three-layer source files into the newer unit folder.
3. Preserve the source wording unless a curriculum edit is explicitly requested.
4. After migrating one unit, run the PG/PK language sync command and compare the generated snapshot diff.
5. If the generated snapshot changes unexpectedly, stop and review parser assumptions before continuing.
6. Proceed level-by-level or unit-by-unit; do not batch all units before one migration has passed sync/build QA.

## 7. Suggested First Migration Batch

- Start with PG Unit 2 and PK Unit 2 because the current browser was already on PK Unit 2 and it is a good representative non-Unit-6 case.
- Then migrate Unit Hello and Unit 1 to verify the one-week adaptation case and the normal four-week case.
- Continue Units 3-5 and 7-9 after the first batch passes QA.

## 8. PM Note

This is not a missing-content task. It is a source-of-truth cleanup task. The web app already renders the PG/PK language units from generated snapshots; the cleanup makes future edits safe and traceable.
