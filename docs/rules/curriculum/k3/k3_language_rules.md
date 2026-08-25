# K3 Language Rules

**Status:** Review
**Reference Unit:** K3 Language Unit 1: A Day on the Farm
**Last Updated:** 2026-06-16

## 1. Scope

Use this document when generating or normalizing K3 language unit Markdown intended for the dynamic language page.

K3 follows the Power Up Level 2 structure. It shares the same lesson layout as K2 (12 Power Up lessons + 3 Mission Extends + Showcase Week) but with Level 2 content demands.

## 2. Reference Implementation

Current dynamic reference:

```text
/curriculum/k3/language/unit-01
```

Current source directory:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k3/language_courses/unit_01_a_day_on_the_farm/
```

## 3. K3 Boundary

K3 (Power Up Level 2) focuses on:

- expanded vocabulary and structures
- present continuous and present simple
- longer stories and reading comprehension
- writing short sentences
- cross-curricular connections

## 4. Unit Overview Expected Sections

```text
Unit Outcomes
Language Summary
Power Up Mission
4-Week Structure
Showcase
```

## 5. Weekly / Lesson Expected Shape

K3 follows the same structure as K2: 4 weeks, 5 lessons per week.

- **Week 1-3**: 4 Power Up lessons + 1 Mission Extend
- **Week 4**: 5 Showcase lessons

Each Power Up lesson frame should include:

```text
Lesson Role
Source
Lesson Outcome
New Language
Recycled Language
```

Lessons with a Mission Stage may also include an optional `Mission` field.

Mission Extend entries use:

```text
Lesson Role
Status
```

## 6. Web Sync Status

```bash
npm run sync:k-language -- --level k3 --unit XX --title "Unit Name" --source-root /path/to/unit_dir
```

## 7. Before Adding Another K3 Language Unit

Confirm:

- source files match the expected section names;
- Unit Overview uses the five-section structure;
- lesson frames include all required fields;
- sync command or data file exists;
- route and curriculum home link are registered;
- build passes.

## 8. Related Resources

- K3 unit template: `06_curriculum_design/k3/language_courses/_unit_template/`
