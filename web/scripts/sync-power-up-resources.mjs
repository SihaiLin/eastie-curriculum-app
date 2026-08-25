import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const sourceRoot = "/Users/Lucia/Desktop/Codex_workspace/Power Up/levels";
const publicRoot = join(process.cwd(), "public/curriculum-resources/power-up");
const configs = [
  { grade: "k1", levelKey: "starter", levelName: "Starters" },
  { grade: "k2", levelKey: "level_1", levelName: "LevelOne" },
  { grade: "k3", levelKey: "level_2", levelName: "LevelTwo" },
];

function readUnitArg() {
  const args = process.argv.slice(2);
  const unitFlagIndex = args.findIndex((arg) => arg === "--unit");
  const raw =
    args.find((arg) => arg.startsWith("--unit="))?.split("=")[1] ??
    (unitFlagIndex >= 0 ? args[unitFlagIndex + 1] : "01");
  if (raw?.toLowerCase() === "uh") {
    return {
      unitNumber: null,
      unitSlug: "unit-uh",
      sourceUnit: "UH",
      paddedSourceUnit: null,
    };
  }
  const number = Number.parseInt(raw, 10);
  if (!Number.isFinite(number) || number < 1 || number > 99) {
    throw new Error(`Invalid --unit value: ${raw}`);
  }
  return {
    unitNumber: number,
    unitSlug: `unit-${String(number).padStart(2, "0")}`,
    sourceUnit: `U${number}`,
    paddedSourceUnit: `U${String(number).padStart(2, "0")}`,
  };
}

const unitConfig = readUnitArg();

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function copyResource(source, publicPath) {
  const target = join(publicRoot, publicPath.replace(/^\/curriculum-resources\/power-up\//, ""));
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
}

function gradeForLevel(levelKey) {
  return levelKey === "starter" ? "k1" : levelKey === "level_1" ? "k2" : "k3";
}

function parsePdfEntry(file, levelKey) {
  const unitPattern = unitConfig.sourceUnit.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = basename(file).match(new RegExp(`_(TB|PB|AB)_${unitPattern}_L(\\d+)_pg(\\d+)\\.pdf$`, "i"));
  if (!match) return null;
  const [, role, lesson, page] = match;
  const roleDir = { TB: "teacher-book", PB: "pupil-book", AB: "activity-book" }[role.toUpperCase()];
  return {
    levelKey,
    lesson: Number(lesson),
    role: role.toUpperCase(),
    page: Number(page),
    filename: basename(file),
    sourcePath: file,
    publicPath: `/curriculum-resources/power-up/${gradeForLevel(levelKey)}/${unitConfig.unitSlug}/${roleDir}/${basename(file)}`,
  };
}

function abTrackMap() {
  const mapPath = join(sourceRoot, `activity_book_audio_track_map_${unitConfig.unitSlug.replace("-", "_")}.json`);
  if (!existsSync(mapPath)) return null;
  return JSON.parse(readFileSync(mapPath, "utf8"));
}

// Level 2's Lesson 3 story activity reuses one Pupil's Book recording in the
// Activity Book. `abPage` is the printed book page, not a PDF page index.
const levelTwoSharedStoryAudio = {
  1: { abPage: 8, track: "1.10" },
  2: { abPage: 20, track: "1.24" },
  3: { abPage: 32, track: "1.38" },
  4: { abPage: 46, track: "2.02" },
  5: { abPage: 58, track: "2.19" },
  6: { abPage: 70, track: "2.34" },
  7: { abPage: 84, track: "3.05" },
  8: { abPage: 96, track: "3.24" },
  9: { abPage: 108, track: "3.41" },
};

// PB display labels are continuous within the book, while source filenames
// restart on each physical CD. These U4–U9 boundaries are verified from the
// Teacher's Book starting references and the PB audioscript sequence.
const levelTwoPupilBookTrackMap = {
  1: [[1, 7, "1.07"], [1, 8, "1.08"], [1, 9, "1.09"], [1, 10, "1.10"], [1, 11, "1.11"], [1, 12, "1.12"], [1, 13, "1.13"], [1, 14, "1.14"], [1, 16, "1.16"], [1, 17, "1.17"], [1, 18, "1.18"], [1, 19, "1.19"], [1, 20, "1.20"]],
  2: [[1, 21, "1.21"], [1, 22, "1.22"], [1, 23, "1.23"], [1, 24, "1.24"], [1, 25, "1.25"], [1, 26, "1.26"], [1, 27, "1.27"], [1, 28, "1.28"], [1, 30, "1.30"], [1, 31, "1.31"], [1, 32, "1.32"], [1, 33, "1.33"], [1, 34, "1.34"]],
  3: [[1, 35, "1.35"], [1, 36, "1.36"], [1, 37, "1.37"], [1, 38, "1.38"], [1, 39, "1.39"], [1, 40, "1.40"], [1, 41, "1.41"], [1, 42, "1.42"], [1, 44, "1.44"], [1, 45, "1.45"], [1, 46, "1.46"], [1, 47, "1.47"], [1, 48, "1.48"], [1, 49, "1.49"], [1, 50, "1.50"]],
  4: [[1, 51, "1.51"], [1, 52, "1.52"], [1, 53, "1.53"], [1, 54, "1.54"], [2, 2, "2.02"], [2, 3, "2.03"], [2, 4, "2.04"], [2, 5, "2.05"], [2, 6, "2.06"], [2, 8, "2.08"], [2, 9, "2.09"], [2, 10, "2.10"], [2, 11, "2.11"], [2, 12, "2.12"], [2, 13, "2.13"], [2, 14, "2.14"]],
  5: [[2, 15, "2.15"], [2, 16, "2.16"], [2, 17, "2.17"], [2, 18, "2.18"], [2, 19, "2.19"], [2, 20, "2.20"], [2, 21, "2.21"], [2, 22, "2.22"], [2, 23, "2.23"], [2, 25, "2.25"], [2, 26, "2.26"], [2, 27, "2.27"], [2, 28, "2.28"], [2, 29, "2.29"]],
  6: [[2, 30, "2.30"], [2, 31, "2.31"], [2, 32, "2.32"], [2, 33, "2.33"], [2, 34, "2.34"], [2, 35, "2.35"], [2, 36, "2.36"], [2, 37, "2.37"], [2, 39, "2.39"], [2, 40, "2.40"], [2, 41, "2.41"], [2, 42, "2.42"], [2, 43, "2.43"], [2, 44, "2.44"], [2, 45, "2.45"], [2, 46, "2.46"], [2, 47, "2.47"], [2, 48, "2.48"]],
  7: [[3, 2, "3.02"], [3, 3, "3.03"], [3, 4, "3.04"], [3, 5, "3.05"], [3, 6, "3.06"], [3, 7, "3.07"], [3, 8, "3.08"], [3, 9, "3.09"], [3, 11, "3.11"], [3, 12, "3.12"], [3, 13, "3.13"], [3, 14, "3.14"], [3, 15, "3.15"], [3, 16, "3.16"], [3, 17, "3.17"], [3, 18, "3.18"], [3, 19, "3.19"]],
  8: [[3, 20, "3.20"], [3, 21, "3.21"], [3, 22, "3.22"], [3, 23, "3.23"], [3, 24, "3.24"], [3, 25, "3.25"], [3, 26, "3.26"], [3, 27, "3.27"], [3, 28, "3.28"], [3, 30, "3.30"], [3, 31, "3.31"], [3, 32, "3.32"], [3, 33, "3.33"], [3, 34, "3.34"], [3, 35, "3.35"], [3, 36, "3.36"]],
  9: [[3, 37, "3.37"], [3, 38, "3.38"], [3, 39, "3.39"], [3, 40, "3.40"], [3, 41, "3.41"], [3, 42, "3.42"], [3, 43, "3.43"], [3, 44, "3.44"], [3, 45, "3.45"], [3, 47, "3.47"], [3, 48, "3.48"], [3, 49, "3.49"], [4, 2, "4.02"], [4, 3, "4.03"]],
};

const levelTwoPupilBookLessonMap = {
  1: { 7: [2], 8: [2], 9: [2], 10: [3], 11: [3], 12: [4], 13: [4], 14: [5], 16: [6], 17: [6], 18: [7], 19: [8], 20: [9] },
  2: { 21: [2], 22: [2], 23: [2], 24: [3], 25: [3], 26: [4], 27: [4], 28: [5], 30: [6], 31: [6], 32: [7], 33: [8], 34: [9] },
  3: { 35: [2], 36: [2], 37: [2], 38: [3], 39: [3], 40: [4], 41: [4], 42: [5], 44: [5], 45: [6], 46: [6], 47: [7], 48: [8], 49: [9], 50: [13] },
  4: { 51: [2], 52: [2], 53: [2], 54: [2], "2.2": [3], "2.3": [3], "2.4": [4], "2.5": [4], "2.6": [5], "2.8": [6], "2.9": [6], "2.10": [7], "2.11": [8], "2.12": [9, 10], "2.13": [11], "2.14": [11] },
  5: { 15: [2], 16: [2], 17: [2], 18: [2], 19: [3], 20: [3], 21: [4], 22: [4], 23: [5], 25: [6], 26: [6], 27: [7], 28: [7], 29: [9] },
  6: { 30: [2], 31: [2], 32: [2], 33: [2], 34: [3], 35: [4], 36: [4], 37: [5], 39: [6], 40: [6], 41: [6], 42: [7], 43: [8], 44: [9], 45: [11], 46: [11], 47: [11], 48: [13] },
  7: { "3.2": [2], "3.3": [2], "3.4": [2], "3.5": [3], "3.6": [3], "3.7": [4], "3.8": [4], "3.9": [5], "3.11": [5], "3.12": [6], "3.13": [6], "3.14": [7], "3.15": [7], "3.16": [8], "3.17": [9], "3.18": [11], "3.19": [11] },
  8: { 20: [2], 21: [2], 22: [2], 23: [2], 24: [3], 25: [3], 26: [4], 27: [4], 28: [5], 30: [6], 31: [6], 32: [9], 33: [11], 34: [11], 35: [11], 36: [11] },
  9: { "3.37": [2], "3.38": [2], "3.39": [2], "3.40": [2], "3.41": [3], "3.42": [3], "3.43": [4], "3.44": [4], "3.45": [5], "3.47": [6], "3.48": [6], "3.49": [7], "4.2": [9], "4.3": [13] },
};

const levelTwoLessonNotes = {
  4: { 11: "Language source file is missing; PB page 54 was audited and mapped to PB audio 2.13 and 2.14." },
};

// Confirmed PB accompaniment tracks. Each belongs to the same printed PB page
// (and therefore lesson) as the immediately preceding main audio track.
const pupilBookAccompanimentMap = {
  level_1: {
    1: [[1, 15, 5]], 2: [[1, 28, 5]], 3: [[1, 42, 5]], 4: [[2, 10, 5]], 5: [[2, 25, 5]],
    6: [[2, 38, 5]],
    7: [[3, 6, 5]], 8: [[3, 21, 5]], 9: [[3, 36, 5]],
  },
  level_2: {
    1: [[1, 15, 5]], 2: [[1, 29, 5]], 3: [[1, 43, 5]], 4: [[2, 7, 5]],
    5: [[2, 24, 5]], 6: [[2, 38, 5]], 7: [[3, 10, 5]], 8: [[3, 29, 5]],
    9: [[3, 46, 5]],
  },
};

function pupilBookAccompanimentAudio(config) {
  if (unitConfig.unitNumber === null) return [];
  const entries = pupilBookAccompanimentMap[config.levelKey]?.[unitConfig.unitNumber] ?? [];
  if (!entries.length) return [];
  const levelOne = config.levelKey === "level_1";
  const source = join(sourceRoot, config.levelKey, "source", levelOne ? "Student's Book Class Audio Level 1" : "Student's Book Class Audio Level 2");
  return entries.map(([cd, sourceTrack, lesson]) => {
    const filename = levelOne
      ? `PEC L1 Power Up CD${cd} Track ${String(sourceTrack).padStart(2, "0")}.mp3`
      : `PEC 2 Power Up CD ${cd} Track_${String(sourceTrack).padStart(2, "0")}.mp3`;
    const sourcePath = join(source, filename);
    if (!existsSync(sourcePath)) throw new Error(`Missing confirmed PB accompaniment: ${sourcePath}`);
    return {
      lesson,
      role: "pupil-book-accompaniment",
      audioType: "accompaniment",
      usage: ["pupil-book"],
      track: `${cd}.${String(sourceTrack).padStart(2, "0")}`,
      filename,
      sourcePath,
      publicPath: `/curriculum-resources/power-up/${config.grade}/${unitConfig.unitSlug}/audio/pupil-book-accompaniment/${filename}`,
      mappingStatus: "confirmed-pupil-book-accompaniment",
    };
  });
}

function verifiedLevelTwoPupilBookAudio(config, sharedStory) {
  if (config.levelKey !== "level_2" || unitConfig.unitNumber === null) return [];
  const source = join(sourceRoot, config.levelKey, "source");
  const sharedFile = sharedStory?.filename;
  return (levelTwoPupilBookTrackMap[unitConfig.unitNumber] ?? [])
    .filter(([cd, sourceTrack]) => `PEC 2 Power Up CD ${cd} Track_${String(sourceTrack).padStart(2, "0")}.mp3` !== sharedFile)
    .flatMap(([cd, sourceTrack, track]) => {
      const filename = `PEC 2 Power Up CD ${cd} Track_${String(sourceTrack).padStart(2, "0")}.mp3`;
      const sourcePath = join(source, cd === 4 ? "Activity Book Class Audio Level 2" : "Student's Book Class Audio Level 2", filename);
      if (!existsSync(sourcePath)) throw new Error(`Missing verified Level 2 PB audio: ${sourcePath}`);
      const lessons = levelTwoPupilBookLessonMap[unitConfig.unitNumber]?.[`${cd}.${sourceTrack}`]
        ?? levelTwoPupilBookLessonMap[unitConfig.unitNumber]?.[sourceTrack]
        ?? [null];
      return lessons.map((lesson) => ({
        lesson,
        role: "pupil-book",
        track,
        filename,
        sourcePath,
        publicPath: `/curriculum-resources/power-up/${config.grade}/${unitConfig.unitSlug}/audio/pupil-book/${filename}`,
        mappingStatus: "verified-from-teacher-book-boundary-and-pb-audioscript",
      }));
    });
}

function levelTwoUnitHelloAudio(config) {
  if (config.levelKey !== "level_2" || unitConfig.unitNumber !== null) return [];
  const source = join(sourceRoot, config.levelKey, "source", "Student's Book Class Audio Level 2");
  return [[1, 2, "1.02"], [1, 3, "1.03"], [1, 4, "1.04"], [2, 5, "1.05"], [2, 6, "1.06"]].map(([lesson, sourceTrack, track]) => {
    const filename = `PEC 2 Power Up CD 1 Track_${String(sourceTrack).padStart(2, "0")}.mp3`;
    const sourcePath = join(source, filename);
    if (!existsSync(sourcePath)) throw new Error(`Missing verified Level 2 Unit Hello PB audio: ${sourcePath}`);
    return {
      lesson,
      role: "pupil-book",
      track,
      filename,
      sourcePath,
      publicPath: `/curriculum-resources/power-up/${config.grade}/${unitConfig.unitSlug}/audio/pupil-book/${filename}`,
      mappingStatus: "verified-from-pupil-book-page",
    };
  });
}

function starterUnitHelloAudio(config) {
  if (config.levelKey !== "starter" || unitConfig.unitNumber !== null) return [];
  const source = join(sourceRoot, config.levelKey, "source", "audio", "pupil_book");
  const entries = [[1, 4, 1, 2], [2, 5, 1, 3], [2, 5, 2, 4], [3, 6, 1, 5], [3, 6, 2, 6], [4, 7, 1, 7], [4, 7, 2, 8]];
  return entries.map(([lesson, page, exercise, sequence]) => {
    const filename = `PU_SB_BE_L0_HU_Pg${String(page).padStart(3, "0")}_Ex${String(exercise).padStart(2, "0")}_tr_${String(sequence).padStart(3, "0")}.mp3`;
    const sourcePath = join(source, filename);
    if (!existsSync(sourcePath)) throw new Error(`Missing verified Starter Unit Hello PB audio: ${sourcePath}`);
    return { lesson, role: "pupil-book", track: `tr_${String(sequence).padStart(3, "0")}`, filename, sourcePath, publicPath: `/curriculum-resources/power-up/${config.grade}/${unitConfig.unitSlug}/audio/pupil-book/${filename}`, mappingStatus: "verified-from-pupil-book-page" };
  });
}

function starterReviewPupilBookAudio(config) {
  if (config.levelKey !== "starter" || ![3, 6, 9].includes(unitConfig.unitNumber)) return [];
  const source = join(sourceRoot, config.levelKey, "source", "audio", "pupil_book");
  const review = {
    3: [[11, "Review_U01_U03", 38, 1, 64], [11, "Review_U01_U03", 38, 2, 65], [12, "Review_U01_U03", 39, 4, 66]],
    6: [[11, "Review_U04_U06", 70, 1, 123], [11, "Review_U04_U06", 70, 2, 124], [12, "Review_U04_U06", 71, 4, 125]],
    9: [[11, "Review_U07_U09", 102, 1, 183], [11, "Review_U07_U09", 102, 2, 184]],
  }[unitConfig.unitNumber];
  return review.map(([lesson, reviewSlug, page, exercise, sequence]) => {
    const filename = `PU_SB_BE_L0_${reviewSlug}_Pg${String(page).padStart(3, "0")}_Ex${String(exercise).padStart(2, "0")}_tr_${String(sequence).padStart(3, "0")}.mp3`;
    const sourcePath = join(source, filename);
    if (!existsSync(sourcePath)) throw new Error(`Missing verified Starter review PB audio: ${sourcePath}`);
    return { lesson, role: "pupil-book", track: `tr_${String(sequence).padStart(3, "0")}`, filename, sourcePath, publicPath: `/curriculum-resources/power-up/${config.grade}/${unitConfig.unitSlug}/audio/pupil-book/${filename}`, mappingStatus: "verified-review-from-pupil-book-page" };
  });
}

function verifiedActivityBookAudio(config, map) {
  if (!map?.levels?.[config.levelKey]) return [];
  const items = map.levels[config.levelKey].items ?? [];
  const expectedSharedStory = config.levelKey === "level_2" ? levelTwoSharedStoryAudio[unitConfig.unitNumber] : null;
  const sharedStoryItem = items.find((item) => /Student's Book Class Audio|Student Book Class Audio|Pupil/i.test(item.audioFilePath ?? ""));
  if (expectedSharedStory && (
    !sharedStoryItem
    || Number(sharedStoryItem.lesson) !== 3
    || Number(sharedStoryItem.abPage) !== expectedSharedStory.abPage
    || sharedStoryItem.printedTrack !== expectedSharedStory.track
  )) {
    throw new Error(`Invalid Level 2 shared story mapping for ${unitConfig.unitSlug}`);
  }

  return items
    .filter((item) => ["verified", "low-confidence"].includes(item.confidence) && item.audioFilePath && existsSync(item.audioFilePath))
    .map((item) => {
      const isPupilBookReuse = /Student's Book Class Audio|Student Book Class Audio|Pupil/i.test(item.audioFilePath);
      const role = isPupilBookReuse ? "shared-pupil-activity" : "activity-book";
      const roleDir = isPupilBookReuse ? "shared" : "activity-book";
      return {
        lesson: item.lesson == null ? null : Number(item.lesson),
        role,
        track: item.printedTrack,
        filename: item.audioFile,
        sourcePath: item.audioFilePath,
        publicPath: `/curriculum-resources/power-up/${config.grade}/${unitConfig.unitSlug}/audio/${roleDir}/${item.audioFile}`,
        mappingStatus: item.confidence === "verified" ? "verified-from-ab-pdf" : "low-confidence-from-ab-pdf",
        usage: isPupilBookReuse ? ["pupil-book", "activity-book"] : ["activity-book"],
        exercise: item.exercise,
        page: Number(item.abPage),
        ocrConf: item.ocrConf,
        confidence: item.confidence,
        sharedAudioRule: isPupilBookReuse ? {
          kind: "level-2-lesson-3-story-reuse",
          activityBookBookPage: Number(item.abPage),
          pupilBookTrack: levelTwoPupilBookTrackMap[unitConfig.unitNumber]?.find(([, sourceTrack]) => item.audioFile.includes(`Track_${String(sourceTrack).padStart(2, "0")}.mp3`))?.[2],
        } : undefined,
      };
    });
}

function levelOneUnitHelloAudio(config) {
  if (unitConfig.unitNumber !== null || config.levelKey !== "level_1") return [];
  const source = join(sourceRoot, config.levelKey, "source");
  const entries = [
    { lesson: 1, role: "pupil-book", track: "0.02", dir: "Student's Book Class Audio Level 1", filename: "PEC L1 Power Up CD1 Track 02.mp3" },
    { lesson: 1, role: "pupil-book", track: "0.03", dir: "Student's Book Class Audio Level 1", filename: "PEC L1 Power Up CD1 Track 03.mp3" },
    { lesson: 1, role: "pupil-book", track: "0.04", dir: "Student's Book Class Audio Level 1", filename: "PEC L1 Power Up CD1 Track 04.mp3" },
    { lesson: 2, role: "pupil-book", track: "0.05", dir: "Student's Book Class Audio Level 1", filename: "PEC L1 Power Up CD1 Track 05.mp3" },
    { lesson: 2, role: "pupil-book", track: "0.06", dir: "Student's Book Class Audio Level 1", filename: "PEC L1 Power Up CD1 Track 06.mp3" },
    { lesson: 1, role: "activity-book", track: "0.07", dir: "Activity Book Class Audio Level 1", filename: "PEC L1 Power Up CD4 Track 07.mp3" },
    { lesson: 2, role: "activity-book", track: "0.08", dir: "Activity Book Class Audio Level 1", filename: "PEC L1 Power Up CD4 Track 08.mp3" },
  ];

  return entries
    .map((entry) => {
      const sourcePath = join(source, entry.dir, entry.filename);
      if (!existsSync(sourcePath)) return null;
      return {
        lesson: entry.lesson,
        role: entry.role,
        track: entry.track,
        filename: entry.filename,
        sourcePath,
        publicPath: `/curriculum-resources/power-up/${config.grade}/${unitConfig.unitSlug}/audio/${entry.role}/${entry.filename}`,
        mappingStatus: "unit-hello-manual-map",
      };
    })
    .filter(Boolean);
}

// Level 1's printed track labels (for example, 4.01) are not the CD and
// filename numbers.  The three Pupil's Book CDs run continuously across
// units, with a few omitted/teacher-only tracks.  These pairs are verified
// against the Level 1 Teacher's Book resource IDs and PB audioscript.
const levelOnePupilBookTrackMap = {
  1: [[1, 7, "1.01"], [1, 8, "1.02"], [1, 9, "1.03"], [1, 10, "1.04"], [1, 11, "1.05"], [1, 12, "1.06"], [1, 13, "1.07"], [1, 14, "1.08"], [1, 16, "1.10"], [1, 17, "1.11"], [1, 18, "1.12"], [1, 19, "1.13"]],
  2: [[1, 20, "2.01"], [1, 21, "2.02"], [1, 22, "2.03"], [1, 23, "2.04"], [1, 24, "2.05"], [1, 25, "2.06"], [1, 26, "2.07"], [1, 27, "2.08"], [1, 29, "2.10"], [1, 30, "2.11"], [1, 31, "2.12"], [1, 32, "2.13"], [1, 33, "2.14"]],
  3: [[1, 34, "3.01"], [1, 35, "3.02"], [1, 36, "3.03"], [1, 37, "3.04"], [1, 38, "3.05"], [1, 39, "3.06"], [1, 40, "3.07"], [1, 41, "3.08"], [1, 43, "3.10"], [1, 44, "3.11"], [1, 45, "3.12"], [1, 46, "3.13"], [1, 47, "3.14"], [1, 48, "3.15"]],
  4: [[2, 2, "4.01"], [2, 3, "4.02"], [2, 4, "4.03"], [2, 5, "4.04"], [2, 6, "4.05"], [2, 7, "4.06"], [2, 8, "4.07"], [2, 9, "4.08"], [2, 11, "4.10"], [2, 12, "4.11"], [2, 13, "4.12"], [2, 14, "4.13"], [2, 15, "4.14"], [2, 16, "4.15"], [2, 17, "4.16"]],
  5: [[2, 18, "5.01"], [2, 19, "5.02"], [2, 20, "5.03"], [2, 21, "5.04"], [2, 22, "5.05"], [2, 23, "5.06"], [2, 24, "5.07"], [2, 26, "5.09"], [2, 27, "5.10"], [2, 28, "5.11"], [2, 29, "5.12"], [2, 30, "5.13"]],
  6: [[2, 31, "6.01"], [2, 32, "6.02"], [2, 33, "6.03"], [2, 34, "6.04"], [2, 35, "6.05"], [2, 36, "6.06"], [2, 37, "6.07"], [2, 39, "6.09"], [2, 40, "6.10"], [2, 41, "6.11"], [2, 42, "6.12"], [2, 43, "6.13"]],
  7: [[2, 44, "7.01"], [2, 45, "7.02"], [2, 46, "7.03"], [2, 47, "7.04"], [3, 2, "7.05"], [3, 3, "7.06"], [3, 4, "7.07"], [3, 5, "7.08"], [3, 7, "7.10"], [3, 8, "7.11"], [3, 9, "7.12"], [3, 10, "7.13"], [3, 11, "7.14"], [3, 12, "7.15"]],
  8: [[3, 13, "8.01"], [3, 14, "8.02"], [3, 15, "8.03"], [3, 16, "8.04"], [3, 17, "8.05"], [3, 18, "8.06"], [3, 19, "8.07"], [3, 20, "8.08"], [3, 22, "8.10"], [3, 23, "8.11"], [3, 24, "8.12"], [3, 25, "8.13"], [3, 26, "8.14"], [3, 27, "8.15"], [3, 28, "8.16"]],
  9: [[3, 29, "9.01"], [3, 30, "9.02"], [3, 31, "9.03"], [3, 32, "9.04"], [3, 33, "9.05"], [3, 34, "9.06"], [3, 35, "9.07"], [3, 37, "9.09"], [3, 38, "9.10"], [3, 39, "9.11"], [3, 40, "9.12"], [4, 2, "9.13"], [4, 3, "9.14"]],
};

// Teacher's Book lesson references for the physical CD tracks above. A track
// used by two lessons is intentionally emitted into both lesson resource lists.
const levelOnePupilBookLessonMap = {
  1: { 7: [2], 8: [2], 9: [2], 10: [2], 11: [3], 12: [4], 13: [4], 14: [5], 16: [6], 17: [6], 18: [7], 19: [9] },
  2: { 20: [2], 21: [2], 22: [2], 23: [2], 24: [3], 25: [4], 26: [4], 27: [5], 29: [5], 30: [6], 31: [6], 32: [7], 33: [9] },
  3: { 34: [2], 35: [2], 36: [2], 37: [2], 38: [3], 39: [4], 40: [4], 41: [5], 43: [6], 44: [6], 45: [7], 46: [9], 47: [13], 48: [14] },
  4: { 2: [2], 3: [2], 4: [2], 5: [2], 6: [3], 7: [4], 8: [4], 9: [5], 11: [6], 12: [6], 13: [7], 14: [7], 15: [9], 16: [11], 17: [11] },
  5: { 18: [2], 19: [2], 20: [2], 21: [3], 22: [4], 23: [4], 24: [5], 26: [6], 27: [6], 28: [7], 29: [9, 10], 30: [11] },
  6: { 31: [2], 32: [2], 33: [2], 34: [3], 35: [4], 36: [4], 37: [5], 39: [6], 40: [6], 41: [9, 10], 42: [13], 43: [14] },
  7: { "2.44": [2], "2.45": [2], "2.46": [2], "2.47": [2], "3.2": [3], "3.3": [4], "3.4": [4], "3.5": [5], "3.7": [5], "3.8": [6], "3.9": [6], "3.10": [7], "3.11": [9, 10], "3.12": [11] },
  8: { 13: [2], 14: [2], 15: [2], 16: [2], 17: [3], 18: [4], 19: [4], 20: [5], 22: [6], 23: [6], 24: [7], 25: [7], 26: [9], 27: [11], 28: [11] },
  9: { "3.29": [2], "3.30": [2], "3.31": [2], "3.32": [3], "3.33": [4], "3.34": [4], "3.35": [5], "3.37": [6], "3.38": [6], "3.39": [7], "3.40": [9], "4.2": [13], "4.3": [14] },
};

function verifiedLevelOnePupilBookAudio(config) {
  if (config.levelKey !== "level_1" || unitConfig.unitNumber === null) return [];
  const source = join(sourceRoot, config.levelKey, "source");
  return (levelOnePupilBookTrackMap[unitConfig.unitNumber] ?? []).flatMap(([cd, sourceTrack, track]) => {
    const filename = `PEC L1 Power Up CD${cd} Track ${String(sourceTrack).padStart(2, "0")}.mp3`;
    // The PB's final two U9 tracks are labelled CD4 in the Teacher's Book;
    // the supplied source archive stores that physical CD alongside AB audio.
    const sourcePath = join(source, cd === 4 ? "Activity Book Class Audio Level 1" : "Student's Book Class Audio Level 1", filename);
    if (!existsSync(sourcePath)) throw new Error(`Missing verified Level 1 PB audio: ${sourcePath}`);
    const lessons = levelOnePupilBookLessonMap[unitConfig.unitNumber]?.[`${cd}.${sourceTrack}`]
      ?? levelOnePupilBookLessonMap[unitConfig.unitNumber]?.[sourceTrack]
      ?? [null];
    return lessons.map((lesson) => ({
      lesson,
      role: "pupil-book",
      track,
      filename,
      sourcePath,
      publicPath: `/curriculum-resources/power-up/${config.grade}/${unitConfig.unitSlug}/audio/pupil-book/${filename}`,
      mappingStatus: "verified-from-teacher-book",
    }));
  });
}

function trackSet(levelKey) {
  if (unitConfig.unitNumber === null) return new Set();
  const scriptDir = join(
    sourceRoot,
    levelKey,
    "source",
    levelKey === "level_1" ? "Power Up Level 1 Audio scripts" : "Power Up Level 2 Audio scripts",
  );
  const scripts = walk(scriptDir).filter((f) => /Audioscripts\.pdf$/i.test(f));
  const tracks = new Set();
  for (const file of scripts) {
    const text = execFileSync("pdftotext", ["-layout", file, "-"], { encoding: "utf8" });
    for (const match of text.matchAll(/Track(?:s)?\s+(\d+\.\d{2})(?:\s+and\s+(\d+\.\d{2}))?/gi)) {
      for (const track of [match[1], match[2]].filter(Boolean)) {
        if (Number(track.split(".")[0]) === unitConfig.unitNumber) tracks.add(track);
      }
    }
  }
  return tracks;
}

function audioEntries(config, unitLessons, map) {
  if (unitConfig.unitNumber === null) return [...starterUnitHelloAudio(config), ...levelOneUnitHelloAudio(config), ...levelTwoUnitHelloAudio(config), ...verifiedActivityBookAudio(config, map)];
  const source = join(sourceRoot, config.levelKey, "source");
  const files = walk(source).filter((f) => f.toLowerCase().endsWith(".mp3"));
  const grade = config.grade;

  if (config.levelKey === "starter") {
    const starterUnitPattern = new RegExp(`PU_SB_BE_L0_${unitConfig.paddedSourceUnit}_`, "i");
    const starterTrackPattern = new RegExp(`PU_SB_BE_L0_${unitConfig.paddedSourceUnit}_Pg(\\d+).*?_tr_(\\d+)\\.mp3$`, "i");
    const pupilBookAudio = files
      .filter((f) => starterUnitPattern.test(basename(f)))
      .map((file) => {
        const name = basename(file);
        const match = name.match(starterTrackPattern);
        if (!match) return null;
        const page = Number(match[1]);
        const lesson = unitLessons.find((l) => l.pages.includes(page))?.lesson ?? null;
        return {
          lesson,
          role: "pupil-book",
          track: `tr_${match[2]}`,
          filename: name,
          sourcePath: file,
          publicPath: `/curriculum-resources/power-up/${grade}/${unitConfig.unitSlug}/audio/pupil-book/${name}`,
        };
      })
      .filter(Boolean);
    return [...pupilBookAudio, ...starterReviewPupilBookAudio(config), ...verifiedActivityBookAudio(config, map)];
  }

  const verifiedAbAudio = verifiedActivityBookAudio(config, map);
  if (config.levelKey === "level_1") return [...verifiedLevelOnePupilBookAudio(config), ...pupilBookAccompanimentAudio(config), ...verifiedAbAudio];
  if (config.levelKey === "level_2" && unitConfig.unitNumber >= 1) {
    return [...verifiedLevelTwoPupilBookAudio(config, verifiedAbAudio.find((audio) => audio.role === "shared-pupil-activity")), ...pupilBookAccompanimentAudio(config), ...verifiedAbAudio];
  }
  const tracks = trackSet(config.levelKey);
  const pupilBookAudio = files
    .filter((f) => {
      const name = basename(f);
      const match = config.levelKey === "level_1" ? name.match(/CD(\d+) Track (\d+)/i) : name.match(/CD\s*(\d+) Track[_ ](\d+)/i);
      if (!match) return false;
      const track = `${Number(match[1])}.${match[2].padStart(2, "0")}`;
      return Number(match[1]) === unitConfig.unitNumber && tracks.has(track);
    })
    .map((file) => {
      const name = basename(file);
      const match = config.levelKey === "level_1" ? name.match(/CD(\d+) Track (\d+)/i) : name.match(/CD\s*(\d+) Track[_ ](\d+)/i);
      const role = file.includes("Activity Book") ? "activity-book" : "pupil-book";
      return {
        lesson: null,
        role,
        track: `${Number(match[1])}.${match[2].padStart(2, "0")}`,
        filename: name,
        sourcePath: file,
        publicPath: `/curriculum-resources/power-up/${grade}/${unitConfig.unitSlug}/audio/${role}/${name}`,
        mappingStatus: "unit-track-only",
      };
    });

  return [...pupilBookAudio.filter((audio) => audio.role !== "activity-book"), ...verifiedAbAudio];
}

function audioMappingStatus(audios, map) {
  if (!map) return audios.some((a) => a.mappingStatus === "unit-track-only") ? "unit-track-no-ab-map" : "lesson-page-no-ab-map";
  return audios.some((a) => a.mappingStatus === "unit-track-only") ? "mixed-unit-track-and-verified-ab" : "lesson-page-and-verified-ab";
}

const activityBookTrackMap = abTrackMap();
const summary = [];

for (const config of configs) {
  const gradeDir = join(sourceRoot, config.levelKey);
  const pdfPattern = new RegExp(`_(TB|PB|AB)_${unitConfig.sourceUnit}_L\\d+_pg\\d+\\.pdf$`, "i");
  const pdfFiles = walk(gradeDir).filter((f) => pdfPattern.test(basename(f)));
  const pdfs = pdfFiles.map((file) => parsePdfEntry(file, config.levelKey)).filter(Boolean);
  const lessons = Array.from(new Set(pdfs.map((p) => p.lesson)))
    .sort((a, b) => a - b)
    .map((lesson) => ({
      lesson,
      pages: pdfs.filter((p) => p.lesson === lesson).map((p) => p.page),
    }));
  const audios = audioEntries(config, lessons, activityBookTrackMap);
  const manifest = {
    schemaVersion: "power-up-resource-manifest.v0.1",
    grade: config.grade,
    powerUpLevel: { key: config.levelKey, name: config.levelName },
    unit: unitConfig.unitSlug,
    sourceUnit: unitConfig.sourceUnit,
    generatedAt: new Date().toISOString(),
    lessons: lessons.map(({ lesson }) => ({
      lesson,
      pdfs: pdfs.filter((p) => p.lesson === lesson),
      audio: audios.filter((a) => a.lesson === lesson),
      ...(levelTwoLessonNotes[unitConfig.unitNumber]?.[lesson] ? { notes: levelTwoLessonNotes[unitConfig.unitNumber][lesson] } : {}),
    })),
    unitAudio: audios.filter((a) => a.lesson === null),
    summary: {
      pdfCount: pdfs.length,
      audioCount: audios.length,
      lessonCount: lessons.length,
      audioMapping: audioMappingStatus(audios, activityBookTrackMap),
      verifiedActivityBookAudioCount: audios.filter((a) => a.mappingStatus === "verified-from-ab-pdf").length,
      lowConfidenceActivityBookAudioCount: audios.filter((a) => a.mappingStatus === "low-confidence-from-ab-pdf").length,
      activityBookTrackMap: activityBookTrackMap ? "available" : "missing",
    },
  };

  for (const resource of [...pdfs, ...audios]) copyResource(resource.sourcePath, resource.publicPath);
  const outputDir = join(publicRoot, config.grade, unitConfig.unitSlug);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "resource-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  summary.push({
    grade: config.grade,
    unit: unitConfig.unitSlug,
    lessons: lessons.length,
    pdfs: pdfs.length,
    audio: audios.length,
    verifiedActivityBookAudio: manifest.summary.verifiedActivityBookAudioCount,
    lowConfidenceActivityBookAudio: manifest.summary.lowConfidenceActivityBookAudioCount,
    activityBookTrackMap: manifest.summary.activityBookTrackMap,
    audioMapping: manifest.summary.audioMapping,
  });
}

writeFileSync(
  join(publicRoot, `${unitConfig.unitSlug}-resource-summary.json`),
  `${JSON.stringify({ schemaVersion: "power-up-resource-summary.v0.1", generatedAt: new Date().toISOString(), unit: unitConfig.unitSlug, grades: summary }, null, 2)}\n`,
);
console.table(summary);
