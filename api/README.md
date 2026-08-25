# EASTIE Curriculum API

First internal backend scaffold for app-level auth and lesson feedback.

## Stack

- Node + Express + TypeScript
- SQLite via `better-sqlite3`
- HttpOnly cookie sessions
- `bcryptjs` password hashing
- Email login codes via allowlisted `users` rows

No Basic Auth is used.

## Local Setup

```bash
cd api
cp .env.example .env
npm install
npm run seed
npm run dev
```

The API runs on `http://localhost:4000` by default.

Seed users:

```text
admin@eastie.demo / demo-password
teacher@eastie.demo / demo-password
```

Use different seed passwords for any shared or deployed environment.

Seed can also include a disabled teacher for login testing:

```bash
SEED_DISABLED_TEACHER_EMAIL=disabled@eastie.demo npm run seed
```

To import the EASTIE Space allowlist from the internal directory workbook:

```bash
EASTIE_DIRECTORY_XLSX="/Users/Lucia/Downloads/伊思迪通讯录.xlsx" npm run import:directory
```

The importer reads the `企业邮箱` column and the `EASTIE Space` marker. Rows marked `Admin` become active admins; rows marked `Active` become active teachers. Only `@eastie.com.cn` enterprise emails are imported. To also disable existing `@eastie.com.cn` users that are no longer marked active/admin in the workbook:

```bash
DISABLE_UNLISTED_EASTIE_USERS=true npm run import:directory
```

## Environment

```text
APP_URL=http://localhost:5173
DATABASE_URL=./db/eastie.sqlite
SESSION_COOKIE_NAME=eastie_session
SESSION_DAYS=7
LOGIN_CODE_MINUTES=10
RESET_TOKEN_MINUTES=30
BCRYPT_ROUNDS=12
EMAIL_FROM="EASTIE Curriculum <no-reply@example.org>"
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
```

If `SMTP_HOST` is empty outside production, login codes and reset links are printed to the API server log. The login-code endpoint also returns a dev-only `dev.loginCode` value when `NODE_ENV !== "production"` and SMTP is not configured.

## Auth API

All authenticated browser requests should include cookies:

```ts
fetch("/api/auth/me", { credentials: "include" })
```

### `POST /api/auth/request-login-code`

Request:

```json
{ "email": "teacher@eastie.demo" }
```

Only active `users` rows can request codes. Unknown emails and disabled users are rejected.

Response:

```json
{
  "ok": true,
  "message": "A login code was sent to teacher@eastie.demo."
}
```

Local dev without SMTP may also include:

```json
{ "dev": { "loginCode": "123456" } }
```

### `POST /api/auth/verify-login-code`

Request:

```json
{ "email": "teacher@eastie.demo", "code": "123456" }
```

Codes are 6 digits, valid for 10 minutes by default, single-use, and limited to 5 wrong attempts. Successful verification creates the existing `eastie_session` HttpOnly cookie.

### `POST /api/auth/login`

Password login remains available as a temporary fallback. The frontend hides it by default.

Request:

```json
{ "email": "teacher@eastie.demo", "password": "demo-password" }
```

Response:

```json
{
  "user": {
    "id": "uuid",
    "email": "teacher@eastie.demo",
    "displayName": "Teacher Preview",
    "role": "teacher",
    "status": "active"
  }
}
```

Sets the `eastie_session` HttpOnly cookie.

### `GET /api/auth/me`

Requires session cookie. Returns `{ "user": AuthUser }`.

### `POST /api/auth/logout`

Revokes the current session and clears the cookie.

### `POST /api/auth/forgot-password`

Request:

```json
{ "email": "teacher@eastie.demo" }
```

Always returns a generic success message. In local dev, the reset link is logged to the API console if `SMTP_HOST` is unset.

### `POST /api/auth/reset-password`

Request:

```json
{ "token": "reset-token-from-email", "newPassword": "new-password" }
```

Marks the reset token used, changes the password, and revokes existing sessions.

### `POST /api/auth/change-password`

Requires session cookie.

Request:

```json
{ "currentPassword": "old-password", "newPassword": "new-password" }
```

Changes the password and revokes other active sessions for the user.

## Feedback API

Feedback creation requires any authenticated user. Listing, reading, and patching feedback require `admin`.

### `POST /api/feedback`

Request:

```json
{
  "context": {
    "unit_id": "pg-non-language-unit-08",
    "unit_title": "Nature, Weather and Animals",
    "level": "PG",
    "course_type": "non-language",
    "unit_number": 8,
    "course_code": "A",
    "course_title": "Course A",
    "lesson_id": "pg-u08-course-a-lesson-01",
    "lesson_title": "Lesson 1",
    "page_url": "/curriculum/pg/non-language/unit-08/course-a",
    "language": "en"
  },
  "message": "Teacher feedback text.",
  "category": "content"
}
```

The backend stores the authenticated submitting user and server timestamp.

### `GET /api/feedback`

Admin only. Optional filters:

```text
unit_id
course_code
lesson_id
status
```

### `GET /api/feedback/:id`

Admin only.

### `PATCH /api/feedback/:id`

Admin only. Supports:

```json
{ "status": "reviewed", "category": "layout", "message": "Updated text" }
```

## Frontend Integration Notes

- Replace mock auth calls in `web/src/auth/AuthProvider.tsx` with `fetch` calls to `/api/auth/*`.
- Use `credentials: "include"` for login, me, logout, change password, and feedback.
- In local Vite dev, either configure a `/api` proxy to `http://localhost:4000` or call the API origin directly with CORS allowed by `APP_URL`.
- Upgrade `web/src/feedback/feedbackTypes.ts` to the structured `context + message + category` payload.
- Keep frontend route protection in place, but hydrate auth state from `GET /api/auth/me`.

## Production Deployment Notes

- No Basic Auth should be used for the deployed curriculum app.
- Serve the frontend and API over HTTPS. Production cookies are marked `Secure` and will not work over plain HTTP.
- Prefer same-site deployment, such as `https://curriculum.example.org` serving the frontend and `/api` proxying to the API. In that setup, the current `SameSite=Lax` cookie strategy is appropriate.
- If the frontend and API are on different sites, revisit cookie settings before deploy. Cross-site cookies generally require `SameSite=None; Secure`, and some browsers apply stricter tracking protections.
- Set `APP_URL` to the exact frontend origin allowed by CORS, for example `https://curriculum.example.org`. If multiple origins are needed, replace the single-origin CORS setting with an explicit allowlist.
- Browser requests that rely on session cookies must use `credentials: "include"`.
- If the API is behind a reverse proxy or load balancer, ensure HTTPS is terminated correctly and proxy headers are trustworthy before changing cookie behavior.
- Do not run demo seed in production. `npm run seed` refuses to run when `NODE_ENV=production` unless `ALLOW_DEMO_SEED=true` is set intentionally for a one-off operation.
- Replace demo passwords and configure a real email provider before any shared deployment.

## Schema

SQLite tables are created automatically at startup:

- `users`
- `sessions`
- `password_reset_tokens`
- `email_login_codes`
- `lesson_feedback`

The schema keeps explicit lesson context columns plus a user snapshot so feedback remains useful even if a user profile changes later.
