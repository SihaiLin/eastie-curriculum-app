# Dynamic Curriculum Page Handoff Rules

**Status:** Review  
**Applies To:** Adding new curriculum units to the React web app  
**Last Updated:** 2026-06-16

## 1. Purpose

This document defines the minimum handoff requirements before a reviewed curriculum unit is added to the dynamic frontend.

It does not define curriculum content structure. Level/course-specific content rules live under:

```text
docs/rules/curriculum/
```

## 2. Required Inputs

Before web integration, the content session should provide:

- level: `PG`, `PK`, `K1`, `K2`, or `K3`;
- track: `language` or `non-language`;
- unit number and unit slug;
- source folder path;
- English source file list;
- Chinese translation file list, if bilingual display is required;
- rule document used;
- reference implementation, if any;
- known rendering exceptions.

## 3. Source Requirements

Do not integrate from:

- Downloads;
- old static HTML only;
- unreviewed translations;
- archive folders;
- rejected versions;
- one-off pasted text without source files.

The source must live in the historical curriculum workspace or the future clean content workspace.

Current historical workspace:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

## 4. Dynamic Data Requirements

Each new dynamic unit should have one of these:

1. A sync script that reads reviewed Markdown and writes generated TypeScript/JSON.
2. A hand-authored structured data file, only for an early prototype or when no parser exists yet.

Generated files must include a header such as:

```text
Generated from reviewed Markdown source files.
Do not edit curriculum wording here; regenerate from source instead.
```

## 5. Route Requirements

Use route format:

```text
/curriculum/[level]/[courseType]/unit-XX
```

Examples:

```text
/curriculum/pg/non-language/unit-08
/curriculum/pk/language/unit-06
/curriculum/k2/language/unit-01
```

Avoid adding many one-off route branches. If multiple units share a structure, use a registry or manifest.

## 6. Navigation Requirements

The unit must be listed on the curriculum home page.

Available units should have active links. Unavailable units should remain inactive or show coming-later state, not broken links.

Top navigation must follow the course family:

- PG/PK non-language: bilingual display with EN / 中文 toggle.
- PG/PK language: language-course navigation pattern.
- K1/K2/K3 language: Home + UH/U1-U8 unit navigation, no EN / 中文 toggle unless a bilingual page standard is explicitly approved.

## 7. Resource Link Requirements

Resource links must follow:

```text
/curriculum-resources/...
```

Do not use:

```text
file:///...
```

Read:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/curriculum_resource_proxy_rules.md
```

## 8. Validation Requirements

For every new unit integration:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run build
```

Then verify:

- route opens after login;
- navigation is correct;
- data renders from structured source, not copied static HTML;
- feedback UI still appears if expected;
- resource links work or are clearly marked unavailable;
- existing dynamic reference pages still open.

## 9. Inventory Requirement

After a new dynamic page is added, update:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md
```

If a new rule or special integration note is created, update:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
```

