# Dynamic Frontend Plan

## Goal

Build the EASTIE curriculum web app as a dynamic frontend.

The app should render curriculum content from structured data and reusable components, instead of serving one static HTML file per lesson.

## Recommended Stack

Suggested stack for the first implementation:

```text
Vite
React
TypeScript
React Router
```

This is not locked yet, but it is a good default for the current scope.

## Proposed Source Structure

```text
web/
├── public/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── router.tsx
│   ├── auth/
│   │   ├── AuthProvider.tsx
│   │   └── authTypes.ts
│   ├── components/
│   │   ├── Layout/
│   │   ├── Curriculum/
│   │   ├── Feedback/
│   │   └── LanguageToggle/
│   ├── curriculum/
│   │   ├── data/
│   │   ├── types.ts
│   │   └── curriculumRegistry.ts
│   ├── feedback/
│   │   ├── feedbackClient.ts
│   │   └── feedbackTypes.ts
│   ├── styles/
│   │   └── eastie.css
│   └── main.tsx
└── docs/
```

## Route Ideas

```text
/login
/curriculum
/curriculum/:level
/curriculum/:level/:courseType/unit-:unitNumber
/curriculum/:level/:courseType/unit-:unitNumber/course-:courseCode
/curriculum/:level/:courseType/unit-:unitNumber/course-:courseCode/lesson-:lessonNumber
/admin/curriculum
```

## Data Model Direction

Start with JSON shaped like:

```json
{
  "level": "PK",
  "courseType": "non-language",
  "unitNumber": 8,
  "unitTitle": "Nature, Weather and Animals",
  "unitOverview": {},
  "courses": [
    {
      "code": "A",
      "title": "Daily Life, Self-Care & Independence",
      "lessons": []
    }
  ]
}
```

## Authentication

Do not use Basic Auth.

For the first frontend pass, create placeholders:

```text
AuthProvider
currentUser
role
logout
requireAuth wrapper
```

The real login implementation should connect to the API later.

## Feedback

Feedback UI should collect:

```text
grade / level
unit
course
lesson
page URL
feedback text
```

The backend should attach:

```text
user id
timestamp
```

## First Build Target

First dynamic target:

```text
PK Non-Language Unit 8
```

Use the existing static page only as visual reference, not as imported production HTML.

