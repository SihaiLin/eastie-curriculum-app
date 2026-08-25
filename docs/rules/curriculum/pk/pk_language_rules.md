# PK Language Rules

**Status:** Review  
**Reference Unit:** PK Language Unit 6: Toys and Space  
**Last Updated:** 2026-06-16

## 1. Scope

Use this rule document when generating or normalizing PK language unit Markdown intended for the dynamic language page.

This document records the current operational standard. It does not replace the original PG/PK language syllabus philosophy or earlier locked source sections.

## 2. Reference Implementation

Current dynamic reference:

```text
/curriculum/pk/language/unit-06
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
npm run sync:pk-language-unit-06
```

## 3. PK Boundary

PK language focuses on:

- stable comprehension;
- action response;
- single words;
- short chunks;
- supported output;
- readiness-based optional challenge.

PK full sentence models may appear as optional or readiness-based extension, but should not become a uniform mastery target.

## 4. Unit Overview Expected Sections

PK language unit overview should provide:

```text
Core Focus
YLE Support
Unit Outcomes
Not Yet
Core Vocabulary
4-Week Progression Logic
```

Vocabulary groups should be clear and structured. Optional exposure should not be promoted into required output.

## 5. Weekly / Lesson Expected Shape

PK language dynamic pages currently expect four weeks and five lessons per week.

Each lesson frame should include:

```text
Lesson Title
Source Mini Progression Step
Lesson Outcome
New Language
Recycled Language
Baseline Child Response
Baseline Output Opportunity
Optional Challenge
Suggested Activity / Game
```

The sync script validates these fields for Unit 6.

## 6. Web Sync Status

The sync script is now generalized:

```bash
npm run sync:language -- --level pk --unit 06 --title "Toys and Space" --source-root <workspace_root> --unit-slug toys_and_space
```

The script expects canonical overview sections (Core Focus, YLE Support, Unit Outcomes, Not Yet, Core Vocabulary, 4-Week Progression Logic) and validates 9 lesson fields per frame (includes Baseline Output Opportunity and Optional Challenge).

## 7. Before Adding Another PK Language Unit

Confirm:

- source files match the expected section names;
- Unit Overview uses the current six-section structure;
- lesson frames include all required fields;
- Optional Challenge remains optional;
- sync script or data file exists;
- route and curriculum home link are registered;
- build passes.

