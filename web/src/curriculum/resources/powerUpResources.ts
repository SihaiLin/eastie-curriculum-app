export type PowerUpResourceKind = "pdf" | "audio" | "reference";

export interface PowerUpSourceResource {
  type: PowerUpResourceKind;
  label: string;
  href?: string;
  icon: string;
  hint: string;
  download?: boolean;
  role?: "TB" | "PB" | "AB" | "audio";
  sourceRole?: string;
}

interface ManifestPdf {
  role: "TB" | "PB" | "AB";
  page: number;
  publicPath: string;
}

interface ManifestAudio {
  role: string;
  track: string;
  publicPath: string;
  mappingStatus?: string;
  confidence?: string;
}

interface ManifestLesson {
  lesson: number;
  pdfs: ManifestPdf[];
  audio: ManifestAudio[];
}

interface PowerUpResourceManifest {
  grade: string;
  unit: string;
  lessons: ManifestLesson[];
  unitAudio?: ManifestAudio[];
}

export interface PowerUpSourceGroups {
  pdfItems: PowerUpSourceResource[];
  pupilBookAudio: PowerUpSourceResource[];
  activityBookAudio: PowerUpSourceResource[];
  sharedAudio: PowerUpSourceResource[];
  otherItems: PowerUpSourceResource[];
  manifestStatus: "loaded" | "fallback";
}

const manifestCache = new Map<string, Promise<PowerUpResourceManifest | null>>();

export function loadPowerUpResourceManifest(level: string | undefined, unitNumber: number | undefined) {
  const grade = normalizeGrade(level);
  if (!grade || unitNumber === undefined) return Promise.resolve(null);

  const unit = unitNumber === 0 ? "unit-uh" : `unit-${String(unitNumber).padStart(2, "0")}`;
  const key = `${grade}/${unit}`;
  const cached = manifestCache.get(key);
  if (cached) return cached;

  const request = fetch(`/curriculum-resources/power-up/${grade}/${unit}/resource-manifest.json`)
    .then((res) => (res.ok ? (res.json() as Promise<PowerUpResourceManifest>) : null))
    .catch(() => null);

  manifestCache.set(key, request);
  return request;
}

export function buildPowerUpSourceGroups(
  value: string,
  lessonId: string,
  manifest: PowerUpResourceManifest | null,
): PowerUpSourceGroups {
  if (!manifest) {
    return {
      ...buildFallbackGroups(value),
      manifestStatus: "fallback",
    };
  }

  const lessonNo = lessonId.match(/pu-l(\d+)/)?.[1];
  if (!lessonNo) {
    return {
      ...buildFallbackGroups(value),
      manifestStatus: "fallback",
    };
  }

  const lesson = manifest.lessons.find((item) => item.lesson === Number(lessonNo));
  if (!lesson) {
    return {
      ...buildFallbackGroups(value),
      manifestStatus: "fallback",
    };
  }

  const sourceTrackRefs = parseTrackRefs(value);

  const pdfItems = uniqueBy(
    lesson.pdfs
      .slice()
      .sort((a, b) => pdfRoleOrder(a.role) - pdfRoleOrder(b.role))
      .map((pdf) => ({
        type: "pdf" as const,
        label: `${pdf.role} P${pdf.page}`,
        href: pdf.publicPath,
        icon: "📘",
        hint: pdfRoleName(pdf.role),
        role: pdf.role,
      })),
    (item) => `${item.label}:${item.href}`,
  );

  const unitLessonAudio = manifest.lessons.flatMap((item) => item.audio);
  const lessonAudio = lesson.audio
    .filter((audio) => !isCopyrightAudio(audio))
    .map((audio) => audioResource(audio, manifest.grade, manifest.unit, unitLessonAudio));
  const unitAudio = (manifest.unitAudio ?? [])
    .filter((audio) => !isCopyrightAudio(audio))
    .filter((audio) => sourceTrackRefs.some((track) => normalizeTrack(track) === normalizeTrack(audio.track)))
    .map((audio) => audioResource(audio, manifest.grade, manifest.unit, manifest.unitAudio ?? []));

  const audioItems = uniqueBy([...lessonAudio, ...unitAudio], (item) => `${item.label}:${item.href}`);
  const sharedAudio = audioItems.filter((item) => item.sourceRole?.toLowerCase().includes("shared"));
  const pupilBookAudio = audioItems
    .filter((item) => Boolean(item.sourceRole?.toLowerCase().includes("pupil")) && !item.sourceRole?.toLowerCase().includes("shared"))
    .sort(compareAudioTrackLabels);
  const activityBookAudio = audioItems.filter((item) => Boolean(item.sourceRole?.toLowerCase().includes("activity")) && !item.sourceRole?.toLowerCase().includes("shared"));
  const otherItems = buildFallbackGroups(value).otherItems.filter((item) => !isHandledByManifest(item.label));

  return {
    pdfItems,
    pupilBookAudio,
    activityBookAudio,
    sharedAudio,
    otherItems,
    manifestStatus: "loaded",
  };
}

function buildFallbackGroups(value: string): Omit<PowerUpSourceGroups, "manifestStatus"> {
  const otherItems = value
    .split("｜")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((item) => ({
      type: "reference" as const,
      label: item,
      icon: "•",
      hint: "Reference",
    }));

  return { pdfItems: [], pupilBookAudio: [], activityBookAudio: [], sharedAudio: [], otherItems };
}

function parsePdfRefs(value: string) {
  return value
    .split("｜")
    .map((item) => item.trim().match(/^(TB|PB|AB)\s+p(\d+)/i))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      role: match[1].toUpperCase() as ManifestPdf["role"],
      page: Number(match[2]),
    }));
}

function parseTrackRefs(value: string) {
  const refs: string[] = [];
  const trackPattern = /\((\d+\.\d+)\)\.mp3/g;
  let match: RegExpExecArray | null;
  while ((match = trackPattern.exec(value)) !== null) {
    refs.push(match[1]);
  }
  return refs;
}

function normalizeTrack(track: string) {
  const match = track.match(/^(\d+)\.(\d+)$/);
  if (!match) return track;
  return `${Number(match[1])}.${match[2].padStart(2, "0")}`;
}

function normalizeGrade(level: string | undefined) {
  const grade = level?.toLowerCase();
  return grade === "k1" || grade === "k2" || grade === "k3" ? grade : "";
}

function pdfRoleOrder(role: ManifestPdf["role"]) {
  return { TB: 1, PB: 2, AB: 3 }[role];
}

function audioResource(audio: ManifestAudio, grade: string, unitSlug: string, siblingAudio: ManifestAudio[]): PowerUpSourceResource {
  const normalizedRole = audio.role.toLowerCase();
  const role = normalizedRole.includes("shared")
    ? "Shared Pupil's Book + Activity Book"
    : normalizedRole.includes("activity")
      ? "Activity Book"
      : normalizedRole.includes("accompaniment")
        ? "PB acc."
        : "Pupil's Book";
  const reviewHint = audio.mappingStatus === "low-confidence-from-ab-pdf" ? " · Needs review" : "";
  const track = displayTrack(audio, grade, unitSlug, siblingAudio);
  const labelSuffix = normalizedRole.includes("accompaniment") ? " · acc." : "";
  return {
    type: "audio",
    label: `Track ${track}${labelSuffix}`,
    href: audio.publicPath,
    icon: "▶",
    hint: `${role}${reviewHint}`,
    download: true,
    role: "audio",
    sourceRole: audio.role,
  };
}

function pdfRoleName(role: ManifestPdf["role"]) {
  return {
    TB: "Teacher's Book",
    PB: "Pupil's Book",
    AB: "Activity Book",
  }[role];
}

function displayTrack(audio: ManifestAudio, grade: string, unitSlug: string, siblingAudio: ManifestAudio[]) {
  const physicalTrack = physicalCdTrack(audio.publicPath);
  const role = audio.role.toLowerCase();
  if (grade === "k2" && role.includes("pupil") && !role.includes("shared") && physicalTrack) return physicalTrack;
  if (grade === "k3" && physicalTrack) return physicalTrack;

  if (!/^tr_\d+$/i.test(audio.track)) return audio.track;
  const unitNumber = Number(unitSlug.match(/unit-(\d+)/)?.[1]);
  if (!unitNumber) return audio.track;
  const sortedStarterTracks = siblingAudio
    .filter((item) => item.role === audio.role && /^tr_\d+$/i.test(item.track))
    .map((item) => item.track)
    .sort((a, b) => Number(a.match(/\d+/)?.[0] ?? 0) - Number(b.match(/\d+/)?.[0] ?? 0));
  const index = sortedStarterTracks.indexOf(audio.track);
  if (index < 0) return audio.track;
  return `${unitNumber}.${String(index + 1).padStart(2, "0")}`;
}

function physicalCdTrack(path: string) {
  const filename = decodeURIComponent(path.split("/").pop() ?? "");
  const match = filename.match(/CD\s*(\d+)\s*Track[_ ]+(\d+)\.mp3$/i);
  if (!match) return "";
  return `${Number(match[1])}.${match[2].padStart(2, "0")}`;
}

function isCopyrightAudio(audio: ManifestAudio) {
  return audio.role.toLowerCase().includes("copyright");
}

function compareAudioTrackLabels(a: PowerUpSourceResource, b: PowerUpSourceResource) {
  const aTrack = trackSortValue(a.label);
  const bTrack = trackSortValue(b.label);
  if (aTrack !== bTrack) return aTrack - bTrack;
  return a.hint.localeCompare(b.hint);
}

function trackSortValue(label: string) {
  const match = label.match(/Track\s+(\d+)\.(\d+)/i);
  if (!match) return Number.MAX_SAFE_INTEGER;
  return Number(match[1]) * 1000 + Number(match[2]);
}

function isHandledByManifest(label: string) {
  return /^(TB|PB|AB)\s+p(?:\d+|tbd)$/i.test(label) || /\(\d+\.\d+\)\.mp3$/.test(label);
}

function uniqueBy<T>(items: T[], keyFn: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
