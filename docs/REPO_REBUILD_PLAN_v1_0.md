# Repo Rebuild Plan v1.0

**Status:** Draft plan for clean repository rebuild  
**Date:** 2026-08-25

## 1. Purpose

- Create a new clean Git repo to carry the current EASTIE curriculum web/API project forward without inheriting the full history of prototype-era files, temporary exports, and large generated resource baggage.
- Keep the current `/Users/Lucia/Desktop/eastie_curriculum_project/` workspace as the historical working project and transition reference.
- Preserve the old project as a historical source of truth for comparison, QA, and selective copy-forward, rather than trying to reorganize it in place.
- Reduce risk during future maintenance by separating:
  - active application code;
  - controlled docs and rules;
  - runtime/deployment scripts;
  - large curriculum resource assets;
  - generated snapshots and temporary artifacts.

## 2. Proposed New Repo

- Suggested repo name: `eastie-curriculum-clean`
- Suggested local path: `/Users/Lucia/Desktop/eastie_curriculum_clean/`
- Suggested relationship to current GitHub repo: keep it separate unless PM explicitly decides to preserve the current remote identity.
- Recommendation: create a new GitHub repo for the clean rebuild rather than force-reusing the old repository history.
- Rationale:
  - the current repo history likely includes prototype-only structures and large files that should not define the new baseline;
  - a fresh repo makes the launch scope and first stable tag much easier to understand;
  - future releases can be traced against a clean initial commit instead of a mixed historical lineage.

## 3. Include Scope

The following should enter the new repo if they are required for launch or ongoing maintenance:

- web app code
  - React/Vite frontend source;
  - route components;
  - shared UI components;
  - manifest-driven curriculum lookup logic;
  - sync helpers that produce or register runtime-ready curriculum snapshots.
- api code
  - auth/session code;
  - feedback API code;
  - database migration/runtime helpers;
  - deployment-facing server entry points.
- docs / rules
  - launch rules;
  - process rules;
  - web rules;
  - API rules;
  - migration and handoff docs needed to operate the clean repo.
- scripts
  - build helpers;
  - sync scripts;
  - validation scripts;
  - release or packaging scripts that are part of the normal workflow.
- package files
  - `package.json`;
  - lockfiles;
  - workspace/package config needed to build and run the app.
- deployment runbook
  - current server topology;
  - build/deploy steps;
  - route ownership;
  - verification checklist.
- public resource manifests or lightweight indexes if needed
  - resource manifests;
  - route-to-resource index files;
  - small metadata files that let the app resolve resources without copying the full asset library into the repo.

## 4. Exclude Scope

The following should stay out of the clean repo unless PM explicitly approves a narrow exception:

- `8GB curriculum-resources`
- `node_modules`
- production SQLite DB
- server backups
- historical curriculum workspace
- Downloads files
- `.tmp` backups
- generated temporary reports
- `curriculum_release/` unless PM explicitly decides otherwise

Additional exclusion guidance:

- do not add build outputs such as `dist/` unless a specific release artifact workflow requires them;
- do not add raw production server copies;
- do not add one-off exports that are not part of the normal source workflow.

## 5. Large Resource Strategy

The large resource set should be treated as a separate distribution problem, not a normal Git tracking problem.

- `web/public/curriculum-resources/` should not be copied into the clean repo as a full payload if it remains large or frequently changing.
- Prefer one of these patterns depending on the resource type:
  - server directory on production or staging;
  - object storage with public path mapping;
  - scoped sync for only the routes or units currently being released;
  - manifest-only repo entries that describe what exists and where it lives.
- Recommended default:
  - keep resource manifests, path indexes, and sync instructions in the repo;
  - keep the bulk binary/library assets outside the repo;
  - sync only the minimum required resource subset for each release.
- If a resource must be versioned for release traceability, store a lightweight manifest entry, checksum list, or path map instead of the full resource tree.

## 6. Curriculum Source Strategy

- The current curriculum source should not all be migrated at once.
- Treat the historical curriculum workspace as the primary source reservoir until PM approves a narrower clean-source baseline.
- `curriculum_release/`:
  - recommended default: exclude from the clean repo at first;
  - only include if PM explicitly wants it to become the release-facing source bundle.
- Generated TS:
  - should be treated as build-time or sync-time snapshot output;
  - include only if the repository needs them for runtime bootstrapping or for traceable release comparison;
  - avoid making generated files the canonical editable source.
- Future clean content source path:
  - start with the currently live web/API essentials;
  - add only the canonical markdown/source folders that PM has approved;
  - migrate units or course lines incrementally, not all at once;
  - register each accepted source addition explicitly.

## 7. Migration Steps

Recommended migration sequence:

1. Create a new clean directory for the repo.
2. Copy only the approved web, API, docs, and scripts folders.
3. Add a repo-specific `.gitignore` before any first commit.
4. Install dependencies with `npm install` or the project-equivalent package manager command.
5. Run build and test commands for both web and API.
6. Start the app locally and verify the key routes.
7. Compare the clean repo behavior with the currently live production version.
8. Make the first commit only after the repo passes basic build and smoke checks.
9. Create a first tag such as `v1.0-clean-base` after the initial validated baseline is confirmed.

Recommended copy set for the first pass:

- `web/` source needed to build the app;
- `api/` source needed to run the backend;
- `docs/` files that define rules, process, and deployment;
- `scripts/` needed for build/sync/validation;
- package manifests and lockfiles;
- minimal resource manifests or indexes if runtime needs them.

## 8. Validation Checklist

The clean repo should not be considered ready until the following pass:

- web build
  - `npm run build` or equivalent succeeds for the frontend;
  - generated assets match the expected output shape.
- api build/test
  - API builds successfully;
  - smoke tests or unit tests pass;
  - session and feedback flows are intact.
- login
  - login page loads;
  - auth flow completes;
  - logout clears session state.
- curriculum routes
  - representative grade/program routes resolve;
  - dynamic manifests load correctly;
  - no route regressions in the baseline set.
- feedback
  - feedback create/list/status update paths work as expected.
- resources
  - required public resources resolve;
  - any manifest-backed resource links return usable paths;
  - scoped sync behaves as intended.
- deployment dry-run
  - the release package can be assembled without missing paths;
  - the deployment runbook still matches the actual server topology.

## 9. Risks / PM Decisions

The following items need PM confirmation before the clean repo can be finalized:

- Whether this should become a new GitHub repo or remain tied to the current remote identity.
- Whether `docs/` is fully included or only the stable rule/runbook subset.
- Whether generated curriculum data belongs in the clean repo or remains external snapshot output.
- Whether `curriculum_release/` is part of the new repo baseline or remains outside until a later phase.
- How the resource library should be handled:
  - full external server/object storage;
  - scoped sync only;
  - manifest-only in repo;
  - hybrid approach.

Open implementation risks:

- large resource volume may make the repo slow or fragile if copied in whole;
- generated files may blur the line between source and build output if not classified clearly;
- historical working files may be accidentally reintroduced during copy-forward unless the include/exclude list is enforced.

## Recommended Decision Summary

- New clean repo: yes.
- Keep old repo/workspace: yes, as historical reference.
- Full resource library in repo: no.
- `curriculum_release/` in repo: only if PM explicitly approves.
- Generated curriculum snapshots in repo: only if needed for runtime/bootstrap or agreed traceability.

