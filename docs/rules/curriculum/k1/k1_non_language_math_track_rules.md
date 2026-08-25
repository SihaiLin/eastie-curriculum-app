# K1 Non-Language Math Track Rules

Version: 0.1
Date: 2026-06-25
Status: Draft / first operational math-track rule
Parent Rule: `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/curriculum/k1/k1_non_language_rules.md`
Primary Reference: `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/non_language_courses/00_shared_references/EASTIE_Math_Growing_Ladder_Full.md`

## 1. Purpose

This document defines how Math Growing Ladder should be used inside K1 non-language unit lesson files.

Use this rule when:

- writing K1 non-language math lessons;
- revising the K1 math lesson template;
- checking whether a K1 math lesson stays aligned with Math Growing Ladder;
- preparing future K-track math rules for K2 and K3.

This rule extends the K1 non-language rule. It does not replace the fixed K1 non-language folder or lesson structure.

## 2. Math Track Position

K1 non-language math is a play-based conceptual experience track.

It should:

- follow Math Growing Ladder progression;
- use concrete materials, movement, sorting, matching, counting, measuring, and pattern play;
- connect to the Power Up unit theme where the connection is natural;
- keep language exposure light and supportive;
- describe a reusable classroom experience, not a scripted full lesson plan.

It should not:

- become a language lesson;
- require spoken English output as the main evidence of learning;
- use worksheets as the main experience;
- force every math concept to match the unit theme;
- introduce web rendering, route, schema, or sync assumptions into source Markdown.

## 3. Terminology

Use these terms consistently:

- Course: a non-language course type or track, such as Math, Art, Music, Science, or Construction.
- Lesson: one concrete class session or lesson-plan page within a course.
- Math course: the math track inside one non-language unit.
- Math lesson: one specific math class session inside the math course.

Current K1 non-language source templates may still use older labels such as `Lesson 1: Math`. For math design work, interpret that as the unit's Math course entry, not as proof that the whole unit has only one concrete math lesson.

Do not organize math by fixed weeks. A unit may contain several math lessons, and teachers may schedule them flexibly. The source should describe the lesson sequence and progression, not require that Lesson 1 happens in Week 1, Lesson 2 in Week 2, and so on.

## 4. Current K1 Math Growing Ladder Anchors

K1 math lesson design may draw from these K1 ladder areas:

### Numbers

- Fall: Counting to 10
- Spring: Understanding Quantity Relationships

### Calculation

- Fall: Adding and Taking Away with Objects
- Spring: Symbol Discovery

### Daily Life Applications

- Fall: Positional and Temporal Concepts
- Spring: Measurement and Sorting

### Shapes and Logic

- Fall: Shape Properties and Patterns
- Spring: Pattern Recognition and Extension

For early K1 units, start with the Fall anchors unless a unit has a strong reason to use another domain.

## 5. Mapping Math Growing Ladder Into Unit-Based Lessons

Math Growing Ladder is the progression spine. The Power Up unit theme is the context layer.

Each unit math course should choose:

1. one primary ladder domain;
2. one stage focus from the relevant semester or developmental position;
3. one or more concrete math lessons;
4. optional theme materials that make the experience feel connected to the unit.

Example mapping:

```text
Unit theme: Friends and Family
Primary ladder domain: Numbers
Stage focus: Counting to 10
Child action pattern: count people cards and match small groups to numeral cards
Theme material layer: family and friend picture cards
```

Do not reverse this logic. The unit theme should not decide the mathematical concept if that would distort the ladder progression.

## 6. Progression Display Boundary

Math has a stricter progression than most other K1 non-language lesson types. Its semester and year logic should be preserved, but not repeated in every unit or lesson file.

Use this level split:

- Year or level overview: shows the full K1 math progression, semester goals, and the four Math Growing Ladder domains.
- Math track map: tracks how each unit maps to Math Growing Ladder across the year, using compressed goals and links to unit/lesson files.
- Unit overview: shows how the unit's non-language courses fit the unit theme, including a compact math course goal and a short math lesson sequence.
- Math lesson files: show specific ladder domain, stage focus, child action, and classroom experience for concrete math lessons in that unit.
- Shared reference: preserves the full Math Growing Ladder source.

The K1 math track map should live with shared non-language references:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/non_language_courses/00_shared_references/k1_math_track_map.md
```

Unit and lesson files may name the relevant domain and stage focus, but should not reproduce the full semester ladder or cross-unit progression unless a separate planning note is explicitly being drafted.

Design drafts may use one unit as a structure-testing sample, but this does not create a special document category. Do not introduce labels such as "golden page" into formal source structure unless the project owner explicitly asks for that naming later.

## 7. Unit Overview Math Field Guidance

Because math has explicit unit goals and semester progression, K1 non-language unit overviews may include a compact math-specific block.

Recommended placement:

- inside `## 4. Ten Non-Language Lessons`;
- before or inside `### Lesson 1: Math`;
- not as a replacement for the full lesson file.

Recommended content:

```markdown
### Course: Math

Unit Outcomes: Children will...

Math lesson sequence:

1. [Lesson title]
2. [Lesson title]
3. [Lesson title]

How this unit supports the outcomes: Children use [unit theme context/materials] to [core mathematical actions], staying aligned with [Math Growing Ladder domain/stage focus].
```

Keep this block short. It should help teachers understand what mathematical progress the unit is responsible for, without turning the unit overview into a full math syllabus.

Do not hard-code a fixed number of weeks. K1, K2, and K3 may use different numbers of math lessons per unit, and teachers may schedule multiple math lessons in the same week if appropriate. Use flexible wording such as:

- math experience;
- math sessions;
- math lessons;
- this unit's math work.

Avoid wording that assumes every level or unit has exactly four math lessons, exactly eight math lessons, or one math lesson per week.

The unit overview may state:

- the compressed unit outcomes;
- the core child actions;
- the math lesson sequence;
- the relevant ladder domain and stage focus;
- how the unit theme carries the math.

The unit overview should not include:

- the full semester ladder;
- a week-by-week plan unless a separate planning note is explicitly being drafted;
- formal assessment rubrics;
- web display or schema assumptions.

## 8. Lesson Field Guidance

Keep the canonical K1 non-language lesson headings unchanged.

### Lesson Type

Use:

```markdown
Math / Math Growing Ladder
```

Optionally name the primary ladder domain in the prose, such as Numbers, Calculation, Daily Life Applications, or Shapes and Logic.

### Power Up Theme Link

State the strength of the connection:

- strong link;
- loose link;
- light adjacency.

Name the theme material or situation, but do not over-claim that the math concept comes from the theme.

### Lesson Focus

State:

- primary Math Growing Ladder domain;
- stage focus;
- core mathematical action.

Keep this short. It should answer: what math are children experiencing?

### Lesson Outcome

Write one realistic teacher-facing outcome.

Good K1 outcomes use observable actions:

- count;
- match;
- compare;
- sort;
- place;
- continue a pattern;
- show with objects;
- recount to check.

Avoid outcomes that require formal explanation, written calculation, or independent abstract reasoning.

### Theme Vocabulary

Use light exposure vocabulary only.

For math lessons, include:

- a few math words children will hear naturally;
- a few theme words if they are used as materials;
- no large Power Up vocabulary inventory.

The vocabulary is not the main objective.

### Teacher Support Language

Use short prompts and routines that help children act mathematically.

Good prompts:

- "Count with me."
- "How many?"
- "Put one card on each mat."
- "Which group has more?"
- "Can you make the same?"
- "Let's check again."

Avoid long teacher scripts and grammar teaching.

### Main Experience

This is the heart of the lesson.

Describe:

- concrete materials;
- child action sequence;
- optional extension or simplification;
- how the theme appears in the materials.

Keep it reusable. Do not write a minute-by-minute procedure.

### Expected Child Response

Use observable participation:

- points while counting;
- moves one object per space;
- matches small quantities to numerals;
- compares two groups;
- copies or continues a pattern;
- uses gestures, home language, single words, or short English phrases.

Do not require full-sentence English responses.

### Suggested Resources

List material types, not procurement details.

Examples:

- counters;
- number cards;
- picture cards;
- family/friend photo cards;
- blocks;
- shape tiles;
- sorting trays;
- ten-frame mats;
- loose parts.

### Boundary Notes

State what the lesson is not doing.

Common boundaries:

- not a language lesson;
- not formal written addition/subtraction;
- not a worksheet-led lesson;
- not an assessment of spoken English;
- theme connection supports the math but does not override the ladder.

## 9. Theme Connection Rule

Math should connect to the Power Up unit theme through materials, situations, or playful prompts.

Strong theme links are welcome when they are natural. Examples:

- Friends and Family: counting people cards, matching family groups, comparing group sizes.
- Toys: sorting toys, counting blocks, building patterns.
- Food: one-to-one snack mats, more/less, simple sharing.

Weak theme links should remain light. If a ladder focus does not fit the theme, write a good math lesson and name the link as light adjacency.

## 10. What Stays Math-Track-Specific

These decisions should be controlled by the math track, not by the unit theme:

- ladder domain;
- developmental stage focus;
- core mathematical action;
- level of abstraction;
- whether numerals, symbols, measurement, patterns, or shapes are appropriate;
- child evidence of mathematical thinking.

The theme may choose materials and context, but it should not force advanced or unrelated math.

## 11. K1 / K2 / K3 Shared Rule Decision

One shared K-track math philosophy is useful, but one detailed shared rule doc is not enough for K1, K2, and K3.

Reason:

- K1 is concrete, play-based, and low-pressure;
- K2 moves toward more structured counting, comparison, calendar, measurement, and equations;
- K3 requires broader number patterns, operations, time, money, and reasoning.

Recommended future structure:

- keep this K1-specific rule for K1 non-language;
- later create K2 and K3 non-language math rules when those tracks begin;
- optionally create a short shared K-track math note only after K2/K3 source structures are known.

Do not silently force K2/K3 into the K1 lesson density or exact field interpretation.

## 12. Web Handoff Boundary

This rule is content-only.

Possible later web handoff notes:

- The future K1 year or level overview may need a math progression section showing semester goals and the four Math Growing Ladder domains.
- K1 unit overview rendering may need to allow a compact math goal block inside the non-language lesson map.
- Math lessons may need a visible display of ladder domain and stage focus, without reproducing the full semester progression.
- The existing lesson headings should remain stable source fields.
- Web rendering should not require math lessons to contain full procedures or extra schema-only fields.

Do not implement web routes, React changes, sync scripts, or dynamic data schema changes from this rule.
