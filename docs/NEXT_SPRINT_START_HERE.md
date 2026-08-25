# EASTIE Next Sprint Start Here

**Status:** active launch note after summer break  
**Last Updated:** 2026-08-23

This file is the quickest entry point for restarting EASTIE curriculum work after a pause.

Use it when:

- opening a new Codex session;
- handing work to a specialist content / web / deployment session;
- resuming after a break;
- deciding what should happen next without rereading the whole project history.

## 1. Read These First

Before starting any task, read:

1. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
2. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`
3. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_UPDATE_BOARD.md`
4. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md`
5. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md`

If the task is dynamic-page or web related, also read:

6. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`

If the task needs a copy-ready prompt for another session, read:

7. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_START_PROMPTS.md`

## 2. Current Project Reality

The project is no longer in the early static-prototype stage.

Current foundations:

- the clean engineering project is `/Users/Lucia/Desktop/eastie_curriculum_project/`;
- the historical curriculum design workspace is still `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/`;
- some early PG/PK language source also remains in `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus/`;
- the web app uses dynamic React pages and generated data snapshots;
- generated TypeScript files are not editable curriculum source;
- static HTML is historical/reference-only unless explicitly used as a visual reference.

Current strategy:

```text
prepare the current dynamic site for launch;
continue curriculum content production in controlled course-line sessions;
use curriculum_release only for PM-approved extraction packages.
```

Do not start a bulk migration into `content/curriculum/` or `curriculum_release/` unless PM explicitly approves the scope.

The clean release sample has now been created at:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/curriculum_release/
```

It is currently paused as the **v0.1 release workspace sample complete** after five validated extraction phases:

- K1 English Language Unit 1
- K2 English Language Unit 1
- PG Core Courses Unit 8
- PK Core Courses Unit 8
- PG Core Courses Unit 9

Future release additions must follow this sequence:

```text
candidate scan -> PM confirms scope -> copy only -> manifest trace -> checkpoint
```

Current program structure:

```text
Language
Core
CEC
PE
```

The older `Non-Language` label is still present in source folders and web routes. It is now a compatibility label, not the long-term top-level program category.

Current mapping:

- PG/PK current non-language -> Core
- K Math -> Core
- K Graded Reading -> Core
- K Country Exploration -> Core
- K1 Safety & Self-Care -> Core
- K1 Social & Emotional Learning -> Core
- K Art / Music / LEGO / Construction / Cooking / Drama / Science / Rhythm -> CEC
- PE -> PE

## 3. Current Dynamic Coverage

The dynamic web app currently has:

- PG Language: Unit Hello + Units 1-9
- PK Language: Unit Hello + Units 1-9
- K1 Language: Unit Hello + Units 1-9
- K2 Language: Unit Hello + Units 1-9
- K3 Language: Unit Hello + Units 1-9
- PG Core, currently under `/non-language/`: Units 1-9
- PK Core, currently under `/non-language/`: Units 1-9
- K1/K2/K3 Core Math, currently under `/non-language/`: Units 1-9
- K1/K2/K3 Core Graded Reading, currently under `/non-language/`: Units 1-9
- K2 CEC Art Unit 1: prototype / review route with zh-CN integration, currently under `/non-language/`

For exact routes and status, use:

`/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`

## 4. What Is Actually Incomplete

The main gaps are not basic page feasibility anymore.

Current real gaps:

1. **Accepted source tracking**  
   New work must clearly say whether it should be added to:
   `/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md`

2. **PG/PK Language source consolidation**  
   PG/PK Language pages exist for Unit Hello + Units 1-9, but the newer source-directory pattern currently only contains Unit 6. The older editable source exists in:
   `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus/`

3. **K Core / CEC unit assembly**  
   Core Math and Core Graded Reading are active across Units 1-9. CEC Art has begun. The next design challenge is assembling complete K units from multiple course lines without fragmenting the system.

4. **Course-line expansion**  
   Country Exploration, Safety & Self-Care, Social & Emotional Learning, Art, Science, Music, Cooking, Drama, Construction, and other K Core / CEC lines still need controlled source growth and later web promotion.

5. **QA and deployment readiness**  
   Dynamic routes exist, but selected route/content/resource QA and deployment checks remain ongoing.

## 5. Current Production Priorities

Recommended order:

1. **Launch preparation**  
   Deployment and web sessions should verify login, resources, SQLite/API data, feedback, build output, and active routes before any broad public use.

2. **K Core / CEC assembly reference unit**  
   Choose one K unit and assemble multiple course lines into a coherent unit-level experience.

3. **Continue course-line production**  
   Math and Graded Reading are strong Core lines. Continue or expand Country Exploration, Art / Science / Music / Cooking / Drama / Construction using accepted-source registration and the new program category labels.

4. **PG/PK Language source consolidation**  
   Do not redesign content. Locate and later migrate accepted PG/PK language source into the newer source pattern.

5. **Selective web QA**  
   Check routes, bilingual display, feedback, resources, and mobile layouts for active pages before major deployment steps.

6. **Release extraction only by explicit package**  
   `curriculum_release/` is no longer an open-ended migration area. Add content only after candidate scan and PM confirmation.

## 6. If You Are A Content Session

Before writing:

- read `RULES_INDEX.md`;
- read `curriculum_program_structure_v2.md`;
- read the relevant curriculum rule;
- check `ACCEPTED_SOURCE_REGISTRY.md`;
- confirm the target source folder with PM if uncertain.

After a meaningful work block, report:

```text
Accepted source created/updated:
Path:
Future category: Language/Core/CEC/PE
Course line:
Status:
Should this be added to ACCEPTED_SOURCE_REGISTRY.md? yes/no
Generated web output affected: yes/no
Notes:
```

Do not leave adopted files only in Downloads.

## 7. If You Are A Web Session

Before coding:

- read `DYNAMIC_PAGE_INVENTORY.md`;
- read the relevant web rule;
- confirm source files are accepted or approved for prototype use;
- do not copy old static HTML as production content;
- do not edit generated curriculum wording manually.

After coding:

- run build;
- report routes changed;
- report generated files changed;
- update `SESSION_UPDATE_BOARD.md`.

## 8. If You Are A Deployment Session

Before deploying:

- read `deployment.md`;
- read `DYNAMIC_PAGE_INVENTORY.md`;
- read the latest top entries in `SESSION_UPDATE_BOARD.md`;
- check whether the target page is prototype, active reference, or production-ready;
- confirm resources are public-path compatible and do not depend on local `file://` links.
- confirm API/SQLite assumptions, login behavior, feedback storage, and cookie/session settings.

Do not deploy new curriculum routes without PM confirmation.

For the next deployment pass, prioritize a checklist rather than new feature work:

```text
1. frontend build
2. API build / service start
3. login and logout
4. teacher feedback create flow
5. admin feedback review flow
6. resource links
7. active curriculum routes
8. mobile sanity check
9. backup / rollback notes
```

## 9. What Not To Do

Do not:

- treat Downloads as source-of-truth;
- edit generated TypeScript snapshots for curriculum wording;
- bulk-migrate historical files into `content/curriculum/`;
- delete messy historical files during active production;
- invent a new markdown structure when a rule/template exists;
- mark a prototype route as ready without source and QA notes;
- start a new course-line folder convention without PM approval.

## 10. Before Ending A Work Block

Update:

1. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_UPDATE_BOARD.md`
2. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md` if accepted source changed
3. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md` if a stable rule changed
4. `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md` only if project maturity or priority changed

Keep updates concise and useful to the next session.
