# Content Source Policy

## Source of Truth

The current curriculum source of truth is:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

The new clean project is:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/
```

## Current Rule

Do not migrate curriculum source yet.

The `content/` folder in this project is intentionally empty until the curriculum source is cleaned and locked.

## What Can Be Imported Now

Allowed:

- structured data files created specifically for dynamic frontend testing;
- selected static assets such as logos or images;
- stable manifests written specifically for the web app;
- documentation that describes integration.

Not allowed:

- unfinished markdown drafts;
- old phase files;
- rejected versions;
- archive folders;
- temporary downloads;
- unreviewed translations;
- generated pages without known source context.
- copied static lesson/unit HTML as production content.

## Downloads Rule

Downloads is never a source of truth.

If a file arrives through Downloads:

1. Review it.
2. Copy it into the relevant design workspace if it belongs to curriculum content.
3. Import only reviewed outputs into this project.

## Future Migration Rule

When curriculum content is ready to move into this project, create a migration plan first.

The plan should list:

- exact source folders;
- exact destination folders;
- files to include;
- files to exclude;
- naming rules;
- translation rules;
- build/import implications.
