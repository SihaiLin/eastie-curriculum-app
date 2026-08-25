// DEPRECATED: This file is replaced by generated/pkUnit08NonLanguageUnit08.ts.
// The manifest now imports from the generated file directly.
// Keep this file only as a reference; do not edit.

import type { CurriculumUnit } from "../types";
import {
  pkUnit08CommonInfoMarkdown,
  pkUnit08CourseAMarkdown,
  pkUnit08CourseBMarkdown,
  pkUnit08CourseC1Markdown,
  pkUnit08CourseC2Markdown,
  pkUnit08CourseDMarkdown,
  pkUnit08CourseEMarkdown,
  pkUnit08CourseFMarkdown,
  pkUnit08CourseGMarkdown,
} from "../generated/pkUnit08Markdown";

export const pkNonLanguageUnit08: CurriculumUnit = {
  unitId: "pk-non-language-unit-08",
  slug: "pk-non-language-unit-08",
  status: "prototype",
  level: "PK",
  courseType: "non-language",
  unitNumber: 8,
  title: {
    en: "Nature, Weather and Animals",
    zh: "自然、天气与动物",
  },
  theme: "weather-nature-animals",
  overview: {
    en: "This unit helps PK children connect English with the natural world around them through real observation, outdoor routines, animal models, pictures, songs, movement, pretend play, sensory exploration, simple inquiry, art, and construction. It is not a formal science explanation unit; the goal is recognition, participation, gentle care routines, and short supported language chunks.",
    zh: "本单元帮助 PK 幼儿通过真实观察、户外常规、动物模型、图片、歌曲、动作、假装游戏、感官探索、简单探究、艺术和建构，把英语与身边的自然世界建立联结。本单元不是正式科学讲解，目标是识别、参与、温和照护常规，以及在支持下使用短语块。",
  },
  sourceRef: {
    workspace: "PG_PK_Language_Syllabus",
    path: "06_curriculum_design/pk/non_language_courses/unit_08_nature_weather_animals",
  },
  sourceMarkdown: pkUnit08CommonInfoMarkdown,
  languageSections: [
    {
      id: "core-vocabulary",
      title: { en: "Core Vocabulary", zh: "核心词汇" },
      variant: "core",
      items: [
      "sun",
      "rain",
      "cloud / clouds",
      "wind",
      "sunny",
      "rainy",
      "windy",
      "hot",
      "cold",
      "tree",
      "flower",
      "leaf",
      "grass",
      "water",
      "animal",
      "dog",
      "cat",
      "bird",
      "duck",
      "fish",
      "frog",
      "rabbit",
      "sheep",
      "horse",
      "cow",
    ],
    },
    {
      id: "animal-sounds",
      title: { en: "Animal Sounds", zh: "动物声音" },
      variant: "support",
      items: ["woof", "meow", "tweet", "quack"],
    },
    {
      id: "movement-and-action",
      title: { en: "Movement & Action Language", zh: "动作与行动语言" },
      variant: "support",
      items: [
      "look",
      "listen",
      "touch",
      "point to",
      "show me",
      "choose",
      "match",
      "walk",
      "jump",
      "swim",
      "fly",
      "be gentle",
      "give water",
      "give food",
      "clean up",
    ],
    },
    {
      id: "care-language",
      title: { en: "Care Language", zh: "照护语言" },
      variant: "support",
      items: ["water", "food", "be gentle", "give water", "give food", "animals need water", "animals need food"],
    },
    {
      id: "optional-challenge",
      title: { en: "Optional Challenge", zh: "可选挑战" },
      variant: "optional",
      items: [
      "It's sunny.",
      "It's rainy.",
      "It's windy.",
      "I see a bird.",
      "I see a duck.",
      "A dog says woof.",
      "A cat says meow.",
      "Animals need water.",
      "Animals need food.",
    ],
    },
  ],
  weeklySubthemes: [
    {
      week: 1,
      title: { en: "Weather and Sky", zh: "天气与天空" },
      summary: { en: "Children observe and respond to weather and sky language.", zh: "幼儿观察并回应天气和天空相关语言。" },
    },
    {
      week: 2,
      title: { en: "Trees, Flowers and Leaves", zh: "树、花与叶子" },
      summary: { en: "Children explore simple nature objects through outdoor observation, sensory handling, art, and sorting.", zh: "幼儿通过户外观察、感官操作、艺术和简单分类探索自然物。" },
    },
    {
      week: 3,
      title: { en: "Animals and Sounds", zh: "动物与声音" },
      summary: { en: "Children recognise common animals, imitate sounds, and match animals with actions or sounds.", zh: "幼儿识别常见动物、模仿声音，并把动物与动作或声音配对。" },
    },
    {
      week: 4,
      title: { en: "Animal Care and Nature Review", zh: "动物照护与自然复习" },
      summary: { en: "Children combine weather, nature, animal, movement, and care language in pretend-care routines.", zh: "幼儿在假装照护常规中整合天气、自然、动物、动作和照护语言。" },
    },
  ],
  courses: [
    {
      code: "A",
      title: { en: "Daily Life, Self-Care & Independence", zh: "日常生活、自理与独立" },
      purpose: {
        en: "Children connect Unit 8 language with everyday routines, safe handling, simple care behaviours, and increasing independence.",
        zh: "幼儿把第八单元语言与日常常规、安全操作、简单照护行为和逐步独立联系起来。",
      },
      sourceMarkdown: pkUnit08CourseAMarkdown,
      lessons: [
        lesson(1, "Weather Helper Routine", "天气小帮手常规", 1, "Notice weather as part of a shared classroom routine.", ["sunny", "rainy", "windy", "hot", "cold"], ["Weather Window Helper", "Hot or Cold Body Check", "Ready to Go Outside"]),
        lesson(2, "Gentle Nature Hands", "温柔的自然小手", 2, "Touch, show, sort, water, and clean up natural materials carefully.", ["leaf", "flower", "grass", "water", "be gentle"], ["Clean Hands, Gentle Hands", "Leaf and Flower Care Trays", "Water the Little Plant"]),
        lesson(3, "Animal Sound Care Basket", "动物声音照护篮", 3, "Choose animals, listen to sounds, take turns, and handle props gently.", ["dog", "cat", "bird", "duck", "woof", "meow"], ["Animal Care Basket", "Sound Guessing", "Clean Up the Animals"]),
        lesson(4, "Food and Water for Animals", "给动物食物和水", 4, "Join a simple pretend-care routine with food, water, and clean-up jobs.", ["food", "water", "give water", "give food"], ["Care Helper Jobs", "Food or Water Choice", "Animal Care Clean-Up"]),
      ],
    },
    {
      code: "B",
      title: { en: "Sensory, Object & Early Inquiry", zh: "感官、实物与早期探究" },
      purpose: {
        en: "Children notice, compare, match, choose, and respond through hands-on sensory exploration.",
        zh: "幼儿通过动手感官探索进行观察、比较、配对、选择和回应。",
      },
      sourceMarkdown: pkUnit08CourseBMarkdown,
      lessons: [
        lesson(1, "Weather Touch and Sound Lab", "天气触摸与声音实验", 1, "Connect weather words with concrete sensory cues.", ["wet", "dry", "sunny", "rainy", "windy"], ["Weather Sound Match", "Wet or Dry Tray", "Wind Scarf Station"]),
        lesson(2, "Leaf, Flower and Grass Discovery Table", "叶子、花和草探索桌", 2, "Explore safe natural materials through close looking and gentle touch.", ["leaf", "flower", "grass", "same", "different"], ["Gentle Discovery Table", "Leaf or Flower Sorting", "Magnifier Moment"]),
        lesson(3, "Animal Sound and Texture Match", "动物声音与触感配对", 3, "Match animals by name, sound, movement, and safe texture cues.", ["animal", "sound", "soft", "jump", "fly"], ["Sound Detective Basket", "Animal Texture Touch", "Move Like the Animal"]),
        lesson(4, "Animal Care Inquiry Station", "动物照护探究站", 4, "Use simple matching and care routines to review the unit.", ["water", "food", "care", "match"], ["Water or Food Match", "Nature Setting Sort", "Care Station Clean-Up"]),
      ],
    },
    {
      code: "C1",
      title: { en: "Story, Puppet & Early Retelling", zh: "故事、木偶与早期复述" },
      purpose: {
        en: "Children follow simple stories, respond to characters, imitate sounds or actions, and retell small parts with support.",
        zh: "幼儿跟随简单故事、回应角色、模仿声音或动作，并在支持下复述小片段。",
      },
      sourceMarkdown: pkUnit08CourseC1Markdown,
      lessons: [
        lesson(1, "Weather Puppet Looks at the Sky", "天气木偶看天空", 1, "Follow a puppet weather check with repeated cues.", ["look", "sky", "sunny", "rainy"], ["Puppet Weather Check", "Three-Card Weather Story", "Puppet Gets Ready"]),
        lesson(2, "Little Leaf's Journey", "小叶子的旅程", 2, "Use a leaf puppet to join a simple nature story path.", ["leaf", "tree", "flower", "gentle"], ["Leaf Puppet Story", "Story Path Retelling", "Gentle Leaf Rescue"]),
        lesson(3, "Who Says Woof?", "谁在汪汪叫？", 3, "Match animal sounds to story characters.", ["woof", "meow", "tweet", "quack"], ["Mystery Sound Puppet Curtain", "Animal Sound Parade", "Finish the Story"]),
        lesson(4, "The Thirsty Animal Story", "口渴动物的故事", 4, "Retell a supported care story with water and food choices.", ["thirsty", "water", "food", "care"], ["Thirsty Animal Puppet Story", "Food or Water Choice", "Care Board Retelling"]),
      ],
    },
    {
      code: "C2",
      title: { en: "Pretend Play & Social Role-Play", zh: "假装游戏与社交角色扮演" },
      purpose: {
        en: "Children join weather, nature, and animal-care situations through pretend roles and social routines.",
        zh: "幼儿通过假装角色和社交常规参与天气、自然和动物照护情境。",
      },
      sourceMarkdown: pkUnit08CourseC2Markdown,
      lessons: [
        lesson(1, "Weather Helper Role-Play", "天气小帮手角色游戏", 1, "Pretend to check weather and prepare for outdoor routines.", ["helper", "today", "sunny", "rainy"], ["Weather Desk", "Outdoor Helper Line", "Choose the Card"]),
        lesson(2, "Nature Shop and Garden", "自然商店与花园", 2, "Use social turns to choose and place nature objects.", ["leaf", "flower", "please", "thank you"], ["Nature Shop", "Garden Helper", "Gentle Exchange"]),
        lesson(3, "Animal Vet and Care Corner", "动物医生与照护角", 3, "Pretend to care for animals with gentle routines.", ["animal", "gentle", "my turn", "help"], ["Animal Clinic", "Sound Check", "Care Turn-Taking"]),
        lesson(4, "Nature and Animal Care Day", "自然与动物照护日", 4, "Combine unit roles in a small shared pretend-care sequence.", ["care", "water", "food", "clean up"], ["Care Day Stations", "Helper Badges", "Clean-Up Team"]),
      ],
    },
    {
      code: "D",
      title: { en: "Creative Expression & Making", zh: "创意表达与手工制作" },
      purpose: {
        en: "Children express weather, nature, and animal ideas through art, collage, making, and material work.",
        zh: "幼儿通过美术、拼贴、制作和材料操作表达天气、自然和动物想法。",
      },
      sourceMarkdown: pkUnit08CourseDMarkdown,
      lessons: [
        lesson(1, "Weather Picture Making", "天气图画制作", 1, "Create visible weather pictures through choice and mark-making.", ["sun", "rain", "cloud", "wind"], ["Choose Your Sky", "Weather Mark Painting", "Weather Gallery Walk"]),
        lesson(2, "Leaf and Flower Collage", "叶子与花朵拼贴", 2, "Make a simple nature collage with safe materials.", ["leaf", "flower", "grass", "choose"], ["Nature Material Choice Table", "Big Class Nature Collage", "Beach and Sea Corner"]),
        lesson(3, "Animal Mask Making", "动物面具制作", 3, "Make and use animal masks for sounds and movement.", ["dog", "cat", "bird", "duck"], ["Choose an Animal", "Mask Making", "Animal Parade"]),
        lesson(4, "Care Poster and Review Mural", "照护海报与复习墙", 4, "Create a shared care mural reviewing unit language.", ["water", "food", "be gentle", "care"], ["Care Poster", "Stick and Say", "Review Mural Walk"]),
      ],
    },
    {
      code: "E",
      title: { en: "Music, Rhythm & Movement", zh: "音乐、节奏与动作体验" },
      purpose: {
        en: "Children join the theme physically and musically through songs, rhythm, body movement, animal sounds, and action imitation.",
        zh: "幼儿通过歌曲、节奏、身体动作、动物叫声和动作模仿参与主题。",
      },
      sourceMarkdown: pkUnit08CourseEMarkdown,
      lessons: [
        lesson(1, "Weather Song and Movement", "天气歌曲与动作", 1, "Move and sing simple weather ideas.", ["sunny", "rainy", "windy", "move"], ["Weather Action Song", "Rain and Sun Freeze", "Wind Ribbons"]),
        lesson(2, "Nature Sound and Movement Walk", "自然声音与动作行走", 2, "Use rhythm and movement for leaves, flowers, and outdoor cues.", ["walk", "leaf", "flower", "listen"], ["Nature Sound Walk", "Leaf Rhythm", "Gentle Movement"]),
        lesson(3, "Animal Sound Band", "动物声音乐队", 3, "Imitate animal sounds and movement in a controlled music routine.", ["woof", "meow", "tweet", "quack"], ["Animal Sound Call-and-Response", "Animal Rhythm Band", "Animal Movement Song Spots"]),
        lesson(4, "Animal Care Song Routine", "动物照护歌曲常规", 4, "Use chants and songs to review care routines.", ["give water", "give food", "clean up"], ["Care Chant with Props", "Soft Animal Lullaby", "Unit Song Review Circle"]),
      ],
    },
    {
      code: "F",
      title: { en: "Construction & Small-World Play", zh: "建构与小世界游戏" },
      purpose: {
        en: "Children build scenes, arrange objects, collaborate, and join story-based play with constructed environments.",
        zh: "幼儿通过搭建场景、摆放物件、协作和建构环境中的故事游戏参与主题。",
      },
      sourceMarkdown: pkUnit08CourseFMarkdown,
      lessons: [
        lesson(1, "Build a Weather Window", "搭建天气窗", 1, "Build a simple visual weather scene.", ["window", "sun", "rain", "cloud"], ["Block Weather Window", "Weather Piece Builder", "Daily Weather Scene"]),
        lesson(2, "Build a Mini Nature Garden", "搭建迷你自然花园", 2, "Arrange blocks and loose parts into a nature garden.", ["tree", "leaf", "flower", "garden"], ["Lego or Block Garden", "Nature Loose-Parts Scene", "Beach and Sea Extension Corner"]),
        lesson(3, "Build Animal Homes and Paths", "搭建动物家和小路", 3, "Place animals in simple homes, paths, ponds, and trees.", ["animal", "home", "path", "pond"], ["Animal Path Builders", "Pond and Tree Scene", "Guess the Animal Home"]),
        lesson(4, "Build an Animal Care World", "搭建动物照护小世界", 4, "Build and use a shared care world with review routines.", ["care", "water", "food", "clean up"], ["Shared Animal Care World", "Care Mission Cards", "Build, Care, Clean Up"]),
      ],
    },
    {
      code: "G",
      title: { en: "PSED, Safety & Social Participation", zh: "PSED、安全与社会参与" },
      purpose: {
        en: "Children practise safety awareness, gentle behaviour, turn-taking, emotional regulation, and responsible participation.",
        zh: "幼儿练习安全意识、温柔行为、轮流、情绪调节和负责任参与。",
      },
      sourceMarkdown: pkUnit08CourseGMarkdown,
      lessons: [
        lesson(1, "Safe Weather Watchers", "安全天气观察员", 1, "Join weather watching with safe bodies and clear routines.", ["safe", "wait", "look", "weather"], ["Weather Watcher Line", "Stop and Look Signal", "Weather Helper Turn"]),
        lesson(2, "Gentle Nature Hands", "温柔的自然小手", 2, "Practise safe, gentle hands with nature materials.", ["gentle", "safe", "touch", "turn"], ["Gentle Hands Practice", "Safe or Not for Touch", "Nature Tray Turn-Taking"]),
        lesson(3, "Animal Friend Rules", "动物朋友规则", 3, "Use rules for safe animal prop play and movement.", ["rule", "gentle", "stop", "my turn"], ["Animal Friend Rules Board", "Pass the Animal", "Safe Animal Movement Spots"]),
        lesson(4, "Caring Together", "一起照护", 4, "Participate in shared care, rest, and clean-up routines.", ["together", "care", "help", "clean up"], ["Care Helper Jobs", "Animal Rest and Care Station", "Caring Together Clean-Up"]),
      ],
    },
  ],
};

function lesson(
  number: 1 | 2 | 3 | 4,
  enTitle: string,
  zhTitle: string,
  week: number,
  enOutcome: string,
  languageFocus: string[],
  activitySeeds: string[],
) {
  return {
    number,
    title: { en: enTitle, zh: zhTitle },
    week,
    outcome: {
      en: enOutcome,
      zh: "第一版动态原型中的中文占位摘要，后续可从审定双语源内容补全。",
    },
    languageFocus,
    activitySeeds,
  };
}
