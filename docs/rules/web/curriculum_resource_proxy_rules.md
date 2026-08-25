# Curriculum Resource Proxy Rules

**Status:** Review  
**Applies To:** Dynamic curriculum pages that link to PDF, audio, image, or other local curriculum resources  
**Last Updated:** 2026-06-16

## 1. Purpose

Curriculum pages must not expose local `file://` links for teacher-facing resource buttons.

Browsers block or handle local file paths inconsistently, especially when the page is served through the local web app or a deployed server. Resource links should go through the curriculum resource proxy.

## 2. Current Local Resource Flow

Use:

```text
Browser
  -> Vite proxy: /curriculum-resources/
  -> local backend on port 4321
  -> curriculum workspace 04_resources/
```

Current flow:

```text
/curriculum-resources/pdfs/...
/curriculum-resources/audio/...
```

Do not generate:

```text
file:///Users/Lucia/...
```

## 3. Current Implementation Notes

The K2 Language dynamic page uses this resource base:

```text
/curriculum-resources
```

The Vite dev server proxies this path to:

```text
http://localhost:4321
```

The backend resource server already maps:

```text
/curriculum-resources/*
```

to the curriculum workspace:

```text
04_resources/
```

This allows teacher-facing buttons to open PDFs and play or download MP3 files without copying resource assets into the web app.

## 4. Path Rule

When generating resource links from source metadata, paths should be relative to `04_resources/`.

Example:

```text
pdfs/example.pdf
audio/example.mp3
```

The frontend should turn these into:

```text
/curriculum-resources/pdfs/example.pdf
/curriculum-resources/audio/example.mp3
```

Do not include `04_resources/` in the final browser URL if the proxy already maps to that directory.

## 5. Do Not Copy Large Resource Libraries

Do not copy the full curriculum resource library into:

```text
web/public/
```

or into generated frontend bundles.

The current resource folder is large and should remain served through the resource route.

## 6. Deployment Requirement

Before deployment, confirm one of the following:

1. The server has the curriculum workspace resource folder available at the expected path.
2. The backend is configured with an environment variable such as:

```text
CURRICULUM_RESOURCE_DIR=/absolute/path/to/04_resources
```

3. A production storage strategy has replaced the local filesystem route.

If the deployment server does not have access to `04_resources/`, resource buttons may render but links will fail.

## 7. Verification Checklist

For any page that displays resource buttons:

- PDF buttons open the correct PDF.
- Audio play buttons play MP3 files.
- Audio download buttons download MP3 files.
- No resource button uses `file://`.
- No browser-visible URL includes an absolute local Mac path.
- The Vite proxy works in local dev.
- Production deployment notes include the resource directory requirement.

## 8. Known Current Example

K2 Language Unit 1 resource links were fixed by changing frontend resource URLs from local file paths to:

```text
/curriculum-resources/...
```

and adding the Vite proxy for:

```text
/curriculum-resources -> localhost:4321
```

