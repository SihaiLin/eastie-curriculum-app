# PK Unit 8 Non-Language Structure Audit

Date: 2026-06-24
Audited by: Codex
Scope:

- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/pk/non_language_courses/unit_08_nature_weather_animals/00_common_info/pk_unit_08_nature_weather_animals_common_info_v1_1.md`
- all 8 files under `01_course_tracks/`
- current canonical note and PK non-language rules in the clean project

## 1. Summary Judgment

PK Unit 8 source structure is largely aligned with the current dynamic workflow.

The main structural mismatch is in the common-info file, not in the course-track files.

Current status:

- `01_course_tracks/` is structurally usable and close to canonical.
- `00_common_info/` is operationally usable, but still contains one legacy section title that should be standardised for future units.
- No missing course track files were found.

## 2. Confirmed Positives

### 2.1 Common Info

Confirmed present:

- `## 1. Unit Theme Overview`
- `## 2. Unit Language`
- `## 3. Weekly Subthemes`
- `## 4. Eight Course Track Files`
- `## 5. Teacher Input Pool`
- `## 6. Expected PK Response Modes`
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
- include `## Optional Challenge` 4 times

Course E correctly includes `## Suggested Songs / Chants`.

No obsolete lesson-level sections were found, such as:

- `## File Role`
- `## Feedback Interface Placeholder`
- `## Course Boundary`
- `## Materials`
- `## Observation Focus`

## 3. Main Mismatch Found

### 3.1 Common Info Section 8 still uses legacy heading

Current source uses:

```markdown
## 8. Resource Opportunities
```

Current canonical structure now prefers:

```markdown
## 8. Spaces and Materials
```

This is not breaking the current renderer, because the renderer still accepts resource-related heading variants.

However, this should be treated as a legacy Unit 8 compatibility case, not the model for future units.

## 4. Minor Non-Blocking Differences

These are not blockers, but should be understood clearly:

### 4.1 Two top-level `#` headings in course-track files

Current pattern:

```markdown
# PK Unit 8: Nature, Weather and Animals
# Course A: Daily Life, Self-Care & Independence
```

This is already in use and currently works in the sync/render flow.

It is acceptable to keep for Unit 8 if the current parser expects it.

If future parser simplification is desired, a later standardisation pass can decide whether to keep:

- two `#` headings, or
- one `#` heading plus one `##` heading.

No change is required right now.

### 4.2 Course Type formatting uses bold label

Current pattern:

```markdown
### Course Type

**A. Daily Life, Self-Care & Independence**
```

This is working and does not currently need correction.

## 5. Recommendation

### Recommended source edit now

Standardise the common-info heading:

- change `## 8. Resource Opportunities`
- to `## 8. Spaces and Materials`

This is a safe and worthwhile cleanup because it matches the new canonical structure and future rules.

### Not recommended right now

Do not do a broad source rewrite of the 8 course-track files at this stage.

Reason:

- their structure is already stable;
- the current sync/render pipeline can use them;
- large rewrite would introduce unnecessary churn before expansion to Units 1-7.

## 6. Final Assessment

PK Unit 8 is structurally ready to act as the source model for future PK non-language units, with one important note:

- future units should follow the new canonical section title `Spaces and Materials`;
- Unit 8 may keep temporary backward compatibility, but ideally the source heading should also be updated once convenient.
