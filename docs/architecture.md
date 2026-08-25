# EASTIE Curriculum Project Architecture

## Current Phase

This project is starting as a clean engineering workspace.

The curriculum source remains in the existing design workspace:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

This project will gradually become the production-oriented home for:

- frontend application;
- backend API;
- authentication;
- teacher feedback collection;
- deployment workflows;
- later, cleaned curriculum content.

## Workspace Roles

```text
content/
```

Reserved for future cleaned and locked curriculum source.

Currently empty by design.

```text
web/
```

Frontend application workspace.

Responsibilities:

- teacher-facing curriculum navigation;
- course pages;
- language switching;
- login UI;
- feedback UI;
- API integration;
- static asset hosting.

```text
api/
```

Backend application workspace.

Responsibilities:

- authentication;
- user accounts;
- roles and permissions;
- feedback storage;
- curriculum metadata endpoints;
- audit logs if needed.

```text
docs/
```

Project-level engineering documentation.

## Authentication Policy

Do not use Basic Auth for the future site.

The site should use app-level authentication.

The exact implementation may be decided later, but it should support:

- named user identity;
- role-based access;
- secure session or token handling;
- logout;
- feedback attribution by logged-in user;
- future admin access if needed.

## Current Data Flow

Short term:

```text
PG_PK_Language_Syllabus/
  -> visual reference and curriculum source
  -> structured data prototype in web/src/curriculum/data/
  -> dynamic frontend rendering
  -> teacher access
```

Future:

```text
eastie_curriculum_project/content/
  -> build/import pipeline
  -> web frontend
  -> api backend
  -> database
```

## Rule of Thumb

Design work stays in the curriculum design workspace until it is reviewed.

Production application work starts here.

Static curriculum HTML stays in the historical design workspace unless explicitly needed as a temporary reference artifact.
