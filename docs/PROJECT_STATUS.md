# EASTIE Curriculum Project Status

**Status:** Active PM overview  
**Last Updated:** 2026-08-17

This file is the project-level status board for the current EASTIE curriculum work.

Use it to answer:

- what is already stable;
- which curriculum lines already have dynamic-page references;
- which rule systems are ready;
- what is being expanded next;
- what should not be started yet.

This file is not a detailed rule document. For operational rules, read `RULES_INDEX.md`.

## 1. Current Project Position

The project has moved beyond prototype exploration and is now in a controlled expansion stage.

What is already true:

- the clean engineering workspace is established:
  `/Users/Lucia/Desktop/eastie_curriculum_project/`
- the historical curriculum workspace remains the source of truth:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/`
- dynamic rendering, feedback, auth scaffolding, and rule-center structure are already in place;
- multiple curriculum lines have already been validated through real dynamic routes.

## 2. Stable Project Foundations

### Engineering foundations

- dynamic-first frontend direction is locked;
- backend scaffold with auth and feedback exists;
- production deployment topology is active and documented in `docs/deployment.md`;
- dynamic unit manifest is the shared unit registration entry point;
- sync-driven onboarding is preferred over manual page duplication;
- static HTML remains historical/reference-only, not production app content.
- active content/page congruence audit has now been started for current dynamic units.

### Documentation foundations

- `RULES_INDEX.md` is the shared rule entry point;
- `ACCEPTED_SOURCE_REGISTRY.md` is now the shared list of adopted curriculum sources for later clean extraction;
- `DYNAMIC_PAGE_INVENTORY.md` tracks active dynamic routes;
- `DYNAMIC_UNIT_ONBOARDING_CHECKLIST.md` defines dynamic onboarding checks;
- K-language shared conventions and extraction inventory are now documented;
- process rules have started to move out of chat memory and into reusable docs.
- the current source strategy is accepted-source registration now, clean canonical extraction later.
- the project has adopted a new high-level curriculum classification: `Language`, `Core`, `CEC`, and `PE`.

### Program classification v2

The project is transitioning away from using `Non-Language` as a long-term top-level curriculum category.

The approved project-level course types are:

| Category | Meaning |
|---|---|
| EL — English Language | The existing English language curriculum line. |
| CC — Core Courses | Integrated developmental / academic core curriculum. PG/PK current non-language maps here. K Maths, Graded Reading, World Exploration, and selected K1 self-care / social-emotional lines map here. |
| CE — Creative Enrichment | Creative enrichment curriculum, including Art, Music, LEGO, Construction, Cooking & Food Exploration, Drama, Science Exploration, Rhythm / Movement, and expandable enrichment lines. |
| PE — Physical Education | Physical education and sports course lines. |

Current routes and some source folders may still use the legacy `non-language` label. Treat that as a compatibility label until the web app and clean extraction structure are updated.

Primary rules:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_course_type_catalog_v1.md`

## 3. Dynamic Curriculum Coverage

### Active dynamic references

- PG Core Units 1-9, currently served through legacy `/non-language/` routes
- PK Core Units 1-9, currently served through legacy `/non-language/` routes
- PG Language Unit Hello + Units 1-9
- PK Language Unit Hello + Units 1-9
- K1 Language Unit Hello + Units 1-9
- K2 Language Unit Hello + Units 1-9
- K3 Language Unit Hello + Units 1-9
- K1 Core Math Units 1-9, currently served through legacy `/non-language/` routes
- K2 Core Math Units 1-9, currently served through legacy `/non-language/` routes
- K3 Core Math Units 1-9, currently served through legacy `/non-language/` routes
- K1 Core Graded Reading Units 1-9, currently served through legacy `/non-language/` routes
- K2 Core Graded Reading Units 1-9, currently served through legacy `/non-language/` routes
- K3 Core Graded Reading Units 1-9, currently served through legacy `/non-language/` routes

For exact routes and renderers, read:

`/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`

For current source/page congruence status, read:

`/Users/Lucia/Desktop/eastie_curriculum_project/docs/content_page_alignment_audit_2026_06_24.md`

Important distinction:

- the dynamic web app currently has PG/PK language generated snapshots for Unit Hello + Units 1-9;
- the newer `06_curriculum_design/<level>/language_courses/` source-directory pattern currently only shows PG/PK Unit 6 as migrated source;
- therefore PG/PK language is not a page-coverage gap, but it still has a source-workspace consolidation gap.

PG/PK Language Unit 6 source markdown has been migrated into the newer:

`06_curriculum_design/<level>/language_courses/unit_06_toys_and_space/`

directory pattern, so it no longer depends on the older Unit 6 source location as the working source-of-truth.

## 4. Curriculum Coverage Matrix

| Level | Track | Rule Doc | Source Template | Reference Unit | Dynamic Page | Overall Status |
|---|---|---|---|---|---|---|
| PG | Language | Yes | Yes | Yes (Unit Hello + Units 1-9 in web; Unit 6 in newer source directory) | Yes | Dynamic coverage complete; source consolidation needed |
| PG | Core (legacy Non-Language) | Yes | Yes | Yes (Units 1-9) | Yes | Ready for controlled expansion |
| PK | Language | Yes | Yes | Yes (Unit Hello + Units 1-9 in web; Unit 6 in newer source directory) | Yes | Dynamic coverage complete; source consolidation needed |
| PK | Core (legacy Non-Language) | Yes | Yes | Yes (Units 1-9) | Yes | Ready for controlled expansion |
| K1 | Language | Yes | Yes | Yes (Unit Hello + Units 1-9) | Yes | Dynamic coverage complete |
| K1 | Core / CEC (legacy Non-Language) | Yes | Yes | Partial (Core: Math + Graded Reading Units 1-9; CEC Art line active in source but not fully promoted) | Partial | Dynamic partial system active |
| K2 | Language | Yes | Yes | Yes (Unit Hello + Units 1-9) | Yes | Dynamic coverage complete |
| K2 | Core / CEC (legacy Non-Language) | Partial | Partial | Partial (Core: Math + Graded Reading Units 1-9; CEC Art Unit 1 prototype) | Partial | Dynamic partial system active |
| K3 | Language | Yes | Yes | Yes (Unit Hello + Units 1-9) | Yes | Dynamic coverage complete |
| K3 | Core / CEC (legacy Non-Language) | Partial | Partial | Partial (Core: Math + Graded Reading Units 1-9; CEC Art line active in source but not fully promoted) | Partial | Dynamic partial system active |

### Highest-priority incomplete areas

- PG Language source consolidation beyond Unit 6 into the newer source-directory pattern
- PK Language source consolidation beyond Unit 6 into the newer source-directory pattern
- K1 Core / CEC unit assembly beyond Core Math and Core Graded Reading
- K2 Core / CEC unit assembly beyond Core Math and Core Graded Reading
- K3 Core / CEC unit assembly beyond Core Math and Core Graded Reading

These are still the clearest expansion gaps at the project level.

K1/K2/K3 Core are no longer content-only lines. Math and Graded Reading now both have dynamic web coverage across Units 1-9, but the broader Core / CEC unit assembly logic is still incomplete.

The next challenge is no longer basic dynamic feasibility. It is how to assemble fuller K Core / CEC units from multiple active sub-lines without letting the system fragment into unrelated course pages.

## 5.5 K Core Math Track Progress

The K Core Math line is now ahead of the rest of K Core / CEC development and should be treated as an active cross-level structured track.

### K1 Math

- Units 1-9 Math course-track files now exist in the historical curriculum workspace;
- K1 uses `01_course_tracks/` plus a cross-unit `k1_math_track_map.md`;
- K1 Math currently uses 4 concrete lessons per unit;
- K1 Math follows course-track logic, not week-based logic.

### K2 Math

- Units 1-9 Math course-track files now exist in the historical curriculum workspace;
- K2 uses `01_course_tracks/` plus a cross-unit `k2_math_track_map.md`;
- K2 Math currently uses 8 concrete lessons per unit;
- K2 follows the same high-level Math course-track logic as K1, but with a denser lesson sequence;
- HighScope KDI is not used in this line; Math Growing Ladder Alignment is used instead.

### K3 Math

- Units 1-9 Math course-track files now exist in the historical curriculum workspace;
- K3 uses `01_course_tracks/` plus a cross-unit `k3_math_track_map.md`;
- K3 Math currently uses 8 concrete lessons per unit;
- K3 follows the same high-level Math course-track logic as K1/K2, but with a more advanced upper-kindergarten progression;
- HighScope KDI is not used in this line; Math Growing Ladder Alignment is used instead.
- K3 Fall focuses on numbers to 50, skip counting, hundred-chart patterns, extended operations, time, money, and shape/pattern application.
- K3 Spring focuses on numbers to 100, comparison symbols, odd/even, mixed operations, practical measurement, equal sharing, and integrated spatial/logical application.

### Project implication

- K Core lesson count inside a course-track file is now confirmed to be flexible by level and subject line;
- K1, K2, and K3 Math should be treated as structured reference lines when drafting future K Core rules;
- K Math is no longer the only active K Core dynamic line; Graded Reading now also has broad dynamic coverage;
- full K1/K2/K3 Core / CEC unit assembly should still not be marked ready yet, because unit-level assembly beyond Math and Graded Reading is still incomplete.

## 5.6 Current K1 Core / CEC Direction

K1 Core / CEC has now moved beyond template-only status.

What is already true:

- K1 Core source structure currently uses `unit overview + course-track files`;
- `course` and `lesson` terminology has been explicitly separated;
- the structure does not depend on fixed week-based planning;
- K1 Math has active course-track files across Units 1-9;
- K1 Unit 3 now has an active Core overview and additional non-math course-track drafting has begun;
- K1 Graded Reading now has dynamic web coverage across Units 1-9.
- K1 Art Unit Hello plus Units 1-9 now form an aligned and locked course-line source in the historical curriculum workspace; the line is not yet promoted into K1 unit assembly or dynamic web content.
- K2 Art Unit Hello plus Units 1-9 now form an aligned and locked course-line source in the historical curriculum workspace; the line is not yet promoted into K2 unit assembly or dynamic web content.
- K3 Art Unit Hello plus Units 1-9 now form an aligned and locked course-line source in the historical curriculum workspace; the line is not yet promoted into K3 unit assembly or dynamic web content.

What is not yet true:

- no fully reviewed non-math course-track set across a complete reference unit.
- no fully assembled K1 Core / CEC reference unit that combines multiple active lines in one coherent unit package.
- K1 Art still requires an exact Art Encounter artwork/source sheet before classroom delivery or frontend promotion.
- K2 Art requires an exact Art Encounter artwork/source sheet before classroom delivery or frontend promotion.
- K3 Art requires an exact Art Encounter artwork/source sheet before classroom delivery or frontend promotion.

## 5. Rule-System Readiness

### Ready / usable now

- PG non-language rules
- PK non-language rules
- PG/PK non-language canonical structure note
- PG language rules
- PK language rules
- K1 language rules
- K2 language rules
- K3 language rules
- PG language source template
- PK language source template
- PK non-language source template
- K1 language source template
- K2 language source template
- K3 language source template
- K-language resource conventions
- K-language extraction data inventory
- dynamic unit onboarding checklist

### Still incomplete or not yet fully standardized

- K2 Core / CEC rules and template
- K3 Core / CEC rules and template
- graded reading canonical data contract and project placement standard
- deployment production runbook
- Power Up public resource-package expansion beyond Unit 1

## 6. Current Expansion Priority

The next curriculum expansion priority is:

### PG / PK Language Source Consolidation and K Core / CEC Assembly

Reason:

- PG and PK Core, currently served through legacy non-language routes, now have broad dynamic coverage across Units 1-9 and no longer represent the main unresolved expansion line;
- PG and PK language already have dynamic web coverage across Unit Hello + Units 1-9, but their source workspace still needs consolidation beyond the already migrated Unit 6 reference line;
- K Math and K Graded Reading now both have dynamic web coverage across Units 1-9;
- the project has crossed from pure content accumulation into partial K Core / CEC dynamic reality;
- the new PM problem is not “can K Core / CEC render?” but “how do we assemble real units from multiple active lines?”;
- without an assembly strategy, horizontal production will continue to outpace usable unit-level delivery.

## 7. Execution Order For The Current Stage

The agreed order is:

1. maintain the shared status board;
2. update PM/status documents when cross-session reality changes materially;
3. consolidate PG and PK language source files beyond Unit 6 into the newer source-directory pattern while keeping the existing generated dynamic pages intact;
4. use the K Core / CEC assembly strategy to assemble the first fuller K reference unit.

This means the project should not rush into unrelated new tracks before the assembly logic for K Core / CEC becomes explicit and reusable.

## 8. What Should Happen Next

### Immediate next step

Continue the next production wave in two linked tracks:

1. PG / PK Language source consolidation and route QA
2. K Core / CEC fuller unit assembly

K Core / CEC assembly still needs to define how dynamic units should be assembled from:

- Core lines such as Math, Graded Reading, Country Exploration, K1 Safety & Self-Care, and K1 Social & Emotional Learning
- CEC lines such as Art, Music, Science, Construction, LEGO, Cooking, Drama, and Rhythm / Movement

Recommended sequence:

- locate or migrate PG/PK language Markdown sources for Unit Hello + Units 1-5 and 7-9 so the generated dynamic snapshots have clear editable source files;
- choose one K reference unit for assembly review;
- test whether the current renderer/navigation structure is sufficient;
- then decide whether K1, K2, or K3 should become the first fuller assembled Core / CEC reference line.

### After that

- validate the assembly workflow on one K reference unit;
- if smooth, repeat on a second unit in the same level;
- in parallel, continue PG/PK language expansion one controlled unit at a time.

## 9. Things We Should Avoid Right Now

Do not:

- expand many new units or tracks in parallel without updating inventory and rules;
- copy old static HTML into the production app path;
- treat downloads as source of truth;
- reopen schema redesign unless a real blocker appears;
- blur the boundary between stable rule docs and temporary chat decisions;
- mistake horizontal content completion for unit-level delivery readiness.

## 10. Update Rule

When project direction changes in a meaningful way, update this file.

At minimum, update it when:

- a new curriculum line becomes dynamically active;
- a major rule system is locked;
- the expansion priority changes;
- the project enters a new stage such as deployment preparation or production launch.
