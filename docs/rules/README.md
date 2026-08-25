# EASTIE Rule Registry

This folder stores active or candidate rule documents for the EASTIE curriculum project.

Use the project-level entrance file first:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md
```

## Folder Map

```text
rules/
├── curriculum/
│   ├── pg/
│   ├── pk/
│   ├── k1/
│   ├── k2/
│   └── k3/
├── web/
├── api/
└── process/
```

## Placement Rule

- Curriculum MD generation rules go under `curriculum/[level]/`.
- Frontend rendering, routes, sync, and data-contract rules go under `web/`.
- Backend auth, feedback, session, user, and API rules go under `api/`.
- Source-of-truth, handoff, versioning, and deployment workflow rules go under `process/`.

After adding a rule document, register it in:

```text
../RULES_INDEX.md
```

