# PG/PK Non-Language Canonical Structure Note

Version: 1.0
Date: 2026-06-24
Status: Active canonical reference

## 1. Purpose

This note defines the current canonical structure for PG and PK non-language units.

It exists because historical notes, early markdown drafts, generated snapshots, and the current dynamic renderer do not all use exactly the same wording. Future unit generation must follow this note first, then the level-specific rule document.

This note does not replace:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pg/pg_non_language_rules.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pk/pk_non_language_rules.md`

It clarifies the shared structure that both of those rule documents should follow.

## 2. What Is Confirmed

The following are confirmed by current source folders, generated markdown snapshots, and the dynamic renderer:

1. PG and PK non-language units both use:
   - `00_common_info/`
   - `01_course_tracks/`
   - 8 course track files
   - 4 lessons per course track
2. PK is not missing 8 course track files.
3. The current frontend overview page expects a broadly shared PG/PK section order.
4. Some older rule text is obsolete and must not be treated as canonical.

## 3. Shared Folder Structure

Both PG and PK non-language units should follow this high-level structure:

```text
unit_XX_unit_slug/
├── 00_common_info/
├── 01_course_tracks/
├── 02_translations/
├── 03_resources_notes/
└── 99_archive/
```

Inside `01_course_tracks/`, both PG and PK should have 8 active course track files:

- Course A
- Course B
- Course C1
- Course C2
- Course D
- Course E
- Course F
- Course G

Active files should use `course_`, not `lesson_`, in the filename.

## 4. Shared Unit Overview Structure

Future PG and PK common-info files should follow this section order:

````markdown
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
````

This is the canonical order for future units.

## 5. Shared Renderer-Level Display Logic

The current dynamic frontend groups or relabels some sections for presentation:

- `Unit Language`
- `8 Course Track Files`
- `Week 1-4 Subthemes`
- `Teacher Input Pool`
- `Theme Songs / Chants`
- `Spaces and Materials`
- `Boundary Notes`
- `Unit-Level Observation Focus`

This means a source heading and a page heading do not always need to be word-for-word identical, but future source files should prefer the canonical wording above so sync logic stays simple.

## 6. Legacy Variants Still Seen in Unit 8

The current Unit 8 source/generator still contains some historical variants.

Accepted legacy variants include:

- PG source `## 4. Eight Non-Language Course Types`
- PK source `## 4. Eight Course Track Files`
- PG/PK source `## 8. Resource Opportunities`

These are tolerated for backward compatibility.

For future units, prefer:

- `## 4. Eight Course Track Files`
- `## 8. Spaces and Materials`

## 7. What Is Obsolete

The following should be treated as obsolete for future PG/PK non-language common-info generation:

- `## File Role`
- `## Feedback Interface Placeholder`
- `## SSS Song Recommendations`
  as a separate common-info section name
- rules saying the 8 course types must be nested inside `File Role`

The current canonical structure uses a dedicated section:

```markdown
## 4. Eight Course Track Files
```

and a dedicated section:

```markdown
## 7. Theme Songs / Chants
```

## 8. Shared Course Track Structure

Each course track file should contain:

```markdown
## Course Overview
### Course Type
### Course Purpose
```

Then 4 lessons, each with:

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

Level-specific additions:

- PK may include `## Optional Challenge`
- Course E may include `## Suggested Songs / Chants`

## 9. Shared Boundaries

Both PG and PK non-language files must preserve these principles:

- non-language courses are not language lessons;
- theme language supports experience, not language-drill output;
- HighScope KDI is alignment, not mastery assessment;
- song titles stay in English;
- translations must mirror structure exactly;
- static HTML is not the source of truth.

## 10. Level-Specific Differences That Should Remain

These differences are real and should stay:

### PG

- lighter theme language pool;
- no required verbal output;
- optional incidental exposure instead of Optional Challenge;
- stronger emphasis on routine participation, imitation, and physical response.

### PK

- broader core vocabulary;
- explicit `Optional Challenge`;
- stronger support for single words and short chunks;
- more scaffolded teacher input and early naming.

## 11. Instruction for Future Sessions

When generating future PG or PK non-language units:

1. Read this file first.
2. Then read the level-specific rules file.
3. Follow the canonical section order in this note.
4. Use legacy variants only when maintaining existing Unit 8 backward compatibility.
5. If a new structural rule is discovered, update this note and the level-specific rules together.
