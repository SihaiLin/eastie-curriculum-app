# Versioning and Change Recording

**Status:** Active  
**Last updated:** 2026-08-27  
**Scope:** Git, session updates, release notes, and production version tags for the clean EASTIE curriculum app repo.

## 1. Current Main Repo

The active development repo is:

```text
/Users/Lucia/Desktop/eastie_curriculum_app/
```

The old project is historical reference only:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/
```

Do not treat the old project as the main development repo unless PM explicitly says so.

## 2. What Every Frontend Session Should Read

Before frontend/web work, read:

```text
/Users/Lucia/Desktop/eastie_curriculum_app/docs/RULES_INDEX.md
/Users/Lucia/Desktop/eastie_curriculum_app/docs/DYNAMIC_PAGE_INVENTORY.md
/Users/Lucia/Desktop/eastie_curriculum_app/docs/SESSION_UPDATE_BOARD.md
/Users/Lucia/Desktop/eastie_curriculum_app/docs/rules/process/versioning_and_change_recording.md
```

If the task touches deployment or production behavior, also read:

```text
/Users/Lucia/Desktop/eastie_curriculum_app/docs/deployment.md
/Users/Lucia/Desktop/eastie_curriculum_app/docs/releases/README.md
```

## 3. Daily Change Record

After any meaningful frontend/API/docs work block, update:

```text
/Users/Lucia/Desktop/eastie_curriculum_app/docs/SESSION_UPDATE_BOARD.md
```

Use this for local-only work, review-ready changes, deployed changes, and follow-up notes.

Recommended entry shape:

```markdown
## YYYY-MM-DD — Web

### Completed
- ...

### Files / Paths
- ...

### Current Status
- ...

### Next Step
- ...

### Risks / Notes
- ...
```

Always say whether the change is:

- local only;
- committed but not deployed;
- deployed and verified;
- blocked or waiting for PM review.

## 4. Release Notes

Production release notes live in:

```text
/Users/Lucia/Desktop/eastie_curriculum_app/docs/releases/
```

Create a release note only after a production deployment is completed or when PM explicitly establishes a production baseline.

Do not create a release note for ordinary local-only work.

## 5. Version Format

Use this production version format:

```text
vYYYY.MM.DD-rN
```

Example:

```text
v2026.08.27-r1
```

`rN` means the nth production release on that date.

If multiple production releases happen on the same date, increment `rN`:

```text
v2026.08.27-r2
v2026.08.27-r3
```

## 6. Production Release Requirements

Every production deployment should have:

- a Git commit;
- a Git tag;
- a release note;
- a deployment verification record.

The release note should summarize:

- status;
- scope;
- files or system areas affected;
- verification summary;
- known limitations;
- next release rule or follow-up.

## 7. Git Rules For This Repo

Codex sessions should create local commits when asked to preserve work in Git.

Do not push from command line unless PM explicitly asks for it in that session.

The user/PM currently handles GitHub push manually, usually through GitHub Desktop.

Before committing:

- run `git status --short --branch`;
- review changed files;
- avoid committing unrelated or accidental files;
- confirm whether build/test checks are needed for the change type.

After committing:

- report commit hash;
- report tag hash if a tag was created;
- report whether the working tree is clean;
- report how far local `main` is ahead of `origin/main`.

## 8. Frontend Build/Test Reporting

For frontend changes, report whether this was run:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_app/web
npm run build
```

If not run, say why.

For API changes, report relevant API build/test commands and results.

## 9. Resource And Generated Data Notes

Do not add the full `web/public/curriculum-resources/` tree to Git.

Resource files are handled as scoped server resources or external resource storage.

Generated curriculum TypeScript snapshots may be committed when needed for runtime rendering, but they are runtime snapshots, not hand-edited source.

Do not edit generated curriculum TS by hand unless PM explicitly approves an emergency patch.

