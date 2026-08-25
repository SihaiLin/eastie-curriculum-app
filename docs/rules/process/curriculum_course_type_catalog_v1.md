# EASTIE Curriculum Course Type Catalog v1

**Status:** Approved naming catalog  
**Last Updated:** 2026-08-18  
**Scope:** Whole-project course type and course-line naming across PG, PK, K1, K2, and K3.

## 1. Purpose

This document defines the approved English names, UI short names, short codes, and slugs for EASTIE curriculum course types and course lines.

Use this document before:

- creating curriculum Markdown source;
- naming course-line folders;
- building dynamic navigation;
- designing icons or labels;
- updating manifests, registries, or frontend route labels;
- handing work to another content or frontend session.

This document does not define lesson structure or teaching content. It only defines naming.

## 2. Source Basis

This catalog is based on the latest course-type spreadsheet reviewed on 2026-08-18:

```text
/Users/Lucia/Downloads/eastie课程类型清单.xlsx
```

Downloads is only the handoff location. This Markdown file is the shared project naming reference after review.

## 3. Top-Level Course Types

Use four top-level course types.

| Short Code | Official English Name | UI Short Name | Notes |
|---|---|---|---|
| EL | English Language | English | Dedicated English language curriculum. Use this instead of `English Learning`. |
| CC | Core Courses | Core | Foundational developmental / academic courses. |
| CE | Creative Enrichment | Enrichment | Creative, exploratory, practical, and enrichment course lines. |
| PE | Physical Education | PE | Physical education and sports course lines. |

Naming rules:

- Use short codes for compact navigation, icon labels, dashboard filters, and internal classification.
- Use UI short names in compact dashboards, mobile navigation, course grids, and buttons.
- Use official English names in teacher-facing headings, documentation, and longer UI labels.
- Do not use `Non-Language` as a long-term top-level course type. It remains only as a legacy route/source compatibility label during transition.
- The official name remains the source-of-truth name. UI short names are display aliases only.

## 4. Course Line Display Name Catalog

Use this table when building dashboards, navigation, route manifests, icons, or compact unit grids.

| Official Course Line Name | UI Short Name | Suggested Slug |
|---|---|---|
| English Language | English | `english-language` or `language` |
| Self-Care & Daily Routine Experience | Self-Care | `self-care-daily-routine` |
| Sensory & Object Exploration | Sensory | `sensory-object-exploration` |
| PSED & Safety | PSED & Safety | `psed-safety` |
| Maths | Maths | `maths` |
| Graded Reading | Reading | `graded-reading` |
| World Exploration | World | `world-exploration` |
| Chinese Language | Chinese | `chinese-language` |
| Creative Expression | Art | `creative-expression` |
| Music, Rhythm & Movement | Music | `music-rhythm-movement` |
| Construction & Small-World Play | Construction | `construction-small-world-play` |
| Cooking & Food Exploration | Cooking | `cooking-food-exploration` |
| Pretend Play & Role-Play | Drama | `pretend-play-role-play` |
| Pretend Play & Role-Play Experience | Pretend Play | `pretend-play-role-play-experience` |
| Story & Puppet Experience | Story & Puppet | `story-puppet-experience` |
| Science Exploration | Science | `science-exploration` |
| Physical Education | PE | `physical-education` |
| Football | Football | `football` |
| Frisbee | Frisbee | `frisbee` |
| Basketball | Basketball | `basketball` |
| Tennis | Tennis | `tennis` |
| Volleyball | Volleyball | `volleyball` |
| Rope Skipping | Rope Skipping | `rope-skipping` |

Display-name rules:

- Use official names in Markdown source headings, curriculum documents, formal descriptions, and rules.
- Use UI short names where space is limited, especially dashboard rows, sidebars, pills, buttons, and mobile selectors.
- Do not replace official names inside source Markdown only because a UI short name exists.
- If a short name could be ambiguous in context, show both, for example `Music — Music, Rhythm & Movement`.

## 5. PG Course Lines

### EL — English Language

- English Language

### CC — Core Courses

- Self-Care & Daily Routine Experience
- Sensory & Object Exploration
- PSED & Safety

### CE — Creative Enrichment

- Pretend Play & Role-Play Experience
- Story & Puppet Experience
- Creative Expression
- Music, Rhythm & Movement
- Construction & Small-World Play

### PE — Physical Education

- Physical Education

## 6. PK Course Lines

### EL — English Language

- English Language

### CC — Core Courses

- Self-Care & Daily Routine Experience
- Sensory & Object Exploration
- PSED & Safety

### CE — Creative Enrichment

- Pretend Play & Role-Play Experience
- Story & Puppet Experience
- Creative Expression
- Music, Rhythm & Movement
- Construction & Small-World Play

### PE — Physical Education

- Physical Education

## 7. K1 Course Lines

### EL — English Language

- English Language

### CC — Core Courses

- Self-Care & Daily Routine Experience
- PSED & Safety
- Maths
- Graded Reading
- World Exploration

### CE — Creative Enrichment

- Creative Expression
- Music, Rhythm & Movement
- Construction & Small-World Play
- Cooking & Food Exploration
- Pretend Play & Role-Play
- Science Exploration

### PE — Physical Education

- Football
- Frisbee

## 8. K2 Course Lines

### EL — English Language

- English Language

### CC — Core Courses

- Maths
- Graded Reading
- World Exploration

### CE — Creative Enrichment

- Creative Expression
- Music, Rhythm & Movement
- Construction & Small-World Play
- Cooking & Food Exploration
- Pretend Play & Role-Play
- Science Exploration

### PE — Physical Education

- Basketball
- Tennis

## 9. K3 Course Lines

### EL — English Language

- English Language

### CC — Core Courses

- Maths
- Graded Reading
- World Exploration
- Chinese Language

### CE — Creative Enrichment

- Creative Expression
- Music, Rhythm & Movement
- Construction & Small-World Play
- Cooking & Food Exploration
- Pretend Play & Role-Play
- Science Exploration

### PE — Physical Education

- Volleyball
- Rope Skipping

## 10. Approved Naming Decisions

### English Language

Use:

```text
English Language
```

Do not use:

```text
English Learning
```

Reason: `English Language` is more precise as a curriculum course type and aligns with the existing Language page structure.

### Core Courses

Use:

```text
Core Courses
```

Reason: `Core Courses` works well as a course-type label and keeps the two-letter code `CC`.

### Creative Enrichment

Use:

```text
Creative Enrichment
```

Reason: This keeps the short code `CE` and covers the expandable creative / practical enrichment family.

### World Exploration

Use:

```text
World Exploration
```

Do not use:

```text
Explorer the world
World Exploring
Explore the World
```

Reason: `World Exploration` is stable, noun-based, and reads like a course line.

### Cooking & Food Exploration

Use:

```text
Cooking & Food Exploration
```

Do not use only:

```text
Cooking
```

Reason: The longer name better fits preschool curriculum, where food handling, sensory experience, safety, culture, and routine participation may all appear.

### Science Exploration

Use:

```text
Science Exploration
```

Do not use only:

```text
Science
```

Reason: The longer name is more developmentally appropriate and avoids making the course sound like a formal academic science class.

### Pretend Play & Role-Play

Use this shorter K-level name:

```text
Pretend Play & Role-Play
```

PG/PK may retain the fuller experience-based name:

```text
Pretend Play & Role-Play Experience
```

Reason: PG/PK course naming emphasizes experience and participation. K-level naming can be slightly more concise.

### Volleyball

Use:

```text
Volleyball
```

Do not use the misspelling:

```text
Vollyball
```

## 11. Folder and Slug Guidance

For future clean extraction and frontend routing, use lowercase kebab-case slugs.

The suggested slugs are listed in `Section 4. Course Line Display Name Catalog`.

Do not rename existing historical folders only to match these slugs during active production. Use this table for new clean extraction, frontend alias planning, and new source creation.

## 12. Maintenance Rule

If a new course line is added later:

1. Decide its top-level type: EL, CC, CE, or PE.
2. Add the official English name to this catalog.
3. Add its UI short name.
4. Add its suggested slug.
5. Update `curriculum_program_structure_v2.md` if the course affects the high-level structure.
6. Update `ACCEPTED_SOURCE_REGISTRY.md` if accepted source exists.
