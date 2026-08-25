# K-Language Extraction Data Inventory

**Status:** Active reference  
**Last Updated:** 2026-06-17

This document records the current manual-extraction and language-skeleton data assets for K-language curriculum work.

Use this file to answer:

- where K1 / K2 / K3 extraction data lives;
- which Power Up level each EASTIE grade maps to;
- which JSONL files are available now;
- which files are the preferred working references for new unit expansion;
- which files are source-analysis assets rather than direct web runtime content.

This is an inventory and source map. It does not replace level-specific curriculum rules or frontend sync rules.

## 1. Level Mapping

| EASTIE Grade | Power Up Level | Workspace Folder |
|---|---|---|
| K1 | Starter | `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/starter/` |
| K2 | Level 1 | `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_1/` |
| K3 | Level 2 | `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_2/` |

## 2. How To Read This Inventory

- `language_items` files are extracted language summaries.
- `language_skeleton` files are structured lesson-by-lesson skeleton assets used to support curriculum MD drafting and dynamic-page construction.
- `outcomes` and `differentiation` files are supporting analysis assets where available.
- These files are **source analysis assets**, not production web data files.
- Dynamic web pages should still be generated through the approved sync pipeline, not by pointing the frontend directly at these JSONL files.

## 3. K1 (Starter) Data Assets

**Root folder:**

```text
/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/starter/data/
```

### Available files

- `language_items.jsonl`
- `language_items.previous.jsonl`
- `outcomes.jsonl`
- `differentiation_items_starter_v0.1.jsonl`

### Recommended current references

- Primary language summary reference:
  `language_items.jsonl`
- Outcomes reference:
  `outcomes.jsonl`
- Differentiation reference:
  `differentiation_items_starter_v0.1.jsonl`

### Notes

- K1 currently does **not** use the same `language_skeleton_level_X_v0.X.jsonl` pattern as K2/K3.
- When building or reviewing K1 units, treat `language_items.jsonl` and `outcomes.jsonl` as the main extraction summaries, then follow the K1-specific Markdown and dynamic-page rules for the actual unit source files.

## 4. K2 (Level 1) Data Assets

**Root folder:**

```text
/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_1/data/
```

### Available files

- `language_items_level_1_v0.1.jsonl`
- `language_items_level_1_v0.2.jsonl`
- `language_items_level_1_v0.3.jsonl`
- `language_skeleton_level_1_v0.1.jsonl`
- `language_skeleton_level_1_v0.2.jsonl`
- `language_skeleton_level_1_v0.3.jsonl`
- `language_skeleton_level_1_excluded_duplicates_v0.1.jsonl`
- `language_skeleton_raw_level_1_v0.1.jsonl`
- `unit_1_recommended_extraction_sample_v0.1.jsonl`

### Recommended current references

- Primary language items reference:
  `language_items_level_1_v0.3.jsonl`
- Primary language skeleton reference:
  `language_skeleton_level_1_v0.3.jsonl`
- Historical/raw troubleshooting references:
  `language_skeleton_raw_level_1_v0.1.jsonl`
  `language_skeleton_level_1_excluded_duplicates_v0.1.jsonl`
- Unit 1 sampling reference:
  `unit_1_recommended_extraction_sample_v0.1.jsonl`

### Notes

- For new K2 unit expansion, prefer the `v0.3` language-items and language-skeleton files unless a later reviewed version is explicitly introduced.
- Raw and excluded-duplicates files are useful for audit and debugging, but they are not the default source for authoring new unit Markdown.

## 5. K3 (Level 2) Data Assets

**Root folder:**

```text
/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_2/data/
```

### Available files

- `language_items_level_2_v0.1.jsonl`
- `language_items_level_2_v0.2.jsonl`
- `language_items_level_2_v0.3.jsonl`
- `language_skeleton_level_2_v0.1.jsonl`
- `language_skeleton_level_2_v0.2.jsonl`
- `language_skeleton_level_2_v0.3.jsonl`

### Recommended current references

- Primary language items reference:
  `language_items_level_2_v0.3.jsonl`
- Primary language skeleton reference:
  `language_skeleton_level_2_v0.3.jsonl`

### Notes

- K3 currently follows the cleaner K2/K3 pattern: language-items plus language-skeleton files with versioned snapshots.
- For new K3 unit expansion, use `v0.3` as the default reviewed reference unless a newer reviewed version replaces it.

## 6. Related Source / Review Folders

These folders are often useful when the JSONL alone is not enough:

### K1

- Source extracted markdown:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/starter/source/teachers_book_extracted_md/`
- Review outputs:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/starter/review/`
- Notes:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/starter/notes/`

### K2

- Source extracted markdown:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_1/source/teachers_book_extracted_md/`
- Review outputs:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_1/review/`
- Notes:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_1/notes/`

### K3

- Source extracted markdown:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_2/source/teachers_book_extracted_md/`
- Review outputs:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_2/review/`

## 7. What This Inventory Does Not Do

This file does not:

- define the K-language Markdown structure;
- define web rendering contracts;
- replace lesson-role rules;
- replace PDF / audio naming conventions;
- decide curriculum pedagogy.

For those, read:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_RESOURCE_CONVENTIONS.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
- the relevant level-specific curriculum rule document once it has been registered in the rule center.

## 8. Maintenance Rule

When a new reviewed extraction version becomes the preferred working reference:

1. update this inventory;
2. keep older versions listed if they still matter for audit/history;
3. note the new preferred version in the relevant K-language rule or handoff document if it changes downstream workflow.
