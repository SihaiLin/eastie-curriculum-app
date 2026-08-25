# K1 Language Rules

**Status:** Review
**Reference Unit:** K1 Language Unit 1: Friends and Family
**Last Updated:** 2026-06-16

## 1. Scope

Use this document when generating or normalizing K1 language unit Markdown intended for the dynamic language page.

K1 follows the Power Up Starter (Level 0) structure. It differs from K2 in mini mission pattern, lesson count per week, and lesson field set.

## 2. Reference Implementation

Current dynamic reference:

```text
/curriculum/k1/language/unit-01
```

Current source directory:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/language_courses/unit_01_friends_and_family/
```

## 3. K1 Boundary

K1 (Power Up Starter) focuses on:

- first exposure to English
- understanding and saying single words
- simple questions and answers
- songs, stories, and movement
- social-emotional readiness

K1 pages should not require independent reading, writing, or full sentence production.

## 4. Unit Overview Expected Sections

K1 language unit overview should provide:

```text
Unit Outcomes
Language Summary
Power Up Mini Mission
4-Week Structure
Showcase
```

`Power Up Mini Mission` replaces the full `Power Up Mission` found in K2/K3. In Starter, the original mini mission only appears in L10.

## 5. Weekly / Lesson Expected Shape

K1 dynamic pages currently expect:

- **Week 1-2**: 3 Power Up lessons + 1 Media Extend + 1 Mini Mission
- **Week 3**: 3 Power Up lessons + 1 Media Extend + L10 Review (with Mini Mission field)
- **Week 4**: 5 Showcase lessons

Each Power Up lesson frame should include:

```text
Lesson Role
Source
Lesson Outcome
New Language
Recycled Language
```

L10 may additionally include:

```text
Mini Mission
```

Media Extend and Mini Mission entries use:

```text
Lesson Role
Status
```

## 6. Web Sync Status

```bash
npm run sync:k-language -- --level k1 --unit XX --title "Unit Name" --source-root /path/to/unit_dir
```

## 7. Before Adding Another K1 Language Unit

Confirm:

- source files match the expected section names;
- Unit Overview uses the five-section structure;
- lesson frames include all required fields;
- sync command or data file exists;
- route and curriculum home link are registered;
- build passes.

## 8. Related Resources

- K1 unit template: `06_curriculum_design/k1/language_courses/_unit_template/`
- Syllabus source: `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/starter/`
