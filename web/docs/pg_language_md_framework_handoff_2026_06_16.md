# PG Language MD Framework Handoff

Date: 2026-06-16  
Scope: PG language dynamic page source structure  
Primary framework:
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/07_design_final_notes/pg/language_courses/pg_language_course_framework_final.md

## Decision

Use the finalized dynamic language page as the display target, then standardize PG language markdown to feed that page directly.

This is the better direction than making the frontend keep adapting to each draft shape. The page style and section order are now stable enough; the content source should become precise and canonical.

## Web Expectations

PG language unit overview should provide:

- `Unit Focus`
- `YLE Support`
- `Unit Outcomes`
- `Not Yet`
- `Unit Language`
- `4-Week Progression Logic`

The web page generates the visible `4-Week Lesson Pack` from weekly lesson-frame files.

Blue chips should be limited to real language-list sections:

- `Unit Language`
- `Core Language`
- `New Language`
- `Recycled Language`
- `Teacher Input`

Vocabulary references in `YLE Support`, `Not Yet`, and `4-Week Progression Logic` should appear as prose with inline highlights, not as chip lists.

## Next Handoff

Send the framework to the curriculum design session and ask it to normalize:

/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/unit_layer_design/pg_unit_06_toys_and_space_unit_design_1_0.md

plus:

/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/week_layer_design/pg_unit_06_toys_and_space_weekly_mini_progression_1_0.md

and the four PG Unit 6 lesson-frame files in:

/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/lesson_layer_design/

After content normalization, run the PG language sync script and inspect:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run sync:pg-language-unit-06
npm run build
```

Then check:

- /curriculum/pg/language/unit-06
- Unit overview prose/chip boundaries
- 4-Week Lesson Pack
- Suggested Activity / Game cards
- No raw `｜` outside language chip sections
