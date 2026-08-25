# K-Language Ruleset Handoff

**Status:** Active process note  
**Last Updated:** 2026-06-17

This note explains how the main K-language documents work together.

Use it when a session needs to:

- create a new K1 / K2 / K3 language unit;
- review K-language source readiness;
- decide which document to read first;
- hand off K-language work to another session or agent.

## 1. The Three Main Document Types

### A. Level Rule Document

Examples:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k1/k1_language_rules.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k2/k2_language_rules.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k3/k3_language_rules.md`

Use these when you need to know:

- the page model for that level;
- the lesson field expectations;
- the route and data-file reference implementation;
- the sync command pattern;
- the level-specific boundary before adding a new unit.

### B. Shared Resource Convention Document

Main document:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_RESOURCE_CONVENTIONS.md`

Use this when you need to know:

- PDF naming conventions;
- audio naming conventions;
- overview / week-file structural expectations;
- lesson-role tables;
- formatting rules enforced by the sync pipeline.

### C. Extraction Data Inventory

Main document:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_EXTRACTION_DATA_INVENTORY.md`

Use this when you need to know:

- where K1 / K2 / K3 extraction assets live;
- which `jsonl` / extraction versions are available;
- which version is the preferred working reference;
- which source / review / notes folders support authoring decisions.

## 2. Recommended Reading Order

When starting a new K-language unit:

1. Read `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
2. Read the level rule document (`k1_language_rules.md`, `k2_language_rules.md`, or `k3_language_rules.md`)
3. Read `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_RESOURCE_CONVENTIONS.md`
4. Read `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_EXTRACTION_DATA_INVENTORY.md`
5. Then open the actual source unit folder and begin authoring or sync work

## 3. What Goes Where

If you create or revise a document about:

- **level-specific unit structure or authoring rules**  
  put it under:
  `docs/rules/curriculum/k1/`, `k2/`, or `k3/`

- **shared K-language PDF/audio/section/sync conventions**  
  put it near:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_RESOURCE_CONVENTIONS.md`

- **extraction data locations, versions, and preferred source snapshots**  
  put it near:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_EXTRACTION_DATA_INVENTORY.md`

- **handoff or workflow notes across multiple K-language levels**  
  put it under:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/`

## 4. What Not To Do

Do not:

- hide K-language rules only inside chat summaries;
- treat extraction JSONL files as direct frontend runtime content;
- put new rule documents in unit source folders without also registering them in the rule center;
- update K-language sync behavior without checking both the level rule document and the shared resource convention document.

## 5. Registration Rule

If you add a new K-language rule or process document:

1. save it in the correct rule-center location;
2. register it in `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`;
3. if it changes onboarding expectations, update:
   `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_UNIT_ONBOARDING_CHECKLIST.md`
