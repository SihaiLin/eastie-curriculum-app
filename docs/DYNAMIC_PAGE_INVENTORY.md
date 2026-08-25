# EASTIE Dynamic Page Inventory

**Status:** Active project inventory  
**Last Updated:** 2026-08-17

This file lists curriculum pages that have been converted from static/reference output into the dynamic React app.

Use this file to answer:

- which curriculum pages are available in the local web app;
- which source files feed each page;
- which sync command or data file controls each page;
- whether a page is already registered through the shared dynamic unit manifest.

## Current Dynamic Routes

Program classification note:

- This inventory still lists current live routes.
- Routes containing `/non-language/` are compatibility routes from the earlier structure.
- Under Curriculum Program Structure v2, PG/PK current non-language maps to `Core`.
- K Math and K Graded Reading map to `Core`.
- K Art and future Art / Music / LEGO / Construction / Cooking / Drama / Science / Rhythm lines map to `CEC`.
- PE has no active dynamic route yet.
- Do not remove or rename existing `/non-language/` routes until a web compatibility plan is implemented.

| Level | Track | Unit | Route | Status | Renderer | Data Source | Alignment |
|---|---:|---|---:|---|---|---|
| PG | Non-Language | 1 | `/curriculum/pg/non-language/unit-01` | Active prototype | `UnitPage` non-language renderer | `pgUnit01NonLanguageUnit01.ts` + generated Markdown | Aligned |
| PG | Non-Language | 2 | `/curriculum/pg/non-language/unit-02` | Active prototype | `UnitPage` non-language renderer | `pgUnit02NonLanguageUnit02.ts` + generated Markdown | Aligned |
| PG | Non-Language | 3 | `/curriculum/pg/non-language/unit-03` | Active prototype | `UnitPage` non-language renderer | `pgUnit03NonLanguageUnit03.ts` + generated Markdown | Aligned |
| PG | Non-Language | 4 | `/curriculum/pg/non-language/unit-04` | Active prototype | `UnitPage` non-language renderer | `pgUnit04NonLanguageUnit04.ts` + generated Markdown | Aligned |
| PG | Non-Language | 5 | `/curriculum/pg/non-language/unit-05` | Active prototype | `UnitPage` non-language renderer | `pgUnit05NonLanguageUnit05.ts` + generated Markdown | Aligned |
| PG | Non-Language | 6 | `/curriculum/pg/non-language/unit-06` | Active prototype | `UnitPage` non-language renderer | `pgUnit06NonLanguageUnit06.ts` + generated Markdown | Aligned |
| PG | Non-Language | 7 | `/curriculum/pg/non-language/unit-07` | Active prototype | `UnitPage` non-language renderer | `pgUnit07NonLanguageUnit07.ts` + generated Markdown | Aligned |
| PG | Non-Language | 8 | `/curriculum/pg/non-language/unit-08` | Active reference | `UnitPage` non-language renderer | `pgUnit08NonLanguageUnit08.ts` + generated Markdown | Aligned |
| PG | Non-Language | 9 | `/curriculum/pg/non-language/unit-09` | Active prototype | `UnitPage` non-language renderer | `pgUnit09NonLanguageUnit09.ts` + generated Markdown | Aligned |
| PK | Non-Language | 1 | `/curriculum/pk/non-language/unit-01` | Active prototype | `UnitPage` non-language renderer | `pkUnit01NonLanguageUnit01.ts` + generated Markdown | Aligned |
| PK | Non-Language | 2 | `/curriculum/pk/non-language/unit-02` | Active prototype | `UnitPage` non-language renderer | `pkUnit02NonLanguageUnit02.ts` + generated Markdown | Aligned |
| PK | Non-Language | 3 | `/curriculum/pk/non-language/unit-03` | Active prototype | `UnitPage` non-language renderer | `pkUnit03NonLanguageUnit03.ts` + generated Markdown | Aligned |
| PK | Non-Language | 4 | `/curriculum/pk/non-language/unit-04` | Active prototype | `UnitPage` non-language renderer | `pkUnit04NonLanguageUnit04.ts` + generated Markdown | Aligned |
| PK | Non-Language | 5 | `/curriculum/pk/non-language/unit-05` | Active prototype | `UnitPage` non-language renderer | `pkUnit05NonLanguageUnit05.ts` + generated Markdown | Aligned |
| PK | Non-Language | 6 | `/curriculum/pk/non-language/unit-06` | Active prototype | `UnitPage` non-language renderer | `pkUnit06NonLanguageUnit06.ts` + generated Markdown | Aligned |
| PK | Non-Language | 7 | `/curriculum/pk/non-language/unit-07` | Active prototype | `UnitPage` non-language renderer | `pkUnit07NonLanguageUnit07.ts` + generated Markdown | Aligned |
| PK | Non-Language | 8 | `/curriculum/pk/non-language/unit-08` | Active reference | `UnitPage` non-language renderer | `pkUnit08NonLanguageUnit08.ts` + generated Markdown | Aligned |
| PK | Non-Language | 9 | `/curriculum/pk/non-language/unit-09` | Active prototype | `UnitPage` non-language renderer | `pkUnit09NonLanguageUnit09.ts` + generated Markdown | Aligned |
| PG | Language | Hello + 1-9 | `/curriculum/pg/language/unit-uh` ... `/curriculum/pg/language/unit-09` | Active prototype | `LanguageUnitPage` | `pgLanguageUnit00.ts` ... `pgLanguageUnit09.ts` generated snapshots | Web aligned; newer source-directory consolidation still needed beyond Unit 6 |
| PK | Language | Hello + 1-9 | `/curriculum/pk/language/unit-uh` ... `/curriculum/pk/language/unit-09` | Active prototype | `LanguageUnitPage` | `pkLanguageUnit00.ts` ... `pkLanguageUnit09.ts` generated snapshots | Web aligned; newer source-directory consolidation still needed beyond Unit 6 |
| K1 | Language | Hello + 1-9 | `/curriculum/k1/language/unit-uh` ... `/curriculum/k1/language/unit-09` | Active prototype | `KLanguageUnitPage` | `k1LanguageUnit00.ts` ... `k1LanguageUnit09.ts` generated from markdown | Aligned |
| K2 | Language | Hello + 1-9 | `/curriculum/k2/language/unit-uh` ... `/curriculum/k2/language/unit-09` | Active prototype | `KLanguageUnitPage` | `k2LanguageUnit00.ts` ... `k2LanguageUnit09.ts` generated from markdown + Power Up public resource manifest | Aligned |
| K3 | Language | Hello + 1-9 | `/curriculum/k3/language/unit-uh` ... `/curriculum/k3/language/unit-09` | Active prototype | `KLanguageUnitPage` | `k3LanguageUnit00.ts` ... `k3LanguageUnit09.ts` generated from markdown + Power Up public resource manifest | Aligned |
| K1 | Non-Language | 1-9 | `/curriculum/k1/non-language/unit-01` ... `/curriculum/k1/non-language/unit-09` | Active prototype | `GradedReadingUnitPage` shared K non-language renderer | `kMathUnits.ts` + `kGradedReadingUnits.ts` generated data | Partial alignment, assembly not complete |
| K2 | Non-Language | 1-9 | `/curriculum/k2/non-language/unit-01` ... `/curriculum/k2/non-language/unit-09` | Active prototype | `GradedReadingUnitPage` shared K non-language renderer | `kMathUnits.ts` + `kGradedReadingUnits.ts` generated data | Partial alignment, assembly not complete |
| K3 | Non-Language | 1-9 | `/curriculum/k3/non-language/unit-01` ... `/curriculum/k3/non-language/unit-09` | Active prototype | `GradedReadingUnitPage` shared K non-language renderer | `kMathUnits.ts` + `kGradedReadingUnits.ts` generated data | Partial alignment, assembly not complete |

## Source Workspaces

Curriculum source and reviewed Markdown remain in:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

Dynamic web implementation lives in:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web/
```

Do not copy old static HTML into `web/public/` as production content.

Future clean extraction should classify sources by:

```text
Language
Core
CEC
PE
```

During the active transition, use `ACCEPTED_SOURCE_REGISTRY.md` to see both the current track label and the future category.

PG/PK language note:

- the web app has generated and registered PG/PK language snapshots for Unit Hello + Units 1-9;
- the newer historical source pattern `06_curriculum_design/<level>/language_courses/` currently only contains PG/PK Unit 6;
- treat this as a source-consolidation task, not as a missing-page task.

## Sync Commands

Run these from:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
```

| Page | Command |
|---|---|---|
| PG/PK Core through legacy non-language renderer (any unit) | `npm run sync:non-language -- --level pg|pk --unit XX --source-root <path>` |
| PG/PK Language (any unit) | `npm run sync:language -- --level pg|pk --unit XX --title "Name" --source-root <workspace> --unit-slug <slug>` |
| K-Language (any unit) | `node scripts/sync-k-language-unit.mjs --level k1|k2|k3 --unit XX --title "Name" --source-root <unit_dir>` |
| K Core Math (Units 1-9, currently legacy non-language route) | `npm run sync:math:k-units` |
| K Core Graded Reading (Units 1-9, currently legacy non-language route) | `npm run sync:graded-reading:k-units` |

After any sync, run:

```bash
npm run build
```

## Manifest Status

All current dynamic units are now registered through:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts
```

This manifest is now the shared entry point for:

- route lookup;
- curriculum home active links;
- unit renderer selection.

New dynamic units should be added to the manifest rather than handled through one-off route branches in `UnitPage.tsx`.

## Expansion Readiness

### Ready To Expand With Current Rules

- PG Core Units 1-7: ready to start one controlled unit at a time through the legacy non-language renderer.
- PK Core Units 1-7: ready to start one controlled unit at a time through the legacy non-language renderer.
- K Core Math Units 1-9: dynamically active across K1/K2/K3.
- K Core Graded Reading Units 1-9: dynamically active across K1/K2/K3.

### Sync Scripts Now Generalized

All three tracks now have generalized sync scripts:

- PG/PK Core legacy renderer: `sync-non-language-unit.mjs` (level + unit + source-root)
- Language (PG/PK): `sync-language-unit.mjs` (level + unit + source-root + slug, canonical sections only)
- K-Language: `sync-k-language-unit.mjs` (level + unit + source-root, K2 template)

Old unit-specific scripts (`sync-pg-unit-08-markdown.mjs`, `sync-pk-unit-08-markdown.mjs`, `sync-pg-language-unit-06-markdown.mjs`, `sync-pk-language-unit-06-markdown.mjs`) are deprecated.

### K1/K3 Now Active

All three K-level language units (K1, K2, K3) are now active. See `K_LANGUAGE_RESOURCE_CONVENTIONS.md` for level-specific rules on:
- PDF naming (`Starters`/`Level1`/`Level2` prefixes)
- Lesson roles per level
- Audio naming conventions
- Mission vs Mini Mission handling

### Template Coverage Improved

The following source-template directories now exist and support future expansion:

- `06_curriculum_design/pk/non_language_courses/_unit_template/`
- `06_curriculum_design/pg/language_courses/_unit_template/`
- `06_curriculum_design/pk/language_courses/_unit_template/`
- `06_curriculum_design/k1/language_courses/_unit_template/`
- `06_curriculum_design/k3/language_courses/_unit_template/`

This means the clearest fully blank template gaps are now concentrated in:

- K2 Core / CEC assembly
- K3 Core / CEC assembly

K1/K2/K3 Core are no longer fully blank at the dynamic-page level because Math and Graded Reading both now render across Units 1-9.

However, they still do not yet have:

- a fully assembled multi-track K Core / CEC reference unit;
- a locked graded-reading canonical data contract;
- a mature cross-track unit navigation/story for fuller K Core / CEC delivery.

### Newer Resource Integration Note

K1/K2/K3 Language Unit 1 now also has manifest-backed Power Up resource support for lesson-level Source cards.

Current public manifest entry point:

`/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/`

This is currently strongest for Unit 1 and should be treated as the reference path for future Power Up public resource-package work.

## Verification Checklist

For each dynamic page:

- Route opens after login.
- The correct top navigation style appears.
- Curriculum source is not copied as static HTML.
- Feedback button appears where expected.
- Resource links do not use `file://`.
- Build passes.
- The page is listed in this inventory.

For the latest alignment judgment and notes, read:

`/Users/Lucia/Desktop/eastie_curriculum_project/docs/content_page_alignment_audit_2026_06_24.md`
