# K Non-Language Unit Assembly Strategy

Status: Active strategy draft  
Date: 2026-07-07

## 1. Purpose

This document defines how K non-language work should move from:

- horizontal content production;

to:

- usable unit-level delivery.

It exists because the project has now reached a new stage:

- K1/K2/K3 Math has broad cross-unit coverage;
- K1/K2/K3 Graded Reading has broad cross-unit coverage;
- dynamic web routes now exist for both of those lines;
- but complete K non-language units are still not naturally forming on their own.

Without an assembly strategy, the project can continue producing strong horizontal content while still failing to produce coherent unit-level delivery.

## 2. Audience

This document is for:

- PM / project coordination sessions;
- K non-language content sessions;
- frontend / web integration sessions;
- future implementation sessions that need to decide whether a K unit is “ready enough” to assemble.

This document is not for teacher-facing delivery.

## 3. Core Problem

K non-language work currently has two valid but competing production logics.

### Horizontal production logic

This is efficient for content creation:

- complete all Math units;
- complete all Graded Reading units;
- later complete Art, Music, Science, or other lines.

### Vertical unit-delivery logic

This is what teachers, PM, and frontend unit pages ultimately need:

- one unit should feel coherent;
- one unit should show the most important active course lines together;
- one unit should be reviewable as a real curriculum package rather than a set of unrelated tracks.

The problem is not content quality.

The problem is that horizontal completion does not automatically create unit-level readiness.

## 4. Strategic Principle

Do not wait for every possible non-language course line to be finished before assembling a unit.

Instead:

- continue horizontal production where it is efficient;
- but introduce explicit unit assembly checkpoints;
- and treat unit assembly as its own project layer.

In practical terms:

> K non-language should be produced horizontally, but delivered vertically.

## 5. Scope

This strategy applies to:

- K1 non-language
- K2 non-language
- K3 non-language

It especially applies to:

- Math
- Graded Reading
- additional K non-language course lines that are explicitly confirmed to run across K1/K2/K3, including:
  - Art
  - Lego
  - Large Blocks
  - Science
  - Music
  - Cooking
  - Drama
  - Country Exploration

It does not replace level-specific writing rules.

It defines how those lines should be assembled into usable units once multiple active sub-lines exist.

## 6. Current Project Reality

At the time of writing:

- K Math is dynamically active across K1/K2/K3 Units 1-9;
- K Graded Reading is dynamically active across K1/K2/K3 Units 1-9;
- K non-language is therefore no longer “blank” at the dynamic level;
- but no full K non-language unit assembly standard is locked yet;
- and no fully convincing multi-track K non-language reference unit has been accepted as the model.

This means the current project bottleneck is no longer:

- “Can K non-language be rendered dynamically?”

It is now:

- “How should active K non-language lines be assembled into a coherent unit?”

## 7. Assembly Goal

The goal of assembly is not to force all levels to have the same lesson structure.

The goal is to make sure that, at the unit level:

- PM can judge progress clearly;
- frontend can build stable unit navigation;
- content sessions know which additional tracks matter most;
- teachers can eventually encounter something that looks like a real unit rather than isolated sub-lines.

## 8. Assembly Layers

K non-language assembly should be understood in three layers.

### Layer A: Active sub-line

A single strong course family exists and is usable on its own.

Examples:

- Math
- Graded Reading

This is necessary, but not enough for unit readiness.

### Layer B: Partial assembled unit

A unit contains:

- a stable unit-level overview or assembly concept;
- more than one meaningful active sub-line;
- enough structure for PM and frontend review;
- enough coherence to judge whether the unit is starting to behave like a real unit.

This is the first important delivery threshold.

### Layer C: Reference assembled unit

A unit has:

- stable assembly logic;
- consistent navigation logic;
- enough course breadth to act as the model for future units in that level;
- reviewable content structure that other sessions can imitate.

This is the threshold at which a level’s K non-language unit structure can start to expand with confidence.

## 9. Minimum Viable Assembled Unit

A K non-language unit should be considered a minimum viable assembled unit only when all of the following are true:

1. A unit-level overview exists.
2. At least two active non-language lines are present.
3. At least one of those lines is not purely academic/technical.
4. The unit can be reviewed as a meaningful package, not just a track collection.
5. The dynamic page can represent the current unit honestly without pretending it is complete.

### Minimum recommended content composition

At the current stage, the minimum practical assembly package is:

- Unit Overview
- Math
- Graded Reading
- at least 1 additional approved K non-language course line

Preferred stronger package:

- Unit Overview
- Math
- Graded Reading
- 2 additional approved K non-language course lines

This stronger package is recommended because it better tests:

- mixed course density;
- navigation behavior;
- how “academic” and “experience” lines coexist inside one unit.

## 10. What Does Not Count As Assembled

The following do **not** count as a unit assembly milestone by themselves:

- all Math units completed;
- all Graded Reading units completed;
- multiple tracks existing only in separate source folders;
- a dynamic page that only exposes one isolated course line;
- one unit overview with no supporting active lines.

These are important achievements, but they do not solve the unit-delivery problem.

## 11. Recommended First Assembly Test

At the current project stage, the most suitable first serious assembly test is:

### K2 Unit 1

Reason:

- K2 Language Unit 1 already exists as a dynamic reference line;
- K2 Math is dynamically active;
- K2 Graded Reading is dynamically active and already served as a design/test unit;
- the level has sufficient density to test whether the unit model can scale;
- the structure is rich enough to expose integration problems early.

Alternative test candidate:

### K1 Unit 1 or K1 Unit 3

Use K1 if the project wants to prioritize early non-language structure coherence rather than stronger immediate dynamic density.

But if only one first assembly pilot is chosen, K2 Unit 1 is currently the clearest engineering/content meeting point.

## 12. Recommended Assembly Sequence

Use this order:

1. Confirm the unit overview / unit framing layer.
2. Confirm Math is present and usable.
3. Confirm Graded Reading is present and usable.
4. Add one additional approved K non-language course line.
5. Add a second additional approved K non-language course line if needed for a stronger pilot.
6. Review whether the unit now feels coherent enough for reference status.

Do not jump directly from horizontal content completion to “full level ready”.

## 13. Confirmed Cross-Level K Non-Language Course Families

The following course families are currently confirmed as meaningful cross-level K non-language lines across K1/K2/K3:

1. Math
2. Graded Reading
3. Art
4. Lego
5. Large Blocks
6. Science
7. Music
8. Cooking
9. Drama
10. Country Exploration

These should be treated as the current shared K-level non-language family set unless a later rule explicitly changes that understanding.

## 14. Course-Line Priority For Early Assembly

When choosing which additional lines to add after Math and Graded Reading, prefer lines that help reveal unit coherence.

Recommended priority:

1. Music
2. Drama
3. Science
4. Art
5. Lego or Large Blocks
6. Cooking
7. Country Exploration

Reason:

- music and drama are strong early coherence tests because they reveal rhythm, participation, group energy, and expressive structure;
- science and art help test whether a unit can hold more exploratory and process-based lines beside Math and Graded Reading;
- Lego and Large Blocks help test construction-heavy presentation and material-based navigation;
- cooking and country exploration may be excellent lines, but may depend more on resource readiness or unit-theme fit.

## 15. Frontend Implications

Frontend sessions should treat K non-language as:

- a partially assembled multi-line system;
- not a single fully locked unit-page contract yet.

This means:

1. Do not hard-code the assumption that one K unit only has one active non-language line.
2. Do not assume that all lines use the same lesson schema.
3. Do keep shared outer concepts stable:
   - level
   - track
   - unit
   - route
   - navigation
   - feedback context
4. Represent incomplete assembly honestly.

The frontend should support:

- partial assembled units;
- multiple active lines under one unit;
- future addition of new course lines without redesigning the whole route system.

## 16. Content Session Implications

Content sessions should continue using efficient horizontal production where appropriate.

However, when a line becomes mature enough, content sessions should expect PM to ask:

- which unit should now be assembled?
- which additional line should be added next to support unit-level review?
- does this new content improve a real unit package, or only improve horizontal completeness?

This means content sessions should not treat “line completed” and “unit completed” as the same thing.

## 17. PM Decision Rule

PM should use this rule:

### If the project lacks active sub-lines

Prioritize horizontal production.

### If the project already has two strong active sub-lines

Prioritize unit assembly strategy.

The project is now in the second condition for K non-language.

## 18. Status Labels For K Non-Language

Use these practical meanings:

### Content-only

Source content exists, but no dynamic rendering exists.

### Dynamic partial system active

One or more non-language lines render dynamically, but full unit assembly is not solved.

### Minimum viable assembled unit

A unit overview plus multiple active lines create the first honest unit package.

### Reference assembled unit

The unit is stable enough to act as the model for future K non-language expansion.

## 19. What To Avoid

Do not:

- treat broad horizontal coverage as proof that unit delivery is solved;
- force all K non-language lines into one identical lesson schema;
- wait for every possible course type before attempting assembly;
- hide partial assembly under misleading “complete unit” labels;
- let frontend, content, and PM use different definitions of readiness.

## 20. Immediate Next Step

The immediate next step is:

1. choose the first K non-language assembly pilot;
2. define which exact lines it will include;
3. review whether the current dynamic route structure can represent that pilot cleanly.

At the current stage, the recommended first pilot is:

### K2 Unit 1

Suggested assembly baseline:

- Unit Overview
- Math
- Graded Reading
- one additional approved K non-language line

Preferred stronger pilot:

- Unit Overview
- Math
- Graded Reading
- two additional approved K non-language lines

## 21. Relationship To Other Rules

Read this together with:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`
- level-specific K non-language rules when they exist

This strategy does not replace level-specific curriculum writing rules.

It defines how active K non-language lines should be assembled into unit-level delivery.
