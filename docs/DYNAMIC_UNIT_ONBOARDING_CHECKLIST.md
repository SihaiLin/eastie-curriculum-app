# EASTIE Dynamic Unit Onboarding Checklist

**Status:** Active implementation checklist  
**Last Updated:** 2026-06-16

This file is the execution checklist for adding a new curriculum unit to the dynamic web app.

Use it after the curriculum content for a unit has already been reviewed and its MD or structured source is considered ready for web integration.

This checklist is intentionally practical. It does not replace curriculum writing rules or renderer-specific notes.

## 1. Read First

Before onboarding a new dynamic unit, read:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/dynamic_curriculum_page_handoff_rules.md`
- the relevant level/course rule document under:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/`

If the unit is a K-language unit, also read:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_RESOURCE_CONVENTIONS.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_EXTRACTION_DATA_INVENTORY.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k_language_ruleset_handoff.md`

## 2. Confirm Source Readiness

Before touching the web app, confirm:

- the unit has a clearly identified level, track, unit number, and slug;
- the English source files are complete enough for rendering;
- the Chinese translation files exist if bilingual display is required;
- the content source is not still sitting only in Downloads;
- the content source is not only a static HTML export unless the task is a temporary structural analysis step;
- the correct rule document exists and is registered in `RULES_INDEX.md`.

For K-language units, also confirm:

- the preferred extraction source version is known;
- the unit follows the correct K1 / K2 / K3 overview and week-file structure;
- PDF/audio naming expectations have been checked against the current shared conventions.

If any of the above is missing, stop and fix the source side first.

## 3. Identify the Integration Type

Choose one path:

### Path A: Sync-from-Markdown

Use this when the unit has stable Markdown source and the page structure is already understood.

Expected outputs:

- sync script under:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/`
- generated snapshot under:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/`
- manifest entry in:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`

### Path B: Hand-Authored Structured Data

Use this only when:

- the page structure is new;
- the parser/import contract is not mature yet;
- the unit is a controlled prototype reference.

Expected output:

- data file under:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/data/`

If using this path, document why the unit is not yet sync-driven.

## 4. Naming Conventions

Use predictable names.

### Sync scripts

```text
sync-[level]-[track]-unit-XX-markdown.mjs
```

Examples:

```text
sync-pg-unit-08-markdown.mjs
sync-pk-unit-08-markdown.mjs
sync-pg-language-unit-06-markdown.mjs
```

### Generated files

Examples:

```text
pgUnit08Markdown.ts
pkUnit08Markdown.ts
pgLanguageUnit06.ts
pkLanguageUnit06.ts
```

### Hand-authored data files

Examples:

```text
pgNonLanguageUnit08.ts
pkNonLanguageUnit08.ts
k2LanguageUnit01.ts
```

## 5. Create or Update the Data Integration

Do one of the following:

### For sync-driven units

1. Create the sync script.
2. Validate required headings/fields.
3. Write the generated snapshot file.
4. Add or update an npm script in:
   `/Users/Lucia/Desktop/eastie_curriculum_project/web/package.json`

### For hand-authored units

1. Create the data file.
2. Keep the structure aligned with the chosen renderer.
3. Add comments or nearby notes only if the import method is temporary.

Generated curriculum wording should never be edited manually after sync.

## 6. Register the Unit in the Manifest

Add the new unit to:

`/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`

Each manifest entry should define:

- level;
- courseType;
- unitNumber;
- path;
- label;
- renderer;
- status;
- unit data reference.

The manifest is now the shared source for:

- route lookup;
- curriculum home active links;
- renderer selection.

Do not add a new one-off special case in `UnitPage.tsx` unless there is a serious blocker.

## 7. Update Curriculum Home

Confirm the new unit now appears as an active link on:

`/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/CurriculumHome.tsx`

The home page should discover the unit through the manifest, not through hard-coded per-unit link branches.

## 8. Resource Links

If the unit has PDF/audio/image resources:

- do not use `file://`;
- use `/curriculum-resources/...`;
- confirm resource paths are relative to the intended curriculum resource root;
- read:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/curriculum_resource_proxy_rules.md`

## 9. Validation

Run:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run build
```

Then verify:

- the new route opens after login;
- the top navigation style is correct for that course family;
- the page does not render as copied static HTML;
- the feedback button still works where expected;
- the source/resource links behave correctly;
- existing dynamic units still open.

At minimum, re-check these reference routes after onboarding a new unit:

- `/curriculum/pg/non-language/unit-08`
- `/curriculum/pk/non-language/unit-08`
- `/curriculum/pg/language/unit-06`
- `/curriculum/pk/language/unit-06`
- `/curriculum/k2/language/unit-01`

## 10. Documentation Updates

After the new unit is working:

1. Update:
   `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`
2. Update:
   `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
   if a new rule or note was created
3. Update relevant PM/project-memory files if the new unit changes the overall project status

## 11. Completion Standard

A dynamic unit should be considered properly onboarded only when all of the following are true:

- source readiness confirmed;
- sync/data integration created;
- manifest updated;
- home link active;
- build passed;
- route verified;
- inventory updated;
- relevant rules registered.
