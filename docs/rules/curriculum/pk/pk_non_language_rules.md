# PK Non-Language Markdown Generation Rules

Version: 1.1
Date: 2026-06-24
Reference Unit: PK Unit 8: Nature, Weather and Animals
Status: Active operational rule for future PK non-language unit generation, translation, sync, and dynamic loading

## 1. Purpose

This document defines how PK non-language curriculum Markdown files should be written so they:

- match the current dynamic frontend structure;
- remain aligned with the locked PK Unit 8 pattern;
- can be translated and synced without manual structural repair;
- preserve PK developmental boundaries.

Read this together with:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pk_pg_non_language_canonical_structure_note.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/dynamic_unit_execution_standard.md`

## 2. Core PK Boundary

PK non-language courses are not language lessons and not full detailed lesson plans.

Baseline participation is built through:

- comprehension;
- action response;
- choice-making;
- object handling;
- supported participation;
- simple task participation;
- single words or short chunks when ready;
- teacher-supported routine language.

Do not require:

- independent full-sentence production;
- formal explanation;
- worksheet-driven output;
- grammar targets;
- phonics targets;
- unscaffolded open-question answering;
- assessment-style speaking performance;
- mastery of HighScope KDI items.

Optional Challenge is readiness-based only. It may be modelled or offered to ready children, but it must not become a whole-class mastery target.

## 3. Unit Folder Structure

Each PK non-language unit must use this structure:

```text
06_curriculum_design/pk/non_language_courses/unit_XX_unit_slug/
├── 00_common_info/
│   └── pk_unit_XX_unit_slug_common_info_v1_0.md
├── 01_course_tracks/
│   ├── pk_unit_XX_course_a_daily_life_self_care_independence.md
│   ├── pk_unit_XX_course_b_sensory_object_early_inquiry.md
│   ├── pk_unit_XX_course_c1_story_puppet_early_retelling.md
│   ├── pk_unit_XX_course_c2_pretend_play_social_role_play.md
│   ├── pk_unit_XX_course_d_creative_expression_making.md
│   ├── pk_unit_XX_course_e_music_rhythm_movement.md
│   ├── pk_unit_XX_course_f_construction_small_world_play.md
│   └── pk_unit_XX_course_g_psed_safety_social_participation.md
├── 02_translations/
│   └── zh_cn/
│       ├── 00_common_info/
│       │   └── pk_unit_XX_unit_slug_common_info_v1_0_zh_cn.md
│       └── 01_course_tracks/
│           ├── pk_unit_XX_course_a_daily_life_self_care_independence_zh_cn.md
│           ├── pk_unit_XX_course_b_sensory_object_early_inquiry_zh_cn.md
│           ├── pk_unit_XX_course_c1_story_puppet_early_retelling_zh_cn.md
│           ├── pk_unit_XX_course_c2_pretend_play_social_role_play_zh_cn.md
│           ├── pk_unit_XX_course_d_creative_expression_making_zh_cn.md
│           ├── pk_unit_XX_course_e_music_rhythm_movement_zh_cn.md
│           ├── pk_unit_XX_course_f_construction_small_world_play_zh_cn.md
│           └── pk_unit_XX_course_g_psed_safety_social_participation_zh_cn.md
├── 03_resources_notes/
└── 99_archive/
```

Use `course_` for active Course Track filenames. Do not use `lesson_` for active Course Track filenames.

## 4. Source and Translation Rules

English source files are the canonical structure source.

English files:

- must use English for all visible Markdown content;
- must not include Chinese headings, Chinese helper labels, or bilingual headings;
- must not use mixed labels such as `Cognitive Objectives｜认知目标`.

Chinese files:

- must mirror the English file set one-to-one;
- must mirror the English section order and heading depth;
- must use Chinese for structural headings, explanatory prose, and activity descriptions;
- may preserve English teaching input items when they are intended for teacher or child exposure.

English teaching input items allowed inside Chinese files include:

- vocabulary lists;
- teacher routine language;
- story sample code blocks;
- song titles;
- chants;
- short phrase examples.

Song titles should remain in English in both English and Chinese files.

Chinese files must not contain broken placeholders or mechanically damaged text.

## 5. Unit Common Info Structure

Future PK unit common-info files should use this canonical structure:

````markdown
# PK Unit X: Unit Name — Non-Language Course Common Info

## 1. Unit Theme Overview

## 2. Unit Language

### Core Vocabulary
### Animal Sounds
### Movement & Action Language
### Care Language
### Optional Challenge

## 3. Weekly Subthemes

### Week 1: Weekly Subtheme
### Week 2: Weekly Subtheme
### Week 3: Weekly Subtheme
### Week 4: Weekly Subtheme

## 4. Eight Course Track Files

### Course A: Daily Life, Self-Care & Independence
### Course B: Sensory, Object & Early Inquiry
### Course C1: Story, Puppet & Early Retelling
### Course C2: Pretend Play & Social Role-Play
### Course D: Creative Expression & Making
### Course E: Music, Rhythm & Movement
### Course F: Construction & Small-World Play
### Course G: PSED, Safety & Social Participation

## 5. Teacher Input Pool

## 6. Expected PK Response Modes

## 7. Theme Songs / Chants

## 8. Spaces and Materials

### Useful EASTIE Spaces
### Useful Materials
### Enhanced Resource Opportunities

## 9. Boundary Notes

## 10. Unit-Level Observation Focus
````

Legacy Unit 8 headings such as `## Resource Opportunities` may still be accepted by the current renderer, but future units should use `## Spaces and Materials`.

Chinese Common Info must mirror the structure.

Weekly subtheme headings in Chinese should use a parser-friendly ASCII colon:

```markdown
### 第一周: 身边的自然
### 第二周: 动物与声音
### 第三周: 天气、身体感受与动作
### 第四周: 照料自然与动物
```

The dynamic renderer should split these as:

```text
label: 第一周
title: 身边的自然
```

## 6. Unit Common Info Field Rules

### Unit Theme Overview

Explain:

- the unit theme;
- how PK children experience the theme;
- what the unit prepares;
- what is intentionally delayed.

This is a strategic overview, not a week-by-week plan.

### Unit Language

Use `Core Vocabulary` only for the primary unit vocabulary.

Other language groups should use functional labels, such as:

```text
Animal Sounds
Movement & Action Language
Care Language
```

Do not include:

- Optional Visual Exposure Vocabulary;
- Baseline Child Output;
- Expected Response Modes inside the language section;
- long readiness explanations such as "For ready children only".

`Optional Challenge` may contain short sentence models or chunk models, but it remains non-baseline.

### Weekly Subthemes

Each week should contain only:

- the week heading;
- one short description paragraph.

Do not include weekly vocabulary lists, activity ideas, response expectations, or material lists.

### Eight Course Track Files

PK must explicitly list all 8 course tracks in the unit common-info file. This is not optional.

Use exactly these labels:

```text
Course A: Daily Life, Self-Care & Independence
Course B: Sensory, Object & Early Inquiry
Course C1: Story, Puppet & Early Retelling
Course C2: Pretend Play & Social Role-Play
Course D: Creative Expression & Making
Course E: Music, Rhythm & Movement
Course F: Construction & Small-World Play
Course G: PSED, Safety & Social Participation
```

### Teacher Input Pool

Group teacher input by function or theme.

Teacher input may include:

- short commands;
- scaffolded questions;
- model sentences;
- routine language.

Keep teacher input as English language items. Use `｜` as the item separator when listing short items.

### Expected PK Response Modes

This section belongs in unit common info, not inside `Unit Language`.

It should describe response patterns such as:

- looking;
- pointing;
- choosing;
- matching;
- placing;
- giving;
- moving;
- imitating sounds or movements;
- using single words;
- using short chunks when ready.

Do not present this as mastery or assessment criteria.

### Theme Songs / Chants

Only list strong-fit songs from the local Super Simple Songs library.

If the unit has multiple theme strands, group songs by theme.

Do not include:

- confidence labels;
- Use With Caution groups;
- Teacher-Made Chants;
- broad optional song banks;
- songs that only weakly match the unit.

Song titles stay in English.

### Spaces and Materials

Use only:

```text
Useful EASTIE Spaces
Useful Materials
Enhanced Resource Opportunities
```

Translate all explanatory content and all space/material item names in Chinese files, while preserving official proper nouns where needed.

### Boundary Notes

Boundary Notes block over-teaching.

Typical blocked content includes:

- full-sentence explanation requirements;
- formal science explanation;
- habitat description;
- abstract classification tasks;
- `There is / There are`;
- independent production of care sentences.

### Unit-Level Observation Focus

Keep this unit-level, not lesson-level.

It should help teachers notice:

- recognition;
- participation;
- action response;
- early naming;
- supported short chunks;
- care behaviour;
- growing independence.

## 7. Course Track Structure

Each Course Track file contains exactly four light lessons.

English Course Track structure:

````markdown
# PK Unit X Course A: Course Title

## Course Overview

### Course Type

Daily Life, Self-Care & Independence

### Course Purpose

...

---

# Lesson 1: Lesson Title

## Lesson Outcome

### 1. Cognitive Objectives

...

### 2. Skill-based Objectives

...

### 3. Affective Objectives

...

## HighScope KDI Alignment

### Domain: A. Approaches to Learning

**Items:** 3. Engagement; 5. Use of resources

**How We Support:** ...

## Theme Story Context

...

## Light Theme Language

```text
...
```

## Teacher Routine Language

```text
...
```

## Optional Challenge

...

## Suggested Activities / Games

### 1. Activity Title

...

### 2. Activity Title

...

### 3. Activity Title

...
````

Repeat the same lesson field structure for Lesson 2, Lesson 3, and Lesson 4.

Chinese Course Track structure mirrors the English file:

````markdown
# PK第X单元：单元名称
# 课程A：中文课程名

## 课程概览

### 课程类型

日常生活、自我照料与独立性

### 课程目的

...

# 第1课：中文课标题

## 课程目标

### 1. 认知目标

...

### 2. 技能目标

...

### 3. 情感目标

...

## HighScope KDI 对齐

### Domain：A. Approaches to Learning

**Items：** 3. Engagement；5. Use of resources

**How We Support：** 本课通过……
````

## 8. Course Track Field Rules

### Course Overview

Use only these fields:

```markdown
## Course Overview

### Course Type

### Course Purpose
```

Do not include:

- File Role;
- Course A Overview or Course Track Overview as separate headings;
- Course Boundary Notes or Course Track Boundary;
- course-level material lists;
- course-level safety notes;
- course-level song banks.

### Lesson Outcome

`Lesson Outcome` should contain three objective groups only:

```markdown
### 1. Cognitive Objectives
### 2. Skill-based Objectives
### 3. Affective Objectives
```

Do not place a general lesson-outcome description paragraph before the objective groups.

### HighScope KDI Alignment

HighScope KDI is curriculum alignment and teacher reference. It is not PK assessment.

Each lesson should include:

- 1-2 domains;
- 1-3 items per domain;
- one `How We Support` explanation per domain.

Use only items directly supported by the lesson experience.

### Theme Story Context

Describe the lesson situation or story carrier.

Keep it short and usable. This is not a full script.

### Light Theme Language

List the light theme language for the lesson in a fenced `text` block.

These are not full language-lesson targets. They support the non-language course experience.

### Teacher Routine Language

List teacher language as separate lines inside a fenced `text` block.

Correct:

````markdown
```text
Look at the sky.
Choose one.
Put it here.
Good job.
```
````

Avoid:

```text
Look at the sky. ｜ Choose one. ｜ Put it here. ｜ Good job.
```

### Optional Challenge

Use this only for readiness-based language that may be modelled or offered to ready children.

Do not treat Optional Challenge as whole-class mastery.

### Suggested Activities / Games

Include three activity options.

Each option should have:

- a short title;
- a concise description.

Do not turn this into a step-by-step procedure script.

## 9. Course E Special Rule

Course E may include:

```markdown
## Suggested Songs / Chants
```

Place it after HighScope KDI and before Theme Story Context:

```markdown
## HighScope KDI Alignment

...

## Suggested Songs / Chants

...

## Theme Story Context
```

Chinese Course E uses:

```markdown
## 建议歌曲与韵律
```

Song titles remain English.

## 10. Recommended PK KDI Pool

Most PK non-language lessons should draw from these items when relevant:

```text
A. Approaches to Learning
1. Initiative
3. Engagement
4. Problem solving
5. Use of resources
6. Reflection

B. Social and Emotional Development
8. Sense of competence
9. Emotions
11. Community
12. Building relationships
13. Cooperative play
15. Conflict resolution

C. Physical Development and Health
16. Gross-motor skills
17. Fine-motor skills
18. Body awareness
19. Personal care
20. Healthy behavior

D. Language, Literacy, and Communication
25. Speaking
26. Vocabulary
27. Comprehension

F. Creative Arts
40. Art
41. Music
42. Movement
43. Pretend play

G. Science and Technology
45. Observing
46. Classifying
47. Experimenting
51. Natural and physical world
52. Tools and technology

H. Social Studies
55. Decision making
58. Ecology
```

Use D. Language, Literacy, and Communication only when the lesson genuinely supports supported naming, comprehension, or short-chunk participation. Do not use it to imply full-sentence expectations.

## 11. Validation Checklist

Before accepting a generated unit, verify:

- all active Course Track filenames use `course_`;
- no active Course Track filename uses `lesson_`;
- English and Chinese file sets match one-to-one;
- unit common-info includes all 8 course tracks;
- each Course Track contains exactly four lessons;
- each lesson follows the required field order;
- KDI appears after lesson objectives and before Theme Story Context or Suggested Songs;
- each KDI section contains 1-2 domains;
- each domain contains 1-3 items;
- each domain has a How We Support explanation;
- Chinese files contain no broken placeholders;
- Chinese song titles remain English;
- Chinese weekly subthemes use `第一周: 标题` format;
- PK boundaries are preserved.

Recommended scans:

```text
No Chinese characters in active English source files.
No broken placeholders in Chinese translation files.
No empty chip sources such as "｜ ｜".
No pure punctuation-only lines.
No duplicated or missing lesson headings.
```

## 12. Do Not Do

Do not:

- overwrite English source files with Chinese;
- treat Downloads as source of truth;
- generate content directly from static HTML;
- add old weekly maps as active source;
- use `lesson_` filenames for active Course Tracks;
- translate English song titles into Chinese;
- remove English teacher input from Chinese translation files;
- reintroduce `File Role` as a common-info section;
- reintroduce `Feedback Interface Placeholder` as curriculum content;
- require PK children to explain, perform, or master whole-class sentence targets.
