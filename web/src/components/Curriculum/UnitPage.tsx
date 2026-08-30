import { Fragment, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FeedbackButton } from "../Feedback/FeedbackButton";
import { createFeedbackPayload } from "../../feedback/feedbackContext";
import { getDynamicUnitEntry } from "../../curriculum/dynamicUnitManifest";
import { LanguageUnitPage } from "./LanguageUnitPage";
import { KLanguageUnitPage } from "./KLanguageUnitPage";
import type { CourseTrack, CurriculumUnit, LanguageCode, LanguageSection as LanguageSectionData, Lesson, UnitOverviewSection as UnitOverviewSectionData } from "../../curriculum/types";

export function UnitPage({ language }: { language: LanguageCode }) {
  const params = useParams();
  const location = useLocation();
  const pathParams = parseCurriculumPath(location.pathname);
  const unitNumber = parseUnitSlug(params.unitSlug ?? pathParams.unitSlug);
  const entry = getDynamicUnitEntry(params.level ?? pathParams.level, params.courseType ?? pathParams.courseType, unitNumber);
  const selectedCourseCode = (params.courseSlug ?? pathParams.courseSlug)?.replace("course-", "").toUpperCase();
  const selectedLessonNumber = parseLessonSlug(params.lessonSlug);

  if (!entry) {
    return (
      <main className="unit-page">
        <section className="content">
          <section className="dashboard-section">
            <h1>Curriculum unit not found</h1>
            <p>The requested unit is not available in the current prototype registry.</p>
          </section>
        </section>
      </main>
    );
  }

  if (entry.renderer === "pg-pk-language") {
    return <LanguageUnitPage unit={entry.unit} />;
  }

  if (entry.renderer === "k-language") {
    return <KLanguageUnitPage unit={entry.unit} />;
  }

  const unit = entry.unit;
  const selectedCourse = selectedCourseCode
    ? unit.courses.find((course) => course.code.toUpperCase() === selectedCourseCode)
    : undefined;

  if (selectedCourseCode && !selectedCourse) {
    return (
      <main className="unit-page">
        <section className="content">
          <section className="dashboard-section">
            <h1>Course not found</h1>
            <p>The requested course is not available for this unit.</p>
          </section>
        </section>
      </main>
    );
  }

  return (
    <UnitRenderer
      language={language}
      selectedCourse={selectedCourse}
      selectedLessonNumber={selectedLessonNumber}
      unit={unit}
    />
  );
}

function parseCurriculumPath(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const curriculumIndex = parts.indexOf("curriculum");
  return {
    level: curriculumIndex >= 0 ? parts[curriculumIndex + 1] ?? "" : "",
    courseType: curriculumIndex >= 0 ? parts[curriculumIndex + 2] ?? "" : "",
    unitSlug: curriculumIndex >= 0 ? parts[curriculumIndex + 3] ?? "" : "",
    courseSlug: curriculumIndex >= 0 ? parts[curriculumIndex + 4] ?? "" : "",
  };
}

function parseUnitSlug(unitSlug: string | undefined) {
  if (unitSlug === "unit-uh") return 0;
  return Number((unitSlug ?? "").replace("unit-", ""));
}

function parseLessonSlug(lessonSlug: string | undefined) {
  if (!lessonSlug) return undefined;
  const match = lessonSlug.match(/lesson-(\d+)/i);
  return match ? Number(match[1]) : undefined;
}

function UnitRenderer({
  language,
  selectedCourse,
  selectedLessonNumber,
  unit,
}: {
  language: LanguageCode;
  selectedCourse?: CourseTrack;
  selectedLessonNumber?: number;
  unit: CurriculumUnit;
}) {
  const labels = useLabels(language);
  const isCoursePage = Boolean(selectedCourse);

  return (
    <main className="unit-page unit8-shell">
      <CourseDirectory labels={labels} language={language} selectedCourse={selectedCourse} selectedLessonNumber={selectedLessonNumber} unit={unit} />
      <section className="content unit8-main">
        {isCoursePage && selectedCourse ? (
          <CourseDetailPage
            course={selectedCourse}
            labels={labels}
            language={language}
            selectedLessonNumber={selectedLessonNumber}
            unit={unit}
          />
        ) : (
          <UnitOverviewPage labels={labels} language={language} unit={unit} />
        )}
      </section>
    </main>
  );
}

function CourseDirectory({
  labels,
  language,
  selectedCourse,
  selectedLessonNumber,
  unit,
}: {
  labels: Record<string, string>;
  language: LanguageCode;
  selectedCourse?: CourseTrack;
  selectedLessonNumber?: number;
  unit: CurriculumUnit;
}) {
  const unitPath = getUnitPath(unit);
  const courseOptions = [
    { label: labels.overview, value: unitPath },
    ...unit.courses.map((course) => ({
      label: `Course ${course.code} · ${course.title[language]}`,
      value: `${unitPath}/course-${course.code.toLowerCase()}`,
    })),
  ];
  const currentPath = selectedCourse ? `${unitPath}/course-${selectedCourse.code.toLowerCase()}` : unitPath;

  return (
    <aside className={`sidebar unit8-sidebar ${selectedCourse ? "course-lesson-sidebar" : ""}`} aria-label={language === "en" ? "Course navigation" : "课程导航"}>
      <h2>{selectedCourse ? (language === "en" ? "Lesson Directory" : "课程目录") : language === "en" ? "Course Directory" : "课程目录"}</h2>
      <label className="mobile-select-label course-select-label" htmlFor="mobile-course-nav">
        {selectedCourse ? (language === "en" ? "Lesson Directory" : "课程目录") : language === "en" ? "Course Directory" : "课程目录"}
      </label>
      {selectedCourse ? (
        <>
          <select
            aria-label={language === "en" ? "Lesson navigation" : "课程导航"}
            className="mobile-course-select"
            id="mobile-course-nav"
            onChange={(event) => {
              window.location.href = event.target.value;
            }}
            value={selectedLessonNumber ? `${unitPath}/course-${selectedCourse.code.toLowerCase()}/lesson-${String(selectedLessonNumber).padStart(2, "0")}` : currentPath}
          >
            <option value={currentPath}>{language === "en" ? "Overview" : "概览"}</option>
            {selectedCourse.lessons.map((lesson) => (
              <option key={lesson.number} value={`${unitPath}/course-${selectedCourse.code.toLowerCase()}/lesson-${String(lesson.number).padStart(2, "0")}`}>
                {language === "en" ? `Lesson ${lesson.number}` : `第${lesson.number}课`}
              </option>
            ))}
          </select>
          <Link className={`sidebar-link week-overview-link ${!selectedLessonNumber ? "active" : ""}`} to={currentPath}>
            <span>{language === "en" ? "Overview" : "概览"}</span>
            <strong>{selectedCourse.title[language]}</strong>
          </Link>
          {selectedCourse.lessons.map((lesson) => (
            <Link
              className={`lesson-nav-link ${selectedLessonNumber === lesson.number ? "active" : ""}`}
              key={lesson.number}
              to={`${unitPath}/course-${selectedCourse.code.toLowerCase()}/lesson-${String(lesson.number).padStart(2, "0")}`}
            >
              <span>{language === "en" ? `Lesson ${lesson.number}` : `第${lesson.number}课`}</span>
              <strong>{localizedDisplay(lesson.title[language], language)}</strong>
            </Link>
          ))}
        </>
      ) : (
        <>
          <select
            aria-label={language === "en" ? "Course navigation" : "课程导航"}
            className="mobile-course-select"
            id="mobile-course-nav"
            onChange={(event) => {
              window.location.href = event.target.value;
            }}
            value={currentPath}
          >
            {courseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Link className="sidebar-link active" to={unitPath}>
            <span>{language === "en" ? "Unit" : "单元"}</span>
            <strong>{labels.overview}</strong>
          </Link>
          {unit.courses.map((course) => (
            <Link
              className="sidebar-link"
              key={course.code}
              to={`${unitPath}/course-${course.code.toLowerCase()}`}
            >
              <span>{language === "en" ? `Course ${course.code}` : `课程 ${course.code}`}</span>
              <strong>{localizedDisplay(course.title[language], language)}</strong>
            </Link>
          ))}
        </>
      )}
    </aside>
  );
}

function UnitOverviewPage({
  labels,
  language,
  unit,
}: {
  labels: Record<string, string>;
  language: LanguageCode;
  unit: CurriculumUnit;
}) {
  const sourceMarkdown = unit.sourceMarkdown?.[language];
  if (sourceMarkdown) {
    return (
      <>
        <UnitOverview labels={labels} language={language} unit={unit} />
        <MarkdownDocument language={language} markdown={sourceMarkdown} unit={unit} />
      </>
    );
  }

  return (
    <>
      <UnitOverview labels={labels} language={language} unit={unit} />

      <section className="dashboard-section">
        <div className="section-title">
          <h2>{labels.language}</h2>
          <p>{language === "en" ? "Shared vocabulary and teacher-facing language pools." : "共享词汇与教师端语言池。"}</p>
        </div>
        <div className="chip-card">
          {unit.languageSections.map((section) => (
            <LanguageSection key={section.id} language={language} section={section} />
          ))}
        </div>
      </section>

      <section className="dashboard-section" id="courses">
        <div className="section-title">
          <h2>{labels.tracks}</h2>
          <p>{language === "en" ? "Open a course track to read its four-lesson sequence." : "打开课程轨道查看四课序列。"}</p>
        </div>
        <div className="course-entry-grid">
          {unit.courses.map((course) => (
            <CourseEntryCard course={course} key={course.code} language={language} unit={unit} />
          ))}
        </div>
      </section>

      {unit.overviewSections?.map((section) => (
        <UnitOverviewSection key={section.id} language={language} section={section} />
      ))}
    </>
  );
}

function UnitOverview({
  labels,
  language,
  unit,
}: {
  labels: Record<string, string>;
  language: LanguageCode;
  unit: CurriculumUnit;
}) {
  return (
    <header className="hero unit8-hero" id="overview">
      <div>
        <p className="breadcrumb">
          {language === "en"
            ? `${unit.level} Curriculum / Unit ${unit.unitNumber} / ${unit.courseType}`
            : `${unit.level} 课程 / 第${unit.unitNumber}单元 / ${unit.courseType === "non-language" ? "非语言课程" : "语言课程"}`}
        </p>
        <h1>
          {language === "en" ? `${unit.level} Unit ${unit.unitNumber}: ` : `${unit.level} 第${unit.unitNumber}单元：`}
          <span>{localizedDisplay(unit.title[language], language)}</span>
        </h1>
        <div className="hero-rule" aria-hidden="true" />
      </div>
      <div className="hero-art" aria-hidden="true">
        <img src="/assets/eastie_dolphins.png" alt="" />
      </div>
    </header>
  );
}

function LanguageSection({ language, section }: { language: LanguageCode; section: LanguageSectionData }) {
  return (
    <div>
      <h3>{localizedDisplay(section.title[language], language)}</h3>
      <div className="chip-row">
        {section.items.map((item) => (
          <span className={`chip chip-${section.variant ?? "support"}`} key={item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function UnitOverviewSection({ language, section }: { language: LanguageCode; section: UnitOverviewSectionData }) {
  return (
    <section className="dashboard-section overview-support-section" id={section.id}>
      <div className="section-title">
        <h2>{localizedDisplay(section.title[language], language)}</h2>
      </div>
      {section.body ? <p className="section-intro">{section.body[language]}</p> : null}
      {section.groups ? (
        <div className="overview-support-grid">
          {section.groups.map((group) => (
            <article className="overview-support-card" key={group.title.en}>
              <h3>{localizedDisplay(group.title[language], language)}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function CourseEntryCard({
  course,
  language,
  unit,
}: {
  course: CourseTrack;
  language: LanguageCode;
  unit: CurriculumUnit;
}) {
  const sourceMarkdown = course.sourceMarkdown?.[language];

  return (
    <article className="course-entry-card">
      <span className="course-code">Course {course.code}</span>
      <h3>{localizedDisplay(course.title[language], language)}</h3>
      <p>{course.purpose[language]}</p>
      <Link className="open-course-link" to={`${getUnitPath(unit)}/course-${course.code.toLowerCase()}`}>
        {language === "en" ? "Open course track" : "打开课程轨道"}
      </Link>
    </article>
  );
}

function CourseDetailPage({
  course,
  labels,
  language,
  selectedLessonNumber,
  unit,
}: {
  course: CourseTrack;
  labels: Record<string, string>;
  language: LanguageCode;
  selectedLessonNumber?: number;
  unit: CurriculumUnit;
}) {
  const sourceMarkdown = course.sourceMarkdown?.[language];

  return (
    <>
      <header className="course-hero unit8-hero" id="overview">
        <div>
          <p className="breadcrumb">
            {language === "en"
              ? `${unit.level} Curriculum / Unit ${unit.unitNumber} / Course ${course.code}`
              : `${unit.level} 课程 / 第${unit.unitNumber}单元 / 课程 ${course.code}`}
          </p>
          <h1>
            {language === "en" ? `${unit.level} Unit ${unit.unitNumber}: ` : `${unit.level} 第${unit.unitNumber}单元：`}
            <span>{localizedDisplay(unit.title[language], language)}</span>
          </h1>
          <h2 className="course-page-title">
            {language === "en" ? `Course ${course.code}: ` : `课程 ${course.code}：`}
            <span>{localizedDisplay(course.title[language], language)}</span>
          </h2>
          <div className="hero-rule" aria-hidden="true" />
        </div>
        <div className="hero-art" aria-hidden="true">
          <img src="/assets/eastie_dolphins.png" alt="" />
        </div>
        <Link className="back-link" to={getUnitPath(unit)}>
          {language === "en" ? "Back to Unit Overview" : "返回单元总览"}
        </Link>
      </header>

      {!selectedLessonNumber ? (
        <section className="dashboard-section course-unit-overview-placeholder">
          <div className="section-title">
            <h2>{language === "en" ? "Course Unit Overview" : "课程单元概览"}</h2>
            <p>
              {language === "en"
                ? "This page now represents this course line within the selected unit."
                : "此页面代表当前单元中的这一门课程线。"}
            </p>
          </div>
          <div className="overview-placeholder-content">
            <strong>{localizedDisplay(course.title[language], language)}</strong>
            <p>{course.purpose[language]}</p>
            <small>
              {language === "en"
                ? "A dedicated course-level overview Markdown file can be connected here when the source is ready."
                : "后续可在这里接入专门的课程级 overview Markdown。"}
            </small>
          </div>
        </section>
      ) : null}

      {sourceMarkdown ? (
        <MarkdownDocument course={course} language={language} markdown={sourceMarkdown} selectedLessonNumber={selectedLessonNumber} unit={unit} />
      ) : selectedLessonNumber ? (
        <SingleLessonFallback course={course} labels={labels} language={language} selectedLessonNumber={selectedLessonNumber} unit={unit} />
      ) : (
        <section className="dashboard-section">
          <div className="section-title">
            <h2>{labels.lessons}</h2>
            <p>{language === "en" ? "Four-week light lesson sequence." : "四周轻量课程序列。"}</p>
          </div>
          <div className="lesson-grid">
            {course.lessons.map((lesson) => (
              <LessonCard course={course} key={lesson.number} labels={labels} language={language} lesson={lesson} unit={unit} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function SingleLessonFallback({
  course,
  labels,
  language,
  selectedLessonNumber,
  unit,
}: {
  course: CourseTrack;
  labels: Record<string, string>;
  language: LanguageCode;
  selectedLessonNumber: number;
  unit: CurriculumUnit;
}) {
  const lesson = course.lessons.find((item) => item.number === selectedLessonNumber);
  if (!lesson) {
    return (
      <section className="dashboard-section">
        <h2>{language === "en" ? "Lesson not found" : "未找到课程"}</h2>
      </section>
    );
  }

  return <LessonCard course={course} labels={labels} language={language} lesson={lesson} unit={unit} />;
}

function LessonCard({
  course,
  labels,
  language,
  lesson,
  unit,
}: {
  course: CourseTrack;
  labels: Record<string, string>;
  language: LanguageCode;
  lesson: Lesson;
  unit: CurriculumUnit;
}) {
  const languageFocus = language === "zh" && lesson.languageFocusZh?.length ? lesson.languageFocusZh : lesson.languageFocus;
  const activitySeeds = language === "zh" && lesson.activitySeedsZh?.length ? lesson.activitySeedsZh : lesson.activitySeeds;

  return (
    <section className="lesson-card" id={`lesson-${lesson.number}`}>
      <span>
        {language === "zh" ? `第${lesson.number}课` : `Lesson ${lesson.number}`} / {labels.week} {lesson.week}
      </span>
      <h5>{localizedDisplay(lesson.title[language], language)}</h5>
      <p>{lesson.outcome[language]}</p>
      <strong>{labels.focus}</strong>
      <div className="mini-chip-row">
        {languageFocus.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <strong>{labels.activities}</strong>
      <ul>
        {activitySeeds.map((activity) => (
          <li key={activity}>{activity}</li>
        ))}
      </ul>
      <FeedbackButton context={createFeedbackPayload(unit, { course, language, lesson })} />
    </section>
  );
}

function LessonFeedback({
  course,
  language,
  lessonTitle,
  unit,
}: {
  course: CourseTrack;
  language: LanguageCode;
  lessonTitle: string;
  unit: CurriculumUnit;
}) {
  const lessonNumber = getLessonNumber(lessonTitle);
  const lesson = {
    activitySeeds: [],
    languageFocus: [],
    number: lessonNumber ?? 0,
    outcome: { en: "", zh: "" },
    title: { en: lessonTitle, zh: lessonTitle },
    week: 0,
  };

  return <FeedbackButton context={createFeedbackPayload(unit, { course, language, lesson })} />;
}

function useLabels(language: LanguageCode) {
  return useMemo(
    () => ({
      overview: language === "en" ? "Unit Overview" : "单元总览",
      tracks: language === "en" ? "Course Tracks" : "课程轨道",
      language: language === "en" ? "Unit Language" : "单元语言",
      week: language === "en" ? "Week" : "周",
      lessons: language === "en" ? "Lessons" : "课程",
      focus: language === "en" ? "Language focus" : "轻量主题语言",
      activities: language === "en" ? "Activity seeds" : "建议活动",
    }),
    [language],
  );
}

function getUnitPath(unit: CurriculumUnit) {
  return `/curriculum/${unit.level.toLowerCase()}/${unit.courseType}/unit-${String(unit.unitNumber).padStart(2, "0")}`;
}

function getOverviewHeading(id: string, language: LanguageCode) {
  const headings: Record<string, { en: string; zh: string }> = {
    "unit-language": { en: "Unit Language", zh: "单元语言" },
    "course-tracks": { en: "8 Course Track Files", zh: "八门课程轨道" },
    weekly: { en: "Week 1-4 Subthemes", zh: "第1-4周子主题" },
    teacher: { en: "Teacher Input Pool", zh: "教师输入资源库" },
    songs: { en: "Theme Songs / Chants", zh: "主题歌曲与韵律" },
    resources: { en: "Spaces and Materials", zh: "空间与材料" },
    boundaries: { en: "Boundaries and Observation", zh: "边界与观察" },
    "boundary-notes": { en: "Boundary Notes", zh: "边界说明" },
    observation: { en: "Unit-Level Observation Focus", zh: "单元层面观察重点" },
  };

  return headings[id]?.[language] ?? id;
}

function MarkdownDocument({
  course,
  language,
  markdown,
  selectedLessonNumber,
  unit,
}: {
  course?: CourseTrack;
  language: LanguageCode;
  markdown: string;
  selectedLessonNumber?: number;
  unit?: CurriculumUnit;
}) {
  const nodes = parseMarkdownDocument(markdown);
  const hasLessons = nodes.some((n) => n.type === "lesson");
  const lessonNodes = nodes.filter((node): node is LessonNode => node.type === "lesson");
  const sectionNodes = nodes.filter((node): node is MarkdownSectionData => node.type === "section");

  if (unit && !course && !hasLessons) {
    return <UnitOverviewMarkdownDocument language={language} nodes={sectionNodes} unit={unit} />;
  }

  if (course && hasLessons && selectedLessonNumber) {
    const selectedLesson = lessonNodes.find((lesson) => getLessonNumber(lesson.title) === selectedLessonNumber);
    return selectedLesson ? (
      <SingleMarkdownLesson course={course} language={language} lesson={selectedLesson} unit={unit} />
    ) : (
      <section className="dashboard-section">
        <h2>{language === "en" ? "Lesson not found" : "未找到课程"}</h2>
      </section>
    );
  }

  if (course && hasLessons) {
    return (
      <>
        {sectionNodes.map((node, idx) => (
          <MarkdownSubCard key={idx} language={language} section={node} unit={unit} />
        ))}
        <section className="dashboard-section">
          <div className="section-title">
            <h2>{language === "en" ? "Lessons" : "课程"}</h2>
            <p>{language === "en" ? "Open each lesson as a separate page." : "每一课已拆分为独立页面。"}</p>
          </div>
          <div className="lesson-route-grid">
            {lessonNodes.map((lesson) => {
              const lessonNumber = getLessonNumber(lesson.title);
              return (
                <Link
                  className="lesson-route-card"
                  key={lesson.title}
                  to={lessonNumber ? `${getUnitPath(unit as CurriculumUnit)}/course-${course.code.toLowerCase()}/lesson-${String(lessonNumber).padStart(2, "0")}` : `${getUnitPath(unit as CurriculumUnit)}/course-${course.code.toLowerCase()}`}
                >
                  <span>{lessonNumber ? `L${lessonNumber}` : "Lesson"}</span>
                  <strong>{localizedDisplay(lesson.title, language)}</strong>
                </Link>
              );
            })}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {nodes.map((node, idx) => {
        if (node.type === "lesson") {
          const lessonNumber = getLessonNumber(node.title);
          return (
            <details
              className="lesson-details"
              data-course-id={course ? `course_${course.code.toLowerCase()}` : undefined}
              data-course-title={course?.title.en}
              data-grade={unit?.level}
              data-lesson-id={lessonNumber ? `lesson_${String(lessonNumber).padStart(2, "0")}` : undefined}
              data-lesson-title={node.title}
              data-mobile-lesson
              data-unit-id={unit?.unitId}
              data-unit-title={unit?.title.en}
              id={lessonNumber ? `lesson-${lessonNumber}` : undefined}
              key={idx}
              open
            >
              <summary>{localizedDisplay(node.title, language)}</summary>
              <div className="lesson-details-content">
              <h2 className="section-heading">{localizedDisplay(node.title, language)}</h2>
              {node.sections.map((section, i) => (
                <MarkdownSubCard key={i} language={language} section={section} />
              ))}
                {unit && course ? <LessonFeedback course={course} language={language} lessonTitle={node.title} unit={unit} /> : null}
              </div>
            </details>
          );
        }
        if (hasLessons) {
          return <MarkdownSubCard key={idx} language={language} section={node} />;
        }
        return <MarkdownSection key={idx} language={language} section={node} unit={unit} />;
      })}
    </>
  );
}

function SingleMarkdownLesson({
  course,
  language,
  lesson,
  unit,
}: {
  course: CourseTrack;
  language: LanguageCode;
  lesson: LessonNode;
  unit?: CurriculumUnit;
}) {
  const lessonNumber = getLessonNumber(lesson.title);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const dailySummaryText = buildNonLanguageDailySummaryText({ course, language, lesson });

  return (
    <article
      className="lesson-details lesson-details-single"
      data-course-id={`course_${course.code.toLowerCase()}`}
      data-course-title={course.title.en}
      data-grade={unit?.level}
      data-lesson-id={lessonNumber ? `lesson_${String(lessonNumber).padStart(2, "0")}` : undefined}
      data-lesson-title={lesson.title}
      data-mobile-lesson
      data-unit-id={unit?.unitId}
      data-unit-title={unit?.title.en}
      id={lessonNumber ? `lesson-${lessonNumber}` : undefined}
    >
      <div className="lesson-details-content">
        <div className="k-language-day-header non-language-lesson-header">
          <div>
            <p className="lesson-page-kicker">{lessonNumber ? (language === "zh" ? `第${lessonNumber}课` : `Lesson ${lessonNumber}`) : language === "zh" ? "课程" : "Lesson"}</p>
            <h2 className="section-heading">{localizedDisplay(lesson.title, language)}</h2>
          </div>
          <div className="k-language-day-header-actions">
            <button className="k-language-summary-button" type="button" onClick={() => setSummaryOpen(true)}>
              Generate Daily Summary
            </button>
          </div>
        </div>
        {lesson.sections.map((section, i) => (
          <MarkdownSubCard key={i} language={language} section={section} />
        ))}
        {unit ? <LessonFeedback course={course} language={language} lessonTitle={lesson.title} unit={unit} /> : null}
        {summaryOpen ? <DailySummaryDialog text={dailySummaryText} onClose={() => setSummaryOpen(false)} /> : null}
      </div>
    </article>
  );
}

function buildNonLanguageDailySummaryText({
  course,
  language,
  lesson,
}: {
  course: CourseTrack;
  language: LanguageCode;
  lesson: LessonNode;
}) {
  const labels =
    language === "zh"
      ? {
          courseName: "课程名字",
          lessonOutcome: "课程目标",
          kdi: "KDI 对齐",
          lightLanguage: "轻量主题语言",
          story: "主题故事情境",
        }
      : {
          courseName: "Course Name",
          lessonOutcome: "Lesson Outcome",
          kdi: "KDI Alignment",
          lightLanguage: "Light Theme Language",
          story: "Theme Story Context",
        };

  const outcome = findLessonSection(lesson, (title) => title.includes("lesson outcome") || title.includes("课程目标"));
  const kdi = findLessonSection(lesson, (title) => title.includes("kdi"));
  const lightLanguage = findLessonSection(lesson, (title) => title.includes("light theme language") || title.includes("轻量主题语言"));
  const story = findLessonSection(lesson, (title) => title.includes("theme story") || title.includes("主题故事情境"));
  const courseName = `${localizedDisplay(course.title[language], language)} — ${localizedDisplay(lesson.title, language)}`;

  const blocks: Array<{ label: string; body: string }> = [
    { label: labels.courseName, body: courseName },
    { label: labels.lessonOutcome, body: sectionToPlainText(outcome, language) },
    { label: labels.kdi, body: kdiToPlainText(kdi, language) },
    { label: labels.lightLanguage, body: languageSectionToSummaryLine(lightLanguage, language) },
    { label: labels.story, body: sectionToPlainText(story, language) },
  ];

  return blocks
    .filter((block) => block.body.trim())
    .map((block) => `${block.label}:\n${block.body.trim()}`)
    .join("\n\n")
    .concat("\n");
}

function findLessonSection(lesson: LessonNode, matcher: (normalizedTitle: string) => boolean) {
  return lesson.sections.find((section) => matcher(stripSectionNumber(section.title).toLowerCase()));
}

function sectionToPlainText(section: MarkdownSectionData | undefined, language: LanguageCode) {
  if (!section) return "";
  const lines: string[] = [];

  for (const block of section.blocks) {
    lines.push(...blockToPlainLines(block, language));
  }

  for (const group of section.groups) {
    const title = localizedDisplay(group.title, language);
    if (title) lines.push(title);
    for (const block of group.blocks) {
      lines.push(...blockToPlainLines(block, language));
    }
  }

  return lines.filter(Boolean).join("\n");
}

function languageSectionToSummaryLine(section: MarkdownSectionData | undefined, language: LanguageCode) {
  if (!section) return "";
  const items: string[] = [];

  for (const block of section.blocks) {
    items.push(...blockToPlainLines(block, language));
  }

  for (const group of section.groups) {
    for (const block of group.blocks) {
      items.push(...blockToPlainLines(block, language));
    }
  }

  return items.map((item) => item.trim()).filter(Boolean).join(" ｜ ");
}

function kdiToPlainText(section: MarkdownSectionData | undefined, language: LanguageCode) {
  if (!section) return "";

  return section.groups
    .map((group) => {
      const parsed = parseKdiGroup(group);
      const labels = getKdiLabels(language, group.title, parsed);
      const domain = localizedDisplay(stripDomainPrefix(group.title), language);
      const items = localizedDisplay(parsed.items, language);
      return [domain ? `${labels.domain}: ${domain}` : "", items ? `${labels.items}: ${items}` : ""]
        .filter(Boolean)
        .join("\n");
    })
    .filter(Boolean)
    .join("\n\n");
}

function blockToPlainLines(block: MarkdownBlock, language: LanguageCode) {
  if (block.type === "rule") return [];
  if (block.type === "list") return block.items.map((item) => `- ${localizedDisplay(item, language)}`);
  if (block.type === "code") return splitLanguageChipItems(block.text).map((item) => localizedDisplay(item, language));
  return [localizedDisplay(block.text, language)];
}

async function copySummaryText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy path
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function DailySummaryDialog({ text, onClose }: { text: string; onClose: () => void }) {
  const [value, setValue] = useState(text);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copySummaryText(value);
    setCopied(ok);
    if (ok) window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="k-language-summary-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Daily Summary"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="k-language-summary-modal">
        <div className="k-language-summary-head">
          <h3>Daily Summary</h3>
          <button className="k-language-summary-close" type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <textarea
          className="k-language-summary-text"
          value={value}
          spellCheck={false}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className="k-language-summary-actions">
          <button className="k-language-summary-copy" type="button" onClick={handleCopy}>
            {copied ? "Copied" : "Copy"}
          </button>
          <button className="k-language-summary-close-btn" type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function UnitOverviewMarkdownDocument({
  language,
  nodes,
  unit,
}: {
  language: LanguageCode;
  nodes: MarkdownSectionData[];
  unit: CurriculumUnit;
}) {
  const findSection = (matcher: (title: string) => boolean) =>
    nodes.find((section) => matcher(stripSectionNumber(section.title).toLowerCase()));
  const theme = findSection((title) => title.includes("theme overview") || title.includes("主题概览"));
  const languageSection = findSection((title) => title === "unit language" || title.includes("单元语言"));
  const response = findSection((title) => title.includes("response modes") || title.includes("预期回应") || title.includes("小小班"));
  const courses = findSection(
    (title) =>
      title.includes("course track") ||
      title.includes("course type") ||
      title.includes("non-language course") ||
      title.includes("课程轨道") ||
      title.includes("非语言课程"),
  );
  const weekly = findSection((title) => title.includes("weekly") || title.includes("每周") || title.includes("子主题"));
  const teacher = findSection((title) => title.includes("teacher input") || title.includes("教师输入"));
  const songs = findSection((title) => title.includes("song") || title.includes("chant") || title.includes("歌曲") || title.includes("韵律"));
  const resources = findSection((title) => title.includes("resource") || title.includes("spaces") || title.includes("materials") || title.includes("资源") || title.includes("空间") || title.includes("材料"));
  const boundary = findSection((title) => title.includes("boundary") || title.includes("边界"));
  const observation = findSection((title) => title.includes("observation") || title.includes("观察"));

  return (
    <>
      {theme ? <OverviewCard language={language} section={theme} /> : null}
      {languageSection ? (
        <>
          <h2 className="section-heading" id="language">
            {getOverviewHeading("unit-language", language)}
          </h2>
          <OverviewCard language={language} responseSection={response} section={languageSection} />
        </>
      ) : null}
      {courses ? <CourseTracksOverview language={language} section={courses} unit={unit} /> : null}
      {weekly ? <WeeklyOverview section={weekly} title={getOverviewHeading("weekly", language)} /> : null}
      {teacher ? (
        <>
          <h2 className="section-heading" id="teacher-input">
            {getOverviewHeading("teacher", language)}
          </h2>
          <OverviewCard language={language} section={teacher} />
        </>
      ) : null}
      {songs ? (
        <>
          <h2 className="section-heading" id="songs">
            {getOverviewHeading("songs", language)}
          </h2>
          <OverviewCard forceListStyle="song" language={language} section={songs} />
        </>
      ) : null}
      {resources ? (
        <>
          <h2 className="section-heading" id="resources">
            {getOverviewHeading("resources", language)}
          </h2>
          <OverviewCard forceListStyle="dot" language={language} section={resources} />
        </>
      ) : null}
      {boundary || observation ? (
        <>
          <h2 className="section-heading" id="boundaries">
            {getOverviewHeading("boundaries", language)}
          </h2>
          {boundary ? <OverviewCard language={language} section={boundary} title={getOverviewHeading("boundary-notes", language)} /> : null}
          {observation ? <OverviewCard language={language} section={observation} title={getOverviewHeading("observation", language)} /> : null}
        </>
      ) : null}
    </>
  );
}

function OverviewCard({
  forceListStyle,
  language = "en",
  responseSection,
  section,
  title,
}: {
  forceListStyle?: "dot" | "song";
  language?: LanguageCode;
  responseSection?: MarkdownSectionData;
  section: MarkdownSectionData;
  title?: string;
}) {
  const cleanTitle = localizedDisplay(title ?? stripSectionNumber(section.title), language);
  const kind = getSectionKind(cleanTitle);
  const isTeacherSection = kind === "teacher";
  const listStyle = forceListStyle ?? (kind === "resources" ? "dot" : kind === "songs" ? "song" : undefined);
  const showTitle = kind === "overview" || kind === "boundary" || kind === "observation";

  return (
    <section className={`unit8-card card-kind-${kind}`}>
      <div className={`field-orb ${getOrbClass(kind)}`} aria-hidden="true">
        <span>{getOrbLabel(kind)}</span>
      </div>
      <div className="unit8-card-body">
        {showTitle ? <h3>{cleanTitle}</h3> : null}
        {kind === "boundary" || kind === "observation" ? (
          <MergedParagraphs blocks={section.blocks} language={language} />
        ) : listStyle === "song" ? (
          <SongList language={language} section={section} />
        ) : section.blocks.length ? (
          <MarkdownBlocks blocks={section.blocks} chipMode={kind === "language"} language={language} />
        ) : null}
        {listStyle === "song" ? null : section.groups.length ? (
          <div className={kind === "language" || kind === "teacher" || kind === "resources" ? "language-stack" : "language-grid"}>
            {section.groups.map((group) => (
              <article className={`language-panel ${kind === "language" ? "language-panel-full" : "resource-row"}`} key={group.title}>
                <h4>{localizedGroupTitle(group.title, language, kind)}</h4>
                {listStyle === "dot" ? <DotList blocks={group.blocks} language={language} /> : isTeacherSection ? <PhraseList blocks={group.blocks} language={language} /> : (
                  <MarkdownBlocks
                    blocks={group.blocks}
                    chipMode={kind === "language"}
                    language={language}
                    optionalChip={group.title.toLowerCase().includes("optional")}
                    compactList={kind === "teacher"}
                    listStyle={listStyle}
                  />
                )}
              </article>
            ))}
          </div>
        ) : null}
        {responseSection ? (
          <div className="response-note">
            <MergedParagraphs blocks={responseSection.blocks} language={language} />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function DotList({ blocks, language = "en" }: { blocks: MarkdownBlock[]; language?: LanguageCode }) {
  return (
    <div className="dot-list">
      {blocks.flatMap(blockToItems).map((item) => (
        <span key={item}>{localizedDisplay(item, language)}</span>
      ))}
    </div>
  );
}

function PhraseList({ blocks, language = "en" }: { blocks: MarkdownBlock[]; language?: LanguageCode }) {
  return (
    <div className="phrase-list">
      {blocks.flatMap(blockToItems).map((item) => (
        <span key={item}>{localizedDisplay(item, language)}</span>
      ))}
    </div>
  );
}

function SongList({ language = "en", section }: { language?: LanguageCode; section: MarkdownSectionData }) {
  const items = section.groups.flatMap((group) => group.blocks.flatMap(blockToSongItems));

  return (
    <>
      <MarkdownBlocks blocks={section.blocks} language={language} />
      <div className="song-list">
        {items.map((item) => (
          <span key={item}>
            <b aria-hidden="true">♪</b>
            {localizedDisplay(item, language)}
          </span>
        ))}
      </div>
    </>
  );
}

function MergedParagraphs({ blocks, language = "en" }: { blocks: MarkdownBlock[]; language?: LanguageCode }) {
  const paragraphs = blocks.filter((block) => block.type === "paragraph").map((block) => block.text);
  if (paragraphs.length <= 2) return <MarkdownBlocks blocks={blocks} language={language} />;

  const [first, ...rest] = paragraphs;
  const final = rest.at(-1);
  const middle = rest.slice(0, -1);

  return (
    <>
      <p>
        <strong>{localizedDisplay(first, language)}</strong>
      </p>
      {middle.length ? <p>{localizedDisplay(middle.join(" "), language)}</p> : null}
      {final ? <p>{localizedDisplay(final, language)}</p> : null}
    </>
  );
}

function blockToItems(block: MarkdownBlock) {
  if (block.type === "paragraph" || block.type === "code") {
    return block.text.includes("｜") ? splitDelimitedItems(block.text) : splitCompactItems(block.text);
  }
  if (block.type === "list") return block.items;
  return [];
}

function blockToSongItems(block: MarkdownBlock) {
  if (block.type === "paragraph" || block.type === "code") return splitLineItems(block.text);
  if (block.type === "list") return block.items.map(cleanDisplayItem).filter(Boolean);
  return [];
}

function CourseTracksOverview({ language, section, unit }: { language: LanguageCode; section: MarkdownSectionData; unit: CurriculumUnit }) {
  return (
    <>
      <h2 className="section-heading" id="course-types">
        {getOverviewHeading("course-tracks", language)}
      </h2>
      <div className="course-grid">
        {section.groups.map((group, index) => {
          const courseCode = group.title.match(/(?:Lesson|Course)\s+([A-Z0-9]+)/)?.[1];
          const course = courseCode ? unit.courses.find((item) => item.code === courseCode) : unit.courses[index];
          return (
            <Link
              className="course-type-card course-track-card"
              key={group.title}
              to={course ? `${getUnitPath(unit)}/course-${course.code.toLowerCase()}` : getUnitPath(unit)}
            >
              <strong>{course ? `Course ${course.code}` : "Course"}</strong>
              <h3>{localizedDisplay(stripCoursePrefix(group.title), language)}</h3>
              <MarkdownBlocks blocks={group.blocks} language={language} />
              <span className="track-link-label">{language === "en" ? "Open course track" : "打开课程轨道"}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function WeeklyOverview({ section, title }: { section: MarkdownSectionData; title: string }) {
  return (
    <>
      <h2 className="section-heading" id="weeks">
        {title}
      </h2>
      <div className="week-grid">
        {section.groups.map((group) => (
          <WeekCard group={group} key={group.title} />
        ))}
      </div>
    </>
  );
}

function MarkdownSection({ language = "en", section, unit }: { language?: LanguageCode; section: MarkdownSectionData; unit?: CurriculumUnit }) {
  const title = localizedDisplay(stripSectionNumber(section.title), language);
  const kind = getSectionKind(title);

  if (kind === "course-types" && unit) {
    return (
      <>
        <h2 className="section-heading" id="course-types">
          8 Course Track Files
        </h2>
        <div className="course-entry-grid">
          {section.groups.map((group) => {
            const courseCode = group.title.match(/(?:Lesson|Course)\s+([A-Z0-9]+)/)?.[1];
            const course = courseCode ? unit.courses.find((item) => item.code === courseCode) : undefined;
            return (
              <Link
                className="course-entry-card course-type-card course-track-card"
                key={group.title}
                to={course ? `${getUnitPath(unit)}/course-${course.code.toLowerCase()}` : getUnitPath(unit)}
              >
                <span className="course-code">{course ? `Course ${course.code}` : "Course"}</span>
              <h3>{localizedDisplay(stripCoursePrefix(group.title), language)}</h3>
              <MarkdownBlocks blocks={group.blocks} language={language} />
                <span className="open-course-link">Open course track</span>
              </Link>
            );
          })}
        </div>
      </>
    );
  }

  if (kind === "weekly") {
    return (
      <>
        <h2 className="section-heading">{title}</h2>
        <div className="week-grid">
          {section.groups.map((group) => (
          <WeekCard group={group} key={group.title} language={language} />
          ))}
        </div>
      </>
    );
  }

  if (kind === "kdi") {
    return <KdiSection language={language} section={section} title={title} />;
  }

  return (
    <>
      <h2 className="section-heading">{title}</h2>
      <section className={`unit8-card card-kind-${kind}`}>
        <div className={`field-orb ${getOrbClass(kind)}`} aria-hidden="true">
          <span>{getOrbLabel(kind)}</span>
        </div>
        <div className="unit8-card-body">
          {section.blocks.length ? (
            <MarkdownBlocks blocks={section.blocks} chipMode={kind === "language"} language={language} listStyle={kind === "songs" ? "song" : undefined} />
          ) : null}
          {section.groups.length ? (
            <div className={kind === "language" || kind === "teacher" || kind === "resources" ? "language-grid" : "language-stack"}>
              {section.groups.map((group) => (
                <article className="language-panel" key={group.title}>
                  <h4>{localizedGroupTitle(group.title, language, kind)}</h4>
                  <MarkdownBlocks
                    blocks={group.blocks}
                    chipMode={kind === "language"}
                    compactList={kind === "teacher" || kind === "resources"}
                    language={language}
                    listStyle={kind === "songs" ? "song" : undefined}
                  />
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function MarkdownSubCard({ language = "en", section, unit }: { language?: LanguageCode; section: MarkdownSectionData; unit?: CurriculumUnit }) {
  const title = localizedDisplay(stripSectionNumber(section.title), language);
  const kind = getSectionKind(title);

  if (kind === "course-types" && unit) {
    return (
      <section className={`unit8-card card-kind-${kind}`}>
        <div className="field-orb field-step" aria-hidden="true">
          <span>↗</span>
        </div>
        <div className="unit8-card-body">
          <h3>{title}</h3>
          <div className="course-entry-grid">
            {section.groups.map((group) => {
              const courseCode = group.title.match(/(?:Lesson|Course)\s+([A-Z0-9]+)/)?.[1];
              const course = courseCode ? unit.courses.find((item) => item.code === courseCode) : undefined;
              return (
                <Link
                  className="course-entry-card course-type-card course-track-card"
                  key={group.title}
                  to={course ? `${getUnitPath(unit)}/course-${course.code.toLowerCase()}` : getUnitPath(unit)}
                >
                  <span className="course-code">{course ? `Course ${course.code}` : "Course"}</span>
                  <h3>{localizedDisplay(stripCoursePrefix(group.title), language)}</h3>
                  <MarkdownBlocks blocks={group.blocks} language={language} />
                  <span className="open-course-link">Open course track</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (kind === "weekly") {
    return (
      <section className={`unit8-card card-kind-${kind}`}>
        <div className="field-orb field-step" aria-hidden="true">
          <span>↗</span>
        </div>
        <div className="unit8-card-body">
          <h3>{title}</h3>
          <div className="week-grid">
            {section.groups.map((group) => (
              <WeekCard group={group} key={group.title} language={language} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (kind === "kdi") {
    return <KdiSection language={language} section={section} title={title} />;
  }

  const sectionBody = renderCompactSectionBody(section, kind, language);

  return (
    <section className={`unit8-card card-kind-${kind}`}>
      <div className={`field-orb ${getOrbClass(kind)}`} aria-hidden="true">
        <span>{getOrbLabel(kind)}</span>
      </div>
      <div className="unit8-card-body">
        <h3>{title}</h3>
        {sectionBody}
      </div>
    </section>
  );
}

function WeekCard({ group, language = "en" }: { group: MarkdownSectionData["groups"][number]; language?: LanguageCode }) {
  const { label, title } = splitWeekHeading(localizedDisplay(group.title, language));

  return (
    <article className="week-card">
      <p className="week-label">{label}</p>
      <h3>{title}</h3>
      <MarkdownBlocks blocks={group.blocks} language={language} />
    </article>
  );
}

function KdiSection({ language = "en", section, title }: { language?: LanguageCode; section: MarkdownSectionData; title: string }) {
  return (
    <section className="unit8-card kdi-card">
      <div className="field-orb field-kdi" aria-hidden="true">
        <span>KDI</span>
      </div>
      <div className="unit8-card-body">
        <h3>{title}</h3>
        {section.blocks.length ? <MarkdownBlocks blocks={section.blocks} /> : null}
        <div className="kdi-grid">
          {section.groups.map((group) => {
            const kdi = parseKdiGroup(group);
            const labels = getKdiLabels(language, group.title, kdi);
            return (
              <article className="kdi-domain-card" key={group.title}>
                <div className="kdi-domain-heading">
                  <span className="kdi-domain-label">{labels.domain}</span>
                  <h4>{localizedDisplay(stripDomainPrefix(group.title), language)}</h4>
                </div>
                {kdi.items ? (
                  <div className="kdi-field">
                    <span className="kdi-field-label">{labels.items}</span>
                    <p>{localizedDisplay(kdi.items, language)}</p>
                  </div>
                ) : null}
                {kdi.support ? (
                  <div className="kdi-field kdi-support">
                    <span className="kdi-field-label">{labels.support}</span>
                    <p>{localizedDisplay(kdi.support, language)}</p>
                  </div>
                ) : null}
                {kdi.remainingBlocks.length ? <MarkdownBlocks blocks={kdi.remainingBlocks} language={language} /> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function parseKdiGroup(group: { title: string; blocks: MarkdownBlock[] }) {
  let items = "";
  let support = "";
  let itemLabel = "";
  let supportLabel = "";
  const remainingBlocks: MarkdownBlock[] = [];

  for (const block of group.blocks) {
    if (block.type !== "paragraph") {
      remainingBlocks.push(block);
      continue;
    }

    const text = stripInlineMarkdown(block.text).trim();
    const itemsMatch = text.match(/^(Items?|项目)[:：]\s*(.+)$/i);
    const supportMatch = text.match(/^(How We Support|支持方式)[:：]\s*(.+)$/i);

    if (itemsMatch) {
      itemLabel = itemsMatch[1];
      items = itemsMatch[2];
    } else if (supportMatch) {
      supportLabel = supportMatch[1];
      support = supportMatch[2];
    } else {
      remainingBlocks.push({ ...block, text });
    }
  }

  return { itemLabel, items, remainingBlocks, support, supportLabel };
}

function getKdiLabels(language: LanguageCode, groupTitle: string, kdi: ReturnType<typeof parseKdiGroup>) {
  const hasChinese = /[\u4e00-\u9fff]/.test(groupTitle) || /[\u4e00-\u9fff]/.test(kdi.itemLabel) || /[\u4e00-\u9fff]/.test(kdi.supportLabel);
  return {
    domain: hasChinese || language === "zh" ? "领域" : "Domain",
    items: kdi.itemLabel || (hasChinese || language === "zh" ? "项目" : "Items"),
    support: kdi.supportLabel || (hasChinese || language === "zh" ? "支持方式" : "How We Support"),
  };
}

function stripDomainPrefix(title: string) {
  return title.replace(/^(Domain|领域)[:：]\s*/i, "");
}

function renderCompactSectionBody(section: MarkdownSectionData, kind: string, language: LanguageCode) {
  if (kind === "teacher" && section.blocks.every((b) => b.type === "paragraph") && section.groups.length === 0) {
    const items = section.blocks
      .filter((b) => b.type === "paragraph")
      .flatMap((b) => b.text.split("｜").map((s) => s.trim()))
      .filter(Boolean);
    return (
      <div className="phrase-list">
        {items.map((item, i) => (
          <span key={i}>{localizedDisplay(item, language)}</span>
        ))}
      </div>
    );
  }

  return (
    <>
      {section.blocks.length ? (
        <MarkdownBlocks
          blocks={section.blocks}
          chipMode={kind === "language"}
          compactList={kind === "teacher" || kind === "resources"}
          language={language}
          listStyle={kind === "songs" ? "song" : undefined}
        />
      ) : null}
      {section.groups.length ? (
        <div className={kind === "language" || kind === "teacher" || kind === "resources" ? "language-grid" : "language-stack"}>
          {section.groups.map((group) => (
            <article className="language-panel resource-row" key={group.title}>
              <h4>{localizedGroupTitle(group.title, language, kind)}</h4>
              <MarkdownBlocks
                blocks={group.blocks}
                chipMode={kind === "language"}
                compactList={kind === "teacher" || kind === "resources"}
                language={language}
                listStyle={kind === "songs" ? "song" : undefined}
              />
            </article>
          ))}
        </div>
      ) : null}
    </>
  );
}

function MarkdownBlocks({
  blocks,
  chipMode = false,
  compactList = false,
  language = "en",
  listStyle,
  optionalChip = false,
}: {
  blocks: MarkdownBlock[];
  chipMode?: boolean;
  compactList?: boolean;
  language?: LanguageCode;
  listStyle?: "dot" | "song";
  optionalChip?: boolean;
}) {
  return (
    <>
      {blocks.map((block, index) => {
        if ((block.type === "paragraph" || block.type === "code") && listStyle === "song") {
          return (
            <div className="song-list" key={index}>
              {splitLineItems(block.text).map((item) => (
                <span key={item}>
                  <b aria-hidden="true">♪</b>
                  {item}
                </span>
              ))}
            </div>
          );
        }

        if (block.type === "paragraph" && listStyle === "dot") {
          return (
            <div className="dot-list" key={index}>
              {splitCompactItems(block.text).map((item) => (
                <span key={item}>{localizedDisplay(item, language)}</span>
              ))}
            </div>
          );
        }

        if (block.type === "code") {
          if (chipMode) {
            const items = splitLanguageChipItems(block.text);
            return (
              <div className="chip-row" key={index}>
                {items.map((item) => (
                  <span className={optionalChip ? "chip optional" : "chip"} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            );
          }

          if (compactList) {
            const items = block.text.split(/\r?\n/).map(cleanDisplayItem).filter(Boolean);
            return (
              <div className="phrase-list" key={index}>
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            );
          }

          return <p key={index}>{localizedDisplay(block.text.split(/\r?\n/).join(" "), language)}</p>;
        }

        if (block.type === "paragraph" && chipMode && (block.text.includes("｜") || block.text.includes("\n"))) {
          const items = splitLanguageChipItems(block.text);
          return (
            <div className="chip-row" key={index}>
              {items.map((item) => (
                <span className={optionalChip ? "chip optional" : "chip"} key={item}>
                  {item}
                </span>
              ))}
            </div>
          );
        }

        if (block.type === "paragraph" && compactList) {
          if (block.text.includes("｜")) {
            const items = splitDelimitedItems(block.text);
            return (
              <div className="phrase-list" key={index}>
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            );
          }
          const items = splitCompactItems(block.text);
          if (items.length > 1) {
            return (
              <div className="phrase-list" key={index}>
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            );
          }
        }

        if (block.type === "heading") {
          return <h4 key={index}>{localizedDisplay(block.text, language)}</h4>;
        }

        if (block.type === "list") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{localizedDisplay(item, language)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "rule") {
          return null;
        }

        return <p key={index}>{localizedDisplay(block.text, language)}</p>;
      })}
    </>
  );
}

function splitCompactItems(text: string) {
  return text.split(/\s{2,}|(?<=\.)\s+(?=[A-Z])/).map(cleanDisplayItem).filter(Boolean);
}

function splitLineItems(text: string) {
  return text.split(/\r?\n/).map(cleanDisplayItem).filter(Boolean);
}

function splitDelimitedItems(text: string) {
  return text.split("｜").map(cleanDisplayItem).filter(Boolean);
}

function splitLanguageChipItems(text: string) {
  return text.split(/｜|\r?\n|[,，;；、]/).map(cleanDisplayItem).filter(Boolean);
}

function cleanDisplayItem(item: string) {
  const cleaned = item.trim();
  if (!cleaned || /^[.,，。'’"“”`\\-]+$/.test(cleaned)) return "";
  return cleaned;
}

function localizedDisplay(text: string, language: LanguageCode) {
  const cleaned = text.trim();
  if (language !== "zh" || !cleaned) return cleaned;

  const parts = cleaned
    .split(/\s*[|｜]\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length < 2) return cleaned;

  const chinesePart = [...parts].reverse().find((part) => /[\u4e00-\u9fff]/.test(part));
  return chinesePart ?? cleaned;
}

function localizedGroupTitle(text: string, language: LanguageCode, sectionKind: string) {
  const cleaned = localizedDisplay(text, language);
  if (language !== "zh" || sectionKind !== "activity" || /[\u4e00-\u9fff]/.test(cleaned)) return cleaned;

  const numberedActivity = cleaned.match(/^(\d+)\.\s+\S+/);
  if (!numberedActivity) return cleaned;

  return `活动 ${numberedActivity[1]}`;
}

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; text: string }
  | { type: "rule" };

interface MarkdownSectionData {
  type: "section";
  title: string;
  blocks: MarkdownBlock[];
  groups: Array<{ title: string; blocks: MarkdownBlock[] }>;
}

interface LessonNode {
  type: "lesson";
  title: string;
  sections: MarkdownSectionData[];
}

function parseMarkdownDocument(markdown: string): (MarkdownSectionData | LessonNode)[] {
  const lines = markdown.split(/\r?\n/);
  const nodes: (MarkdownSectionData | LessonNode)[] = [];
  let currentLesson: LessonNode | null = null;
  let currentSection: MarkdownSectionData | null = null;
  let currentGroup: { title: string; blocks: MarkdownBlock[] } | null = null;
  let buffer: string[] = [];

  const flushBufferTo = (target: MarkdownBlock[]) => {
    if (buffer.length) {
      target.push(...parseMarkdown(buffer.join("\n")));
      buffer = [];
    }
  };

  const pushCurrentSection = () => {
    if (!currentSection) return;
    if (currentGroup) {
      flushBufferTo(currentGroup.blocks);
      currentGroup = null;
    } else {
      flushBufferTo(currentSection.blocks);
    }
    if (currentLesson) {
      currentLesson.sections.push(currentSection);
    } else {
      nodes.push(currentSection);
    }
    currentSection = null;
  };

  const pushCurrentLesson = () => {
    if (currentLesson) {
      nodes.push(currentLesson);
      currentLesson = null;
    }
  };

  for (const line of lines) {
    const h1 = line.match(/^# (.+)$/);
    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);

    if (h1) {
      const title = stripInlineMarkdown(h1[1]);
      if (!/^Lesson\s+\d+/i.test(title) && !/^第.+课/.test(title)) {
        continue;
      }
      pushCurrentSection();
      pushCurrentLesson();
      currentLesson = {
        type: "lesson",
        title,
        sections: [],
      };
      continue;
    }

    if (h2) {
      if (currentGroup) {
        flushBufferTo(currentGroup.blocks);
        currentGroup = null;
      } else if (currentSection) {
        flushBufferTo(currentSection.blocks);
      }
      pushCurrentSection();
      currentSection = { type: "section", title: stripInlineMarkdown(h2[1]), blocks: [], groups: [] };
      continue;
    }

    if (h3) {
      if (!currentSection) {
        currentSection = { type: "section", title: "Overview", blocks: [], groups: [] };
        if (currentLesson) {
          currentLesson.sections.push(currentSection);
        } else {
          nodes.push(currentSection);
        }
      }
      if (currentGroup) {
        flushBufferTo(currentGroup.blocks);
      } else {
        flushBufferTo(currentSection.blocks);
      }
      currentGroup = { title: stripInlineMarkdown(h3[1]), blocks: [] };
      currentSection.groups.push(currentGroup);
      continue;
    }

    buffer.push(line);
  }

  if (currentGroup) {
    flushBufferTo(currentGroup.blocks);
  } else if (currentSection) {
    flushBufferTo(currentSection.blocks);
  }
  pushCurrentSection();
  pushCurrentLesson();

  return nodes
    .filter((node) => {
      if (node.type === "lesson") return node.sections.length > 0;
      return node.title !== "Overview" || node.blocks.length || node.groups.length;
    })
    .map((node) => {
      if (node.type === "lesson") {
        node.sections = node.sections.filter(
          (s) => s.title !== "Overview" || s.blocks.length || s.groups.length,
        );
      }
      return node;
    });
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = markdown.split(/\r?\n/);
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let codeLines: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: stripInlineMarkdown(paragraph.join(" ").replace(/\s{2,}/g, " ").trim()) });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      if (codeLines) {
        blocks.push({ type: "code", text: codeLines.join("\n") });
        codeLines = null;
      } else {
        flushParagraph();
        flushList();
        codeLines = [];
      }
      continue;
    }

    if (codeLines) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (/^-{3,}$/.test(trimmed)) {
      flushParagraph();
      flushList();
      blocks.push({ type: "rule" });
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: heading[1].length, text: stripInlineMarkdown(heading[2]) });
      continue;
    }

    const list = trimmed.match(/^[-*]\s+(.+)$/);
    if (list) {
      flushParagraph();
      listItems.push(stripInlineMarkdown(list[1]));
      continue;
    }

    if (line.endsWith("  ")) {
      flushList();
      blocks.push({ type: "paragraph", text: stripInlineMarkdown(trimmed) });
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function stripInlineMarkdown(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1");
}

function renderInlineMarkdown(text: string) {
  return stripInlineMarkdown(text);
}

function stripSectionNumber(title: string) {
  return title.replace(/^\d+\.\s*/, "");
}

function stripCoursePrefix(title: string) {
  return title.replace(/^(Lesson|Course)\s+[A-Z0-9]+:\s*/, "");
}

function splitWeekHeading(heading: string) {
  const match = heading.match(/^(.+?)\s*[:：]\s*(.+)$/);
  if (!match) {
    return { label: heading, title: heading };
  }

  return {
    label: match[1].trim(),
    title: match[2].trim(),
  };
}

function getLessonNumber(title: string) {
  const digitMatch = title.match(/Lesson\s+(\d+)/i) ?? title.match(/第\s*(\d+)\s*[课課]/);
  if (digitMatch) return Number(digitMatch[1]);

  const zhMatch = title.match(/第\s*([一二三四五六七八九十]+)\s*[课課]/);
  if (!zhMatch) return undefined;

  const map: Record<string, number> = {
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
    十: 10,
  };
  const value = zhMatch[1];
  if (value === "十") return 10;
  if (value.startsWith("十")) return 10 + (map[value.slice(1)] ?? 0);
  if (value.endsWith("十")) return (map[value[0]] ?? 1) * 10;
  if (value.includes("十")) {
    const [tens, ones] = value.split("十");
    return (map[tens] ?? 1) * 10 + (map[ones] ?? 0);
  }
  return map[value];
}

function getSectionKind(title: string): string {
  const normalized = title.toLowerCase();
  if (normalized.includes("kdi")) return "kdi";
  if (normalized.includes("course type") || normalized.includes("non-language course") || normalized.includes("非语言课程")) return "course-types";
  if (normalized.includes("teacher routine") || normalized.includes("teacher input") || normalized.includes("教师常规") || normalized.includes("教师输入")) return "teacher";
  if (normalized.includes("lesson outcome") || normalized === "outcome" || normalized.includes("课程目标")) return "outcome";
  if (normalized.includes("suggested activit") || normalized.includes("suggested game") || normalized.includes("建议活动")) return "activity";
  if (normalized.includes("language") || normalized.includes("语言")) return "language";
  if (normalized.includes("weekly") || normalized.includes("每周") || normalized.includes("子主题")) return "weekly";
  if (normalized.includes("song") || normalized.includes("chant") || normalized.includes("歌曲") || normalized.includes("韵律")) return "songs";
  if (normalized.includes("resource") || normalized.includes("spaces") || normalized.includes("materials") || normalized.includes("资源") || normalized.includes("空间") || normalized.includes("材料")) return "resources";
  if (normalized.includes("observation") || normalized.includes("观察")) return "observation";
  if (normalized.includes("boundary") || normalized.includes("边界")) return "boundary";
  return "overview";
}

function getOrbClass(kind: string) {
  if (kind === "kdi") return "field-kdi";
  if (kind === "language" || kind === "teacher") return "field-language";
  if (kind === "songs" || kind === "boundary" || kind === "outcome") return "field-outcome";
  if (kind === "observation") return "field-response";
  if (kind === "resources" || kind === "activity") return "field-activity";
  return "field-step";
}

function getOrbLabel(kind: string) {
  if (kind === "kdi") return "KDI";
  if (kind === "language") return "Aa";
  if (kind === "teacher") return "◌";
  if (kind === "songs") return "♪";
  if (kind === "resources") return "✦";
  if (kind === "boundary") return "!";
  if (kind === "observation") return "◎";
  if (kind === "outcome") return "◎";
  if (kind === "activity") return "✦";
  return "↗";
}
