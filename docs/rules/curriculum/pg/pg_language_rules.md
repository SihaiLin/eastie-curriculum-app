# PG Language Rules

**Status:** Review  
**Reference Unit:** PG Language Unit 6: Toys and Space  
**Last Updated:** 2026-06-16

## 1. Scope

Use this rule document when generating or normalizing PG language unit Markdown intended for the dynamic language page.

This document records the current operational standard. It does not replace the original PG/PK language syllabus philosophy or earlier locked source sections.

## 2. Reference Implementation

Current dynamic reference:

```text
/curriculum/pg/language/unit-06
```

Current source areas:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/unit_layer_design/
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/week_layer_design/
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/lesson_layer_design/
```

Current sync command:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run sync:pg-language-unit-06
```

## 3. PG Boundary

PG language focuses on:

- listening;
- physical response;
- routine participation;
- object handling;
- classroom participation;
- optional incidental imitation.

PG language pages must not require stable verbal output, independent full sentence production, phonics, writing, or worksheet-style task language unless a later PG language rule explicitly changes this boundary.

## 4. Unit Overview Expected Sections

PG language unit overview should provide:

```text
Unit Focus
YLE Support
Unit Outcomes
Not Yet
Unit Language
4-Week Progression Logic
```

`Unit Language` is the main place for visible language-list display.

`YLE Support`, `Not Yet`, and `4-Week Progression Logic` should read as prose, not as vocabulary-card lists.

## 5. Weekly / Lesson Expected Shape

PG language dynamic pages currently expect four weeks and five lessons per week.

Each lesson frame should include:

```text
Lesson Title
Source Mini Progression Step
Lesson Outcome
New Language
Recycled Language
Baseline Child Response
Incidental Imitation / Optional Exposure
Suggested Activity / Game
```

The sync script validates these fields for Unit 6.

## 6. Web Sync Status

The sync script is now generalized:

```bash
npm run sync:language -- --level pg --unit 06 --title "Toys and Space" --source-root <workspace_root> --unit-slug toys_and_space
```

The script expects canonical overview sections (Unit Focus, YLE Support, Unit Outcomes, Unit Language, Not Yet, 4-Week Progression Logic) and validates 8 lesson fields per frame. No fallback parser paths are supported.

## 7. Before Adding Another PG Language Unit

Confirm:

- source files match the expected section names;
- Unit Overview uses the current six-section structure;
- lesson frames include all required fields;
- PG verbal output boundaries are protected;
- sync script or data file exists;
- route and curriculum home link are registered;
- build passes.

