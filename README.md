# EASTIE Curriculum Project

This is the clean engineering workspace for the EASTIE curriculum website and future backend services.

Current project role:

```text
content/  = reserved for future cleaned and locked curriculum source
web/      = frontend application workspace
api/      = backend application workspace
docs/     = architecture, deployment, and data-flow documentation
```

## Current Content Source

The curriculum design source of truth has not yet moved into this project.

Current source of truth remains:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

That folder name is historical. It now functions as the full EASTIE curriculum design workspace for PG, PK, K1, K2, and K3.

## Important Policy

Do not copy unfinished curriculum drafts into `content/`.

For now, `content/` stays intentionally empty except for its README.

Only reviewed generated assets or stable prototypes should be imported into `web/` when needed.

Updated direction:

```text
web/ should be dynamic-first.
Static curriculum HTML pages stay in the historical design workspace as references.
Do not copy static lesson/unit HTML pages into the new web project as production content.
```

## Authentication Direction

The future site should not use Basic Auth.

Authentication will be designed as a proper app-level login system with user identity, roles, sessions or tokens, and backend-backed feedback collection.

See:

```text
docs/architecture.md
docs/content_source_policy.md
docs/dynamic_app_structure.md
api/docs/auth_design.md
api/docs/feedback_api_design.md
```
