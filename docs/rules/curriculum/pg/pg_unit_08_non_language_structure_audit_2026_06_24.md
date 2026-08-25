# PG Unit 8 Non-Language Structure Audit

Date: 2026-06-24
Audited by: Codex
Scope:

- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pg/unit_08_nature_weather_animals/00_common_info/pg_unit_08_nature_weather_animals_common_info.md`
- all 8 files under `01_course_tracks/`
- current canonical note and PG non-language rules in the clean project

## 1. Summary Judgment

PG Unit 8 source structure is largely aligned with the current dynamic workflow.

The main structural mismatches are in the common-info file, not in the course-track files.

Current status:

- `01_course_tracks/` is structurally usable and close to canonical.
- `00_common_info/` is operationally usable, but still contains two legacy section-title patterns that should be standardised for future units.
- No missing course track files were found.

## 2. Confirmed Positives

### 2.1 Common Info

Confirmed present:

- `## 1. Unit Theme Overview`
- `## 2. Unit Language`
- `## 3. Weekly Subthemes`
- `## 5. Teacher Input Pool`
- `## 6. Expected PG Response Modes`
- `## 7. Theme Songs / Chants`
- `## 9. Boundary Notes`
- `## 10. Unit-Level Observation Focus`

Also confirmed:

- 8 course-track headings are listed under section 4.

### 2.2 Course Tracks

All 8 active course-track files exist:

- Course A
- Course B
- Course C1
- Course C2
- Course D
- Course E
- Course F
- Course G

All 8 files:

- include `## Course Overview`
- include `### Course Type`
- include `### Course Purpose`
- contain exactly 4 lessons
- include `## Lesson Outcome` 4 times
- include `## HighScope KDI Alignment` 4 times
- include `## Theme Story Context` 4 times
- include `## Light Theme Language` 4 times
- include `## Teacher Routine Language` 4 times
- include `## Suggested Activities / Games` 4 times

Course E correctly includes `## Suggested Songs / Chants`.

## 3. Main Mismatches Found

### 3.1 Common Info Section 4 still uses legacy heading

Current source uses:

```markdown
## 4. Eight Non-Language Course Types
```

Current canonical structure now prefers:

```markdown
## 4. Eight Course Track Files
```

This is not breaking the current renderer, because the renderer still accepts the old heading.

However, this should be treated as a legacy Unit 8 compatibility case, not the model for future units.

### 3.2 Common Info Section 8 still uses legacy heading

Current source uses:

```markdown
## 8. Resource Opportunities
```

Current canonical structure now prefers:

```markdown
## 8. Spaces and Materials
```

This is also non-breaking today, but should be standardised for future units.

## 4. Minor Non-Blocking Differences

### 4.1 Section 4 subheadings use `Lesson` labels

Current pattern:

```markdown
### Lesson A: Self-Care & Daily Routine Experience
```

The canonical direction now prefers `Course A` style language at the unit-overview level, to match:

- dynamic page language;
- course-track filenames;
- PK non-language structure;
- future cross-level consistency.

This is a worthwhile source cleanup, but lower priority than section-heading standardisation.

### 4.2 Two top-level `#` headings in course-track files are not a blocker

The current course-track pattern remains acceptable for Unit 8 and does not need urgent correction.

## 5. Recommendation

### Recommended source edits now

Standardise the common-info headings:

- change `## 4. Eight Non-Language Course Types`
  to `## 4. Eight Course Track Files`
- change `## 8. Resource Opportunities`
  to `## 8. Spaces and Materials`

Optional but recommended afterward:

- change section 4 subheadings from `Lesson A` style to `Course A` style

### Not recommended right now

Do not do a broad rewrite of the 8 course-track files at this stage.

Reason:

- their structure is already stable;
- the current sync/render pipeline can use them;
- large rewrite would create churn without improving immediate usability.

## 6. Final Assessment

PG Unit 8 is structurally ready to act as the source model for future PG non-language units, with one important note:

- future units should follow `Eight Course Track Files` and `Spaces and Materials`;
- Unit 8 should be standardised at the source level so future expansion does not inherit the older heading patterns.
