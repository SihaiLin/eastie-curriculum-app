# EASTIE Curriculum Web

This folder contains the Vite + React + TypeScript frontend application.

Expected responsibilities:

- curriculum dashboard;
- teacher-facing course pages;
- level / unit navigation;
- language switching;
- login UI;
- feedback form UI;
- API integration.

## Dynamic-First Direction

This web project should not copy static curriculum HTML pages as production content.

Static reference pages remain in:

```text
/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/
```

The frontend should render curriculum pages dynamically from structured data and reusable components.

See:

```text
docs/dynamic_frontend_plan.md
docs/content_sync_workflow.md
../docs/dynamic_app_structure.md
```

## Curriculum Content Sync

The frontend does not read Markdown directly in the browser. Reviewed Markdown content is synced into generated TypeScript snapshots before rendering.

Current sync commands:

```bash
npm run sync:pg-unit-08
npm run sync:pk-unit-08
```

After source Markdown changes, run the relevant sync command and then:

```bash
npm run build
```

Generated files under `src/curriculum/generated/` should not be hand-edited.

Full workflow:

```text
docs/content_sync_workflow.md
```

## Local API Integration

Do not use Basic Auth. The frontend uses app-level authentication through the Express API.

Run the API first:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/api
cp .env.example .env
npm install
npm run seed
npm run dev
```

Run the web app:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm install
npm run dev -- --host 127.0.0.1
```

The API defaults to `http://localhost:4000`. Vite proxies `/api/*` to that origin in local dev, so frontend calls can use same-origin URLs such as `/api/auth/me` with `credentials: "include"`.

Seed accounts:

```text
admin@eastie.demo / demo-password
teacher@eastie.demo / demo-password
```

Auth routes currently used by the frontend:

```text
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/change-password
```

Lesson feedback currently posts to:

```text
POST /api/feedback
```

## Suggested Future Structure

```text
web/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── curriculum/
│   ├── auth/
│   └── feedback/
├── package.json
└── .env.example
```
