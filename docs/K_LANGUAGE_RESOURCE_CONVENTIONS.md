# K-Language Curriculum Markdown Specification

> Resource pipeline note: this document still defines K-language Markdown structure, but the current Power Up PDF/audio sync and frontend resource rendering rules are maintained in:
> `/Users/Lucia/Desktop/eastie_curriculum_project/docs/rules/web/power_up_resource_pipeline.md`
>
> If resource guidance here conflicts with that pipeline document, use the pipeline document. In particular, Activity Book audio must come from OCR/manual verified track maps, not filename/page inference or `activityBookAudioMap`.

## Level Overview

| Curriculum Level | Power Up Level | Prefix | Lessons/Unit | AB Audio |
|---|---|---|---|---|
| K1 | Starter (L0) | `Starters` | 10 | Via `u01/PU_AB_*` in Source |
| K2 | Level 1 (L1) | `Level1` | 12 | Via `activityBookAudioMap` |
| K3 | Level 2 (L2) | `Level2` | 12 | Via `activityBookAudioMap` |

---

## File Structure

Each unit has exactly 5 markdown files:

```
unit_XX_name/
├── 00_overview.md
├── 01_week_1.md
├── 02_week_2.md
├── 03_week_3.md
└── 04_week_4.md
```

---

## 00_overview.md — Exact Field Spec

### Section Headers (must match exactly, case-sensitive)

```
## Unit Outcomes
## Language Summary
## Power Up Mission            (K2/K3) or ## Power Up Mini Mission (K1)
## 4-Week Structure
## Showcase
```

### Field Content Rules

| Section | Content Format | Example |
|---|---|---|
| Unit Outcomes | Each outcome on its own line | `- talk about friends and family` |
| Language Summary | `{N} unique new language items ｜ item1 ｜ item2 ｜ ...` | `44 unique new language items ｜ man ｜ woman ｜ boy ｜ girl` |
| Power Up Mission | Free text describing unit mission | `Mission: Make a daily routine chart\n\n**L1**: Mission set up...` |
| 4-Week Structure | Bold week labels with descriptions | `**Week 1**: Power Up Lessons 1-4 + Friday Mission Extend 1\nMission Stage begins.` |
| Showcase | Free text or placeholder | `Showcase content to be filled after teacher design.` |

### Separator

Use **Unicode FULLWIDTH VERTICAL LINE** `｜` (U+FF5C), NOT ASCII pipe `|`.

---

## Week Files (01_week_N.md) — Exact Field Spec

### Required `##` Section Headers (exact match)

```
## Source Week
## Weekly Outcome
## Core Language
## Repeated Routine
```

### Lesson Structure

#### Regular Power Up Lessons

```
### Lesson {N}: {Title}

#### Lesson Role
{exact role text}

#### Source
TB p{N} ｜ PB p{N} ｜ AB p{N} ｜ u{unit}/PU_SB_....mp3 ｜ u{unit}/PU_AB_....mp3

#### Lesson Outcome
{outcome text}

#### New Language
{items separated by ｜}

#### Recycled Language
{items separated by ｜}

#### Mission                         (K2/K3 only, optional)
{Mission stage description}
```

**Required `####` fields (all lessons):**
- `Lesson Role`
- `Source`
- `Lesson Outcome`
- `New Language`
- `Recycled Language`

**Optional `####` fields:**
- `Mission` — K2/K3 mission stages (L1, L4, L6, L8, L12)
- `Mini Mission` — K1 only (L10)

#### Mission Extend

```
### Mission Extend {N}                (K2/K3) or ### Media Extend {N} (K1)

#### Lesson Role
EASTIE-added Mission Extend          (or EASTIE-added Media Extend for K1)

#### Status
Waiting for teacher design.
```

**Required `####` fields:** `Lesson Role`, `Status`

#### Mini Mission (K1 only, Week 1 & 2)

```
### Mini Mission {N}

#### Lesson Role
EASTIE-added Mini Mission

#### Status
Waiting for teacher design.
```

**Required `####` fields:** `Lesson Role`, `Status`

#### Showcase

```
### Showcase Lesson {N}

#### Lesson Role
EASTIE-added Showcase Lesson

#### Status
Waiting for teacher design.
```

**Required `####` fields:** `Lesson Role`, `Status`

---

## Strict Validation Rules

These rules are enforced by the sync script (`sync-k-language-unit.mjs`):

### Overview (`00_overview.md`)
- Must have exactly these `##` sections (K2/K3): `Unit Outcomes`, `Language Summary`, `Power Up Mission`, `4-Week Structure`, `Showcase`
- Must have exactly these `##` sections (K1): `Unit Outcomes`, `Language Summary`, `Power Up Mini Mission`, `4-Week Structure`, `Showcase`
- No extra `##` sections, no missing ones

### Week Files (`01_week_N.md`)
- Must have exactly: `## Source Week`, `## Weekly Outcome`, `## Core Language`, `## Repeated Routine`
- Must have exactly 5 `###` lessons per week (K2/K3: 4 regular + 1 Mission Extend, K1: 3 regular + 1 Media Extend + 1 Mini Mission)
- Week 4: exactly 5 `### Showcase Lesson {1-5}`

### Lesson `####` Fields
- Regular lessons: must have `Lesson Role`, `Source`, `Lesson Outcome`, `New Language`, `Recycled Language`
- Mission Extend / Showcase: must have `Lesson Role`, `Status`
- `Lesson Role` field name must be exact (case-sensitive)

### Source Field Values
- Must use `｜` (U+FF5C) as separator
- PDF references format: `{TB|PB|AB} p{N}` (e.g., `TB p8`, `PB p8`, `AB p8`)
- Audio references format: `u{NN}/PU_{SB|AB}_BE_{level}_U{unit}_...mp3`
- Order: `TB pN ｜ PB pN ｜ AB pN ｜ audio files`

---

## Lesson Role Values (by level)

### K1 (Power Up Starter)

| Lesson | Role |
|---|---|
| L1 | Unit opener and Vocabulary 1 presentation |
| L2 | Language presentation and practice 1 |
| L3 | Vocabulary 2 presentation and song |
| L4 | Language presentation and practice 2 |
| L5 | Literature - story focus |
| L6 | Literature - response to story and mid-unit evaluation |
| L7 | Phonics and Literacy |
| L8 | Cross-curricular and video |
| L9 | Cartoon story and consolidation of language in context |
| L10 | Unit review and Mini-mission |

### K2 (Power Up Level 1)

| Lesson | Role |
|---|---|
| L1 | Getting Started |
| L2 | Vocabulary 1 presentation |
| L3 | Story with new language presented in context |
| L4 | Language practice 1 and Mission Stage 1 |
| L5 | Vocabulary 2 presentation and song |
| L6 | Language practice 2 and Mission Stage 2 |
| L7 | Cross-curricular presentation and video |
| L8 | Cross-curricular consolidation and Mission Stage 3 |
| L9 | Literature - story focus |
| L10 | Literature - response to story and social and emotional skills |
| L11 | A1 Movers preparation |
| L12 | Unit review and Mission in action |

### K3 (Power Up Level 2)

| Lesson | Role |
|---|---|
| L1 | Unit opener and Mission set up |
| L2 | Vocabulary 1 presentation |
| L3 | Story with new language presented in context |
| L4 | Language practice 1 and Mission Stage 1 |
| L5 | Vocabulary 2 presentation and song |
| L6 | Language practice 2 and Mission Stage 2 |
| L7 | Cross-curricular presentation and video |
| L8 | Cross-curricular consolidation and Mission Stage 3 |
| L9 | Literature - story focus |
| L10 | Literature - response to story and social and emotional skills |
| L11 | A1 Movers preparation |
| L12 | Unit review and Mission in action |

---

## Week Structure (by level)

### K1 (10 lessons)

| Week | Lessons | Extras |
|---|---|---|
| 1 | L1-L3 | Media Extend 1 + Mini Mission 1 |
| 2 | L4-L6 | Media Extend 2 + Mini Mission 2 |
| 3 | L7-L10 | Media Extend 3 (L10 has original Mini Mission) |
| 4 | Showcase | 5 Showcase Lessons |

**Weekly Outcome examples:**
- Week 1: "Learners will be able to identify and name friends and family members, and ask and answer questions about name and age."
- Week 2: "Learners will be able to make simple statements and ask simple questions using he/she, listen to a real-life story, and recognise the emotion happy."
- Week 3: "Learners will be able to recognise initial letter sounds b, c and m, learn about family trees, and understand vocabulary and language in a cartoon story context."

### K2 (12 lessons)

| Week | Lessons | Extras |
|---|---|---|
| 1 | L1-L4 | Mission Extend 1 |
| 2 | L5-L8 | Mission Extend 2 |
| 3 | L9-L12 | Mission Extend 3 / Showcase Preparation (L12 has Mission in action) |
| 4 | Showcase | 5 Showcase Lessons |

**Weekly Outcome examples:**
- Week 1: "Unit opener, vocabulary presentation, story with prepositions, language practice, and Mission Stage 1."
- Week 2: "Vocabulary 2, song, language practice, cross-curricular content, and Mission Stage 2-3."
- Week 3: "Literature, story response, A1 Movers preparation, unit review, and Mission in action."

### K3 (12 lessons)

| Week | Lessons | Extras |
|---|---|---|
| 1 | L1-L4 | Mission Extend 1 |
| 2 | L5-L8 | Mission Extend 2 |
| 3 | L9-L12 | Mission Extend 3 / Showcase Preparation |
| 4 | Showcase | 5 Showcase Lessons |

---

## Mission Field Content (by level)

### K2 — Mission stages

| Lesson | `#### Mission` content |
|---|---|
| L1 | `L1: Mission set up: Make our classroom English` |
| L4 | `L4: Mission Stage 1: Labels` |
| L6 | `L6: Mission Stage 2: Words` |
| L8 | `L8: Mission Stage 3: Make a class poster` |
| L12 | `L12: Mission in action: Be the teacher.` |

### K3 — Mission stages

| Lesson | `#### Mission` content |
|---|---|
| L1 | `L1: Mission set up: Make a daily routine chart` |
| L4 | `L4: Mission Stage 1: Make your chart` |
| L6 | `L6: Mission Stage 2: Draw your daily routine` |
| L8 | `L8: Mission Stage 3: Complete your chart` |
| L12 | `L12: Mission in action` |

### K1 — Mini Mission (in L10 only)

| Lesson | `#### Mini Mission` content |
|---|---|
| L10 | Full poster project description |

---

## PDF Naming

### Convention

```
{prefix}_{book}_U{unit}_L{lesson}_pg{NNN}.pdf   (K1 — lesson-unique pages)
{prefix}_{book}_U{unit}_pg{NNN}.pdf              (K2/K3 — shared pages)
```

### Example

| Level | Source Field | Resulting File |
|---|---|---|
| K1 | `PB p8` | `Starters_PB_U1_L1_pg008.pdf` |
| K2 | `PB p6` | `Level1_PB_U1_pg006.pdf` |
| K3 | `PB p6` | `Level2_PB_U1_pg006.pdf` |

### Rules

- `{prefix}` = `Starters` / `Level1` / `Level2`
- `{book}` = `PB`, `AB`, `TB`
- `{unit}` = `U1`, `U2`, … (2-digit)
- `{lesson}` = `L1`, `L2`, … (K1 only)
- `{NNN}` = page number, 3-digit zero-padded
- Store at: `web/public/curriculum-resources/pdfs/`

---

## Audio File Naming

### Convention

```
PU_{book}_BE_{level}_U{unit}_Pg{NNN}_{descriptor}tr_{NNN}(X.XX).mp3
```

### Components

| Part | Value | Example |
|---|---|---|
| `PU` | Fixed | `PU` |
| `{book}` | `SB` or `AB` | `SB` |
| `BE` | Fixed | `BE` |
| `{level}` | `L0` (K1), `L1` (K2), `L2` (K3) | `L0` |
| `{unit}` | `U01`, `U02`, … | `U01` |
| `{PgNNN}` | Page number, 3-digit | `Pg008` |
| `{descriptor}` | Exercise info | `Ex01_`, `Karaoke_`, `Literature_`, `FF_` |
| `tr_{NNN}` | Publisher's internal track number | `tr_009` |
| `(X.XX)` | Display label: `CD.Track` | `(1.01)` |

### Storage

| Audio | Directory |
|---|---|
| K1/K2/K3 SB | `web/public/curriculum-resources/audio/pupil_book/u{unit}/` |
| K1 AB | `web/public/curriculum-resources/audio/activity_book/u{unit}/` |
| K2/K3 AB | `web/public/curriculum-resources/audio/activity_book_class_audio/` (via `activityBookAudioMap`) |

---

## New Unit Checklist

- [ ] Create `06_curriculum_design/{level}/language_courses/unit_XX_name/`
- [ ] Create 5 markdown files with the exact structure above
- [ ] `00_overview.md`: 5 exact `##` headers
- [ ] Week files: exact `## Source Week / Weekly Outcome / Core Language / Repeated Routine`
- [ ] Lesson roles match the level's table above
- [ ] Source field uses `｜` (U+FF5C) separator
- [ ] Lesson `####` field names are exact
- [ ] Mission stages added for L1/L4/L6/L8/L12 (K2/K3) or Mini Mission for L10 (K1)
- [ ] PDFs named correctly and copied to `web/public/curriculum-resources/pdfs/`
- [ ] Audio files named correctly and copied to correct directory
- [ ] Register in `web/src/curriculum/dynamicUnitManifest.ts`
- [ ] Run `node scripts/sync-k-language-unit.mjs` with correct params
- [ ] Run `npm run build`
- [ ] Verify all resource URLs return 200
