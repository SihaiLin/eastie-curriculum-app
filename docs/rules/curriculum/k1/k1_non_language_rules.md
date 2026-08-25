# K1 Non-Language Markdown Generation Rules

Version: 0.1  
Date: 2026-06-25  
Status: First operational draft for K1 non-language curriculum structure  
Reference Status: No fully built reference unit yet

## 1. Purpose

This document defines the first stable Markdown structure for K1 non-language curriculum files.

Use this document when:

- creating the first K1 non-language unit source files;
- reviewing or translating K1 non-language Markdown;
- preparing K1 non-language content for future dynamic loading;
- checking whether a K1 non-language unit follows the agreed source structure.

This is a K1-specific rule set.

K1 non-language should **not** be forced into:

- PG/PK non-language 8-course-track structure;
- K-language Power Up weekly lesson-pack structure.

## 1A. Terminology Lock

For K1 non-language, the source structure must distinguish clearly between `course` and `lesson`.

- `course` = a stable non-language course type or source file inside one unit, such as Math, Art, Music, Science, or Construction;
- `lesson` = one actual delivered class session chosen from the unit course pool later in planning or scheduling;
- `week` is not a required source dimension for K1 non-language Markdown and must not be treated as the main organizing layer.

This means:

- unit overview files list a **course pool**, not a lesson pool;
- `01_course_tracks/` stores stable unit course-track files;
- later teaching plans or dynamic pages may show concrete lessons, but the current source-of-truth layer is still unit -> course track.

## 2. Core K1 Positioning

K1 non-language is a broad early-years experience layer, not a language lesson pack and not a weekly course-track system like PG/PK non-language.

The current agreed K1 non-language assumptions are:

- each unit normally schedules **about 10 non-language teaching slots** in real teaching time;
- the curriculum may define a **larger course pool** than the exact number of scheduled slots;
- teachers may choose which course types or course-track files are used in a specific unit plan;
- the overall theme should stay meaningfully related to the Power Up language unit theme when possible;
- if a course type does not naturally fit the Power Up theme, do not force a weak or artificial connection.

Baseline child participation should remain:

- adult-supported;
- play-based;
- sensory and action-based;
- low-pressure;
- appropriate for early K1 independence and attention span.

Do not turn K1 non-language courses into:

- mini language lessons;
- formal academic worksheets;
- long teacher-led explanation blocks;
- outcome-heavy assessment tasks;
- grammar or phonics instruction.

## 3. Current K1 Non-Language Course Pool

The current baseline course pool currently includes these 9 course types:

1. Math
2. Graded Reading
3. Social and Emotional Learning
4. Self-Care
5. Country Exploration
6. Art
7. Music
8. Science
9. Construction

Current known anchors:

- Math is based on **Math Growing Ladder**
- Graded Reading is based on **RAZ AA**
- Country Exploration uses **one selected country per unit**
- The overall unit theme still follows the related Power Up theme where that fit is meaningful

Important:

- this list is the current baseline pool, not a permanently fixed upper limit;
- future expansion may increase the course pool beyond the current 9 baseline course types;
- a unit does not need to use every available course type if the final weekly timetable only contains about 10 teaching slots;
- if the course pool later grows to 12 or 14 types, teachers may select the most suitable sessions for the real unit plan.

## 4. Unit Folder Structure

Each K1 non-language unit should use this structure:

```text
06_curriculum_design/k1/non_language_courses/unit_XX_unit_slug/
├── 00_unit_overview/
│   └── k1_unit_XX_unit_slug_non_language_overview.md
├── 01_course_tracks/
│   ├── k1_unit_XX_course_a_math_growing_ladder.md
│   ├── k1_unit_XX_course_b_graded_reading_raz_aa.md
│   ├── k1_unit_XX_course_c_social_emotional_learning.md
│   ├── k1_unit_XX_course_d_self_care.md
│   ├── k1_unit_XX_course_e_country_exploration.md
│   ├── k1_unit_XX_course_f_art.md
│   ├── k1_unit_XX_course_g_music.md
│   ├── k1_unit_XX_course_h_science.md
│   └── k1_unit_XX_course_i_construction.md
├── 02_translations/
│   └── zh_cn/
│       ├── 00_unit_overview/
│       │   └── k1_unit_XX_unit_slug_non_language_overview_zh_cn.md
│       └── 01_course_tracks/
│           ├── k1_unit_XX_course_a_math_growing_ladder_zh_cn.md
│           ├── k1_unit_XX_course_b_graded_reading_raz_aa_zh_cn.md
│           ├── k1_unit_XX_course_c_social_emotional_learning_zh_cn.md
│           ├── k1_unit_XX_course_d_self_care_zh_cn.md
│           ├── k1_unit_XX_course_e_country_exploration_zh_cn.md
│           ├── k1_unit_XX_course_f_art_zh_cn.md
│           ├── k1_unit_XX_course_g_music_zh_cn.md
│           ├── k1_unit_XX_course_h_science_zh_cn.md
│           └── k1_unit_XX_course_i_construction_zh_cn.md
├── 03_resources_notes/
└── 99_archive/
```

## 5. Unit Overview Structure

Each unit should have exactly one overview Markdown file.

Canonical structure:

````markdown
# K1 Unit X: Unit Name — Non-Language Overview

## 1. Unit Theme Overview

## 2. Power Up Theme Link

## 3. Unit-Level Language Exposure

## 4. Non-Language Course Pool

### Course A: Math
### Course B: Graded Reading
### Course C: Social and Emotional Learning
### Course D: Self-Care
### Course E: Country Exploration
### Course F: Art
### Course G: Music
### Course H: Science
### Course I: Construction

## 5. Teacher Support Language

## 6. Songs, Books, and Resource Opportunities

## 7. Boundary Notes

## 8. Observation Focus
````

Guidance:

- `Unit Theme Overview` explains the overall K1 unit idea in plain curriculum terms.
- `Power Up Theme Link` explains the meaningful connection to the related language unit.
- `Unit-Level Language Exposure` is light and should not become a language-target inventory like PG/PK language pages.
- `Non-Language Course Pool` is a unit map, not a lesson-plan dump.
- it is acceptable for the course pool to be larger than the final number of scheduled teaching slots.
- when needed, add a short note explaining which course-track files are core and which are optional selections.

## 6. Course-Track File Structure

Each K1 non-language course-track file represents one stable course type within the unit course pool.

This matches the PG/PK non-language principle:

- one unit overview file explains the whole unit;
- one course-track file represents one course line inside that unit;
- one course-track file may contain a short single implementation block or a sequence of multiple concrete lessons, depending on the subject logic.

Math is the clearest example: one Math course-track file may contain 4 concrete math lessons inside the same unit.

Canonical structure:

````markdown
# K1 Unit X Course A: Course Title

## Course Type

## Course Overview

### Course Type

### Course Purpose

### Unit Outcomes

### Course Lesson Sequence

---

# Lesson 1: Lesson Title

## Lesson Outcome

### 1. Cognitive Objectives

### 2. Skill-based Objectives

### 3. Affective Objectives

## Progression Alignment

## Theme Story Context

## Light Theme Language

## Teacher Routine Language

## Optional Extension

## Suggested Activities / Games
````

### Field Intent

`Course Type`

- names the stable course category, such as Math or Science

`Course Purpose`

- explains the course’s function inside the unit and how it relates meaningfully, flexibly, or lightly to the unit theme
- do not fake a strong theme link where one does not exist

`Unit Outcomes`

- states the overall outcomes children may reach across this course line in the unit

`Course Lesson Sequence`

- names the concrete lessons or mini-sequence inside this course track

`Lesson Outcome`

- describes one concrete lesson within the course track

`Progression Alignment`

- links the lesson to the subject progression when relevant, such as Math Growing Ladder

`Theme Story Context`

- gives the lesson its unit-linked context without forcing a weak thematic match

`Light Theme Language`

- light exposure vocabulary only
- may include key English words that will naturally appear in the lesson
- should not become an overloaded word bank

`Teacher Support Language`

- short adult-facing phrases, prompts, or routine language
- should support the experience, not script the entire lesson

`Optional Extension`

- allows ready children to go slightly further without turning the lesson into a high-pressure target

`Suggested Activities / Games`

- gives 2-3 activity directions for the concrete lesson

## 7. K1 Non-Language Boundaries

K1 non-language courses should not:

- become hidden language lessons;
- force spoken output;
- require worksheet completion as the main activity;
- over-explain abstract concepts;
- force every course type to match the Power Up theme equally strongly;
- copy PG/PK unit overview density when K1 needs something lighter;
- turn every course into a product-based showcase task.

Country Exploration in particular should remain flexible:

- choose one country per unit;
- connect it to the unit theme where this is natural;
- if the connection is weak, keep the country lesson meaningful in its own right rather than forcing it into the theme.

## 8. Track-Level Mapping Principle

K1 non-language should support both:

1. **unit-level viewing** inside each non-language unit overview; and
2. **track-level viewing** for lesson lines such as Math.

This means a lesson line may be represented in more than one layer:

- inside the unit overview as the current unit’s lesson entry;
- inside the individual course-track file as classroom implementation;
- inside a separate track map file as cross-unit progression management.

For example, Math may later use:

- `EASTIE_Math_Growing_Ladder_Full.md` as the highest progression source;
- `k1_math_track_map.md` as the K1 cross-unit math planning index;
- the current unit overview for unit display;
- the current math course-track file for implementation detail.

This is not duplication for its own sake. It is a controlled separation between:

- progression source;
- cross-unit track planning;
- unit page display;
- lesson implementation.

## 9. Translation Rules

English source files are canonical.

Chinese files must:

- mirror the English file set one-to-one;
- keep the same heading order and structure;
- translate explanatory prose naturally;
- preserve English items where the English itself is the teaching content.

Keep these in English in Chinese files when appropriate:

- vocabulary items;
- teacher support phrases;
- song titles;
- book titles such as RAZ labels;
- proper program names such as Math Growing Ladder.

## 10. Dynamic-Loading Readiness

This rules file defines source structure first.

It does **not** yet claim that K1 non-language is dynamically wired into the web app.

Before a K1 non-language unit becomes dynamic:

1. the first real unit must be written in this structure;
2. translation structure must be confirmed;
3. a sync/data contract decision must be made;
4. the dynamic page pattern must be chosen and documented.

## 11. First-Unit Recommendation

Use this ruleset to build the **first real K1 non-language unit** before creating broader automation.

The first real unit should validate:

- whether the 10-lesson structure is comfortable in practice;
- whether the overview density feels right;
- whether `Theme Vocabulary` and `Teacher Support Language` stay light enough;
- whether a dynamic page should be overview-first, lesson-list-first, or mixed.
