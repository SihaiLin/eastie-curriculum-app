# Accepted Source and Clean Extraction Policy

**Status:** Review  
**Last Updated:** 2026-08-17  
**Scope:** EASTIE curriculum source management during active production and later cleanup.

## 1. Purpose

This policy defines how EASTIE should manage curriculum source files while content is still being produced across multiple sessions.

The current project intentionally has mixed working locations:

- older curriculum workspaces;
- newer `06_curriculum_design/` folders;
- generated web snapshots;
- experimental course-line workspaces;
- historical archive files.

This is acceptable during active production. The project should not pause curriculum writing just to force every source file into one clean directory too early.

## 2. Current Principle

During the current production stage:

```text
produce content first;
record accepted sources clearly;
delay full clean migration until the main content body is complete.
```

This means:

- do not treat mixed source locations as an emergency;
- do not edit generated TypeScript as curriculum source;
- do not move large batches of source files unless a specific migration task is approved;
- do keep a clear record of which files are accepted and which files are drafts, prototypes, or archives.

## 3. Source Types

### Working Source

Files actively edited by curriculum sessions. These may live in:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus/
```

Working source may be messy while a line is still developing.

### Accepted Source

Files that the PM/content owner has accepted as the current usable source for a unit, course line, or web page.

Accepted source must be listed in:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md
```

### Generated Web Snapshot

Files generated for the React app, usually under:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/
```

Generated snapshots are not editable curriculum source.

### Clean Canonical Source

Future cleaned source location after the major content body is finished:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/content/curriculum/
```

Do not use this as a dumping ground. Only move reviewed and accepted files here during an approved clean extraction / migration phase.

## 4. Accepted Source Registry Rule

Whenever a curriculum session finalizes a unit, course line, translation package, or resource mapping that should be reused later, it should add or request a PM update to:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md
```

Each entry should include:

- level;
- track;
- unit or course line;
- language mode if relevant;
- accepted source path;
- web route or generated output if available;
- current status;
- notes / risks.

The registry does not need every draft. It should list only content that may become part of future clean migration or frontend generation.

## 5. Clean Extraction Phase

After the main content body is complete, run a deliberate clean extraction phase.

The clean extraction should:

1. read the accepted source registry;
2. copy only accepted source files;
3. exclude drafts, zip handoffs, deprecated HTML, generated TypeScript, and archive files;
4. normalize paths under `content/curriculum/`;
5. rerun sync scripts from the clean source;
6. compare generated output against current dynamic pages;
7. run `npm run build`;
8. update PM docs and deployment notes.

## 6. What Not To Do Now

Do not:

- bulk-migrate every historical file;
- edit generated TypeScript to fix curriculum wording;
- delete old workspace files just because they look messy;
- copy Downloads content directly into production source;
- promote an experimental course-line folder into clean canonical source without review;
- start a new folder convention for one course line without PM approval.

## 7. Recommended Session Behaviour

At the end of each meaningful work block, sessions should report:

```text
Accepted source created/updated:
Path:
Status:
Should this be added to ACCEPTED_SOURCE_REGISTRY.md? yes/no
Generated web output affected: yes/no
Notes:
```

If the answer is `yes`, either update the registry directly or ask the PM session to do it.

## 8. Relationship To Other Documents

This policy works with:

- `RULES_INDEX.md`
- `SESSION_UPDATE_BOARD.md`
- `PROJECT_STATUS.md`
- `DYNAMIC_PAGE_INVENTORY.md`
- `content_source_policy.md`

`content_source_policy.md` explains current source-of-truth boundaries. This policy adds the transition strategy: accepted-source registration now, clean extraction later.
