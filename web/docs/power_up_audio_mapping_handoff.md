# Power Up K1–K3 Audio Mapping Handoff

## Scope and status

The Power Up resource manifests now contain the verified Pupil's Book (PB) and Activity Book (AB) audio mappings for K1, K2, and K3.  Each displayed resource has a source MP3 and a lesson/page association, except for the explicitly documented non-course materials below.

The source-of-truth mapping implementation is `scripts/sync-power-up-resources.mjs`.  Regenerate manifests with:

```bash
npm run sync:power-up:resources
```

## Audio classification

| Classification | Treatment |
| --- | --- |
| `pupil-book` / `activity-book` | Display as the normal lesson audio resource. |
| `shared-pupil-activity` | One verified K3 story track is reused by PB and AB Lesson 3; show once per relevant page context. |
| `pupil-book-accompaniment` | Display in PB beside the paired main track. Do not place these in AB. |
| Copyright | Do not display as a lesson resource. |
| K2/K3 CD4 p120 material | Retain as a documented standalone resource pending a destination page; do not force it onto a TB lesson. |

## PB accompaniment mapping

An accompaniment is always on the same PB page and lesson as the immediately preceding physical CD track.  This was checked against every mapped accompaniment.

| Grade | Unit | Main track | Accompaniment | Lesson |
| --- | ---: | --- | --- | ---: |
| K2 | 1 | 1.14 | 1.15 | 5 |
| K2 | 2 | 1.27 | 1.28 | 5 |
| K2 | 3 | 1.41 | 1.42 | 5 |
| K2 | 4 | 2.09 | 2.10 | 5 |
| K2 | 5 | 2.24 | 2.25 | 5 |
| K2 | 6 | 2.37 | 2.38 | 5 |
| K2 | 7 | 3.05 | 3.06 | 5 |
| K2 | 8 | 3.20 | 3.21 | 5 |
| K2 | 9 | 3.35 | 3.36 | 5 |
| K3 | 1 | 1.14 | 1.15 | 5 |
| K3 | 2 | 1.28 | 1.29 | 5 |
| K3 | 3 | 1.42 | 1.43 | 5 |
| K3 | 4 | 2.06 | 2.07 | 5 |
| K3 | 5 | 2.23 | 2.24 | 5 |
| K3 | 6 | 2.37 | 2.38 | 5 |
| K3 | 7 | 3.09 | 3.10 | 5 |
| K3 | 8 | 3.28 | 3.29 | 5 |
| K3 | 9 | 3.45 | 3.46 | 5 |

K1 currently has no PB audio classified for display as accompaniment.

## Notes for PM

- K3 Unit 4 Lesson 11: the language source file is missing. PB p54 is nevertheless mapped to audio 2.13 and 2.14, and the manifest carries this note.
- K2 and K3 CD4 tracks 4.04 and 4.05 belong to PB p120 standalone material (chant/numbers/letters). There is no corresponding TB destination yet.
- Copyright tracks are intentionally excluded from lesson displays.
- K2 and K3 PB filenames encode the physical CD track. The UI should display the physical form (for example, `2.38`), rather than an internal continuous/audioscript track number. K1 display remains unchanged.
