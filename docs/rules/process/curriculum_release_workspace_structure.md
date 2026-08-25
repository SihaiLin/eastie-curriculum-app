# Curriculum Release Workspace Structure

**Status:** Approved structure rule  
**Last Updated:** 2026-08-21  
**Scope:** Clean active curriculum release workspace for near-term launch.

## 1. Purpose

This document defines the clean release workspace structure for EASTIE curriculum content that is active, accepted, and intended for near-term use.

The project currently contains several historical workspaces, generated files, draft folders, test outputs, model variants, and archived experiments. Those files should not be cleaned up during the current launch preparation.

Instead, the project will use a new root-level release workspace:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/curriculum_release/
```

This workspace is a clean active snapshot. It contains only content that has been accepted for current review, launch, or near-term teacher use.

Important:

```text
curriculum_release = read-only canonical release snapshot
SQLite database = source of truth for teacher edits
```

Teachers must not directly edit files inside `curriculum_release/`.

## 2. Core Principle

Do not clean the old workspaces.

Use this rule instead:

```text
old workspace = historical design archive and traceable source
curriculum_release = clean active release snapshot
```

Actions allowed:

- copy accepted content into `curriculum_release/`;
- record original source paths;
- organize copied content under the new EL / CC / CE / PE structure;
- add release manifests and source notes.

Actions not allowed unless PM explicitly approves:

- moving original files;
- deleting old drafts;
- renaming historical folders;
- bulk-copying all historical content;
- treating generated TypeScript snapshots as curriculum source;
- leaving copied content without source trace.
- writing teacher edits back into `curriculum_release/`;
- creating long-term user-specific edited MD copies as the live teacher-edit system.

## 3. Root Structure

Create this structure at the project root:

```text
eastie_curriculum_project/
  curriculum_release/
    README.md
    RELEASE_MANIFEST.csv
    RELEASE_MANIFEST.md

    english_language/
      pg/
      pk/
      k1/
      k2/
      k3/

    core_courses/
      pg/
      pk/
      k1/
      k2/
      k3/

    creative_enrichment/
      pg/
      pk/
      k1/
      k2/
      k3/

    physical_education/
      pg/
      pk/
      k1/
      k2/
      k3/

    resources/
      power_up.md
      raz.md
      sss.md
      images.md

    notes/
      source_decisions.md
      excluded_content.md
      migration_todo.md
```

The folder lives at the project root, not inside `content/`.

Reason:

- it should be easy for PM, content sessions, frontend sessions, and deployment sessions to find;
- it is an active launch package, not a general content archive;
- the existing `content/` folder may still contain experimental or specialized source work.

## 4. Course Type Mapping

Use the approved course type names from:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_course_type_catalog_v1.md
```

Folder mapping:

| Release Folder | Course Type |
|---|---|
| `english_language/` | EL — English Language |
| `core_courses/` | CC — Core Courses |
| `creative_enrichment/` | CE — Creative Enrichment |
| `physical_education/` | PE — Physical Education |

Do not use `non_language/` as a release workspace top-level folder.

Legacy `/non-language/` web routes may still exist, but release content should follow the new curriculum structure.

## 5. Level Folders

Each course type contains five level folders:

```text
pg/
pk/
k1/
k2/
k3/
```

Use lowercase level slugs for folder names.

Do not create separate level systems such as:

```text
pre-grade/
kindergarten-1/
level-1/
```

unless a later clean-site rule explicitly changes the convention.

## 6. Unit Folder Naming

Use this unit folder pattern:

```text
unit_XX_unit_slug/
```

Examples:

```text
unit_01_friends_and_family/
unit_02_at_school/
unit_08_nature_weather_animals/
unit_09_summer_water_outdoor_play/
```

For Unit Hello, use:

```text
unit_hello/
```

or, if a title is needed:

```text
unit_hello_welcome_to_school/
```

Pick the shorter form when the context is already clear.

## 7. Internal Unit Structure

Top-level structure should be unified, but unit-internal structure may follow the course line.

Do not force every course into the same lesson structure.

### English Language Example

K Language unit-centric source may look like:

```text
english_language/k1/unit_01_friends_and_family/
  00_unit.md
  days/
    day_01.md
    day_02.md
    ...
    day_20.md
```

PG/PK language may use:

```text
english_language/pg/unit_06_toys_and_space/
  00_unit_overview.md
  weekly_frame.md
  lesson_pack.md
```

or another accepted language structure, as long as the manifest records it.

### Core Courses Example

PG/PK integrated core may look like:

```text
core_courses/pg/unit_08_nature_weather_animals/
  00_common_info.md
  course_a_self_care_daily_routine.md
  course_b_sensory_object_exploration.md
  course_c1_story_puppet_experience.md
  course_c2_pretend_role_play_experience.md
  course_d_creative_expression.md
  course_e_music_rhythm_movement.md
  course_f_construction_small_world_play.md
  course_g_psed_safety.md
```

K Core course lines may use subfolders:

```text
core_courses/k1/unit_01_friends_and_family/
  maths/
  graded_reading/
  world_exploration/
  self_care_daily_routine/
  psed_safety/
```

Use subfolders when a course line has multiple files or resources.

### Creative Enrichment Example

Creative Enrichment may use one subfolder per course line:

```text
creative_enrichment/k2/unit_01_our_new_school/
  art/
    00_overview.md
    01_lesson_1.md
    02_lesson_2.md
    03_lesson_3.md
    04_lesson_4.md
  music/
  science_exploration/
```

### Physical Education Example

PE may use:

```text
physical_education/k2/unit_01_our_new_school/
  basketball/
  tennis/
```

PE structure is not yet mature. Keep it simple until PE rules are created.

## 8. Manifest Requirement

Every copied file or accepted folder must be recorded in:

```text
curriculum_release/RELEASE_MANIFEST.csv
```

Recommended columns:

```text
release_path
original_source_path
level
course_type
course_line
unit
content_kind
status
used_by_route
copied_date
copied_by
notes
```

Meaning:

| Column | Meaning |
|---|---|
| `release_path` | New path inside `curriculum_release/` |
| `original_source_path` | Original source or historical workspace path |
| `level` | `pg`, `pk`, `k1`, `k2`, `k3` |
| `course_type` | `english_language`, `core_courses`, `creative_enrichment`, `physical_education` |
| `course_line` | Official or slugged course line, such as `maths`, `graded_reading`, `art` |
| `unit` | Unit identifier, such as `unit_01` or `unit_hello` |
| `content_kind` | `unit_overview`, `day_file`, `course_track`, `lesson_pack`, `resource_index`, etc. |
| `status` | `accepted`, `review`, `launch_ready`, `prototype`, or `needs_revision` |
| `used_by_route` | Current web route if known |
| `copied_date` | Date copied into release workspace |
| `copied_by` | Session or person that copied it |
| `notes` | Any boundary, risk, or missing item |

No release file should exist without traceability.

## 9. README Requirement

`curriculum_release/README.md` should explain:

- purpose of this release workspace;
- difference between historical source and release snapshot;
- how to read the folder structure;
- what counts as launch-ready;
- which docs define naming and routing rules;
- who should update the manifest.

Minimum links to include:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_course_type_catalog_v1.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/curriculum_dashboard_route_mapping_transition.md
```

## 10. Resource Policy

The release workspace should not copy large resource libraries by default.

Use `curriculum_release/resources/` for indexes and source notes:

```text
resources/
  power_up.md
  raz.md
  sss.md
  images.md
```

Record:

- source library location;
- public deployment path, if any;
- manifest location;
- resource readiness status;
- missing links or launch risks.

Do not copy 1GB resource folders into `curriculum_release/` unless PM and deployment session explicitly decide it is necessary.

## 11. What To Include First

For the near-term launch, prioritize:

1. content currently used by active dynamic pages;
2. content teachers will use first after launch;
3. K Language first-rollout source;
4. PG/PK active EL and CC source;
5. K Core Maths and Graded Reading source that is already active;
6. accepted CE source that is already exposed or near exposure;
7. resource indexes needed by the above.

Do not try to extract the entire historical project in one pass.

## 12. What Not To Include

Do not copy:

- model comparison variants unless PM marks one as selected;
- old static HTML prototypes;
- generated TypeScript snapshots as source;
- zip handoff packages;
- Downloads-only drafts;
- files marked deprecated, archive, test, backup, or old;
- unclear source files without a manifest note.

If a file is useful but not selected, mention it in:

```text
curriculum_release/notes/excluded_content.md
```

## 13. Workflow For Other Sessions

When a content or frontend session is asked to place content into the release workspace:

1. read this document;
2. read `curriculum_course_type_catalog_v1.md`;
3. identify the correct course type and level folder;
4. copy the accepted file or folder into `curriculum_release/`;
5. add a row to `RELEASE_MANIFEST.csv`;
6. add a short note to `RELEASE_MANIFEST.md` if the decision needs explanation;
7. update `SESSION_UPDATE_BOARD.md` after a meaningful work block.

If the correct location is unclear, stop and ask PM before copying.

## 14. Relationship To Web Deployment

`curriculum_release/` is not automatically what the web app renders.

The web app may still render from:

- generated TypeScript snapshots;
- sync outputs;
- current canonical MD;
- public resource manifests.

The release workspace is the clean human-readable source snapshot for launch preparation. Web sessions may later use it as a source root for sync scripts, but that must be tested deliberately.

Do not assume that copying files into `curriculum_release/` changes the website.

## 15. Teacher Edit Storage Rule

Teacher edits are not stored inside `curriculum_release/`.

Approved live architecture:

```text
canonical source: curriculum_release/
teacher edits: SQLite database
```

When a teacher edits curriculum content on the website:

1. the original release MD remains unchanged;
2. the teacher-specific edited Markdown is saved to SQLite;
3. page rendering checks for a user-scoped edit first;
4. if no teacher edit exists, the page falls back to the release source;
5. admin / PM promotion of a teacher edit into canonical source requires a separate review process.

Do not create this as the live architecture:

```text
teacher_workspace/users/<user_id>/...
```

Reason:

- file-per-user editing becomes hard to secure, diff, back up, and review;
- SQLite is easier to permission, query, back up, and later migrate;
- the existing backend already uses SQLite-compatible auth / feedback patterns.

Optional future export:

```text
teacher_workspace/exported_md/
```

may be introduced later for backups or human-readable exports, but it is not the live source of truth.

Related API rule:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/api/teacher_content_edits_sqlite.md
```

## 16. Maintenance Rule

This structure may evolve after launch.

Before changing it:

- update this document;
- update `RULES_INDEX.md` if the rule path or status changes;
- update `SESSION_UPDATE_BOARD.md`;
- avoid breaking existing release manifest paths unless PM approves.
