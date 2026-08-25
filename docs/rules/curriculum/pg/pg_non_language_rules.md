# PG Non-Language Markdown Generation Rules

Version: 1.1  
Date: 2026-06-24  
Reference Unit: PG Unit 8: Nature, Weather and Animals  
Status: Operational rules for future PG non-language unit generation and dynamic loading

## 1. Purpose

This document defines the Markdown generation rules for PG non-language curriculum files.

Use this document when generating, translating, validating, or dynamically loading PG non-language unit Markdown files.

This document is more operational than the framework note. The framework note explains the curriculum structure; this document explains exactly how Markdown files should be written.

Read this together with:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pk_pg_non_language_canonical_structure_note.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/dynamic_unit_execution_standard.md`

## 2. Core PG Boundary

PG non-language courses are not language lessons and not full detailed lesson plans.

Baseline child participation should be based on:

- adult-supported participation;
- sensory participation;
- physical response;
- routine participation;
- gesture, pointing, touching, choosing, giving, placing, moving;
- incidental imitation only.

Do not require:

- independent verbal output;
- full sentence production;
- formal explanation;
- worksheet tasks;
- written response;
- assessment-style output;
- grammar or phonics targets;
- mastery of HighScope KDI items.

## 3. Unit Folder Structure

Each PG non-language unit must use this structure:

```text
06_curriculum_design/pg/unit_XX_unit_slug/
├── 00_common_info/
│   └── pg_unit_XX_unit_slug_common_info.md
├── 01_course_tracks/
│   ├── pg_unit_XX_course_a_self_care_daily_routine.md
│   ├── pg_unit_XX_course_b_sensory_object_exploration.md
│   ├── pg_unit_XX_course_c1_story_puppet_experience.md
│   ├── pg_unit_XX_course_c2_pretend_role_play_experience.md
│   ├── pg_unit_XX_course_d_creative_expression.md
│   ├── pg_unit_XX_course_e_music_rhythm_movement.md
│   ├── pg_unit_XX_course_f_construction_small_world_play.md
│   └── pg_unit_XX_course_g_psed_safety.md
├── 02_translations/
│   └── zh_cn/
│       ├── 00_common_info/
│       │   └── pg_unit_XX_unit_slug_common_info_zh_cn.md
│       └── 01_course_tracks/
│           ├── pg_unit_XX_course_a_self_care_daily_routine_zh_cn.md
│           ├── pg_unit_XX_course_b_sensory_object_exploration_zh_cn.md
│           ├── pg_unit_XX_course_c1_story_puppet_experience_zh_cn.md
│           ├── pg_unit_XX_course_c2_pretend_role_play_experience_zh_cn.md
│           ├── pg_unit_XX_course_d_creative_expression_zh_cn.md
│           ├── pg_unit_XX_course_e_music_rhythm_movement_zh_cn.md
│           ├── pg_unit_XX_course_f_construction_small_world_play_zh_cn.md
│           └── pg_unit_XX_course_g_psed_safety_zh_cn.md
├── 03_resources_notes/
└── 99_archive/
```

Use `course_` for active Course Track filenames. Do not use `lesson_` for active Course Track filenames.

## 3A. PG-Only Unit 9 Summer Extension

PG may include one additional summer extension unit because the PG class has an extra summer teaching block.

This additional unit should be treated as:

```text
PG Unit 9: PG-only summer extension unit
```

It must not change the PG non-language course structure.

Unit 9 must keep the same eight Course Track types:

```text
Course A: Self-Care & Daily Routine Experience
Course B: Sensory & Object Exploration
Course C1: Story & Puppet Experience
Course C2: Pretend Play & Role-Play Experience
Course D: Creative Expression
Course E: Music, Rhythm & Movement
Course F: Construction & Small-World Play
Course G: PSED & Safety
```

Unit 9 should add only a new PG theme context, such as summer, water, outdoor play, sun/shade, cooling routines, summer fruit, picnic play, beach/garden pretend play, and summer safety.

Do not infer that PK, K1, K2, or K3 should also have a Unit 9. The extra unit is PG-only unless the project owner explicitly approves additional-unit structures for other levels.

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

Chinese files must not contain broken placeholders or mechanically damaged text such as:

```text
相关英文输入
相关英文短语
歌曲 —
** 动物 农场**
树叶 ｜ 花 ｜ 水 ｜ ｜ ｜
水, .
给我看 .
.
?
```

## 5. Unit Common Info Structure

Future PG Common Info files should use this canonical structure:

````markdown
# PG Unit X: Unit Name — Non-Language Course Common Info

## 1. Unit Theme Overview

## 2. Unit Language

### Theme Vocabulary Group 1
### Theme Vocabulary Group 2
### Action and Response Language
### Optional Incidental Exposure

## 3. Weekly Subthemes

### Week 1: Weekly Subtheme
### Week 2: Weekly Subtheme
### Week 3: Weekly Subtheme
### Week 4: Weekly Subtheme

## 4. Eight Course Track Files

### Course A: Self-Care & Daily Routine Experience
### Course B: Sensory & Object Exploration
### Course C1: Story & Puppet Experience
### Course C2: Pretend Play & Role-Play Experience
### Course D: Creative Expression
### Course E: Music, Rhythm & Movement
### Course F: Construction & Small-World Play
### Course G: PSED & Safety

## 5. Teacher Input Pool

## 6. Expected PG Response Modes

## 7. Theme Songs / Chants

## 8. Spaces and Materials

## 9. Boundary Notes

## 10. Unit-Level Observation Focus
````

Legacy Unit 8 headings such as `## Eight Non-Language Course Types` and `## Resource Opportunities` may still be accepted by the current renderer, but future units should use `## Eight Course Track Files` and `## Spaces and Materials`.

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

## 6. Course Track Structure

Each Course Track file contains exactly four light lessons.

English Course Track structure:

````markdown
# PG Unit X Course A: Course Title

## Course Overview

### Course Type

Self-Care & Daily Routine Experience

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
# 小小班第X单元 — 课程一: 中文课程名

## 课程概览

### 课程类型

自我照料与日常常规体验

### 课程目的

...

# 第一课：中文课标题

## 课程目标

### 1. 认知目标

...

### 2. 技能目标

...

### 3. 情感目标

...

## HighScope KDI 对齐

### Domain：A. Approaches to Learning

**Item：** 3. Engagement；5. Use of resources

**How We Support：** 中文说明……
````

Chinese lesson titles should be translated:

```markdown
# 第一课：自然游戏后洗手
# 第二课：帮动物朋友刷牙
```

## 7. Course E Special Rule

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

Song titles remain English:

```markdown
- **How's The Weather** — 天气检查和简单回应的主要常规歌曲。
- **Rain Rain Go Away** — 短的雨天动作或手指雨常规。
```

## 8. HighScope KDI Rules

HighScope KDI is curriculum alignment and teacher reference. It is not PG assessment.

Each lesson should include:

- 1-2 domains;
- 1-3 items per domain;
- one `How We Support` explanation per domain.

Use only items directly supported by the lesson experience.

English:

```markdown
## HighScope KDI Alignment

### Domain: C. Physical Development and Health

**Items:** 19. Personal care; 20. Healthy behavior

**How We Support:** The lesson supports personal care and healthy behavior by...
```

Chinese:

```markdown
## HighScope KDI 对齐

### Domain：C. Physical Development and Health

**Item：** 19. Personal care；20. Healthy behavior

**How We Support：** 本课通过……
```

Domain and item names stay in English in both English and Chinese files.

`How We Support` must explain all selected items under that domain.

Do not write that PG children master, independently demonstrate, explain, or are assessed on the KDI item.

## 9. Recommended PG KDI Pool

Most PG non-language lessons should draw from these items when relevant:

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

Use D. Language, Literacy, and Communication cautiously in PG non-language files. Do not use language items to imply required verbal output.

Use E. Mathematics only when the lesson directly supports counting, spatial awareness, classification, pattern, or measurement through action and materials.

## 10. Validation Checklist

Before accepting a generated unit, verify:

- all active Course Track filenames use `course_`;
- no active Course Track filename uses `lesson_`;
- English and Chinese file sets match one-to-one;
- each Course Track contains exactly four lessons;
- each lesson follows the required field order;
- KDI appears after lesson objectives and before Theme Story Context or Suggested Songs;
- each KDI section contains 1-2 domains;
- each domain contains 1-3 items;
- each domain has a How We Support explanation;
- Chinese files contain no broken placeholders;
- Chinese song titles remain English;
- Chinese weekly subthemes use `第一周: 标题` format;
- PG boundaries are preserved.

Recommended scans:

```text
No Chinese characters in active English source files.
No broken placeholders in Chinese translation files.
No empty chip sources such as "｜ ｜".
No pure punctuation-only lines.
No duplicated or missing lesson headings.
```

## 11. Do Not Do

Do not:

- overwrite English source files with Chinese;
- treat Downloads as source of truth;
- generate content directly from static HTML;
- add old weekly maps as active source;
- use `lesson_` filenames for active Course Tracks;
- translate English song titles into Chinese;
- remove English teacher input from Chinese translation files;
- require PG children to speak, explain, write, or master assessment targets.
