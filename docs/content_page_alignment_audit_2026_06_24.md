# EASTIE Content/Page Alignment Audit

**Status:** Active PM audit  
**Date:** 2026-06-24

This audit checks whether the current active source Markdown and the current dynamic pages are aligned closely enough to be treated as reliable reference implementations.

This is not a full curriculum-quality review. It is a content-to-page congruence review.

It asks:

- does the source Markdown match the dynamic page structure now in use?
- does the dynamic route reflect current finalized source wording closely enough?
- are there known mismatches still pending?

## 1. Scope

Active dynamic curriculum routes reviewed:

- PG Non-Language Unit 8
- PK Non-Language Unit 8
- PG Language Unit 6
- PK Language Unit 6
- K1 Language Unit 1
- K2 Language Unit 1
- K3 Language Unit 1

## 2. Status Key

- **Aligned**: source Markdown and active page structure are currently aligned enough to act as a reference model.
- **Mostly aligned**: no blocking mismatch found, but one focused manual/visual audit is still recommended before treating the line as fully locked.
- **Needs follow-up**: known structural or rendering mismatch still exists.

## 3. Audit Matrix

| Level | Track | Unit | Current Status | Notes |
|---|---|---:|---|---|
| PG | Non-Language | 8 | Aligned | Source common-info headings were standardized on 2026-06-24. Dynamic renderer and sync path were updated. `8 Course Track Files` now renders correctly. |
| PK | Non-Language | 8 | Aligned | Source common-info headings were standardized on 2026-06-24. Course-track descriptions were added under section 4 so the overview page now matches PG-style density. |
| PG | Language | 6 | Aligned | Source markdown, generated snapshot, and `LanguageUnitPage` field expectations are structurally aligned. Source markdown was migrated on 2026-06-24 into the newer `06_curriculum_design/.../unit_06_toys_and_space/` pattern. |
| PK | Language | 6 | Aligned | Source markdown, generated snapshot, and `LanguageUnitPage` field expectations are structurally aligned. Source markdown was migrated on 2026-06-24 into the newer `06_curriculum_design/.../unit_06_toys_and_space/` pattern. |
| K1 | Language | 1 | Aligned | New-structure markdown, sync script expectations, generated snapshot, and `KLanguageUnitPage` field model are aligned in this pass. |
| K2 | Language | 1 | Aligned | New-structure markdown, sync script expectations, generated snapshot, and `KLanguageUnitPage` field model are aligned. Resource presentation is already part of the active page model rather than a structure blocker. |
| K3 | Language | 1 | Aligned | New-structure markdown, sync script expectations, generated snapshot, and `KLanguageUnitPage` field model are aligned in this pass. |

## 4. What Was Actually Fixed In This Audit Cycle

### PG Non-Language Unit 8

Fixed:

- common-info section 4 heading standardized to `Eight Course Track Files`
- common-info section 8 heading standardized to `Spaces and Materials`
- section 4 subheadings standardized to `Course A-G`
- dynamic renderer updated so `course track` sections are detected and rendered
- generic non-language sync script updated to stop reintroducing old overview labels

### PK Non-Language Unit 8

Fixed:

- common-info section 8 heading standardized to `Spaces and Materials`
- section 4 kept as `Eight Course Track Files`
- section 4 descriptions added so the dynamic overview page shows meaningful course summaries rather than headings only
- structured unit data regenerated after source updates

## 5. Similar-Issue Risk Review

The main similar-issue pattern discovered was:

- source Markdown updated;
- generated markdown snapshot updated;
- but renderer detection or structured unit-data regeneration was not updated at the same time.

This exact risk has now been addressed for the PG/PK non-language line.

For the active language lines, no blocking page-structure mismatch was found in this pass. K1/K2/K3 qualify as aligned reference patterns for their current template family, and PG/PK Unit 6 has now also been migrated into the newer unit-directory source pattern.

## 6. Recommended Follow-Up Order

1. Treat PG/PK Non-Language Unit 8 as aligned reference units.
2. Treat K1/K2/K3 Language Unit 1 as aligned reference units for the K-language line.
3. Treat PG/PK Language Unit 6 as aligned reference units within the PG/PK language line.

## 7. PM Use

Use this audit together with:

- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/PROJECT_STATUS.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/DYNAMIC_PAGE_INVENTORY.md`
- `/Users/Lucia/Desktop/eastie_curriculum_project/docs/RULES_INDEX.md`
