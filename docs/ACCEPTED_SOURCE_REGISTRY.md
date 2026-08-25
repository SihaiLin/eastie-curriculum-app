# EASTIE Accepted Source Registry

**Status:** Active PM registry  
**Last Updated:** 2026-08-17

This registry lists curriculum source files or source folders that have been accepted as usable project source during the active production stage.

It is not a complete file inventory. It should not list every draft, archive, zip, generated TypeScript file, or temporary handoff file.

Use this registry later for the clean extraction / migration phase into:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/content/curriculum/
```

## How To Read This Registry

| Field | Meaning |
|---|---|
| Level | PG, PK, K1, K2, K3, or cross-level |
| Current Track | Current working label or current route label, such as Language, Non-Language, Math, Graded Reading, Art |
| Future Category | New program category from Curriculum Program Structure v2: Language, Core, CEC, or PE |
| Course Line | More specific reusable line, such as language, integrated-core, math, graded-reading, art |
| Unit / Scope | Unit number or course-line scope |
| Accepted Source | Current source-of-truth file or folder |
| Web Output | Current dynamic route or generated output if available |
| Status | Accepted, Active Reference, Prototype, Needs Review, or Source Consolidation Needed |
| Notes | Important risks or boundaries |

Important:

- Existing web routes may still use `/non-language/` during the transition.
- In the future structure, many current `Non-Language` routes will map to `Core` or `CEC`.
- Do not rename source folders or routes only because this registry adds future classification.
- Generated TypeScript snapshots remain web output, not accepted curriculum source.

## Current Accepted / Active Sources

### PG / PK Language

| Level | Current Track | Future Category | Course Line | Unit / Scope | Accepted Source | Web Output | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| PG | Language | Language | language | Unit 6 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pg/language_courses/unit_06_toys_and_space/` | `/curriculum/pg/language/unit-06` | Active Reference | Already in newer source-directory pattern. |
| PK | Language | Language | language | Unit 6 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pk/language_courses/unit_06_toys_and_space/` | `/curriculum/pk/language/unit-06` | Active Reference | Already in newer source-directory pattern. |
| PG | Language | Language | language | Unit Hello + Units 1-5, 7-9 | `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus/unit_layer_design/`, `/week_layer_design/`, `/lesson_layer_design/` | `/curriculum/pg/language/unit-uh` ... `/curriculum/pg/language/unit-09` | Source Consolidation Needed | Web snapshots exist. Editable source should be migrated or copied into the newer `06_curriculum_design/pg/language_courses/` pattern later. |
| PK | Language | Language | language | Unit Hello + Units 1-5, 7-9 | `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus/unit_layer_design/`, `/week_layer_design/`, `/lesson_layer_design/` | `/curriculum/pk/language/unit-uh` ... `/curriculum/pk/language/unit-09` | Source Consolidation Needed | Web snapshots exist. Editable source should be migrated or copied into the newer `06_curriculum_design/pk/language_courses/` pattern later. |

### PG / PK Integrated Core

| Level | Current Track | Future Category | Course Line | Unit / Scope | Accepted Source | Web Output | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| PG | Non-Language | Core | integrated-core | Units 1-9 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pg/non_language_courses/` | `/curriculum/pg/non-language/unit-01` ... `/curriculum/pg/non-language/unit-09` | Active Prototype / Reference Line | Current route label is legacy `non-language`; future category is Core. Unit 8 is the strongest reference unit; Unit 9 also has accepted English + zh-CN source. |
| PK | Non-Language | Core | integrated-core | Units 1-9 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pk/non_language_courses/` | `/curriculum/pk/non-language/unit-01` ... `/curriculum/pk/non-language/unit-09` | Active Prototype / Reference Line | Current route label is legacy `non-language`; future category is Core. Unit 8 is the strongest reference unit. |

### K Language

| Level | Current Track | Future Category | Course Line | Unit / Scope | Accepted Source | Web Output | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| K1 | Language | Language | language | Unit Hello + Units 1-9 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/language_courses/` | `/curriculum/k1/language/unit-uh` ... `/curriculum/k1/language/unit-09` | Active Dynamic Coverage | Power Up Starter language line. |
| K2 | Language | Language | language | Unit Hello + Units 1-9 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/` | `/curriculum/k2/language/unit-uh` ... `/curriculum/k2/language/unit-09` | Active Dynamic Coverage | Power Up Level 1 language line. |
| K3 | Language | Language | language | Unit Hello + Units 1-9 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k3/language_courses/` | `/curriculum/k3/language/unit-uh` ... `/curriculum/k3/language/unit-09` | Active Dynamic Coverage | Power Up Level 2 language line. |

### K Core: Math

| Level | Current Track | Future Category | Course Line | Unit / Scope | Accepted Source | Web Output | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| K1 | Math | Core | math | Units 1-9 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/non_language_courses/` | `/curriculum/k1/non-language/unit-01/course-a` ... `/unit-09/course-a` | Active Dynamic Coverage | Uses Math Growing Ladder Alignment. Future route may become `/core/.../math`. |
| K2 | Math | Core | math | Units 1-9 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/non_language_courses/` | `/curriculum/k2/non-language/unit-01/course-a` ... `/unit-09/course-a` | Active Dynamic Coverage | Uses Math Growing Ladder Alignment. Future route may become `/core/.../math`. |
| K3 | Math | Core | math | Units 1-9 | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k3/non_language_courses/` | `/curriculum/k3/non-language/unit-01/course-a` ... `/unit-09/course-a` | Active Dynamic Coverage | Uses Math Growing Ladder Alignment. Future route may become `/core/.../math`. |

### K Core: Graded Reading

| Level | Current Track | Future Category | Course Line | Unit / Scope | Accepted Source | Web Output | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| K1 | Graded Reading | Core | graded-reading | Units 1-9 | To confirm exact canonical source folder before clean extraction | `/curriculum/k1/non-language/unit-01/course-b` ... `/unit-09/course-b` | Active Dynamic Coverage | Generated data exists; exact accepted source folder should be confirmed before clean migration. Future route may become `/core/.../graded-reading`. |
| K2 | Graded Reading | Core | graded-reading | Units 1-9 | To confirm exact canonical source folder before clean extraction | `/curriculum/k2/non-language/unit-01/course-b` ... `/unit-09/course-b` | Active Dynamic Coverage | Generated data exists; exact accepted source folder should be confirmed before clean migration. Future route may become `/core/.../graded-reading`. |
| K3 | Graded Reading | Core | graded-reading | Units 1-9 | To confirm exact canonical source folder before clean extraction | `/curriculum/k3/non-language/unit-01/course-b` ... `/unit-09/course-b` | Active Dynamic Coverage | Generated data exists; exact accepted source folder should be confirmed before clean migration. Future route may become `/core/.../graded-reading`. |

### K CEC: Art

| Level | Current Track | Future Category | Course Line | Unit / Scope | Accepted Source | Web Output | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| K1-K3 | Art | CEC | art | Shared course-line workspace | `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/` | K2 Unit 1 prototype route: `/curriculum/k2/non-language/unit-01/course-c` | Prototype / Partial Accepted Source | Current prototype route uses legacy `non-language`; future category is CEC. K2 Unit 1 Chinese mirror accepted. Exact Art Encounter artwork/source sheets remain required before broad promotion. |

### PE

| Level | Current Track | Future Category | Course Line | Unit / Scope | Accepted Source | Web Output | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| PG-K3 | PE | PE | pe | Not started | To be created | None | Not Started | Keep separate from Core and CEC once PE curriculum design begins. |

## Registry Maintenance Rule

When another session finalizes a usable source package, add a row here or ask the PM session to add it.

For every new source row, record both:

- the current working / route label;
- the future program category from `curriculum_program_structure_v2.md`.

Do not add:

- generated TypeScript snapshots as accepted source;
- old static HTML prototypes as source;
- zip handoff packages;
- Downloads-only files;
- archived/deprecated drafts;
- one-off screenshots.
