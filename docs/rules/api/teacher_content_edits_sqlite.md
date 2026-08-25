# Teacher Content Edits SQLite Rule

**Status:** Approved architecture direction / implementation draft  
**Last Updated:** 2026-08-21  
**Scope:** User-scoped teacher edits for curriculum Markdown content.

## 1. Purpose

This document defines the approved storage direction for teacher-edited curriculum content.

The project has two separate content layers:

```text
curriculum_release/ = read-only canonical release source
SQLite database = source of truth for teacher edits
```

Teachers must not directly edit or overwrite release Markdown files.

Teacher edits should be saved as user-scoped database records.

## 2. Core Decision

Use SQLite for the first teacher-edit implementation.

Do not use long-term per-teacher Markdown folders as the live edit system.

Reason:

- SQLite is enough for the first internal launch;
- the backend already uses SQLite patterns for auth / feedback;
- database rows are easier to permission, query, back up, review, and migrate later;
- per-user MD files would become difficult to secure and maintain.

## 3. Rendering Rule

When rendering editable curriculum content:

```text
1. Load canonical content from curriculum_release.
2. Check SQLite for the current user's active edit.
3. If an active edit exists, render the teacher version.
4. If no active edit exists, render the canonical release version.
```

The original release file is never modified by teacher page edits.

## 4. Suggested Table

Create a table similar to:

```sql
CREATE TABLE teacher_content_edits (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  source_key TEXT NOT NULL,
  source_release_path TEXT NOT NULL,
  level TEXT NOT NULL,
  course_type TEXT NOT NULL,
  course_line TEXT NOT NULL,
  unit TEXT NOT NULL,
  content_type TEXT NOT NULL,
  content_id TEXT NOT NULL,
  content_md TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(user_id, source_key, status)
);
```

Implementation may adjust the exact SQL to match the existing backend style, but preserve the identity fields and user-scoped override behavior.

## 5. Field Meaning

| Field | Meaning |
|---|---|
| `id` | Unique edit record id |
| `user_id` | Authenticated teacher / user id |
| `source_key` | Stable content key used by frontend and backend |
| `source_release_path` | Canonical source file in `curriculum_release/` |
| `level` | `pg`, `pk`, `k1`, `k2`, `k3` |
| `course_type` | `english_language`, `core_courses`, `creative_enrichment`, `physical_education` |
| `course_line` | Course-line slug, such as `english_language`, `maths`, `graded_reading`, `art` |
| `unit` | Unit id, such as `unit_01` or `unit_hello` |
| `content_type` | `unit_overview`, `day_file`, `lesson`, `course_track`, etc. |
| `content_id` | Stable item id, such as `day_01`, `lesson_03`, `course_a` |
| `content_md` | Teacher-edited Markdown content |
| `status` | `active`, `draft`, `archived` |
| `version` | Incrementing version number |
| `created_at` / `updated_at` | Timestamps |

## 6. Source Key Rule

`source_key` must be stable and route-independent.

Recommended format:

```text
<level>:<course_type>:<course_line>:<unit>:<content_type>:<content_id>
```

Examples:

```text
k1:english_language:english_language:unit_01:day_file:day_01
pg:core_courses:integrated_core:unit_02:course_track:course_a
k2:core_courses:maths:unit_01:lesson:lesson_03
k2:creative_enrichment:art:unit_01:lesson:lesson_01
```

Do not use only the current URL as the primary source identity, because current routes may change during future EL / CC / CE / PE migration.

## 7. Minimal API Shape

First implementation should support:

```text
GET    /api/teacher-content-edits/:sourceKey
PUT    /api/teacher-content-edits/:sourceKey
DELETE /api/teacher-content-edits/:sourceKey
```

Recommended behavior:

### GET

Returns the current user's active edit if it exists.

If no edit exists, return:

```json
{
  "hasEdit": false
}
```

Do not return another user's edit.

### PUT

Creates or updates the current user's active edit.

Request body should include:

```json
{
  "sourceReleasePath": "...",
  "level": "k1",
  "courseType": "english_language",
  "courseLine": "english_language",
  "unit": "unit_01",
  "contentType": "day_file",
  "contentId": "day_01",
  "contentMd": "# ..."
}
```

The backend should derive `user_id` from the authenticated session, not from the request body.

### DELETE

Archives or deletes the current user's active edit so the page falls back to canonical release content.

Preferred first implementation:

```text
set status = 'archived'
```

rather than hard delete.

## 8. Permission Rule

Teacher users may:

- create their own edits;
- read their own edits;
- update their own edits;
- archive their own edits.

Teacher users may not:

- read another teacher's private edit;
- write into `curriculum_release/`;
- publish changes into canonical source;
- change another user's edit status.

Admin users may later receive review/list tools, but that is not required for the first implementation.

## 9. Versioning Rule

First implementation may keep one active row per user and source key.

On update:

- increment `version`;
- update `content_md`;
- update `updated_at`.

Future implementation may add:

```text
teacher_content_edit_versions
```

for full history, diff, and rollback.

Do not block the first launch on full version history unless PM requests it.

## 10. Admin / Promotion Rule

Teacher edits do not automatically become canonical source.

If a teacher edit should become a shared or official version, it needs a separate PM / admin review flow.

Future statuses may include:

```text
submitted
reviewed
shared
promoted
rejected
```

These are not required for the first implementation.

## 11. Backup Rule

SQLite database backup is required before public use.

At minimum:

- database file must not be committed to git;
- server deployment must have a backup plan;
- before changing table structure, copy the database file or run a migration backup;
- document the production database path in deployment notes.

## 12. Frontend Rule

The frontend should treat teacher edits as overrides, not as replacement source.

Suggested rendering order:

```text
canonical release MD
  + current user's active edit override if present
```

The frontend should make it visually clear when a teacher is viewing an edited version versus the original release version.

Possible labels:

```text
Original
My Edited Version
Unsaved Changes
Saved
Revert to Original
```

## 13. Relationship To Release Workspace

The release workspace remains read-only.

Rule:

```text
No website edit operation may write to curriculum_release/.
```

The only way content enters `curriculum_release/` is through a controlled extraction or PM-approved promotion process, recorded in `RELEASE_MANIFEST.csv`.

## 14. Related Documents

Read these before implementing:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_release_workspace_structure.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_course_type_catalog_v1.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/curriculum_dashboard_route_mapping_transition.md
/Users/Lucia/Desktop/eastie_curriculum_project/api/docs/auth_design.md
/Users/Lucia/Desktop/eastie_curriculum_project/api/docs/feedback_api_design.md
```
