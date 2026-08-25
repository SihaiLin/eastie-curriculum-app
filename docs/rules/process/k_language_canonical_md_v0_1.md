# K Language Canonical Markdown v0.1

Status: Draft candidate for K1-K3 Language Unit Hello and Unit 1 first-use rollout.

This structure is reverse-designed from the current dynamic K Language lesson page. It is meant to support classroom use first, then later become a cleaner source-of-truth format.

Do not use this file to rewrite all K Language units at once. Use it first for:

- K1 Unit Hello
- K1 Unit 1
- K2 Unit Hello
- K2 Unit 1
- K3 Unit Hello
- K3 Unit 1

## Source Policy

The old Power Up / language markdown remains historical source material. Do not destroy or overwrite it during this pass.

The new canonical markdown should combine:

- page-facing fields that the web page can render directly;
- Power Up source references already used by the web page;
- teacher/design guidance from older markdown that is useful but not currently rendered;
- placeholders for EASTIE-added lesson parts that do not yet exist in Power Up.

The page should not invent curriculum meaning. If content is missing, mark it as `TBD` or leave a clear placeholder for the course-design session.

## Unit File Shape

Each unit should have one unit-level markdown file, or one folder with a unit index and day files. For the first rollout, either is acceptable as long as the headings are exact and stable.

Recommended folder shape:

```text
k1_language_unit_01_friends_and_family/
  00_unit_overview.md
  week_01/
    day_01.md
    day_02.md
    day_03.md
    day_04_media_extend.md
    day_05_mini_mission.md
  week_02/
  week_03/
  week_04/
```

Unit Hello is one week only.

## Unit Overview Template

```markdown
# K1 Unit 1: Friends and Family

## Unit Metadata
- Level: K1
- Course Line: English Learning
- Unit Number: 1
- Unit Theme: Friends and Family
- Status: Draft for classroom use
- Source Basis: Power Up + EASTIE extension design

## Unit Focus
Brief description of what this unit helps children do.

## Unit Learning Outcomes
- ...

## Power Up Alignment
- Power Up level:
- Power Up unit:
- Main source pages:
- Notes:

## 4-Week Teaching Flow
### Week 1
- Day 1:
- Day 2:
- Day 3:
- Day 4:
- Day 5:

### Week 2
...

## Teacher / Design Guidance
Use this section for useful old-MD content that helps lesson design but should not appear as child-facing lesson content.

## Open Design Tasks
- Circle Time:
- Phonics:
- Story:
- Media Extend:
- Mini Mission:
```

## Day File Template

Use `Day 1, Week 1`, not `Lesson 1`, because one school day may contain several parts: Circle Time, CLIL Class, Phonics, and Story.

```markdown
# Day 1, Week 1

## Day Metadata
- Level: K1
- Unit Number: 1
- Unit Theme: Friends and Family
- Day: 1
- Week: 1
- Day Type: Power Up | Media Extend | Mini Mission | Showcase
- Power Up Lesson: PU L1
- Lesson Role: Unit opener and Vocabulary 1 presentation

## Circle Time
### Topic
TBD

### Song
TBD

### Teacher Notes
Optional teacher/design guidance. Not child-facing.

## CLIL Class
### Lesson Outcome
By the end of the lesson, ...

### Source
- Teacher's Book:
- Pupil's Book:
- Activity Book:
- Pupil's Book Audio:
- Activity Book Audio:
- Notes:

### New Keywords
- item

### Recycled Keywords
- item

### Target Sentences
- item

### Activities and Games
1. TBD
2. TBD
3. TBD

### Teacher / Design Guidance
Old-MD guidance, Power Up teaching notes, or implementation reminders that may help a course designer or teacher but should not be displayed as child-facing content by default.

## Phonics
### Content
TBD

### Teacher Notes
TBD

## Story
### Book / Story
TBD

### Teacher Notes
TBD

## Review Issues
Use only when source content still needs human decision.

### Needs Extension
- Umbrella item:
  - Suggested concrete words:
  - Decision:

### Source Issues
- Issue:
  - Source:
  - Proposed fix:
```

## Power Up Day Rules

For a Power Up-backed day:

- `Power Up Lesson` should be present, for example `PU L1`.
- `Lesson Role` should be the Power Up lesson role, for example `Unit opener and Vocabulary 1 presentation`.
- `Source` should preserve TB / PB / AB and audio references.
- `New Keywords`, `Recycled Keywords`, and `Target Sentences` should come from the current classification scaffold, not raw Power Up language buckets.
- `Circle Time`, `Phonics`, and `Story` may be `TBD` during the first rollout.

## Non-Power-Up Day Rules

For `Media Extend`, `Mini Mission`, and `Showcase` days:

- keep the same top-level structure;
- set `Day Type` to the correct value;
- leave Power Up source blank or mark as `None`;
- `Source` is teacher/EASTIE-added and should be editable later;
- New Keywords / Recycled Keywords / Target Sentences may be empty;
- Activities and Games should eventually be filled by the course-design session.

Example:

```markdown
# Day 5, Week 1

## Day Metadata
- Day Type: Mini Mission
- Power Up Lesson: None
- Lesson Role: Mini Mission 1

## Circle Time
...

## CLIL Class
### Lesson Outcome
TBD

### Source
TBD

### New Keywords
TBD

### Recycled Keywords
TBD

### Target Sentences
TBD

### Activities and Games
TBD
```

## Classification Rules

The current web scaffold uses these final display buckets:

- `newKeywords`: child-facing new words / short phrases.
- `recycledKeywords`: child-facing recycled words / short phrases.
- `targetSentences`: sentence patterns, questions, short answers, and classroom-ready chunks.
- `reviewIssues`: not rendered on the ordinary lesson page.

Do not put abstract category labels such as `colours`, `numbers`, `family`, or `school` into child-facing keyword lists unless the course designer explicitly wants the category word taught. These should remain in `Review Issues / Needs Extension` until concrete words are chosen.

## Teacher / Design Guidance Rules

This section can carry valuable old-MD content that is not currently displayed:

- teaching rationale;
- routine guidance;
- classroom management notes;
- old unit design notes;
- Power Up lesson interpretation;
- extension ideas;
- assessment cautions.

Keep it clearly separate from child-facing fields. It should help course designers and teachers, not silently become a page-rendered language target.

## Locking Criteria

This v0.1 structure can be considered ready for the first classroom rollout when:

- K1/K2/K3 Unit Hello and Unit 1 all follow the same headings;
- Power Up-backed days have clean keywords and target sentences;
- non-Power-Up days have the same page structure with placeholders;
- Review Issues are not displayed as child-facing content;
- teachers can use the page even when Circle Time / Phonics / Story are still being completed.

