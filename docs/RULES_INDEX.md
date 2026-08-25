# EASTIE Rules Index

**Purpose:** This is the shared entrance point for all EASTIE rule documents.

Any Codex session, local agent, or external agent that needs to write curriculum content, modify the web app, change API behaviour, prepare deployment, or create a new rule document should read this file first.

This file does not define the detailed rules for each curriculum level or engineering area. It only defines where rules live, how to find them, and where new rule documents should be placed.

## 1. Rule Center Location

The project-level rule center is:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/
```

The rule registry folder is:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/
```

The historical curriculum workspace remains a source and reference workspace:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

Do not treat scattered historical notes as active rules unless they have been copied or summarized into this rule center and registered in this index.

## 2. How To Use This Index

Before starting a task:

1. Read this file.
2. Identify the task area:
   - curriculum content;
   - frontend/web;
   - backend/API;
   - process, source-of-truth, deployment, or handoff.
3. Read the relevant rule document listed below.
4. If no suitable rule document exists yet, create one under the correct folder and add it to this index.

## 3. Curriculum Rule Documents

Curriculum content rules belong under:

```text
docs/rules/curriculum/
```

Use one folder per level:

```text
docs/rules/curriculum/pg/
docs/rules/curriculum/pk/
docs/rules/curriculum/k1/
docs/rules/curriculum/k2/
docs/rules/curriculum/k3/
```

Recommended placement:

```text
docs/rules/curriculum/pg/pg_language_rules.md
docs/rules/curriculum/pg/pg_non_language_rules.md
docs/rules/curriculum/pk/pk_language_rules.md
docs/rules/curriculum/pk/pk_non_language_rules.md
docs/rules/curriculum/k1/k1_language_rules.md
docs/rules/curriculum/k1/k1_non_language_rules.md
docs/rules/curriculum/k2/k2_language_rules.md
docs/rules/curriculum/k2/k2_non_language_rules.md
docs/rules/curriculum/k3/k3_language_rules.md
docs/rules/curriculum/k3/k3_non_language_rules.md
```

Active curriculum rules currently registered:

- PG/PK Non-Language Canonical Structure Note: shared canonical structure note for PG and PK non-language common-info and course-track files. Read this before editing either PG or PK non-language rules or generating future units:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pk_pg_non_language_canonical_structure_note.md`

- PG Non-Language Rules: Draft / active operational rule for PG non-language Markdown generation, translation, dynamic loading structure, and HighScope KDI alignment. Read this before creating or editing PG non-language curriculum MD:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pg/pg_non_language_rules.md`
- PG Non-Language Framework Historical Reference: current source/reference framework note remains in the historical workspace:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/07_design_final_notes/pg/non_language_courses/pg_non_language_course_framework_final.md`
- PG Non-Language Unit Expansion / Web Handoff: not yet copied into the rule center. Current source/reference rule is in the historical workspace:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/07_design_final_notes/pg/non_language_courses/pg_non_language_unit_expansion_and_web_handoff.md`
- PG Language Rules: Review / active operational rule for PG language Markdown generation and dynamic page handoff. Read this before creating or editing PG language unit MD:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pg/pg_language_rules.md`
- PK Non-Language Rules: Draft / active operational rule for PK non-language Markdown generation, translation, dynamic loading structure, and HighScope KDI alignment. Read this before creating or editing PK non-language curriculum MD:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pk/pk_non_language_rules.md`
- PK Language Rules: Review / active operational rule for PK language Markdown generation and dynamic page handoff. Read this before creating or editing PK language unit MD:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pk/pk_language_rules.md`
- K2 Language Dynamic Page Notes: Draft architecture note for K2 Language dynamic frontend. Read before modifying or extending the K2 Language dynamic page:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k2/k2_language_dynamic_page_notes.md`
- K1 Language Rules: Review / active operational rule for K1 language Markdown generation and dynamic page handoff. Read this before creating or editing K1 language unit MD:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k1/k1_language_rules.md`
- K1 Non-Language Rules: First operational draft for K1 non-language Markdown generation and source-template structure. Read this before creating or editing K1 non-language unit MD:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k1/k1_non_language_rules.md`
- K1 Non-Language Math Track Rules: Draft / first operational math-track rule for writing K1 non-language Math Growing Ladder lessons. Read this before creating or editing K1 non-language math lesson MD or revising the K1 math lesson template:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k1/k1_non_language_math_track_rules.md`
- K1 Graded Reading Snapshot Rules: Active operational rule for extracting and revising K1 RAZ AA book snapshots as upstream source for `Course B: Graded Reading`. Read this before creating or revising K1 reading snapshots:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k1/k1_graded_reading_snapshot_rules.md`
- K1 Math Track Map: active historical reference for cross-unit K1 Math placement and lesson-sequence decisions:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/non_language_courses/00_shared_references/k1_math_track_map.md`
- K2 Language Rules: Review / active operational rule for K2 Language Markdown generation and dynamic page handoff. Read this before creating or editing K2 language unit MD:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k2/k2_language_rules.md`
- K2 Math Track Map: active historical reference for cross-unit K2 Math placement and lesson-sequence decisions:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/non_language_courses/00_shared_references/k2_math_track_map.md`
- K3 Language Rules: Review / active operational rule for K3 language Markdown generation and dynamic page handoff. Read this before creating or editing K3 language unit MD:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k3/k3_language_rules.md`
- K Language Canonical Markdown v0.1: draft candidate structure reverse-designed from the current K1-K3 language dynamic lesson page. Read this before creating the new Unit Hello / Unit 1 canonical markdown rollout files:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k_language_canonical_md_v0_1.md`
- K Language Unit Hello + Unit 1 Rollout Plan: first-use plan for preparing K1/K2/K3 Unit Hello and Unit 1 before school starts:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_UNIT_HELLO_UNIT_1_ROLLOUT_PLAN.md`
- K Language Canonical MD v0.1 Sample: concrete K1 Unit 1 Day 1 sample showing how page-facing fields, Power Up source, classification scaffold, and teacher/design guidance fit together:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/k_language_canonical_md_v0_1_k1_unit_1_day_1_sample.md`
- K3 Math Track Map: active historical reference for cross-unit K3 Math placement and lesson-sequence decisions:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k3/non_language_courses/00_shared_references/k3_math_track_map.md`
- K2 Language Unit Template: reference template directory for K2 language unit Markdown source files:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/_unit_template/`
- K1 Non-Language Unit Template: reference template directory for K1 non-language unit Markdown source files:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/non_language_courses/_unit_template/`

When a curriculum session creates or finalizes a level-specific rule document, it should save that document in the relevant level folder and update the active list above.

## 4. Web Rule Documents

Web rules belong under:

```text
docs/rules/web/
```

Use this area for:

- frontend rendering rules;
- data contract rules;
- content sync rules;
- route rules;
- UI feedback rules;
- bilingual display rules;
- mobile display rules.

Current web reference documents:

- Web Curriculum Data Contract v0.1:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/docs/web_curriculum_data_contract_v0_1.md`
- Content Sync Workflow:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/docs/content_sync_workflow.md`
- Dynamic Frontend Plan:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/docs/dynamic_frontend_plan.md`
- Curriculum Resource Proxy Rules:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/curriculum_resource_proxy_rules.md`
- Power Up Resource Pipeline: Review / active operational rule for K1/K2/K3 Power Up PDF/audio resource manifests, Activity Book OCR/manual track maps, and frontend Source rendering. Read this before modifying K-language Power Up resource sync or resource buttons:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/power_up_resource_pipeline.md`
- Dynamic Curriculum Page Handoff Rules:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/dynamic_curriculum_page_handoff_rules.md`
- Curriculum Dashboard Route Mapping Transition: approved transition rule for the redesigned curriculum home. Read this before implementing `Grade -> EL/CC/CE/PE -> Course Line -> Unit` dashboard navigation, legacy route mapping, or future route aliases:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/curriculum_dashboard_route_mapping_transition.md`
- Dynamic Unit Onboarding Checklist:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_UNIT_ONBOARDING_CHECKLIST.md`
- K-Language Resource Conventions:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_RESOURCE_CONVENTIONS.md`
- K-Language Extraction Data Inventory:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_EXTRACTION_DATA_INVENTORY.md`

Current dynamic page inventory:

- Dynamic Page Inventory:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`

If a web rule becomes stable and project-wide, copy or summarize it into `docs/rules/web/` and add it here.

## 5. API Rule Documents

API rules belong under:

```text
docs/rules/api/
```

Use this area for:

- auth/session rules;
- feedback API rules;
- user roles and permission rules;
- cookie, CORS, and deployment security rules;
- database migration rules.

Current API reference documents:

- Auth Design:
  `/Users/Lucia/Desktop/eastie_curriculum_project/api/docs/auth_design.md`
- Feedback API Design:
  `/Users/Lucia/Desktop/eastie_curriculum_project/api/docs/feedback_api_design.md`
- Teacher Content Edits SQLite Rule: approved architecture direction for user-scoped teacher-edited curriculum Markdown. Read this before implementing teacher edit storage, override rendering, or edit APIs:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/api/teacher_content_edits_sqlite.md`

If an API rule becomes stable and project-wide, copy or summarize it into `docs/rules/api/` and add it here.

## 6. Process Rule Documents

Process rules belong under:

```text
docs/rules/process/
```

Use this area for:

- source-of-truth rules;
- session handoff rules;
- version and status rules;
- content review rules;
- deployment workflow rules;
- rules for moving content from historical workspace into the clean project.

Current project process references:

- Content Source Policy:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/content_source_policy.md`
- Accepted Source Registry:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md`
- Accepted Source and Clean Extraction Policy:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/accepted_source_and_clean_extraction_policy.md`
- Curriculum Program Structure v2: Review / active high-level classification rule for the four curriculum categories `Language`, `Core`, `CEC`, and `PE`. Read this before changing curriculum navigation, route categories, source registry classification, or clean extraction structure:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md`
- Curriculum Course Type Catalog v1: approved naming catalog for top-level course-type codes `EL`, `CC`, `CE`, `PE` and PG/PK/K1/K2/K3 course-line display names. Read this before naming course lines, icons, navigation labels, folder slugs, or future manifests:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_course_type_catalog_v1.md`
- Curriculum Release Workspace Structure: approved root-level structure for the clean launch content snapshot at `curriculum_release/`. Read this before copying accepted source files into the release workspace or creating release manifests:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_release_workspace_structure.md`
- Session Start Prompts:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_START_PROMPTS.md`
- Dynamic App Structure:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/dynamic_app_structure.md`
- Deployment Runbook:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/deployment.md`
- K-Language Ruleset Handoff:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k_language_ruleset_handoff.md`
- Dynamic Unit Execution Standard:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/dynamic_unit_execution_standard.md`
- PG/PK Non-Language Unit Expansion Checklist:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/pg_pk_non_language_unit_expansion_checklist.md`
- K Non-Language Unit Assembly Strategy:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k_non_language_unit_assembly_strategy.md`
- K2 Unit 01 Non-Language Assembly Checklist:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k2_unit_01_non_language_assembly_checklist.md`
- Session Progress Reporting:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/session_progress_reporting.md`
- Session Update Board:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_UPDATE_BOARD.md`

If a process rule becomes stable and reusable, copy or summarize it into `docs/rules/process/` and add it here.

## 7. Where New Rule Documents Go

When a session creates a new rule document, use this decision path:

```text
Is it about curriculum MD content?
  -> docs/rules/curriculum/[level]/

Is it about frontend rendering, sync, data shape, routes, or UI?
  -> docs/rules/web/

Is it about backend auth, feedback, users, sessions, database, or API security?
  -> docs/rules/api/

Is it about workflow, review, source of truth, handoff, status, or deployment process?
  -> docs/rules/process/
```

If a document covers more than one area, put it in the area where it will be used most often, then add cross-links from the other relevant area.

## 8. Naming Guidance

Use short, predictable names.

Preferred examples:

```text
pg_non_language_rules.md
pk_language_rules.md
k2_non_language_rules.md
frontend_rendering_rules.md
feedback_api_rules.md
source_of_truth_rules.md
session_handoff_rules.md
```

Avoid long names that include every detail of the document.

The document itself can state version, status, reference unit, and scope near the top.

## 9. Registration Requirement

Creating a rule file is not enough.

After creating or updating a rule document, update this `RULES_INDEX.md` with:

- document title;
- path;
- status, if known;
- what kind of tasks should read it.

If it is not listed here, future sessions may not find it.

## 10. Status Labels

Use simple status labels inside the rule document or next to the index entry:

```text
Draft
Review
Locked
Deprecated
Historical Reference
```

Do not mark a rule as `Locked` unless the project owner has explicitly accepted it as the current standard.

## 11. Important Boundaries

- Downloads is never a rule source of truth.
- A session summary is not a rule document until it is saved under this rule center.
- Historical workspace notes are not active rules unless registered here.
- Engineering implementation files are not curriculum writing rules.
- Curriculum writing rules should not silently change the web data contract.
- Web/API rules should not rewrite curriculum content rules.

## 12. Prompt For Other Sessions

Use this when starting another session:

```text
Before working, read:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md

Then read the rule document relevant to your task.

If you create or finalize a new rule document, save it under:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/

Then update RULES_INDEX.md so future sessions can find it.
```
