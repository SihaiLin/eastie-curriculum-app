# Curriculum Dashboard Route Mapping Transition

**Status:** Approved transition rule  
**Last Updated:** 2026-08-18  
**Scope:** Current curriculum dashboard navigation, legacy route mapping, and future route contract preparation.

## 1. Purpose

This document records the approved mapping strategy for the redesigned EASTIE curriculum home / dashboard.

The dashboard information architecture is moving to:

```text
Grade
-> EL / CC / CE / PE
-> Course Line
-> Unit
```

However, the current working web app still has many stable routes under the older structure, especially:

```text
/curriculum/<level>/non-language/...
```

This document prevents two mistakes:

1. breaking current working pages by renaming routes too early;
2. forgetting the future route contract when creating the next clean site.

## 2. Current Version Rule

For the current site version, upgrade navigation semantics first and keep current routes.

That means:

- the curriculum home should display the new structure: `Grade -> EL / CC / CE / PE -> Course Line -> Unit`;
- course type and course line labels should come from `curriculum_course_type_catalog_v1.md`;
- available buttons should link to current working routes;
- current `/non-language/` routes must remain valid;
- do not create new `/core`, `/cec`, or `/pe` routes yet unless PM explicitly approves;
- do not add redirects yet;
- do not rename source folders or generated data only for route aesthetics.

The current site is an active review / production-support app. Stability is more important than perfect URL semantics at this stage.

## 3. Required Dashboard Mapping Fields

The dashboard config should preserve both current and future route knowledge.

Recommended conceptual shape:

```ts
type DashboardUnitLink = {
  level: "PG" | "PK" | "K1" | "K2" | "K3";
  unit: "UH" | "U1" | "U2" | "U3" | "U4" | "U5" | "U6" | "U7" | "U8" | "U9";
  courseTypeCode: "EL" | "CC" | "CE" | "PE";
  officialCourseTypeName: string;
  courseTypeShortName: string;
  officialCourseLineName: string;
  courseLineShortName: string;
  courseLineSlug: string;
  legacyRouteForUnit?: string;
  futureRoutePattern?: string;
  status: "available" | "not-ready" | "prototype" | "reference";
};
```

Implementation may use a different exact TypeScript shape, but it must preserve these ideas:

- category semantics;
- official names;
- UI short names;
- course line slugs;
- current route;
- future route direction;
- availability status.

## 4. Label Source Rule

Do not copy labels from sketches or temporary diagrams.

Use the approved naming catalog:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_course_type_catalog_v1.md
```

Examples:

| Do Not Use | Use |
|---|---|
| English Learning | English Language |
| Core Course | Core Courses |
| Country Exploring | World Exploration |
| Science | Science Exploration, unless using UI short name |
| Cooking | Cooking & Food Exploration, unless using UI short name |
| Physical Excercise | Physical Education |
| Vollyball | Volleyball |

UI short names may be used in compact dashboard rows and buttons, but formal headings and source documents should use official names.

## 5. Current Route Mapping Examples

Use current working route families for links.

Examples:

| New Dashboard Meaning | Current Link Target |
|---|---|
| PG / EL / English Language / U2 | `/curriculum/pg/language/unit-02` |
| PK / EL / English Language / U2 | `/curriculum/pk/language/unit-02` |
| K2 / EL / English Language / U1 | `/curriculum/k2/language/unit-01` |
| PG / CC / Integrated Core / U2 | `/curriculum/pg/non-language/unit-02` |
| PK / CC / Integrated Core / U8 | `/curriculum/pk/non-language/unit-08` |
| K2 / CC / Maths / U1 | `/curriculum/k2/non-language/unit-01/course-a` |
| K2 / CC / Graded Reading / U1 | `/curriculum/k2/non-language/unit-01/course-b` |
| K2 / CE / Creative Expression or Art / U1 | existing route only if active; otherwise disabled |

If no current working route exists:

- disable the unit button;
- mark it `not ready`, `coming later`, or equivalent;
- do not create a broken link;
- do not invent a route.

## 6. Future Route Contract Direction

When building the next clean site or route contract, use readable route categories rather than the short UI codes.

Recommended future route families:

```text
/curriculum/<level>/english-language/unit-XX
/curriculum/<level>/core/<course-line>/unit-XX
/curriculum/<level>/creative-enrichment/<course-line>/unit-XX
/curriculum/<level>/physical-education/<course-line>/unit-XX
```

Examples:

```text
/curriculum/k2/english-language/unit-01
/curriculum/k2/core/maths/unit-01
/curriculum/k2/core/graded-reading/unit-01
/curriculum/k2/core/world-exploration/unit-01
/curriculum/k2/creative-enrichment/art/unit-01
/curriculum/k2/creative-enrichment/science-exploration/unit-01
/curriculum/k2/physical-education/basketball/unit-01
```

Do not use short codes such as `el`, `cc`, `ce`, or `pe` as the preferred public URL contract unless PM explicitly chooses compact URLs later.

Reason:

- full route slugs are more readable;
- they are easier for teachers and managers to understand;
- the short codes remain useful for UI, icons, filters, and data classification.

## 7. Future Migration Rule

The future migration should happen deliberately, not through one-off route edits.

Recommended later sequence:

1. preserve the current dashboard config as the bridge;
2. replace `legacyRouteForUnit` resolver with a future route resolver;
3. add new readable routes;
4. verify every route against generated data and accepted source;
5. add redirects from old `/non-language/` routes only after the new routes are proven stable;
6. update feedback context to include future category and course line;
7. update deployment docs and route inventory.

Do not remove legacy routes until:

- PM approves the migration;
- the new route family is tested;
- deployment session confirms redirects / compatibility;
- route inventory is updated.

## 8. Curriculum Home Implementation Rule

The curriculum home should be grade-aware.

It should:

- show grades: PG, PK, K1, K2, K3;
- show only course lines that belong to the selected grade;
- show course types: EL, CC, CE, PE;
- use UI short names where space is limited;
- use official names in tooltips, expanded labels, or accessible labels where helpful;
- show `UH` and `U1`-`U9` buttons where relevant;
- make available routes clickable;
- disable unavailable routes.

It should not:

- show all K course lines under PG or PK;
- show Chinese Language for levels where it is not defined;
- show broken links;
- treat the wireframe wording as source of truth;
- rename current routes while implementing the home page.

## 9. Required Checks Before Completion

For any dashboard implementation:

1. Grade selector changes visible course lines.
2. PG/PK do not show K-only Core lines such as Maths or Graded Reading.
3. K3 shows Chinese Language under CC.
4. Course labels match `curriculum_course_type_catalog_v1.md`.
5. Available buttons route to existing working pages.
6. Unavailable buttons are disabled.
7. Existing `/non-language/` routes still open.
8. No new `/core`, `/cec`, or `/pe` routes are introduced without PM approval.
9. Mobile layout remains usable.
10. Build passes.

## 10. Files To Read Before Editing Dashboard Routes

Before changing curriculum dashboard navigation or route mapping, read:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_course_type_catalog_v1.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md
```
