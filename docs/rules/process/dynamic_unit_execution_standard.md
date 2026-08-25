# Dynamic Unit Execution Standard

**Status:** Active process rule  
**Last Updated:** 2026-06-24

This document defines the standard execution flow for adding a new curriculum unit to the dynamic EASTIE app.

Use it when a session is responsible for moving a reviewed curriculum unit from source Markdown into the dynamic web project.

This is the project-level standard action sequence.  
For detailed validation items, also read:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_UNIT_ONBOARDING_CHECKLIST.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`

## 1. Purpose

The goal is to make new unit onboarding repeatable.

Adding a new unit should no longer be treated as an improvised engineering task. It should follow a stable, documented flow.

## 2. Standard Action Sequence

Every new dynamic curriculum unit should follow this order:

1. Confirm source readiness
2. Confirm the correct rule documents
3. Normalize or generate the source Markdown if needed
4. Run the appropriate sync / integration path
5. Register the unit in the manifest
6. Build and validate the route
7. Update project documentation

Do not skip the documentation step.

## 3. Required Steps

### Step 1: Confirm source readiness

Before touching the web app, confirm:

- the source unit belongs to a known level and track;
- the source files are no longer just sitting in Downloads;
- the unit has a stable slug / number / title;
- the Markdown structure matches the expected rule set;
- bilingual requirements are clear;
- the source is reviewed enough for app use.

### Step 2: Confirm the correct rule documents

Read:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
- the relevant curriculum rule document
- the relevant web/process rules

If the unit is K-language, also read:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_RESOURCE_CONVENTIONS.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_EXTRACTION_DATA_INVENTORY.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k_language_ruleset_handoff.md`

### Step 3: Normalize or generate source Markdown if needed

If the source is not yet in the expected structure:

- fix the source-side structure first;
- do not patch around bad structure only inside the frontend;
- do not treat one-off cleanup as the permanent rule unless the rule docs are updated too.

### Step 4: Run the sync / integration path

Use the correct integration method:

- sync-from-Markdown when the page structure is stable;
- hand-authored structured data only for controlled prototype cases.

The chosen method must leave a clear, reviewable output in the web project.

### Step 5: Register the unit in the manifest

Every newly active unit must be registered in:

`/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`

Do not rely on hidden one-off route branches as the long-term access path.

### Step 6: Build and validate

Run:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run build
```

Then verify:

- the route opens;
- the correct renderer is used;
- navigation behaves correctly;
- feedback entry points still appear where expected;
- resource links behave correctly;
- existing dynamic routes still work.

### Step 7: Update project documentation

After the route is working:

- update `DYNAMIC_PAGE_INVENTORY.md`
- update `RULES_INDEX.md` if any new rule/note was created
- update `PROJECT_STATUS.md` if the project stage or active coverage changed

Without this step, the unit is not considered fully onboarded.

## 4. Completion Standard

A new unit should be considered properly integrated only when all of the following are true:

- source readiness was checked;
- correct rules were consulted;
- sync/data integration is complete;
- manifest registration is complete;
- build passed;
- route was verified;
- project docs were updated.

## 5. Current Application Of This Standard

The next intended use of this standard is:

### PG Non-Language Units 1-7

The project should use this standard before expanding that line, rather than onboarding units through ad hoc steps.
