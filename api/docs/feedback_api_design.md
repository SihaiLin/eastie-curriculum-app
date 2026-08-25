# Feedback API Design Notes

## Purpose

Teachers should be able to leave feedback on curriculum pages. Feedback should stay tied to exact curriculum context, not only free text.

## Implemented Feedback Payload

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
  "message": "Teacher feedback goes here.",
  "category": "content"
}
```

The backend infers submitting user, created timestamp, and updated timestamp from the authenticated request and server clock.

## Implemented Endpoints

```text
POST /api/feedback
GET /api/feedback?unit_id=pg-non-language-unit-08&status=open
GET /api/feedback/:id
PATCH /api/feedback/:id
```

Feedback creation requires a logged-in user. List/read/patch endpoints are admin-only in the first version.
