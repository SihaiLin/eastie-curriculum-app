# Dynamic App Structure

## Decision

The clean engineering project will be dynamic-first.

Static curriculum HTML pages should remain in the historical curriculum design workspace:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

Do not copy static curriculum pages into this project as primary app content.

They may be used as visual references only.

## Target Architecture

```text
curriculum source / reviewed markdown
        ↓
structured JSON / API data
        ↓
frontend route + reusable components
        ↓
teacher-facing dynamic pages
        ↓
feedback API
```

## Frontend App Responsibility

The frontend should render curriculum pages from structured data.

It should not maintain one HTML file per lesson.

Expected dynamic page types:

```text
LevelDashboard
UnitOverview
CourseTrackPage
LessonDetail
FeedbackPanel
AdminCurriculumDashboard
```

## Recommended First Dynamic Prototype

Start with:

```text
PK Non-Language Unit 8
```

Reason:

- newest structure;
- cleanest source;
- Unit Overview + 8 Course Tracks are already established;
- feedback button pattern already exists in the static reference;
- bilingual display requirements are known.

## Static Reference Pages

Use these only as visual / content references:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/pk_unit_08_nature_weather_animals_site/pk/non_language_course.html
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/unit_08_nature_weather_animals_site/pg/non_language_course.html
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/unit_06_toys_and_space_site/
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/00_project_management/curriculum_dashboard.html
```

## Data Strategy

Short term:

```text
web/src/curriculum/data/
```

may contain hand-built or script-generated JSON for the first dynamic prototype.

Long term:

```text
content/ or api/
```

should provide structured curriculum data after source content is cleaned and locked.

## Do Not

- Do not copy old static curriculum sites into `web/public/`.
- Do not create one React page per lesson.
- Do not make static HTML the production source.
- Do not migrate unfinished markdown into `content/`.
- Do not implement Basic Auth.

