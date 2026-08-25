# Session Progress Reporting

Status: Active  
Date: 2026-07-06

## 1. Purpose

This document defines how parallel Codex sessions should report progress back into the shared EASTIE project workspace.

It exists because PM cannot automatically know the latest state of other sessions unless those sessions write their progress into a shared project location.

Use this document whenever:

- a content session finishes a meaningful block of work;
- a frontend or backend session changes project state;
- a session creates a new rule, source structure, route, sync script, or data pipeline;
- a session hands work back to PM or to another implementation session.

## 2. Core Principle

Chat-only updates are not enough.

If progress matters for future sessions, it must be written into the shared project workspace.

## 3. Required Shared Locations

### Rule center

For stable rules and workflow documents:

`/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`

and the relevant file under:

`/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/`

### Project-level status board

For major stage changes:

`/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`

### Session update board

For ongoing work-in-progress reporting:

`/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_UPDATE_BOARD.md`

## 4. What Goes Where

### Update `SESSION_UPDATE_BOARD.md` when

- a session completes a meaningful work block but the change is not yet a stable rule;
- a session wants PM and sibling sessions to know the latest implementation status;
- work is still evolving and should be visible without rewriting `PROJECT_STATUS.md` every time.

Examples:

- graded reading content session finishes Unit 2 snapshots;
- frontend session wires a test page for one unit;
- backend session changes a local API contract but the rule is not yet formalized.

### Update `PROJECT_STATUS.md` when

- overall project coverage changes;
- a curriculum line becomes meaningfully more mature;
- a new dynamic route becomes active;
- a major workflow becomes stable;
- project priority changes.

Examples:

- PG Unit 9 becomes dynamically active;
- K non-language moves from content-only to first dynamic reference unit;
- graded reading becomes a recognized project line.

### Update `RULES_INDEX.md` when

- a new stable rule document is created;
- a stable process/handoff note is created;
- a session formalizes a writing or implementation standard.

## 5. Minimum Reporting Requirement For Each Session

At the end of a meaningful block, a session should write one concise update into `SESSION_UPDATE_BOARD.md`.

Minimum fields:

- Date
- Session area
- Work summary
- Files or folders changed
- Current status
- Next recommended step
- Risks / open questions

## 6. Reporting Format

Use this format:

```markdown
## YYYY-MM-DD — [Session Area]

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

Keep entries short and factual.

## 7. Graded Reading Special Rule

Because graded reading currently spans at least:

- a content-design session;
- a frontend session;
- PM coordination;

both the content session and the frontend session should write updates to `SESSION_UPDATE_BOARD.md`.

PM should then consolidate major milestone changes into `PROJECT_STATUS.md` when needed.

## 8. Frequency

Do not wait for a whole project phase to finish.

Update when:

- a reference unit is completed;
- a rule is locked;
- a source structure changes;
- a page becomes testable;
- a handoff to another session is required.

## 9. Important Boundaries

- Do not rely on memory across sessions.
- Do not rely on Downloads as a progress source.
- Do not assume PM has read another session’s chat.
- A user relaying progress manually is helpful, but should not be the only reporting path.

## 10. PM Operating Note

PM should treat `SESSION_UPDATE_BOARD.md` as the first place to check for recent cross-session work, and `PROJECT_STATUS.md` as the slower-moving high-level summary.
