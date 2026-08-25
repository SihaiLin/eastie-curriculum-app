# Curriculum Program Structure v2

**Status:** Review  
**Last Updated:** 2026-08-18  
**Scope:** Whole-project curriculum classification, source organization, dynamic routing direction, and future clean extraction.

## 1. Purpose

This document defines the next high-level EASTIE curriculum classification framework.

The previous broad split:

```text
Language
Non-Language
```

is no longer precise enough. The project now includes language courses, core developmental/academic courses, creative enrichment courses, and PE. The old `non-language` label should gradually become a legacy compatibility term rather than the long-term organizing structure.

## 2. New Top-Level Curriculum Categories

The project should move toward four top-level curriculum categories:

```text
1. EL — English Language
2. CC — Core Courses
3. CE — Creative Enrichment
4. PE — Physical Education
```

These categories describe the program layer above course lines and units.

Official naming for course types, course lines, and suggested slugs is defined in:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_course_type_catalog_v1.md
```

## 3. Category Definitions

### 3.1 EL — English Language

`English Language` means the dedicated English language curriculum.

Current examples:

- PG Language
- PK Language
- K1 Power Up Language
- K2 Power Up Language
- K3 Power Up Language

Current route family:

```text
/curriculum/<level>/language/unit-XX
```

This category is already stable. Use `EL` as the short code and `English Language` as the official display name.

### 3.2 CC — Core Courses

`Core Courses` means foundational learning and development courses.

For PG and PK, Core includes the current PG/PK `non-language` units. These units are theme-based integrated core experiences and should be reclassified as Core in future naming.

For K1-K3, Core includes:

- Math
- Graded Reading
- World Exploration

For K1, Core also includes:

- Safety & Self-Care
- Social & Emotional Learning

Working interpretation:

```text
old PG/PK non-language -> future PG/PK Core
K Math -> Core
K Graded Reading -> Core
K World Exploration -> Core
K1 Safety & Self-Care -> Core
K1 Social & Emotional Learning -> Core
```

Use `CC` as the short code and `Core Courses` as the official display name.

### 3.3 CE — Creative Enrichment

`Creative Enrichment` means the creative enrichment curriculum family.

CEC is the home for creative, exploratory, practical, and enrichment course lines.

Examples:

- Art
- Music
- LEGO
- Construction
- Cooking & Food Exploration
- Drama
- Science Exploration
- Rhythm / Movement
- other future enrichment course lines

CE is intentionally expandable. New enrichment lines may be added later if PM approves their category placement and source structure.

Use `CE` as the short code and `Creative Enrichment` as the official display name.

### 3.4 PE — Physical Education

`Physical Education` means physical education and sports course lines.

PE should be a separate program category rather than being hidden inside `Core` or `CEC`.

Future PE work should define:

- level-specific movement/physical skill progression;
- safety rules;
- lesson structure;
- observation or assessment focus;
- relationship with classroom movement/rhythm activities.

PE has not yet been fully developed in the current dynamic curriculum system.

## 4. Current Legacy Mapping

The existing app and source folders still use `non-language` in many places.

During the transition, treat `non-language` as a legacy umbrella:

| Existing Label | Future Category | Notes |
|---|---|---|
| PG non-language | Core | Integrated PG core theme experiences |
| PK non-language | Core | Integrated PK core theme experiences |
| K Math under non-language | Core | Course line: Math |
| K Graded Reading under non-language | Core | Course line: Graded Reading |
| K Art under non-language Course C prototype | CEC | Course line: Art |
| Future K Music / LEGO / Construction / Cooking / Drama / Science / Rhythm | CEC | Not Core unless PM explicitly decides otherwise |
| Future PE | PE | Separate category |

Do not delete existing `non-language` routes or source folders during the transition.

## 5. Recommended Future Route Direction

Current routes such as:

```text
/curriculum/pg/non-language/unit-02
/curriculum/k2/non-language/unit-01/course-a
```

should remain available for now.

Current dashboard transition rule:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/curriculum_dashboard_route_mapping_transition.md
```

During the current site version, the curriculum home may display the new `Grade -> EL / CC / CE / PE -> Course Line -> Unit` structure while still linking to current working legacy routes.

Future route families for the next clean site should move toward readable category slugs:

```text
/curriculum/<level>/english-language/unit-XX
/curriculum/<level>/core/<course-line>/unit-XX
/curriculum/<level>/creative-enrichment/<course-line>/unit-XX
/curriculum/<level>/physical-education/<course-line>/unit-XX
```

Examples:

```text
/curriculum/pg/core/integrated-core/unit-02
/curriculum/pk/core/integrated-core/unit-08
/curriculum/k2/core/maths/unit-01
/curriculum/k2/core/graded-reading/unit-01
/curriculum/k2/creative-enrichment/art/unit-01
/curriculum/k3/creative-enrichment/drama/unit-04
/curriculum/k1/physical-education/football/unit-03
```

Do not use `el`, `cc`, `ce`, or `pe` as the preferred public URL contract unless PM explicitly chooses compact URLs later. Keep short codes for UI, icons, filters, and data classification.

## 6. Backward Compatibility Rule

Do not break existing dynamic routes during the transition.

The web app may support:

- legacy `non-language` routes;
- new `core`, `cec`, and `pe` route aliases;
- redirects from old routes to new routes later, when PM approves.

Until a migration plan is approved, existing route paths should continue working.

## 7. Recommended Future Clean Source Directory

When the project enters the later clean extraction phase, accepted source may be reorganized as:

```text
content/curriculum/
  pg/
    language/
    core/
    cec/
    pe/

  pk/
    language/
    core/
    cec/
    pe/

  k1/
    language/
    core/
      maths/
      graded-reading/
      world-exploration/
      safety-self-care/
      social-emotional/
    cec/
      art/
      music/
      lego/
      construction/
      cooking-food-exploration/
      drama/
      science-exploration/
      rhythm-movement/
    pe/

  k2/
    language/
    core/
      maths/
      graded-reading/
      world-exploration/
    cec/
      art/
      music/
      lego/
      construction/
      cooking-food-exploration/
      drama/
      science-exploration/
      rhythm-movement/
    pe/

  k3/
    language/
    core/
      maths/
      graded-reading/
      world-exploration/
      chinese-language/
    cec/
      art/
      music/
      lego/
      construction/
      cooking-food-exploration/
      drama/
      science-exploration/
      rhythm-movement/
    pe/
```

This is a future clean extraction target, not an instruction to migrate files immediately.

## 8. Recommended Data Model Direction

The old web contract uses `courseType` values such as:

```text
language
non-language
```

Future data should distinguish:

```text
programCategory: language | core | cec | pe
courseLine: math | graded-reading | art | music | science | ...
```

Suggested conceptual shape:

```ts
type ProgramCategory = "language" | "core" | "cec" | "pe";

type CourseLine =
  | "language"
  | "integrated-core"
  | "maths"
  | "graded-reading"
  | "world-exploration"
  | "chinese-language"
  | "safety-self-care"
  | "social-emotional"
  | "art"
  | "music"
  | "lego"
  | "construction"
  | "cooking-food-exploration"
  | "drama"
  | "science-exploration"
  | "rhythm-movement"
  | "pe";
```

This should be introduced through a deliberate web compatibility design, not through one-off edits.

## 9. Feedback Context Direction

Feedback should eventually record both the program category and the course line.

Examples:

```text
PG / Core / Unit 2
K2 / Core / Math / Unit 1 / Lesson 3
K2 / Core / Graded Reading / Unit 1 / Lesson 2
K2 / CEC / Art / Unit 1 / Lesson 1
K1 / Core / Safety & Self-Care / Unit 3 / Lesson 1
K3 / PE / Unit 4 / Lesson 2
```

The old `courseType: "non-language"` feedback context should remain readable for existing records, but future feedback payloads should be designed to support `programCategory` and `courseLine`.

## 10. Source Registry Rule

`ACCEPTED_SOURCE_REGISTRY.md` should begin recording future category placement.

When adding or revising accepted source entries, include category information where possible:

```text
Future Category: Language / Core / CEC / PE
Course Line: Math / Graded Reading / Art / etc.
Legacy Route: if still using non-language
Future Route: if known
```

This helps the later clean extraction avoid guessing how old `non-language` files should be reclassified.

## 11. Transition Principles

During active production:

1. Do not pause content production for a full migration.
2. Do not rename every folder immediately.
3. Do not break existing routes.
4. Start using the new categories in PM docs, planning docs, and new source-registration notes.
5. Let web engineering design compatibility before changing route/data contracts.
6. Use `non-language` as a legacy term only where existing files/routes still require it.
7. During clean extraction, map accepted source into the four-category structure.

## 12. Immediate Next Steps

Recommended next actions:

1. Update PM docs and accepted source registry to reference the four-category framework.
2. Ask web session to design a compatibility plan for `language | core | cec | pe` without breaking existing routes.
3. Ask content sessions to label new work by `Language`, `Core`, `CEC`, or `PE`.
4. Keep existing source files in place during active production.
5. Revisit clean `content/curriculum/` structure only when a clean extraction phase is approved.

## 13. Non-Goals

This document does not:

- rewrite any curriculum content;
- move any Markdown source files;
- change React routes immediately;
- change API/database fields immediately;
- mark PE as designed;
- decide the detailed structure of every future CEC course line.

It only defines the new top-level curriculum classification direction.
