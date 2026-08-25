# EASTIE Session Start Prompts

**Status:** Active prompt bank  
**Last Updated:** 2026-08-17

Use this file to start focused Codex sessions without relying on long chat history.

Every prompt below assumes the shared project strategy:

```text
produce content now;
register accepted sources;
do clean extraction later.
```

## 1. Universal PM Context For Any Session

Copy this into the start of any new session:

```text
You are working on the EASTIE curriculum project.

Before continuing, read:

/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_UPDATE_BOARD.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md

Current project strategy:
- continue curriculum production now;
- do not bulk-migrate historical files yet;
- register accepted sources in ACCEPTED_SOURCE_REGISTRY.md;
- generated TypeScript files are web snapshots, not editable curriculum source;
- Downloads is only a handoff/input folder, not source of truth;
- clean extraction to content/curriculum will happen later after the main content body is complete.

Current curriculum program structure:
- Language = existing English language curriculum.
- Core = PG/PK current non-language; K Math, Graded Reading, Country Exploration, and selected K1 safety/self-care and social-emotional lines.
- CEC = Creative Enrichment Curriculum: Art, Music, LEGO, Construction, Cooking, Drama, Science, Rhythm/Movement, and expandable enrichment lines.
- PE = Physical Education.

Current web routes may still use the older /non-language/ label. Treat it as a compatibility label, not the long-term top-level category.

At the end of each meaningful work block, add a concise update to:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_UPDATE_BOARD.md

If you finalize usable source, report whether it should be added to:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md

When reporting accepted source, include:
- future category: Language / Core / CEC / PE;
- course line, such as language, integrated-core, math, graded-reading, art, science, music, cooking, drama, construction, country-exploration, or pe.
```

## 2. PG / PK Language Content Session

```text
Task area: PG/PK Language curriculum source maintenance or expansion.

Please first read:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/pg_pk_language_source_consolidation_audit_2026_08_17.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pg/pg_language_rules.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/pk/pk_language_rules.md

Important current status:
- PG/PK Language dynamic pages already exist for Unit Hello + Units 1-9.
- Do not treat Units 1-5 or 7-9 as missing web content.
- The main issue is source consolidation: newer source folders currently only show Unit 6.
- Older editable source exists under:
  /Users/Lucia/Documents/New project/PG_PK_Language_Syllabus/
- Do not edit generated TypeScript snapshots.

Your task boundary:
- locate, review, or prepare accepted Markdown source;
- preserve curriculum wording unless explicitly asked to revise;
- do not bulk-migrate all units unless PM asks;
- if you migrate one unit, report exact source and target paths and whether sync/build was run.

Completion report must include:
- files read;
- files created/modified;
- accepted source path;
- whether generated web output changed;
- whether ACCEPTED_SOURCE_REGISTRY.md needs an update;
- risks or source ambiguity.
```

## 3. K Core / CEC Assembly Session

```text
Task area: K1/K2/K3 Core / CEC unit assembly.

Please first read:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k_non_language_unit_assembly_strategy.md

Current reality:
- K1/K2/K3 Core Math is active across Units 1-9.
- K1/K2/K3 Core Graded Reading is active across Units 1-9.
- K2 CEC Art Unit 1 has a prototype dynamic route and accepted zh-CN mirror.
- Full K Core / CEC unit assembly is still incomplete.
- Existing routes may still use legacy /non-language/ labels.

Important terminology:
- Course = a recurring course line, such as Math, Graded Reading, Art, Music, Science, Cooking, Drama, Country Exploration, Construction.
- Lesson = a concrete class session inside a course.
- Do not force week-based structure unless the course line explicitly needs it.
- Categorize each course line as Core, CEC, or PE before handoff.

Your task boundary:
- assemble or plan one coherent K Core / CEC reference unit;
- keep course lines distinct;
- do not invent a new global structure if an existing rule/template can be reused;
- identify which source files are accepted and which are still prototype/draft.

Completion report must include:
- target level/unit;
- course lines included;
- future category for each course line;
- accepted source paths;
- gaps still unfilled;
- whether frontend route/data should change;
- whether ACCEPTED_SOURCE_REGISTRY.md needs an update.
```

## 4. Math Course-Line Session

```text
Task area: K Math / Math Growing Ladder.

Please first read:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md

Also read the relevant map:
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/non_language_courses/00_shared_references/k1_math_track_map.md
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/non_language_courses/00_shared_references/k2_math_track_map.md
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k3/non_language_courses/00_shared_references/k3_math_track_map.md

Current reality:
- K1/K2/K3 Math Units 1-9 already have course files and dynamic coverage.
- Math is a Core course line under Curriculum Program Structure v2.
- Math uses Math Growing Ladder Alignment, not HighScope KDI.
- Lesson count may differ by level.

Your task boundary:
- refine or QA Math course files;
- do not rewrite the whole course-line structure;
- keep accepted files in the historical curriculum workspace unless PM asks for clean extraction.

Completion report must include:
- level/unit/course files touched;
- Math Growing Ladder alignment changes;
- whether generated web output changed;
- whether ACCEPTED_SOURCE_REGISTRY.md needs an update.
```

## 5. Graded Reading Course-Line Session

```text
Task area: K Graded Reading / RAZ course line.

Please first read:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md

Current reality:
- K1/K2/K3 Graded Reading has dynamic coverage across Units 1-9.
- Graded Reading is a Core course line under Curriculum Program Structure v2.
- Generated data exists, but exact canonical source folder should be confirmed before clean extraction.
- RAZ resources may include PDFs, audio, video, lesson plans, worksheets, snapshots, and covers.

Your task boundary:
- design or revise graded reading lesson/unit source;
- maintain the special graded-reading fields if already approved;
- do not force the fields to match Math/Art if the course line requires different source/resource blocks;
- do not leave accepted files only in `/Users/Lucia/Desktop/RAZ/` or Downloads without PM path confirmation.

Completion report must include:
- level/unit;
- source files created/updated;
- resource manifests or resource paths affected;
- web route affected, if any;
- whether ACCEPTED_SOURCE_REGISTRY.md needs an update.
```

## 6. Art Course-Line Session

```text
Task area: K1-K3 Art course-line design.

Please first read:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md

Current Art working root:
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/

Current reality:
- Art has its own course-line workspace during design.
- Art is a CEC course line under Curriculum Program Structure v2.
- Do not force Art into `content/curriculum/` yet.
- K2 Art Unit 1 has a dynamic prototype and accepted zh-CN mirror.
- Exact Art Encounter artwork/source sheets are still required before broad classroom/web promotion.

Your task boundary:
- produce or refine Art source inside the Art workspace;
- preserve accepted bilingual boundaries;
- do not make Teacher Art Concepts into child language targets;
- do not batch-promote Art units to web without PM approval.

Completion report must include:
- level/unit;
- Art package files created/updated;
- translation status;
- artwork/source sheet status;
- whether ACCEPTED_SOURCE_REGISTRY.md needs an update.
```

## 7. Web / Frontend Session

```text
Task area: EASTIE web app / dynamic curriculum frontend.

Please first read:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md
/Users/Lucia/Desktop/eastie_curriculum_project/web/docs/content_sync_workflow.md

Current reality:
- Web is dynamic-first React.
- Generated TypeScript snapshots are not editable curriculum source.
- Static HTML should not be copied into production content.
- Curriculum pages should be registered through the dynamic manifest where applicable.

Your task boundary:
- implement or refine dynamic rendering, routes, sync scripts, resource links, feedback UI, bilingual display, or responsive behavior;
- confirm source files are accepted or PM-approved prototype sources before generating;
- run `npm run build` after changes;
- do not silently rewrite curriculum wording.

Completion report must include:
- files changed;
- routes affected;
- source files used;
- generated files changed;
- build result;
- known limitations;
- whether docs or registry need updates.
```

## 8. Deployment Session

```text
Task area: deployment / server / production release.

Please first read:
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/deployment.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md

Current reality:
- Local dev is not production.
- Public resource paths must not depend on local `file://` links.
- New curriculum routes may be prototype, active reference, or ready; check PM status before deploying.

Your task boundary:
- prepare deployment, verify build, check env, confirm API/web health, and report deployment status;
- do not promote new curriculum routes without PM confirmation;
- do not change curriculum wording.

Completion report must include:
- branch/commit if used;
- build result;
- deployment target;
- routes checked;
- resource-path risks;
- rollback notes if relevant.
```

## 9. End-Of-Session Update Template

Use this at the end of a meaningful work block:

```markdown
## YYYY-MM-DD — [Session Area]

### Completed
- ...

### Files / Paths
- ...

### Current Status
- ...

### Accepted Source Registry
- Should update registry: yes/no
- Suggested registry entry:

### Generated / Web Impact
- ...

### Next Step
- ...

### Risks / Notes
- ...
```
