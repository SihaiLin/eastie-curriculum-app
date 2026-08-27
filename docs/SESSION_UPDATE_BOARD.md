# EASTIE Session Update Board

Purpose: this is the shared cross-session progress board for active work that is important enough to preserve, but not yet stable enough to belong only in `PROJECT_STATUS.md`.

Read this before asking:

- what another session recently completed;
- what is currently in progress;
- what should be picked up next.

## How To Use

- Add one short entry after a meaningful work block.
- Keep updates factual and compact.
- If a new stable rule was created, also update `RULES_INDEX.md`.
- If project maturity or priority changed, also update `PROJECT_STATUS.md`.

### Recommended Graded Reading Entry Template

Use this when a graded reading content session or graded reading frontend session reports progress:

```markdown
## YYYY-MM-DD — Graded Reading [Content|Web]

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

Typical useful items include:

- resource cleanup completed;
- credits/covers status;
- lesson-plan or unit-design milestone;
- resource manifest / page integration milestone;
- whether work is still in working format or is ready for canonicalization.

---

## 2026-08-25 — Deployment

### Completed
- Fixed production HTTPS certificate expiration for `eastie.sihai.space`.
- Confirmed old TrustAsia certificate expired on `2026-08-24 23:59:59 GMT`.
- Backed up previous Nginx config and SSL files.
- Installed Certbot and issued a new Let's Encrypt certificate for `eastie.sihai.space`.
- Certbot updated Nginx to use `/etc/letsencrypt/live/eastie.sihai.space/fullchain.pem` and `privkey.pem`.
- Verified HTTPS `/login`, `/curriculum/`, and `/api/health` return 200.
- Verified `certbot renew --dry-run` succeeds.
- Enabled `certbot-renew.timer` for automatic renewals.

### Files / Paths
- Backup directory: `/root/eastie_release_backups/20260825_131210_ssl`
- New certificate: `/etc/letsencrypt/live/eastie.sihai.space/fullchain.pem`
- New key: `/etc/letsencrypt/live/eastie.sihai.space/privkey.pem`
- Nginx config: `/etc/nginx/conf.d/eastie.sihai.space.conf`

### Current Status
- HTTPS is restored.
- Current certificate issuer: Let's Encrypt `YE2`.
- Certificate validity: `2026-08-25 04:14:42 GMT` to `2026-11-23 04:14:41 GMT`.
- Auto-renew timer is active; next scheduled run is `2026-08-26 03:49:55 CST`.

### Next Step
- User should refresh Chrome or reopen the page if the previous certificate warning is cached.

### Risks / Notes
- The old downloaded `eastie.sihai.space_nginx.zip` certificate is expired and should not be reused.

## 2026-08-23 — Deployment

### Completed
- Deployed the email-code login frontend/API candidate to production and configured SMTP env from PM-provided values.
- Imported `/root/eastie_private/eastie_directory.xlsx` allowlist with `DISABLE_UNLISTED_EASTIE_USERS=true`.
- Verified local API tests and builds before deploy.
- Verified `/login` serves the new email-code page and hashed assets return 200.
- Fixed API crash on SMTP send failure by catching login-code email errors and returning JSON 502 instead of letting the process exit.
- After SMTP was enabled for `sihai@eastie.com.cn`, verified production email-code request returns 200.
- Verified Sihai email-code login succeeds and returns `role: admin`, `status: active`.
- Verified admin feedback API access succeeds with Sihai session.
- Verified logout revokes session and `/api/auth/me` returns 401 afterward.

### Files / Paths
- API target: `/opt/eastie-curriculum-api`
- Frontend target: `/var/www/eastie-curriculum-app`
- Legacy hashed assets target: `/var/www/eastie.sihai.space/assets`
- Directory workbook on server: `/root/eastie_private/eastie_directory.xlsx`
- Backup directory: `/root/eastie_release_backups/20260823_174736_email_login`

### Current Status
- Email-code login is live and verified for Sihai admin.
- API service is active and `/api/health` returns 200.
- Unknown email request correctly returns 403.
- `/login`, `/curriculum/`, `/admin/feedback`, and new hashed frontend assets return 200.

### Next Step
- Decide whether to disable the 8 legacy non-`@eastie.com.cn` temporary accounts now that Sihai email-code admin login is proven.
- PM/frontline users should test at least one teacher mailbox from the imported allowlist.

### Risks / Notes
- The earlier SMTP error was resolved by enabling SMTP on the Sihai enterprise mailbox.
- The imported allowlist has 23 active `@eastie.com.cn` users, including Sihai admin.
- Legacy `@eastie.space` users remain active for now: Ada, Coco, Eva, Felina, Jackie, Lucia, Nina, Sihai.

## 2026-08-23 — Deployment

### Completed
- Completed PM-confirmed small-scope production release.
- Built current `web` and `api`.
- Backed up production frontend, API, SQLite DB, and Nginx config before upload.
- Deployed frontend runtime files only: `web/dist/index.html` and `web/dist/assets/`.
- Deployed current API code to `/opt/eastie-curriculum-api`, preserved production SQLite DB, ran production install, and restarted `eastie-curriculum-api`.
- Scoped resource sync completed for K2 Unit 1 Power Up and K3 Unit 9 Graded Reading resources.
- Fixed scoped resource file permissions after initial 403s.
- Verified target routes, auth/logout, feedback create/list/status patch, and representative resource links.
- Rechecked all scanned target resources: K2 Unit 1 `57/57` OK, Power Up resources `57/57` OK, K3 Unit 9 `98/98` OK.
- Fixed post-release `/curriculum/` white-screen issue by copying the new hashed JS/CSS assets into the Nginx-served legacy asset directory.

### Files / Paths
- Backup directory: `/root/eastie_release_backups/20260823_134445`
- Frontend target: `/var/www/eastie-curriculum-app`
- API target: `/opt/eastie-curriculum-api`
- SQLite preserved: `/var/lib/eastie-curriculum-api/eastie.sqlite`
- Resource targets:
  - `/var/www/eastie-curriculum-app/curriculum-resources/power-up/k2/unit-01`
  - `/var/www/eastie-curriculum-app/curriculum-resources/raz/k-graded-reading/k3-u09`
  - `/var/www/eastie-curriculum-app/curriculum-resources/raz-covers/k-graded-reading`
- Nginx-served hashed app assets:
  - `/var/www/eastie.sihai.space/assets/index-B-FhDnfA.js`
  - `/var/www/eastie.sihai.space/assets/index-BrNwCG03.css`

### Current Status
- Production small-scope release is live.
- API service is active and Nginx config test passes.
- Target resources are production-accessible.
- `/curriculum/` HTML and its referenced hashed JS/CSS now return 200.

### Next Step
- PM/frontline user should do browser QA on real lesson pages and resource player/download interactions.
- If QA passes, create a git freeze commit/tag or release note so this production state is traceable.

### Risks / Notes
- `web/dist` is `9.5G` because Vite copies all public resources; deployment intentionally did not upload full dist resources.
- Frontend bundle still has a large chunk warning.
- Local working tree remains dirty; source-content folders were not deployed.
- Production smoke feedback item was created and marked `reviewed`.
- Deployment runbook should keep the extra asset merge step because current Nginx serves `/assets/index-*.js/css` from `/var/www/eastie.sihai.space/assets`, not only from `/var/www/eastie-curriculum-app/assets`.

## 2026-08-23 — Deployment

### Completed
- Prepared release candidate freeze/resource dependency report without committing, uploading, or deploying.
- Grouped dirty working tree by area: API code, web app code, generated curriculum data, docs, content curriculum, curriculum_release, and other.
- Scanned target launch routes for `/curriculum-resources/` dependencies.
- Compared target route resource dependencies against local files and production URLs.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/raz/k-graded-reading/k3-u09`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/raz-covers/k-graded-reading`
- Resource scan artifacts: `/tmp/eastie-route-resource-refs.json`, `/tmp/eastie-prod-resource-check.json`

### Current Status
- Do not deploy yet; release scope still needs PM confirmation.
- Target route scoped resources are locally present, but production is missing most of them.
- Minimal scoped resource sync for checked routes is about `284 MB`, not the full `8.2G` resource library.

### Next Step
- PM should confirm whether the release candidate includes K2 Unit 1 Power Up resources and K3 Unit 9 Graded Reading resources, then approve a scoped resource sync and git freeze/commit strategy.

### Risks / Notes
- K2 Unit 1 Power Up: 57 local resource refs, 0/57 available in production.
- K3 Unit 9 Graded Reading: 98 local resource refs, 16/98 available in production.
- PG U9, PK U9, `/login`, `/curriculum`, and `/admin/feedback` do not directly require `/curriculum-resources/` for the checked route data.
- `content/curriculum/` and `curriculum_release/` are heavily untracked and should stay out of this deployment unless PM explicitly expands scope.

## 2026-08-23 — Deployment

### Completed
- Completed launch-readiness checks without deploying.
- Verified `web` production build succeeds and outputs `web/dist/index.html` plus `web/dist/assets/`.
- Verified `api` build succeeds; local temp API smoke test passed for health, teacher login/logout, feedback create, admin feedback list, and admin status patch.
- Verified API feedback integration tests pass.
- Checked representative local SPA routes via Vite dev server.
- Checked production read-only endpoints and resource URL mismatch.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web`
- `/Users/Lucia/Desktop/eastie_curriculum_project/api`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources`
- Temp smoke DB: `/tmp/eastie-launch-check-20260823.sqlite`

### Current Status
- Code is locally buildable, but production deployment should wait for PM confirmation.
- Current local `web/public/curriculum-resources` is large (`8.2G`) and must be included in the deployment plan, not just `web/dist`.
- Production still serves older app assets and older Graded Reading resource names.

### Next Step
- Before deployment, decide whether to sync full `web/public/curriculum-resources` or a scoped subset, then backup current production app/static/resource paths and deploy frontend/API/resources together.

### Risks / Notes
- Local git working tree has many modified and untracked files; deployment scope should be confirmed before release.
- Frontend build has a large JS chunk warning (`~7.8 MB` minified).
- Local Power Up manifests reference resources correctly, but production `/curriculum-resources/power-up/.../resource-manifest.json` is currently 404.
- Example mismatch: local code references `/curriculum-resources/raz/k-graded-reading/k3-u09/d/my_new_school/level-d-my-new-school-book.pdf`, but production currently returns 404 for that URL while the older `/book.pdf` URL returns 200.

## 2026-08-23 — Next Sprint Direction After Release v0.1 Sample

### Completed
- Updated `NEXT_SPRINT_START_HERE.md` to reflect the current post-checkpoint strategy.
- `curriculum_release/` remains paused as the v0.1 release workspace sample complete after K1/K2 English and PG/PK Core sample extraction.

### Current Status
- Main work should now return to launch preparation and controlled curriculum content production.
- Future release extraction must use the agreed sequence: candidate scan, PM confirmation, copy, manifest trace, checkpoint.

### Next Step
- Deployment session: prepare and run launch checklist for frontend, API, login, SQLite, feedback, resource paths, active routes, mobile sanity, and rollback.
- Content sessions: continue producing accepted source packages for PG/PK Language and K Core / CEC course lines, with source registration as needed.

### Risks / Notes
- Do not bulk-copy historical workspaces into `curriculum_release/`.
- Do not treat generated TypeScript as curriculum source.
- Do not expand release extraction until PM names an explicit package.

---

## 2026-08-23 — Curriculum Release Phase 5 Checkpoint

### Completed
- Verified the v0.1 release workspace sample after Phase 5: 97 manifest rows have complete required fields, unique release paths, and existing release/source files.

### Current Status
- Release extraction is paused after five validated packages; the workspace is ready for later scope-controlled additions.

### Next Step
- Resume only through the agreed sequence: explicit scope, candidate scan, PM confirmation, copy, and checkpoint.

---

## 2026-08-23 — Curriculum Release Extraction Phases 1–4 Checkpoint

### Completed
- Created the root-level `curriculum_release/` snapshot and extracted four PM-approved sample packages without moving or altering historical sources.
- Verified two K Language unit-centric packages: K1 Unit 1 (22 files) and K2 Unit 1 (21 files).
- Verified the Core Courses release structure with PG Unit 8 (18 English/zh-CN files; documented legacy bilingual-label exception) and PK Unit 8 (18 English/zh-CN files; clean reference sample).
- Ran a manifest audit: all 79 rows have required fields, unique release paths, existing release files, and existing original source paths.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/curriculum_release/`
- `/Users/Lucia/Desktop/eastie_curriculum_project/curriculum_release/RELEASE_MANIFEST.csv`
- `/Users/Lucia/Desktop/eastie_curriculum_project/curriculum_release/README.md`

### Current Status
- The release workspace structure is validated across K Language and PG/PK Core Courses, including a zh-CN mirror package and a documented historical-format exception.
- `curriculum_release/` remains a read-only canonical snapshot; copied curriculum Markdown remains byte-identical to its source.

### Next Step
- Perform a candidate scan for PM-approved Phase 5: PG Unit 9 Core Courses, as a newer English-only Core reference sample.

### Risks / Notes
- Do not treat the release snapshot as a teacher-edit workspace; SQLite remains the approved direction for user-scoped edits.
- Continue copy-only extraction with one manifest row per file.

---

## 2026-08-21 — Teacher Edits SQLite Direction Approved

### Completed
- Decided that teacher-edited curriculum content should be stored in SQLite, not as long-term per-teacher MD files.
- Clarified that `curriculum_release/` is a read-only canonical release snapshot.
- Added an API rule draft for user-scoped teacher content edits.
- Updated the release workspace rule so website edits cannot write back into release MD files.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/api/teacher_content_edits_sqlite.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_release_workspace_structure.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`

### Current Status
- Approved live architecture:
  `curriculum_release/` = canonical read-only source;
  SQLite = source of truth for user-scoped teacher edits.
- `teacher_workspace/users/...` is not part of the live architecture.

### Next Step
- Backend session can later implement `teacher_content_edits` schema and minimal edit APIs.
- Frontend session can later implement canonical + user override rendering and edit UI.

### Risks / Notes
- SQLite backup path and production database location must be documented before public use.
- Teacher edits do not automatically become shared or canonical content; promotion requires a future PM/admin review flow.

---

## 2026-08-21 — Curriculum Release Workspace Structure Approved

### Completed
- Approved a root-level clean release workspace strategy for launch preparation.
- Decided not to clean, move, or rename historical workspaces during the current launch window.
- Created a reusable structure rule for `curriculum_release/`.

### Files / Paths
- Release workspace target:
  `/Users/Lucia/Desktop/eastie_curriculum_project/curriculum_release/`
- Structure rule:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_release_workspace_structure.md`
- Rule index:
  `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`

### Current Status
- `curriculum_release/` is the planned clean active snapshot for near-term launch content.
- The rule is approved, but content extraction has not started in this step.
- Historical source folders remain untouched.

### Next Step
- Create the actual `curriculum_release/` folder scaffold and begin copying only active / accepted content with manifest tracking.

### Risks / Notes
- Copy files only; do not move originals.
- Every release file should have source trace in `RELEASE_MANIFEST.csv`.
- Copying files into `curriculum_release/` does not automatically change what the web app renders.

---

## 2026-08-19 — K1 Unit 1 Unit-Centric Actual Page Integration

### Completed
- Connected the rebuilt K1 Unit 1 unit-centric MD package to the actual K Language route instead of only the standalone preview route.
- Regenerated `/curriculum/k1/language/unit-01` data from `00_unit.md` plus `days/day_01.md` through `day_20.md`.
- Updated the K Language renderer so Circle Time, Phonics, Story, Activities, and unit-centric language fields display from generated lesson fields when present.

### Files / Paths
- Source root: `/Users/Lucia/Desktop/eastie_curriculum_project/content/curriculum/k-language-unit-centric-v0_1/k1/unit_01_friends_and_family/`
- Sync script: `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k1-language-unit-01-unit-centric.mjs`
- Generated actual page data: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k1LanguageUnit01.ts`
- Renderer: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitPage.tsx`
- Actual route: `http://127.0.0.1:5173/curriculum/k1/language/unit-01/pu-l1`

### Current Status
- `npm run sync:k1-language-unit-01:unit-centric` passes and reads 20 day files.
- `npm run build` passes.
- Actual K1 Unit 1 lesson pages now show the new unit-centric MD content where available.

### Next Step
- User/PM should review the actual K1 Unit 1 pages and decide whether this sync strategy should become the standard for K Language Unit Hello + Unit 1.

### Risks / Notes
- Only K1 Unit 1 actual data is replaced in this step.
- Older K1/K2/K3 language units still use the previous generated data and renderer fallbacks.

---

## 2026-08-19 — K1 Unit 1 Unit-Centric Preview Upload

### Completed
- Added a protected web preview page for the newly rebuilt K1 Unit 1 unit-centric MD package.
- Preview reads `00_unit.md` as unit-level authority and displays `day_01.md` through `day_20.md` in order.
- Added a dedicated sync command for regenerating this unit-centric preview data.

### Files / Paths
- Source root: `/Users/Lucia/Desktop/eastie_curriculum_project/content/curriculum/k-language-unit-centric-v0_1/k1/unit_01_friends_and_family/`
- Sync script: `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k-language-unit-centric-v0_1-preview.mjs`
- Generated data: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kLanguageUnitCentricPreview.ts`
- Preview component: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitCentricPreviewPage.tsx`
- Preview route: `http://127.0.0.1:5173/curriculum/k-language/unit-centric-preview`

### Current Status
- `npm run sync:k-language:unit-centric-preview` passes and reads 20 day files.
- `npm run build` passes.
- Local dev server is running on port `5173`.

### Next Step
- User/PM can review whether the unit-centric content structure should replace the earlier canonical preview direction.

### Risks / Notes
- This is a review surface only; it does not replace current production K Language lesson routes yet.
- The page intentionally keeps `00_unit.md` locked decisions visible so day-level Song / Story / Media / Phonics / Showcase are not treated as open TBD by mistake.

---

## 2026-08-19 — K Language Canonical Preview Page

### Completed
- Added a protected web preview page for the first-rollout K Language canonical MD v0.1 package.
- Preview reads the generated canonical preview data and shows unit overview plus day-level sections for K1/K2/K3 Unit Hello and Unit 1.
- Added a dedicated sync command for regenerating the preview data from canonical MD.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k-language-canonical-v0_1-preview.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kLanguageCanonicalPreview.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageCanonicalPreviewPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/app/App.tsx`
- Preview route: `http://127.0.0.1:5173/curriculum/k-language/canonical-preview`

### Current Status
- `npm run sync:k-language:canonical-preview` passes.
- `npm run build` passes.
- Local dev server is available on port `5173`.

### Next Step
- PM/user can preview the six first-rollout canonical units and decide which missing `TBD` fields should go back to curriculum design first.

### Risks / Notes
- This is a preview/review surface only; it does not replace the current production K Language lesson pages.
- The page is protected by the same app login wrapper as other curriculum pages.

---

## 2026-08-19 — K Language First-Rollout Canonical MD Plan

### Completed
- K Language first-rollout direction has been narrowed to the six units teachers need first:
  K1 Unit Hello, K1 Unit 1, K2 Unit Hello, K2 Unit 1, K3 Unit Hello, K3 Unit 1.
- Web now has a `languageClassifications` scaffold for all K1/K2/K3 language units, with:
  `newKeywords`, `recycledKeywords`, `targetSentences`, and `reviewIssues`.
- The web page now reads this classification layer instead of mixing raw Power Up `New Language` and `Recycled Language` directly.
- A draft canonical MD structure has been created for K Language v0.1 first rollout.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k_language_canonical_md_v0_1.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/k_language_canonical_md_v0_1_k1_unit_1_day_1_sample.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_UNIT_HELLO_UNIT_1_ROLLOUT_PLAN.md`
- Proposed canonical source root:
  `/Users/Lucia/Desktop/eastie_curriculum_project/content/curriculum/k-language-canonical-v0_1/`

### Current Status
- v0.1 is a first-rollout draft, not a full-year locked contract.
- Current strategy is to reverse from the current teacher-facing web page plus classification scaffold into new canonical MD.
- Old MD, generated web data, and web scaffold should not be modified during the first canonical drafting pass.

### Next Step
- Curriculum design session should draft canonical MD v0.1 for the six first-rollout units.
- After the six units are drafted, web session should test whether the MD structure is stable enough for a small sync/rendering experiment.
- PM should then decide whether v0.1 becomes the temporary opening-school standard.

### Risks / Notes
- `extend` remains unresolved and should stay in `Review Issues / Needs Extension` until curriculum design converts it into concrete content.
- Circle Time, Phonics, Story, Media Extend, Mini Mission, and Showcase may still contain TBD placeholders.
- Valuable old-MD guidance that is not shown on the page should move into `Teacher / Design Guidance`, not disappear.

---

## 2026-08-18 — Curriculum Dashboard Route Mapping Transition Approved

### Completed
- Reviewed and finalized the frontend session's mapping migration proposal.
- Approved the two-step strategy:
  1. current site upgrades dashboard semantics but links to current legacy routes;
  2. future clean site uses readable route categories and course-line slugs.
- Created a reusable web rule so future site creation does not forget the transition plan.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/curriculum_dashboard_route_mapping_transition.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`

### Current Status
- Current dashboard can use `Grade -> EL / CC / CE / PE -> Course Line -> Unit`.
- Current buttons should still link to working legacy routes, including `/non-language/`.
- No `/core`, `/creative-enrichment`, or `/physical-education` route family should be added yet without PM approval.

### Next Step
- Frontend session can implement the curriculum home with `legacyRouteForUnit` plus future route metadata.

### Risks / Notes
- UI sketches are structural only; labels must come from `curriculum_course_type_catalog_v1.md`.
- Future clean-site route contract should prefer readable slugs such as `/core/maths/` rather than compact codes like `/cc/`.

---

## 2026-08-18 — Course Type Naming Catalog Approved

### Completed
- Reviewed the latest course-type spreadsheet from Downloads.
- Approved the top-level short codes and official display names:
  `EL — English Language`, `CC — Core Courses`, `CE — Creative Enrichment`, `PE — Physical Education`.
- Created a shared course-line naming catalog for PG, PK, K1, K2, and K3.
- Added UI short names for compact dashboards and mobile navigation, such as `English`, `Core`, `Enrichment`, `Self-Care`, `Reading`, `World`, `Art`, `Music`, `Construction`, `Cooking`, `Drama`, and `Science`.
- Updated the program structure rule to point to the naming catalog.

### Files / Paths
- `/Users/Lucia/Downloads/eastie课程类型清单.xlsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_course_type_catalog_v1.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`

### Current Status
- Course-type naming is now stable enough to share with content, web, and design sessions.
- Frontend can now use official names for formal pages and UI short names for compact home/dashboard views.
- Existing historical folder names and legacy `/non-language/` routes were not renamed.

### Next Step
- Use the catalog when generating new Markdown source or frontend navigation labels.
- Later web compatibility planning should decide how to expose `EL / CC / CE / PE` in navigation and route aliases.

### Risks / Notes
- The catalog is a naming rule only; it does not define lesson structure.
- Do not bulk-rename existing files during active production.

---

## 2026-08-17 — Program Structure v2 Registry Sync

### Completed
- Synced the new four-category curriculum structure into the shared PM documents.
- Updated accepted-source tracking so every source line can show both the current track / route label and the future category.
- Clarified that existing `/non-language/` routes are compatibility labels during transition, not the long-term top-level curriculum structure.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_START_PROMPTS.md`

### Current Status
- Language / Core / CEC / PE are now the PM-level classification standard.
- No web routes, source folders, sync scripts, or generated curriculum data were renamed in this step.

### Next Step
- Ask the web session to produce a compatibility plan for future `core`, `cec`, and `pe` route aliases while preserving all current `/non-language/` routes.

### Risks / Notes
- Historical source folders still contain `non_language_courses`; do not rename them during active content production.
- Future clean extraction should use the four-category structure after content coverage is more complete.

---

## 2026-07-20 — Art Course-Line Workspace Setup

### Completed
- Created the dedicated K1–K3 Art course-line workspace, separate from unit assembly, clean-project content, and frontend-generated data.
- Copied the six reviewed Art framework/schema files from Downloads into the shared framework area.
- Copied the K1 Unit 1 five-file Art package into editable unit design and a separately marked reference implementation.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/00_shared_framework/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/unit_01_friends_and_family/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/02_reference_units/k1_unit_01_reference/`

### Current Status
- Art is now in course-line design mode with a dedicated working source. No existing K unit assembly folders, web files, or clean-project content files were modified.

### Next Step
- Produce K1 Unit 2 in `01_unit_designs/k1/unit_02_at_school/` only after verifying the relevant Power Up Starter Unit 2 source data and reviewing the K1 Unit 1 reference.

### Risks / Notes
- Downloads copies remain untouched as original delivery artifacts, but are not source of truth.
- The reference copy is explicitly marked read-only; editable Art content lives only in `01_unit_designs/`.

---

## 2026-07-20 — Art Curriculum Design / K1 Unit 2 Preflight

### Completed
- Verified the real Power Up Starter Unit 2 source: `At School`, including school/classroom objects, position language, and the source colour-exploration context.
- Extracted the locked K1 Unit 2 Art direction: Drawing and Mark Making; large-scale collaborative drawing and shape collage; `Our Classroom Map-Mural`; lines, shapes, place and shared space.
- Reviewed K1 Fall media/safety boundaries, the complete Art schema, and all five files of the K1 Unit 1 reference implementation.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/language_courses/unit_02_at_school/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/unit_02_at_school/`

### Current Status
- K1 Unit 2 is ready to generate as a five-file Art package in the dedicated Art workspace. The target directory remains empty; no U2 content has been drafted or promoted.

### Next Step
- Generate `00_overview.md` and `01_lesson_1.md` through `04_lesson_4.md`, then perform the Art schema/progression/practicality self-check.

### Risks / Notes
- Light Theme Language must remain limited to natural school-object/place words (not Unit 2 grammar instruction or a colour-theory lesson).
- K1 Fall supports drawing, child-torn/pre-cut collage and glue-stick use; it does not support precise cutting, perspective, accurate map conventions, or identical teacher-prepared mural components.

---

## 2026-07-20 — Art Curriculum Design / K1 Unit 2 Intake Review

### Completed
- Read and reviewed the five-file K1 Art Unit 2 package delivered in Downloads.
- Confirmed its Schema completeness, four-lesson studio sequence, Annual Map alignment, Art Encounter boundary, K1 Fall technique/safety fit, and portfolio evidence structure.
- Recorded the completed human review and created the Art course-line handoff note.

### Files / Paths
- `/Users/Lucia/Downloads/unit_02_at_school/00_overview.md`
- `/Users/Lucia/Downloads/unit_02_at_school/01_lesson_1.md`
- `/Users/Lucia/Downloads/unit_02_at_school/02_lesson_2.md`
- `/Users/Lucia/Downloads/unit_02_at_school/03_lesson_3.md`
- `/Users/Lucia/Downloads/unit_02_at_school/04_lesson_4.md`

### Current Status
- K1 Art Unit 2 is a human-reviewed and accepted course-line source. It is not yet promoted into K unit assembly or frontend integration.

### Next Step
- Use K1 Unit 2 as the second accepted Art reference, then begin K1 Unit 3 one unit at a time when approved.

### Risks / Notes
- The retained Light Theme Language includes `in / on / under` because it supports the Unit 2 spatial-art task; its use remains light and must not turn the Art sequence into grammar instruction.
- Handoff note: `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_unit_02_art_handoff.md`

---

## 2026-07-20 — Art Curriculum Design / K1 Unit 3 Intake Review

### Completed
- Read and reviewed the five-file K1 Art Unit 3 package delivered in Downloads.
- Confirmed Schema completeness and alignment to the locked Unit 3 direction: Colour and Painting; printmaking/colour exploration; `Food Shape Print Garden`; investigation before final composition.
- Confirmed the food-art encounter does not require Arcimboldo imitation or formal art-history recall, and that food-handling, allergy, hygiene, drying, and spill-management boundaries are present.
- Recorded approval for real-food printing, copied the accepted five-file source into the Art course-line workspace, and created the Art handoff note.

### Files / Paths
- `/Users/Lucia/Downloads/unit_03_food_and_drink/`

### Current Status
- K1 Art Unit 3 is a human-reviewed and accepted Art course-line source. It is not yet promoted to K unit assembly or frontend integration.

### Next Step
- Use K1 Unit 3 as the third accepted Art reference, then begin K1 Unit 4 one unit at a time when approved.

### Risks / Notes
- Real food printing requires confirmed allergy and school food-handling approval; the package correctly provides foam/sponge alternatives.
- Food vocabulary is contextual only and must not become the Art assessment.
- Handoff note: `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_unit_03_art_handoff.md`

---

## 2026-07-20 — Art Curriculum Design / K1 Unit 4 Intake Review

### Completed
- Read and reviewed the five-file K1 Art Unit 4 package delivered in Downloads.
- Confirmed Schema completeness, real Power Up Starter Unit 4 Light Theme Language alignment, and appropriate safeguards around home diversity, construction materials, adhesives, storage, and display.
- Identified a planning-level conflict between the Annual Unit Map and the Media and Technique Progression.
- Reviewed the revised package, confirmed that it resolves the K1 Fall/Spring construction conflict, copied it into the Art course-line workspace, and created the Art handoff note.

### Files / Paths
- `/Users/Lucia/Downloads/unit_04_home/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/00_shared_framework/annual_unit_map/EASTIE_Art_Annual_Unit_Curriculum_Map_K1-K3.md`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/00_shared_framework/media_technique_progression/EASTIE_Art_Media_and_Technique_Progression_K1-K3.md`

### Current Status
- K1 Art Unit 4 is a human-reviewed and accepted Art course-line source. It is not yet promoted to K unit assembly or frontend integration.

### Next Step
- Use the accepted U4 source as the K1 Fall spatial-exploration reference; continue with the next available K1 Art unit only when ready for intake review.

### Risks / Notes
- The accepted revision uses open-box/tray arrangement, two to four mostly movable elements, and at most one simple folded or rolled standing form. It must not be expanded back into permanent multi-part room construction before K1 Spring.
- Handoff note: `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_unit_04_art_handoff.md`

---

## 2026-07-20 — Art Curriculum Design / K1 Unit 5 Acceptance

### Completed
- Reviewed and accepted the five-file K1 Art Unit 5 Bridge Unit package.
- Confirmed the required Bridge Unit label, flexible across-Winter-Break continuation, absence of a seasonal craft outcome, and consolidation of K1 Fall portfolio evidence.
- Copied the accepted source into the Art course-line workspace and created the Art handoff note.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/unit_05_my_body/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_unit_05_art_handoff.md`

### Current Status
- K1 Art Unit 5 is a human-reviewed and accepted Art course-line source. It is not yet promoted to K unit assembly or frontend integration.

### Next Step
- Keep U4 pending the PM’s progression decision; continue with the next available K1 Art unit only when ready for intake review.

### Risks / Notes
- Body tracing is optional and consent-based. The Bridge Unit must not acquire holiday-decoration or seasonal-craft content during later assembly.

---

## 2026-07-20 — Art Curriculum Design / K1 Unit 6 Acceptance

### Completed
- Reviewed and accepted the five-file K1 Art Unit 6 package.
- Confirmed K1 Spring alignment: multi-part clay/lightweight-clay modelling, joining, texture/pattern, limited mixed-media addition, and personal toy invention.
- Copied the accepted source into the Art course-line workspace and created the Art handoff note.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/unit_06_toys/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_unit_06_art_handoff.md`

### Current Status
- K1 Art Unit 6 is a human-reviewed and accepted Art course-line source. It is not yet promoted to K unit assembly or frontend integration.

### Next Step
- Continue with the next available K1 Art unit only when ready for intake review.

### Risks / Notes
- Do not require a free-standing sculpture, moving mechanism, commercial-toy result, copied folk toy, or gendered toy choice. Mixed-material additions need age-appropriate supervision.

---

## 2026-07-20 — Art Curriculum Design / K1 Unit 7 Acceptance

### Completed
- Reviewed and accepted the five-file K1 Art Unit 7 package.
- Confirmed K1 Spring action-expression alignment: gesture/action drawing, wax-resist with transparent paint, activity clues, and fuller moving-figure composition.
- Copied the accepted source into the Art course-line workspace and created the Art handoff note.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/unit_07_free_time/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_unit_07_art_handoff.md`

### Current Status
- K1 Art Unit 7 is a human-reviewed and accepted Art course-line source. It is not yet promoted to K unit assembly or frontend integration.

### Next Step
- Continue with the next available K1 Art unit only when ready for intake review.

### Risks / Notes
- Do not assess athletic ability, require physical demonstration, copy a signature artist pose/style, or allow action-verb practice to replace Art learning. Test wax-resist material compatibility before delivery.

---

## 2026-07-20 — Art Curriculum Design / K1 Unit 8 Acceptance

### Completed
- Reviewed and accepted the five-file K1 Art Unit 8 package.
- Confirmed integrated K1 Spring texture/landscape alignment: responsible outdoor observation, rubbing, printing, collage, layered colour, foreground/background, and revision.
- Confirmed cultural boundaries for named landscape references and copied the accepted source into the Art course-line workspace with its handoff note.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/unit_08_were_having_fun/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_unit_08_art_handoff.md`

### Current Status
- K1 Art Unit 8 is a human-reviewed and accepted Art course-line source. It is not yet promoted to K unit assembly or frontend integration.

### Next Step
- Review the final K1 Unit 9 Culminating Unit when ready, then assess the complete K1 Art line before any assembly or web handoff.

### Risks / Notes
- Natural materials must be safe, fallen/approved, and responsibly handled. Do not copy named works, make generic dot paintings, or use Indigenous cultural symbols without specific reliable context.

---

## 2026-07-20 — Art Curriculum Design / K1 Unit 9 Acceptance

### Completed
- Reviewed and accepted the five-file K1 Art Unit 9 Culminating Unit package.
- Confirmed the required Unit 1-to-Unit 9 comparison, child-selected personal visual clues, meaningful revision, portfolio selection, child voice, and final K1 sharing opportunity.
- Copied the accepted source into the Art course-line workspace and created the Art handoff note.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/unit_09_all_about_me/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_unit_09_art_handoff.md`

### Current Status
- K1 Art Units 1–9 now exist as accepted course-line sources in the dedicated Art workspace. They are not yet promoted to K unit assembly or frontend integration.

### Next Step
- Conduct one cross-unit K1 Art line review before deciding whether to begin K2 Art production, start a K1 assembly pilot, or request frontend discovery work.

### Risks / Notes
- U9 must protect privacy and choice: no appearance-based judgement, prescribed identity symbols, compelled disclosure/public speaking, artist copying, or ranking of early versus later work.

---

## 2026-07-20 — Art Curriculum Design / K1 Full-Year Final Review

### Completed
- Reviewed all K1 Art Unit 1–9 overviews and 36 lesson files against the five shared Art frameworks and the Markdown schema.
- Confirmed complete five-file unit structure, consistent lesson schemas, coherent annual progression, revision, portfolio evidence and Art-integrity boundaries.
- Issued a conditional approval report identifying four required content corrections, one framework decision and one implementation-resource requirement.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_full_year_art_final_review.md`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/00_shared_framework/`

### Current Status
- K1 Art is conditionally approved but not yet locked. No unit requires wholesale redesign.

### Next Step
- Apply one controlled alignment patch for the U4 framework conflict, pre-U6 modelling bridge, Spring colour-mixing gap, U9 missing-baseline alternative and Spring paper-construction wording; then verify and lock K1.

### Risks / Notes
- Do not start K2 detailed production from obsolete U4 construction assumptions. Exact Art Encounter works and sources must be locked before teaching or frontend promotion.

---

## 2026-07-20 — Art Curriculum Design / K1 Alignment Patch and Lock

### Completed
- Synchronised the Annual Unit Curriculum Map with the accepted K1 Unit 4 temporary spatial-arrangement design and corrected downstream U5/U6 progression language.
- Added a brief reusable-modelling-material bridge to U5 Lesson 2 and connected it explicitly to U6 prior learning.
- Made intentional two-colour mixing a guaranteed U8 Lesson 2 experience with aligned outcomes, instruction, assessment and portfolio evidence.
- Added fair Unit 9 alternatives for missing Unit 1 evidence across the overview and Lessons 1-4.
- Reclassified K1 Spring box/tube paper construction as an optional extension or studio-centre experience and tightened U6 material-safety wording.
- Revalidated all 45 K1 Art unit/lesson files and marked the course line aligned and locked.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/00_shared_framework/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k1_full_year_art_final_review.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`

### Current Status
- K1 Art Units 1-9 are aligned and locked as course-line sources. They have not been promoted to K1 unit assembly, dynamic routes or frontend content.

### Next Step
- PM may prioritise either the exact K1 Art Encounter resource sheet, K2 Art detailed production, or a later K1 non-language assembly pilot.

### Risks / Notes
- Exact artwork selections, image sources and cultural context remain required before teaching or frontend promotion, especially the specific Indigenous Australian reference in U8.

---

## 2026-07-20 — Art Curriculum Design / K2 Units 1–3 Intake Review

### Completed
- Located and reviewed the prepared K2 Art U1–U3 packages in Downloads against the K2 Fall framework and the locked Art Markdown schema.
- Confirmed all three units align conceptually with the K2 Annual Unit Map: U1 school visual guide, U2 observed portrait with personal clues, and U3 animal texture portrait.
- Confirmed U1 has all five files and complete lesson-schema coverage.
- Identified that U2 and U3 lesson files omit required teacher-usable schema sections; the issue is structural completeness, not a need to redesign their curriculum concepts.

### Files / Paths
- `/Users/Lucia/Downloads/K2_Art_Unit_01_Our_New_School.zip`
- `/Users/Lucia/Downloads/k2_art_unit_02_all_about_us/`
- `/Users/Lucia/Downloads/k2_art_unit_03_fun_on_the_farm/`

### Current Status
- K2 U1 is ready for acceptance after PM/design confirmation.
- K2 U2 and U3 are not yet eligible for formal acceptance because their lesson files do not yet meet the locked Art Markdown schema.

### Next Step
- Add the missing schema fields to U2 and U3 lesson files, then rerun structural validation and receive the packages into the Art course-line workspace.

### Risks / Notes
- Do not copy U2 or U3 into `01_unit_designs/k2/` as accepted sources until their lesson schemas are complete. Exact Art Encounter resources still need to be locked before teaching or frontend promotion.

---

## 2026-07-20 — Art Curriculum Design / K2 Units 1–3 Schema Completion and Acceptance

### Completed
- Completed the missing locked-schema sections in all U2 and U3 lesson files without changing their core projects, learning progression or cultural boundaries.
- Normalised U1 Lesson 4’s viewer-test heading to the locked schema while retaining its viewer-feedback teaching action.
- Accepted K2 Art Units 1–3 into the dedicated Art course-line workspace and created handoff notes.
- Verified 15 required K2 source files, complete lesson-heading consistency across all three units, no template placeholders, and byte-identical transfer of the completed U2/U3 packages.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_02_all_about_us/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_03_fun_on_the_farm/`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_unit_01_art_handoff.md`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_unit_02_art_handoff.md`
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_unit_03_art_handoff.md`

### Current Status
- K2 Art Units 1–3 are accepted course-line sources. K2 Units 4–9 remain pending; no K2 Art content has been promoted to unit assembly, dynamic routes or frontend content.

### Next Step
- Receive and review K2 Unit 4 when ready, or pause K2 production to build the exact K1 Art Encounter resource sheet if PM prioritises teaching/frontend readiness.

### Risks / Notes
- U2 portrait work requires privacy, non-judgement and voluntary personal clues. U3 must keep observed animal structure ahead of decoration and use cultural references only with accurate specific context.

---

## 2026-07-17 — Art Curriculum Design / Intake Review

### Completed
- Reviewed the K1–K3 Art batch-generation brief, five Art planning/schema documents, and the K1 Unit 1 five-file reference package supplied in Downloads.
- Located and reviewed the required Art Growing Ladder after the initial intake review.
- Identified that the proposed Art source schema is richer than the currently active K non-language `Course F: Art` single-file convention and has not yet been registered as a K non-language source/assembly rule.

### Files / Paths
- `/Users/Lucia/Downloads/EASTIE_Art_Annual_Unit_Curriculum_Map_K1-K3.md`
- `/Users/Lucia/Downloads/EASTIE_Art_Encounters_Map_K1-K3.md`
- `/Users/Lucia/Downloads/EASTIE_Art_Growing_Ladder.md`
- `/Users/Lucia/Downloads/EASTIE_Art_Media_and_Technique_Progression_K1-K3.md`
- `/Users/Lucia/Downloads/EASTIE_Art_Scope_and_Sequence_K1-K3.md`
- `/Users/Lucia/Downloads/EASTIE_Art_Unit_and_Lesson_Markdown_Schema.md`
- `/Users/Lucia/Downloads/K1_Art_Unit_01_Friends_and_Family.zip`

### Current Status
- K1 Unit 1 is a complete standalone Art reference package. K1 Unit 2 is correctly identified as the next pilot, but formal production is not yet safe to begin.
- The Growing Ladder closes the vertical-progression evidence gap; its K1 Fall expectations align with the Unit 1 reference approach.

### Next Step
- Decide and document how the five-file Art package is canonicalized and assembled alongside the active K non-language unit/course-track structure before generating K1 Unit 2.

### Risks / Notes
- Generating directly into an unregistered `art/k1/unit_*` folder could create a second source-of-truth and prevent future dynamic-unit assembly.

---

## 2026-07-06 — PM / Session Reporting

### Completed
- Established a formal shared reporting mechanism for parallel sessions.
- Defined `SESSION_UPDATE_BOARD.md` as the required cross-session update surface.
- Defined `PROJECT_STATUS.md` as the slower-moving project summary surface.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/session_progress_reporting.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_UPDATE_BOARD.md`

### Current Status
- Reporting mechanism now exists, but other active sessions still need to start using it consistently.

### Next Step
- Ask the graded reading content session and graded reading frontend session to add their latest update entries here.

### Risks / Notes
- PM still cannot automatically know cross-session progress unless sessions actually write updates here.

---

## 2026-07-06 — Graded Reading Content

### Completed
- Reworked K2 Unit 01 Suggested Activities / Games for all 16 books from basic point/repeat tasks into short classroom scenarios with movement, pretend play, sorting, packing, map-building, and book-language reuse.
- Synced the revised K2 U01 compact lesson plan into the web source and regenerated the K2 U01 graded reading data.

### Files / Paths
- `/Users/Lucia/Desktop/RAZ/graded_reading_lesson_designs/K2_U01_Graded_Reading_Compact_Lesson_Plan.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/content/curriculum/k2/non-language/graded-reading/unit-01/source/k2_unit_01_graded_reading_compact_lesson_plan.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k2GradedReadingUnit01.ts`

### Current Status
- K2 U01 page data now contains richer activity descriptions while keeping the existing one-line activity parser format.
- `npm run sync:graded-reading:k2-unit-01` and `npm run build` both pass.

### Next Step
- Review the K2 U01 page for whether activity density is useful enough for teachers, then decide whether to make this the activity-writing standard for future graded reading units.

### Risks / Notes
- Activities are still stored as single-line title/description pairs because the current web parser only supports that format; fuller Materials / Play / Language subfields would need a frontend/parser update.

---

## 2026-07-07 — Graded Reading Content

### Completed
- Generated compact lesson plan files for the remaining graded reading unit drafts using the K2 U01 book-first structure and richer scenario-based activity standard.
- Each book section now has 2 short classroom activities designed around movement, pretend play, sorting, building, role-play, investigation, or simple creation rather than basic point/repeat routines.
- Ran structural validation across all compact plans.

### Files / Paths
- `/Users/Lucia/Desktop/RAZ/graded_reading_lesson_designs/*_Graded_Reading_Compact_Lesson_Plan.md`

### Current Status
- 27 compact lesson plan files now exist.
- Coverage: 180 lessons, 324 book sections, 324 activity blocks, 648 activity lines.
- K2 U01 remains the hand-tuned reference unit; the other 26 compact plans were generated from existing lesson design drafts and lightly scanned for obvious category mismatches.

### Next Step
- Human review representative units before treating the generated compact plans as canonical, especially K3 units and books with broad informational topics.

### Risks / Notes
- Resource fields remain `TBD` outside the already integrated K2 U01 web prototype.
- Activities are intentionally kept in one-line `Title: description` format for current web parser compatibility.

---

## 2026-07-16 — Graded Reading Web

### Completed
- Updated graded reading resource sync naming so copied public files use semantic filenames instead of generic `book.pdf`, `audio.mp3`, `video.mp4`, etc.
- New filename pattern: `level-{level}-{book-slug}-{resource-type}.{ext}`, for example `level-a-maria-goes-to-school-book.pdf`.
- Re-synced K1/K2/K3 graded reading units and rebuilt the web app.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k-graded-reading-units.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kGradedReadingUnits.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/raz/k-graded-reading/`

### Current Status
- `npm run sync:graded-reading:k-units` passes.
- `npm run build` passes.
- Public graded reading resources now contain 1446 semantic `level-*` filenames and 0 old generic filenames.

### Next Step
- Frontend can rely on the URL basename for a meaningful browser download filename; no separate download-name workaround is required for these synced graded reading resources.

### Risks / Notes
- Existing links to old generic resource URLs such as `/book.pdf` will no longer resolve after this sync; generated curriculum data now points to the new semantic URLs.

---

## 2026-07-06 — Graded Reading Web

### Completed
- Refined K2 U01 Course B sidebar lesson navigation after visual review.
- Rebalanced lesson item typography from overly small/light to readable book-title styling.
- Kept two-line lesson entries with `A` / `aa` labels, equal active/inactive heights, collapsible Course B navigation, and scrollable sidebar.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/GradedReadingUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- K2 U01 graded reading sidebar now uses compact but readable lesson entries.
- `npm run build` passes.

### Next Step
- Continue visual QA on K2 U01 graded reading lesson body and Source resource card layout.

### Risks / Notes
- Sidebar styling is currently tuned for K2 U01 Course B; future graded reading units should reuse the same component rather than fork a second sidebar style.

---

## 2026-07-06 — Math Web

### Completed
- Added K2 Unit 01 Course A: Math Growing Ladder as the first dynamic K non-language math web test.
- Added markdown sync script, generated typed data, Course A overview route, lesson routes, sidebar navigation, lesson rendering, and lesson feedback context.
- Kept source content unchanged; rendering uses the prepared math course-track markdown.
- Extended the Unit 1 Math dynamic test to K1 and K3 using the same parser and renderer.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k2-math-unit-01.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kMathUnit01.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/app/App.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/GradedReadingUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`

### Current Status
- `/curriculum/k2/non-language/unit-01/course-a` renders Course A overview with 8 math lessons.
- `/curriculum/k2/non-language/unit-01/course-a/lesson-01` renders Lesson Outcome, Math Growing Ladder Alignment, Theme Story Context, Light Theme Language, Teacher Routine Language, Optional Extension, Suggested Activities, and Lesson Feedback.
- `/curriculum/k1/non-language/unit-01/course-a` renders Course A overview with 4 math lessons.
- `/curriculum/k3/non-language/unit-01/course-a` renders Course A overview with 8 math lessons.
- `npm run sync:math:k-unit-01` and `npm run build` pass.

### Next Step
- Visual review K1/K2/K3 Math Course A pages and then decide whether this math schema/parser is sufficient for broader K math rollout.

### Risks / Notes
- Math rendering is now tested on K1/K2/K3 Unit 1, but still should not be treated as final until at least one later unit is compatibility-tested.

---

## 2026-07-07 — Math Web

### Completed
- Expanded K non-language Math Growing Ladder dynamic web support from Unit 1 only to K1/K2/K3 Unit 1-9.
- Replaced the Unit 1-only generated math data with a unified generated data file for all 27 math course-track markdown files.
- Added a new batch sync command, while keeping previous Unit 1 sync command aliases working.
- Updated K non-language routing and curriculum path lookup so Unit 1-9 open through the same shared Math renderer.
- Kept K2 Unit 1 Course B graded reading scoped to K2 Unit 1 only, so other math units do not accidentally reuse that reading content.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k-math-units.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k2-math-unit-01.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kMathUnits.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/GradedReadingUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/app/App.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/package.json`

### Current Status
- `npm run sync:math:k-units` passes.
- Generated math coverage: K1 = 9 units / 36 lessons; K2 = 9 units / 72 lessons; K3 = 9 units / 72 lessons.
- `npm run build` passes.
- Smoke URL checks returned 200 for K1 Unit 9 Course A, K2 Unit 9 Course A, K3 Unit 9 Course A, and K2 Unit 1 Course B.

### Next Step
- Visual QA several later Math units in the browser, especially K1 Unit 9, K2 Unit 9, and K3 Unit 9, to confirm the shared renderer handles later-unit content gracefully.

### Risks / Notes
- Math pages now share one renderer, so later style improvements should update all K1/K2/K3 Math pages together.
- The component name `GradedReadingUnitPage` is now broader than its job because it also hosts K non-language Math; a future cleanup can rename it once the K non-language structure settles.

---

## 2026-07-07 — Math Web

### Completed
- Redesigned the Math Course Overview `Unit Outcomes` card to match the updated outcome structure.
- The renderer now groups markdown-style domain headings such as `Numbers`, `Calculation`, `Daily Life Applications`, and `Shapes and Logic` instead of displaying `####` headings as list items.
- Replaced the old yellow-dot list with domain labels and soft can-do statement rows.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/GradedReadingUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- `npm run build` passes.
- `/curriculum/k2/non-language/unit-01/course-a` returns 200 on the local dev server.

### Next Step
- Visual review a few units with different outcome domain combinations, especially K1 Unit 1, K1 Unit 4, K2 Unit 9, and K3 Unit 9.

### Risks / Notes
- The grouping currently happens at render time from the existing `unitOutcomes` array. If Math outcome structure becomes a locked schema later, the sync script can promote these domains into structured generated data.

---

## 2026-07-07 — Graded Reading Web

### Completed
- Added batch dynamic web support for K1/K2/K3 Graded Reading Unit 1-9.
- Generalized the graded reading sync from K2 Unit 1 only to all 27 compact lesson plan markdown files.
- Supported both K1 single-book lessons and K2/K3 core + support paired-book lessons.
- Connected Course B routes for K1/K2/K3 non-language Unit 1-9, including lesson-level routes.
- Kept K2 Unit 1 resource behavior while allowing missing resources to show as `TBD`.
- Replaced the old K2 Unit 1 generated graded-reading snapshot with unified generated data.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k-graded-reading-units.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-graded-reading-unit.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kGradedReadingUnits.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/GradedReadingUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/app/App.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/package.json`

### Current Status
- `npm run sync:graded-reading:k-units` passes.
- Generated graded-reading coverage: K1 = 9 units / 36 lessons; K2 = 9 units / 72 lessons; K3 = 9 units / 72 lessons.
- `npm run build` passes.
- Smoke URL checks returned 200 for K1 Unit 9 Course B, K2 Unit 9 Course B, K3 Unit 9 Course B, and K2 Unit 1 Course B.

### Next Step
- Visual QA K1 single-book layout and K2/K3 paired-book layout, then decide whether Course B sidebar density needs separate tuning for K1 versus K2/K3.

### Risks / Notes
- Seven book entries currently lack cover/credits manifest matches and will show cover fallback until content/resource naming is resolved:
  K2 U05 `Valentine's Day Gifts`;
  K3 U01 `Animal Coverings`;
  K3 U03 `What's My Job`, `Gracie's Nose`;
  K3 U05 `Henry's Hike`;
  K3 U07 `Jack and Lily's Favorite Food`, `Let's Make a Bird Feeder`.

---

## 2026-07-10 — Deployment

### Completed
- Deployed the latest local dynamic frontend build to the production site.
- Verified page-login flow and key curriculum routes after deploy.
- Kept the deployment scoped to frontend core assets only; PDF/audio/resource library was not uploaded.

### Files / Paths
- Local app: `/Users/Lucia/Desktop/eastie_curriculum_project/web`
- Production app root: `/var/www/eastie-curriculum-app`
- Production public asset merge target: `/var/www/eastie.sihai.space/assets`
- Backup: `/var/www/eastie-static-backups/curriculum-latest-before-20260710132520.tgz`

### Current Status
- Production frontend bundle is `index-B8HG2v7_.js`.
- Verified `200 OK` for `/curriculum/`, PG/PK non-language sample routes, PG/PK language Unit 6, K1/K2/K3 language Unit 1, `/curriculum/status`, and `/login`.
- Root homepage remains Basic Auth protected; curriculum app keeps page-login only.

### Next Step
- If this deployment pattern is now considered stable, create a formal deployment runbook under `docs/rules/process/` or `docs/rules/web/` and register it in `RULES_INDEX.md`.

### Risks / Notes
- `docs/deployment.md` is still a placeholder and does not yet reflect the active production topology.
- The large `web/public/curriculum-resources` library remains intentionally undeployed unless a future resource-path decision requires it.

---

## 2026-07-10 — Deployment

### Completed
- Replaced the placeholder deployment note with an active production deployment runbook.
- Documented current frontend/API/static/Nginx route ownership, auth boundaries, deploy flow, verification checklist, resource-library boundary, and rollback notes.
- Updated the rules index label and project status to reflect that production topology is now documented.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/deployment.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`

### Current Status
- Deployment topology is no longer chat-only knowledge.
- `docs/deployment.md` is now the first reference for production deploy and hosting behavior.

### Next Step
- Future deployment sessions should read the runbook before touching Nginx, API services, frontend assets, or resource-library paths.

### Risks / Notes
- The runbook intentionally does not store plaintext passwords.
- Resource-library deployment remains a separate explicit decision, not part of normal frontend deploys.
- Full PDF/audio/video/lesson-plan/worksheet resource manifests currently exist only for K2 Unit 1; other units display `TBD` for those resource buttons until resource scanning is expanded.

---

## 2026-07-07 — Graded Reading Web

### Completed
- Expanded graded reading Source resource linking for K1/K2/K3 Unit 1-9.
- Added RAZ resource scanning into the graded reading sync script.
- Linked Book PDF, audio, video, lesson plan, worksheet, discussion card, and comprehension quiz where matching files exist.
- Copied matched resources into the web public curriculum resource directory so buttons can open local dev URLs.
- Generated a RAZ-side resource manifest for the matched selected books.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k-graded-reading-units.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kGradedReadingUnits.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/raz/k-graded-reading`
- `/Users/Lucia/Desktop/RAZ/graded_reading_resources_manifest.json`

### Current Status
- `npm run sync:graded-reading:k-units` passes.
- `npm run build` passes.
- Source coverage across 324 selected book entries:
  Book PDF 324/324; audio 324/324; video 324/324; lesson plan 95/324; worksheet 187/324; discussion card 65/324; comprehension quiz 127/324.
- Missing LP / worksheet / card / quiz resources remain `TBD` in the UI.
- Local resource URL smoke checks returned 200 for sample PDF, audio, video, and worksheet assets.

### Next Step
- Review Source card UX in the browser and decide whether to expose discussion card / comprehension quiz buttons in addition to the current Book PDF / Lesson Plan / Worksheet / Audio / Video buttons.

### Risks / Notes
- Copied graded reading resources are large: about 2.4GB for files plus about 50MB for covers. This is acceptable for local testing, but deployment should probably move these assets to object storage/CDN instead of bundling everything into the frontend app.

---

## 2026-07-10 — Deployment

### Completed
- Deployed K1/K2/K3 Graded Reading resource assets to production under `/curriculum-resources/`.
- Switched production Nginx `/curriculum-resources/` from legacy `eastie-web:4321` proxy to static serving from the dynamic app resource directory.
- Fixed uploaded file permissions so Nginx can serve PDFs, audio, video, and covers.

### Files / Paths
- Local source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/raz/k-graded-reading`
- Local source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/raz-covers/k-graded-reading`
- Server target: `/var/www/eastie-curriculum-app/curriculum-resources/`
- Nginx backup: `/etc/nginx/conf.d/eastie.sihai.space.conf.before-graded-reading-resources-20260710140222`

### Current Status
- Production has 1,446 Graded Reading resource files and 317 cover images online.
- Sample HTTPS checks passed for cover JPG, book PDF, MP3 audio, and MP4 video.

### Next Step
- Decide whether Power Up/K language `audio/` and `pdfs/` should also be deployed under `/curriculum-resources/`.

### Risks / Notes
- `/curriculum-resources/` is static and not protected by page login; this matches current app asset behavior but should be revisited if resource access needs stricter protection.
- Frontend currently opens audio/video resource links in a new tab rather than using embedded players.

---

## 2026-07-17 — Deployment

### Completed
- Deployed the standalone Elephant S26 summer language themes page to the existing `eastie.sihai.space` server.
- Uploaded the required local logo asset with the page.
- Verified the page and logo return `200 OK` with existing teacher Basic Auth.

### Files / Paths
- Local page: `/Users/Lucia/Documents/New project 3/elephant-summer-review.html`
- Local asset: `/Users/Lucia/Documents/New project 3/public/eastie-logo.png`
- Server target: `/var/www/eastie.sihai.space/elephantS26/`

### Current Status
- Online path: `https://eastie.sihai.space/elephantS26/`
- The page inherits existing browser Basic Auth from the legacy static root.

### Next Step
- Share the protected URL with teachers who already have the EASTIE site credentials.

### Risks / Notes
- The page imports Google Fonts; if Google Fonts is slow or blocked, browser fallback fonts will be used.

---

## 2026-07-17 — Deployment

### Completed
- Made `/elephantS26/` publicly accessible without browser Basic Auth.
- Kept the rest of the legacy static root protected by existing Basic Auth.
- Verified `/elephantS26/` and its logo return `200 OK` without credentials, while `/` still returns `401`.

### Files / Paths
- Nginx config: `/etc/nginx/conf.d/eastie.sihai.space.conf`
- Nginx backup: `/etc/nginx/conf.d/eastie.sihai.space.conf.before-elephantS26-public-20260717151226`
- Public page: `https://eastie.sihai.space/elephantS26/`

### Current Status
- Elephant S26 page is public.
- Existing EASTIE root/course auth behavior remains unchanged.

### Next Step
- Share the public Elephant S26 URL directly.

### Risks / Notes
- Anyone with the URL can view this standalone page.

---

## 2026-07-13 — Power Up / K2 Public Resources

### Completed
- Prepared the first K2 Power Up public PDF resource package for Language Unit 1.
- Copied Level One Unit 1 lesson-level Teacher Book, Pupil Book, and Activity Book PDFs into the frontend public resource tree.
- Generated CSV and JSON manifests for lesson-level PDF lookup.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/teacher-book/`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/pupil-book/`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/activity-book/`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/manifest.csv`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/manifest.json`

### Current Status
- K2 Unit 1 public PDF package contains 36 PDFs: 12 Teacher Book, 12 Pupil Book, and 12 Activity Book.
- Manifest records include lesson, role, book page, public path, and source path.
- Public paths resolve under `/curriculum-resources/power-up/k2/unit-01/...`.
- Frontend page integration has not been implemented yet.

### Next Step
- Frontend session should connect `/curriculum/k2/language/unit-01` to `manifest.json` so lesson Source links use the public PDF package instead of hard-coded or scattered paths.

### Risks / Notes
- This update only covers K2 Language Unit 1 PDFs.
- Audio, video, flashcards, K2 later units, K3, and Starters/K1 public resource packages are not yet normalized into the new `power-up/` public structure.
- Existing production deployment decisions for `/curriculum-resources/` still apply; this local public package is not automatically deployed unless a deployment session uploads it.

## 2026-07-13 — Power Up Unit 1 Resource Manifest v0.1

### Completed
- Added a repeatable sync command for K1/K2/K3 Power Up Unit 1 resources.
- Normalized lesson-level PDF resources into the shared `power-up/{grade}/unit-01/` public structure.
- Added audio resources and generated one structured `resource-manifest.json` per grade plus a combined summary.
- Preserved the distinction between reliable lesson-page audio mapping and unit-level track-only mapping.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-unit-01-resources.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k1/unit-01/resource-manifest.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/resource-manifest.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k3/unit-01/resource-manifest.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/unit-01-resource-summary.json`

### Current Status
- K1: 10 lessons, 30 PDFs, 32 audio files; audio mapped by lesson/page.
- K2: 12 lessons, 72 PDFs, 19 audio files; audio currently mapped to Unit 1 tracks only.
- K3: 12 lessons, 36 PDFs, 17 audio files; audio currently mapped to Unit 1 tracks only.
- `npm run sync:power-up:unit-01-resources` passes.
- `npm run build` passes.

### Next Step
- Review the manifest shape, then connect the K1/K2/K3 Unit 1 lesson Source cards to the manifest.
- Resolve K2/K3 audio-to-lesson mapping from canonical lesson/source data before exposing track buttons as lesson-specific resources.

### Risks / Notes
- K2/K3 audio filenames identify CD and track, but current source materials do not provide a sufficiently reliable page/lesson mapping for all tracks. The manifest records this as `unit-track-only` instead of guessing.
- This is a local public resource package; production deployment is a separate step.

---

## 2026-07-13 — Power Up Unit 1 Frontend Resource Integration

### Completed
- Connected K1/K2/K3 Language Unit 1 lesson `Source` cards to the generated Power Up `resource-manifest.json` files.
- Added a reusable frontend resource lookup module so Source text remains curriculum wording while resource buttons come from manifests.
- Kept fallback rendering for source text when a manifest is unavailable.
- Preserved conservative audio behavior: K1 uses lesson/page mapped audio; K2/K3 only expose audio when the lesson Source text explicitly names a track that exists in the manifest.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/resources/powerUpResources.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-unit-01-resources.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k1/unit-01/resource-manifest.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/resource-manifest.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k3/unit-01/resource-manifest.json`

### Current Status
- K1 Unit 1 Source cards now resolve Teacher Book, Pupil Book, Activity Book PDFs and mapped audio through the manifest.
- K2 Unit 1 Source cards now resolve PDFs and explicitly referenced Unit 1 tracks through the manifest.
- K3 Unit 1 Source cards now resolve PDFs and explicitly referenced Unit 1 tracks through the manifest.
- Manifest public-path existence check passed: K1/K2/K3 missing public files = 0.
- `npm run sync:power-up:unit-01-resources` passes.
- `npm run build` passes.

### Next Step
- Browser QA the three pages:
  - `/curriculum/k1/language/unit-01/pu-l1`
  - `/curriculum/k2/language/unit-01/pu-l2`
  - `/curriculum/k3/language/unit-01/pu-l2`
- After visual/resource QA, decide whether to deploy the Power Up public resource package under production `/curriculum-resources/`.

### Risks / Notes
- K2 manifest still contains duplicate PDF entries from duplicate source directories, but the frontend deduplicates by label and public path.
- Production deployment is not included in this update.

---

## 2026-07-14 — Power Up Activity Book Audio Mapping Correction

### Completed
- Integrated the OCR-verified Activity Book audio mapping from:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_01.json`
- Updated the Power Up Unit 1 resource sync script so Activity Book audio is no longer inferred from filename page numbers alone.
- Only `confidence: "verified"` Activity Book audio entries are added to frontend manifests.
- Excluded the low-confidence starter L3 `1.04` mapping from the frontend manifest until manual review.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-unit-01-resources.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k1/unit-01/resource-manifest.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/resource-manifest.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k3/unit-01/resource-manifest.json`

### Current Status
- K1 Unit 1: 13 verified Activity Book audio mappings are exposed; low-confidence `1.04` is hidden.
- K2 Unit 1: 7 verified Activity Book audio mappings are exposed: `4.09` through `4.15` where present.
- K3 Unit 1: no verified Activity Book audio mappings because the source map reports no level_2 Unit 1 AB PDFs.
- `npm run sync:power-up:unit-01-resources` passes.
- `npm run build` passes.

### Next Step
- Manually review starter L3 Activity Book track `1.04`.
- Browser-refresh K1/K2 language lesson pages and confirm Activity Book audio buttons now show printed track labels rather than filename-derived `tr_###` labels.

### Risks / Notes
- Production deployment is not included in this update.
- Existing browser sessions may need a hard refresh because `resource-manifest.json` is fetched client-side.

---

## 2026-07-14 — Power Up Source Display Follow-up Fix

### Completed
- Changed the frontend PDF display for K language lessons to trust the resource manifest instead of filtering manifest PDFs through the generated `Source` text.
- Fixed K1 Starter pupil-book audio parsing in `sync-power-up-unit-01-resources.mjs`; the prior regex index bug produced `tr_undefined` labels.
- Kept low-confidence Activity Book audio in the manifest as a reviewable item instead of dropping it.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-unit-01-resources.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/resources/powerUpResources.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k1/unit-01/resource-manifest.json`

### Current Status
- K1 U1 L3 now has Activity Book tracks `1.04` and `1.05`; `1.04` is flagged `low-confidence-from-ab-pdf`.
- K1 U1 L6 manifest contains all three PDFs: `AB p13`, `PB p13`, and `TB p13`.

---

## 2026-07-16 — PM / Sprint Closure

### Completed
- Reviewed the current project state after the recent dynamic expansion sprint.
- Confirmed that PG/PK non-language now has dynamic coverage across Units 1-9.
- Confirmed that K1/K2/K3 Math and Graded Reading both now have cross-unit dynamic coverage.
- Reframed the next recommended production order around PG/PK language expansion and K non-language assembly rather than more broad prototype branching.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md`

### Current Status
- The main project risk is no longer whether the dynamic system works.
- The current risk is drift between real progress and PM/status documentation if updates are not kept current.
- The project is ready for the next controlled work block rather than needing more foundational redesign.

### Next Step
- Start the next sprint with PG/PK language remaining units.
- In parallel, keep K non-language assembly focused on fuller unit delivery rather than isolated horizontal sub-lines only.

### Risks / Notes
- K non-language still has active dynamic lines without a fully assembled reference unit in K1/K2/K3.
- Power Up public resource manifests are now meaningful for Unit 1, but broader unit coverage still needs deliberate rollout.

---

## 2026-07-17 — K Language Web

### Completed
- Brought K Language dynamic pages into broad active use across:
  - K1 / Starter
  - K2 / Level 1
  - K3 / Level 2
- Confirmed coverage now includes:
  - Unit Hello
  - Units 1-9
  - lesson-level Power Up pages
  - Source blocks for TB / PB / AB PDFs
  - PB / AB / shared soundtrack display
  - K2 / K3 PB accompaniment audio display

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/resources/powerUpResources.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- K Language dynamic pages are now broadly online and usable as a cross-level reference line.
- Source display now suppresses stale `TB pTBD / PB pTBD / AB pTBD` fallback references when real PDF cards are available.
- K2 / K3 soundtrack display now uses physical CD track numbering where required.
- `pupil-book-accompaniment` audio now displays correctly under `Soundtrack -> Pupil's Book` and is sorted by physical track order.
- EASTIE extension API failures now surface as a soft non-blocking message instead of raw `Request failed.`

### Next Step
- PM/content QA should now focus on:
  - audio correctness
  - page-by-page teacher usability
  - lesson resource clarity
- Do not spend more time rechecking basic route availability unless a regression appears.

### Risks / Notes
- EASTIE extension backend is still not fully connected for all K Language pages.
- K Language resource display depends on generated `resource-manifest.json`, but this frontend pass did not modify manifests or sync scripts.
- K2 / K3 accompaniment display is now frontend-ready as long as manifests include `pupil-book-accompaniment`.
- `npm run build` passed after the frontend changes.
- Local web server was verified on `http://127.0.0.1:5173`
- Local API health was verified through `/api/health`
- `npm run sync:power-up:unit-01-resources` passes.
- `npm run build` passes.

### Next Step
- Hard refresh local browser pages before rechecking Source buttons.
- Manually verify K1 U1 L3 Activity Book `1.04`, then update the OCR map confidence if confirmed.

---

## 2026-07-14 — Power Up AB Audio Visual QA

### Completed
- Ran a manifest consistency check for every Unit 1 Activity Book audio entry.
- Verified every AB audio entry has a corresponding lesson/page AB PDF and existing public audio file.
- Rendered and visually spot-checked representative Activity Book PDFs:
  - K1 U1 L3 / AB p10: `1.04`, `1.05`
  - K1 U1 L6 / AB p13: `1.08`, `1.09`
  - K1 U1 L7 / AB p14: `1.10`, `1.11`, `1.12`
  - K2 U1 L2 / AB p7: `4.09`
  - K2 U1 L6 / AB p11: `4.13`
  - K2 U1 L10 / AB p15: `4.15`
- Updated the source OCR map so K1 U1 L3 `1.04` is now manually verified instead of low-confidence.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_01.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k1/unit-01/resource-manifest.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/resource-manifest.json`

### Current Status
- K1 Unit 1: 14 verified Activity Book audio mappings, 0 low-confidence.
- K2 Unit 1: 7 verified Activity Book audio mappings, 0 low-confidence.
- K3 Unit 1: 0 Activity Book audio mappings because the source map has no level_2 Unit 1 AB PDFs.
- Mapping consistency failures: 0.
- `npm run sync:power-up:unit-01-resources` passes.
- `npm run build` passes.

### Risks / Notes
- K1/K2 Activity Book PDFs are visually rendered as two-page spreads; filenames generally use the starting or relevant page number. The manifest stores the page associated with the verified track.
- This QA was a representative visual spot-check plus full manifest consistency check, not a full manual visual review of every page.

---

## 2026-07-14 — Power Up Resource Pipeline Documented

### Completed
- Added a reusable web rule document for the Power Up resource pipeline.
- Registered the new rule in `RULES_INDEX.md`.
- Added a cross-reference warning to the older K-language Markdown specification so future sessions know Power Up audio/PDF resource rules now live in the pipeline document.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/power_up_resource_pipeline.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_RESOURCE_CONVENTIONS.md`

### Current Status
- The project now has a single active web rule for K1/K2/K3 Power Up resource manifests.
- The rule explicitly says Activity Book audio must come from OCR/manual verified track maps and must not be guessed from filenames or page numbers alone.
- The rule records the current Unit 1 status: K1 has 14 verified AB audio mappings; K2 has 7; K3 has 0 due to missing Level 2 Unit 1 AB source map.
- `npm run build` passes.

### Next Step
- Generalize `web/scripts/sync-power-up-unit-01-resources.mjs` into a unit-parameterized sync script.
- Ask the OCR/resource session to generate the next Activity Book track map, likely Unit 2 first, before bulk expansion.

---

## 2026-07-14 — Power Up Resource Sync Generalized

### Completed
- Added a unit-parameterized Power Up resource sync script.
- Kept the old Unit 1 sync command as a compatibility alias.
- Verified Unit 1 regeneration preserves the existing K1/K2/K3 resource counts and Activity Book audio mapping counts.
- Ran a Unit 2 smoke sync to confirm the generalized script can generate resource manifests without guessing Activity Book audio when no AB track map exists.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-resources.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-unit-01-resources.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/package.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/power_up_resource_pipeline.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/unit-01-resource-summary.json`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/unit-02-resource-summary.json`

### Current Status
- New command: `npm run sync:power-up:resources -- --unit 01`
- Legacy command still works: `npm run sync:power-up:unit-01-resources`
- Unit 1 regeneration:
  - K1: 10 lessons, 30 PDFs, 32 audio, 14 verified AB audio.
  - K2: 12 lessons, 72 PDFs, 26 audio, 7 verified AB audio.
  - K3: 12 lessons, 36 PDFs, 17 audio, 0 verified AB audio.
- Unit 2 smoke generation:
  - K1: 10 lessons, 30 PDFs, 19 audio, no AB map.
  - K2: 12 lessons, 36 PDFs, 16 audio, no AB map.
  - K3: 12 lessons, 24 PDFs, 16 audio, no AB map.
- `npm run build` passes.

### Risks / Notes
- Unit 2 Activity Book audio is intentionally absent until `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_02.json` exists.
- The script preserves the existing broad PDF scan behavior because K3 Unit 1 source PDFs live under `teachers_book_per_unit_pdf/提取自Unit_1`, not the normal `lesson_page_pdfs/unit_1` folder.

### Next Step
- Ask the OCR/resource session to create and manually QA `activity_book_audio_track_map_unit_02.json`.
- After Unit 2 AB map is available, rerun `npm run sync:power-up:resources -- --unit 02` and do visual spot checks before bulk-running Units 3-9.

---

## 2026-07-15 — K1/K2 Power Up AB PDFs Synced to Public

### Completed
- Verified K1 Starter and K2 Level 1 Activity Book PDFs are already extracted under the Power Up source `lesson_page_pdfs` folders for Units 1-9.
- Ran the generalized Power Up resource sync for Units 3-9.
- Confirmed `web/public` now contains K1/K2 Activity Book PDFs for Units 1-9.

### Files / Paths
- Source root: `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/`
- Public root: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/`
- Sync command used: `npm run sync:power-up:resources -- --unit 03` through `--unit 09`

### Current Status
- K1 public AB PDF coverage:
  - Units 1,2,4,5,7,8: 10 AB PDFs each.
  - Units 3,6,9: 12 AB PDFs each.
- K2 public AB PDF coverage:
  - Units 1,2,4,5,7,8: 12 AB PDFs each.
  - Units 3,6,9: 14 AB PDFs each.
- No Activity Book audio was inferred for Units 2-9 because AB audio requires verified `activity_book_audio_track_map_unit_XX.json` files.

### Risks / Notes
- K2 source AB PDFs do exist for Units 1-9; do not treat K2 as missing.
- K2/K3 unit-level audio matching still needs separate review for later units; this update only confirms AB PDF extraction/public sync.

---

## 2026-07-15 — Power Up PDF Extraction Coverage Updated

### Completed
- External PDF extraction session reported complete K1/K2/K3 Power Up lesson-page PDF extraction coverage.
- Standard filename format is now:
  `{LevelName}_{Role}_U{Unit}_L{Lesson}_pg{Page}.pdf`
- Level names:
  - K1: `Starters`
  - K2: `LevelOne`
  - K3: `LevelTwo`
- Roles:
  - `TB`: Teacher's Book
  - `PB`: Pupil's Book
  - `AB`: Activity Book
  - `UH`: Unit Hello special marker

### Source / Product Paths
- K1 source: `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/starter/source/`
- K1 extracted PDFs: `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/starter/source/lesson_page_pdfs/`
- K2 source: `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_1/source/`
- K2 extracted PDFs: `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_1/source/lesson_page_pdfs/`
- K3 source: `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_2/source/`
- K3 extracted PDFs: `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_2/source/lesson_page_pdfs/`

### Current Status
- K1 / Starters:
  - TB+PB: 200 files
  - AB: 108 files
  - Total: 308 files
  - Public AB PDFs already synced for Units 1-9.
- K2 / Level 1:
  - TB+PB: 220 files
  - AB: 108 files
  - Total: 328 files
  - Public AB PDFs already synced for Units 1-9.
- K3 / Level 2:
  - TB+PB: 220 files
  - AB: 108 files
  - Total: 328 files
  - Public sync pending.
- Combined extracted PDF total: 964 files.

### Lesson Counts
- K1:
  - UH: 4 lessons
  - Units 1,2,4,5,7,8: 10 lessons each
  - Units 3,6,9: 12 lessons each, including review
  - Total: 100 lessons
- K2:
  - UH: 2 lessons
  - Units 1,2,4,5,7,8: 12 lessons each
  - Units 3,6,9: 14 lessons each, including review
  - Total: 126 lessons
- K3:
  - UH: 2 lessons
  - Units 1,2,4,5,7,8: 12 lessons each
  - Units 3,6,9: 14 lessons each, including review
  - Total: 126 lessons

### Known Issues
- K3 U4 L11 is missing in the original source; TB/PB/AB currently use placeholder PDFs marked:
  `Power Up Level 2 — Unit 4 — Lesson 11 — page 54 is missing`
- K2 Unit 1 has legacy extracted copies under:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/level_1/source/teachers_book_per_unit_pdf/Unit 1 PDF single page/提取自Unit_1_副本/`
- K1 `00_Intro.pdf` has 15 pages and has not been extracted.
- Activity Book audio track maps for Units 2-9 are still a separate task; PDF extraction does not imply audio mapping is complete.

### Extraction Scripts
- Extraction scripts are stored under:
  `/Users/Lucia/.mavis/sessions/mvs_8c34b6010dd94cf89dcf20827748cc04/workspace/`
- Notable scripts:
  - `extract_starters_ab_v2.py`
  - `extract_level1.py`
  - `extract_level2.py`
  - `extract_level2_ab_v2.py`
  - `extract_level2_u4_v2.py`
  - `merge_starters.py`
  - `rename_*.py`

### Next Decisions
- Decide whether to sync K3 extracted PDFs to `web/public` using the same generalized Power Up resource sync flow.
- Decide whether to investigate and replace K3 U4 L11 placeholder PDFs.
- Decide whether K1 `00_Intro.pdf` should be extracted.
- Generate AB audio track maps for Units 2-9 after PDF coverage is confirmed.

---

## 2026-07-15 — Power Up UH and K3 Public Resource Sync

### Completed
- Added `--unit uh` support to the generalized Power Up resource sync script.
- Synced `unit-uh` and Units 1-9 through the public resource pipeline.
- Confirmed K1/K2/K3 public resource folders now contain TB/PB/AB PDFs and `resource-manifest.json` for `unit-uh` and Units 1-9.
- Refreshed K3 public resources using the newly extracted K3 Level 2 PDFs.

### Files / Paths
- Sync script: `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-resources.mjs`
- Public root: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/`

### Current Status
- K1 public coverage:
  - `unit-uh`: 4 TB, 4 PB, 4 AB
  - Units 1,2,4,5,7,8: 10 TB, 10 PB, 10 AB each
  - Units 3,6,9: 12 TB, 12 PB, 12 AB each
- K2 public coverage:
  - `unit-uh`: 2 TB, 2 PB, 2 AB
  - Units 1,2,4,5,7,8: 12 TB, 12 PB, 12 AB each
  - Units 3,6,9: 14 TB, 14 PB, 14 AB each
- K3 public coverage:
  - `unit-uh`: 2 TB, 2 PB, 2 AB
  - Units 1,2,4,5,7,8: 12 TB, 12 PB, 12 AB each
  - Units 3,6,9: 14 TB, 14 PB, 14 AB each
- `npm run build` passes.

### Risks / Notes
- `unit-uh` sync intentionally copies PDFs only; no unit audio is inferred.
- AB audio maps for Units 2-9 remain pending and must come from verified `activity_book_audio_track_map_unit_XX.json` files.
- K3 U4 L11 still uses the known placeholder PDFs until the missing source page is resolved.

---

## 2026-07-15 — Power Up PDF Review Page Added

### Completed
- Added a resource-only PDF review page for K1/K2/K3 Power Up public manifests.
- Added a curriculum home entry link to the PDF review page.
- The page reads `resource-manifest.json` dynamically and shows TB/PB/AB PDF buttons by lesson for `unit-uh` and Units 1-9.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/PowerUpResourceReviewPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/app/App.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/CurriculumHome.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- Review URL: `/curriculum/power-up/resources`
- This page is for PDF/resource QA only. It does not mean formal K-language Unit 2-9 curriculum content pages are locked or generated.
- `npm run build` passes.

### Risks / Notes
- Formal K-language curriculum pages still require canonical overview/week/lesson markdown. Current confirmed canonical K-language pages are K1 U1/U2, K2 U1, and K3 U1.

---

## 2026-07-15 — K1 Language Unit 2 Dynamic Page Registered

### Completed
- Used K1 Unit 2 canonical markdown as the first post-Unit-1 K-language dynamic page test.
- Regenerated the web TypeScript snapshot from canonical markdown.
- Cleaned K1 Unit 2 `Source` fields so they use stable page references instead of `待补充` placeholders.
- Registered K1 Language Unit 2 in the dynamic unit manifest.

### Files / Paths
- Source markdown:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/language_courses/unit_02_at_school/`
- Generated data:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k1LanguageUnit02.ts`
- Registry:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`

### Current Status
- Route active:
  `/curriculum/k1/language/unit-02`
- `npm run sync:k-language -- --level k1 --unit 02 --title "At School" --source-root /Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/language_courses/unit_02_at_school` passes.
- `npm run build` passes.
- Page route and K1 U2 resource manifest both return HTTP 200 locally.

### Risks / Notes
- K1 Unit 2 has canonical structure and dynamic rendering, but still needs human visual/content review before being treated as a locked reference.
- Audio display depends on the current resource manifest; Activity Book audio still requires the Unit 2 verified AB track map.

---

## 2026-07-15 — K-Language Source Display Adjusted

### Completed
- Restored the K-language Source block toward the previous resource-card structure.
- PDF cards now stay in fixed `TB → PB → AB` order and use a book-style icon.
- Soundtrack is split into `Pupil's Book` and `Activity Book` sections.
- Track labels display teacher-facing track numbers where available.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/resources/powerUpResources.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- K2/K3 track labels already come from manifest values like `1.11` or `4.10`.
- K1 Starter source filenames use internal `tr_027` style IDs, so the frontend derives display labels such as `2.01` from the unit-level PB audio sequence without renaming audio files.
- `npm run build` passes.

### Risks / Notes
- K1 Activity Book audio display for Units 2-9 still depends on verified AB audio track maps.

---

## 2026-07-15 — K1 Language Units 3-9 Canonical Drafts and Dynamic Routes

### Completed
- Generated K1 Language Unit 3-9 canonical markdown drafts from Power Up Starter extracted teacher-book markdown.
- Synced K1 Language Units 3-9 into web TypeScript snapshots.
- Registered K1 Language Units 3-9 in the dynamic unit manifest.
- Confirmed K1 Language Units 1-9 are now reachable from the dynamic curriculum route pattern.

### Files / Paths
- Canonical source root:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/language_courses/`
- Generated web snapshots:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k1LanguageUnit03.ts`
  through
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k1LanguageUnit09.ts`
- Registry:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`

### Current Status
- K1 Language active routes now include:
  `/curriculum/k1/language/unit-01`
  through
  `/curriculum/k1/language/unit-09`
- `npm run sync:k-language` passed for Units 3-9.
- `npm run build` passes.
- Spot-checked Unit 3, Unit 6, and Unit 9 routes locally; all return HTTP 200.

### Risks / Notes
- Units 3-9 are canonical drafts generated conservatively from extraction metadata. They still require human content review before being treated as locked curriculum references.
- Where the extraction source did not split a review page into a full lesson narrative, the canonical draft uses review/continuation wording and keeps source page links stable rather than inventing detailed content.
- AB audio for Units 2-9 remains pending until verified AB track maps are available.

### Next Step
- Repeat the same canonical-draft pass for K2 Language Units 2-9 or review K1 Units 3-9 visually/content-wise first.

---

## 2026-07-15 — K1 Starter AB Audio Track Maps Live

### Completed
- Accepted verified K1 Starter Activity Book audio track maps for Units 1-9.
- Re-ran the Power Up resource sync for Units 1-9.
- Published K1 Starter AB audio links into public resource manifests.

### Files / Paths
- Source maps:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_01.json`
  through
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_09.json`
- Public manifests:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k1/unit-01/resource-manifest.json`
  through
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k1/unit-09/resource-manifest.json`

### Current Status
- K1 Starter AB audio total: 105.
- All K1 Starter AB audio entries are `verified`.
- Public audio file missing count: 0.
- Per unit K1 AB audio counts:
  - U1: 14
  - U2: 12
  - U3: 10
  - U4: 14
  - U5: 11
  - U6: 11
  - U7: 12
  - U8: 11
  - U9: 10
- `npm run build` passes.

### Risks / Notes
- The sync also reads K2/K3 map files now present in the Power Up root. Some K2/K3 entries remain low-confidence and should not be treated as fully approved until separately reviewed.

---

## 2026-07-15 — K1 Language Summary Canonical Format Normalized

### Completed
- Normalized K1 Language Units 3-9 `00_overview.md` `Language Summary` format to match the existing K-language spec.
- Rebuilt each summary from lesson-level `#### New Language` fields only, excluding recycled language from the unit overview chip list.
- Re-synced K1 Language Units 3-9 TypeScript snapshots.

### Files / Paths
- Canonical source root:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/language_courses/`
- Generated web snapshots:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k1LanguageUnit03.ts`
  through
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k1LanguageUnit09.ts`

### Current Status
- Language Summary counts:
  - U3: 29 unique new language items
  - U4: 27 unique new language items
  - U5: 34 unique new language items
  - U6: 28 unique new language items
  - U7: 33 unique new language items
  - U8: 37 unique new language items
  - U9: 28 unique new language items
- `npm run sync:k-language` passed for Units 3-9.
- `npm run build` passes.

### Risks / Notes
- The renderer remains tolerant of older Language Summary strings, but canonical K-language source should use:
  `{N} unique new language items ｜ item1 ｜ item2 ｜ ...`
- Units 3-9 are still canonical drafts and need curriculum review before being treated as locked content.

---

## 2026-07-15 — K2 Level 1 AB Soundtrack Live

### Completed
- Accepted verified K2 Level 1 Activity Book soundtrack maps for Units 1-9.
- Re-ran the Power Up resource sync for Units 1-9.
- Published K2 Activity Book audio links into public resource manifests.

### Files / Paths
- Source maps:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_01.json`
  through
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_09.json`
- Public manifests:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01/resource-manifest.json`
  through
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-09/resource-manifest.json`

### Current Status
- K2 Level 1 AB soundtrack total: 44.
- All K2 Level 1 AB soundtrack entries are `verified`.
- Public audio file missing count: 0.
- Per unit K2 AB soundtrack counts:
  - U1: 7
  - U2: 3
  - U3: 4
  - U4: 5
  - U5: 4
  - U6: 8
  - U7: 4
  - U8: 6
  - U9: 3
- `npm run build` passes.

### Risks / Notes
- The resource sync script rewrites K1/K2/K3 manifests together for each unit. This update only treats K2 AB soundtrack as newly accepted for web review.
- K3 AB soundtrack still needs separate acceptance before it should be considered fully live.

---

## 2026-07-15 — K3 Level 2 AB Soundtrack Live

### Completed
- Accepted verified K3 Level 2 Activity Book soundtrack maps for Unit Hello and Units 1-9.
- Fixed the Power Up resource sync script so unit-level AB audio entries with `lesson: null` remain visible in `unitAudio` instead of being coerced to lesson `0`.
- Re-ran the Power Up resource sync for Unit Hello and Units 1-9.
- Published K3 Activity Book audio links into public resource manifests.

### Files / Paths
- Source maps:
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_uh.json`
  and
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_01.json`
  through
  `/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_09.json`
- Sync script:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-resources.mjs`
- Public manifests:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k3/unit-uh/resource-manifest.json`
  and
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k3/unit-01/resource-manifest.json`
  through
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k3/unit-09/resource-manifest.json`

### Current Status
- K3 Level 2 AB soundtrack total: 43.
- All K3 Level 2 AB soundtrack entries are `verified`.
- Public audio file missing count: 0.
- Per unit K3 AB soundtrack counts:
  - UH: 2
  - U1: 5
  - U2: 3
  - U3: 6
  - U4: 5
  - U5: 2
  - U6: 6
  - U7: 5
  - U8: 4
  - U9: 5
- `npm run build` passes.

### Risks / Notes
- K3 AB soundtrack includes both CD4 Activity Book tracks and PB story reuse tracks (`1.xx`, `2.xx`, `3.xx`) according to the accepted mapping convention.
- Unit Hello AB soundtrack entries are unit-level audio because their source mapping does not attach them to a concrete lesson page.

---

## 2026-07-15 — K2/K3 Language Units 2-9 Dynamic Pages Live

### Completed
- Generated canonical draft markdown for K2 Language Units 2-9 from Power Up Level 1 manual extraction data.
- Generated canonical draft markdown for K3 Language Units 2-9 from Power Up Level 2 manual extraction data.
- Synced all K2/K3 Unit 2-9 markdown sources into frontend TypeScript snapshots.
- Registered K2/K3 Language Units 2-9 in the dynamic curriculum manifest.

### Files / Paths
- K2 canonical source root:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/`
- K3 canonical source root:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k3/language_courses/`
- Generated web snapshots:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k2LanguageUnit02.ts`
  through
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k2LanguageUnit09.ts`
  and
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k3LanguageUnit02.ts`
  through
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k3LanguageUnit09.ts`
- Registry:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`

### Current Status
- K2 Language routes now include:
  `/curriculum/k2/language/unit-01`
  through
  `/curriculum/k2/language/unit-09`
- K3 Language routes now include:
  `/curriculum/k3/language/unit-01`
  through
  `/curriculum/k3/language/unit-09`
- `npm run sync:k-language` passed for all new K2/K3 units.
- `npm run build` passes.
- Local HTTP spot checks returned 200 for:
  `/curriculum/k2/language/unit-02`
  `/curriculum/k2/language/unit-09`
  `/curriculum/k3/language/unit-02`
  `/curriculum/k3/language/unit-09`

### Risks / Notes
- These are canonical drafts generated from existing Power Up manual extraction data. They are suitable for web review and resource QA, but still need curriculum/editorial review before being treated as locked final source.
- K3 Unit 4 reflects the known source/resource gap around Lesson 11; the generated page count is therefore lower than the usual pattern.
- Week 4 handling preserves original Power Up review lessons when extraction data contains Lessons 13-14; otherwise Week 4 remains an EASTIE showcase block.

---

## 2026-07-15 — K3 Shared PB/AB Soundtrack Display

### Completed
- Updated the Power Up resource sync so Activity Book soundtrack entries that point to Student's Book audio are marked as `shared-pupil-activity`.
- Updated K-language Source rendering to display a separate soundtrack subgroup: `Pupil's Book + Activity Book`.
- Re-synced Power Up resource manifests for Unit Hello and Units 1-9.

### Files / Paths
- Sync script:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-resources.mjs`
- Frontend resource grouping:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/resources/powerUpResources.ts`
- Source renderer:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitPage.tsx`

### Current Status
- K3 shared PB/AB soundtrack entries: 9.
- Public shared audio file missing count: 0.
- Shared tracks by unit:
  - U1: 1.10
  - U2: 1.24
  - U3: 1.38
  - U4: 2.02
  - U5: 2.19
  - U6: 2.34
  - U7: 3.05
  - U8: 3.24
  - U9: 3.41
- `npm run build` passes.

### Risks / Notes
- The shared category is derived from AB mapping entries whose audio path points to Student's Book class audio. These are displayed separately so teachers do not think the Pupil's Book soundtrack is missing.

---

## 2026-07-16 — K1/K2/K3 Language Unit Hello Dynamic Pages Live

### Completed
- Added canonical draft markdown for K1, K2, and K3 Language Unit Hello.
- Synced Unit Hello markdown into generated frontend TypeScript snapshots.
- Registered Unit Hello in the dynamic curriculum manifest using `unitNumber: 0` and public route slug `unit-uh`.
- Updated K-language route/path/resource helpers so `/unit-uh` can load the correct Unit Hello page and Power Up `unit-uh` resource manifest.
- Enabled UH links on the curriculum home and top navigation when a level/course has a registered Unit Hello.

### Files / Paths
- Canonical sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1/language_courses/unit_00_hello/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/language_courses/unit_00_hello/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k3/language_courses/unit_00_hello/`
- Generated web snapshots:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k1LanguageUnit00.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k2LanguageUnit00.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/k3LanguageUnit00.ts`
- Registry and routing helpers:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/UnitPage.tsx`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitPage.tsx`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/resources/powerUpResources.ts`

### Current Status
- Unit Hello routes now include:
  `/curriculum/k1/language/unit-uh`
  `/curriculum/k2/language/unit-uh`
  `/curriculum/k3/language/unit-uh`
- `npm run sync:k-language` passed for K1/K2/K3 Unit Hello.
- `npm run build` passes.
- Local HTTP spot checks returned 200 for all three Unit Hello routes.
- Unit Hello is now a one-week unit in generated data:
  - K1: 1 week / 4 lessons
  - K2: 1 week / 2 lessons
  - K3: 1 week / 2 lessons

### Risks / Notes
- Unit Hello uses `unitNumber: 0` internally and `unit-uh` in public URLs.
- K1 Unit Hello has 4 original Power Up Starter lessons; K2/K3 Unit Hello have 2 original Power Up lessons.
- K3 Unit Hello Source fields include `4.07` and `4.08` references so unit-level AB audio can appear on the relevant lesson pages.

---

## 2026-07-16 — PK Language Unit 7 Dynamic Page Live for Review

### Completed
- Synced PK Unit 7 `Move and Play` language markdown from the curriculum design workspace into a generated frontend TypeScript snapshot.
- Registered PK Language Unit 7 in the dynamic curriculum manifest using the existing PG/PK language renderer.
- Added a dedicated `sync:pk-language-unit-07` npm command for future re-sync after source markdown edits.
- Started the local Vite dev server for review.

### Files / Paths
- Source markdown root:
  `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus`
- Generated web snapshot:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit07.ts`
- Registry / scripts:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/package.json`

### Current Status
- Route live locally:
  `/curriculum/pk/language/unit-07`
- `npm run sync:pk-language-unit-07` passes.
- Sync checked 4 weeks and 20 lessons.
- `npm run build` passes.
- Local HTTP spot check returned 200.

### Risks / Notes
- This uses the existing PK/PG language page renderer, so visual and structural feedback should be reviewed against the already approved PK Language Unit 6 baseline.
- Source of truth for this unit is currently under `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus`, not the older Desktop curriculum workspace.

---

## 2026-07-16 — PK Language Unit Hello + Units 1-9 Dynamic Pages Live

### Completed
- Extended the generic PG/PK language sync script so it supports Unit Hello source naming and one-week units.
- Synced PK Language Unit Hello and Units 1-9 into generated frontend TypeScript snapshots.
- Registered PK Language Unit Hello and Units 1-9 in the dynamic curriculum manifest using the existing PG/PK language renderer.
- Updated the PK/PG language page path/title helper so Unit Hello renders and links as `/unit-uh` rather than `unit-00`.
- Added npm sync commands for PK Language Unit Hello, Units 1-9, and a batch `sync:pk-language-units` command.

### Files / Paths
- Main source root for Hello, Units 1-5, 7, 8, 9:
  `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus`
- Unit 6 source root:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus`
- Generated web snapshots:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit00.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit01.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit02.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit03.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit04.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit05.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit06.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit07.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit08.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pkLanguageUnit09.ts`
- Sync / registry / renderer:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-language-unit.mjs`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/LanguageUnitPage.tsx`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/package.json`

### Current Status
- Live local routes include:
  `/curriculum/pk/language/unit-uh`
  `/curriculum/pk/language/unit-01`
  `/curriculum/pk/language/unit-02`
  `/curriculum/pk/language/unit-03`
  `/curriculum/pk/language/unit-04`
  `/curriculum/pk/language/unit-05`
  `/curriculum/pk/language/unit-06`
  `/curriculum/pk/language/unit-07`
  `/curriculum/pk/language/unit-08`
  `/curriculum/pk/language/unit-09`
- `npm run sync:pk-language-units` passes.
- Unit Hello sync checked 1 week and 5 lessons.
- Units 1-9 each sync checked 4 weeks and 20 lessons.
- `npm run build` passes.
- Local HTTP spot checks returned 200 for Unit Hello, Unit 1, Unit 5, Unit 8, and Unit 9.

### Risks / Notes
- Unit 6 currently still comes from the older Desktop curriculum workspace; the other newly added PK language units come from `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus`.

---

## 2026-07-16 — PG Language Unit Hello + Units 1-9 Dynamic Pages Live

### Completed
- Synced PG Language Unit Hello and Units 1-9 into generated frontend TypeScript snapshots.
- Registered PG Language Unit Hello and Units 1-9 in the dynamic curriculum manifest using the existing PG/PK language renderer.
- Added npm sync commands for PG Language Unit Hello, Units 1-9, and a batch `sync:pg-language-units` command.
- Extended the generic language sync script so PG also supports one-week Unit Hello overview sections.
- Added a sync alias so `Suggested Activity / Play` is normalized to the renderer field `Suggested Activity / Game`.

### Files / Paths
- Main source root for Hello, Units 1-5, 7, 8, 9:
  `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus`
- Unit 6 source root:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus`
- Generated web snapshots:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit00.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit01.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit02.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit03.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit04.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit05.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit06.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit07.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit08.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/pgLanguageUnit09.ts`
- Sync / registry:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-language-unit.mjs`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/package.json`

### Current Status
- Live local routes include:
  `/curriculum/pg/language/unit-uh`
  `/curriculum/pg/language/unit-01`
  `/curriculum/pg/language/unit-02`
  `/curriculum/pg/language/unit-03`
  `/curriculum/pg/language/unit-04`
  `/curriculum/pg/language/unit-05`
  `/curriculum/pg/language/unit-06`
  `/curriculum/pg/language/unit-07`
  `/curriculum/pg/language/unit-08`
  `/curriculum/pg/language/unit-09`
- `npm run sync:pg-language-units` passes.
- Unit Hello sync checked 1 week and 5 lessons.
- Units 1-9 each sync checked 4 weeks and 20 lessons.
- `npm run build` passes.
- Local HTTP spot checks returned 200 for Unit Hello, Unit 1, Unit 6, and Unit 9.

### Risks / Notes
- Unit 6 currently still comes from the older Desktop curriculum workspace; the other newly added PG language units come from `/Users/Lucia/Documents/New project/PG_PK_Language_Syllabus`.

---

## 2026-07-20 — K2 Art Units 4-6 Batch Quality Review and Acceptance

### Completed
- Reviewed K2 Art Units 4-6 as one batch against the accepted K2 Units 1-3 schema, annual progression and studio demand.
- Normalized the three Lesson 2 material sections to the established K2 heading structure while retaining all listed materials.
- Reduced each overview’s New Technical Demand to two integrated K2-level challenges; no teaching sequence or project intent was changed.
- Accepted the three five-file packages into the K2 Art course-line source and created unit-specific handoff notes.

### Files / Paths
- Accepted sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_04_food_with_friends/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_05_happy_birthday/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_06_a_day_out/`
- Handoff notes:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_unit_04_art_handoff.md`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_unit_05_art_handoff.md`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_unit_06_art_handoff.md`

### Current Status
- K2 Art Units 1-6 are reviewed and accepted course-line sources; Units 7-9 remain in production.
- These units are not promoted into K2 unit assembly or dynamic web content.

### Next Step
- Receive and review K2 Art Units 7-9, then run the full-year K2 Art progression review.

### Risks / Notes
- Unit 4 uses food only as safe visual observation material; it must not introduce tasting, allergy exposure or glass.
- Unit 5 requires safe, non-load-bearing construction and planned cross-break storage.
- Unit 6 needs accurate contextual resources for Chinese handscroll and Indigenous journey/map references before teaching.

---

## 2026-07-16 — K2 Unit Hello Power Up Audio Resources Added

### Completed
- Added K2 / Power Up Level 1 Unit Hello audio mapping to the Power Up resource sync script.
- Re-synced Unit Hello Power Up resources.
- K2 Unit Hello now has Pupil's Book and Activity Book audio in its resource manifest.

### Files / Paths
- Sync script:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-power-up-resources.mjs`
- Resource manifest:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-uh/resource-manifest.json`
- Public audio files:
  `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-uh/audio/`

### Current Status
- K2 Unit Hello audio count: 7.
- Lesson 1 audio:
  `0.02`, `0.03`, `0.04` Pupil's Book; `0.07` Activity Book.
- Lesson 2 audio:
  `0.05`, `0.06` Pupil's Book; `0.08` Activity Book.
- `npm run sync:power-up:resources -- --unit uh` passes.
- `npm run build` passes.
- `/curriculum/k2/language/unit-uh` local spot check returned 200.

### Risks / Notes
- K2 Unit Hello audio mapping is a small manual resource-layer map derived from the Level 1 Teacher Book manual extraction and Level 1 audio scripts.

---

## 2026-07-20 — K2 Art Units 7-9 Batch Quality Review and Acceptance

### Completed
- Reviewed K2 Art Units 7-9 against the accepted K2 Art schema, annual map and previous K2 unit progression.
- Normalized the three Lesson 2 material sections and reduced each overview to two integrated K2-level technical demands.
- Accepted the three five-file packages into the K2 Art course-line source and created unit-specific handoff notes.

### Files / Paths
- Accepted sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_07_lets_play/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_08_at_home/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_09_happy_holidays/`
- Handoff notes:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_unit_07_art_handoff.md`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_unit_08_art_handoff.md`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_unit_09_art_handoff.md`

### Current Status
- K2 Art Units 1-9 are reviewed and accepted course-line sources.
- The K2 line awaits its final cross-unit review and has not been promoted into K2 unit assembly or dynamic web content.

### Next Step
- Run the full-year K2 Art progression review and lock the line if no material gaps are found.

### Risks / Notes
- Unit 7 must use stable poses, diverse movement references and no physical-skill assessment.
- Unit 8 requires contextual architecture references and safe, non-load-bearing construction.
- Unit 9 must not require travel disclosure or rank places; personal memories and imagined places remain valid.

---

## 2026-07-20 — K2 Art Full-Year Final Review

### Completed
- Completed the K2 Art Units 1-9 cross-unit review against the Art Growing Ladder, Scope and Sequence, Annual Unit Map, media progression, encounter map and Markdown schema.
- Confirmed coherent Fall observation/control progression and Spring narrative/mood/structure/revision progression.
- Confirmed all nine unit packages, 36 lesson files and nine handoff notes are structurally complete and free of placeholders.
- Locked the K2 Art course-line source; no curriculum-level rewrite was required.

### Files / Paths
- Final review:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_full_year_art_final_review.md`
- Locked course-line sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/`

### Current Status
- K2 Art Units 1-9 are aligned and locked as a course-line source.
- The line is not yet promoted into K2 unit assembly or dynamic web content.

### Next Step
- Create and review the exact K2 Art Encounter artwork/source sheet before classroom delivery or frontend promotion.

### Risks / Notes
- Broad Art Encounter labels are not sufficient for classroom delivery: exact artwork, source, contextual note and anti-copying guidance must be locked first.

---

## 2026-07-20 — K2 Art Power Up Language Alignment Review

### Completed
- Re-reviewed K2 Art Units 1-9 after receipt of the Power Up Level 1 non-language language reference.
- Updated every Art overview’s Theme Connection and Light Theme Language to identify valid Power Up recycling and prevent Art from becoming a duplicate language lesson.
- Recorded unit-specific boundaries for Power Up mission/showcase links, sentence mastery, role-play, reading/writing and language assessment.
- Revalidated the 36 Art lesson schemas; no lesson-level language objective or language assessment was found.

### Files / Paths
- Power Up reference used:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k2/non_language_courses/00_shared_references/k2_power_up_level1_language_reference.md`
- Updated K2 Art sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/`
- Updated final review:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k2_full_year_art_final_review.md`

### Current Status
- K2 Art remains aligned and locked as a course-line source, now with verified Power Up Level 1 language-recycling boundaries.
- Art assessment remains visual/process-based; Power Up language is optional contextual support only.

### Next Step
- Build the exact K2 Art Encounter artwork/source sheet before classroom delivery or frontend promotion.

### Risks / Notes
- Additional Art-specific object words may be introduced only as light content exposure, not as new required K2 language targets.

---

## 2026-07-20 — K3 Art Units 1-3 Batch Review and Acceptance

### Completed
- Reviewed K3 Art Units 1-3 against the K3 annual map, Growing Ladder, shared Markdown schema and K2-to-K3 progression.
- Normalized the three Lesson 2 material sections to the established schema and reduced each overview to two integrated new technical demands.
- Accepted the three five-file packages into the K3 Art course-line source and created unit-specific handoff notes.

### Files / Paths
- Accepted sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k3/unit_01_a_day_on_the_farm/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k3/unit_02_my_week/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k3/unit_03_party_time/`
- Handoff notes:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k3_unit_01_art_handoff.md`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k3_unit_02_art_handoff.md`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k3_unit_03_art_handoff.md`

### Current Status
- K3 Art Units 1-3 are reviewed and accepted course-line sources; Units 4-9 remain in production.
- These units are not promoted into K3 unit assembly or dynamic web content.

### Next Step
- Receive and review K3 Art Units 4-6, then continue controlled batch production.

### Risks / Notes
- Exact Art Encounter sources need to be selected with contextual safeguards before teaching.
- Unit 2 must remain a visual-system design task, not a writing assessment; Unit 3 requires contextual performance/costume references.

---

## 2026-07-20 — K3 Art Units 4-6 Batch Review and Acceptance

### Completed
- Reviewed K3 Art Units 4-6 against the K3 annual map, shared schema and accepted K3 Units 1-3 progression.
- Normalized the three Lesson 2 material sections and reduced each overview to two integrated new technical demands without changing project intent.
- Accepted the three five-file packages into the K3 Art course-line source and created unit-specific handoff notes.

### Files / Paths
- Accepted sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k3/unit_04_the_family_at_home/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k3/unit_05_animal_world/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k3/unit_06_our_weather/`
- Handoff notes:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k3_unit_04_art_handoff.md`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k3_unit_05_art_handoff.md`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k3_unit_06_art_handoff.md`

### Current Status
- K3 Art Units 1-6 are reviewed and accepted course-line sources; Units 7-9 remain in production.
- These units are not promoted into K3 unit assembly or dynamic web content.

### Next Step
- Receive and review K3 Art Units 7-9, then run the full-year K3 Art progression review.

### Risks / Notes
- U4 requires inclusive, non-idealised home/family references and lightweight, non-load-bearing construction.
- U5 requires contextual handling of animal-symbol references and safe printmaking; U6 requires indoor-only severe-weather observation and safe wet-media routines.

---

## 2026-07-20 — K3 Art Units 7-9 Batch Review and Acceptance

### Completed
- Reviewed, normalized and accepted K3 Art Units 7-9 into the K3 Art course-line source.
- Unified Lesson 2 material structure and reduced each overview to two integrated new technical demands.
- Created K3 U7-U9 handoff notes.

### Files / Paths
- Accepted sources: `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k3/unit_07_lets_cook/`, `unit_08_around_town/`, `unit_09_a_big_change/`
- Handoffs: `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k3_unit_07_art_handoff.md`, `k3_unit_08_art_handoff.md`, `k3_unit_09_art_handoff.md`

### Current Status
- K3 Art Units 1-9 are reviewed and accepted; the line awaits final cross-unit review.

### Next Step
- Run the full-year K3 Art progression review.

### Risks / Notes
- U7 is not a cooking or writing assessment; U8 requires genuine group planning; U9 must preserve independent medium/outcome choice and privacy.

---

## 2026-07-20 — K3 Art Full-Year Final Review

### Completed
- Completed the K3 Art Units 1-9 cross-unit review against the Growing Ladder, Scope and Sequence, Annual Unit Map, media progression, encounter map and Markdown schema.
- Confirmed a coherent K2-to-K3 increase in planning, studies, material testing, audience communication, collaboration and independent artistic decisions.
- Confirmed all nine unit packages, 36 lesson files and nine handoff notes are structurally complete and free of placeholders.
- Locked the K3 Art course-line source; no curriculum-level rewrite was required.

### Files / Paths
- Final review:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/04_handoff_notes/k3_full_year_art_final_review.md`
- Locked course-line sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k3/`

### Current Status
- K3 Art Units 1-9 are aligned and locked as a course-line source.
- The line is not yet promoted into K3 unit assembly or dynamic web content.

### Next Step
- Create and review the exact K3 Art Encounter artwork/source sheet before classroom delivery or frontend promotion.

### Risks / Notes
- Broad Art Encounter labels are not sufficient for delivery: exact artwork, source, context, suitability and anti-copying guidance must be locked first.

---

## 2026-07-20 — K1-K3 Art Unit Hello Review and Acceptance

### Completed
- Reviewed and accepted one-lesson Art Unit Hello packages for K1, K2 and K3.
- Confirmed the entry progression: K1 mark-making/studio routine; K2 limited media choice/adjustment; K3 alternatives, intentional selection and revision.
- Registered the three entry packages as separate from the nine standard annual units and created handoff notes.

### Files / Paths
- Sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k1/unit_hello/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_hello/`
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k3/unit_hello/`

### Current Status
- K1-K3 Art now has accepted Unit Hello entry packages plus locked Units 1-9.
- Unit Hello is not part of the nine standard units and is not promoted to assembly/frontend.

### Next Step
- Build the level-specific exact Art Encounter resource sheets before classroom delivery or frontend promotion.

### Risks / Notes
- Preserve Unit Hello as a baseline and studio-entry experience; do not let it duplicate Unit 1 or create language/writing assessment.

---

## 2026-07-20 — K1-K3 Art Frontend Source Handoff

### Completed
- Sent the locked K1-K3 Art source locations, package structure, final-review paths and promotion boundary to the frontend deployment session.

### Files / Paths
- Canonical Art source root:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/`
- Final reviews:
  `04_handoff_notes/k1_full_year_art_final_review.md`
  `04_handoff_notes/k2_full_year_art_final_review.md`
  `04_handoff_notes/k3_full_year_art_final_review.md`

### Current Status
- Art is locked as a course-line source for K1-K3, including separate one-lesson Unit Hello packages.
- No unit is currently authorized for unit-assembly or dynamic-web promotion.

### Next Step
- PM authorization plus exact level-specific Art Encounter resource sheets are required before frontend sync/publishing.

### Risks / Notes
- Frontend must preserve the five-file standard-unit source model and keep Art assessment visual/process-based rather than language-based.

---

## 2026-07-21 — K1-K3 Art Language-Boundary Source Correction

### Completed
- Reclassified all Art vocabulary sections as teacher-facing Art concepts and studio prompts rather than child English vocabulary.
- Restored the established PG-compatible child-facing field name `Light Theme Language` across K1-K3 Art sources; its content remains restricted to Power Up-aligned recycling.
- Updated the shared Art Markdown schema to prohibit new child English targets through Art and to require only current/previous Power Up recycling.
- Sent the frontend deployment session the required rendering boundary: show only `Light Theme Language` as optional language support; do not render teacher Art concepts as word cards.

### Files / Paths
- Updated K1-K3 Art sources:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/`
- Updated shared schema:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/00_shared_framework/schemas/EASTIE_Art_Unit_and_Lesson_Markdown_Schema.md`

### Current Status
- K1-K3 Art remains locked as a course-line source with corrected language boundaries.
- Teacher Art concepts are for planning/prompting/assessment; only Light Theme Language may appear as optional child-facing English support.

### Next Step
- Translate K2 Art Unit 1 as the first Chinese mirror package using the corrected source policy, then review before scaling.

### Risks / Notes
- Translation and frontend work must not turn teacher Art concepts into bilingual child vocabulary cards or add any new English targets.

---

## 2026-07-21 — Art Frontend Handoff Correction

### Completed
- Redirected the Art source and language-rendering handoff to the active `Initialize web scaffold` session.
- Instructed the older frontend-deployment session to treat the previous message as informational only and not begin Art integration.

### Files / Paths
- Canonical Art root:
  `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/`

### Current Status
- The active web scaffold session now has the correct Art source location and rendering boundaries.

### Next Step
- Await PM authorization and exact Art Encounter resource sheets before Art dynamic-web integration.

### Risks / Notes
- Do not allow parallel frontend sessions to independently promote Art content.

---

## 2026-07-20 — K Art Dynamic Frontend Prototype

### Completed
- Added a reusable K Art Markdown sync contract and Art renderer, using Course C inside the existing K non-language shell.
- Connected K2 Unit 1 as the first review prototype with overview, four independent lesson routes, lesson feedback context and responsive layouts.
- Preserved all canonical overview and lesson headings/content; the renderer does not rewrite curriculum wording.

### Files / Paths
- Sync: `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k-art-unit.mjs`
- Generated snapshot: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kArtUnits.ts`
- Renderer/routes/styles: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/GradedReadingUnitPage.tsx`, `src/app/App.tsx`, `src/styles/eastie.css`
- Review route: `/curriculum/k2/non-language/unit-01/course-c`

### Current Status
- K2 Art Unit 1 is available as a local dynamic-web structure and visual prototype; `npm run build` passes.
- K1/K2/K3 full-year Art has not been batch-synced or published.

### Next Step
- PM/content review the K2 U1 Art field grouping and visual hierarchy, then lock the renderer before batch onboarding.

### Risks / Notes
- Exact Art Encounter artwork/source sheets remain required before classroom publication; the prototype currently displays the canonical textual encounter references only.

---

## 2026-07-21 — K2 Art Unit 1 Chinese Mirror Accepted

### Completed
- Completed final acceptance review of the five-file K2 Art Unit 1 Chinese mirror package.
- Confirmed matching heading structures, Chinese-only ordinary body content, and exact source parity for every `Light Theme Language` list.
- Confirmed the Lesson 4 Gallery Share section and Chinese-first artist naming are present.

### Files / Paths
- `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/02_translations/zh_cn/`

### Current Status
- K2 Art Unit 1 Chinese mirror is accepted as the first validated Art translation package and may serve as the format reference for later Art translations.

### Next Step
- Use the same translation boundary and validation checks for the next authorized Art unit.

### Risks / Notes
- Outside headings, English code/examples, Teacher Routine Language, Light Theme Language, and first-use artist names, translated body content must remain Chinese only.

---

## 2026-07-21 — K2 Art Unit 1 Chinese Frontend Handoff

### Completed
- Notified the active frontend scaffold session that the accepted K2 Art Unit 1 Chinese mirror may be connected to the existing Chinese/English switcher.
- Confirmed that Teacher Routine Language and Light Theme Language stay English in both display modes, with Light Theme Language rendered as PG-style chips.

### Files / Paths
- English source: `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/`
- Chinese mirror: `/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/02_translations/zh_cn/`

### Current Status
- K2 Art Unit 1 is the only Art unit currently approved for Chinese frontend switching.

### Next Step
- Frontend session can implement and verify the K2 Art Unit 1 language toggle using this package.

### Risks / Notes
- Do not infer Chinese mirrors for other Art units or render teacher Art concepts as child language cards.

---

## 2026-07-21 — K2 Art Unit 1 Chinese Web Integration

### Completed
- Connected the accepted five-file zh-CN mirror to the existing EN / 中文 switcher for the K2 Art Unit 1 overview and all four lesson routes.
- Kept `Light Theme Language` and `Teacher Routine Language` teaching inputs in English in both modes, while localizing their headings in zh-CN.
- Confirmed lesson pages do not render `Teacher Art Concepts` / `Core Concepts`, `Clean-Up and Storage`, or `Safety Notes`.

### Files / Paths
- Sync: `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k-art-unit.mjs`
- Language state: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/app/LanguageContext.tsx`
- Renderer: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/GradedReadingUnitPage.tsx`
- Generated snapshot: `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kArtUnits.ts`

### Current Status
- K2 Art Unit 1 renders its accepted Chinese mirror without raw bilingual heading separators; `npm run build` passes.
- Browser QA passed for the Chinese overview and Lesson 1, including English language chips and teacher routine phrases.

### Next Step
- PM/content review the K2 Unit 1 bilingual presentation before authorizing another Art translation package.

### Risks / Notes
- This integration is intentionally limited to K2 Art Unit 1; no Chinese mirror is inferred for other Art units.

---

## 2026-08-17 — PM Dynamic Coverage Recheck After Break

### Completed
- Rechecked the active web project instead of relying on older PM notes.
- Confirmed `npm run build` passes in `/Users/Lucia/Desktop/eastie_curriculum_project/web`.
- Confirmed the shared dynamic manifest currently registers 68 dynamic units.
- Corrected PM documentation so PG/PK Language is no longer described as missing Units 1-5 and 7-9.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/dynamicUnitManifest.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`

### Current Status
- PG Language: Unit Hello + Units 1-9 are generated and registered in the dynamic web app.
- PK Language: Unit Hello + Units 1-9 are generated and registered in the dynamic web app.
- K1/K2/K3 Language: Unit Hello + Units 1-9 are generated and registered in the dynamic web app.
- PG/PK Non-Language: Units 1-9 are generated and registered in the dynamic web app.
- K Non-Language: Math and Graded Reading remain dynamically active across Units 1-9, with broader unit assembly still incomplete.

### Next Step
- Treat PG/PK Language as a source-consolidation task, not a missing-page task: generated web snapshots exist, but the newer `06_curriculum_design/<level>/language_courses/` source pattern currently only shows PG/PK Unit 6.
- Continue the next sprint from real gaps: source consolidation, K non-language unit assembly, and selected QA of dynamic routes/content.

### Risks / Notes
- Generated TypeScript snapshots are not editable source-of-truth. Before making content edits to PG/PK Language Units 1-5 or 7-9, locate or migrate the corresponding Markdown source rather than editing generated files.

---

## 2026-08-17 — Accepted Source Registry And Clean Extraction Policy

### Completed
- Confirmed the PM strategy for the current production stage: do not force a full source migration while content is still being produced.
- Added an accepted-source registry so finalized usable source packages can be tracked without moving every historical file immediately.
- Added a clean extraction policy: after the main content body is complete, copy only accepted sources into the future clean `content/curriculum/` tree.
- Registered the new process rule and registry in `RULES_INDEX.md`.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/ACCEPTED_SOURCE_REGISTRY.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/accepted_source_and_clean_extraction_policy.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`

### Current Status
- Mixed working locations are allowed during active content production.
- Generated TypeScript remains non-editable web snapshot.
- Downloads remains a handoff/input location only.
- Accepted curriculum sources should now be registered before they are relied on for future clean migration.

### Next Step
- Ask active content/web sessions to report whether any newly finalized unit or course-line source should be added to `ACCEPTED_SOURCE_REGISTRY.md`.

### Risks / Notes
- The registry is intentionally selective. It should not become a dump of every draft, archive, generated file, or old static HTML prototype.

---

## 2026-08-17 — Restart Entry And Session Prompt Bank Updated

### Completed
- Rewrote `NEXT_SPRINT_START_HERE.md` for the post-break project state.
- Added a reusable session prompt bank for content, web, deployment, PG/PK language, K non-language assembly, Math, Graded Reading, and Art sessions.
- Registered the prompt bank in `RULES_INDEX.md`.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/NEXT_SPRINT_START_HERE.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_START_PROMPTS.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`

### Current Status
- New sessions no longer need to rely on the long PM conversation history.
- The active strategy is explicit: continue content production, register accepted sources, and delay clean extraction until later.

### Next Step
- Use `SESSION_START_PROMPTS.md` when opening specialist sessions for K non-language assembly, PG/PK language source consolidation, or course-line production.

### Risks / Notes
- The prompt bank should be updated whenever a major project strategy changes.

---

## 2026-08-17 — Curriculum Program Structure v2 Created

### Completed
- Created the first project-level rule for the new four-category curriculum structure:
  `Language`, `Core`, `CEC`, and `PE`.
- Defined how existing `non-language` content maps into the new categories.
- Kept the current state as a classification decision only: no route changes, source moves, API changes, or curriculum rewrites were made.
- Registered the new rule in `RULES_INDEX.md`.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/curriculum_program_structure_v2.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`

### Current Status
- `non-language` should now be treated as a legacy umbrella term.
- Future planning should use:
  - `Language`
  - `Core`
  - `CEC` / Creative Enrichment Curriculum
  - `PE`

### Next Step
- Update PM/status/source registry docs to reflect the four-category framework.
- Ask web/frontend session to design a compatibility plan before changing routes or data contracts.

### Risks / Notes
- Existing `non-language` routes and generated data must continue working during the transition.
- Do not bulk-rename folders or migrate source files until a deliberate migration plan is approved.

---

## 2026-08-18 — Curriculum Home Dashboard v2 Prototype

### Completed
- Rebuilt `/curriculum` as a grade-aware dashboard using the approved `Grade -> EL / CC / CE / PE -> Course Line -> Unit` structure.
- Added a dashboard config that preserves `legacyRouteForUnit` for the current site and `futureRoutePattern` for the later clean site.
- Kept current legacy routes active; no `/core`, `/creative-enrichment`, or `/physical-education` route family was introduced.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/curriculumDashboardConfig.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/CurriculumHome.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- Dashboard labels use the approved course type and course line catalog.
- Available unit buttons link to existing working routes; unavailable course lines are disabled.
- `npm run build` passes.

### Next Step
- PM/user visual review of the new `/curriculum` dashboard, then refine density, grouping, and disabled-state wording if needed.

### Risks / Notes
- This is a current-site navigation compatibility layer, not the future clean route contract.

---

## 2026-08-18 — Course-Line Unit Page Structure Pass

### Completed
- Updated K non-language course routes so course pages show a current-course lesson sidebar instead of the broader Course A/B/C directory.
- Updated PG/PK course routes so selected course pages show `Overview` plus the current course lesson list in the sidebar.
- Added visible `Course Unit Overview` placement to course pages, with a pending-source note for PG/PK course-level overview Markdown.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/GradedReadingUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/UnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- Existing routes remain unchanged.
- K2 Art and PG U8 course-page checks passed: sidebars show only the selected course lessons and `Course Unit Overview` is visible.
- `npm run build` passes.

### Next Step
- PM/content should define the future course-level overview Markdown fields for each course line.

### Risks / Notes
- PG/PK course-level overview content is currently represented by a placeholder plus existing course purpose; no new curriculum content was invented.

---

## 2026-08-18 — PG/PK Course Lesson Route Split

### Completed
- Added PG/PK course lesson routes such as `/curriculum/pg/non-language/unit-08/course-d/lesson-01`.
- Changed PG/PK course overview pages so lesson content is no longer expanded all on one page; each lesson opens as its own page.
- Adjusted the current-course sidebar spacing and lesson-card navigation so it is less crowded and more consistent with the new course-line entry model.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/app/App.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/UnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- Existing course routes still work as course overview pages.
- New lesson routes render one lesson at a time.
- `npm run build` passes.

### Next Step
- Review a few PG/PK course pages visually, then decide whether K Math / Graded Reading / Art sidebars need the same spacing treatment.

### Risks / Notes
- This only changes web routing/rendering; no curriculum Markdown content was modified.

---

## 2026-08-18 — Context-Aware Top Navigation

### Completed
- Updated top navigation unit buttons so course pages stay within the current course line when switching units.
- PG/PK course routes now map top nav units to the same legacy course route, for example `course-d` U8 -> `/curriculum/pg/non-language/unit-08/course-d`.
- K course routes only expose known active course-line unit links; unavailable course-line units remain disabled.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Layout/AppLayout.tsx`

### Current Status
- Existing language unit navigation remains unchanged.
- `npm run build` passes.

### Next Step
- Continue visual review of top navigation labels once the new dashboard/course-line terminology settles.

### Risks / Notes
- This remains a legacy-route compatibility layer; no new clean route contract was introduced.

---

## 2026-08-18 — Course Lesson Sidebar Alignment

### Completed
- Aligned PG/PK non-language course lesson sidebars with the existing PG/PK language lesson sidebar style.
- Replaced the experimental large card sidebar treatment with the established `Lesson Directory`, `Overview`, and compact lesson-link pattern.
- Removed `Course Unit Overview` from individual lesson pages; it now appears only on course overview pages.
- Kept PG/PK lesson pages as independent routes such as `/curriculum/pg/non-language/unit-08/course-d/lesson-01`.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/UnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/GradedReadingUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- PG/PK course lesson pages now match the language-course sidebar direction.
- Lesson page QA passed: one Overview link, four lesson links, current lesson only in main content, no repeated `Course Unit Overview`.
- `npm run build` passes.

### Next Step
- Continue visual review from the new `/curriculum` dashboard into course overview and lesson pages.

### Risks / Notes
- This remains a rendering/layout update only; no curriculum Markdown was changed.

---

## 2026-08-18 — K Language YLE Word Bank Fallback

### Completed
- Connected the K language `YLE Word Bank` dialog to the existing local YLE gap-bank data as a frontend fallback.
- Kept the existing `/api/yle-word-bank` call as the first choice; if the API is unavailable, the dialog now searches the bundled local 432-record word bank instead of failing.
- Preserved current extension behavior: adding a word still uses the extension API when available.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/extensions/k2ExtensionClient.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/extensions/data/yle_gap_bank.json`

### Current Status
- K language YLE search is no longer blocked by the local extension API service being offline.
- `npm run build` passes.

### Next Step
- Later backend work can formalize `/api/yle-word-bank`; the frontend fallback can remain as a review-mode safety net or be removed once the API is guaranteed.

### Risks / Notes
- This is a frontend fallback only; it does not make the extension “Add” action work offline.

---

## 2026-08-18 — K Language Extension API Integration

### Completed
- Added real Express API support for K language lesson extensions.
- Replaced the hard-coded frontend extension route with context-aware `level + unitId + lessonId` requests.
- Updated Vite dev proxy so `/api/k1`, `/api/k2`, and `/api/k3` route to the main API on port 4000.
- Added API persistence for vocabulary, sentence, and activity extension items, plus the existing report-issues flow.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/api/src/db.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/api/src/app.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/api/src/routes/languageExtensions.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/extensions/k2ExtensionClient.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/YleWordBankDialog.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/vite.config.ts`

### Current Status
- Demo teacher login works through the existing auth API.
- Extension create/read/delete was verified against `/api/k2/language/units/k2-language-unit-02/lessons/pu-l5/extensions`.
- The temporary test extension item was deleted after verification.
- API and web builds pass.

### Next Step
- Browser QA on K1/K2/K3 language lesson pages: add one real review vocabulary item, add one YLE-bank item, refresh, and confirm persistence.

### Risks / Notes
- There is no admin dashboard for extension review yet.
- Extension records are stored locally in SQLite for the current development API.

---

## 2026-08-18 — K Language Day Page Prototype

### Completed
- Reworked K1-K3 language lesson detail pages into a Day-based prototype.
- Lesson pages now present `Day X, Week Y` instead of centering the page title on the Power Up lesson number.
- Added the intended daily structure: Circle Time, CLIL Class, Language Focus, Activities and Games, Phonics, Story, and EASTIE extension content.
- Added placeholders for Circle Time, Phonics, and Story because canonical EASTIE day-level content does not exist yet.
- Introduced a prototype Language Focus layout with `New Keywords`, `Recycled Keywords`, and `Target Sentences`.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Current Status
- Existing Power Up Source display remains connected.
- Existing lesson extension API remains connected.
- Current raw Power Up `New Language` and `Recycled Language` are shown as keyword candidates with `Pending classification`.
- `Target Sentences` is intentionally empty until manual classification is designed.
- `npm run build` passes.

### Next Step
- Review `/curriculum/k1/language/unit-01/pu-l1` visually, then decide the manual classification data format for keywords and target sentences.

### Risks / Notes
- This is a renderer prototype only; it does not change canonical Markdown or generated curriculum wording.
- The page does not infer target sentences from Power Up language.

---

## 2026-08-18 — K Language Manual Classification Scaffold

### Completed
- Added a lightweight manual classification layer for K language pages.
- K language Power Up-backed day pages now prefer reviewed classification data when available.
- Without classification data, pages continue to show raw Power Up `New Language` and `Recycled Language` as pending keyword candidates.
- Added a K1 Unit 1 classification file with the approved data shape but no invented lesson content.
- Non-Power-Up days now render as separate EASTIE day placeholders instead of being forced into the Power Up CLIL/source/keyword structure.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/languageClassifications/types.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/languageClassifications/index.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/languageClassifications/k1LanguageUnit01.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitPage.tsx`

### Current Status
- `/curriculum/k1/language/unit-01/pu-l1` remains Power Up-backed and ready for manual keyword/sentence classification review.
- K1 Unit 1 Media Extend / Mini Mission days are now clearly marked as EASTIE day-level content placeholders.
- `npm run build` passes.

### Next Step
- Begin manual classification in `k1LanguageUnit01.ts`, starting with K1 Unit 1 Power Up days.

### Risks / Notes
- This scaffold is intentionally TS-based for fast review; canonical Markdown fields can be designed after the classification shape is proven useful.

## 2026-08-18 — K Language Auto-Classification + Review UI

### Completed
- Replaced the per-item 4-button manual review with an auto-classified workspace.
- Agent pre-classifies every Power Up `New Language` / `Recycled Language` item into one of four buckets: `keep`, `sentence`, `error` (broken PU segmentation), or `extend` (category umbrella).
- Each item shows the auto decision, a confidence bar, and the top reason. Reviewers can override the decision and add an optional note.
- The review page now has two lanes per lesson: **⚠ Needs Review** (auto confidence < 0.8 OR decision is error / extend) and **✓ Confirmed** (collapsed by default).
- The "Apply" button opens a modal preview with the full reviewed classification object as a `UnitLanguageClassificationMap`. Reviewer can copy the snippet to clipboard or download it as a `.ts` file matching the existing `k1LanguageUnitXX.ts` scaffold shape.
- The "Export TS" button still shows a quick export preview with all four buckets (newKeywords / recycledKeywords / targetSentences / reviewIssues).
- `localStorage` schema upgraded from `{itemId: decision}` to `{itemId: LanguageReviewItemState}`. Old schema is read and migrated on the fly; nothing is lost when reopening the page.
- `npm run build` passes (161 modules, ~16s).

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/languageClassifications/types.ts` (added reviewIssue, decision/auto/review state types, decision options export)
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/languageClassifications/autoClassify.ts` (new — heuristic classifier)
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/LanguageClassificationReviewPage.tsx` (rewrote UI: auto-classify, lanes, Apply modal)
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css` (added lane / confidence / modal styles)

### Current Status
- `/curriculum/k1/language/unit-01/classify-language` renders with auto-classification applied.
- `/curriculum/k1/language/unit-01/pu-l1` (the lesson page itself) still renders unchanged.
- Existing localStorage decisions still load; the on-the-fly migration fills missing fields with the current auto result.
- Auto-classify validation across 27 K1/K2/K3 generated units (3152 items): 75% keep, 6% sentence, 1% error, 18% extend; 99% high confidence. Spot-checked k1U1 (22 needs review / 94), k1U4 (23/77), k1U5 (29/89) — `error` correctly catches the "Yes" / "I/we have. No" PU segmentation fragments in K1U4 L4 and K1U5 L2.

### Next Step
- Run a manual review session on a single unit (suggest K1 Unit 1) using the new lanes, then `Apply` and paste the snippet into `k1LanguageUnit01.ts` to confirm end-to-end round-trip into the lesson page render.
- If the auto rules mis-classify a recurring pattern, update `autoClassify.ts` and re-validate.

### Risks / Notes
- All confidence values are heuristic; the classifier has no corpus of teacher-confirmed ground truth yet. Treat the Needs Review lane as the source of truth.
- "Apply" generates TS code that targets the existing scaffold file shape; the `index.ts` registry is not auto-updated when a new unit file is added (intentional — that step is still manual).
- The "I/we have. No" / "I can. No" / "Let's... Yes" detection covers the broken-segmentation pattern observed in K1 Unit 4–9; any new PU segmentation shape will need a new regex entry.

## 2026-08-18 — K Language Review UX: Confirm + Nav

### Completed
- Added an explicit `✓ Reviewed` button to each row. Clicking it sets `reviewed: true` on the item, independent of the decision (reviewer can confirm auto judgement without touching the buttons).
- Top summary now shows a 6th tile: **Reviewed** (teal) alongside the 4 decision counts and Needs Review (coral).
- Reviewed rows get a teal row tint, a `✓ Reviewed` pill in the item column, and the button toggles to a filled state. Unchecking reverts the row to its previous lane.
- Added a **navigation strip** between the summary and the first lesson. Lists all K1/K2/K3 K-language units (renderer = "k-language") grouped by level, each link jumping directly to that unit's `/classify-language` route. The current unit is highlighted.
- `localStorage` schema bumped: `LanguageReviewItemState` now carries `reviewed: boolean`. Old saved state without the field is migrated on load (defaults to `false`).
- `npm run build` passes.

### Files / Paths
- `web/src/curriculum/languageClassifications/types.ts` (added `reviewed` field)
- `web/src/components/Curriculum/LanguageClassificationReviewPage.tsx` (Confirm button, Reviewed tile, UnitNav, `countReviewed`, `collectKLanguageUnits`, migration in `mergeWithAuto`)
- `web/src/styles/eastie.css` (nav strip, reviewed row tint, Confirm button styles, summary widened to 6 columns)

### Current Status
- All K1/K2/K3 K-language units (U00-U09) reachable from any review page via the nav strip — no more URL typing.
- Reviewer can now mark "I looked at this and agree with the auto call" without changing any decision button.

### Next Step
- Use the Confirm workflow to drive a full K1 Unit 1 review; once comfortable, propagate to K1 U02 / U03.

### Risks / Notes
- The nav strip is built from `dynamicUnitManifest` filtered to `renderer === "k-language"` — only future K1/K2/K3 language pages appear automatically; PG/PK language pages still use the existing `LanguageUnitPage` flow.
- Confirm is per-row, not bulk — if you want to "confirm all in the Confirmed lane at once", that's a future enhancement.

## 2026-08-18 — K Language Review Lane Policy Tightening

### Completed
- `needsReview()` now lets high-confidence `extend` items through without reviewer confirmation (e.g. `colours`, `numbers`, `unit language`, `language from the story`, `adjectives for describing appearance` — all at confidence ≥ 0.85).
- `error` items (broken PU segmentation) still always need a human — the reviewer has to decide what to do with the broken piece.
- `extend` items at < 0.85 confidence, plus mid-confidence `keep` / `sentence`, still flow into the Needs Review lane.

### Files / Paths
- `web/src/curriculum/languageClassifications/autoClassify.ts` (`needsReview()` policy update)

### Current Status
- Re-validated across 27 K1/K2/K3 generated units (3152 items): needs review dropped from 613 (19%) to **60 (1.9%)**.
- Per-unit spot check:
  - `k1LanguageUnit01`: 22 → **0** needs review (no errors, all extends are confident)
  - `k1LanguageUnit04`: 23 → **4** needs review (4 broken-segmentation errors in L4; all 19 extends pass)
  - `k1LanguageUnit05`: 29 → **1** needs review
  - `k2LanguageUnit05`: 23 → **6** needs review
  - `k3LanguageUnit01`: 22 → **6** needs review
- `npm run build` passes.

### Next Step
- Reviewer now only needs to look at the 60 high-value items (mostly error + a few mid-confidence edge cases) across all 27 units instead of 613.

### Risks / Notes
- `colours` / `numbers` / `unit language` / `language from the story` / `adjectives for describing ...` are now bulk-confirmed as `extend` (reviewIssues, issueType=needs_extension). If a teacher wants one of these kept as a real keyword, the row is still editable — just override before Apply.

## 2026-08-18 — Category Expansion Hints (Export Layer)

### Completed
- New module `web/src/curriculum/languageClassifications/categoryExpansion.ts` — hand-curated `CATEGORY_TO_WORDS` map (colours / numbers / family / food / animals / feelings / shapes / rooms / furniture / school / toys / clothes / weather / places / actions / appearance / prepositions / grammar / questions / responses / greetings / time) plus an `UMBRELLA_TO_CATEGORY` alias map that maps ~50 common umbrella phrasings (colours / numbers / parts of the body / school words / classroom objects / one of the family / etc.) to the right category.
- `buildExpansionHint(umbrella, currentUnitId)` walks every K language lesson that comes before the current one and returns the concrete vocabulary items it has seen, in the order they first appear.
- `ClassifiedLanguageReviewIssue` now carries an optional `expansionHint: string[]` field. `formatLessonBlock` populates it for every `issueType=needs_extension` item in both the single-unit Apply output and the all-units bundle. The note on each `reviewIssues` entry reads naturally alongside the new field.
- `npm run build` passes.

### Files / Paths
- `web/src/curriculum/languageClassifications/categoryExpansion.ts` (new)
- `web/src/curriculum/languageClassifications/types.ts` (added `expansionHint?` field)
- `web/src/components/Curriculum/LanguageClassificationReviewPage.tsx` (call `buildExpansionHint` in `formatLessonBlock`, propagate `unitId`)

### Current Status
- Re-validated across 27 K1/K2/K3 generated units (553 total extend items): **79.7% get a non-empty expansion hint** (441 items).
- Sample hits:
  - `[k1U01] "colours"` → `["blue","black","red","yellow","green","orange","purple","brown"]` (first seen k1U01)
  - `[k1U01] "family"` → `["man","woman","boy","girl","family","friend","twins","mum","dad","brother","sister","pet","grandma","grandpa","teddy","father","mother","baby"]`
  - `[k1U02] "school words"` → `["book","crayon","teacher","bag","classroom","pencil","school","rubber"]`
  - `[k1U02] "home"` → `["café","home","school","house","shop","beach","town","park","zoo","world"]`
- Remaining 20% with no hint: grammar structures (have got / present continuous), all-prior-content pointers (language from the story / unit language / story language / vocabulary from units 1 and 2), and one stray sentence fragment. These are intentionally empty — the alias map points them to categories but those categories don't have concrete children to find in earlier lessons.

### Next Step
- Re-export the all-units bundle from the review tool. Each `reviewIssues` entry will now carry its expansion hint inline, so the teacher pasting the bundle into the scaffold files sees the concrete vocab without having to scroll back through earlier units.

### Risks / Notes
- `CATEGORY_TO_WORDS` is hand-curated against the Power Up vocabulary seen in K1/K2/K3. As more units / levels come online, new umbrella words may surface that need an alias entry (e.g. today "one of the family" and "verbs of movement" have no children because no concrete words belong to them).
- The expansion hint is based on **what was taught in earlier K lessons only**. It does not know about prior pre-K exposure. If a teacher wants a richer hint, they can still mark items Reviewed and override the auto decision.

## 2026-08-18 — Refining classification rules for the 14 remaining no-mapping umbrellas

### Completed
- After looking at the 14 unique umbrellas that came back without a category mapping, the user picked a different default for each group:
  - **A. All-prior-content pointers (6)**: `language from the story`, `language from the poem`, `story language`, `unit language`, `vocabulary from units 1 and 2`, `action verbs from Unit 7`. The teacher wants these to fall through as normal vocabulary (autoClassify → keep, so they appear in `newKeywords` / `recycledKeywords`), not as a reviewIssue. Removed all of them from `CATEGORY_KEYWORDS` / `EXTENSION_PHRASES` and the `language|questions|answers|responses` clause in the "starts with part-of-speech phrase" regex.
  - **B. Grammar structures (4)**: `have got`, `have/haven't got`, `like / don't like`, `be kind to (someone)`. Re-classified as `sentence` (targetSentences) with 0.7 confidence. Added a dedicated `^[a-z]…/…` regex and a `^be \w+ to \(…\)$` regex. `present continuous` stays in `extend` per the user's instruction.
  - **C. Data-shape fixes (3)**:
    - `"beautiful: this city is one of the most beautiful in the world. frightened: in my family"` → `error`. Added `PU_BROKEN_LABEL_SENTENCES = /^[A-Za-z][A-Za-z\s']+:\s+[A-Za-z][^.]{20,}\./` to flag "label: long-sentence" segmentation artifacts.
    - `"adverbs of See story on Pupil's Book pages 38-39 frequency"` → `error`. The k3 markdown source has a stray "See story on Pupil's Book pages" reference. Added a `MARKDOWN_BLEED` regex to flag this so it lands in `reviewIssues` with `issueType=error`. Codex will need to fix the markdown source separately.
    - `"one of the family"` → `keep` (not `extend`). Added an alias `"one of the family": "family"` in `categoryExpansion.ts` so that, when this item does land in `applyIssues`/output, the `expansionHint` points to the family vocabulary (mum / dad / grandma / etc.) the user is expected to teach.
- `npm run build` passes.

### Files / Paths
- `web/src/curriculum/languageClassifications/autoClassify.ts` (CATEGORY_KEYWORDS, EXTENSION_PHRASES, the "starts with …" regex, the "one of the" branch, two new sentence rules 3d/3e/3f, PU_BROKEN_LABEL_SENTENCES, MARKDOWN_BLEED)
- `web/src/curriculum/languageClassifications/categoryExpansion.ts` (added `"one of the family": "family"`)

### Current Status
- Re-validated 19 of 19 targeted samples against the new rules — 100% match the user's intent.
- `unique extend` shrank from 14 no-mapping umbrellas → 0 in the original A/B/C set; the remaining 39 unique extend umbrellas are all genuine category words (`colours`, `numbers`, `family`, `food`, …) plus `present continuous` and `verbs of movement` (no concrete children by design).
- `unique error` grew from 36 → 39, picking up the 2 new PU segmentation artifacts.

### Next Step
- Re-export the all-units bundle from the review tool. The Apply output for each unit now shows:
  - all-prior-content pointers as plain `newKeywords` / `recycledKeywords`
  - grammar structures as `targetSentences`
  - 2 new `error` reviewIssues that need Codex to look at the k1U5 / k3U3 source markdown
- Long-term: have Codex fix the k3U3 "adverbs of See story on Pupil's Book pages 38-39 frequency" data so the error goes away.

### Risks / Notes
- The rule for "all-prior-content" is now: anything starting with `language from`, `unit language`, `story language`, `vocabulary from`, `action verbs from` etc. falls through to keep. If a future PU unit adds a new phrasing in this family (e.g. "vocabulary from lessons 1-3"), it'll silently become a keyword. We can either accept that or add a more conservative regex later.
- `^[A-Za-z][A-Za-z\s']+:\s+[A-Za-z][^.]{20,}\.` will flag legitimate single-sentence definitions (e.g. "home: where a family lives together.") — that item would now be flagged as error even though it's correct. We may want to anchor on having `.` appear *after* the long run (i.e. the sentence has a colon AND a long body AND a period).

## 2026-08-18 — Error context: surfacing original PU neighbours

### Completed
- Most `error` items are Power Up segmentation artifacts: "Yes" / "No" got split from the question they answered, e.g. `k1U4 L4` Recycled Language `"I've/We've/They've got ... Have you/we got ...? Yes ｜ I/we have. No ｜ I/we haven't."` becomes three orphan items.
- Added `originalContext?: { prev?: string; next?: string }` to `ClassifiedLanguageReviewIssue`. `formatLessonBlock` now computes the immediately preceding / following item from the same lesson and emits it next to the error entry. The Apply / single-unit export and the all-units bundle both pick this up automatically.
- Reviewer / teacher can now see the surrounding context and stitch the broken sentence back together: e.g. "I've/We've/They've got ... Have you/we got ...? Yes" with `originalContext.next: "I/we have. No"` clearly tells you the full exchange is "Yes, I/we have. No, I/we haven't."
- `npm run build` passes.

### Files / Paths
- `web/src/curriculum/languageClassifications/types.ts` (added `originalContext` field)
- `web/src/components/Curriculum/LanguageClassificationReviewPage.tsx` (formatLessonBlock now takes the per-lesson item list and emits originalContext for error issues; both buildApplyOutput and buildClassificationExport pass the lesson items through)

### Current Status
- Spot-checked the k1U4 L4 case: `I've/We've/They've got ... Have you/we got ...? Yes`, `I/we have. No`, `I/we haven't.` now export with each other's neighbours in `originalContext`.
- No decision change — these items still land in `reviewIssues` (still flagged as error so the teacher sees them). What changed is the export payload, so the teacher can decide the right fix without re-reading earlier lessons.

### Next Step
- Re-export the all-units bundle. Each error reviewIssue will now include `originalContext` so Codex / the teacher can quickly identify whether the fix is a re-glue of adjacent items or a true PU source change.

### Risks / Notes
- `originalContext` only surfaces the **immediately** adjacent item, not the full multi-item conversation. If a PU sequence has 4-5 broken fragments in a row, the reviewer still needs to walk the chain manually.
- This is export-only; the in-page ReviewTable still shows the error item as a single row. Adding the context inline (UI option C from the original "fix the errors" discussion) is a future enhancement.

## 2026-08-18 — Hand-curated error suggestions

### Completed
- Scanned all 27 K1/K2/K3 generated units for `issueType=error` items. Total: 39 unique error texts / 41 occurrences.
- Added `web/src/curriculum/languageClassifications/errorSuggestions.ts` — a hand-curated `Record<string, string>` from error text to a human-written "Suggested complete form" + reasoning. The map covers all 39 unique texts (every error in the dataset has a suggestion).
- `formatLessonBlock` now looks up each error item and writes the suggestion into the `note` field. The reviewer's own note (if any) is preserved above the suggestion. Empty notes are filled with the suggestion alone.
- Patterns captured in the map (representative):
  - **"Q? Yes" pattern** (~17 cases): "Yes, I/we have." / "Yes, he/she does." / "Yes, they were." / "Yes, I am." etc. — full Q-A exchange spelled out.
  - **"A. No" pattern** (~8 cases): "No, I/we haven\'t." / "No, I can\'t." / "No, he/she doesn\'t." etc.
  - **Orphan Yes/No** (4 cases): suggestion to pair with the preceding question.
  - **Multi-sentence items** (4 cases): "I went swimming..." missing space / chained dialogue.
  - **Vocabulary explanation blocks** (3 cases): word + example sentence glued — split into per-word entries.
  - **Markdown bleed** (1 case, k3U3): "adverbs of See story on Pupil's Book pages 38-39 frequency" — note flags this as a markdown source data error to fix upstream.
- `npm run build` passes.

### Files / Paths
- `web/src/curriculum/languageClassifications/errorSuggestions.ts` (new — 39-entry lookup)
- `web/src/components/Curriculum/LanguageClassificationReviewPage.tsx` (formatLessonBlock now merges reviewer note + suggestion for each error)

### Current Status
- All 41 error occurrences across 39 unique texts now export with a hand-written suggestion in the `note` field.
- A new PU error (e.g. a future unit introducing a new segmentation shape) will export with an empty `note` until the lookup map is extended. The `originalContext` neighbour still helps the reviewer in the meantime.

### Next Step
- Re-export the all-units bundle. Each error reviewIssue now ships with a teacher-readable suggestion of the intended complete form.
- If a new PU error appears, append an entry to `errorSuggestions.ts` — same pattern as the existing ones.

### Risks / Notes
- This is intentionally hand-curated rather than rule-driven. The dataset is small (39 cases) and the patterns are well-known child-English exchanges, so a regex would be brittle (e.g. "I haven\'t." vs "he/she doesn\'t." need different completions). Re-curate, don't re-rule.
- Suggestions are written in standard teacher-ese (apostrophes escaped, both forms shown when ambiguous: "Yes, I/we have."). A teacher copy-pasting into a scaffold file will get a working template they can then refine.

## 2026-08-18 — Mid-confidence cleanup

### Completed
- 100 items sat in the 0.7-0.84 confidence band. Most were false positives from a too-broad slash → sentence rule (`/^[a-z]/ && /`/ && length <= 40` matched plain vocab lists like "in/on/under", "baby/babies", "at home/school", "once/twice a day", etc.).
- Tightened the rules:
  - **3d** is now a strict whitelist of grammar patterns (have/haven't got, like / don't like, can / can't, must/mustn't, ...). Other slash-bearing items fall through to keep.
  - **3c** (STARTS_WITH_CAPITAL_VERB) now whitelists canonical short sentences ("I'm sorry", "Here you are", "I don't know", "Let's go", "Can I have some chocolate", the "I ...-ing" placeholder patterns) at 0.9 confidence. "Let's... Yes" stays at 0.78 because it's a placeholder+answer chain.
  - **3e** (be X to (...)) confidence raised 0.7 → 0.85.
  - **3f** (have got / has got) confidence raised 0.7 → 0.85.
- Added two new error detectors for PU-chained fragments:
  - `CHAINED_ANSWER_SLASH` — "X. / No" / "X. / Yes" (e.g. "they are. / No").
  - `CHAINED_SENTENCES` — "Sentence. Another" with another Capitalised word (e.g. "he/she doesn't. He/She wants...").
  - `CHAINED_LOWERCASE` — "Sentence. followup" with lowercase / digit-led tail (e.g. "I never get up late. always", "You're right. comparative adjectives", "What's your favourite ... ? My favourite ... 1Sicae").
- Added 3 chained-error entries to `errorSuggestions.ts` with teacher-readable suggestions.
- `npm run build` passes.

### Files / Paths
- `web/src/curriculum/languageClassifications/autoClassify.ts` (3c short-canonical whitelist, 3d slash whitelist, 3e/3f confidence bump, CHAINED_ANSWER_SLASH / CHAINED_SENTENCES / CHAINED_LOWERCASE error detectors)
- `web/src/curriculum/languageClassifications/errorSuggestions.ts` (3 new chained-error entries)

### Current Status
- 99.9% of items are now at high confidence (≥ 0.85). Only 1 item — "Let's... Yes" — remains in the mid band (0.78), and that one is genuinely ambiguous (placeholder + answer chain) so a reviewer glance is appropriate.
- Vocabulary lists that were wrongly marked sentence (e.g. "in/on/under", "baby/babies", "at home/school", "once/twice a day", "eye/hair colour", "play basketball/football/tennis") are now correctly keep.
- Chained errors that were wrongly marked sentence (e.g. "they are. / No", "I never get up late. always", "What's your favourite ... ? My favourite ... 1Sicae") are now correctly error with hand-written suggestions in the note.

### Next Step
- Re-export the all-units bundle. Most of the new error items will already have helpful "Suggested: ..." notes via `errorSuggestions.ts`.

### Risks / Notes
- The 3 chained-error regexes (`CHAINED_ANSWER_SLASH`, `CHAINED_SENTENCES`, `CHAINED_LOWERCASE`) are still regex-based. If a future PU unit introduces a chained shape we haven't seen (e.g. "Sentence! Another" with `!` instead of `.`), it'll fall back to the mid-confidence sentence bucket and a reviewer can spot it.
- "Let's... Yes" at 0.78 confidence is intentional — it's a placeholder + "Yes" answer chain, and we want a reviewer to confirm it's actually meant as a single sentence template rather than a misclassification.

## 2026-08-18 — Trim "Let's... Yes" trailing "Yes" on render

### Completed
- User pointed out that "Let's... Yes" should just collapse to the imperative template "Let's..." — the trailing "Yes" is a Power Up split artifact, not a real part of the item.
- Bumped `"Let's... Yes"` to 0.9 confidence (it was the only mid-confidence sentence left after the earlier cleanup).
- Added `trimAnswerMarker(text)` helper in `LanguageClassificationReviewPage.tsx` that strips a trailing `\s+(Yes|No)\.?\s*$` from the item text. Applied to every `targetSentences` line in `formatLessonBlock` (both single-unit Apply output and all-units bundle).
- The exported `text` for this item is now `"Let's..."` instead of `"Let's... Yes"`. The auto decision is still `sentence` and the originalContext / errorSuggestions payload is unchanged.
- `npm run build` passes.

### Files / Paths
- `web/src/curriculum/languageClassifications/autoClassify.ts` (raised "Let's... Yes" confidence 0.78 → 0.9, reason explains the trim)
- `web/src/components/Curriculum/LanguageClassificationReviewPage.tsx` (added `trimAnswerMarker`, applied to targetSentences render)

### Current Status
- All 3152 items are now at high confidence (≥ 0.85). 0 items in the mid band. 0 items below 0.7.
- The "Let's... Yes" item now exports as `targetSentences: [{ text: "Let's...", source: "PU" }]`.
- Decision distribution: keep 2387 / sentence 212 / error 77 / extend 476.

### Next Step
- Re-export the all-units bundle. The bundle now contains clean "Let's..." sentence entries (no "Yes" artifacts).

### Risks / Notes
- `trimAnswerMarker` only matches a single trailing "Yes" / "No" preceded by whitespace, with optional trailing period. It deliberately does NOT trim "Yes, I have." because the leading "Yes," is followed by a comma + space + content, not just whitespace at the end. Verified by hand-checking several common sentence shapes.

## 2026-08-18 — Auto-resolve all 74 unique error items

### Completed
- Reshaped `errorSuggestions.ts` from a flat `Record<string, string>` to `Record<string, ErrorSuggestionEntry>` with a `kind: "resolved" | "sourceIssue"` discriminator.
- Filled out the 44 missing entries that turned up after the chained-error regex pass. The dictionary now covers all 74 unique error texts in the dataset (no more "empty note" reviewIssues).
- `buildApplyOutput` and `buildClassificationExport` consult the dictionary up-front. Items marked `kind: "resolved"` are dropped from the bucket (not emitted in any reviewIssues block) and a count is added to the export's header comment.
- The Needs Review lane in the UI also skips auto-resolved items, so the reviewer doesn't see work that's already been done.
- Net effect: only the one true markdown-source data error (`"adverbs of See story on Pupil's Book pages 38-39 frequency"`, kind=sourceIssue) actually appears in the `reviewIssues` block. Everything else is gone from the export.
- `npm run build` passes.

### Files / Paths
- `web/src/curriculum/languageClassifications/errorSuggestions.ts` (new structure with `kind`, all 74 unique errors mapped, including 9 from the old "Q? Yes" / "A. No" pattern, 8 from the new "Q. Sentence" / "X. No" / chained answer pattern, and the multi-sentence / vocab-explanation blocks from k2U3 / k3U2 / k3U3 / k3U4 / k3U5)
- `web/src/components/Curriculum/LanguageClassificationReviewPage.tsx` (caller-side filter for `kind === "resolved"`, header-comment resolved count, Needs Review lane skip)

### Current Status
- 76 of 77 error occurrences (98.7%) are auto-resolved and disappear from the export. The single remaining entry is the k3Unit03 markdown-data error and stays in `reviewIssues` for Codex to fix in the source markdown.
- The reviewer's review UI no longer surfaces auto-resolved items in the Needs Review lane.

### Next Step
- Re-export the all-units bundle. Most of the prior 36 chained-error entries have either become sentences (Q+A pairs) or are now silently dropped.
- Codex should fix the k3Unit03 markdown source data error for `"adverbs of See story on Pupil's Book pages 38-39 frequency"` so the last reviewIssue entry also disappears.

### Risks / Notes
- The new "vocab explanation block" auto-resolve entries (e.g. `find: I found my old hat. lose: ...`) are advisory splits — the export does NOT actually emit multiple items, only a single `note` describing how to split. The reviewer / Codex still needs to follow the note and decide what to do in the scaffold file. We deliberately do not split the item in the export because the splits vary in structure (some are per-word, some are Q+A pairs, some are multi-sentence), and the user wanted "human brain over regex".

## 2026-08-18 — Auto-resolve now emits replacement items (no more silent drops)

### Completed
- Web session flagged that the previous auto-resolve implementation was silently dropping the resolved content. `buildApplyOutput` / `buildClassificationExport` used `continue` to skip `kind: "resolved"` errors, which removed them from `reviewIssues` but also prevented them from being emitted anywhere else — page-renderable text was lost.
- Reshaped `ErrorSuggestionEntry` to carry replacement text directly:
  - `resolvedItems?: string[]` — each entry goes to `targetSentences` with `source: "PU"`.
  - `expandedKeywords?: string[]` — each entry goes to `newKeywords` (if original source=new) or `recycledKeywords` (if source=recycled) with `source: "PU"`. Used for vocab words inside multi-sentence / vocab-explanation blocks (e.g. `helmet`, `ice skates`, `bus stop`, `huge`).
  - The original broken `text` is never emitted into the export.
- Filled out `resolvedItems` / `expandedKeywords` for every one of the 80 dictionary entries (74 previous + 6 new — see below). Validation: 84 resolved errors → **192 target sentences + 6 keywords emitted** (avg 2.36 children per resolved error).
- New helper `drainResolvedError(item, entry, bucket)` in `LanguageClassificationReviewPage.tsx`:
  - Pushes each `resolvedItems[i]` to `bucket.tgt` as a synthetic `ReviewItem` (id `__resolved__:<parentId>:sentence:<i>`).
  - Pushes each `expandedKeywords[i]` to `bucket.newK` or `bucket.recK` (routed by the original item's `source`).
  - **Validation gate**: if a `kind: "resolved"` entry has neither `resolvedItems` nor `expandedKeywords`, it logs `console.warn` and falls back to `reviewIssues` (instead of silently dropping the content). Header comment also reports the fallback count.
- 6 new dictionary entries (the previous run only covered 74 of 85 auto-classifier hits; the auto-classifier's `BARE_YES_NO` regex is case-insensitive, and k1U00 / k3U00 introduced 4 more chained patterns not in the previous sample):
  - `"yes"` / `"no"` (lowercase) — same resolution as `"Yes"` / `"No"`.
  - `"What colour's this? What's number's this?"` — chained Q+Q with possessives.
  - `"This is ... What's this? It's a..."` — chained frame + Q+A.
  - `"What's your name? My name's (Jim). How old are you? I'm (seven). Where do you live? I live in (London). present continuous"` — multi Q+A; trailing `present continuous` grammar note dropped.
  - `"He's got (long hair). I like ...-ing"` — chained different-verb fragments.
- Updated header comment in both exports to show the new accounting: e.g. `// 6 error items auto-resolved via errorSuggestions.ts (hand-curated) → emitted as 14 target sentences + 1 keyword. Raw broken text is NOT emitted as a reviewIssue.`
- `npm run build` passes.

### Files / Paths
- `web/src/curriculum/languageClassifications/errorSuggestions.ts` (added `resolvedItems` + `expandedKeywords` to `ErrorSuggestionEntry`; filled out 80 entries; 6 new entries for the k1U00 / k3U00 patterns)
- `web/src/components/Curriculum/LanguageClassificationReviewPage.tsx` (new `syntheticResolvedItem` + `drainResolvedError` helpers; `buildApplyOutput` / `buildClassificationExport` route resolved items to targetSentences / newKeywords / recycledKeywords instead of dropping; header comment now shows the per-bucket accounting + fallback warning)

### Current Status
- **All 30 K1/K2/K3 units validated**: 23/30 units have at least one auto-resolution. Total 84 resolved errors → 192 sentences + 6 keywords emitted. 1 sourceIssue (k3U03 markdown bleed) kept in reviewIssues. 0 fallback warnings.
- Per-unit top contributors: `k3-language-unit-06` (11 resolved → 22 sentences), `k3-language-unit-07` (8 → 20), `k1-language-unit-00` (6 → 8), `k1-language-unit-04` (6 → 12), `k3-language-unit-01` (5 → 6).
- Validation scripts in `/tmp/lang-validate.mjs` (dictionary coverage) and `/tmp/lang-export.mjs` (per-unit resolution simulation) — both pass cleanly.

### Next Step
- Re-export the all-units bundle. The export now contains the resolved text as proper targetSentences / newKeywords / recycledKeywords entries (not just a note saying "the reviewer should fix this").
- Web session / Codex can paste the bundle output into the per-unit scaffold files. The raw broken text no longer appears anywhere in the export.

### Risks / Notes
- `expandedKeywords` is a separate bucket from `resolvedItems` because some vocab blocks (e.g. `What mustI do? ... helmet`) mix sentences + standalone vocab words. Routing them to the right array keeps the page-renderable structure clean (targetSentences is for sentence patterns, newKeywords / recycledKeywords is for vocabulary words).
- Two of the new entries (`frightened`, `dangerous`) only emit the keyword because the original PU example sentence was truncated. The `note` field calls this out so Codex / the teacher can add a real example later.
- Validation is per-item (in `drainResolvedError`) rather than global — a future script could walk `ERROR_SUGGESTIONS` at module-load time and warn about any `kind: "resolved"` entry missing both fields. Not done yet; the per-item warning is enough for now.

## 2026-08-19 — K Language canonical MD v0.1 preview sync

### Completed
- Added a non-destructive web sync preview script for the first K Language canonical markdown rollout.
- The script runs the project validator first, then parses the six rollout units from canonical markdown into a web-readable generated preview file.
- The current production K Language routes/data source were not changed.
- Added an npm shortcut for repeatability.
- Ran preview sync and build successfully.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/scripts/sync-k-language-canonical-v0_1-preview.mjs`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/generated/kLanguageCanonicalPreview.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/package.json`

### Current Status
- Parsed units: 6
- Parsed day files: 68
- Day type counts:
  - Power Up: 42
  - Media Extend: 3
  - Mini Mission: 2
  - Mission Extend: 6
  - Showcase: 15
- TBD count: 448
- Needs Extension items: 63
- Source Issues: 0
- `npm run sync:k-language:canonical-preview` passes.
- `npm run build` passes.

### Next Step
- Review the preview data shape in `kLanguageCanonicalPreview.ts`.
- If accepted, decide whether to build a temporary preview route/component or adapt `KLanguageUnitPage` to optionally consume the canonical preview data for the six rollout units.

### Risks / Notes
- This is a preview sync only. It does not replace the current generated Power Up data or language classification scaffold.
- Source parsing is intentionally conservative: source blocks keep raw text and structured TB/PB/AB/audio fields where available.

## 2026-08-20 — K Language teacher edit override prototype

### Completed
- Renamed the K Language lesson action buttons from `Modify` to `Edit`.
- Added a first teacher-edit prototype for K Language lesson pages:
  - text sections open in a textarea editor;
  - keyword / sentence chip sections open as editable item rows;
  - saved edits are stored as user-specific lesson overrides, leaving canonical markdown and generated data unchanged.
- Added reset support so a teacher can return a field to the original curriculum value.
- Added API persistence tied to the logged-in HttpOnly cookie session.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/api/src/routes/languageOverrides.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/api/src/db.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/api/src/app.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/curriculum/overrides/languageLessonOverridesClient.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/components/Curriculum/KLanguageUnitPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_project/web/src/styles/eastie.css`

### Validation
- `web`: `npm run build` passes.
- `api`: `npm run build` passes.
- New override endpoint is live and returns `401 Authentication required` when unauthenticated, confirming it is mounted behind auth.

### Notes
- Overrides are personal to the current user; they do not alter canonical MD.
- First scope is K Language lesson pages. Other course types are unchanged.
- Future admin/global-sharing or promotion-to-canonical workflows are intentionally not implemented yet.

## 2026-08-19 — K Language unit-centric UH/U1 actual page sync

### Completed
- Synced the accepted unit-centric markdown packages into the actual K language dynamic pages, not just the preview route.
- Covered exactly six rollout units:
  - K1 Unit Hello and K1 Unit 1
  - K2 Unit Hello and K2 Unit 1
  - K3 Unit Hello and K3 Unit 1
- Re-synced K1 Unit 1 from the updated source.
- Added a batch web sync command: `npm run sync:k-language:unit-centric-units`.
- Generated actual route data files:
  - `web/src/curriculum/generated/k1LanguageUnit00.ts`
  - `web/src/curriculum/generated/k1LanguageUnit01.ts`
  - `web/src/curriculum/generated/k2LanguageUnit00.ts`
  - `web/src/curriculum/generated/k2LanguageUnit01.ts`
  - `web/src/curriculum/generated/k3LanguageUnit00.ts`
  - `web/src/curriculum/generated/k3LanguageUnit01.ts`

### Validation
- `npm run sync:k-language:unit-centric-units` passed.
- `npm run build` passed.
- Actual route smoke checks returned HTTP 200:
  - `/curriculum/k1/language/unit-uh/pu-l1`
  - `/curriculum/k1/language/unit-01/pu-l1`
  - `/curriculum/k2/language/unit-uh/pu-l1`
  - `/curriculum/k2/language/unit-01/pu-l1`
  - `/curriculum/k3/language/unit-uh/pu-l1`
  - `/curriculum/k3/language/unit-01/pu-l1`

### Notes
- This rollout intentionally affects only Unit Hello and Unit 1 for K1-K3.
- Remaining K language units still use the previous generated Power Up data until their unit-centric markdown packages are accepted.

## 2026-08-19 — K Language canonical markdown v0.1 rollout scaffold

### Completed
- Created the first K Language canonical markdown v0.1 structure rule, reverse-designed from the current K1-K3 dynamic lesson page.
- Added a concrete K1 Unit 1 / Week 1 / Day 1 sample showing how to combine page-facing fields, Power Up source references, classification scaffold output, and teacher/design guidance.
- Added a rollout plan for preparing only K1/K2/K3 Unit Hello + Unit 1 before school starts, leaving Units 2-9 for later iteration after teacher feedback.
- Updated `RULES_INDEX.md` and `docs/rules/process/README.md` so future sessions can find the new rule and sample.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/k_language_canonical_md_v0_1.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/k_language_canonical_md_v0_1_k1_unit_1_day_1_sample.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/K_LANGUAGE_UNIT_HELLO_UNIT_1_ROLLOUT_PLAN.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/process/README.md`

### Current Status
- The structure is a draft candidate, not a locked annual contract.
- The intended first rollout scope is exactly six units: K1/K2/K3 Unit Hello and Unit 1.
- The new markdown model separates page-facing lesson fields from `Teacher / Design Guidance`, so useful old-MD content can be preserved without becoming child-facing page content.

### Next Step
- Course-design session should create the six canonical markdown unit packages using the new template and sample.
- Web session can later sync those canonical files once PM accepts the structure and content fill.

### Risks / Notes
- `extend` review issues remain unresolved as final child-facing content; concrete words should be chosen by course design, not auto-expanded blindly from web hints.
- This pass did not modify web rendering or generated Power Up data.

## 2026-08-19 — Scaffold the 30 K language classification files

### Completed
- Generated 30 `k*LanguageUnit{NN}.ts` files under `web/src/curriculum/languageClassifications/`, one per K1/K2/K3 unit (00-09), all using the same logic as the review tool's `buildApplyOutput`:
  - `keep` items → `newKeywords` (if original source was "new") or `recycledKeywords` (if "recycled") with `source: "PU"`.
  - `sentence` items → `targetSentences` (with `trimAnswerMarker` applied: "Let's... Yes" → "Let's...").
  - `resolved` errors → drained via `drainResolvedError`: each `resolvedItems[i]` → `targetSentences`; each `expandedKeywords[i]` → `newKeywords` / `recycledKeywords` per original source.
  - `sourceIssue` errors → `reviewIssues` with `issueType: "error"` and the hand-written markdown-source note.
  - `extend` items → `reviewIssues` with `issueType: "needs_extension"` and the `expansionHint` from `categoryExpansion.ts`.
  - `error` items with no entry in `errorSuggestions.ts` → `reviewIssues` with `issueType: "error"` and a "⚠ Unresolved error" note (currently 0 such items).
- Each file's header comment summarises the auto-resolve accounting per unit (e.g. `// 11 error items auto-resolved via errorSuggestions.ts → emitted as 22 target sentences.`).
- Updated `index.ts` to register all 30 units (`k1-language-unit-00` through `k3-language-unit-09`).
- `k1LanguageUnit01.ts` (which previously held only an example shape) now holds real classification data.
- `npm run build` passes (192 modules, ~16 s, 106 KB CSS / 7.3 MB JS).

### Files / Paths
- `web/src/curriculum/languageClassifications/k1LanguageUnit00.ts` through `k3LanguageUnit09.ts` (30 new scaffold files, each exports a `UnitLanguageClassificationMap`)
- `web/src/curriculum/languageClassifications/index.ts` (registry expanded from 1 unit to 30)

### Current Status
- **All 30 K language units registered**. 311 PU lessons have a non-empty classification. 2,860 total items emitted across newKeywords + recycledKeywords + targetSentences.
- `reviewIssues` summary across 30 units:
  - `sourceIssue` (kept for Codex markdown-source fix): **1** — k3-language-unit-03, "adverbs of See story on Pupil's Book pages 38-39 frequency" (markdown bleed).
  - `needs_extension` (extend items with `expansionHint`, per user instruction "保留在 reviewIssues"): **488** — these are category umbrellas like `colours`, `numbers`, `family`, `present continuous`, etc. They are NOT rendered on the lesson page; the page just shows 0 keywords for those lessons.
  - Unresolved error (no dictionary entry, kept as reviewIssue): **0**.
- Spot-check pages (HTTP 200 via `npm run dev`):
  - `/curriculum/k1/language/unit-01/pu-l1` → 8 newK + 4 recK + 4 tgt (e.g. "Is (Jenny) a (girl)?", "Who's this?") + 3 reviewIssues.
  - `/curriculum/k1/language/unit-uh/pu-l1` → 3 newK + 0 recK + 1 tgt ("Hello. I'm (Jenny/Jim). Goodbye.").
  - `/curriculum/k2/language/unit-01/pu-l1` → 0 + 0 + 0 + 1 reviewIssues (only item is an extend: "school").
  - `/curriculum/k3/language/unit-01/pu-l2` (k3U01 starts at pu-l2, not pu-l1) → 17 newK + 14 recK + 3 tgt ("have got", "Let's ...", "There is/are") + 1 reviewIssues.

### Next Step
- (No auto-progression to next stage — this is the persistence step. The classification is now part of the codebase; the next session can either refine the auto-classifier (in `errorSuggestions.ts` / `categoryExpansion.ts`) or hand-curate the per-lesson classifications via the review tool.)
- For any future PU source change, re-run the generation script at `/tmp/lang-gen-scaffolds.mjs` to refresh the 30 scaffold files. (No auto-progression — this is a one-shot generation, not a continuous pipeline.)

### Risks / Notes
- **k3U01 starts at `pu-l2`, not `pu-l1`.** The k3 dynamic unit manifest skips `pu-l1` (the unit is `0-indexed` differently from k1/k2). Spot-check URLs for k3U01 should use `pu-l2`. The `getLessonLanguageClassification` function correctly returns `undefined` for missing lessonIds, and `KLanguageUnitPage` falls back to the raw PU data in that case (no regression).
- **The 488 `needs_extension` items are not rendered on the lesson page** (per the spec: "确认 reviewIssues 不在普通 lesson 页面展示为儿童内容"). The page reads only `newKeywords` / `recycledKeywords` / `targetSentences` from the classification. This means ~488 extend items are currently invisible on the lesson page. If a unit's only PU item is an extend (e.g. k2U01 pu-l1 "school"), the page shows 0 keywords for that lesson. This matches the user's instruction to keep extend items in `reviewIssues` for now; a follow-up session can decide whether to expose them via `expansionHint` or auto-expand.
- **No `extend` items are auto-expanded into final vocab**, per the user's explicit instruction. The `expansionHint` is preserved in `reviewIssues` so the teacher can see what concrete words exist for the same category.
- The scaffold files are produced by `/tmp/lang-gen-scaffolds.mjs` (mavis one-off script), NOT by the review tool's `Export All` button. The review tool's `Export All` produces the same output but routes through the React component (cannot be invoked from a Node script without a browser). The script is a faithful port of `buildApplyOutput` (same auto-classifier, same `drainResolvedError`, same `formatLessonBlock` shape).
- Source / unit data (markdown, generated `k*LanguageUnit*.ts`, `KLanguageUnitPage.tsx`, `types.ts`) was NOT modified. The only files changed are inside `web/src/curriculum/languageClassifications/`.

## 2026-08-25 — Deployment

### Completed
- Uploaded scoped Power Up resources for K1/K2/K3 Unit Hello and Unit 1 to production.
- Synced 6 resource folders, 244 files total, approximately 630 MB.
- Verified production file count matches local file count.
- Verified representative HTTPS URLs for manifest JSON, PDF, and MP3 resources return 200 with expected content types.

### Files / Paths
- Local source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k1/unit-uh`
- Local source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k1/unit-01`
- Local source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-uh`
- Local source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k2/unit-01`
- Local source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k3/unit-uh`
- Local source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/k3/unit-01`
- Production target: `/var/www/eastie-curriculum-app/curriculum-resources/power-up/`

### Current Status
- K1/K2/K3 Power Up Unit Hello and Unit 1 related resources are now present on production.
- No source-content folders or unrelated large resource directories were deployed.

### Next Step
- Open representative K1/K2/K3 Unit Hello and Unit 1 pages in the browser and confirm the page-level resource links resolve correctly.

### Risks / Notes
- This was a scoped resource upload only; it did not rebuild or redeploy frontend/API code.

## 2026-08-25 — PG/PK non-language page polish and Daily Summary

### Completed
- Synced updated PG/PK non-language Markdown into the frontend generated registry for:
  - PG Unit Hello
  - PG Unit 1
  - PK Unit Hello
  - PK Unit 1
- Confirmed the PG/PK Unit Hello and Unit 1 zh-CN sources no longer expose English activity headings in the `### 1. ...` activity-title position.
- Added a Chinese-mode frontend fallback for legacy English-only numbered activity headings, displaying them as `活动 1`, `活动 2`, etc. until source translations provide formal Chinese titles.
- Added `Generate Daily Summary` to PG/PK non-language single-lesson pages.
- Daily Summary is generated deterministically from the currently loaded Markdown, not by AI.
- Daily Summary fields currently include:
  - Course Name / 课程名字
  - Lesson Outcome / 课程目标
  - KDI Alignment / KDI 对齐, extracting only Domain / 领域 and Items / 项目, not How We Support / 支持方式
  - Light Theme Language / 轻量主题语言, formatted as one `｜`-separated line
  - Theme Story Context / 主题故事情境
- Chinese pages generate Chinese summaries; English pages generate English summaries.
- Removed confusing duplicate source/resource-style buttons from PG/PK non-language lesson display where requested earlier in the review flow.

### Files / Paths
- `web/src/components/Curriculum/UnitPage.tsx`
- `web/src/curriculum/generated/pgUnit00Markdown.ts`
- `web/src/curriculum/generated/pgUnit00NonLanguageUnit00.ts`
- `web/src/curriculum/generated/pgUnit01Markdown.ts`
- `web/src/curriculum/generated/pgUnit01NonLanguageUnit01.ts`
- `web/src/curriculum/generated/pkUnit00Markdown.ts`
- `web/src/curriculum/generated/pkUnit00NonLanguageUnit00.ts`
- `web/src/curriculum/generated/pkUnit01Markdown.ts`
- `web/src/curriculum/generated/pkUnit01NonLanguageUnit01.ts`

### Current Status
- PG/PK non-language UH and U1 pages are ready for browser review in both English and Chinese modes.
- Non-language Daily Summary is implemented for PG/PK single-lesson pages and reuses the existing Language summary modal/copy UX.
- `npm run build` passes.

### Next Step
- PM/user should review representative PG/PK UH and U1 single-lesson pages in Chinese and English, especially the Daily Summary output and KDI field extraction.
- If course-design updates the Markdown sources again, rerun the corresponding sync command before review.

### Risks / Notes
- English input remains intentionally visible in agreed input-list/code-block areas such as teacher routine language, optional challenge outputs, songs/chants, and `HighScope KDI`.
- The frontend activity-title fallback is only a safety net for legacy untranslated headings; accepted source translations should still provide formal Chinese titles.

## 2026-08-26 — Teacher password login after first email-code verification

### Completed
- Updated auth flow so teachers can use a one-time email code for first access, then create their own password inside the app.
- Added API route `POST /api/auth/set-password` for signed-in users verified by email-code session.
- Relaxed password validation for set/change/reset password flows to require only a non-empty password, with no uppercase/number/symbol complexity rule.
- Reworked the login page so the default path is email + password, with a first-time email-code path that leads to password creation.
- Preserved the existing seven-day session cookie behavior and logout flow for shared school computers.
- Added API test coverage for setting a very simple password after email-code login and signing in with it later.

### Files / Paths
- `api/src/routes/auth.ts`
- `api/src/routes/auth.test.ts`
- `web/src/auth/AuthProvider.tsx`
- `web/src/auth/LoginPage.tsx`
- `web/src/auth/authTypes.ts`

### Current Status
- Teachers can use email + password for routine login after first verification.
- First-time teachers can still request a 6-digit email code.
- After the code is verified, the UI asks them to create a password before continuing.
- `npm test` in `api/` passes: 16/16 tests.
- `npm run build` passes in both `api/` and `web/`.

### Next Step
- Browser-review the login page on a real teacher account and confirm the first-time code → create password → future password login sequence feels clear.

### Risks / Notes
- Because password complexity is intentionally relaxed, teacher onboarding should emphasize logging out on shared classroom computers.
- No GitHub remote or deployment action was performed in this change.

## 2026-08-25 — Repo Rebuild Plan

### Completed
- Drafted `REPO_REBUILD_PLAN_v1_0.md` for a clean repo rebuild strategy.
- Defined include/exclude scope, large-resource handling, curriculum source strategy, migration steps, validation checklist, and PM decision points.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/REPO_REBUILD_PLAN_v1_0.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_UPDATE_BOARD.md`

### Current Status
- No Git initialization, copy, deletion, or deployment was performed.
- Plan is ready for PM review and architecture sign-off.

### Next Step
- PM should review the plan and confirm repo boundary decisions before any rebuild work starts.

### Risks / Notes
- The clean repo should stay separate from the historical working project until the scope is explicitly approved.

## 2026-08-25 — Deployment

### Completed
- Reviewed clean repo deploy readiness from `/Users/Lucia/Desktop/eastie_curriculum_app`.
- Confirmed `web` and `api` production builds pass.
- Scoped resource requirement to Unit Hello and Unit 1 only.
- Added production Graded Reading Unit 1 resources for K1/K2/K3 using the clean app's expected canonical filenames.
- Verified 158/158 clean-app K1/K2/K3 Graded Reading Unit 1 resource URLs return 200.
- Re-verified Power Up K1/K2/K3 Unit Hello and Unit 1 manifests and representative PDF/MP3 URLs return 200.

### Files / Paths
- Local app: `/Users/Lucia/Desktop/eastie_curriculum_app`
- Local resource source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/raz/k-graded-reading/k1-u01`
- Local resource source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/raz/k-graded-reading/k2-u01`
- Local resource source: `/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/raz/k-graded-reading/k3-u01`
- Production target: `/var/www/eastie-curriculum-app/curriculum-resources/raz/k-graded-reading/`

### Current Status
- Unit Hello and Unit 1 resources needed by the clean app are available online.
- Frontend/API code from the clean repo has not yet been deployed.

### Next Step
- If PM confirms, deploy the clean repo frontend build and API code while preserving the production resource library and SQLite database.

### Risks / Notes
- Do not sync `web/public` with deletion from the clean repo, because the clean repo intentionally does not contain the large production resource library.
- If future pages expose Graded Reading Units 2-9, those canonical resource paths still need a separate scoped verification/sync.

## 2026-08-25 — Deployment

### Completed
- Deployed the clean repo frontend build from `/Users/Lucia/Desktop/eastie_curriculum_app/web`.
- Deployed the clean repo API code from `/Users/Lucia/Desktop/eastie_curriculum_app/api`.
- Preserved the production SQLite database, server `.env`, and existing production resource library.
- Copied new Vite hashed assets to both the app assets directory and the legacy `/assets` directory required by current Nginx routing.
- Restarted `eastie-curriculum-api`; service is active.
- Verified `/api/health`, `/curriculum/`, `/curriculum/k1/language/unit-01`, `/curriculum/k2/language/unit-01`, and `/curriculum/k3/language/unit-01`.
- Verified clean-app K1/K2/K3 Graded Reading Unit 1 resource URLs: 158/158 return 200.

### Files / Paths
- Frontend source: `/Users/Lucia/Desktop/eastie_curriculum_app/web`
- API source: `/Users/Lucia/Desktop/eastie_curriculum_app/api`
- Production frontend: `/var/www/eastie-curriculum-app`
- Production API: `/opt/eastie-curriculum-api`
- Production DB preserved: `/var/lib/eastie-curriculum-api/eastie.sqlite`
- Backup: `/root/eastie_release_backups/20260825_231952_clean_repo_deploy`

### Current Status
- Clean repo frontend/API are live on production.
- Launch resource boundary remains Unit Hello + Unit 1.

### Next Step
- PM/user should log in through the browser and spot-check Unit Hello + Unit 1 pages, especially FT/front-end edits and source buttons.

### Risks / Notes
- `npm install` reported 4 audit findings in API dependencies; this did not block deployment but should be reviewed separately.
- Unit 2-9 Graded Reading canonical resource paths were not synced in this release by scope decision.

## 2026-08-27 — Deployment

### Completed
- Reviewed the new login flow: first access by enterprise email code, then create a personal password for future email/password login.
- Confirmed the change is committed locally as `cf2f8f7 Add teacher password setup after email verification`.
- Ran API test/build and frontend build successfully.
- Checked that `POST /api/auth/set-password` is implemented and covered by an API test.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_app/api/src/routes/auth.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_app/api/src/routes/auth.test.ts`
- `/Users/Lucia/Desktop/eastie_curriculum_app/web/src/auth/LoginPage.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_app/web/src/auth/AuthProvider.tsx`
- `/Users/Lucia/Desktop/eastie_curriculum_app/web/src/auth/authTypes.ts`

### Current Status
- Build/test gate passes locally.
- Deployment is not yet recommended as-is for the formal login rollout.

### Next Step
- Before production deploy, tighten `set-password` so it can only be used after an email-code verified session, then update auth docs to match the new default password-login flow.

### Risks / Notes
- Current backend allows any authenticated session to call `set-password` without entering the current password. This is convenient for onboarding but too broad for a formal login model.
- `web/public/training/` is untracked and appears in `web/dist`; exclude or intentionally include it before deployment.

## 2026-08-26 — Deployment

### Completed
- Checked project documentation for the current login model.
- Confirmed `api/docs/auth_design.md` already documents enterprise email verification-code login.
- Updated deployment runbook to replace the old teacher-name/shared-password notes with the production email-code login model.
- Updated `web/README.md` so local paths point to the clean repo and frontend auth routes match the email-code flow.

### Files / Paths
- `/Users/Lucia/Desktop/eastie_curriculum_app/docs/deployment.md`
- `/Users/Lucia/Desktop/eastie_curriculum_app/web/README.md`
- `/Users/Lucia/Desktop/eastie_curriculum_app/api/docs/auth_design.md`
- `/Users/Lucia/Desktop/eastie_curriculum_app/docs/SESSION_UPDATE_BOARD.md`

### Current Status
- Project records now state that production login uses allowlisted EASTIE enterprise emails plus 6-digit verification codes.
- Old shared-name/password login is documented as not exposed in the production frontend.

### Next Step
- Commit/push these documentation updates when the current deployment notes are ready to preserve in Git.

### Risks / Notes
- The API still retains password login as a backend fallback; remove it in a future hardening pass when no longer needed.
