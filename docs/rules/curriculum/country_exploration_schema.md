# EASTIE Country Exploration · Curriculum File Schema

## 1. Purpose

This document records the current agreed structure for the EASTIE Country Exploration curriculum files.

Country Exploration is organised as a country/place library. The website should list countries/places first. Inside each country/place, the content is divided by grade: K1, K2, and K3. Each grade contains one Overview file and four Lesson files.

The structure should support flexible semester planning. Countries are not hard-coded into fixed semesters such as Fall 2026 or Spring 2027. Teachers and curriculum leads may decide which four countries/places to use in a given semester.

## 2. Course Organisation

Recommended folder structure:

```text
country_exploration/
├── usa/
│   ├── k1/
│   │   ├── 00_overview.md
│   │   ├── 01_lesson_1.md
│   │   ├── 02_lesson_2.md
│   │   ├── 03_lesson_3.md
│   │   └── 04_lesson_4.md
│   ├── k2/
│   │   ├── 00_overview.md
│   │   ├── 01_lesson_1.md
│   │   ├── 02_lesson_2.md
│   │   ├── 03_lesson_3.md
│   │   └── 04_lesson_4.md
│   └── k3/
│       ├── 00_overview.md
│       ├── 01_lesson_1.md
│       ├── 02_lesson_2.md
│       ├── 03_lesson_3.md
│       └── 04_lesson_4.md
├── kenya/
├── germany/
└── china/
```

Core website logic:

```text
Country Exploration
├── Country Library
│   ├── China
│   │   ├── K1
│   │   ├── K2
│   │   └── K3
│   ├── USA
│   │   ├── K1
│   │   ├── K2
│   │   └── K3
│   ├── Kenya
│   └── Germany
└── Planning Reference
    ├── Candidate Pool
    ├── Tags & Content Types
    ├── Suggested Groupings
    └── Recently Used Countries
```

Important principle:

> Course content is archived by country/place. Semester planning is an operational decision, not the primary website structure.

## 3. Country Pool

Current country/place candidates:

1. China
2. USA
3. UK
4. Russia
5. Germany
6. Italy
7. France
8. Netherlands
9. South Korea
10. Thailand
11. Australia
12. New Zealand
13. Canada
14. Mexico
15. Brazil
16. Madagascar
17. Egypt
18. Singapore
19. South Africa
20. Kenya
21. Morocco
22. Polar Regions

China is special because the first unit of each school year may be China, but the specific China theme does not need to be designed years in advance. The yearly China unit can be redesigned based on school needs, teacher planning, and the actual cohort.

## 4. Six-Semester Grouping Reference

These groupings are planning references only. They should not become fixed website navigation.

### Group 1
China / USA / Kenya / Germany

Course balance: China theme / modern city and pop culture / savanna animals and ecology / engineering and construction

### Group 2
UK / New Zealand / Brazil / South Korea

Course balance: landmarks and royal symbols / nature and agriculture / music, sport and festival / contemporary Asian life

### Group 3
China / Russia / Madagascar / France

Course balance: China theme / snow, craft and architecture / unique wildlife and biodiversity / art city and food

### Group 4
Singapore / Australia / Morocco / Mexico

Course balance: modern city / animals, ocean and nature / architecture, markets and patterns / colour, food and folk culture

### Group 5
China / Canada / Italy / Thailand

Course balance: China theme / forests, lakes and outdoor life / art, food and ancient buildings / tropical life and markets

### Group 6
Polar Regions / South Africa / Netherlands / Egypt

Course balance: polar science and ice animals / coast, nature and varied landscapes / water engineering and flower agriculture / ancient civilisation and the Nile

## 5. Recently Used Countries / Places

Recent semester:
- Egypt
- Netherlands
- Polar Regions: Arctic + Antarctic
- Thailand

Previous semester:
- China
- Mexico
- Italy
- Australia

Planning note: China is an exception because it may remain the first unit of each school year. Other recently used countries/places should usually be avoided in the immediate next semester unless there is a strong reason to revisit them.

## 6. Grade-Level Logic

Country Exploration uses the same country/place across K1, K2, and K3 at the same time, but each grade explores it through a different developmental lens.

### K1
K1 focuses on sensory, visual, movement-based, and concrete experiences.

Children should be able to see, touch, move, imitate, play, build, make, point, choose, and respond to concrete elements. They are not expected to memorise facts or explain abstract ideas.

Typical lens:

> What can we see, touch, move with, and make?

### K2
K2 focuses on sorting, comparing, matching, noticing relationships, and making simple connections.

Children can compare same and different, sort objects or images, match symbols and places, connect animals with habitats, connect food with daily life, and participate in structured group activities.

Typical lens:

> What is the same, what is different, and how do these things belong together?

### K3
K3 focuses on organising information, simple explanation, collaborative projects, and presentation.

Children can organise country elements into categories, create mini guides, maps, museums, posters, or displays, and explain one or two things they discovered.

Typical lens:

> How can we organise and present what we know about this country?

## 7. Overview File Schema

Each country/place and grade should have one Overview file.

File name:

```text
00_overview.md
```

The Overview file should be simple. It is not a full lesson plan. It gives teachers the basic framework before entering the four lessons.

### Overview Schema

```md
# {Country} · {Grade} Overview

## 1. Country Character

## 2. Grade-Level Lens

## 3. Classroom Setup and Key Elements

## 4. Four-Lesson Map

### Lesson 1: {Lesson Title}

### Lesson 2: {Lesson Title}

### Lesson 3: {Lesson Title}

### Lesson 4: {Lesson Title}
```

### 7.1 Country Character

Purpose:
- Introduce the character of the country/place.
- Explain what is attractive or meaningful about it for young children.
- Identify broad child-accessible directions without turning them into a long list.

This section may be broadly similar across K1, K2 and K3, but the wording can be adjusted for each grade.

Example for USA:

```md
## 1. Country Character

The USA is a modern, highly visual country theme for young children. It can be introduced through big cities, famous landmarks, food, sports, and strong pop-culture images. Children may already recognise some USA-related elements in daily life, such as hamburgers, basketball, Coca-Cola-style images, cartoon characters, or superhero visuals. For young learners, the USA works best as a theme of big city energy, iconic symbols, bright repeated images, familiar food, and modern everyday culture.
```

### 7.2 Grade-Level Lens

Purpose:
- Explain how this grade should approach the country/place.
- Make K1, K2 and K3 clearly different.
- Prevent all three grades from becoming the same lesson at different difficulty levels.

Example for USA K1:

```md
## 2. Grade-Level Lens

For K1 children, the USA should be approached through concrete, visual, sensory, and movement-based experiences. Children do not need to remember facts about the country. They should see tall buildings, point to landmarks, move like taxis or basketball players, play with food props, and create bright repeated images. The main lens is: “What can we see, touch, move with, and make?”
```

Example for USA K2:

```md
## 2. Grade-Level Lens

For K2 children, the USA can be approached through sorting and comparing. Children can compare tall and short buildings, match landmarks with cities, sort food and sports images, and notice repeated patterns in Pop Art. The main lens is: “What is the same, what is different, and how do these things belong together?”
```

Example for USA K3:

```md
## 2. Grade-Level Lens

For K3 children, the USA can be approached as a simple project-based investigation. Children can organise USA elements into categories such as city, landmark, food, sport, and art. They can create a mini guide or class museum and explain one or two things they discovered. The main lens is: “How can we organise and present what we know about this country?”
```

### 7.3 Classroom Setup and Key Elements

Purpose:
- Describe how the country/place can enter the classroom environment.
- Identify the main visual, concrete, child-perceivable elements.
- Support classroom display and theme corner planning.

This is not a detailed material list. Detailed materials belong inside individual lesson activities.

Example for USA K1:

```md
## 3. Classroom Setup and Key Elements

The classroom can include a simple USA corner with big city images, the Statue of Liberty, yellow taxis, tall buildings, red-white-blue colour elements, food props such as hamburgers or popcorn, and bright Pop Art-style repeated images. The setup should feel concrete and playful rather than informational. For K1, large images, toy vehicles, blocks, food props, and simple colour materials are more useful than maps or long text.
```

### 7.4 Four-Lesson Map

Purpose:
- Show the four-lesson structure for this grade.
- Give teachers a clear path for how the country/place will be explored.
- Keep it brief; do not include full teaching procedures here.

Example for USA K1:

```md
## 4. Four-Lesson Map

### Lesson 1: Meet the USA — Big City and Symbols

Children enter the USA theme through large city images, tall buildings, yellow taxis, and the Statue of Liberty. They notice colours, shapes, size, and movement.

### Lesson 2: Food, Sports, and Everyday Pop Culture

Children explore familiar USA-related daily-life elements such as hamburgers, popcorn, basketball, and bright product-style images through pretend play and sorting.

### Lesson 3: Pop Art Colours and Repetition

Children look at repeated images and strong colours, then create a simple Pop Art-inspired artwork using repeated shapes, food images, taxis, or city symbols.

### Lesson 4: Build and Share a Mini USA City

Children use blocks, cars, picture cards, and art pieces to create a small USA city display and share what they made.
```

## 8. Lesson File Schema

Each country/place and grade has four lesson files.

File names:

```text
01_lesson_1.md
02_lesson_2.md
03_lesson_3.md
04_lesson_4.md
```

Lesson files should be concise and execution-oriented. They should tell teachers what this lesson is about, what children should do, what language the teacher can use, and what activities can be selected or combined.

### Lesson Schema

```md
# {Country} · {Grade} · Lesson {Number}
## {Lesson Title}

## 1. Lesson Identity

- Country / Place:
- Grade:
- Lesson:

## 2. Lesson Focus

## 3. Learning Objectives

Children will:
- 
- 
- 

## 4. Teacher Language

Teacher Input:
- 

Possible Child Response:
- 

## 5. Suggested Games and Activities

### Activity 1: {Activity Name}

**Purpose:**  

**Materials:**  

**Preparation:**  

**How to Play / Do:**  

**Teacher Notes:**  

### Activity 2: {Activity Name}

**Purpose:**  

**Materials:**  

**Preparation:**  

**How to Play / Do:**  

**Teacher Notes:**  

### Activity 3: {Activity Name}

**Purpose:**  

**Materials:**  

**Preparation:**  

**How to Play / Do:**  

**Teacher Notes:**  
```

### 8.1 Lesson Identity

Keep this minimal. Do not include age range, duration, version, unit length, or administrative details.

Example:

```md
## 1. Lesson Identity

- Country / Place: USA
- Grade: K1
- Lesson: 1 of 4
```

### 8.2 Lesson Focus

Purpose:
- State the core focus of the lesson in one concise sentence.
- Explain what this lesson is mainly about.

Example:

```md
## 2. Lesson Focus

Children meet the USA through big city images, tall buildings, yellow taxis, and the Statue of Liberty.
```

### 8.3 Learning Objectives

Purpose:
- Give a light, practical learning direction.
- Avoid overly formal or administrative learning outcomes.
- Usually use 3 bullet points.

Example:

```md
## 3. Learning Objectives

Children will:
- notice several concrete USA city symbols;
- point to, match, build, or move in response to city images such as tall buildings, yellow taxis, and the Statue of Liberty;
- show curiosity about a different country through looking, choosing, building, or simple verbal sharing.
```

### 8.4 Teacher Language

Purpose:
- Provide natural English input that the teacher can use during the lesson.
- Keep it age-appropriate.
- Do not turn Country Exploration into a language lesson.
- New country-specific words may appear as exposure words, not required child output.

Teacher Language must consider the grade and the language children have already met in the main language curriculum.

General rule:

> Use familiar or highly functional English whenever possible. New country words can be used as light exposure, but should not become required language targets.

Recommended format:

```md
## 4. Teacher Language

Teacher Input:
- Look at the city.
- It is tall.
- This is a taxi.
- This is the Statue of Liberty.
- Let’s build a city.
- Put the taxi on the road.

Possible Child Response:
- taxi
- building
- tall
- I see a taxi.
- My city.
```

Grade notes:
- K1: Accept pointing, choosing, gesture, movement, single words, and short phrases.
- K2: Allow short phrases, simple comparison, matching, sorting, likes/dislikes, and simple descriptions.
- K3: Allow brief explanation, project sharing, simple category language, and presentation language.

### 8.5 Suggested Games and Activities

Purpose:
- Provide three usable activities for the lesson.
- Activities may be selected, combined, shortened, or extended by the teacher.
- Avoid a rigid full lesson script unless later testing shows that a more structured lesson flow is needed.

Each activity should include:
- Purpose
- Materials
- Preparation
- How to Play / Do
- Teacher Notes

Materials and Preparation belong inside each activity, not as one general lesson-level list, because different suggested activities may require different materials.

Example activity format:

```md
### Activity 1: USA Picture Walk

**Purpose:**  
Help children notice concrete USA city symbols.

**Materials:**  
Large printed images of tall buildings, a yellow taxi, and the Statue of Liberty.

**Preparation:**  
Place the images around the classroom at children’s eye level.

**How to Play / Do:**  
Walk with the children from image to image. Invite them to point, choose, and notice. Ask simple questions such as “What can you see?” and “Is it tall?” Children may respond by pointing, moving, or using single words.

**Teacher Notes:**  
For K1, do not require children to remember the country name or landmark name. Repeated exposure is enough.
```

## 9. Fields Removed from Overview

The following fields should not appear in the Overview file for now:

- Basic Information
- Age Range
- Unit Length
- Number of Lessons
- Unit Position
- Version
- Unit Rationale
- Core Content Points
- Learning Goals
- Expected Child Experience
- Suggested Materials and Spaces
- Teacher Language and English Exposure
- Cross-Curricular Links
- Observation Focus
- Boundary Notes

Reason: most of these are either obvious, too administrative, too heavy, or better placed in lesson files.

## 10. Fields Removed from Lesson

The following fields should not appear in the Lesson file for now:

- Detailed Basic Information
- Key Content as a separate field
- Lesson-level general Materials and Preparation
- Differentiation
- Safety and Classroom Management
- Observation and Documentation
- Output / Takeaway
- Notes for Future Revision

Reason: these fields make the lesson file too heavy. Differentiation, safety, observation, and revision can be handled by teachers or added later only if testing shows a clear need.

Key Content is not currently a required field because it often duplicates Lesson Focus, Teacher Language, and Suggested Activities. If the frontend later needs searchable keywords, a very small optional line can be added inside Lesson Identity:

```md
- Key Elements: tall buildings / yellow taxi / Statue of Liberty
```

For now, do not include it as a main section.

## 11. Current Working Principle

Overview and Lesson files have different jobs.

Overview:
- What is this country/place like?
- How should this grade look at it?
- What should the classroom theme roughly include?
- What are the four lessons?

Lesson:
- What is this lesson about?
- What should children do or experience?
- What English can the teacher naturally use?
- What three games or activities can the teacher choose from?

Compact summary:

> Overview gives the framework. Lesson gives the executable activities.
