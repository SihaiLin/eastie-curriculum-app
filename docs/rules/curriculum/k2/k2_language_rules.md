# K2 Language Rules

**Status:** Review  
**Reference Unit:** K2 Language Unit 1: Our New School  
**Last Updated:** 2026-06-16

## 1. Scope

Use this document when preparing K2 language content for the dynamic web app.

K2 language follows the Power Up Level 1 structure and should not be forced into PG/PK language or PG/PK non-language structures.

K1/K2/K3 are expected to share a broadly similar language structure, but this document is K2-specific until K1/K2/K3 shared rules are explicitly locked.

## 2. Reference Implementation

Current route:

```text
/curriculum/k2/language/unit-01
```

Current data file:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/data/k2LanguageUnit01.ts
```

Reference source files:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/unit_01_our_new_school/
```

## 3. Page Model

K2 language pages currently use:

- Unit Overview;
- week groups;
- Power Up lesson sequence;
- Mission Extend / Showcase placeholders;
- lesson detail fields;
- source references;
- extension tools for teacher-added vocabulary, sentences, and activity ideas.

K2 language pages are currently English-only teacher-review pages.

## 4. Top Navigation Rule

K2 language uses:

```text
Home
UH
U1
U2
U3
U4
U5
U6
U7
U8
```

For K2 Unit 1, `U1` is active.

K2 language pages should not show the EN / 中文 toggle unless bilingual K-language display is later approved.

## 5. Lesson Field Pattern

Current K2 Unit 1 fields include:

```text
Lesson Role
Source
Lesson Outcome
New Language
Recycled Language
Mission
Status
```

Some lessons are original Power Up lessons. Some are EASTIE-added placeholders such as Mission Extend or Showcase lessons.

## 6. Resource Rule

Resource links must use:

```text
/curriculum-resources/...
```

Do not use local `file://` links.

Read:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/curriculum_resource_proxy_rules.md
```

## 7. Web Sync Status

K2 Language is now sync-driven from Markdown source:

```bash
npm run sync:k-language -- --level k2 --unit 01 --title "Our New School" --source-root /path/to/unit_dir
```

Source files follow the template at:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/_unit_template/
```

The script expects canonical overview sections (Unit Outcomes, Language Summary, Power Up Mission, 4-Week Structure, Showcase) and validates lesson fields per type (5 fields for regular Power Up lessons, 2 for Mission Extend / Showcase).

## 8. Related Note

Read the detailed dynamic page note:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k2/k2_language_dynamic_page_notes.md
```

