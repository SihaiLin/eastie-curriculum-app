# K Language Unit Hello + Unit 1 Rollout Plan

Date: 2026-08-19

Goal: prepare enough K Language content structure for the beginning of school without forcing a full-year rewrite.

## Scope

First rollout units:

- K1 Unit Hello
- K1 Unit 1
- K2 Unit Hello
- K2 Unit 1
- K3 Unit Hello
- K3 Unit 1

## Current Inputs

- Generated Power Up dynamic data:
  - `web/src/curriculum/generated/k1LanguageUnit00.ts`
  - `web/src/curriculum/generated/k1LanguageUnit01.ts`
  - `web/src/curriculum/generated/k2LanguageUnit00.ts`
  - `web/src/curriculum/generated/k2LanguageUnit01.ts`
  - `web/src/curriculum/generated/k3LanguageUnit00.ts`
  - `web/src/curriculum/generated/k3LanguageUnit01.ts`
- Classification scaffold:
  - `web/src/curriculum/languageClassifications/k1LanguageUnit00.ts`
  - `web/src/curriculum/languageClassifications/k1LanguageUnit01.ts`
  - `web/src/curriculum/languageClassifications/k2LanguageUnit00.ts`
  - `web/src/curriculum/languageClassifications/k2LanguageUnit01.ts`
  - `web/src/curriculum/languageClassifications/k3LanguageUnit00.ts`
  - `web/src/curriculum/languageClassifications/k3LanguageUnit01.ts`
- New structure rule:
  - `docs/rules/process/k_language_canonical_md_v0_1.md`
- Sample:
  - `docs/k_language_canonical_md_v0_1_k1_unit_1_day_1_sample.md`

## Execution Strategy

1. Use the v0.1 template to create canonical markdown skeletons for the six rollout units.
2. Populate all Power Up-backed days with:
   - day metadata;
   - lesson outcome;
   - source;
   - new keywords;
   - recycled keywords;
   - target sentences.
3. Preserve useful old-MD content in `Teacher / Design Guidance`, not as child-facing page content.
4. Keep `Circle Time`, `Phonics`, `Story`, `Media Extend`, and `Mini Mission` as placeholders where content is not designed yet.
5. Let the course-design session fill missing fields.
6. Use classroom feedback to refine the structure before expanding to Units 2-9.

## Why This Order

Opening school only needs Unit Hello and Unit 1 ready enough for teachers. This reduces the risk of building every unit in an immature format and then having to rework the whole year.

The current dynamic page and classification scaffold are good enough to define the first canonical structure. They should be treated as the working prototype, not as the final annual contract.

## Handoff Prompt For Course Design Session

```text
Please prepare K Language canonical markdown v0.1 for the first rollout units:

- K1 Unit Hello
- K1 Unit 1
- K2 Unit Hello
- K2 Unit 1
- K3 Unit Hello
- K3 Unit 1

Read first:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k_language_canonical_md_v0_1.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/k_language_canonical_md_v0_1_k1_unit_1_day_1_sample.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_UNIT_HELLO_UNIT_1_ROLLOUT_PLAN.md

Use current generated Power Up data and language classification scaffold as inputs. Do not overwrite old source markdown. Create new canonical markdown files/folders for the six rollout units.

Required for each Power Up-backed day:
- Day Metadata
- Circle Time placeholder or content
- CLIL Class
- Lesson Outcome
- Source
- New Keywords
- Recycled Keywords
- Target Sentences
- Activities and Games placeholder or content
- Phonics placeholder or content
- Story placeholder or content
- Teacher / Design Guidance
- Review Issues where needed

For Media Extend / Mini Mission / Showcase days:
- keep the same daily structure;
- mark Day Type clearly;
- use placeholders where design content is not ready;
- do not invent content.

Important:
- Child-facing words go only in New Keywords / Recycled Keywords.
- Child-facing sentence chunks go only in Target Sentences.
- Abstract umbrellas such as colours/family/school remain Review Issues unless you choose concrete child-facing items.
- Old-MD useful guidance should go into Teacher / Design Guidance, not into child-facing fields.

Output a completion report listing:
- files created;
- units covered;
- missing placeholders;
- unresolved review issues;
- any structure questions before web sync.
```

