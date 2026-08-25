# Power Up Resource Pipeline

**Status:** Review  
**Applies to:** K1/K2/K3 language pages using Power Up resources  
**Reference implementation:** K1/K2/K3 Unit 1 resource package  
**Last updated:** 2026-07-14

## 1. Purpose

This document defines the current web resource pipeline for Power Up language pages.

It exists because PDF pages, Pupil Book audio, and Activity Book audio do not have the same reliability profile. The web app must not guess teacher-facing audio links from filenames alone.

## 2. Source Roots

Power Up source resources live under:

```text
/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/
```

Level mapping:

| EASTIE level | Power Up source key | Power Up name |
|---|---|---|
| K1 | `starter` | Starter |
| K2 | `level_1` | Level 1 |
| K3 | `level_2` | Level 2 |

Frontend public resource packages are generated under:

```text
/Users/Lucia/Desktop/eastie_curriculum_project/web/public/curriculum-resources/power-up/{k1|k2|k3}/unit-XX/
```

The browser URL root is:

```text
/curriculum-resources/power-up/{k1|k2|k3}/unit-XX/
```

## 3. Generated Manifest

Each level/unit should generate:

```text
web/public/curriculum-resources/power-up/{grade}/unit-XX/resource-manifest.json
```

The generic sync command is:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run sync:power-up:resources -- --unit 01
```

The legacy Unit 1 alias is still available:

```bash
cd /Users/Lucia/Desktop/eastie_curriculum_project/web
npm run sync:power-up:unit-01-resources
```

The manifest stores:

- `lessons[].pdfs`
- `lessons[].audio`
- `unitAudio`
- `summary`

Frontend rendering should prefer `resource-manifest.json` over parsing generated curriculum `Source` strings.

## 4. PDF Rules

PDFs are safe to map from normalized lesson-page PDF filenames.

Expected public folders:

```text
teacher-book/
pupil-book/
activity-book/
```

For a Power Up lesson page, the frontend should show all manifest PDFs for that lesson:

- Teacher Book
- Pupil Book
- Activity Book

Do not filter manifest PDFs through generated `Source` text. Generated `Source` text may omit a PDF reference even when the verified PDF exists, as seen with K1 Unit 1 Lesson 6.

## 5. Pupil Book Audio Rules

Pupil Book audio may use filename/page information only when the mapping is structurally reliable.

For K1 Starter Unit 1, Pupil Book audio filenames include unit/page/track markers and are grouped by page/lesson in the resource manifest.

For K2/K3 Level 1/2, Pupil Book audio may be present as unit-level tracks. Do not attach unit-level tracks to a lesson unless the lesson `Source` text or another verified source explicitly names that track.

## 6. Activity Book Audio Rules

Activity Book audio must not be inferred only from:

- `PgNNN` in the audio filename;
- the AB PDF filename;
- lesson number;
- sequential ordering alone.

Activity Book audio must come from a verified track map created by inspecting the actual Activity Book PDF page.

Current Unit 1 verified map:

```text
/Users/Lucia/Desktop/Codex_workspace/Power Up/levels/activity_book_audio_track_map_unit_01.json
```

Required map schema:

```json
{
  "schemaVersion": "power-up-ab-audio-track-map.v0.1",
  "unit": "unit-01",
  "levels": {
    "starter": {
      "eastieLevel": "K1",
      "items": [
        {
          "lesson": 1,
          "abPage": 8,
          "abPdf": "Starters_AB_U1_L1_pg008.pdf",
          "exercise": "Ex 1",
          "printedTrack": "1.01",
          "audioFile": "PU_AB_BE_L0_U01_Pg008_Ex01_tr_005.mp3",
          "audioFilePath": "/absolute/path/to/audio.mp3",
          "confidence": "verified"
        }
      ]
    }
  }
}
```

Accepted confidence values:

| Value | Meaning | Frontend handling |
|---|---|---|
| `verified` | Track was read from the PDF and mapped to an audio file | Show normally |
| `low-confidence` | OCR found a likely track but needs human review | May show with review hint, or upgrade after manual review |
| `missing-audio` | Track visible but audio file missing | Do not show playable button |
| `no-visible-track` | No printed track on page | Do not show playable button |
| `ambiguous` | Multiple possible matches or unclear PDF reading | Do not show playable button |

When a low-confidence item is manually checked, update the map entry with:

```json
{
  "confidence": "verified",
  "notes": "Manually verified from rendered PDF on YYYY-MM-DD."
}
```

## 7. Two-Page Spread Warning

Many Power Up Activity Book PDFs render as two-page spreads. A file named with page `pg010` may visually contain pages 10 and 11.

Resource validation should check the visible page and printed track, not only the filename.

The manifest should store the page associated with the verified track.

## 8. Frontend Rendering Rules

`KLanguageUnitPage` should:

1. Load `/curriculum-resources/power-up/{grade}/unit-XX/resource-manifest.json`.
2. Render PDF buttons from the manifest.
3. Render lesson-level audio from the manifest.
4. Render unit-level audio only when the lesson source explicitly references a matching track.
5. Fall back to source text if the manifest is missing.

The frontend should not contain hard-coded Power Up audio maps such as `activityBookAudioMap`.

## 9. QA Checklist

For each generated resource manifest:

- [ ] Every public PDF path exists.
- [ ] Every public audio path exists.
- [ ] Every Activity Book audio entry has a corresponding AB PDF page.
- [ ] Activity Book audio was sourced from a verified OCR/manual map.
- [ ] Low-confidence items are either visibly marked or manually upgraded.
- [ ] At least representative AB pages are visually rendered and checked.
- [ ] `npm run sync:power-up:resources -- --unit XX` or equivalent passes.
- [ ] `npm run build` passes.
- [ ] Browser page is hard-refreshed before final QA.

## 10. Current Unit 1 Status

As of 2026-07-14:

| Level | Unit | Verified AB audio | Low-confidence AB audio | Notes |
|---|---:|---:|---:|---|
| K1 | 1 | 14 | 0 | K1 L3 `1.04` manually verified |
| K2 | 1 | 7 | 0 | K2 uses `4.09` through `4.15` where present |
| K3 | 1 | 0 | 0 | Source map has no Level 2 Unit 1 AB PDFs |

## 11. Generalized Sync Script

The active script is unit-parameterized:

```text
web/scripts/sync-power-up-resources.mjs
```

Example:

```bash
npm run sync:power-up:resources -- --unit 02
```

The old Unit 1 entrypoint remains as a compatibility wrapper:

```text
web/scripts/sync-power-up-unit-01-resources.mjs
```

Before expanding many units, generate and review the Activity Book track map for the next small batch. If no `activity_book_audio_track_map_unit_XX.json` exists, the script should still copy safe PDFs and unit-level/pupil-book audio where available, but it must not infer Activity Book audio.
