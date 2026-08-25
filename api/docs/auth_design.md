# Authentication Design Notes

## Policy

The EASTIE curriculum site does not use Basic Auth.

## Implemented Roles

```text
admin
teacher
```

## Implemented Strategy

- Default login uses allowlisted teacher/admin email rows plus a 6-digit email code.
- Password login with `email` + `password` remains available temporarily as a fallback.
- Password hashes use bcrypt for fallback password login and password reset/change.
- Browser auth uses opaque HttpOnly cookie sessions.
- Session tokens, reset tokens, and email login codes are stored as SHA-256 hashes.
- Email login codes expire after 10 minutes by default, are single-use, and allow 5 wrong attempts.
- Logout revokes the active session.
- Password reset tokens are single-use and expire.
- Local dev logs reset links and login codes to the API console when SMTP is not configured.

## User Allowlist

The `users` table is the allowlist:

```text
email
display_name
role: admin | teacher
status: active | disabled
```

Only `active` users can request or verify login codes. Disabled users also lose access through existing sessions because `/api/auth/me` rejects disabled accounts.

## API Routes

```text
POST /api/auth/request-login-code
POST /api/auth/verify-login-code
GET  /api/auth/me
POST /api/auth/logout
POST /api/auth/login              # temporary password fallback
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/change-password
```

## User Identity

Feedback is attributed to the logged-in user. The feedback form does not need a free-text name field if the backend already knows the user.

## Open Decisions For Later

- Admin user management location.
- Production email provider.
- Future SSO or school directory integration.
- When to remove password fallback from the public app.

## Production Notes

- Use HTTPS. Production cookies are `Secure`.
- Prefer same-site frontend/API hosting with `SameSite=Lax`.
- Use explicit CORS origins; do not use wildcard CORS with credentials.
- Demo seed is blocked in production unless `ALLOW_DEMO_SEED=true`.
- No Basic Auth.
