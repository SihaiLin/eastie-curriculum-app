# EASTIE Deployment Runbook

Status: Active production topology  
Last updated: 2026-08-23

This document records the current real deployment setup for `eastie.sihai.space`.
It replaces the earlier placeholder deployment note.

## 1. Project Boundary

The clean dynamic app workspace is:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/
```

Frontend app:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web
```

Backend API:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/api
```

Historical curriculum source workspace:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

Deployment must not silently redefine source of truth. Curriculum source markdown remains in the historical curriculum workspace unless it has been intentionally migrated or synced into the clean project.

## 2. Production Server

Production host:

```text
root@124.220.44.111
```

Production domain:

```text
https://eastie.sihai.space
```

Node:

```text
/usr/local/bin/node
```

Nginx config:

```text
/etc/nginx/conf.d/eastie.sihai.space.conf
```

Backups:

```text
/var/www/eastie-static-backups/
```

## 3. Production Topology

### Dynamic curriculum frontend

Built from:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web
```

Served from:

```text
/var/www/eastie-curriculum-app
```

The app is a Vite/React build. Production deploys only:

```text
web/dist/index.html
web/dist/assets/
```

Do not upload the whole repo for a normal frontend release.

Important: Nginx currently serves hashed Vite JS/CSS from the legacy static asset directory:

```text
/var/www/eastie.sihai.space/assets/
```

Therefore every frontend deploy must also copy the new `web/dist/assets/index-*.js` and
`web/dist/assets/index-*.css` files into that legacy asset directory. If this step is
missed, `/curriculum/` may return `200` but show a white screen because the browser cannot
load the new hashed app bundle.

### Legacy static site

Static root:

```text
/var/www/eastie.sihai.space
```

This currently serves legacy/static pages such as:

- root portal homepage `/`
- term growth reports `/term_growth_reports/`
- app hashed assets copied into `/assets/`

### New curriculum API

Systemd service:

```text
eastie-curriculum-api
```

App path:

```text
/opt/eastie-curriculum-api
```

Database:

```text
/var/lib/eastie-curriculum-api/eastie.sqlite
```

Port:

```text
4000
```

Primary responsibilities:

- app login
- logout
- session cookies
- password change/reset plumbing
- feedback API
- admin feedback API

### Legacy K2 app

Systemd service:

```text
eastie-web
```

Port:

```text
4321
```

Primary responsibilities retained for compatibility:

- legacy K2 Power Up page
- K2 teacher layer APIs
- YLE word bank API
- old admin reports page

## 4. Nginx Route Ownership

Current route ownership:

```text
/curriculum/                  -> new React app
/login                        -> new React app
/admin/feedback               -> new React app
/api/auth/*                   -> eastie-curriculum-api on :4000
/api/feedback/*               -> eastie-curriculum-api on :4000
/api/health                   -> eastie-curriculum-api on :4000
/curriculum-resources/        -> static resource library under /var/www/eastie-curriculum-app/curriculum-resources/

/curriculum/power-up/k2/...   -> legacy eastie-web on :4321
/api/k2/*                     -> legacy eastie-web on :4321
/api/yle-word-bank            -> legacy eastie-web on :4321
/admin/reports                -> legacy eastie-web on :4321, admin-only

/                              -> legacy static root, Basic Auth protected
/term_growth_reports/          -> legacy static root, Basic Auth protected
/assets/index-*.js/css         -> generated app assets, no Basic Auth
```

## 5. Auth Model

There are currently two auth layers, but not for the same surface.

### Dynamic curriculum app

The dynamic curriculum app uses page login only.

No browser Basic Auth should block:

```text
/login
/curriculum/
/admin/feedback
/api/auth/*
/api/feedback/*
/api/health
/curriculum-resources/
/assets/index-*.js
/assets/index-*.css
```

Current app login account convention:

```text
<teacher-name>@eastie.space
```

The frontend also accepts teacher names such as `Jackie` and normalizes them to `jackie@eastie.space`.

Current known password convention:

- `Sihai` / `Lucia`: project-specific admin password
- other teachers: standard teacher password

Do not write plaintext passwords into this runbook.

### Legacy/static surfaces

The following may still use browser Basic Auth:

```text
/
/term_growth_reports/
```

The old K2 Power Up surface still has compatibility needs and should be checked carefully before changing auth.

## 6. Normal Frontend Deploy Flow

From local machine:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run build
```

Verify local build output:

```text
web/dist/index.html
web/dist/assets/index-*.js
web/dist/assets/index-*.css
```

Create a deploy package containing only:

```text
web-app/index.html
web-app/assets/
```

Upload to the server and deploy to:

```text
/var/www/eastie-curriculum-app
```

Then copy/merge generated app assets into:

```text
/var/www/eastie.sihai.space/assets
```

This is required, not optional, under the current Nginx topology. At minimum, make sure the
current build's hashed files exist in the legacy asset directory:

```text
web/dist/assets/index-*.js
web/dist/assets/index-*.css
```

Use `rsync -a --delete` for `/var/www/eastie-curriculum-app`, but do not delete the whole legacy static root.

Before replacing the frontend app, create a backup under:

```text
/var/www/eastie-static-backups/
```

Recommended backup naming:

```text
curriculum-latest-before-YYYYMMDDHHMMSS.tgz
```

## 7. Backend Deploy Flow

Backend deploy is less frequent than frontend deploy.

Build locally:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/api
npm run build
```

Deploy the API app to:

```text
/opt/eastie-curriculum-api
```

Keep production environment config at:

```text
/opt/eastie-curriculum-api/.env
```

Current production env shape:

```text
PORT=4000
NODE_ENV=production
APP_URL=https://eastie.sihai.space
SESSION_COOKIE_NAME=eastie_session
DATABASE_URL=/var/lib/eastie-curriculum-api/eastie.sqlite
```

After backend changes:

```bash
systemctl restart eastie-curriculum-api
systemctl status eastie-curriculum-api --no-pager
curl -fsS http://127.0.0.1:4000/api/health
```

Do not overwrite the production SQLite DB during normal deploy.

## 8. Resource Library Strategy

The large local resource library is currently under:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources
```

It includes RAZ, PDFs, audio, and cover assets. It is several GB.

Normal dynamic curriculum frontend deploys do not upload the whole library.

Upload resource folders only when:

- a specific online page needs those resources;
- the route/path decision is explicit;
- the resource sync scope is reviewed;
- the deploy note says exactly which folder was uploaded.

Current production resource deployment:

```text
/var/www/eastie-curriculum-app/curriculum-resources/raz/k-graded-reading
/var/www/eastie-curriculum-app/curriculum-resources/raz-covers/k-graded-reading
```

These are served directly by Nginx at:

```text
https://eastie.sihai.space/curriculum-resources/...
```

Nginx has `auth_basic off` for this route so curriculum pages can load media without a browser Basic Auth popup. Resource URLs are therefore static public URLs even though curriculum pages themselves use page login.

Current normal deploy scope:

```text
web/dist/index.html
web/dist/assets/
```

Not:

```text
the full web/dist/curriculum-resources/
the full web/public/curriculum-resources/
```

## 9. Production Verification Checklist

After a frontend deploy, verify:

```bash
curl -sk https://eastie.sihai.space/curriculum/
curl -sk https://eastie.sihai.space/assets/index-<hash>.js
curl -sk https://eastie.sihai.space/assets/index-<hash>.css
```

Use the exact hash filenames from the current `web/dist/assets/` directory. If
`/curriculum/` is blank but returns `200`, check these hashed JS/CSS URLs first.

Verify app login:

```bash
curl -sk -c /tmp/eastie-cookies.txt \
  -H 'content-type: application/json' \
  -d '{"email":"jackie@eastie.space","password":"<redacted>"}' \
  https://eastie.sihai.space/api/auth/login
```

Verify representative routes:

```text
/curriculum/
/curriculum/pg/non-language/unit-01
/curriculum/pg/non-language/unit-09
/curriculum/pk/non-language/unit-01
/curriculum/pk/non-language/unit-09
/curriculum/pg/language/unit-06
/curriculum/pk/language/unit-06
/curriculum/k1/language/unit-01
/curriculum/k2/language/unit-01
/curriculum/k3/language/unit-01
/curriculum/status
/login
```

Verify legacy compatibility:

```text
/curriculum/power-up/k2/level-1/unit-1/
/api/k2/language/units/unit_01_our_new_school/lessons
/api/yle-word-bank
/term_growth_reports/
```

Expected auth behavior:

- `/curriculum/` and `/login` should not trigger browser Basic Auth.
- `/` and `/term_growth_reports/` may still trigger browser Basic Auth.
- `/api/auth/me` returns `401` when no app session cookie is present.

## 10. Rollback

Frontend rollback:

1. Find the relevant backup under:

```text
/var/www/eastie-static-backups/
```

2. Restore `/var/www/eastie-curriculum-app`.
3. Re-copy restored app assets into:

```text
/var/www/eastie.sihai.space/assets
```

4. Verify `/curriculum/` and login again.

Nginx rollback:

Use the saved config backup in:

```text
/var/www/eastie-static-backups/
```

Then run:

```bash
nginx -t
systemctl reload nginx
```

API rollback:

Restore `/opt/eastie-curriculum-api` from the relevant backup or redeploy a known-good package, then:

```bash
systemctl restart eastie-curriculum-api
curl -fsS http://127.0.0.1:4000/api/health
```

Do not roll back or delete the production SQLite DB unless the PM explicitly asks for database rollback.

## 11. Reporting Requirement

After each meaningful deployment work block, write a concise update to:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/docs/SESSION_UPDATE_BOARD.md
```

If the deployment topology changes materially, also update this runbook and consider whether `PROJECT_STATUS.md` should be updated.
