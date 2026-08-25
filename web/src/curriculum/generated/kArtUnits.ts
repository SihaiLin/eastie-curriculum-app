// Generated from locked K1/K2/K3 Art markdown.
// Do not edit curriculum wording here; regenerate from source markdown instead.

export type ArtContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: readonly string[] };

export type ArtContentSubsection = {
  key: string;
  title: string;
  blocks: readonly ArtContentBlock[];
};

export type ArtContentSection = {
  key: string;
  title: string;
  blocks: readonly ArtContentBlock[];
  subsections: readonly ArtContentSubsection[];
};

export type KArtLesson = {
  id: string;
  lessonNumber: number;
  title: string;
  sourceMarkdownPath: string;
  sourceMarkdown: string;
  sections: readonly ArtContentSection[];
};

export type KArtTranslation = {
  title: string;
  displayTitle: string;
  sourceMarkdownPath: string;
  sourceMarkdown: string;
  overview: readonly ArtContentSection[];
  lessons: readonly KArtLesson[];
};

export type KArtUnit = {
  unitId: string;
  level: string;
  courseType: "non-language";
  track: "art";
  courseCode: "C";
  unitNumber: number;
  title: string;
  displayTitle: string;
  status: string;
  sourceDirectory: string;
  sourceMarkdownPath: string;
  sourceMarkdown: string;
  overview: readonly ArtContentSection[];
  lessons: readonly KArtLesson[];
  translations?: { zh: KArtTranslation };
};

export const kArtUnits = [
  {
    "unitId": "k2-art-unit-01",
    "level": "K2",
    "courseType": "non-language",
    "track": "art",
    "courseCode": "C",
    "unitNumber": 1,
    "title": "Our New School",
    "displayTitle": "K2 Art Unit 1: Our New School",
    "status": "working-test-unit",
    "sourceDirectory": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school",
    "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/00_overview.md",
    "sourceMarkdown": "# K2 Art Unit 1: Our New School\n\n## Unit Identity\n\n### Grade\n\nK2\n\n### Unit Number\n\n1\n\n### Unit Theme\n\nOur New School\n\n### Semester\n\nFall\n\n### Unit Position\n\nFall 1\n\n### Unit Type\n\nStandard Unit\n\n### Developmental Stage\n\nDevelop and Organise: Observation and Control\n\n## Unit Artistic Focus\n\nChildren observe school spaces, furniture, signs, routes and architectural features from different viewpoints. They simplify what they see into clear outlines, shapes and visual symbols, then contribute an individual observational drawing and a graphic element to a collaborative school guide.\n\n## Grade-Level Rationale\n\nK2 begins with a re-entry and observational baseline. Children are ready to move beyond naming familiar objects and begin comparing proportion, viewpoint, foreground and background. The school environment offers a meaningful shared subject through which teachers can observe drawing control, visual organisation, symbol use and early revision.\n\n## Theme Connection\n\nThe Our New School theme provides classrooms, corridors, shared spaces, signs and routes as subject matter. Power Up Level 1 language may be recycled naturally through classroom, chair, desk, door, window, playground and in/on/next to/under; Art does not require labels, question-answer drills or English map reading. The Art learning remains observation, simplification, visual communication and collaborative graphic organisation.\n\n## Primary Art Domain\n\nObservation and Representation\n\n## Supporting Art Domains\n\n- Drawing and Mark Making\n- Composition and Visual Organisation\n- Materials, Process and Reflection\n\n## Core Visual Elements\n\n- outline\n- geometric and organic shape\n- relative size\n- foreground and background\n- viewpoint\n- route\n- visual symbol\n- repeated graphic style\n\n## Core Medium\n\nObservational drawing, marker line and collaborative graphic collage\n\n## Core Techniques\n\n- drawing from direct observation\n- identifying large shapes before details\n- comparing relative size and position\n- simplifying rooms and objects into visual symbols\n- using a limited, consistent line and colour system\n- arranging individual contributions within a collaborative guide\n- revising for clarity after viewer feedback\n\n## Previously Learned Techniques\n\n- combining lines and shapes\n- arranging objects within a defined space\n- using front, side, inside and outside\n- creating simple visual symbols\n- working with drawing and collage materials\n- making one purposeful revision\n\n## New Technical Demand\n\n- representing a school object or space from direct observation with greater control\n- contributing to a shared visual system that other people can understand\n\n## Main Studio Project\n\n### Project Title\n\nOur School Visual Guide\n\n### Project Summary\n\nChildren make individual observational studies of school spaces, objects or signs. Each child then develops one clear guide contribution, such as an illustrated space card, landmark symbol, route marker or simplified environment drawing. The class organises selected pieces into a collaborative visual guide, map or illustrated school environment.\n\n### Creative Brief\n\nHelp another person understand our school through pictures, symbols and clear visual organisation.\n\n### Required Artistic Decisions\n\n- which school space, object or landmark to represent\n- which shapes and details are essential\n- which symbol, line or colour choices make the image clear\n\n### Open Choices\n\n- direct-view drawing or observed-space illustration\n- viewpoint\n- landmark\n- symbol design\n- route marker\n- limited colour palette\n- individual or paired contribution\n- guide format\n\n## Art Encounters\n\n### Featured Artists / Artworks\n\n- selected Paul Klee city compositions\n- selected Saul Steinberg line drawings\n- architectural sketches\n- school wayfinding systems\n- contemporary school architecture\n- selected Chinese architectural drawings and plans\n\n### Movement / Tradition / Visual Context\n\n- architecture\n- illustration\n- graphic communication\n- mapping\n- wayfinding design\n\n### Looking Focus\n\n- artists and designers simplify places\n- outlines and symbols can communicate location\n- plans and maps organise space\n- repeated colours, shapes and icons create a visual system\n- viewpoint changes what can be seen\n\n### Comparative References\n\n- one architectural sketch\n- one illustrated map\n- one school signage system\n- one Chinese architectural plan or drawing\n- one child-friendly wayfinding example\n\n### Studio Connection\n\nChildren observe how artists and designers make complex spaces understandable, then create their own school guide elements rather than copying one map or teacher-drawn plan.\n\n### What Is Not Required\n\n- memorising artist names\n- technical architectural drawing\n- exact scale\n- extensive written labels\n- copying a teacher master plan\n- reproducing Klee or Steinberg styles\n\n### Cultural Sensitivity Notes\n\nArchitectural references should represent varied schools and built environments without ranking them by size, cost or modernity. Chinese architectural plans should be presented as specific visual traditions rather than decorative motifs.\n\n## Teacher Art Concepts\n\n### Core Concepts\n\n- observe\n- outline\n- shape\n- proportion\n- viewpoint\n- foreground\n- background\n- symbol\n- guide\n\n### Teacher Routine Language\n\n- Look before you draw.\n- Which shape is largest?\n- What is in front?\n- What is behind?\n- Which detail helps us recognise the place?\n- Can another person understand this symbol?\n- What should stay consistent?\n\n### Light Theme Language\n\n- classroom\n- chair\n- desk\n- door\n- window\n- playground\n- in\n- on\n- next to\n- under\n\n## Unit Learning Outcomes\n\n### Explore and Understand\n\nBy the end of the unit, children should increasingly be able to:\n\n- observe large shapes, smaller details and relative positions in a school environment\n- recognise foreground and background in a direct view\n- identify how symbols and repeated graphic choices support wayfinding\n\n### Make and Apply\n\nBy the end of the unit, children should increasingly be able to:\n\n- create an observational drawing with clear outline and selected detail\n- simplify a place, object or landmark into a visual symbol\n- use relative size and placement with greater intention\n- contribute to a consistent collaborative guide\n- revise one area for clearer communication\n\n### Express and Reflect\n\nBy the end of the unit, children should increasingly be able to:\n\n- identify the school space or object represented\n- explain one visual-symbol choice\n- use viewer feedback to improve clarity\n- recognise that different viewpoints produce different drawings\n\n## Four-Lesson Studio Sequence\n\n### Lesson 1 — Explore and Notice\n\nChildren compare architectural sketches, maps and wayfinding graphics, then make direct observational studies of school objects and spaces.\n\n### Lesson 2 — Skill Studio\n\nChildren practise proportion, foreground and background, and develop simple school symbols using a limited graphic system.\n\n### Lesson 3 — Create\n\nChildren create an individual visual-guide contribution based on direct observation and begin collaborative arrangement.\n\n### Lesson 4 — Develop and Share\n\nChildren test the guide with viewers, revise one element for clarity and complete the collaborative presentation.\n\n## Materials and Preparation\n\n### Core Materials\n\n- sketch paper and clipboards\n- pencils\n- erasers used selectively\n- black fine and medium markers\n- coloured markers or pencils\n- coloured paper\n- glue sticks\n- child-safe scissors\n- large collaborative backing paper\n- photographs of school spaces\n- name labels\n\n### Optional Materials\n\n- transparent tracing sheets\n- simple viewfinders\n- removable adhesive\n- printed floor-plan fragments for teacher reference only\n- reusable icon cards\n- cameras or tablets\n\n### Teacher Preparation\n\n- identify safe observation locations\n- choose two or three visually distinctive school spaces\n- prepare a school walk route\n- photograph spaces for children who need a fixed reference\n- select age-appropriate architectural and wayfinding references\n- prepare a limited colour and icon system for discussion, not copying\n- prepare large backing paper and temporary arrangement space\n\n### Space Requirements\n\n- school corridors and shared spaces for supervised observation\n- classroom or Art room tables\n- floor or wall area for collaborative arrangement\n- display area accessible to viewers\n\n### Drying and Storage\n\nStore observational studies and symbol trials flat. Keep guide contributions in labelled folders. Use removable attachment during collaborative planning before final gluing.\n\n### Safety Notes\n\n- maintain supervision during school walks\n- do not block corridors or doorways\n- use clipboards safely\n- protect student and staff privacy in photographs\n- avoid drawing or photographing restricted areas\n\n## Differentiation\n\n### Support\n\n- provide a fixed photograph or one close observation object\n- use a viewfinder to isolate a section\n- focus on two large shapes and three essential details\n- offer a small set of symbol shapes\n- allow paired observation\n- provide larger markers and paper\n\n### Extension\n\n- draw the same place from a second viewpoint\n- compare foreground and background more deliberately\n- design a symbol that belongs to a consistent set\n- add a route sequence using repeated markers\n- explain which details were removed during simplification\n\n### Motor and Access Adaptations\n\n- provide adaptive grips\n- stabilise clipboards and paper\n- allow seated observation\n- use enlarged photographs\n- provide pre-cut collage shapes where cutting is a barrier\n- allow adult support for mounting without altering visual decisions\n\n## Assessment and Observation\n\n### Primary Observation Focus\n\n- quality of direct observation and selective detail\n- clarity of visual communication through symbol and organisation\n\n### Secondary Observation Focus\n\n- relative size and placement\n- willingness to revise after viewer response\n- contribution to a shared visual system\n\n### Evidence to Collect\n\n- Lesson 1 observational study\n- Lesson 2 symbol or proportion trial\n- final guide contribution\n- child explanation\n- collaborative guide photograph\n\n### Child Voice Prompt\n\n- Which school place or object did you show?\n- Which detail helps people recognise it?\n- What did you change so the guide was clearer?\n\n## Portfolio Outcome\n\n### Required Portfolio Evidence\n\n- one observational school drawing\n- one symbol or graphic-system study\n- final visual-guide contribution\n- one recorded child explanation\n\n### Optional Portfolio Evidence\n\n- second-viewpoint drawing\n- before-and-after revision\n- collaborative guide photograph\n- teacher baseline note\n\n### Progress Comparison\n\nThis unit establishes the K2 baseline for observation, organisation and revision. Later K2 units should show stronger proportion, more deliberate composition and increasingly independent planning.\n\n## Display and Sharing\n\n### Display Opportunity\n\nInstall **Our School Visual Guide** near the classroom, entrance or another appropriate school space.\n\n### Sharing Format\n\n- peer wayfinding test\n- small-group guide tour\n- gallery walk\n- visitor interpretation\n\n## Progression Link\n\n### Builds From\n\nK1 Unit 2 classroom map-mural and K1 Unit 4 early spatial arrangement, while increasing observational accuracy, graphic consistency and viewer-focused communication.\n\n### Prepares For\n\nK2 Unit 2 controlled portrait observation, K2 Unit 5 planned construction and later narrative and environmental compositions.\n\n## Boundary Notes\n\n- this is not a handwriting task\n- extensive English labels are not required\n- spatial accuracy is secondary to clear visual communication\n- do not give children a teacher-drawn master map to copy\n- do not standardise all drawings into one adult style\n- do not assess knowledge of school vocabulary as the Art outcome\n- avoid excessive decorative additions that reduce guide clarity\n- maintain privacy and access boundaries during observation\n\n## Unit 5 Bridge Note\n\nNot applicable.\n",
    "overview": [
      {
        "key": "Unit Identity",
        "title": "Unit Identity",
        "blocks": [],
        "subsections": [
          {
            "key": "Grade",
            "title": "Grade",
            "blocks": [
              {
                "type": "paragraph",
                "text": "K2"
              }
            ]
          },
          {
            "key": "Unit Number",
            "title": "Unit Number",
            "blocks": [
              {
                "type": "paragraph",
                "text": "1"
              }
            ]
          },
          {
            "key": "Unit Theme",
            "title": "Unit Theme",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Our New School"
              }
            ]
          },
          {
            "key": "Semester",
            "title": "Semester",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Fall"
              }
            ]
          },
          {
            "key": "Unit Position",
            "title": "Unit Position",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Fall 1"
              }
            ]
          },
          {
            "key": "Unit Type",
            "title": "Unit Type",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Standard Unit"
              }
            ]
          },
          {
            "key": "Developmental Stage",
            "title": "Developmental Stage",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Develop and Organise: Observation and Control"
              }
            ]
          }
        ]
      },
      {
        "key": "Unit Artistic Focus",
        "title": "Unit Artistic Focus",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Children observe school spaces, furniture, signs, routes and architectural features from different viewpoints. They simplify what they see into clear outlines, shapes and visual symbols, then contribute an individual observational drawing and a graphic element to a collaborative school guide."
          }
        ],
        "subsections": []
      },
      {
        "key": "Grade-Level Rationale",
        "title": "Grade-Level Rationale",
        "blocks": [
          {
            "type": "paragraph",
            "text": "K2 begins with a re-entry and observational baseline. Children are ready to move beyond naming familiar objects and begin comparing proportion, viewpoint, foreground and background. The school environment offers a meaningful shared subject through which teachers can observe drawing control, visual organisation, symbol use and early revision."
          }
        ],
        "subsections": []
      },
      {
        "key": "Theme Connection",
        "title": "Theme Connection",
        "blocks": [
          {
            "type": "paragraph",
            "text": "The Our New School theme provides classrooms, corridors, shared spaces, signs and routes as subject matter. Power Up Level 1 language may be recycled naturally through classroom, chair, desk, door, window, playground and in/on/next to/under; Art does not require labels, question-answer drills or English map reading. The Art learning remains observation, simplification, visual communication and collaborative graphic organisation."
          }
        ],
        "subsections": []
      },
      {
        "key": "Primary Art Domain",
        "title": "Primary Art Domain",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Observation and Representation"
          }
        ],
        "subsections": []
      },
      {
        "key": "Supporting Art Domains",
        "title": "Supporting Art Domains",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Drawing and Mark Making",
              "Composition and Visual Organisation",
              "Materials, Process and Reflection"
            ]
          }
        ],
        "subsections": []
      },
      {
        "key": "Core Visual Elements",
        "title": "Core Visual Elements",
        "blocks": [
          {
            "type": "list",
            "items": [
              "outline",
              "geometric and organic shape",
              "relative size",
              "foreground and background",
              "viewpoint",
              "route",
              "visual symbol",
              "repeated graphic style"
            ]
          }
        ],
        "subsections": []
      },
      {
        "key": "Core Medium",
        "title": "Core Medium",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Observational drawing, marker line and collaborative graphic collage"
          }
        ],
        "subsections": []
      },
      {
        "key": "Core Techniques",
        "title": "Core Techniques",
        "blocks": [
          {
            "type": "list",
            "items": [
              "drawing from direct observation",
              "identifying large shapes before details",
              "comparing relative size and position",
              "simplifying rooms and objects into visual symbols",
              "using a limited, consistent line and colour system",
              "arranging individual contributions within a collaborative guide",
              "revising for clarity after viewer feedback"
            ]
          }
        ],
        "subsections": []
      },
      {
        "key": "Previously Learned Techniques",
        "title": "Previously Learned Techniques",
        "blocks": [
          {
            "type": "list",
            "items": [
              "combining lines and shapes",
              "arranging objects within a defined space",
              "using front, side, inside and outside",
              "creating simple visual symbols",
              "working with drawing and collage materials",
              "making one purposeful revision"
            ]
          }
        ],
        "subsections": []
      },
      {
        "key": "New Technical Demand",
        "title": "New Technical Demand",
        "blocks": [
          {
            "type": "list",
            "items": [
              "representing a school object or space from direct observation with greater control",
              "contributing to a shared visual system that other people can understand"
            ]
          }
        ],
        "subsections": []
      },
      {
        "key": "Main Studio Project",
        "title": "Main Studio Project",
        "blocks": [],
        "subsections": [
          {
            "key": "Project Title",
            "title": "Project Title",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Our School Visual Guide"
              }
            ]
          },
          {
            "key": "Project Summary",
            "title": "Project Summary",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children make individual observational studies of school spaces, objects or signs. Each child then develops one clear guide contribution, such as an illustrated space card, landmark symbol, route marker or simplified environment drawing. The class organises selected pieces into a collaborative visual guide, map or illustrated school environment."
              }
            ]
          },
          {
            "key": "Creative Brief",
            "title": "Creative Brief",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Help another person understand our school through pictures, symbols and clear visual organisation."
              }
            ]
          },
          {
            "key": "Required Artistic Decisions",
            "title": "Required Artistic Decisions",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "which school space, object or landmark to represent",
                  "which shapes and details are essential",
                  "which symbol, line or colour choices make the image clear"
                ]
              }
            ]
          },
          {
            "key": "Open Choices",
            "title": "Open Choices",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "direct-view drawing or observed-space illustration",
                  "viewpoint",
                  "landmark",
                  "symbol design",
                  "route marker",
                  "limited colour palette",
                  "individual or paired contribution",
                  "guide format"
                ]
              }
            ]
          }
        ]
      },
      {
        "key": "Art Encounters",
        "title": "Art Encounters",
        "blocks": [],
        "subsections": [
          {
            "key": "Featured Artists / Artworks",
            "title": "Featured Artists / Artworks",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "selected Paul Klee city compositions",
                  "selected Saul Steinberg line drawings",
                  "architectural sketches",
                  "school wayfinding systems",
                  "contemporary school architecture",
                  "selected Chinese architectural drawings and plans"
                ]
              }
            ]
          },
          {
            "key": "Movement / Tradition / Visual Context",
            "title": "Movement / Tradition / Visual Context",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "architecture",
                  "illustration",
                  "graphic communication",
                  "mapping",
                  "wayfinding design"
                ]
              }
            ]
          },
          {
            "key": "Looking Focus",
            "title": "Looking Focus",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "artists and designers simplify places",
                  "outlines and symbols can communicate location",
                  "plans and maps organise space",
                  "repeated colours, shapes and icons create a visual system",
                  "viewpoint changes what can be seen"
                ]
              }
            ]
          },
          {
            "key": "Comparative References",
            "title": "Comparative References",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "one architectural sketch",
                  "one illustrated map",
                  "one school signage system",
                  "one Chinese architectural plan or drawing",
                  "one child-friendly wayfinding example"
                ]
              }
            ]
          },
          {
            "key": "Studio Connection",
            "title": "Studio Connection",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children observe how artists and designers make complex spaces understandable, then create their own school guide elements rather than copying one map or teacher-drawn plan."
              }
            ]
          },
          {
            "key": "What Is Not Required",
            "title": "What Is Not Required",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "memorising artist names",
                  "technical architectural drawing",
                  "exact scale",
                  "extensive written labels",
                  "copying a teacher master plan",
                  "reproducing Klee or Steinberg styles"
                ]
              }
            ]
          },
          {
            "key": "Cultural Sensitivity Notes",
            "title": "Cultural Sensitivity Notes",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Architectural references should represent varied schools and built environments without ranking them by size, cost or modernity. Chinese architectural plans should be presented as specific visual traditions rather than decorative motifs."
              }
            ]
          }
        ]
      },
      {
        "key": "Teacher Art Concepts",
        "title": "Teacher Art Concepts",
        "blocks": [],
        "subsections": [
          {
            "key": "Core Concepts",
            "title": "Core Concepts",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "observe",
                  "outline",
                  "shape",
                  "proportion",
                  "viewpoint",
                  "foreground",
                  "background",
                  "symbol",
                  "guide"
                ]
              }
            ]
          },
          {
            "key": "Teacher Routine Language",
            "title": "Teacher Routine Language",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "Look before you draw.",
                  "Which shape is largest?",
                  "What is in front?",
                  "What is behind?",
                  "Which detail helps us recognise the place?",
                  "Can another person understand this symbol?",
                  "What should stay consistent?"
                ]
              }
            ]
          },
          {
            "key": "Light Theme Language",
            "title": "Light Theme Language",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "classroom",
                  "chair",
                  "desk",
                  "door",
                  "window",
                  "playground",
                  "in",
                  "on",
                  "next to",
                  "under"
                ]
              }
            ]
          }
        ]
      },
      {
        "key": "Unit Learning Outcomes",
        "title": "Unit Learning Outcomes",
        "blocks": [],
        "subsections": [
          {
            "key": "Explore and Understand",
            "title": "Explore and Understand",
            "blocks": [
              {
                "type": "paragraph",
                "text": "By the end of the unit, children should increasingly be able to:"
              },
              {
                "type": "list",
                "items": [
                  "observe large shapes, smaller details and relative positions in a school environment",
                  "recognise foreground and background in a direct view",
                  "identify how symbols and repeated graphic choices support wayfinding"
                ]
              }
            ]
          },
          {
            "key": "Make and Apply",
            "title": "Make and Apply",
            "blocks": [
              {
                "type": "paragraph",
                "text": "By the end of the unit, children should increasingly be able to:"
              },
              {
                "type": "list",
                "items": [
                  "create an observational drawing with clear outline and selected detail",
                  "simplify a place, object or landmark into a visual symbol",
                  "use relative size and placement with greater intention",
                  "contribute to a consistent collaborative guide",
                  "revise one area for clearer communication"
                ]
              }
            ]
          },
          {
            "key": "Express and Reflect",
            "title": "Express and Reflect",
            "blocks": [
              {
                "type": "paragraph",
                "text": "By the end of the unit, children should increasingly be able to:"
              },
              {
                "type": "list",
                "items": [
                  "identify the school space or object represented",
                  "explain one visual-symbol choice",
                  "use viewer feedback to improve clarity",
                  "recognise that different viewpoints produce different drawings"
                ]
              }
            ]
          }
        ]
      },
      {
        "key": "Four-Lesson Studio Sequence",
        "title": "Four-Lesson Studio Sequence",
        "blocks": [],
        "subsections": [
          {
            "key": "Lesson 1 — Explore and Notice",
            "title": "Lesson 1 — Explore and Notice",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children compare architectural sketches, maps and wayfinding graphics, then make direct observational studies of school objects and spaces."
              }
            ]
          },
          {
            "key": "Lesson 2 — Skill Studio",
            "title": "Lesson 2 — Skill Studio",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children practise proportion, foreground and background, and develop simple school symbols using a limited graphic system."
              }
            ]
          },
          {
            "key": "Lesson 3 — Create",
            "title": "Lesson 3 — Create",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children create an individual visual-guide contribution based on direct observation and begin collaborative arrangement."
              }
            ]
          },
          {
            "key": "Lesson 4 — Develop and Share",
            "title": "Lesson 4 — Develop and Share",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children test the guide with viewers, revise one element for clarity and complete the collaborative presentation."
              }
            ]
          }
        ]
      },
      {
        "key": "Materials and Preparation",
        "title": "Materials and Preparation",
        "blocks": [],
        "subsections": [
          {
            "key": "Core Materials",
            "title": "Core Materials",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "sketch paper and clipboards",
                  "pencils",
                  "erasers used selectively",
                  "black fine and medium markers",
                  "coloured markers or pencils",
                  "coloured paper",
                  "glue sticks",
                  "child-safe scissors",
                  "large collaborative backing paper",
                  "photographs of school spaces",
                  "name labels"
                ]
              }
            ]
          },
          {
            "key": "Optional Materials",
            "title": "Optional Materials",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "transparent tracing sheets",
                  "simple viewfinders",
                  "removable adhesive",
                  "printed floor-plan fragments for teacher reference only",
                  "reusable icon cards",
                  "cameras or tablets"
                ]
              }
            ]
          },
          {
            "key": "Teacher Preparation",
            "title": "Teacher Preparation",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "identify safe observation locations",
                  "choose two or three visually distinctive school spaces",
                  "prepare a school walk route",
                  "photograph spaces for children who need a fixed reference",
                  "select age-appropriate architectural and wayfinding references",
                  "prepare a limited colour and icon system for discussion, not copying",
                  "prepare large backing paper and temporary arrangement space"
                ]
              }
            ]
          },
          {
            "key": "Space Requirements",
            "title": "Space Requirements",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "school corridors and shared spaces for supervised observation",
                  "classroom or Art room tables",
                  "floor or wall area for collaborative arrangement",
                  "display area accessible to viewers"
                ]
              }
            ]
          },
          {
            "key": "Drying and Storage",
            "title": "Drying and Storage",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Store observational studies and symbol trials flat. Keep guide contributions in labelled folders. Use removable attachment during collaborative planning before final gluing."
              }
            ]
          },
          {
            "key": "Safety Notes",
            "title": "Safety Notes",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "maintain supervision during school walks",
                  "do not block corridors or doorways",
                  "use clipboards safely",
                  "protect student and staff privacy in photographs",
                  "avoid drawing or photographing restricted areas"
                ]
              }
            ]
          }
        ]
      },
      {
        "key": "Differentiation",
        "title": "Differentiation",
        "blocks": [],
        "subsections": [
          {
            "key": "Support",
            "title": "Support",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "provide a fixed photograph or one close observation object",
                  "use a viewfinder to isolate a section",
                  "focus on two large shapes and three essential details",
                  "offer a small set of symbol shapes",
                  "allow paired observation",
                  "provide larger markers and paper"
                ]
              }
            ]
          },
          {
            "key": "Extension",
            "title": "Extension",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "draw the same place from a second viewpoint",
                  "compare foreground and background more deliberately",
                  "design a symbol that belongs to a consistent set",
                  "add a route sequence using repeated markers",
                  "explain which details were removed during simplification"
                ]
              }
            ]
          },
          {
            "key": "Motor and Access Adaptations",
            "title": "Motor and Access Adaptations",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "provide adaptive grips",
                  "stabilise clipboards and paper",
                  "allow seated observation",
                  "use enlarged photographs",
                  "provide pre-cut collage shapes where cutting is a barrier",
                  "allow adult support for mounting without altering visual decisions"
                ]
              }
            ]
          }
        ]
      },
      {
        "key": "Assessment and Observation",
        "title": "Assessment and Observation",
        "blocks": [],
        "subsections": [
          {
            "key": "Primary Observation Focus",
            "title": "Primary Observation Focus",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "quality of direct observation and selective detail",
                  "clarity of visual communication through symbol and organisation"
                ]
              }
            ]
          },
          {
            "key": "Secondary Observation Focus",
            "title": "Secondary Observation Focus",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "relative size and placement",
                  "willingness to revise after viewer response",
                  "contribution to a shared visual system"
                ]
              }
            ]
          },
          {
            "key": "Evidence to Collect",
            "title": "Evidence to Collect",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "Lesson 1 observational study",
                  "Lesson 2 symbol or proportion trial",
                  "final guide contribution",
                  "child explanation",
                  "collaborative guide photograph"
                ]
              }
            ]
          },
          {
            "key": "Child Voice Prompt",
            "title": "Child Voice Prompt",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "Which school place or object did you show?",
                  "Which detail helps people recognise it?",
                  "What did you change so the guide was clearer?"
                ]
              }
            ]
          }
        ]
      },
      {
        "key": "Portfolio Outcome",
        "title": "Portfolio Outcome",
        "blocks": [],
        "subsections": [
          {
            "key": "Required Portfolio Evidence",
            "title": "Required Portfolio Evidence",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "one observational school drawing",
                  "one symbol or graphic-system study",
                  "final visual-guide contribution",
                  "one recorded child explanation"
                ]
              }
            ]
          },
          {
            "key": "Optional Portfolio Evidence",
            "title": "Optional Portfolio Evidence",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "second-viewpoint drawing",
                  "before-and-after revision",
                  "collaborative guide photograph",
                  "teacher baseline note"
                ]
              }
            ]
          },
          {
            "key": "Progress Comparison",
            "title": "Progress Comparison",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This unit establishes the K2 baseline for observation, organisation and revision. Later K2 units should show stronger proportion, more deliberate composition and increasingly independent planning."
              }
            ]
          }
        ]
      },
      {
        "key": "Display and Sharing",
        "title": "Display and Sharing",
        "blocks": [],
        "subsections": [
          {
            "key": "Display Opportunity",
            "title": "Display Opportunity",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Install **Our School Visual Guide** near the classroom, entrance or another appropriate school space."
              }
            ]
          },
          {
            "key": "Sharing Format",
            "title": "Sharing Format",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "peer wayfinding test",
                  "small-group guide tour",
                  "gallery walk",
                  "visitor interpretation"
                ]
              }
            ]
          }
        ]
      },
      {
        "key": "Progression Link",
        "title": "Progression Link",
        "blocks": [],
        "subsections": [
          {
            "key": "Builds From",
            "title": "Builds From",
            "blocks": [
              {
                "type": "paragraph",
                "text": "K1 Unit 2 classroom map-mural and K1 Unit 4 early spatial arrangement, while increasing observational accuracy, graphic consistency and viewer-focused communication."
              }
            ]
          },
          {
            "key": "Prepares For",
            "title": "Prepares For",
            "blocks": [
              {
                "type": "paragraph",
                "text": "K2 Unit 2 controlled portrait observation, K2 Unit 5 planned construction and later narrative and environmental compositions."
              }
            ]
          }
        ]
      },
      {
        "key": "Boundary Notes",
        "title": "Boundary Notes",
        "blocks": [
          {
            "type": "list",
            "items": [
              "this is not a handwriting task",
              "extensive English labels are not required",
              "spatial accuracy is secondary to clear visual communication",
              "do not give children a teacher-drawn master map to copy",
              "do not standardise all drawings into one adult style",
              "do not assess knowledge of school vocabulary as the Art outcome",
              "avoid excessive decorative additions that reduce guide clarity",
              "maintain privacy and access boundaries during observation"
            ]
          }
        ],
        "subsections": []
      },
      {
        "key": "Unit 5 Bridge Note",
        "title": "Unit 5 Bridge Note",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Not applicable."
          }
        ],
        "subsections": []
      }
    ],
    "lessons": [
      {
        "id": "lesson-01",
        "lessonNumber": 1,
        "title": "Observe the School Carefully",
        "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/01_lesson_1.md",
        "sourceMarkdown": "# Lesson 1: Observe the School Carefully\n\n## Lesson Identity\n\n### Lesson Number\n\n1\n\n### Studio Phase\n\nExplore and Notice\n\n### Primary Art Domain\n\nObservation and Representation\n\n### Supporting Art Domains\n\n- Drawing and Mark Making\n- Art Encounters and Cultural Awareness\n\n## Lesson Artistic Focus\n\nChildren compare architectural sketches, maps and school signage, then make direct observational studies of a school space, landmark or object.\n\n## Connection to Unit Project\n\nThis lesson provides the primary observation evidence and possible subject matter for the visual guide.\n\n## Learning Outcomes\n\n### Explore and Understand\n\nChildren should increasingly be able to:\n\n- identify large shapes before smaller details\n- notice foreground and background\n- compare two viewpoints of the same place or object\n\n### Make and Apply\n\nChildren should increasingly be able to:\n\n- make a direct observational drawing with selected details\n- use outline and simple interior lines with growing control\n\n### Express and Reflect\n\nChildren should increasingly be able to:\n\n- explain which detail makes the subject recognisable\n\n## Art Encounter\n\n### Featured Reference\n\n- architectural sketch\n- selected Saul Steinberg line drawing\n- selected Paul Klee city composition\n- simple school wayfinding example\n\n### Looking Focus\n\n- simplified outline\n- large and small shapes\n- viewpoint\n- signs and symbols\n- detail selection\n\n### Looking Questions\n\n- Which shapes are largest?\n- What is in front?\n- What is behind?\n- Which details were simplified?\n- How does the symbol help another person?\n\n### Movement or Sensory Response\n\nChildren use viewfinder frames or hand frames to isolate a section of the room, then change position and notice what appears or disappears.\n\n### Studio Connection\n\nChildren draw one school object, corner or space from direct observation.\n\n## Teacher Art Concepts\n\n### Core Concepts\n\n- observe\n- outline\n- viewpoint\n- foreground\n- background\n- detail\n\n### Teacher Routine Language\n\n- Look for longer than you draw.\n- Start with the largest shape.\n- What is in front?\n- Which line shows the edge?\n- Which detail do you really need?\n\n### Light Theme Language\n\n- school\n- classroom\n- playground\n- library\n- hall\n\n## Materials\n\n### Core Materials\n\n- sketch paper\n- clipboards\n- pencils\n- black markers used after initial observation\n- viewfinder frames\n- selected references\n\n### Optional Materials\n\n- cameras or tablets\n- enlarged school photographs\n- transparent tracing sheets for viewpoint comparison\n\n### Preparation\n\n- choose safe observation stations\n- prepare route and supervision\n- place children where they can see without blocking movement\n- prepare a fixed-reference alternative\n\n## Studio Sequence\n\n### 1. Arrival and Visual Invitation\n\nCompare an architectural sketch, illustrated map and sign. Identify which information each one communicates.\n\n### 2. Art Encounter\n\nDiscuss simplification, viewpoint and essential details.\n\n### 3. Teacher Demonstration\n\nObserve one school object. Block in the largest shape, add relative smaller shapes and select only two or three identifying details.\n\n### 4. Material Exploration\n\nChildren make direct observational studies at selected school locations.\n\n### 5. Pause and Notice\n\nChildren compare the drawing with the subject and identify one missing or unnecessary detail.\n\n### 6. Continue and Select\n\nChildren revise the study or make a second quick view.\n\n### 7. Reflection and Clean-Up\n\nChildren title the subject orally and select one study for development.\n\n## Teacher Prompts\n\n- Which shape should you draw first?\n- Is this part larger or smaller?\n- What overlaps?\n- What can you see from this viewpoint?\n- Which detail helps us know the place?\n\n## Differentiation\n\n### Support\n\n- use one object or cropped photograph\n- focus on two major shapes\n- provide a viewfinder\n- offer thicker drawing tools\n\n### Extension\n\n- make a second-viewpoint study\n- include foreground overlap\n- compare what changed after moving position\n\n### Motor and Access Adaptations\n\n- provide seated observation\n- stabilise clipboards\n- use adaptive grips\n- allow enlarged photographs\n\n## Assessment and Observation\n\n### Primary Observation Focus\n\n- direct-looking behaviour\n- use of large shape, relative position and selected detail\n\n### Evidence to Collect\n\n- observational study\n- optional second-view photograph\n- teacher note\n\n### Child Voice Prompt\n\n- Which detail helps us recognise this place?\n\n## Clean-Up and Storage\n\nStore selected studies flat. Return clipboards and observation tools. Confirm all children have left the observation space safely.\n\n## Safety Notes\n\n- keep routes and doorways clear\n- supervise movement\n- do not observe restricted or private spaces\n\n## Teacher Reflection\n\n### What to Review Before Lesson 2\n\n- which children use observation rather than memory\n- which children need proportion or symbol support\n",
        "sections": [
          {
            "key": "Lesson Identity",
            "title": "Lesson Identity",
            "blocks": [],
            "subsections": [
              {
                "key": "Lesson Number",
                "title": "Lesson Number",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "1"
                  }
                ]
              },
              {
                "key": "Studio Phase",
                "title": "Studio Phase",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Explore and Notice"
                  }
                ]
              },
              {
                "key": "Primary Art Domain",
                "title": "Primary Art Domain",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Observation and Representation"
                  }
                ]
              },
              {
                "key": "Supporting Art Domains",
                "title": "Supporting Art Domains",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Drawing and Mark Making",
                      "Art Encounters and Cultural Awareness"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Lesson Artistic Focus",
            "title": "Lesson Artistic Focus",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children compare architectural sketches, maps and school signage, then make direct observational studies of a school space, landmark or object."
              }
            ],
            "subsections": []
          },
          {
            "key": "Connection to Unit Project",
            "title": "Connection to Unit Project",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This lesson provides the primary observation evidence and possible subject matter for the visual guide."
              }
            ],
            "subsections": []
          },
          {
            "key": "Learning Outcomes",
            "title": "Learning Outcomes",
            "blocks": [],
            "subsections": [
              {
                "key": "Explore and Understand",
                "title": "Explore and Understand",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "identify large shapes before smaller details",
                      "notice foreground and background",
                      "compare two viewpoints of the same place or object"
                    ]
                  }
                ]
              },
              {
                "key": "Make and Apply",
                "title": "Make and Apply",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "make a direct observational drawing with selected details",
                      "use outline and simple interior lines with growing control"
                    ]
                  }
                ]
              },
              {
                "key": "Express and Reflect",
                "title": "Express and Reflect",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "explain which detail makes the subject recognisable"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Art Encounter",
            "title": "Art Encounter",
            "blocks": [],
            "subsections": [
              {
                "key": "Featured Reference",
                "title": "Featured Reference",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "architectural sketch",
                      "selected Saul Steinberg line drawing",
                      "selected Paul Klee city composition",
                      "simple school wayfinding example"
                    ]
                  }
                ]
              },
              {
                "key": "Looking Focus",
                "title": "Looking Focus",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "simplified outline",
                      "large and small shapes",
                      "viewpoint",
                      "signs and symbols",
                      "detail selection"
                    ]
                  }
                ]
              },
              {
                "key": "Looking Questions",
                "title": "Looking Questions",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Which shapes are largest?",
                      "What is in front?",
                      "What is behind?",
                      "Which details were simplified?",
                      "How does the symbol help another person?"
                    ]
                  }
                ]
              },
              {
                "key": "Movement or Sensory Response",
                "title": "Movement or Sensory Response",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children use viewfinder frames or hand frames to isolate a section of the room, then change position and notice what appears or disappears."
                  }
                ]
              },
              {
                "key": "Studio Connection",
                "title": "Studio Connection",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children draw one school object, corner or space from direct observation."
                  }
                ]
              }
            ]
          },
          {
            "key": "Teacher Art Concepts",
            "title": "Teacher Art Concepts",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Concepts",
                "title": "Core Concepts",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "observe",
                      "outline",
                      "viewpoint",
                      "foreground",
                      "background",
                      "detail"
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Routine Language",
                "title": "Teacher Routine Language",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Look for longer than you draw.",
                      "Start with the largest shape.",
                      "What is in front?",
                      "Which line shows the edge?",
                      "Which detail do you really need?"
                    ]
                  }
                ]
              },
              {
                "key": "Light Theme Language",
                "title": "Light Theme Language",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "school",
                      "classroom",
                      "playground",
                      "library",
                      "hall"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Materials",
            "title": "Materials",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Materials",
                "title": "Core Materials",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "sketch paper",
                      "clipboards",
                      "pencils",
                      "black markers used after initial observation",
                      "viewfinder frames",
                      "selected references"
                    ]
                  }
                ]
              },
              {
                "key": "Optional Materials",
                "title": "Optional Materials",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "cameras or tablets",
                      "enlarged school photographs",
                      "transparent tracing sheets for viewpoint comparison"
                    ]
                  }
                ]
              },
              {
                "key": "Preparation",
                "title": "Preparation",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "choose safe observation stations",
                      "prepare route and supervision",
                      "place children where they can see without blocking movement",
                      "prepare a fixed-reference alternative"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Studio Sequence",
            "title": "Studio Sequence",
            "blocks": [],
            "subsections": [
              {
                "key": "1. Arrival and Visual Invitation",
                "title": "1. Arrival and Visual Invitation",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Compare an architectural sketch, illustrated map and sign. Identify which information each one communicates."
                  }
                ]
              },
              {
                "key": "2. Art Encounter",
                "title": "2. Art Encounter",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Discuss simplification, viewpoint and essential details."
                  }
                ]
              },
              {
                "key": "3. Teacher Demonstration",
                "title": "3. Teacher Demonstration",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Observe one school object. Block in the largest shape, add relative smaller shapes and select only two or three identifying details."
                  }
                ]
              },
              {
                "key": "4. Material Exploration",
                "title": "4. Material Exploration",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children make direct observational studies at selected school locations."
                  }
                ]
              },
              {
                "key": "5. Pause and Notice",
                "title": "5. Pause and Notice",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children compare the drawing with the subject and identify one missing or unnecessary detail."
                  }
                ]
              },
              {
                "key": "6. Continue and Select",
                "title": "6. Continue and Select",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children revise the study or make a second quick view."
                  }
                ]
              },
              {
                "key": "7. Reflection and Clean-Up",
                "title": "7. Reflection and Clean-Up",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children title the subject orally and select one study for development."
                  }
                ]
              }
            ]
          },
          {
            "key": "Teacher Prompts",
            "title": "Teacher Prompts",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "Which shape should you draw first?",
                  "Is this part larger or smaller?",
                  "What overlaps?",
                  "What can you see from this viewpoint?",
                  "Which detail helps us know the place?"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Differentiation",
            "title": "Differentiation",
            "blocks": [],
            "subsections": [
              {
                "key": "Support",
                "title": "Support",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "use one object or cropped photograph",
                      "focus on two major shapes",
                      "provide a viewfinder",
                      "offer thicker drawing tools"
                    ]
                  }
                ]
              },
              {
                "key": "Extension",
                "title": "Extension",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "make a second-viewpoint study",
                      "include foreground overlap",
                      "compare what changed after moving position"
                    ]
                  }
                ]
              },
              {
                "key": "Motor and Access Adaptations",
                "title": "Motor and Access Adaptations",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "provide seated observation",
                      "stabilise clipboards",
                      "use adaptive grips",
                      "allow enlarged photographs"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Assessment and Observation",
            "title": "Assessment and Observation",
            "blocks": [],
            "subsections": [
              {
                "key": "Primary Observation Focus",
                "title": "Primary Observation Focus",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "direct-looking behaviour",
                      "use of large shape, relative position and selected detail"
                    ]
                  }
                ]
              },
              {
                "key": "Evidence to Collect",
                "title": "Evidence to Collect",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "observational study",
                      "optional second-view photograph",
                      "teacher note"
                    ]
                  }
                ]
              },
              {
                "key": "Child Voice Prompt",
                "title": "Child Voice Prompt",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Which detail helps us recognise this place?"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Clean-Up and Storage",
            "title": "Clean-Up and Storage",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Store selected studies flat. Return clipboards and observation tools. Confirm all children have left the observation space safely."
              }
            ],
            "subsections": []
          },
          {
            "key": "Safety Notes",
            "title": "Safety Notes",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "keep routes and doorways clear",
                  "supervise movement",
                  "do not observe restricted or private spaces"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Teacher Reflection",
            "title": "Teacher Reflection",
            "blocks": [],
            "subsections": [
              {
                "key": "What to Review Before Lesson 2",
                "title": "What to Review Before Lesson 2",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "which children use observation rather than memory",
                      "which children need proportion or symbol support"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "lesson-02",
        "lessonNumber": 2,
        "title": "Make a Clear Visual Symbol",
        "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/02_lesson_2.md",
        "sourceMarkdown": "# Lesson 2: Make a Clear Visual Symbol\n\n## Lesson Identity\n\n### Lesson Number\n\n2\n\n### Studio Phase\n\nSkill Studio\n\n### Primary Art Domain\n\nComposition and Visual Organisation\n\n### Supporting Art Domains\n\n- Drawing and Mark Making\n- Materials, Process and Reflection\n\n## Lesson Artistic Focus\n\nChildren practise simplifying school places and objects into visual symbols while using relative size, foreground and background more deliberately.\n\n## Connection to Unit Project\n\nThis lesson establishes the graphic system that will connect individual contributions in the class guide.\n\n## Learning Outcomes\n\n### Explore and Understand\n\nChildren should increasingly be able to:\n\n- identify essential and non-essential visual details\n- recognise how repeated line, shape or colour choices create consistency\n\n### Make and Apply\n\nChildren should increasingly be able to:\n\n- simplify an observed object or place into a clear symbol\n- organise foreground and background in a small composition\n- test one limited graphic system\n\n### Express and Reflect\n\nChildren should increasingly be able to:\n\n- explain why a symbol is understandable\n\n## Technique Focus\n\n### Core Technique\n\nVisual simplification and consistent symbol design\n\n### Previously Learned Technique\n\nObservational outline and selected detail\n\n### New Technical Demand\n\n- removing unnecessary detail\n- using consistent line weight, shape or colour across a symbol set\n\n### Technical Success Indicators\n\n- symbol remains recognisable after simplification\n- major shape is clear\n- colour or line use is controlled and consistent\n\n## Art Encounter or Process Reference\n\n### Featured Reference\n\n- school signage system\n- simple architectural plan symbols\n- illustrated map icons\n- selected Chinese architectural-plan details\n\n### Process-Looking Focus\n\n- consistency\n- symbol\n- relative size\n- foreground and background\n- visual hierarchy\n\n### Studio Connection\n\nChildren translate one observed school subject into two symbol trials and choose the clearer version.\n\n## Teacher Art Concepts\n\n### Core Concepts\n\n- symbol\n- simplify\n- consistent\n- proportion\n- foreground\n- background\n\n### Teacher Routine Language\n\n- What can you remove?\n- What must stay?\n- Is the main shape clear?\n- Use the same line or colour rule.\n- Which version is easier to understand?\n\n### Light Theme Language\n\n- map\n- classroom\n- playground\n- library\n- next to\n- between\n\n## Materials\n\n### Core Materials\n\n- Lesson 1 observational studies\n- small trial cards\n- pencils\n- black markers\n- limited coloured markers or pencils\n- coloured paper\n- glue sticks\n\n### Preparation\n\n- prepare two trial-card spaces per child\n- choose a limited class palette for testing\n- provide icon references for analysis, not tracing\n\n## Studio Sequence\n\n### 1. Revisit and Notice\n\nCompare an observational drawing and a simplified symbol of a similar subject.\n\n### 2. Focused Demonstration\n\nReduce one school object to its main outline and one identifying detail. Create a second version with different emphasis.\n\n### 3. Guided Practice\n\nChildren circle essential details in the Lesson 1 study and make a first symbol trial.\n\n### 4. Independent Technique Trials\n\nChildren create a second trial using a consistent line, shape or colour rule.\n\n### 5. Compare and Adjust\n\nPartners identify what each symbol represents. Artists revise based on clarity, not preference alone.\n\n### 6. Select or Save Trials\n\nChildren choose the stronger symbol or combine useful parts of both.\n\n### 7. Reflection and Clean-Up\n\nStore the selected symbol and note the graphic rule used.\n\n## Teacher Prompts\n\n- Which detail is essential?\n- Can you understand it without the small details?\n- What is the focal shape?\n- Does this symbol belong to the same system?\n- What did your partner understand?\n\n## Differentiation\n\n### Support\n\n- provide a cropped reference\n- offer two essential-detail choices\n- use one black outline and one colour only\n- enlarge trial cards\n\n### Extension\n\n- create two related symbols\n- establish a three-symbol mini-system\n- use relative size and overlap deliberately\n\n### Motor and Access Adaptations\n\n- provide bold markers\n- use pre-cut geometric collage shapes\n- stabilise trial cards\n- allow adult scribing of symbol meaning\n\n## Assessment and Observation\n\n### Primary Observation Focus\n\n- clarity of simplification\n- consistent visual-system use\n\n### Evidence to Collect\n\n- two symbol trials\n- selected symbol\n- peer-interpretation note\n\n### Child Voice Prompt\n\n- What did you keep so people could understand your symbol?\n\n## Clean-Up and Storage\n\nStore selected symbols and observational studies together. Return limited palette materials.\n\n## Safety Notes\n\n- supervise scissors if collage is used\n- keep graphic references appropriate and free of private information\n\n## Teacher Reflection\n\n### What to Review Before Lesson 3\n\n- which contribution format best fits each child\n- which symbols need further direct observation\n",
        "sections": [
          {
            "key": "Lesson Identity",
            "title": "Lesson Identity",
            "blocks": [],
            "subsections": [
              {
                "key": "Lesson Number",
                "title": "Lesson Number",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "2"
                  }
                ]
              },
              {
                "key": "Studio Phase",
                "title": "Studio Phase",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Skill Studio"
                  }
                ]
              },
              {
                "key": "Primary Art Domain",
                "title": "Primary Art Domain",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Composition and Visual Organisation"
                  }
                ]
              },
              {
                "key": "Supporting Art Domains",
                "title": "Supporting Art Domains",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Drawing and Mark Making",
                      "Materials, Process and Reflection"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Lesson Artistic Focus",
            "title": "Lesson Artistic Focus",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children practise simplifying school places and objects into visual symbols while using relative size, foreground and background more deliberately."
              }
            ],
            "subsections": []
          },
          {
            "key": "Connection to Unit Project",
            "title": "Connection to Unit Project",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This lesson establishes the graphic system that will connect individual contributions in the class guide."
              }
            ],
            "subsections": []
          },
          {
            "key": "Learning Outcomes",
            "title": "Learning Outcomes",
            "blocks": [],
            "subsections": [
              {
                "key": "Explore and Understand",
                "title": "Explore and Understand",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "identify essential and non-essential visual details",
                      "recognise how repeated line, shape or colour choices create consistency"
                    ]
                  }
                ]
              },
              {
                "key": "Make and Apply",
                "title": "Make and Apply",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "simplify an observed object or place into a clear symbol",
                      "organise foreground and background in a small composition",
                      "test one limited graphic system"
                    ]
                  }
                ]
              },
              {
                "key": "Express and Reflect",
                "title": "Express and Reflect",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "explain why a symbol is understandable"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Technique Focus",
            "title": "Technique Focus",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Technique",
                "title": "Core Technique",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Visual simplification and consistent symbol design"
                  }
                ]
              },
              {
                "key": "Previously Learned Technique",
                "title": "Previously Learned Technique",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Observational outline and selected detail"
                  }
                ]
              },
              {
                "key": "New Technical Demand",
                "title": "New Technical Demand",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "removing unnecessary detail",
                      "using consistent line weight, shape or colour across a symbol set"
                    ]
                  }
                ]
              },
              {
                "key": "Technical Success Indicators",
                "title": "Technical Success Indicators",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "symbol remains recognisable after simplification",
                      "major shape is clear",
                      "colour or line use is controlled and consistent"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Art Encounter or Process Reference",
            "title": "Art Encounter or Process Reference",
            "blocks": [],
            "subsections": [
              {
                "key": "Featured Reference",
                "title": "Featured Reference",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "school signage system",
                      "simple architectural plan symbols",
                      "illustrated map icons",
                      "selected Chinese architectural-plan details"
                    ]
                  }
                ]
              },
              {
                "key": "Process-Looking Focus",
                "title": "Process-Looking Focus",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "consistency",
                      "symbol",
                      "relative size",
                      "foreground and background",
                      "visual hierarchy"
                    ]
                  }
                ]
              },
              {
                "key": "Studio Connection",
                "title": "Studio Connection",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children translate one observed school subject into two symbol trials and choose the clearer version."
                  }
                ]
              }
            ]
          },
          {
            "key": "Teacher Art Concepts",
            "title": "Teacher Art Concepts",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Concepts",
                "title": "Core Concepts",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "symbol",
                      "simplify",
                      "consistent",
                      "proportion",
                      "foreground",
                      "background"
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Routine Language",
                "title": "Teacher Routine Language",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "What can you remove?",
                      "What must stay?",
                      "Is the main shape clear?",
                      "Use the same line or colour rule.",
                      "Which version is easier to understand?"
                    ]
                  }
                ]
              },
              {
                "key": "Light Theme Language",
                "title": "Light Theme Language",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "map",
                      "classroom",
                      "playground",
                      "library",
                      "next to",
                      "between"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Materials",
            "title": "Materials",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Materials",
                "title": "Core Materials",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Lesson 1 observational studies",
                      "small trial cards",
                      "pencils",
                      "black markers",
                      "limited coloured markers or pencils",
                      "coloured paper",
                      "glue sticks"
                    ]
                  }
                ]
              },
              {
                "key": "Preparation",
                "title": "Preparation",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "prepare two trial-card spaces per child",
                      "choose a limited class palette for testing",
                      "provide icon references for analysis, not tracing"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Studio Sequence",
            "title": "Studio Sequence",
            "blocks": [],
            "subsections": [
              {
                "key": "1. Revisit and Notice",
                "title": "1. Revisit and Notice",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Compare an observational drawing and a simplified symbol of a similar subject."
                  }
                ]
              },
              {
                "key": "2. Focused Demonstration",
                "title": "2. Focused Demonstration",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Reduce one school object to its main outline and one identifying detail. Create a second version with different emphasis."
                  }
                ]
              },
              {
                "key": "3. Guided Practice",
                "title": "3. Guided Practice",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children circle essential details in the Lesson 1 study and make a first symbol trial."
                  }
                ]
              },
              {
                "key": "4. Independent Technique Trials",
                "title": "4. Independent Technique Trials",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children create a second trial using a consistent line, shape or colour rule."
                  }
                ]
              },
              {
                "key": "5. Compare and Adjust",
                "title": "5. Compare and Adjust",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Partners identify what each symbol represents. Artists revise based on clarity, not preference alone."
                  }
                ]
              },
              {
                "key": "6. Select or Save Trials",
                "title": "6. Select or Save Trials",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children choose the stronger symbol or combine useful parts of both."
                  }
                ]
              },
              {
                "key": "7. Reflection and Clean-Up",
                "title": "7. Reflection and Clean-Up",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Store the selected symbol and note the graphic rule used."
                  }
                ]
              }
            ]
          },
          {
            "key": "Teacher Prompts",
            "title": "Teacher Prompts",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "Which detail is essential?",
                  "Can you understand it without the small details?",
                  "What is the focal shape?",
                  "Does this symbol belong to the same system?",
                  "What did your partner understand?"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Differentiation",
            "title": "Differentiation",
            "blocks": [],
            "subsections": [
              {
                "key": "Support",
                "title": "Support",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "provide a cropped reference",
                      "offer two essential-detail choices",
                      "use one black outline and one colour only",
                      "enlarge trial cards"
                    ]
                  }
                ]
              },
              {
                "key": "Extension",
                "title": "Extension",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "create two related symbols",
                      "establish a three-symbol mini-system",
                      "use relative size and overlap deliberately"
                    ]
                  }
                ]
              },
              {
                "key": "Motor and Access Adaptations",
                "title": "Motor and Access Adaptations",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "provide bold markers",
                      "use pre-cut geometric collage shapes",
                      "stabilise trial cards",
                      "allow adult scribing of symbol meaning"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Assessment and Observation",
            "title": "Assessment and Observation",
            "blocks": [],
            "subsections": [
              {
                "key": "Primary Observation Focus",
                "title": "Primary Observation Focus",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "clarity of simplification",
                      "consistent visual-system use"
                    ]
                  }
                ]
              },
              {
                "key": "Evidence to Collect",
                "title": "Evidence to Collect",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "two symbol trials",
                      "selected symbol",
                      "peer-interpretation note"
                    ]
                  }
                ]
              },
              {
                "key": "Child Voice Prompt",
                "title": "Child Voice Prompt",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "What did you keep so people could understand your symbol?"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Clean-Up and Storage",
            "title": "Clean-Up and Storage",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Store selected symbols and observational studies together. Return limited palette materials."
              }
            ],
            "subsections": []
          },
          {
            "key": "Safety Notes",
            "title": "Safety Notes",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "supervise scissors if collage is used",
                  "keep graphic references appropriate and free of private information"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Teacher Reflection",
            "title": "Teacher Reflection",
            "blocks": [],
            "subsections": [
              {
                "key": "What to Review Before Lesson 3",
                "title": "What to Review Before Lesson 3",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "which contribution format best fits each child",
                      "which symbols need further direct observation"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "lesson-03",
        "lessonNumber": 3,
        "title": "Create a School Guide Contribution",
        "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/03_lesson_3.md",
        "sourceMarkdown": "# Lesson 3: Create a School Guide Contribution\n\n## Lesson Identity\n\n### Lesson Number\n\n3\n\n### Studio Phase\n\nCreate\n\n### Primary Art Domain\n\nObservation and Representation\n\n### Supporting Art Domains\n\n- Composition and Visual Organisation\n- Drawing and Mark Making\n- Imagination, Expression and Visual Communication\n\n## Lesson Artistic Focus\n\nChildren create a polished guide contribution based on direct observation and organise individual pieces within a collaborative school visual system.\n\n## Creative Brief\n\nCreate one clear school picture or symbol that helps another person understand where they are or what they can find.\n\n## Required Artistic Decisions\n\n- which place, landmark or object to represent\n- which details and symbols are essential\n- how the contribution fits the class visual system\n\n## Open Choices\n\n- illustrated space card\n- landmark symbol\n- route marker\n- simplified environment drawing\n- viewpoint\n- limited colour selection\n- collage or marker emphasis\n\n## Learning Outcomes\n\n### Explore and Understand\n\nChildren should increasingly be able to:\n\n- connect an observed subject with a clear communication purpose\n\n### Make and Apply\n\nChildren should increasingly be able to:\n\n- create a controlled final drawing or graphic contribution\n- use selected proportion, foreground/background or symbol conventions\n- test placement within a collaborative arrangement\n\n### Express and Reflect\n\nChildren should increasingly be able to:\n\n- explain what viewers should understand from the contribution\n\n## Art Reference Reminder\n\n### References Available in the Studio\n\n- architectural sketches\n- wayfinding graphics\n- Lesson 1 studies\n- Lesson 2 symbol trials\n- school photographs\n\n### Anti-Copying Reminder\n\nReferences show communication strategies. Children should not copy a map, icon set or teacher-designed plan.\n\n## Teacher Art Concepts\n\n### Core Concepts\n\n- guide\n- landmark\n- route\n- symbol\n- organise\n- communicate\n\n### Teacher Routine Language\n\n- What should viewers understand?\n- Which detail is essential?\n- How does this fit the guide?\n- Is the viewpoint clear?\n- Where should this contribution be placed?\n\n### Light Theme Language\n\n- school\n- classroom\n- playground\n- library\n- art room\n- music room\n- map\n\n## Materials\n\n### Core Materials\n\n- heavyweight guide cards or paper\n- pencils\n- black markers\n- limited coloured markers or pencils\n- coloured paper\n- glue sticks\n- child-safe scissors\n- large backing paper\n- removable adhesive\n\n### Optional Choice Materials\n\n- tracing paper\n- printed school photographs for reference\n- route arrows\n- icon-shape templates used only as construction aids\n\n### Preparation\n\n- assign or coordinate varied school subjects\n- prepare guide-card sizes\n- set up temporary collaborative backing area\n- ensure reference photographs protect privacy\n\n## Studio Sequence\n\n### 1. Reconnect with the Creative Brief\n\nChildren identify subject, communication purpose and selected graphic rule.\n\n### 2. Plan or Arrange\n\nChildren lightly organise large shapes and essential details.\n\n### 3. Begin Main Creation\n\nChildren create the final drawing, icon or illustrated space contribution.\n\n### 4. Midpoint Pause\n\nChildren compare the work with the observation study and check clarity from a short distance.\n\n### 5. Continue and Develop\n\nChildren refine line, colour, foreground/background or one symbol. They test temporary placement on the collaborative guide.\n\n### 6. Save and Document\n\nPhotograph individual work and initial collaborative arrangement. Record one child explanation.\n\n### 7. Clean-Up\n\nStore guide pieces flat or keep them temporarily attached for Lesson 4.\n\n## Teacher Prompts\n\n- What is the largest shape?\n- Which detail helps people know the place?\n- Can the image be understood from far away?\n- Does the colour follow the class system?\n- What is near or next to your place?\n\n## Differentiation\n\n### Support\n\n- use one clearly framed subject\n- provide a larger card\n- use marker and simple collage\n- reduce the contribution to one landmark symbol\n\n### Extension\n\n- include a second viewpoint or route clue\n- use foreground and background more deliberately\n- design a related paired symbol\n- explain how the contribution connects with neighbouring guide pieces\n\n### Motor and Access Adaptations\n\n- provide adaptive tools\n- offer pre-cut collage shapes\n- stabilise paper\n- allow adult mounting support\n\n## Assessment and Observation\n\n### Primary Observation Focus\n\n- clear communication through observed and simplified imagery\n- integration with the collaborative graphic system\n\n### Evidence to Collect\n\n- final guide contribution\n- initial collaborative-placement photograph\n- child statement\n- teacher note\n\n### Child Voice Prompt\n\n- What should another person understand from your guide picture?\n\n## Clean-Up and Storage\n\nStore contributions and removable arrangement materials safely. Keep individual names on the back, not across the visual field.\n\n## Safety Notes\n\n- supervise scissors and mounting\n- do not include private or restricted information in the guide\n\n## Teacher Reflection\n\n### What to Review Before Lesson 4\n\n- which elements are unclear to viewers\n- where the collaborative guide needs stronger consistency or spacing\n",
        "sections": [
          {
            "key": "Lesson Identity",
            "title": "Lesson Identity",
            "blocks": [],
            "subsections": [
              {
                "key": "Lesson Number",
                "title": "Lesson Number",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "3"
                  }
                ]
              },
              {
                "key": "Studio Phase",
                "title": "Studio Phase",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Create"
                  }
                ]
              },
              {
                "key": "Primary Art Domain",
                "title": "Primary Art Domain",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Observation and Representation"
                  }
                ]
              },
              {
                "key": "Supporting Art Domains",
                "title": "Supporting Art Domains",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Composition and Visual Organisation",
                      "Drawing and Mark Making",
                      "Imagination, Expression and Visual Communication"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Lesson Artistic Focus",
            "title": "Lesson Artistic Focus",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children create a polished guide contribution based on direct observation and organise individual pieces within a collaborative school visual system."
              }
            ],
            "subsections": []
          },
          {
            "key": "Creative Brief",
            "title": "Creative Brief",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Create one clear school picture or symbol that helps another person understand where they are or what they can find."
              }
            ],
            "subsections": []
          },
          {
            "key": "Required Artistic Decisions",
            "title": "Required Artistic Decisions",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "which place, landmark or object to represent",
                  "which details and symbols are essential",
                  "how the contribution fits the class visual system"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Open Choices",
            "title": "Open Choices",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "illustrated space card",
                  "landmark symbol",
                  "route marker",
                  "simplified environment drawing",
                  "viewpoint",
                  "limited colour selection",
                  "collage or marker emphasis"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Learning Outcomes",
            "title": "Learning Outcomes",
            "blocks": [],
            "subsections": [
              {
                "key": "Explore and Understand",
                "title": "Explore and Understand",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "connect an observed subject with a clear communication purpose"
                    ]
                  }
                ]
              },
              {
                "key": "Make and Apply",
                "title": "Make and Apply",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "create a controlled final drawing or graphic contribution",
                      "use selected proportion, foreground/background or symbol conventions",
                      "test placement within a collaborative arrangement"
                    ]
                  }
                ]
              },
              {
                "key": "Express and Reflect",
                "title": "Express and Reflect",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "explain what viewers should understand from the contribution"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Art Reference Reminder",
            "title": "Art Reference Reminder",
            "blocks": [],
            "subsections": [
              {
                "key": "References Available in the Studio",
                "title": "References Available in the Studio",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "architectural sketches",
                      "wayfinding graphics",
                      "Lesson 1 studies",
                      "Lesson 2 symbol trials",
                      "school photographs"
                    ]
                  }
                ]
              },
              {
                "key": "Anti-Copying Reminder",
                "title": "Anti-Copying Reminder",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "References show communication strategies. Children should not copy a map, icon set or teacher-designed plan."
                  }
                ]
              }
            ]
          },
          {
            "key": "Teacher Art Concepts",
            "title": "Teacher Art Concepts",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Concepts",
                "title": "Core Concepts",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "guide",
                      "landmark",
                      "route",
                      "symbol",
                      "organise",
                      "communicate"
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Routine Language",
                "title": "Teacher Routine Language",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "What should viewers understand?",
                      "Which detail is essential?",
                      "How does this fit the guide?",
                      "Is the viewpoint clear?",
                      "Where should this contribution be placed?"
                    ]
                  }
                ]
              },
              {
                "key": "Light Theme Language",
                "title": "Light Theme Language",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "school",
                      "classroom",
                      "playground",
                      "library",
                      "art room",
                      "music room",
                      "map"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Materials",
            "title": "Materials",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Materials",
                "title": "Core Materials",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "heavyweight guide cards or paper",
                      "pencils",
                      "black markers",
                      "limited coloured markers or pencils",
                      "coloured paper",
                      "glue sticks",
                      "child-safe scissors",
                      "large backing paper",
                      "removable adhesive"
                    ]
                  }
                ]
              },
              {
                "key": "Optional Choice Materials",
                "title": "Optional Choice Materials",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "tracing paper",
                      "printed school photographs for reference",
                      "route arrows",
                      "icon-shape templates used only as construction aids"
                    ]
                  }
                ]
              },
              {
                "key": "Preparation",
                "title": "Preparation",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "assign or coordinate varied school subjects",
                      "prepare guide-card sizes",
                      "set up temporary collaborative backing area",
                      "ensure reference photographs protect privacy"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Studio Sequence",
            "title": "Studio Sequence",
            "blocks": [],
            "subsections": [
              {
                "key": "1. Reconnect with the Creative Brief",
                "title": "1. Reconnect with the Creative Brief",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children identify subject, communication purpose and selected graphic rule."
                  }
                ]
              },
              {
                "key": "2. Plan or Arrange",
                "title": "2. Plan or Arrange",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children lightly organise large shapes and essential details."
                  }
                ]
              },
              {
                "key": "3. Begin Main Creation",
                "title": "3. Begin Main Creation",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children create the final drawing, icon or illustrated space contribution."
                  }
                ]
              },
              {
                "key": "4. Midpoint Pause",
                "title": "4. Midpoint Pause",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children compare the work with the observation study and check clarity from a short distance."
                  }
                ]
              },
              {
                "key": "5. Continue and Develop",
                "title": "5. Continue and Develop",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children refine line, colour, foreground/background or one symbol. They test temporary placement on the collaborative guide."
                  }
                ]
              },
              {
                "key": "6. Save and Document",
                "title": "6. Save and Document",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Photograph individual work and initial collaborative arrangement. Record one child explanation."
                  }
                ]
              },
              {
                "key": "7. Clean-Up",
                "title": "7. Clean-Up",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Store guide pieces flat or keep them temporarily attached for Lesson 4."
                  }
                ]
              }
            ]
          },
          {
            "key": "Teacher Prompts",
            "title": "Teacher Prompts",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "What is the largest shape?",
                  "Which detail helps people know the place?",
                  "Can the image be understood from far away?",
                  "Does the colour follow the class system?",
                  "What is near or next to your place?"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Differentiation",
            "title": "Differentiation",
            "blocks": [],
            "subsections": [
              {
                "key": "Support",
                "title": "Support",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "use one clearly framed subject",
                      "provide a larger card",
                      "use marker and simple collage",
                      "reduce the contribution to one landmark symbol"
                    ]
                  }
                ]
              },
              {
                "key": "Extension",
                "title": "Extension",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "include a second viewpoint or route clue",
                      "use foreground and background more deliberately",
                      "design a related paired symbol",
                      "explain how the contribution connects with neighbouring guide pieces"
                    ]
                  }
                ]
              },
              {
                "key": "Motor and Access Adaptations",
                "title": "Motor and Access Adaptations",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "provide adaptive tools",
                      "offer pre-cut collage shapes",
                      "stabilise paper",
                      "allow adult mounting support"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Assessment and Observation",
            "title": "Assessment and Observation",
            "blocks": [],
            "subsections": [
              {
                "key": "Primary Observation Focus",
                "title": "Primary Observation Focus",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "clear communication through observed and simplified imagery",
                      "integration with the collaborative graphic system"
                    ]
                  }
                ]
              },
              {
                "key": "Evidence to Collect",
                "title": "Evidence to Collect",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "final guide contribution",
                      "initial collaborative-placement photograph",
                      "child statement",
                      "teacher note"
                    ]
                  }
                ]
              },
              {
                "key": "Child Voice Prompt",
                "title": "Child Voice Prompt",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "What should another person understand from your guide picture?"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Clean-Up and Storage",
            "title": "Clean-Up and Storage",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Store contributions and removable arrangement materials safely. Keep individual names on the back, not across the visual field."
              }
            ],
            "subsections": []
          },
          {
            "key": "Safety Notes",
            "title": "Safety Notes",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "supervise scissors and mounting",
                  "do not include private or restricted information in the guide"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Teacher Reflection",
            "title": "Teacher Reflection",
            "blocks": [],
            "subsections": [
              {
                "key": "What to Review Before Lesson 4",
                "title": "What to Review Before Lesson 4",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "which elements are unclear to viewers",
                      "where the collaborative guide needs stronger consistency or spacing"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "lesson-04",
        "lessonNumber": 4,
        "title": "Test and Improve the Guide",
        "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/04_lesson_4.md",
        "sourceMarkdown": "# Lesson 4: Test and Improve the Guide\n\n## Lesson Identity\n\n### Lesson Number\n\n4\n\n### Studio Phase\n\nDevelop and Share\n\n### Primary Art Domain\n\nMaterials, Process and Reflection\n\n### Supporting Art Domains\n\n- Composition and Visual Organisation\n- Observation and Representation\n\n## Lesson Artistic Focus\n\nChildren test the collaborative guide with viewers, revise one element for clarity and complete the shared visual presentation.\n\n## Connection to Unit Project\n\nThis lesson introduces viewer-centred revision and establishes the K2 expectation that artwork can be improved after testing.\n\n## Learning Outcomes\n\n### Explore and Understand\n\nChildren should increasingly be able to:\n\n- recognise whether another person can interpret a visual guide element\n- notice consistency and inconsistency within a shared graphic system\n\n### Make and Apply\n\nChildren should increasingly be able to:\n\n- revise one drawing, symbol, route marker or placement for clarity\n- contribute to spacing and organisation of the final guide\n\n### Express and Reflect\n\nChildren should increasingly be able to:\n\n- explain one revision and its communication purpose\n- identify one strength in the collaborative system\n\n## Review Focus\n\n### Looking Back Prompt\n\n- Can another person recognise the place?\n- Which symbols are easy to understand?\n- Are repeated colours and lines consistent?\n- Is anything too crowded?\n- What should be moved, enlarged, simplified or clarified?\n\n### Revision Opportunity\n\nChildren may enlarge an essential detail, simplify a background, strengthen an outline, adjust a symbol, add a route connection, move a contribution or increase spacing.\n\n### Revision Is Not\n\n- adding decorative detail\n- rewriting extensive labels\n- adult redrawing\n- forcing exact spatial scale\n- making every child’s drawing identical\n\n## Teacher Art Concepts\n\n### Core Concepts\n\n- test\n- viewer\n- revise\n- clear\n- consistent\n- organise\n\n### Teacher Routine Language\n\n- What did the viewer understand?\n- What was confusing?\n- Which part will you revise?\n- Does the guide feel consistent?\n- Is the spacing clear?\n\n### Light Theme Language\n\n- map\n- school\n- classroom\n- playground\n- next to\n- between\n- Where is…?\n\n## Materials\n\n### Core Materials\n\n- individual guide contributions\n- symbol trials\n- large backing paper\n- black markers\n- limited colour materials\n- glue sticks\n- removable adhesive\n\n### Presentation Materials\n\n- title card\n- optional minimal labels\n- camera or tablet\n- portfolio folders\n- feedback cards using pictures or simple prompts\n\n### Preparation\n\n- set up a small viewer test with classmates, staff or another group where appropriate\n- prepare temporary arrangement before final attachment\n- prepare portfolio documentation\n- check display location and privacy\n\n## Studio Sequence\n\n### 1. Revisit Intention\n\nReview the guide’s purpose and the agreed visual system.\n\n### 2. Gallery Pause or Partner Look\n\nPartners or invited viewers interpret selected symbols, spaces and route relationships without prior explanation.\n\n### 3. Choose a Revision\n\nEach child or pair selects one meaningful clarity revision based on observed response.\n\n### 4. Develop or Complete\n\nChildren revise individual contributions and help refine collaborative spacing and organisation.\n\n### 5. Prepare for Sharing\n\nChildren practise one short explanation of a symbol, observation detail or revision.\n\n### 6. Gallery Share\n\nPresent **Our School Visual Guide** and invite viewers to use it as a visual interpretation tool.\n\n### 7. Portfolio Selection and Clean-Up\n\nSave the observational study, symbol trial, final contribution and child explanation. Photograph the completed collaborative guide.\n\n## Teacher Prompts\n\n- What could the viewer recognise?\n- Which part was unclear?\n- Should this be larger, simpler or moved?\n- Which visual rule connects our work?\n- What did you learn from another viewpoint?\n\n## Differentiation\n\n### Support\n\n- offer two concrete revision choices\n- use peer pointing or picture feedback\n- allow teacher scribing\n- revise one feature only\n\n### Extension\n\n- analyse consistency across several contributions\n- improve a route sequence\n- compare the final contribution with the first observation study\n- explain why exact scale was less important than clarity\n\n### Motor and Access Adaptations\n\n- provide adaptive tools\n- allow adult assistance with large mounting\n- use removable pieces for easy repositioning\n- provide seated viewer testing\n\n## Assessment and Observation\n\n### Primary Observation Focus\n\n- purposeful revision based on viewer response\n- understanding of shared visual organisation\n\n### Evidence to Collect\n\n- final guide contribution\n- before-and-after revision\n- child explanation\n- completed collaborative guide photograph\n- teacher baseline summary\n\n### Child Voice Prompt\n\n- What did you change so another person could understand your guide more easily?\n\n## Portfolio Evidence\n\n### Required\n\n- one observational school drawing\n- one symbol or graphic-system study\n- final visual-guide contribution\n- one recorded child explanation\n\n### Optional\n\n- second-viewpoint study\n- viewer-feedback record\n- before-and-after revision\n- collaborative-guide photograph\n\n## Display and Sharing\n\n### Sharing Format\n\n- peer wayfinding test\n- visitor interpretation\n- gallery walk\n- school-space guide tour\n\n### Display Note\n\nUse minimal written language. Credit individual contributions while preserving a coherent shared visual field.\n\n## Clean-Up and Storage\n\nMount the guide securely or photograph it before disassembly. Store individual portfolio evidence flat. Return all temporary mounting materials.\n\n## Safety Notes\n\n- install the guide without blocking routes\n- protect school privacy\n- follow display and photography consent procedures\n\n## Teacher Reflection\n\n### Unit Review\n\n- Which outcomes were visible?\n- Which techniques need recycling?\n- Which children need additional support?\n- Which portfolio evidence should be retained?\n- What should inform the next unit?\n",
        "sections": [
          {
            "key": "Lesson Identity",
            "title": "Lesson Identity",
            "blocks": [],
            "subsections": [
              {
                "key": "Lesson Number",
                "title": "Lesson Number",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "4"
                  }
                ]
              },
              {
                "key": "Studio Phase",
                "title": "Studio Phase",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Develop and Share"
                  }
                ]
              },
              {
                "key": "Primary Art Domain",
                "title": "Primary Art Domain",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Materials, Process and Reflection"
                  }
                ]
              },
              {
                "key": "Supporting Art Domains",
                "title": "Supporting Art Domains",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Composition and Visual Organisation",
                      "Observation and Representation"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Lesson Artistic Focus",
            "title": "Lesson Artistic Focus",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Children test the collaborative guide with viewers, revise one element for clarity and complete the shared visual presentation."
              }
            ],
            "subsections": []
          },
          {
            "key": "Connection to Unit Project",
            "title": "Connection to Unit Project",
            "blocks": [
              {
                "type": "paragraph",
                "text": "This lesson introduces viewer-centred revision and establishes the K2 expectation that artwork can be improved after testing."
              }
            ],
            "subsections": []
          },
          {
            "key": "Learning Outcomes",
            "title": "Learning Outcomes",
            "blocks": [],
            "subsections": [
              {
                "key": "Explore and Understand",
                "title": "Explore and Understand",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "recognise whether another person can interpret a visual guide element",
                      "notice consistency and inconsistency within a shared graphic system"
                    ]
                  }
                ]
              },
              {
                "key": "Make and Apply",
                "title": "Make and Apply",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "revise one drawing, symbol, route marker or placement for clarity",
                      "contribute to spacing and organisation of the final guide"
                    ]
                  }
                ]
              },
              {
                "key": "Express and Reflect",
                "title": "Express and Reflect",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children should increasingly be able to:"
                  },
                  {
                    "type": "list",
                    "items": [
                      "explain one revision and its communication purpose",
                      "identify one strength in the collaborative system"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Review Focus",
            "title": "Review Focus",
            "blocks": [],
            "subsections": [
              {
                "key": "Looking Back Prompt",
                "title": "Looking Back Prompt",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Can another person recognise the place?",
                      "Which symbols are easy to understand?",
                      "Are repeated colours and lines consistent?",
                      "Is anything too crowded?",
                      "What should be moved, enlarged, simplified or clarified?"
                    ]
                  }
                ]
              },
              {
                "key": "Revision Opportunity",
                "title": "Revision Opportunity",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children may enlarge an essential detail, simplify a background, strengthen an outline, adjust a symbol, add a route connection, move a contribution or increase spacing."
                  }
                ]
              },
              {
                "key": "Revision Is Not",
                "title": "Revision Is Not",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "adding decorative detail",
                      "rewriting extensive labels",
                      "adult redrawing",
                      "forcing exact spatial scale",
                      "making every child’s drawing identical"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Teacher Art Concepts",
            "title": "Teacher Art Concepts",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Concepts",
                "title": "Core Concepts",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "test",
                      "viewer",
                      "revise",
                      "clear",
                      "consistent",
                      "organise"
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Routine Language",
                "title": "Teacher Routine Language",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "What did the viewer understand?",
                      "What was confusing?",
                      "Which part will you revise?",
                      "Does the guide feel consistent?",
                      "Is the spacing clear?"
                    ]
                  }
                ]
              },
              {
                "key": "Light Theme Language",
                "title": "Light Theme Language",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "map",
                      "school",
                      "classroom",
                      "playground",
                      "next to",
                      "between",
                      "Where is…?"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Materials",
            "title": "Materials",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Materials",
                "title": "Core Materials",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "individual guide contributions",
                      "symbol trials",
                      "large backing paper",
                      "black markers",
                      "limited colour materials",
                      "glue sticks",
                      "removable adhesive"
                    ]
                  }
                ]
              },
              {
                "key": "Presentation Materials",
                "title": "Presentation Materials",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "title card",
                      "optional minimal labels",
                      "camera or tablet",
                      "portfolio folders",
                      "feedback cards using pictures or simple prompts"
                    ]
                  }
                ]
              },
              {
                "key": "Preparation",
                "title": "Preparation",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "set up a small viewer test with classmates, staff or another group where appropriate",
                      "prepare temporary arrangement before final attachment",
                      "prepare portfolio documentation",
                      "check display location and privacy"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Studio Sequence",
            "title": "Studio Sequence",
            "blocks": [],
            "subsections": [
              {
                "key": "1. Revisit Intention",
                "title": "1. Revisit Intention",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Review the guide’s purpose and the agreed visual system."
                  }
                ]
              },
              {
                "key": "2. Gallery Pause or Partner Look",
                "title": "2. Gallery Pause or Partner Look",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Partners or invited viewers interpret selected symbols, spaces and route relationships without prior explanation."
                  }
                ]
              },
              {
                "key": "3. Choose a Revision",
                "title": "3. Choose a Revision",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Each child or pair selects one meaningful clarity revision based on observed response."
                  }
                ]
              },
              {
                "key": "4. Develop or Complete",
                "title": "4. Develop or Complete",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children revise individual contributions and help refine collaborative spacing and organisation."
                  }
                ]
              },
              {
                "key": "5. Prepare for Sharing",
                "title": "5. Prepare for Sharing",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Children practise one short explanation of a symbol, observation detail or revision."
                  }
                ]
              },
              {
                "key": "6. Gallery Share",
                "title": "6. Gallery Share",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Present **Our School Visual Guide** and invite viewers to use it as a visual interpretation tool."
                  }
                ]
              },
              {
                "key": "7. Portfolio Selection and Clean-Up",
                "title": "7. Portfolio Selection and Clean-Up",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Save the observational study, symbol trial, final contribution and child explanation. Photograph the completed collaborative guide."
                  }
                ]
              }
            ]
          },
          {
            "key": "Teacher Prompts",
            "title": "Teacher Prompts",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "What could the viewer recognise?",
                  "Which part was unclear?",
                  "Should this be larger, simpler or moved?",
                  "Which visual rule connects our work?",
                  "What did you learn from another viewpoint?"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Differentiation",
            "title": "Differentiation",
            "blocks": [],
            "subsections": [
              {
                "key": "Support",
                "title": "Support",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "offer two concrete revision choices",
                      "use peer pointing or picture feedback",
                      "allow teacher scribing",
                      "revise one feature only"
                    ]
                  }
                ]
              },
              {
                "key": "Extension",
                "title": "Extension",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "analyse consistency across several contributions",
                      "improve a route sequence",
                      "compare the final contribution with the first observation study",
                      "explain why exact scale was less important than clarity"
                    ]
                  }
                ]
              },
              {
                "key": "Motor and Access Adaptations",
                "title": "Motor and Access Adaptations",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "provide adaptive tools",
                      "allow adult assistance with large mounting",
                      "use removable pieces for easy repositioning",
                      "provide seated viewer testing"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Assessment and Observation",
            "title": "Assessment and Observation",
            "blocks": [],
            "subsections": [
              {
                "key": "Primary Observation Focus",
                "title": "Primary Observation Focus",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "purposeful revision based on viewer response",
                      "understanding of shared visual organisation"
                    ]
                  }
                ]
              },
              {
                "key": "Evidence to Collect",
                "title": "Evidence to Collect",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "final guide contribution",
                      "before-and-after revision",
                      "child explanation",
                      "completed collaborative guide photograph",
                      "teacher baseline summary"
                    ]
                  }
                ]
              },
              {
                "key": "Child Voice Prompt",
                "title": "Child Voice Prompt",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "What did you change so another person could understand your guide more easily?"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Portfolio Evidence",
            "title": "Portfolio Evidence",
            "blocks": [],
            "subsections": [
              {
                "key": "Required",
                "title": "Required",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "one observational school drawing",
                      "one symbol or graphic-system study",
                      "final visual-guide contribution",
                      "one recorded child explanation"
                    ]
                  }
                ]
              },
              {
                "key": "Optional",
                "title": "Optional",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "second-viewpoint study",
                      "viewer-feedback record",
                      "before-and-after revision",
                      "collaborative-guide photograph"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Display and Sharing",
            "title": "Display and Sharing",
            "blocks": [],
            "subsections": [
              {
                "key": "Sharing Format",
                "title": "Sharing Format",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "peer wayfinding test",
                      "visitor interpretation",
                      "gallery walk",
                      "school-space guide tour"
                    ]
                  }
                ]
              },
              {
                "key": "Display Note",
                "title": "Display Note",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "Use minimal written language. Credit individual contributions while preserving a coherent shared visual field."
                  }
                ]
              }
            ]
          },
          {
            "key": "Clean-Up and Storage",
            "title": "Clean-Up and Storage",
            "blocks": [
              {
                "type": "paragraph",
                "text": "Mount the guide securely or photograph it before disassembly. Store individual portfolio evidence flat. Return all temporary mounting materials."
              }
            ],
            "subsections": []
          },
          {
            "key": "Safety Notes",
            "title": "Safety Notes",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "install the guide without blocking routes",
                  "protect school privacy",
                  "follow display and photography consent procedures"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Teacher Reflection",
            "title": "Teacher Reflection",
            "blocks": [],
            "subsections": [
              {
                "key": "Unit Review",
                "title": "Unit Review",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Which outcomes were visible?",
                      "Which techniques need recycling?",
                      "Which children need additional support?",
                      "Which portfolio evidence should be retained?",
                      "What should inform the next unit?"
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "translations": {
      "zh": {
        "title": "我们的新学校",
        "displayTitle": "K2 美术单元 1：我们的新学校",
        "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/02_translations/zh_cn/00_overview_zh_cn.md",
        "sourceMarkdown": "# K2 Art Unit 1: Our New School｜K2 美术单元 1：我们的新学校\n\n## Unit Identity｜单元信息\n\n### Grade｜年级\n\nK2\n\n### Unit Number｜单元编号\n\n1\n\n### Unit Theme｜单元主题\n我们的新学校\n\n### Semester｜学期\n\n秋季\n\n### Unit Position｜单元位置\n\n秋季 1\n\n### Unit Type｜单元类型\n标准单元\n\n### Developmental Stage｜发展阶段\n发展与组织阶段：观察与控制\n\n## Unit Artistic Focus｜单元艺术重点\n\n儿童从不同视角观察学校空间、家具、标识、路线和建筑特征。他们把所见事物简化为清晰的轮廓、形状和视觉符号，然后为一份协作完成的校园指南贡献一幅个人观察性绘画和一个图形元素。\n\n## Grade-Level Rationale｜年级阶段依据\n\nK2 以回归校园和建立观察基线作为开始。儿童已经准备好从「命名熟悉物品」向前一步，开始比较比例、视角、前景和背景。学校环境提供了一个有意义、共同关心的题材，让教师可以借此观察儿童的绘画控制力、视觉组织能力、符号使用和早期修改意识。\n\n## Theme Connection｜主题联结\n「Our New School / 我们的新学校」主题提供教室、走廊、共享空间、标识和路线作为描绘对象。Power Up Level 1 的语言可以自然地通过 `classroom`、`chair`、`desk`、`door`、`window`、`playground` 以及介词 `in` / `on` / `next to` / `under` 复现；本美术单元不要求英语标签、英语问答操练或英语读图。本单元的美术学习仍然是观察、简化、视觉沟通和协作式图形组织。\n\n## Primary Art Domain｜主艺术领域\n观察与再现\n\n## Supporting Art Domains｜辅助艺术领域\n\n- 绘画与笔触\n- 构图与视觉组织\n- 材料、过程与反思\n\n## Core Visual Elements｜核心视觉元素\n\n- 轮廓\n- 几何形与有机形\n- 相对大小\n- 前景与背景\n- 视角\n- 路线\n- 视觉符号\n- 重复的图形风格\n\n## Core Medium｜核心媒介\n观察性绘画、马克笔线条与协作式图形拼贴\n\n## Core Techniques｜核心技术\n\n- 依据直接观察进行绘画\n- 先识别大形，再处理细节\n- 比较相对大小与位置\n- 把房间和物品简化为视觉符号\n- 使用有限、一致的线条和色彩系统\n- 在协作指南中安排个人作品\n- 在收到观看者反馈后修改以提升清晰度\n\n## Previously Learned Techniques｜已学技术\n\n- 组合线条与形状\n- 在限定空间内安排物体\n- 使用前、侧、内、外\n- 创作简单的视觉符号\n- 使用绘画和拼贴材料\n- 进行一次有目的的修改\n\n## New Technical Demand｜新技术要求\n\n- 以更高的控制力，依据直接观察再现一件学校物品或一个学校空间\n- 为一套他人能理解的共享视觉系统作出贡献\n\n## Main Studio Project｜主要工作室项目\n\n### Project Title｜项目标题\n我们的校园视觉指南\n\n### Project Summary｜项目概述\n\n儿童对学校空间、物品或标识进行个人观察性研究。然后每位儿童发展出一项明确的指南贡献，如一张图示空间卡、一个地标符号、一个路线标记或一幅简化环境画。班级把挑选出的作品组织成一份协作的视觉指南、地图或图示校园环境。\n\n### Creative Brief｜创作简述\n\n帮助另一个人通过画面、符号和清晰的视觉组织理解我们的学校。\n\n### Required Artistic Decisions｜必做艺术选择\n\n- 选择哪一个学校空间、物品或地标来表现\n- 哪些形状和细节是必要的\n- 哪些符号、线条或色彩选择让画面更清晰\n\n### Open Choices｜开放选择\n\n- 实景写生或观察性空间图示\n- 视角\n- 地标\n- 符号设计\n- 路线标记\n- 有限的色彩搭配\n- 个人或两人合作完成\n- 指南的呈现形式\n\n## Art Encounters｜艺术接触\n\n### Featured Artists / Artworks｜重点艺术家 / 作品\n\n- 精选的保罗·克利（Paul Klee）城市构图\n- 精选的索尔·斯坦伯格（Saul Steinberg）线描作品\n- 建筑速写\n- 学校导视系统\n- 当代学校建筑\n- 精选的中国建筑图纸与平面图\n\n### Movement / Tradition / Visual Context｜艺术运动 / 传统 / 视觉背景\n\n- 建筑\n- 插画\n- 图形沟通\n- 制图\n- 导视设计\n\n### Looking Focus｜观察重点\n\n- 艺术家和设计师会把场所简化\n- 轮廓和符号可以传达位置\n- 平面图和地图组织空间\n- 重复的色彩、形状和图标构成一套视觉系统\n- 视角决定我们能看到什么\n\n### Comparative References｜对比参考\n\n- 一幅建筑速写\n- 一张图示地图\n- 一套学校标识系统\n- 一张中国建筑平面图或图纸\n- 一个儿童友好的导视案例\n\n### Studio Connection｜工作室联结\n\n儿童观察艺术家和设计师如何把复杂的空间变得可读懂，再创作属于自己的校园指南元素，而不是复制某一幅地图或教师绘制的平面图。\n\n### What Is Not Required｜不要求的内容\n\n- 记忆艺术家姓名\n- 技术性建筑制图\n- 精确比例\n- 大量文字标签\n- 复制教师主图\n- 再现克利或斯坦伯格的风格\n\n### Cultural Sensitivity Notes｜文化敏感性提示\n\n建筑参考应代表多样化的学校与建成环境，不以规模、造价或现代程度为标准做高低排序。中国建筑图纸应作为具体的视觉传统来呈现，而非装饰性母题。\n\n## Teacher Art Concepts｜教师美术概念\n\n### Core Concepts｜核心概念\n\n- 观察\n- 轮廓\n- 形状\n- 比例\n- 视角\n- 前景\n- 背景\n- 符号\n- 指南\n\n### Teacher Routine Language｜教师常规语言\n\n（教师在课堂中使用的英文提示语；用于组织观察、引导比较和推动协作思考。）\n\n- Look before you draw.\n- Which shape is largest?\n- What is in front?\n- What is behind?\n- Which detail helps us recognise the place?\n- Can another person understand this symbol?\n- What should stay consistent?\n\n### Light Theme Language｜轻量主题语言\n\n（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）\n\n- classroom\n- chair\n- desk\n- door\n- window\n- playground\n- in\n- on\n- next to\n- under\n\n## Unit Learning Outcomes｜单元学习成果\n\n### Explore and Understand｜探索与理解\n\n到本单元结束，儿童应越来越能够：\n\n- 在学校环境中观察到大形、较小的细节以及相互位置关系\n- 在实景观察中辨认前景与背景\n- 识别符号和重复的图形选择如何支持寻路与定位\n\n### Make and Apply｜创作与应用\n\n到本单元结束，儿童应越来越能够：\n\n- 创作一幅有清晰轮廓和精选细节的观察性绘画\n- 把一个场所、物品或地标简化为视觉符号\n- 更刻意地使用相对大小和位置安排\n- 为一份风格一致的协作指南作出贡献\n- 为更清晰的表达修改一个局部\n\n### Express and Reflect｜表达与反思\n\n到本单元结束，儿童应越来越能够：\n\n- 说出自己表现的是学校的哪一处空间或哪一件物品\n- 解释自己做出的一项视觉符号选择\n- 借助观看者的反馈提升画面清晰度\n- 意识到不同视角会画出不同的画面\n\n## Four-Lesson Studio Sequence｜四课工作室序列\n\n### Lesson 1 — Explore and Notice｜第 1 课 — 探索与观察\n\n儿童对比建筑速写、地图和导视图形，然后对学校物品和空间进行直接观察性研究。\n\n### Lesson 2 — Skill Studio｜第 2 课 — 技能工作室\n\n儿童练习比例、前景与背景，并在有限图形系统的框架下发展简单的校园符号。\n\n### Lesson 3 — Create｜第 3 课 — 创作\n\n儿童依据直接观察创作一项个人视觉指南贡献，并开始进行协作式排布。\n\n### Lesson 4 — Develop and Share｜第 4 课 — 发展与分享\n\n儿童让观看者试用指南，为更清晰而修改一个元素，并完成协作式展示。\n\n## Materials and Preparation｜材料与准备\n\n### Core Materials｜核心材料\n\n- 素描纸与画板夹\n- 铅笔\n- 选择性使用的橡皮\n- 黑色细头和中头马克笔\n- 彩色马克笔或彩色铅笔\n- 彩色纸\n- 胶棒\n- 儿童安全剪刀\n- 大幅协作底纸\n- 学校空间的照片\n- 姓名标签\n\n### Optional Materials｜可选材料\n\n- 透明描摹片\n- 简易取景框\n- 可移除胶\n- 仅供教师参考的打印平面图片段\n- 可重复使用的图标卡\n- 相机或平板电脑\n\n### Teacher Preparation｜教师准备\n\n- 确定安全的观察位置\n- 选择两到三个视觉特征鲜明的学校空间\n- 规划一条校园步行路线\n- 为需要固定参考的儿童拍摄空间照片\n- 挑选适龄的建筑和导视参考资料\n- 准备一套有限的色彩和图标系统用于讨论，不用于复制\n- 准备大幅底纸和临时的排布空间\n\n### Space Requirements｜空间需求\n\n- 在监督下用于观察的校园走廊和共享空间\n- 教室或美术教室的桌子\n- 用于协作排布的地面或墙面区域\n- 便于观看者到达的展示区\n\n### Drying and Storage｜晾干与收纳\n\n将观察性研究和符号尝试平放保存。指南贡献按姓名标签分入文件夹。协作规划阶段使用可移除的粘贴方式，最终粘贴前再行固定。\n\n### Safety Notes｜安全提示\n\n- 校园步行过程中持续监督\n- 不要堵塞走廊或门口\n- 安全使用画板夹\n- 在照片中保护师生隐私\n- 避免绘制或拍摄受限区域\n\n## Differentiation｜分层支持\n\n### Support｜基础支持\n\n- 提供一张固定照片或一件近距离观察物品\n- 用取景框框取一个局部\n- 聚焦两个大形和三个必要细节\n- 提供一组有限的符号形状\n- 允许两人一组共同观察\n- 提供更粗的马克笔和更大的纸\n\n### Extension｜拓展延伸\n\n- 从第二个视角再画同一处场所\n- 更刻意地比较前景与背景\n- 设计一个属于统一系列的符号\n- 使用重复标记补充一段路线顺序\n- 说明在简化过程中去掉了哪些细节\n\n### Motor and Access Adaptations｜运动与可达性适配\n\n- 提供适配握具\n- 稳固画板夹和纸张\n- 允许坐着观察\n- 使用放大的照片\n- 在剪贴是障碍时提供预剪好的拼贴形状\n- 在不改变视觉决定的前提下允许成人协助装裱\n\n## Assessment and Observation｜评估与观察\n\n### Primary Observation Focus｜主要观察重点\n\n- 直接观察与精选细节的质量\n- 通过符号和组织实现的视觉沟通清晰度\n\n### Secondary Observation Focus｜次要观察重点\n\n- 相对大小与位置安排\n- 在观看者反馈后是否愿意修改\n- 对共享视觉系统的贡献\n\n### Evidence to Collect｜需收集的证据\n\n- 第 1 课的观察性研究\n- 第 2 课的符号或比例尝试\n- 最终的指南贡献\n- 儿童口述说明\n- 协作指南的照片\n\n### Child Voice Prompt｜儿童表达引导\n\n（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）\n\n- Which school place or object did you show?\n- Which detail helps people recognise it?\n- What did you change so the guide was clearer?\n\n## Portfolio Outcome｜作品集成果\n\n### Required Portfolio Evidence｜必备作品集证据\n\n- 一幅观察性学校绘画\n- 一份符号或图形系统研究\n- 最终的视觉指南贡献\n- 一段儿童口述说明记录\n\n### Optional Portfolio Evidence｜可选作品集证据\n\n- 第二视角的绘画\n- 修改前后对比\n- 协作指南照片\n- 教师基线记录\n\n### Progress Comparison｜进展对比\n\n本单元为 K2 阶段的观察、组织与修改建立基线。后续 K2 单元应呈现出更稳定比例、更有意识的构图和更独立的规划。\n\n## Display and Sharing｜展示与分享\n\n### Display Opportunity｜展示机会\n将 **我们的校园视觉指南** 安装在教室、入口或其他合适的校园空间附近。\n\n### Sharing Format｜分享形式\n\n- 同伴寻路测试\n- 小组指南导览\n- 画廊漫步\n- 访客解读\n\n## Progression Link｜进阶衔接\n\n### Builds From｜承接自\n\n承接自 K1 Unit 2 教室地图壁画和 K1 Unit 4 早期空间排布，同时提升观察准确度、图形一致性和面向观看者的沟通能力。\n\n### Prepares For｜衔接至\n\n衔接至 K2 Unit 2 有控制的人物肖像观察、K2 Unit 5 有计划的搭建，以及后续的叙事与环境构图。\n\n## Boundary Notes｜边界提示\n\n- 本任务不是书写任务\n- 不要求大量英语标签\n- 空间准确度次于清晰的视觉沟通\n- 不要给儿童一份教师绘制的主图让其复制\n- 不要把所有绘画都标准化为同一种成人风格\n- 不要把学校词汇的掌握作为美术成果来评估\n- 避免添加过多装饰而削弱指南的清晰度\n- 在观察过程中保持隐私和通行边界\n\n## Unit 5 Bridge Note｜Unit 5 衔接说明\n\n不适用。\n",
        "overview": [
          {
            "key": "Unit Identity",
            "title": "单元信息",
            "blocks": [],
            "subsections": [
              {
                "key": "Grade",
                "title": "年级",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "K2"
                  }
                ]
              },
              {
                "key": "Unit Number",
                "title": "单元编号",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "1"
                  }
                ]
              },
              {
                "key": "Unit Theme",
                "title": "单元主题",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "我们的新学校"
                  }
                ]
              },
              {
                "key": "Semester",
                "title": "学期",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "秋季"
                  }
                ]
              },
              {
                "key": "Unit Position",
                "title": "单元位置",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "秋季 1"
                  }
                ]
              },
              {
                "key": "Unit Type",
                "title": "单元类型",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "标准单元"
                  }
                ]
              },
              {
                "key": "Developmental Stage",
                "title": "发展阶段",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "发展与组织阶段：观察与控制"
                  }
                ]
              }
            ]
          },
          {
            "key": "Unit Artistic Focus",
            "title": "单元艺术重点",
            "blocks": [
              {
                "type": "paragraph",
                "text": "儿童从不同视角观察学校空间、家具、标识、路线和建筑特征。他们把所见事物简化为清晰的轮廓、形状和视觉符号，然后为一份协作完成的校园指南贡献一幅个人观察性绘画和一个图形元素。"
              }
            ],
            "subsections": []
          },
          {
            "key": "Grade-Level Rationale",
            "title": "年级阶段依据",
            "blocks": [
              {
                "type": "paragraph",
                "text": "K2 以回归校园和建立观察基线作为开始。儿童已经准备好从「命名熟悉物品」向前一步，开始比较比例、视角、前景和背景。学校环境提供了一个有意义、共同关心的题材，让教师可以借此观察儿童的绘画控制力、视觉组织能力、符号使用和早期修改意识。"
              }
            ],
            "subsections": []
          },
          {
            "key": "Theme Connection",
            "title": "主题联结",
            "blocks": [
              {
                "type": "paragraph",
                "text": "「Our New School / 我们的新学校」主题提供教室、走廊、共享空间、标识和路线作为描绘对象。Power Up Level 1 的语言可以自然地通过 `classroom`、`chair`、`desk`、`door`、`window`、`playground` 以及介词 `in` / `on` / `next to` / `under` 复现；本美术单元不要求英语标签、英语问答操练或英语读图。本单元的美术学习仍然是观察、简化、视觉沟通和协作式图形组织。"
              }
            ],
            "subsections": []
          },
          {
            "key": "Primary Art Domain",
            "title": "主艺术领域",
            "blocks": [
              {
                "type": "paragraph",
                "text": "观察与再现"
              }
            ],
            "subsections": []
          },
          {
            "key": "Supporting Art Domains",
            "title": "辅助艺术领域",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "绘画与笔触",
                  "构图与视觉组织",
                  "材料、过程与反思"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Core Visual Elements",
            "title": "核心视觉元素",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "轮廓",
                  "几何形与有机形",
                  "相对大小",
                  "前景与背景",
                  "视角",
                  "路线",
                  "视觉符号",
                  "重复的图形风格"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Core Medium",
            "title": "核心媒介",
            "blocks": [
              {
                "type": "paragraph",
                "text": "观察性绘画、马克笔线条与协作式图形拼贴"
              }
            ],
            "subsections": []
          },
          {
            "key": "Core Techniques",
            "title": "核心技术",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "依据直接观察进行绘画",
                  "先识别大形，再处理细节",
                  "比较相对大小与位置",
                  "把房间和物品简化为视觉符号",
                  "使用有限、一致的线条和色彩系统",
                  "在协作指南中安排个人作品",
                  "在收到观看者反馈后修改以提升清晰度"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Previously Learned Techniques",
            "title": "已学技术",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "组合线条与形状",
                  "在限定空间内安排物体",
                  "使用前、侧、内、外",
                  "创作简单的视觉符号",
                  "使用绘画和拼贴材料",
                  "进行一次有目的的修改"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "New Technical Demand",
            "title": "新技术要求",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "以更高的控制力，依据直接观察再现一件学校物品或一个学校空间",
                  "为一套他人能理解的共享视觉系统作出贡献"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Main Studio Project",
            "title": "主要工作室项目",
            "blocks": [],
            "subsections": [
              {
                "key": "Project Title",
                "title": "项目标题",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "我们的校园视觉指南"
                  }
                ]
              },
              {
                "key": "Project Summary",
                "title": "项目概述",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童对学校空间、物品或标识进行个人观察性研究。然后每位儿童发展出一项明确的指南贡献，如一张图示空间卡、一个地标符号、一个路线标记或一幅简化环境画。班级把挑选出的作品组织成一份协作的视觉指南、地图或图示校园环境。"
                  }
                ]
              },
              {
                "key": "Creative Brief",
                "title": "创作简述",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "帮助另一个人通过画面、符号和清晰的视觉组织理解我们的学校。"
                  }
                ]
              },
              {
                "key": "Required Artistic Decisions",
                "title": "必做艺术选择",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "选择哪一个学校空间、物品或地标来表现",
                      "哪些形状和细节是必要的",
                      "哪些符号、线条或色彩选择让画面更清晰"
                    ]
                  }
                ]
              },
              {
                "key": "Open Choices",
                "title": "开放选择",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "实景写生或观察性空间图示",
                      "视角",
                      "地标",
                      "符号设计",
                      "路线标记",
                      "有限的色彩搭配",
                      "个人或两人合作完成",
                      "指南的呈现形式"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Art Encounters",
            "title": "艺术接触",
            "blocks": [],
            "subsections": [
              {
                "key": "Featured Artists / Artworks",
                "title": "重点艺术家 / 作品",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "精选的保罗·克利（Paul Klee）城市构图",
                      "精选的索尔·斯坦伯格（Saul Steinberg）线描作品",
                      "建筑速写",
                      "学校导视系统",
                      "当代学校建筑",
                      "精选的中国建筑图纸与平面图"
                    ]
                  }
                ]
              },
              {
                "key": "Movement / Tradition / Visual Context",
                "title": "艺术运动 / 传统 / 视觉背景",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "建筑",
                      "插画",
                      "图形沟通",
                      "制图",
                      "导视设计"
                    ]
                  }
                ]
              },
              {
                "key": "Looking Focus",
                "title": "观察重点",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "艺术家和设计师会把场所简化",
                      "轮廓和符号可以传达位置",
                      "平面图和地图组织空间",
                      "重复的色彩、形状和图标构成一套视觉系统",
                      "视角决定我们能看到什么"
                    ]
                  }
                ]
              },
              {
                "key": "Comparative References",
                "title": "对比参考",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "一幅建筑速写",
                      "一张图示地图",
                      "一套学校标识系统",
                      "一张中国建筑平面图或图纸",
                      "一个儿童友好的导视案例"
                    ]
                  }
                ]
              },
              {
                "key": "Studio Connection",
                "title": "工作室联结",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童观察艺术家和设计师如何把复杂的空间变得可读懂，再创作属于自己的校园指南元素，而不是复制某一幅地图或教师绘制的平面图。"
                  }
                ]
              },
              {
                "key": "What Is Not Required",
                "title": "不要求的内容",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "记忆艺术家姓名",
                      "技术性建筑制图",
                      "精确比例",
                      "大量文字标签",
                      "复制教师主图",
                      "再现克利或斯坦伯格的风格"
                    ]
                  }
                ]
              },
              {
                "key": "Cultural Sensitivity Notes",
                "title": "文化敏感性提示",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "建筑参考应代表多样化的学校与建成环境，不以规模、造价或现代程度为标准做高低排序。中国建筑图纸应作为具体的视觉传统来呈现，而非装饰性母题。"
                  }
                ]
              }
            ]
          },
          {
            "key": "Teacher Art Concepts",
            "title": "教师美术概念",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Concepts",
                "title": "核心概念",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "观察",
                      "轮廓",
                      "形状",
                      "比例",
                      "视角",
                      "前景",
                      "背景",
                      "符号",
                      "指南"
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Routine Language",
                "title": "教师常规语言",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "（教师在课堂中使用的英文提示语；用于组织观察、引导比较和推动协作思考。）"
                  },
                  {
                    "type": "list",
                    "items": [
                      "Look before you draw.",
                      "Which shape is largest?",
                      "What is in front?",
                      "What is behind?",
                      "Which detail helps us recognise the place?",
                      "Can another person understand this symbol?",
                      "What should stay consistent?"
                    ]
                  }
                ]
              },
              {
                "key": "Light Theme Language",
                "title": "轻量主题语言",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）"
                  },
                  {
                    "type": "list",
                    "items": [
                      "classroom",
                      "chair",
                      "desk",
                      "door",
                      "window",
                      "playground",
                      "in",
                      "on",
                      "next to",
                      "under"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Unit Learning Outcomes",
            "title": "单元学习成果",
            "blocks": [],
            "subsections": [
              {
                "key": "Explore and Understand",
                "title": "探索与理解",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "到本单元结束，儿童应越来越能够："
                  },
                  {
                    "type": "list",
                    "items": [
                      "在学校环境中观察到大形、较小的细节以及相互位置关系",
                      "在实景观察中辨认前景与背景",
                      "识别符号和重复的图形选择如何支持寻路与定位"
                    ]
                  }
                ]
              },
              {
                "key": "Make and Apply",
                "title": "创作与应用",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "到本单元结束，儿童应越来越能够："
                  },
                  {
                    "type": "list",
                    "items": [
                      "创作一幅有清晰轮廓和精选细节的观察性绘画",
                      "把一个场所、物品或地标简化为视觉符号",
                      "更刻意地使用相对大小和位置安排",
                      "为一份风格一致的协作指南作出贡献",
                      "为更清晰的表达修改一个局部"
                    ]
                  }
                ]
              },
              {
                "key": "Express and Reflect",
                "title": "表达与反思",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "到本单元结束，儿童应越来越能够："
                  },
                  {
                    "type": "list",
                    "items": [
                      "说出自己表现的是学校的哪一处空间或哪一件物品",
                      "解释自己做出的一项视觉符号选择",
                      "借助观看者的反馈提升画面清晰度",
                      "意识到不同视角会画出不同的画面"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Four-Lesson Studio Sequence",
            "title": "四课工作室序列",
            "blocks": [],
            "subsections": [
              {
                "key": "Lesson 1 — Explore and Notice",
                "title": "第 1 课 — 探索与观察",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童对比建筑速写、地图和导视图形，然后对学校物品和空间进行直接观察性研究。"
                  }
                ]
              },
              {
                "key": "Lesson 2 — Skill Studio",
                "title": "第 2 课 — 技能工作室",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童练习比例、前景与背景，并在有限图形系统的框架下发展简单的校园符号。"
                  }
                ]
              },
              {
                "key": "Lesson 3 — Create",
                "title": "第 3 课 — 创作",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童依据直接观察创作一项个人视觉指南贡献，并开始进行协作式排布。"
                  }
                ]
              },
              {
                "key": "Lesson 4 — Develop and Share",
                "title": "第 4 课 — 发展与分享",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童让观看者试用指南，为更清晰而修改一个元素，并完成协作式展示。"
                  }
                ]
              }
            ]
          },
          {
            "key": "Materials and Preparation",
            "title": "材料与准备",
            "blocks": [],
            "subsections": [
              {
                "key": "Core Materials",
                "title": "核心材料",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "素描纸与画板夹",
                      "铅笔",
                      "选择性使用的橡皮",
                      "黑色细头和中头马克笔",
                      "彩色马克笔或彩色铅笔",
                      "彩色纸",
                      "胶棒",
                      "儿童安全剪刀",
                      "大幅协作底纸",
                      "学校空间的照片",
                      "姓名标签"
                    ]
                  }
                ]
              },
              {
                "key": "Optional Materials",
                "title": "可选材料",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "透明描摹片",
                      "简易取景框",
                      "可移除胶",
                      "仅供教师参考的打印平面图片段",
                      "可重复使用的图标卡",
                      "相机或平板电脑"
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Preparation",
                "title": "教师准备",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "确定安全的观察位置",
                      "选择两到三个视觉特征鲜明的学校空间",
                      "规划一条校园步行路线",
                      "为需要固定参考的儿童拍摄空间照片",
                      "挑选适龄的建筑和导视参考资料",
                      "准备一套有限的色彩和图标系统用于讨论，不用于复制",
                      "准备大幅底纸和临时的排布空间"
                    ]
                  }
                ]
              },
              {
                "key": "Space Requirements",
                "title": "空间需求",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "在监督下用于观察的校园走廊和共享空间",
                      "教室或美术教室的桌子",
                      "用于协作排布的地面或墙面区域",
                      "便于观看者到达的展示区"
                    ]
                  }
                ]
              },
              {
                "key": "Drying and Storage",
                "title": "晾干与收纳",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "将观察性研究和符号尝试平放保存。指南贡献按姓名标签分入文件夹。协作规划阶段使用可移除的粘贴方式，最终粘贴前再行固定。"
                  }
                ]
              },
              {
                "key": "Safety Notes",
                "title": "安全提示",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "校园步行过程中持续监督",
                      "不要堵塞走廊或门口",
                      "安全使用画板夹",
                      "在照片中保护师生隐私",
                      "避免绘制或拍摄受限区域"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Differentiation",
            "title": "分层支持",
            "blocks": [],
            "subsections": [
              {
                "key": "Support",
                "title": "基础支持",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "提供一张固定照片或一件近距离观察物品",
                      "用取景框框取一个局部",
                      "聚焦两个大形和三个必要细节",
                      "提供一组有限的符号形状",
                      "允许两人一组共同观察",
                      "提供更粗的马克笔和更大的纸"
                    ]
                  }
                ]
              },
              {
                "key": "Extension",
                "title": "拓展延伸",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "从第二个视角再画同一处场所",
                      "更刻意地比较前景与背景",
                      "设计一个属于统一系列的符号",
                      "使用重复标记补充一段路线顺序",
                      "说明在简化过程中去掉了哪些细节"
                    ]
                  }
                ]
              },
              {
                "key": "Motor and Access Adaptations",
                "title": "运动与可达性适配",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "提供适配握具",
                      "稳固画板夹和纸张",
                      "允许坐着观察",
                      "使用放大的照片",
                      "在剪贴是障碍时提供预剪好的拼贴形状",
                      "在不改变视觉决定的前提下允许成人协助装裱"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Assessment and Observation",
            "title": "评估与观察",
            "blocks": [],
            "subsections": [
              {
                "key": "Primary Observation Focus",
                "title": "主要观察重点",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "直接观察与精选细节的质量",
                      "通过符号和组织实现的视觉沟通清晰度"
                    ]
                  }
                ]
              },
              {
                "key": "Secondary Observation Focus",
                "title": "次要观察重点",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "相对大小与位置安排",
                      "在观看者反馈后是否愿意修改",
                      "对共享视觉系统的贡献"
                    ]
                  }
                ]
              },
              {
                "key": "Evidence to Collect",
                "title": "需收集的证据",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "第 1 课的观察性研究",
                      "第 2 课的符号或比例尝试",
                      "最终的指南贡献",
                      "儿童口述说明",
                      "协作指南的照片"
                    ]
                  }
                ]
              },
              {
                "key": "Child Voice Prompt",
                "title": "儿童表达引导",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）"
                  },
                  {
                    "type": "list",
                    "items": [
                      "Which school place or object did you show?",
                      "Which detail helps people recognise it?",
                      "What did you change so the guide was clearer?"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Portfolio Outcome",
            "title": "作品集成果",
            "blocks": [],
            "subsections": [
              {
                "key": "Required Portfolio Evidence",
                "title": "必备作品集证据",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "一幅观察性学校绘画",
                      "一份符号或图形系统研究",
                      "最终的视觉指南贡献",
                      "一段儿童口述说明记录"
                    ]
                  }
                ]
              },
              {
                "key": "Optional Portfolio Evidence",
                "title": "可选作品集证据",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "第二视角的绘画",
                      "修改前后对比",
                      "协作指南照片",
                      "教师基线记录"
                    ]
                  }
                ]
              },
              {
                "key": "Progress Comparison",
                "title": "进展对比",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "本单元为 K2 阶段的观察、组织与修改建立基线。后续 K2 单元应呈现出更稳定比例、更有意识的构图和更独立的规划。"
                  }
                ]
              }
            ]
          },
          {
            "key": "Display and Sharing",
            "title": "展示与分享",
            "blocks": [],
            "subsections": [
              {
                "key": "Display Opportunity",
                "title": "展示机会",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "将 **我们的校园视觉指南** 安装在教室、入口或其他合适的校园空间附近。"
                  }
                ]
              },
              {
                "key": "Sharing Format",
                "title": "分享形式",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "同伴寻路测试",
                      "小组指南导览",
                      "画廊漫步",
                      "访客解读"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "key": "Progression Link",
            "title": "进阶衔接",
            "blocks": [],
            "subsections": [
              {
                "key": "Builds From",
                "title": "承接自",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "承接自 K1 Unit 2 教室地图壁画和 K1 Unit 4 早期空间排布，同时提升观察准确度、图形一致性和面向观看者的沟通能力。"
                  }
                ]
              },
              {
                "key": "Prepares For",
                "title": "衔接至",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "衔接至 K2 Unit 2 有控制的人物肖像观察、K2 Unit 5 有计划的搭建，以及后续的叙事与环境构图。"
                  }
                ]
              }
            ]
          },
          {
            "key": "Boundary Notes",
            "title": "边界提示",
            "blocks": [
              {
                "type": "list",
                "items": [
                  "本任务不是书写任务",
                  "不要求大量英语标签",
                  "空间准确度次于清晰的视觉沟通",
                  "不要给儿童一份教师绘制的主图让其复制",
                  "不要把所有绘画都标准化为同一种成人风格",
                  "不要把学校词汇的掌握作为美术成果来评估",
                  "避免添加过多装饰而削弱指南的清晰度",
                  "在观察过程中保持隐私和通行边界"
                ]
              }
            ],
            "subsections": []
          },
          {
            "key": "Unit 5 Bridge Note",
            "title": "Unit 5 衔接说明",
            "blocks": [
              {
                "type": "paragraph",
                "text": "不适用。"
              }
            ],
            "subsections": []
          }
        ],
        "lessons": [
          {
            "id": "lesson-01",
            "lessonNumber": 1,
            "title": "仔细观察学校",
            "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/02_translations/zh_cn/01_lesson_1_zh_cn.md",
            "sourceMarkdown": "# Lesson 1: Observe the School Carefully｜第 1 课：仔细观察学校\n\n## Lesson Identity｜课程信息\n\n### Lesson Number｜课次\n\n1\n\n### Studio Phase｜工作室阶段\n探索与观察\n\n### Primary Art Domain｜主艺术领域\n观察与再现\n\n### Supporting Art Domains｜辅助艺术领域\n\n- 绘画与笔触\n- 艺术接触与文化感知\n\n## Lesson Artistic Focus｜课程艺术重点\n\n儿童对比建筑速写、地图和学校标识，然后对一处学校空间、一个地标或一件物品进行直接观察性研究。\n\n## Connection to Unit Project｜与单元项目的关联\n\n本节课为视觉指南提供主要的观察证据和可能的描绘题材。\n\n## Learning Outcomes｜学习成果\n\n### Explore and Understand｜探索与理解\n\n儿童应越来越能够：\n\n- 先识别大形，再处理较小的细节\n- 注意到前景与背景\n- 比较同一场所或同一物品的两种视角\n\n### Make and Apply｜创作与应用\n\n儿童应越来越能够：\n\n- 依据直接观察画出一幅精选了细节的画\n- 以逐步提升的控制力使用轮廓和简单的内部线条\n\n### Express and Reflect｜表达与反思\n\n儿童应越来越能够：\n\n- 说明哪一个细节让所画对象可以被认出\n\n## Art Encounter｜艺术接触\n\n### Featured Reference｜重点参考\n\n- 一幅建筑速写\n- 精选的索尔·斯坦伯格（Saul Steinberg）线描作品\n- 精选的保罗·克利（Paul Klee）城市构图\n- 一个简单的学校导视案例\n\n### Looking Focus｜观察重点\n\n- 被简化的轮廓\n- 大形与小形\n- 视角\n- 标识与符号\n- 细节的取舍\n\n### Looking Questions｜观察提问\n\n- Which shapes are largest?\n- What is in front?\n- What is behind?\n- Which details were simplified?\n- How does the symbol help another person?\n\n### Movement or Sensory Response｜动作或感官反应\n\n儿童用取景框或手框框取房间的一个局部，然后变换位置，观察什么出现了、什么消失了。\n\n### Studio Connection｜工作室联结\n\n儿童依据直接观察，画出一件学校物品、一个角落或一处空间。\n\n## Teacher Art Concepts｜教师美术概念\n\n### Core Concepts｜核心概念\n\n- 观察\n- 轮廓\n- 视角\n- 前景\n- 背景\n- 细节\n\n### Teacher Routine Language｜教师常规语言\n\n（教师在课堂中使用的英文提示语；用于组织观察、引导比较和推动协作思考。）\n\n- Look for longer than you draw.\n- Start with the largest shape.\n- What is in front?\n- Which line shows the edge?\n- Which detail do you really need?\n\n### Light Theme Language｜轻量主题语言\n\n（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）\n\n- school\n- classroom\n- playground\n- library\n- hall\n\n## Materials｜材料\n\n### Core Materials｜核心材料\n\n- 素描纸\n- 画板夹\n- 铅笔\n- 在初步观察之后使用的黑色马克笔\n- 取景框\n- 精选参考资料\n\n### Optional Materials｜可选材料\n\n- 相机或平板电脑\n- 放大的学校照片\n- 用于视角对比的透明描摹片\n\n### Preparation｜准备\n\n- 选择安全的观察站点\n- 规划路线并安排监督\n- 把儿童安排在能看清、又不妨碍通行的地方\n- 准备一种固定参考的替代方案\n\n## Studio Sequence｜工作室序列\n\n### 1. Arrival and Visual Invitation｜1. 导入与视觉邀请\n\n对比一幅建筑速写、一张图示地图和一块标识，说出每一种媒介传达了哪些信息。\n\n### 2. Art Encounter｜2. 艺术接触\n\n讨论简化、视角和必要细节。\n\n### 3. Teacher Demonstration｜3. 教师示范\n\n观察一件学校物品。画出最大形状作为基础，加入相对较小的形状，只选取两到三个可识别的细节。\n\n### 4. Material Exploration｜4. 材料探索\n\n儿童在选定的学校位置进行直接观察性研究。\n\n### 5. Pause and Notice｜5. 暂停与观察\n\n儿童把画面与对象对比，找出一个遗漏的或多余的细节。\n\n### 6. Continue and Select｜6. 继续与选择\n\n儿童修改研究或再画一幅快速的第二视角。\n\n### 7. Reflection and Clean-Up｜7. 反思与整理\n\n儿童用口语为所画对象起名，并挑选一幅研究用于后续发展。\n\n## Teacher Prompts｜教师提问\n\n- Which shape should you draw first?\n- Is this part larger or smaller?\n- What overlaps?\n- What can you see from this viewpoint?\n- Which detail helps us know the place?\n\n## Differentiation｜分层支持\n\n### Support｜基础支持\n\n- 使用一件物品或一张裁剪过的照片\n- 聚焦两个主要形状\n- 提供取景框\n- 提供更粗的绘画工具\n\n### Extension｜拓展延伸\n\n- 做一幅第二视角的研究\n- 加入前景重叠\n- 比较变换位置后发生的变化\n\n### Motor and Access Adaptations｜运动与可达性适配\n\n- 提供坐着观察的安排\n- 稳固画板夹\n- 使用适配握具\n- 允许使用放大的照片\n\n## Assessment and Observation｜评估与观察\n\n### Primary Observation Focus｜主要观察重点\n\n- 真实地看对象的行为\n- 对大形、相对位置和精选细节的运用\n\n### Evidence to Collect｜需收集的证据\n\n- 观察性研究\n- 可选的第二视角照片\n- 教师记录\n\n### Child Voice Prompt｜儿童表达引导\n\n（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）\n\n- Which detail helps us recognise this place?\n\n## Clean-Up and Storage｜整理与收纳\n\n将挑选出的研究平放保存。归还画板夹和观察工具。确认所有儿童已安全离开观察空间。\n\n## Safety Notes｜安全提示\n\n- 保持路线和门口畅通\n- 监督走动过程\n- 不要观察受限或私密空间\n\n## Teacher Reflection｜教师反思\n\n### What to Review Before Lesson 2｜进入第 2 课前需要回顾\n\n- 哪些儿童在依靠观察而不是记忆\n- 哪些儿童需要比例或符号方面的支持\n",
            "sections": [
              {
                "key": "Lesson Identity",
                "title": "课程信息",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Lesson Number",
                    "title": "课次",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "1"
                      }
                    ]
                  },
                  {
                    "key": "Studio Phase",
                    "title": "工作室阶段",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "探索与观察"
                      }
                    ]
                  },
                  {
                    "key": "Primary Art Domain",
                    "title": "主艺术领域",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "观察与再现"
                      }
                    ]
                  },
                  {
                    "key": "Supporting Art Domains",
                    "title": "辅助艺术领域",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "绘画与笔触",
                          "艺术接触与文化感知"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Lesson Artistic Focus",
                "title": "课程艺术重点",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童对比建筑速写、地图和学校标识，然后对一处学校空间、一个地标或一件物品进行直接观察性研究。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Connection to Unit Project",
                "title": "与单元项目的关联",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "本节课为视觉指南提供主要的观察证据和可能的描绘题材。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Learning Outcomes",
                "title": "学习成果",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Explore and Understand",
                    "title": "探索与理解",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "先识别大形，再处理较小的细节",
                          "注意到前景与背景",
                          "比较同一场所或同一物品的两种视角"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Make and Apply",
                    "title": "创作与应用",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "依据直接观察画出一幅精选了细节的画",
                          "以逐步提升的控制力使用轮廓和简单的内部线条"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Express and Reflect",
                    "title": "表达与反思",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "说明哪一个细节让所画对象可以被认出"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Art Encounter",
                "title": "艺术接触",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Featured Reference",
                    "title": "重点参考",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "一幅建筑速写",
                          "精选的索尔·斯坦伯格（Saul Steinberg）线描作品",
                          "精选的保罗·克利（Paul Klee）城市构图",
                          "一个简单的学校导视案例"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Looking Focus",
                    "title": "观察重点",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "被简化的轮廓",
                          "大形与小形",
                          "视角",
                          "标识与符号",
                          "细节的取舍"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Looking Questions",
                    "title": "观察提问",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "Which shapes are largest?",
                          "What is in front?",
                          "What is behind?",
                          "Which details were simplified?",
                          "How does the symbol help another person?"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Movement or Sensory Response",
                    "title": "动作或感官反应",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童用取景框或手框框取房间的一个局部，然后变换位置，观察什么出现了、什么消失了。"
                      }
                    ]
                  },
                  {
                    "key": "Studio Connection",
                    "title": "工作室联结",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童依据直接观察，画出一件学校物品、一个角落或一处空间。"
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Art Concepts",
                "title": "教师美术概念",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Core Concepts",
                    "title": "核心概念",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "观察",
                          "轮廓",
                          "视角",
                          "前景",
                          "背景",
                          "细节"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Teacher Routine Language",
                    "title": "教师常规语言",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（教师在课堂中使用的英文提示语；用于组织观察、引导比较和推动协作思考。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "Look for longer than you draw.",
                          "Start with the largest shape.",
                          "What is in front?",
                          "Which line shows the edge?",
                          "Which detail do you really need?"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Light Theme Language",
                    "title": "轻量主题语言",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "school",
                          "classroom",
                          "playground",
                          "library",
                          "hall"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Materials",
                "title": "材料",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Core Materials",
                    "title": "核心材料",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "素描纸",
                          "画板夹",
                          "铅笔",
                          "在初步观察之后使用的黑色马克笔",
                          "取景框",
                          "精选参考资料"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Optional Materials",
                    "title": "可选材料",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "相机或平板电脑",
                          "放大的学校照片",
                          "用于视角对比的透明描摹片"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Preparation",
                    "title": "准备",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "选择安全的观察站点",
                          "规划路线并安排监督",
                          "把儿童安排在能看清、又不妨碍通行的地方",
                          "准备一种固定参考的替代方案"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Studio Sequence",
                "title": "工作室序列",
                "blocks": [],
                "subsections": [
                  {
                    "key": "1. Arrival and Visual Invitation",
                    "title": "1. 导入与视觉邀请",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "对比一幅建筑速写、一张图示地图和一块标识，说出每一种媒介传达了哪些信息。"
                      }
                    ]
                  },
                  {
                    "key": "2. Art Encounter",
                    "title": "2. 艺术接触",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "讨论简化、视角和必要细节。"
                      }
                    ]
                  },
                  {
                    "key": "3. Teacher Demonstration",
                    "title": "3. 教师示范",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "观察一件学校物品。画出最大形状作为基础，加入相对较小的形状，只选取两到三个可识别的细节。"
                      }
                    ]
                  },
                  {
                    "key": "4. Material Exploration",
                    "title": "4. 材料探索",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童在选定的学校位置进行直接观察性研究。"
                      }
                    ]
                  },
                  {
                    "key": "5. Pause and Notice",
                    "title": "5. 暂停与观察",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童把画面与对象对比，找出一个遗漏的或多余的细节。"
                      }
                    ]
                  },
                  {
                    "key": "6. Continue and Select",
                    "title": "6. 继续与选择",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童修改研究或再画一幅快速的第二视角。"
                      }
                    ]
                  },
                  {
                    "key": "7. Reflection and Clean-Up",
                    "title": "7. 反思与整理",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童用口语为所画对象起名，并挑选一幅研究用于后续发展。"
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Prompts",
                "title": "教师提问",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Which shape should you draw first?",
                      "Is this part larger or smaller?",
                      "What overlaps?",
                      "What can you see from this viewpoint?",
                      "Which detail helps us know the place?"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Differentiation",
                "title": "分层支持",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Support",
                    "title": "基础支持",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "使用一件物品或一张裁剪过的照片",
                          "聚焦两个主要形状",
                          "提供取景框",
                          "提供更粗的绘画工具"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Extension",
                    "title": "拓展延伸",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "做一幅第二视角的研究",
                          "加入前景重叠",
                          "比较变换位置后发生的变化"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Motor and Access Adaptations",
                    "title": "运动与可达性适配",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "提供坐着观察的安排",
                          "稳固画板夹",
                          "使用适配握具",
                          "允许使用放大的照片"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Assessment and Observation",
                "title": "评估与观察",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Primary Observation Focus",
                    "title": "主要观察重点",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "真实地看对象的行为",
                          "对大形、相对位置和精选细节的运用"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Evidence to Collect",
                    "title": "需收集的证据",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "观察性研究",
                          "可选的第二视角照片",
                          "教师记录"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Child Voice Prompt",
                    "title": "儿童表达引导",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "Which detail helps us recognise this place?"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Clean-Up and Storage",
                "title": "整理与收纳",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "将挑选出的研究平放保存。归还画板夹和观察工具。确认所有儿童已安全离开观察空间。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Safety Notes",
                "title": "安全提示",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "保持路线和门口畅通",
                      "监督走动过程",
                      "不要观察受限或私密空间"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Teacher Reflection",
                "title": "教师反思",
                "blocks": [],
                "subsections": [
                  {
                    "key": "What to Review Before Lesson 2",
                    "title": "进入第 2 课前需要回顾",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "哪些儿童在依靠观察而不是记忆",
                          "哪些儿童需要比例或符号方面的支持"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "lesson-02",
            "lessonNumber": 2,
            "title": "制作一个清晰的视觉符号",
            "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/02_translations/zh_cn/02_lesson_2_zh_cn.md",
            "sourceMarkdown": "# Lesson 2: Make a Clear Visual Symbol｜第 2 课：制作一个清晰的视觉符号\n\n## Lesson Identity｜课程信息\n\n### Lesson Number｜课次\n\n2\n\n### Studio Phase｜工作室阶段\n技能工作室\n\n### Primary Art Domain｜主艺术领域\n构图与视觉组织\n\n### Supporting Art Domains｜辅助艺术领域\n\n- 绘画与笔触\n- 材料、过程与反思\n\n## Lesson Artistic Focus｜课程艺术重点\n\n儿童练习把学校场所和物品简化为视觉符号，同时更刻意地使用相对大小、前景与背景。\n\n## Connection to Unit Project｜与单元项目的关联\n\n本节课建立起一套图形系统，用于把全班各人的贡献联系到同一份指南中。\n\n## Learning Outcomes｜学习成果\n\n### Explore and Understand｜探索与理解\n\n儿童应越来越能够：\n\n- 区分必要和非必要的视觉细节\n- 意识到重复的线条、形状或色彩选择如何形成一致性\n\n### Make and Apply｜创作与应用\n\n儿童应越来越能够：\n\n- 把一件观察到的物品或一处观察到的场所简化为清晰的符号\n- 在小幅构图中安排前景与背景\n- 尝试一套有限的图形系统\n\n### Express and Reflect｜表达与反思\n\n儿童应越来越能够：\n\n- 说明为什么一个符号是可读的\n\n## Technique Focus｜技术重点\n\n### Core Technique｜核心技术\n视觉简化与一致的符号设计\n\n### Previously Learned Technique｜已学技术\n观察性轮廓与精选细节\n\n### New Technical Demand｜新技术要求\n\n- 去除不必要的细节\n- 在一套符号内使用一致的线条粗细、形状或色彩\n\n### Technical Success Indicators｜技术成功指标\n\n- 简化后符号仍能被认出\n- 主要形状清晰\n- 色彩或线条使用受控且一致\n\n## Art Encounter or Process Reference｜艺术接触或过程参考\n\n### Featured Reference｜重点参考\n\n- 学校标识系统\n- 简洁的建筑平面图符号\n- 图示地图图标\n- 精选的中国建筑平面图局部\n\n### Process-Looking Focus｜过程观察重点\n\n- 一致性\n- 符号\n- 相对大小\n- 前景与背景\n- 视觉层次\n\n### Studio Connection｜工作室联结\n\n儿童把一个观察到的学校题材翻译为两个符号尝试，并选择更清晰的那一个。\n\n## Teacher Art Concepts｜教师美术概念\n\n### Core Concepts｜核心概念\n\n- 符号\n- 简化\n- 一致\n- 比例\n- 前景\n- 背景\n\n### Teacher Routine Language｜教师常规语言\n\n（教师在课堂中使用的英文提示语；用于引导简化、对比和一致性思考。）\n\n- What can you remove?\n- What must stay?\n- Is the main shape clear?\n- Use the same line or colour rule.\n- Which version is easier to understand?\n\n### Light Theme Language｜轻量主题语言\n\n（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）\n\n- map\n- classroom\n- playground\n- library\n- next to\n- between\n\n## Materials｜材料\n\n### Core Materials｜核心材料\n\n- 第 1 课的观察性研究\n- 小幅尝试卡\n- 铅笔\n- 黑色马克笔\n- 有限的彩色马克笔或彩色铅笔\n- 彩色纸\n- 胶棒\n\n### Preparation｜准备\n\n- 为每位儿童准备两个尝试卡空间\n- 为尝试选择一套有限的班级调色方案\n- 提供图标参考资料用于分析，不用于描摹\n\n## Studio Sequence｜工作室序列\n\n### 1. Revisit and Notice｜1. 重访与观察\n\n对比一幅观察性绘画和同一题材的简化符号。\n\n### 2. Focused Demonstration｜2. 重点示范\n\n把一件学校物品压缩到其主要轮廓和一个识别性细节。再做一个强调不同的版本。\n\n### 3. Guided Practice｜3. 引导练习\n\n儿童在第 1 课的研究中圈出必要细节，并做出第一个符号尝试。\n\n### 4. Independent Technique Trials｜4. 独立技术尝试\n\n儿童使用一致的线条、形状或色彩规则，做出第二个尝试。\n\n### 5. Compare and Adjust｜5. 对比与调整\n\n同伴指出每个符号代表什么。创作者以「清晰度」为依据进行修改，而不仅仅以个人偏好为依据。\n\n### 6. Select or Save Trials｜6. 选择或保存尝试\n\n儿童挑选更强的符号，或把两个尝试中有用的部分结合起来。\n\n### 7. Reflection and Clean-Up｜7. 反思与整理\n\n保存选出的符号，并记录所使用的图形规则。\n\n## Teacher Prompts｜教师提问\n\n- Which detail is essential?\n- Can you understand it without the small details?\n- What is the focal shape?\n- Does this symbol belong to the same system?\n- What did your partner understand?\n\n## Differentiation｜分层支持\n\n### Support｜基础支持\n\n- 提供裁剪过的参考图\n- 提供两个必要细节的备选\n- 只用一种黑色轮廓加一种颜色\n- 放大尝试卡\n\n### Extension｜拓展延伸\n\n- 创作两个相互关联的符号\n- 建立一套三个符号的小型系统\n- 刻意使用相对大小和重叠\n\n### Motor and Access Adaptations｜运动与可达性适配\n\n- 提供粗头马克笔\n- 使用预剪好的几何拼贴形\n- 稳固尝试卡\n- 允许成人代为记录符号含义\n\n## Assessment and Observation｜评估与观察\n\n### Primary Observation Focus｜主要观察重点\n\n- 简化的清晰度\n- 对一致视觉系统的使用\n\n### Evidence to Collect｜需收集的证据\n\n- 两个符号尝试\n- 选定的符号\n- 同伴解读记录\n\n### Child Voice Prompt｜儿童表达引导\n\n（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）\n\n- What did you keep so people could understand your symbol?\n\n## Clean-Up and Storage｜整理与收纳\n\n把选定的符号和观察性研究放在一起保存。归还有限调色材料。\n\n## Safety Notes｜安全提示\n\n- 如果使用拼贴，要监督剪刀使用\n- 保持图形参考内容合适，且不包含私密信息\n\n## Teacher Reflection｜教师反思\n\n### What to Review Before Lesson 3｜进入第 3 课前需要回顾\n\n- 哪种贡献形式最适合每位儿童\n- 哪些符号需要回到直接观察中再核验\n",
            "sections": [
              {
                "key": "Lesson Identity",
                "title": "课程信息",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Lesson Number",
                    "title": "课次",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "2"
                      }
                    ]
                  },
                  {
                    "key": "Studio Phase",
                    "title": "工作室阶段",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "技能工作室"
                      }
                    ]
                  },
                  {
                    "key": "Primary Art Domain",
                    "title": "主艺术领域",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "构图与视觉组织"
                      }
                    ]
                  },
                  {
                    "key": "Supporting Art Domains",
                    "title": "辅助艺术领域",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "绘画与笔触",
                          "材料、过程与反思"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Lesson Artistic Focus",
                "title": "课程艺术重点",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童练习把学校场所和物品简化为视觉符号，同时更刻意地使用相对大小、前景与背景。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Connection to Unit Project",
                "title": "与单元项目的关联",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "本节课建立起一套图形系统，用于把全班各人的贡献联系到同一份指南中。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Learning Outcomes",
                "title": "学习成果",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Explore and Understand",
                    "title": "探索与理解",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "区分必要和非必要的视觉细节",
                          "意识到重复的线条、形状或色彩选择如何形成一致性"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Make and Apply",
                    "title": "创作与应用",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "把一件观察到的物品或一处观察到的场所简化为清晰的符号",
                          "在小幅构图中安排前景与背景",
                          "尝试一套有限的图形系统"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Express and Reflect",
                    "title": "表达与反思",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "说明为什么一个符号是可读的"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Technique Focus",
                "title": "技术重点",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Core Technique",
                    "title": "核心技术",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "视觉简化与一致的符号设计"
                      }
                    ]
                  },
                  {
                    "key": "Previously Learned Technique",
                    "title": "已学技术",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "观察性轮廓与精选细节"
                      }
                    ]
                  },
                  {
                    "key": "New Technical Demand",
                    "title": "新技术要求",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "去除不必要的细节",
                          "在一套符号内使用一致的线条粗细、形状或色彩"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Technical Success Indicators",
                    "title": "技术成功指标",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "简化后符号仍能被认出",
                          "主要形状清晰",
                          "色彩或线条使用受控且一致"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Art Encounter or Process Reference",
                "title": "艺术接触或过程参考",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Featured Reference",
                    "title": "重点参考",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "学校标识系统",
                          "简洁的建筑平面图符号",
                          "图示地图图标",
                          "精选的中国建筑平面图局部"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Process-Looking Focus",
                    "title": "过程观察重点",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "一致性",
                          "符号",
                          "相对大小",
                          "前景与背景",
                          "视觉层次"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Studio Connection",
                    "title": "工作室联结",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童把一个观察到的学校题材翻译为两个符号尝试，并选择更清晰的那一个。"
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Art Concepts",
                "title": "教师美术概念",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Core Concepts",
                    "title": "核心概念",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "符号",
                          "简化",
                          "一致",
                          "比例",
                          "前景",
                          "背景"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Teacher Routine Language",
                    "title": "教师常规语言",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（教师在课堂中使用的英文提示语；用于引导简化、对比和一致性思考。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "What can you remove?",
                          "What must stay?",
                          "Is the main shape clear?",
                          "Use the same line or colour rule.",
                          "Which version is easier to understand?"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Light Theme Language",
                    "title": "轻量主题语言",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "map",
                          "classroom",
                          "playground",
                          "library",
                          "next to",
                          "between"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Materials",
                "title": "材料",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Core Materials",
                    "title": "核心材料",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "第 1 课的观察性研究",
                          "小幅尝试卡",
                          "铅笔",
                          "黑色马克笔",
                          "有限的彩色马克笔或彩色铅笔",
                          "彩色纸",
                          "胶棒"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Preparation",
                    "title": "准备",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "为每位儿童准备两个尝试卡空间",
                          "为尝试选择一套有限的班级调色方案",
                          "提供图标参考资料用于分析，不用于描摹"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Studio Sequence",
                "title": "工作室序列",
                "blocks": [],
                "subsections": [
                  {
                    "key": "1. Revisit and Notice",
                    "title": "1. 重访与观察",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "对比一幅观察性绘画和同一题材的简化符号。"
                      }
                    ]
                  },
                  {
                    "key": "2. Focused Demonstration",
                    "title": "2. 重点示范",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "把一件学校物品压缩到其主要轮廓和一个识别性细节。再做一个强调不同的版本。"
                      }
                    ]
                  },
                  {
                    "key": "3. Guided Practice",
                    "title": "3. 引导练习",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童在第 1 课的研究中圈出必要细节，并做出第一个符号尝试。"
                      }
                    ]
                  },
                  {
                    "key": "4. Independent Technique Trials",
                    "title": "4. 独立技术尝试",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童使用一致的线条、形状或色彩规则，做出第二个尝试。"
                      }
                    ]
                  },
                  {
                    "key": "5. Compare and Adjust",
                    "title": "5. 对比与调整",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "同伴指出每个符号代表什么。创作者以「清晰度」为依据进行修改，而不仅仅以个人偏好为依据。"
                      }
                    ]
                  },
                  {
                    "key": "6. Select or Save Trials",
                    "title": "6. 选择或保存尝试",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童挑选更强的符号，或把两个尝试中有用的部分结合起来。"
                      }
                    ]
                  },
                  {
                    "key": "7. Reflection and Clean-Up",
                    "title": "7. 反思与整理",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "保存选出的符号，并记录所使用的图形规则。"
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Prompts",
                "title": "教师提问",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "Which detail is essential?",
                      "Can you understand it without the small details?",
                      "What is the focal shape?",
                      "Does this symbol belong to the same system?",
                      "What did your partner understand?"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Differentiation",
                "title": "分层支持",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Support",
                    "title": "基础支持",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "提供裁剪过的参考图",
                          "提供两个必要细节的备选",
                          "只用一种黑色轮廓加一种颜色",
                          "放大尝试卡"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Extension",
                    "title": "拓展延伸",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "创作两个相互关联的符号",
                          "建立一套三个符号的小型系统",
                          "刻意使用相对大小和重叠"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Motor and Access Adaptations",
                    "title": "运动与可达性适配",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "提供粗头马克笔",
                          "使用预剪好的几何拼贴形",
                          "稳固尝试卡",
                          "允许成人代为记录符号含义"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Assessment and Observation",
                "title": "评估与观察",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Primary Observation Focus",
                    "title": "主要观察重点",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "简化的清晰度",
                          "对一致视觉系统的使用"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Evidence to Collect",
                    "title": "需收集的证据",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "两个符号尝试",
                          "选定的符号",
                          "同伴解读记录"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Child Voice Prompt",
                    "title": "儿童表达引导",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "What did you keep so people could understand your symbol?"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Clean-Up and Storage",
                "title": "整理与收纳",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "把选定的符号和观察性研究放在一起保存。归还有限调色材料。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Safety Notes",
                "title": "安全提示",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "如果使用拼贴，要监督剪刀使用",
                      "保持图形参考内容合适，且不包含私密信息"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Teacher Reflection",
                "title": "教师反思",
                "blocks": [],
                "subsections": [
                  {
                    "key": "What to Review Before Lesson 3",
                    "title": "进入第 3 课前需要回顾",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "哪种贡献形式最适合每位儿童",
                          "哪些符号需要回到直接观察中再核验"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "lesson-03",
            "lessonNumber": 3,
            "title": "创作一项校园指南贡献",
            "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/02_translations/zh_cn/03_lesson_3_zh_cn.md",
            "sourceMarkdown": "# Lesson 3: Create a School Guide Contribution｜第 3 课：创作一项校园指南贡献\n\n## Lesson Identity｜课程信息\n\n### Lesson Number｜课次\n\n3\n\n### Studio Phase｜工作室阶段\n\n创作\n\n### Primary Art Domain｜主艺术领域\n观察与再现\n\n### Supporting Art Domains｜辅助艺术领域\n\n- 构图与视觉组织\n- 绘画与笔触\n- 想象、表达与视觉沟通\n\n## Lesson Artistic Focus｜课程艺术重点\n\n儿童依据直接观察创作一项完整的指南贡献，并在班级共享的视觉系统内安排个人作品。\n\n## Creative Brief｜创作简述\n\n创作一幅清晰的学校画面或符号，让另一个人能明白他们身处何处或可以找到什么。\n\n## Required Artistic Decisions｜必做艺术选择\n\n- 选择哪一个场所、地标或物品来表现\n- 哪些细节和符号是必要的\n- 这一贡献如何契合班级的视觉系统\n\n## Open Choices｜开放选择\n\n- 图示空间卡\n- 地标符号\n- 路线标记\n- 简化环境画\n- 视角\n- 有限的色彩选择\n- 拼贴或马克笔的主次安排\n\n## Learning Outcomes｜学习成果\n\n### Explore and Understand｜探索与理解\n\n儿童应越来越能够：\n\n- 把观察到的对象与一项明确的沟通目的联系起来\n\n### Make and Apply｜创作与应用\n\n儿童应越来越能够：\n\n- 创作一幅控制得当的最终绘画或图形贡献\n- 使用精选的比例、前景/背景或符号惯例\n- 在协作式排布中尝试放置位置\n\n### Express and Reflect｜表达与反思\n\n儿童应越来越能够：\n\n- 说明观看者应从这一贡献中读懂什么\n\n## Art Reference Reminder｜艺术参考提醒\n\n### References Available in the Studio｜工作室中可用的参考\n\n- 建筑速写\n- 导视图形\n- 第 1 课的研究\n- 第 2 课的符号尝试\n- 学校照片\n\n### Anti-Copying Reminder｜防止复制提醒\n\n参考资料展示的是沟通策略。儿童不应复制某张地图、某套图标或某份教师设计的方案。\n\n## Teacher Art Concepts｜教师美术概念\n\n### Core Concepts｜核心概念\n\n- 指南\n- 地标\n- 路线\n- 符号\n- 组织\n- 沟通\n\n### Teacher Routine Language｜教师常规语言\n\n（教师在课堂中使用的英文提示语；用于引导儿童把观察转化为他人能读懂的贡献。）\n\n- What should viewers understand?\n- Which detail is essential?\n- How does this fit the guide?\n- Is the viewpoint clear?\n- Where should this contribution be placed?\n\n### Light Theme Language｜轻量主题语言\n\n（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）\n\n- school\n- classroom\n- playground\n- library\n- art room\n- music room\n- map\n\n## Materials｜材料\n\n### Core Materials｜核心材料\n\n- 较厚的指南卡纸或纸张\n- 铅笔\n- 黑色马克笔\n- 有限的彩色马克笔或彩色铅笔\n- 彩色纸\n- 胶棒\n- 儿童安全剪刀\n- 大幅底纸\n- 可移除胶\n\n### Optional Choice Materials｜可选选择材料\n\n- 描摹纸\n- 作为参考的打印学校照片\n- 路线箭头\n- 仅作为制作辅助的图标形状模板\n\n### Preparation｜准备\n\n- 分配或协调多样化的学校题材\n- 准备统一规格的指南卡\n- 设置临时的协作排布区域\n- 确保参考照片保护隐私\n\n## Studio Sequence｜工作室序列\n\n### 1. Reconnect with the Creative Brief｜1. 回到创作简述\n\n儿童明确所画题材、沟通目的和所选图形规则。\n\n### 2. Plan or Arrange｜2. 规划或安排\n\n儿童轻轻地把大形和必要细节做大致安排。\n\n### 3. Begin Main Creation｜3. 开始主要创作\n\n儿童创作最终的绘画、图标或图示空间贡献。\n\n### 4. Midpoint Pause｜4. 中段暂停\n\n儿童把作品与观察研究对比，并退后一段距离检查清晰度。\n\n### 5. Continue and Develop｜5. 继续与发展\n\n儿童打磨线条、色彩、前景/背景或某一个符号，并尝试把作品临时放到协作指南上。\n\n### 6. Save and Document｜6. 保存与记录\n\n拍摄个人作品和初步的协作排布。记录一段儿童口述说明。\n\n### 7. Clean-Up｜7. 整理\n\n把指南作品平放保存，或保持临时粘贴以备第 4 课使用。\n\n## Teacher Prompts｜教师提问\n\n- What is the largest shape?\n- Which detail helps people know the place?\n- Can the image be understood from far away?\n- Does the colour follow the class system?\n- What is near or next to your place?\n\n## Differentiation｜分层支持\n\n### Support｜基础支持\n\n- 使用一个明确框取的题材\n- 提供更大的卡纸\n- 使用马克笔和简单拼贴\n- 把贡献缩减为一个地标符号\n\n### Extension｜拓展延伸\n\n- 加入第二视角或路线线索\n- 更刻意地使用前景与背景\n- 设计一个相互配对的符号\n- 说明这一贡献如何与相邻的指南作品相联系\n\n### Motor and Access Adaptations｜运动与可达性适配\n\n- 提供适配工具\n- 提供预剪好的拼贴形\n- 稳固纸张\n- 允许成人协助装裱\n\n## Assessment and Observation｜评估与观察\n\n### Primary Observation Focus｜主要观察重点\n\n- 通过观察和简化的图像实现清晰的沟通\n- 与协作图形系统的整合\n\n### Evidence to Collect｜需收集的证据\n\n- 最终的指南贡献\n- 初步的协作排布照片\n- 儿童口述说明\n- 教师记录\n\n### Child Voice Prompt｜儿童表达引导\n\n（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）\n\n- What should another person understand from your guide picture?\n\n## Clean-Up and Storage｜整理与收纳\n\n把贡献和可移除的排布材料妥善保存。姓名写在作品背面，不要写在画面正中央。\n\n## Safety Notes｜安全提示\n\n- 监督剪刀和装裱过程\n- 不要在指南中包含私密或受限信息\n\n## Teacher Reflection｜教师反思\n\n### What to Review Before Lesson 4｜进入第 4 课前需要回顾\n\n- 哪些元素对观看者来说不清楚\n- 协作指南在哪里需要更强的一致性或更合理的间距\n",
            "sections": [
              {
                "key": "Lesson Identity",
                "title": "课程信息",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Lesson Number",
                    "title": "课次",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "3"
                      }
                    ]
                  },
                  {
                    "key": "Studio Phase",
                    "title": "工作室阶段",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "创作"
                      }
                    ]
                  },
                  {
                    "key": "Primary Art Domain",
                    "title": "主艺术领域",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "观察与再现"
                      }
                    ]
                  },
                  {
                    "key": "Supporting Art Domains",
                    "title": "辅助艺术领域",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "构图与视觉组织",
                          "绘画与笔触",
                          "想象、表达与视觉沟通"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Lesson Artistic Focus",
                "title": "课程艺术重点",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童依据直接观察创作一项完整的指南贡献，并在班级共享的视觉系统内安排个人作品。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Creative Brief",
                "title": "创作简述",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "创作一幅清晰的学校画面或符号，让另一个人能明白他们身处何处或可以找到什么。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Required Artistic Decisions",
                "title": "必做艺术选择",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "选择哪一个场所、地标或物品来表现",
                      "哪些细节和符号是必要的",
                      "这一贡献如何契合班级的视觉系统"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Open Choices",
                "title": "开放选择",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "图示空间卡",
                      "地标符号",
                      "路线标记",
                      "简化环境画",
                      "视角",
                      "有限的色彩选择",
                      "拼贴或马克笔的主次安排"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Learning Outcomes",
                "title": "学习成果",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Explore and Understand",
                    "title": "探索与理解",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "把观察到的对象与一项明确的沟通目的联系起来"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Make and Apply",
                    "title": "创作与应用",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "创作一幅控制得当的最终绘画或图形贡献",
                          "使用精选的比例、前景/背景或符号惯例",
                          "在协作式排布中尝试放置位置"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Express and Reflect",
                    "title": "表达与反思",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "说明观看者应从这一贡献中读懂什么"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Art Reference Reminder",
                "title": "艺术参考提醒",
                "blocks": [],
                "subsections": [
                  {
                    "key": "References Available in the Studio",
                    "title": "工作室中可用的参考",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "建筑速写",
                          "导视图形",
                          "第 1 课的研究",
                          "第 2 课的符号尝试",
                          "学校照片"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Anti-Copying Reminder",
                    "title": "防止复制提醒",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "参考资料展示的是沟通策略。儿童不应复制某张地图、某套图标或某份教师设计的方案。"
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Art Concepts",
                "title": "教师美术概念",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Core Concepts",
                    "title": "核心概念",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "指南",
                          "地标",
                          "路线",
                          "符号",
                          "组织",
                          "沟通"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Teacher Routine Language",
                    "title": "教师常规语言",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（教师在课堂中使用的英文提示语；用于引导儿童把观察转化为他人能读懂的贡献。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "What should viewers understand?",
                          "Which detail is essential?",
                          "How does this fit the guide?",
                          "Is the viewpoint clear?",
                          "Where should this contribution be placed?"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Light Theme Language",
                    "title": "轻量主题语言",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "school",
                          "classroom",
                          "playground",
                          "library",
                          "art room",
                          "music room",
                          "map"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Materials",
                "title": "材料",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Core Materials",
                    "title": "核心材料",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "较厚的指南卡纸或纸张",
                          "铅笔",
                          "黑色马克笔",
                          "有限的彩色马克笔或彩色铅笔",
                          "彩色纸",
                          "胶棒",
                          "儿童安全剪刀",
                          "大幅底纸",
                          "可移除胶"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Optional Choice Materials",
                    "title": "可选选择材料",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "描摹纸",
                          "作为参考的打印学校照片",
                          "路线箭头",
                          "仅作为制作辅助的图标形状模板"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Preparation",
                    "title": "准备",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "分配或协调多样化的学校题材",
                          "准备统一规格的指南卡",
                          "设置临时的协作排布区域",
                          "确保参考照片保护隐私"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Studio Sequence",
                "title": "工作室序列",
                "blocks": [],
                "subsections": [
                  {
                    "key": "1. Reconnect with the Creative Brief",
                    "title": "1. 回到创作简述",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童明确所画题材、沟通目的和所选图形规则。"
                      }
                    ]
                  },
                  {
                    "key": "2. Plan or Arrange",
                    "title": "2. 规划或安排",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童轻轻地把大形和必要细节做大致安排。"
                      }
                    ]
                  },
                  {
                    "key": "3. Begin Main Creation",
                    "title": "3. 开始主要创作",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童创作最终的绘画、图标或图示空间贡献。"
                      }
                    ]
                  },
                  {
                    "key": "4. Midpoint Pause",
                    "title": "4. 中段暂停",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童把作品与观察研究对比，并退后一段距离检查清晰度。"
                      }
                    ]
                  },
                  {
                    "key": "5. Continue and Develop",
                    "title": "5. 继续与发展",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童打磨线条、色彩、前景/背景或某一个符号，并尝试把作品临时放到协作指南上。"
                      }
                    ]
                  },
                  {
                    "key": "6. Save and Document",
                    "title": "6. 保存与记录",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "拍摄个人作品和初步的协作排布。记录一段儿童口述说明。"
                      }
                    ]
                  },
                  {
                    "key": "7. Clean-Up",
                    "title": "7. 整理",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "把指南作品平放保存，或保持临时粘贴以备第 4 课使用。"
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Prompts",
                "title": "教师提问",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "What is the largest shape?",
                      "Which detail helps people know the place?",
                      "Can the image be understood from far away?",
                      "Does the colour follow the class system?",
                      "What is near or next to your place?"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Differentiation",
                "title": "分层支持",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Support",
                    "title": "基础支持",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "使用一个明确框取的题材",
                          "提供更大的卡纸",
                          "使用马克笔和简单拼贴",
                          "把贡献缩减为一个地标符号"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Extension",
                    "title": "拓展延伸",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "加入第二视角或路线线索",
                          "更刻意地使用前景与背景",
                          "设计一个相互配对的符号",
                          "说明这一贡献如何与相邻的指南作品相联系"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Motor and Access Adaptations",
                    "title": "运动与可达性适配",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "提供适配工具",
                          "提供预剪好的拼贴形",
                          "稳固纸张",
                          "允许成人协助装裱"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Assessment and Observation",
                "title": "评估与观察",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Primary Observation Focus",
                    "title": "主要观察重点",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "通过观察和简化的图像实现清晰的沟通",
                          "与协作图形系统的整合"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Evidence to Collect",
                    "title": "需收集的证据",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "最终的指南贡献",
                          "初步的协作排布照片",
                          "儿童口述说明",
                          "教师记录"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Child Voice Prompt",
                    "title": "儿童表达引导",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "What should another person understand from your guide picture?"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Clean-Up and Storage",
                "title": "整理与收纳",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "把贡献和可移除的排布材料妥善保存。姓名写在作品背面，不要写在画面正中央。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Safety Notes",
                "title": "安全提示",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "监督剪刀和装裱过程",
                      "不要在指南中包含私密或受限信息"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Teacher Reflection",
                "title": "教师反思",
                "blocks": [],
                "subsections": [
                  {
                    "key": "What to Review Before Lesson 4",
                    "title": "进入第 4 课前需要回顾",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "哪些元素对观看者来说不清楚",
                          "协作指南在哪里需要更强的一致性或更合理的间距"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "lesson-04",
            "lessonNumber": 4,
            "title": "测试与改进指南",
            "sourceMarkdownPath": "/Users/Lucia/Desktop/Codex_workspace/PG_PK_Language_Syllabus/06_curriculum_design/k1_k3_course_lines/art/01_unit_designs/k2/unit_01_our_new_school/02_translations/zh_cn/04_lesson_4_zh_cn.md",
            "sourceMarkdown": "# Lesson 4: Test and Improve the Guide｜第 4 课：测试与改进指南\n\n## Lesson Identity｜课程信息\n\n### Lesson Number｜课次\n\n4\n\n### Studio Phase｜工作室阶段\n发展与分享\n\n### Primary Art Domain｜主艺术领域\n材料、过程与反思\n\n### Supporting Art Domains｜辅助艺术领域\n\n- 构图与视觉组织\n- 观察与再现\n\n## Lesson Artistic Focus｜课程艺术重点\n\n儿童让观看者测试协作指南，为更清晰而修改一个元素，并完成共享的视觉展示。\n\n## Connection to Unit Project｜与单元项目的关联\n\n本节课引入「以观看者为中心」的修改，建立 K2 阶段「作品可以在测试后改进」的预期。\n\n## Learning Outcomes｜学习成果\n\n### Explore and Understand｜探索与理解\n\n儿童应越来越能够：\n\n- 识别他人是否能读懂一个视觉指南元素\n- 注意到共享图形系统中的一致和差异\n\n### Make and Apply｜创作与应用\n\n儿童应越来越能够：\n\n- 为更清晰而修改一幅画、一个符号、一个路线标记或一处排布\n- 为最终指南的间距和组织作出贡献\n\n### Express and Reflect｜表达与反思\n\n儿童应越来越能够：\n\n- 说明一处修改及其沟通目的\n- 指出协作系统中的一个优点\n\n## Review Focus｜回顾重点\n\n### Looking Back Prompt｜回顾提问\n\n- Can another person recognise the place?\n- Which symbols are easy to understand?\n- Are repeated colours and lines consistent?\n- Is anything too crowded?\n- What should be moved, enlarged, simplified or clarified?\n\n### Revision Opportunity｜修改机会\n\n儿童可以放大一个必要细节、简化背景、加强轮廓、调整符号、补充路线衔接、移动一件贡献或加大间距。\n\n### Revision Is Not｜修改不等于\n\n- 添加装饰性细节\n- 改写大量标签\n- 由成人重画\n- 强行要求精确的空间比例\n- 把每位儿童的画都画成一样\n\n## Teacher Art Concepts｜教师美术概念\n\n### Core Concepts｜核心概念\n\n- 测试\n- 观看者\n- 修改\n- 清晰\n- 一致\n- 组织\n\n### Teacher Routine Language｜教师常规语言\n\n（教师在课堂中使用的英文提示语；用于引导儿童以观看者反馈为依据进行修改。）\n\n- What did the viewer understand?\n- What was confusing?\n- Which part will you revise?\n- Does the guide feel consistent?\n- Is the spacing clear?\n\n### Light Theme Language｜轻量主题语言\n\n（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）\n\n- map\n- school\n- classroom\n- playground\n- next to\n- between\n- Where is…?\n\n## Materials｜材料\n\n### Core Materials｜核心材料\n\n- 每位儿童的指南贡献\n- 符号尝试\n- 大幅底纸\n- 黑色马克笔\n- 有限的色彩材料\n- 胶棒\n- 可移除胶\n\n### Presentation Materials｜展示材料\n\n- 标题卡\n- 可选的极简标签\n- 相机或平板电脑\n- 作品集文件夹\n- 使用图片或简单提示语的反馈卡\n\n### Preparation｜准备\n\n- 在合适的情况下，安排与同班同学、教师或其他小组的小型观看者测试\n- 在最终粘贴之前，先做临时排布\n- 准备作品集记录\n- 确认展示位置和隐私\n\n## Studio Sequence｜工作室序列\n\n### 1. Revisit Intention｜1. 重温目标\n\n回顾指南的目的和大家一致认可的视觉系统。\n\n### 2. Gallery Pause or Partner Look｜2. 画廊暂停或同伴观察\n\n同伴或受邀的观看者在没有事先说明的情况下，解读选出的符号、空间和路线关系。\n\n### 3. Choose a Revision｜3. 选择一处修改\n\n每位儿童或每个二人组根据观察到的反应，选择一处有意义的、为更清晰而做的修改。\n\n### 4. Develop or Complete｜4. 发展或完成\n\n儿童修改个人贡献，并协助打磨协作指南的间距和组织。\n\n### 5. Prepare for Sharing｜5. 为分享做准备\n\n儿童练习一段简短的说明，介绍一个符号、一个观察细节或一处修改。\n\n### 6. Gallery Share｜6. 画廊分享\n展示 **我们的校园视觉指南**，并邀请观看者把它作为一个视觉解读工具来使用。\n\n### 7. Portfolio Selection and Clean-Up｜7. 作品集选择与整理\n\n保存观察性研究、符号尝试、最终贡献和儿童口述说明。拍摄完成的协作指南。\n\n## Teacher Prompts｜教师提问\n\n- What could the viewer recognise?\n- Which part was unclear?\n- Should this be larger, simpler or moved?\n- Which visual rule connects our work?\n- What did you learn from another viewpoint?\n\n## Differentiation｜分层支持\n\n### Support｜基础支持\n\n- 提供两个具体的修改选择\n- 使用同伴的指向或图片反馈\n- 允许教师代为记录\n- 只修改一个局部\n\n### Extension｜拓展延伸\n\n- 分析多份贡献之间的一致性\n- 改进一段路线顺序\n- 把最终贡献与第一幅观察性研究做对比\n- 说明为什么精确比例次于清晰度\n\n### Motor and Access Adaptations｜运动与可达性适配\n\n- 提供适配工具\n- 允许成人在大幅装裱时提供协助\n- 使用可移除的部件以便重新摆放\n- 为观看者测试提供座位\n\n## Assessment and Observation｜评估与观察\n\n### Primary Observation Focus｜主要观察重点\n\n- 基于观看者反馈的有目的的修改\n- 对共享视觉组织的理解\n\n### Evidence to Collect｜需收集的证据\n\n- 最终的指南贡献\n- 修改前后对比\n- 儿童口述说明\n- 完成的协作指南照片\n- 教师基线总结\n\n### Child Voice Prompt｜儿童表达引导\n\n（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）\n\n- What did you change so another person could understand your guide more easily?\n\n## Portfolio Evidence｜作品集证据\n\n### Required｜必备\n\n- 一幅观察性学校绘画\n- 一份符号或图形系统研究\n- 最终的视觉指南贡献\n- 一段儿童口述说明记录\n\n### Optional｜可选\n\n- 第二视角研究\n- 观看者反馈记录\n- 修改前后对比\n- 协作指南照片\n\n## Display and Sharing｜展示与分享\n\n### Sharing Format｜分享形式\n\n- 同伴寻路测试\n- 访客解读\n- 画廊漫步\n- 校园空间指南导览\n\n### Display Note｜展示说明\n\n使用极少的文字。在保持整体视觉统一的前提下，标注个人贡献。\n\n## Clean-Up and Storage｜整理与收纳\n\n把指南牢固装裱，或在拆解前拍照。个人作品集证据平放保存。归还所有临时装裱材料。\n\n## Safety Notes｜安全提示\n\n- 安装指南时不要挡住通行路线\n- 保护学校隐私\n- 遵守展示和摄影的同意程序\n\n## Teacher Reflection｜教师反思\n\n### Unit Review｜单元回顾\n\n- Which outcomes were visible?\n- Which techniques need recycling?\n- Which children need additional support?\n- Which portfolio evidence should be retained?\n- What should inform the next unit?\n",
            "sections": [
              {
                "key": "Lesson Identity",
                "title": "课程信息",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Lesson Number",
                    "title": "课次",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "4"
                      }
                    ]
                  },
                  {
                    "key": "Studio Phase",
                    "title": "工作室阶段",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "发展与分享"
                      }
                    ]
                  },
                  {
                    "key": "Primary Art Domain",
                    "title": "主艺术领域",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "材料、过程与反思"
                      }
                    ]
                  },
                  {
                    "key": "Supporting Art Domains",
                    "title": "辅助艺术领域",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "构图与视觉组织",
                          "观察与再现"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Lesson Artistic Focus",
                "title": "课程艺术重点",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "儿童让观看者测试协作指南，为更清晰而修改一个元素，并完成共享的视觉展示。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Connection to Unit Project",
                "title": "与单元项目的关联",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "本节课引入「以观看者为中心」的修改，建立 K2 阶段「作品可以在测试后改进」的预期。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Learning Outcomes",
                "title": "学习成果",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Explore and Understand",
                    "title": "探索与理解",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "识别他人是否能读懂一个视觉指南元素",
                          "注意到共享图形系统中的一致和差异"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Make and Apply",
                    "title": "创作与应用",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "为更清晰而修改一幅画、一个符号、一个路线标记或一处排布",
                          "为最终指南的间距和组织作出贡献"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Express and Reflect",
                    "title": "表达与反思",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童应越来越能够："
                      },
                      {
                        "type": "list",
                        "items": [
                          "说明一处修改及其沟通目的",
                          "指出协作系统中的一个优点"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Review Focus",
                "title": "回顾重点",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Looking Back Prompt",
                    "title": "回顾提问",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "Can another person recognise the place?",
                          "Which symbols are easy to understand?",
                          "Are repeated colours and lines consistent?",
                          "Is anything too crowded?",
                          "What should be moved, enlarged, simplified or clarified?"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Revision Opportunity",
                    "title": "修改机会",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童可以放大一个必要细节、简化背景、加强轮廓、调整符号、补充路线衔接、移动一件贡献或加大间距。"
                      }
                    ]
                  },
                  {
                    "key": "Revision Is Not",
                    "title": "修改不等于",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "添加装饰性细节",
                          "改写大量标签",
                          "由成人重画",
                          "强行要求精确的空间比例",
                          "把每位儿童的画都画成一样"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Art Concepts",
                "title": "教师美术概念",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Core Concepts",
                    "title": "核心概念",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "测试",
                          "观看者",
                          "修改",
                          "清晰",
                          "一致",
                          "组织"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Teacher Routine Language",
                    "title": "教师常规语言",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（教师在课堂中使用的英文提示语；用于引导儿童以观看者反馈为依据进行修改。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "What did the viewer understand?",
                          "What was confusing?",
                          "Which part will you revise?",
                          "Does the guide feel consistent?",
                          "Is the spacing clear?"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Light Theme Language",
                    "title": "轻量主题语言",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（仅作 Power Up 已学/在册英语词汇的自然复现，不作为本美术单元的新增语言目标。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "map",
                          "school",
                          "classroom",
                          "playground",
                          "next to",
                          "between",
                          "Where is…?"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Materials",
                "title": "材料",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Core Materials",
                    "title": "核心材料",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "每位儿童的指南贡献",
                          "符号尝试",
                          "大幅底纸",
                          "黑色马克笔",
                          "有限的色彩材料",
                          "胶棒",
                          "可移除胶"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Presentation Materials",
                    "title": "展示材料",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "标题卡",
                          "可选的极简标签",
                          "相机或平板电脑",
                          "作品集文件夹",
                          "使用图片或简单提示语的反馈卡"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Preparation",
                    "title": "准备",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "在合适的情况下，安排与同班同学、教师或其他小组的小型观看者测试",
                          "在最终粘贴之前，先做临时排布",
                          "准备作品集记录",
                          "确认展示位置和隐私"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Studio Sequence",
                "title": "工作室序列",
                "blocks": [],
                "subsections": [
                  {
                    "key": "1. Revisit Intention",
                    "title": "1. 重温目标",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "回顾指南的目的和大家一致认可的视觉系统。"
                      }
                    ]
                  },
                  {
                    "key": "2. Gallery Pause or Partner Look",
                    "title": "2. 画廊暂停或同伴观察",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "同伴或受邀的观看者在没有事先说明的情况下，解读选出的符号、空间和路线关系。"
                      }
                    ]
                  },
                  {
                    "key": "3. Choose a Revision",
                    "title": "3. 选择一处修改",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "每位儿童或每个二人组根据观察到的反应，选择一处有意义的、为更清晰而做的修改。"
                      }
                    ]
                  },
                  {
                    "key": "4. Develop or Complete",
                    "title": "4. 发展或完成",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童修改个人贡献，并协助打磨协作指南的间距和组织。"
                      }
                    ]
                  },
                  {
                    "key": "5. Prepare for Sharing",
                    "title": "5. 为分享做准备",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "儿童练习一段简短的说明，介绍一个符号、一个观察细节或一处修改。"
                      }
                    ]
                  },
                  {
                    "key": "6. Gallery Share",
                    "title": "6. 画廊分享",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "展示 **我们的校园视觉指南**，并邀请观看者把它作为一个视觉解读工具来使用。"
                      }
                    ]
                  },
                  {
                    "key": "7. Portfolio Selection and Clean-Up",
                    "title": "7. 作品集选择与整理",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "保存观察性研究、符号尝试、最终贡献和儿童口述说明。拍摄完成的协作指南。"
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Teacher Prompts",
                "title": "教师提问",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "What could the viewer recognise?",
                      "Which part was unclear?",
                      "Should this be larger, simpler or moved?",
                      "Which visual rule connects our work?",
                      "What did you learn from another viewpoint?"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Differentiation",
                "title": "分层支持",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Support",
                    "title": "基础支持",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "提供两个具体的修改选择",
                          "使用同伴的指向或图片反馈",
                          "允许教师代为记录",
                          "只修改一个局部"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Extension",
                    "title": "拓展延伸",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "分析多份贡献之间的一致性",
                          "改进一段路线顺序",
                          "把最终贡献与第一幅观察性研究做对比",
                          "说明为什么精确比例次于清晰度"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Motor and Access Adaptations",
                    "title": "运动与可达性适配",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "提供适配工具",
                          "允许成人在大幅装裱时提供协助",
                          "使用可移除的部件以便重新摆放",
                          "为观看者测试提供座位"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Assessment and Observation",
                "title": "评估与观察",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Primary Observation Focus",
                    "title": "主要观察重点",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "基于观看者反馈的有目的的修改",
                          "对共享视觉组织的理解"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Evidence to Collect",
                    "title": "需收集的证据",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "最终的指南贡献",
                          "修改前后对比",
                          "儿童口述说明",
                          "完成的协作指南照片",
                          "教师基线总结"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Child Voice Prompt",
                    "title": "儿童表达引导",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "（引导儿童用口语、指向、手势、照片、录音或教师记录表达，不要求独立书写。）"
                      },
                      {
                        "type": "list",
                        "items": [
                          "What did you change so another person could understand your guide more easily?"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Portfolio Evidence",
                "title": "作品集证据",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Required",
                    "title": "必备",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "一幅观察性学校绘画",
                          "一份符号或图形系统研究",
                          "最终的视觉指南贡献",
                          "一段儿童口述说明记录"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Optional",
                    "title": "可选",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "第二视角研究",
                          "观看者反馈记录",
                          "修改前后对比",
                          "协作指南照片"
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Display and Sharing",
                "title": "展示与分享",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Sharing Format",
                    "title": "分享形式",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "同伴寻路测试",
                          "访客解读",
                          "画廊漫步",
                          "校园空间指南导览"
                        ]
                      }
                    ]
                  },
                  {
                    "key": "Display Note",
                    "title": "展示说明",
                    "blocks": [
                      {
                        "type": "paragraph",
                        "text": "使用极少的文字。在保持整体视觉统一的前提下，标注个人贡献。"
                      }
                    ]
                  }
                ]
              },
              {
                "key": "Clean-Up and Storage",
                "title": "整理与收纳",
                "blocks": [
                  {
                    "type": "paragraph",
                    "text": "把指南牢固装裱，或在拆解前拍照。个人作品集证据平放保存。归还所有临时装裱材料。"
                  }
                ],
                "subsections": []
              },
              {
                "key": "Safety Notes",
                "title": "安全提示",
                "blocks": [
                  {
                    "type": "list",
                    "items": [
                      "安装指南时不要挡住通行路线",
                      "保护学校隐私",
                      "遵守展示和摄影的同意程序"
                    ]
                  }
                ],
                "subsections": []
              },
              {
                "key": "Teacher Reflection",
                "title": "教师反思",
                "blocks": [],
                "subsections": [
                  {
                    "key": "Unit Review",
                    "title": "单元回顾",
                    "blocks": [
                      {
                        "type": "list",
                        "items": [
                          "Which outcomes were visible?",
                          "Which techniques need recycling?",
                          "Which children need additional support?",
                          "Which portfolio evidence should be retained?",
                          "What should inform the next unit?"
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
] as const;

export function getKArtUnit(level: string, unitNumber: number): KArtUnit | undefined {
  return kArtUnits.find(
    (unit) => unit.level.toLowerCase() === level.toLowerCase() && unit.unitNumber === unitNumber,
  ) as KArtUnit | undefined;
}
