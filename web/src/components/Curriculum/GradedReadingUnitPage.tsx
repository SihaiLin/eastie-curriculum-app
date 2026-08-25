import { Link, useLocation, useParams } from "react-router-dom";
import { type ReactNode } from "react";
import { useAppLanguage } from "../../app/LanguageContext";
import {
  getKGradedReadingUnit,
  type KGradedReadingBook,
  type KGradedReadingLesson,
  type KGradedReadingUnit,
} from "../../curriculum/generated/kGradedReadingUnits";
import {
  getKMathUnit,
  type KMathLesson,
  type KMathUnit,
} from "../../curriculum/generated/kMathUnits";
import {
  getKArtUnit,
  type ArtContentBlock,
  type ArtContentSection,
  type KArtLesson,
  type KArtUnit,
} from "../../curriculum/generated/kArtUnits";
import type { FeedbackContext } from "../../feedback/feedbackTypes";
import type { LanguageCode } from "../../curriculum/types";
import { FeedbackButton } from "../Feedback/FeedbackButton";

export function GradedReadingUnitPage() {
  const language = useAppLanguage();
  const location = useLocation();
  const { lessonSlug } = useParams();
  const mathUnit = getMathUnitForPath(location.pathname);
  const readingUnit = getGradedReadingUnitForPath(location.pathname);
  const artUnit = localizeArtUnit(getArtUnitForPath(location.pathname), language);
  const selectedReadingLesson = lessonSlug
    ? readingUnit?.lessons.find((lesson) => lesson.id === lessonSlug)
    : undefined;
  const selectedMathLesson = lessonSlug
    ? mathUnit.lessons.find((lesson) => lesson.id === lessonSlug)
    : undefined;
  const selectedArtLesson = lessonSlug
    ? artUnit?.lessons.find((lesson) => lesson.id === lessonSlug)
    : undefined;
  const isCourseAActive = location.pathname.includes("/course-a");
  const isCourseBActive = location.pathname.includes("/course-b") || location.pathname.includes("/graded-reading/");
  const isCourseCActive = location.pathname.includes("/course-c");
  const isCourseRoute = isCourseAActive || isCourseBActive || isCourseCActive;

  return (
    <main className="unit-page unit8-shell">
      {isCourseRoute ? (
        <KCourseLessonSidebar
          artUnit={artUnit}
          isCourseAActive={isCourseAActive}
          isCourseBActive={isCourseBActive}
          isCourseCActive={isCourseCActive}
          language={language}
          mathUnit={mathUnit}
          readingUnit={readingUnit}
          selectedArtLesson={selectedArtLesson}
          selectedMathLesson={selectedMathLesson}
          selectedReadingLesson={selectedReadingLesson}
        />
      ) : (
        <KCourseDirectory artUnit={artUnit} language={language} mathUnit={mathUnit} readingUnit={readingUnit} />
      )}

      <section className="content unit8-main">
        {isCourseAActive ? (
          selectedMathLesson ? <MathLessonView lesson={selectedMathLesson} unit={mathUnit} /> : <MathCourseView unit={mathUnit} />
        ) : readingUnit && isCourseBActive ? (
          selectedReadingLesson ? (
            <GradedReadingLessonView lesson={selectedReadingLesson} unit={readingUnit} />
          ) : (
            <GradedReadingCourseView unit={readingUnit} />
          )
        ) : artUnit && isCourseCActive ? (
          selectedArtLesson ? <ArtLessonView language={language} lesson={selectedArtLesson} unit={artUnit} /> : <ArtCourseView language={language} unit={artUnit} />
        ) : (
        <KNonLanguageOverview artUnit={artUnit} language={language} mathUnit={mathUnit} />
        )}
      </section>
    </main>
  );
}

function KCourseDirectory({
  artUnit,
  language,
  mathUnit,
  readingUnit,
}: {
  artUnit?: KArtUnit;
  language: LanguageCode;
  mathUnit: KMathUnit;
  readingUnit?: KGradedReadingUnit;
}) {
  return (
    <aside className="sidebar unit8-sidebar graded-course-sidebar" aria-label="Course navigation">
      <h2>Course Directory</h2>
      <Link className="sidebar-link" to={mathPath(mathUnit)}>
        <span>Maths</span>
        <strong>Math Growing Ladder</strong>
        <small>Legacy Course A</small>
      </Link>
      {readingUnit ? (
        <Link className="sidebar-link" to={gradedReadingPath(readingUnit)}>
          <span>Reading</span>
          <strong>Graded Reading</strong>
          <small>Legacy Course B</small>
        </Link>
      ) : (
        <div className="sidebar-link disabled" aria-disabled="true">
          <span>Reading</span>
          <strong>Graded Reading</strong>
          <small>Coming soon</small>
        </div>
      )}
      {artUnit ? (
        <Link className="sidebar-link" to={artPath(artUnit)}>
          <span>{language === "zh" ? "美术" : "Art"}</span>
          <strong>{language === "zh" ? "美术工作室" : "Art Studio"}</strong>
          <small>Legacy Course C</small>
        </Link>
      ) : (
        <div className="sidebar-link disabled" aria-disabled="true">
          <span>{language === "zh" ? "美术" : "Art"}</span>
          <strong>{language === "zh" ? "美术工作室" : "Art Studio"}</strong>
          <small>Coming soon</small>
        </div>
      )}
    </aside>
  );
}

function KCourseLessonSidebar({
  artUnit,
  isCourseAActive,
  isCourseBActive,
  isCourseCActive,
  language,
  mathUnit,
  readingUnit,
  selectedArtLesson,
  selectedMathLesson,
  selectedReadingLesson,
}: {
  artUnit?: KArtUnit;
  isCourseAActive: boolean;
  isCourseBActive: boolean;
  isCourseCActive: boolean;
  language: LanguageCode;
  mathUnit: KMathUnit;
  readingUnit?: KGradedReadingUnit;
  selectedArtLesson?: KArtLesson;
  selectedMathLesson?: KMathLesson;
  selectedReadingLesson?: KGradedReadingLesson;
}) {
  if (isCourseAActive) {
    return (
      <aside className="sidebar unit8-sidebar graded-course-sidebar course-lesson-sidebar" aria-label="Lesson navigation">
        <h2>Lesson Directory</h2>
        <Link className={`sidebar-link week-overview-link ${!selectedMathLesson ? "active" : ""}`} to={mathPath(mathUnit)}>
          <span>Overview</span>
          <strong>Math Growing Ladder</strong>
        </Link>
        {mathUnit.lessons.map((lesson) => (
          <Link className={`lesson-nav-link ${selectedMathLesson?.id === lesson.id ? "active" : ""}`} key={lesson.id} to={`${mathPath(mathUnit)}/${lesson.id}`}>
            <span>Lesson {lesson.lessonNumber}</span>
            <strong>{lesson.title}</strong>
          </Link>
        ))}
      </aside>
    );
  }

  if (isCourseBActive && readingUnit) {
    return (
      <aside className="sidebar unit8-sidebar graded-course-sidebar course-lesson-sidebar" aria-label="Lesson navigation">
        <h2>Lesson Directory</h2>
        <Link className={`sidebar-link week-overview-link ${!selectedReadingLesson ? "active" : ""}`} to={gradedReadingPath(readingUnit)}>
          <span>Overview</span>
          <strong>Book List</strong>
        </Link>
        {readingUnit.lessons.map((lesson) => (
          <Link className={`lesson-nav-link ${selectedReadingLesson?.id === lesson.id ? "active" : ""}`} key={lesson.id} to={`${gradedReadingPath(readingUnit)}/${lesson.id}`}>
            <span>Lesson {lesson.lessonNumber}</span>
            <strong>{lesson.books.core.title}</strong>
          </Link>
        ))}
      </aside>
    );
  }

  if (isCourseCActive && artUnit) {
    return (
      <aside className="sidebar unit8-sidebar graded-course-sidebar course-lesson-sidebar" aria-label={language === "zh" ? "课程导航" : "Lesson navigation"}>
        <h2>{language === "zh" ? "课程目录" : "Lesson Directory"}</h2>
        <Link className={`sidebar-link week-overview-link ${!selectedArtLesson ? "active" : ""}`} to={artPath(artUnit)}>
          <span>{language === "zh" ? "概览" : "Overview"}</span>
          <strong>{language === "zh" ? "工作室计划" : "Studio Plan"}</strong>
        </Link>
        {artUnit.lessons.map((lesson) => (
          <Link className={`lesson-nav-link ${selectedArtLesson?.id === lesson.id ? "active" : ""}`} key={lesson.id} to={`${artPath(artUnit)}/${lesson.id}`}>
            <span>Lesson {lesson.lessonNumber}</span>
            <strong>{lesson.title}</strong>
          </Link>
        ))}
      </aside>
    );
  }

  return <KCourseDirectory artUnit={artUnit} language={language} mathUnit={mathUnit} readingUnit={readingUnit} />;
}

function KNonLanguageOverview({ artUnit, language, mathUnit }: { artUnit?: KArtUnit; language: LanguageCode; mathUnit: KMathUnit }) {
  const readingUnit = getKGradedReadingUnit(mathUnit.level, mathUnit.unitNumber);

  return (
    <>
      <header className="course-hero unit8-hero graded-course-hero">
        <p className="breadcrumb">{mathUnit.level} Curriculum / Non-Language / Unit {mathUnit.unitNumber}</p>
        <h1>{mathUnit.level} Unit {mathUnit.unitNumber}: Non-Language Courses</h1>
        <div className="hero-rule" aria-hidden="true" />
      </header>

      <section className="dashboard-section">
        <div className="section-title">
          <h2>Course Tracks</h2>
          <p>Course A is connected as the current Math Growing Ladder dynamic test track.</p>
        </div>
        <div className="course-entry-grid">
          <Link className="course-entry-card" to={mathPath(mathUnit)}>
            <span className="course-code">Course A</span>
            <h3>Math Growing Ladder</h3>
            <p>{mathUnit.lessons.length} concrete math lessons connected to the Unit {mathUnit.unitNumber} theme.</p>
            <span className="open-course-link">Open course track</span>
          </Link>
          {readingUnit ? (
            <Link className="course-entry-card" to={gradedReadingPath(readingUnit)}>
              <span className="course-code">Course B</span>
              <h3>Graded Reading</h3>
              <p>{readingUnit.lessons.length} leveled reading lessons connected to the Unit {readingUnit.unitNumber} theme.</p>
              <span className="open-course-link">Open course track</span>
            </Link>
          ) : (
            <article className="course-entry-card muted-card">
              <span className="course-code">Course B</span>
              <h3>Graded Reading</h3>
              <p>Content not connected yet.</p>
            </article>
          )}
          {artUnit ? (
            <Link className="course-entry-card art-entry-card" to={artPath(artUnit)}>
              <span className="course-code">Course C</span>
              <h3>{language === "zh" ? "美术工作室" : "Art Studio"}</h3>
              <p>{artUnit.lessons.length} studio lessons moving from looking and skill-building to making and reflection.</p>
              <span className="open-course-link">Open course track</span>
            </Link>
          ) : null}
        </div>
      </section>
    </>
  );
}

function GradedReadingCourseView({ unit }: { unit: KGradedReadingUnit }) {
  const hasSupportBooks = unit.lessons.some((lesson) => Boolean(lesson.books.support));
  const bookListLabel = `${unit.lessons.length} Lessons Book List`;

  return (
    <>
      <header className="course-hero unit8-hero graded-course-hero">
        <div className="graded-hero-context" aria-label="Course context">
          <span>{unit.level} Unit {unit.unitNumber}: {unit.title}</span>
          <span>Non-Language Part</span>
        </div>
        <h1 className="course-page-title">
          Course B: <span>Graded Reading</span>
        </h1>
        <div className="hero-rule" aria-hidden="true" />
        <Link className="back-link" to={mathUnitBasePath(unit)}
        >
          Back to Unit
        </Link>
      </header>

      <section className="dashboard-section">
        <h2 className="section-heading">Course Unit Overview</h2>
        <InfoBlock kind="overview" title="Course Type">
          <p>{unit.overview.courseType}</p>
        </InfoBlock>
        <InfoBlock kind="overview" title="Course Purpose">
          <p>{unit.overview.coursePurpose}</p>
        </InfoBlock>
        <InfoBlock kind="resources" title="Relationship to PowerUp">
          <p>{unit.overview.relationshipToPowerUp}</p>
        </InfoBlock>
      </section>

      <section className="dashboard-section">
        <h2 className="section-heading">{bookListLabel}</h2>
        <div className="graded-book-table md-book-list" role="table" aria-label="8 lessons book list">
          <div className="graded-book-row heading" role="row">
            <span>Lesson</span>
            <span>{hasSupportBooks ? "Core Book" : "Book"}</span>
            {hasSupportBooks ? <span>Support Book</span> : null}
          </div>
          {unit.overview.bookSet.map((row, index) => (
            <Link className="graded-book-row" key={`${row.lesson}-${index}`} role="row" to={`${gradedReadingPath(unit)}/${unit.lessons[index].id}`}>
              <span>{formatBookListLessonLabel(row, index)}</span>
              <BookListTitle book={unit.lessons[index].books.core} text={formatReadingLevelText(row.coreBook)} />
              {hasSupportBooks && unit.lessons[index].books.support ? (
                <BookListTitle book={unit.lessons[index].books.support} text={formatReadingLevelText(row.supportBook ?? "")} />
              ) : null}
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}

function MathCourseView({ unit }: { unit: KMathUnit }) {
  return (
    <>
      <header className="course-hero unit8-hero graded-course-hero">
        <div className="graded-hero-context" aria-label="Course context">
          <span>{unit.level} Unit {unit.unitNumber}: {unit.title}</span>
          <span>Non-Language Part</span>
        </div>
        <h1 className="course-page-title">
          Course A: <span>Math Growing Ladder</span>
        </h1>
        <div className="hero-rule" aria-hidden="true" />
        <Link className="back-link" to={mathUnitBasePath(unit)}>
          Back to Unit
        </Link>
      </header>

      <section className="dashboard-section">
        <h2 className="section-heading">Course Unit Overview</h2>
        <InfoBlock kind="overview" title="Course Type">
          <p>{unit.overview.courseType}</p>
        </InfoBlock>
        <InfoBlock kind="outcome" title="Unit Outcomes">
          <UnitOutcomesDisplay outcomes={unit.overview.unitOutcomes} />
        </InfoBlock>
      </section>

      <section className="dashboard-section">
        <h2 className="section-heading">Math Lesson Sequence</h2>
        <div className="math-sequence-grid">
          {unit.lessons.map((lesson) => (
            <Link className="math-sequence-card" key={lesson.id} to={`${mathPath(unit)}/${lesson.id}`}>
              <span>L{lesson.lessonNumber}</span>
              <strong>{lesson.title}</strong>
              <small>{lesson.ladder.domain} · {lesson.ladder.stageFocus}</small>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function ArtCourseView({ language, unit }: { language: LanguageCode; unit: KArtUnit }) {
  const focus = getArtSection(unit.overview, "Unit Artistic Focus");
  const overviewSections = getVisibleArtOverviewSections(unit, language);
  const studioSequenceTitle = getArtSection(unit.overview, "Four-Lesson Studio Sequence")?.title;

  return (
    <article className="art-course-page">
      <header className="course-hero unit8-hero graded-course-hero art-course-hero">
        <div className="graded-hero-context" aria-label="Course context">
          <span>{language === "zh" ? `${unit.level} 单元 ${unit.unitNumber}：${unit.title}` : `${unit.level} Unit ${unit.unitNumber}: ${unit.title}`}</span>
          <span>{language === "zh" ? "非语言课程" : "Non-Language Part"}</span>
        </div>
        <h1 className="course-page-title">{language === "zh" ? "课程 C：" : "Course C: "}<span>{language === "zh" ? "美术工作室" : "Art Studio"}</span></h1>
        <p className="art-hero-focus">{firstParagraph(focus)}</p>
        <div className="hero-rule" aria-hidden="true" />
        <Link className="back-link" to={mathUnitBasePath(unit)}>{language === "zh" ? "返回单元" : "Back to Unit"}</Link>
      </header>

      <section className="art-course-at-a-glance" aria-label={language === "zh" ? "课程单元概览" : "Course unit overview"}>
        <div>
          <span className="art-eyebrow">{language === "zh" ? "工作室项目" : "Studio project"}</span>
          <h2>{language === "zh" ? "课程单元概览" : "Course Unit Overview"}</h2>
          <h3>{getArtSubsectionText(unit.overview, "Main Studio Project", "Project Title")}</h3>
          <p>{getArtSubsectionText(unit.overview, "Main Studio Project", "Creative Brief")}</p>
        </div>
        <dl>
          <div><dt>{language === "zh" ? "阶段" : "Stage"}</dt><dd>{getArtSubsectionText(unit.overview, "Unit Identity", "Developmental Stage")}</dd></div>
          <div><dt>{language === "zh" ? "领域" : "Domain"}</dt><dd>{firstParagraph(getArtSection(unit.overview, "Primary Art Domain"))}</dd></div>
          <div><dt>{language === "zh" ? "单元类型" : "Unit type"}</dt><dd>{getArtSubsectionText(unit.overview, "Unit Identity", "Unit Type")}</dd></div>
          <div><dt>{language === "zh" ? "课次" : "Lessons"}</dt><dd>{unit.lessons.length}</dd></div>
        </dl>
      </section>

      <section className="dashboard-section art-studio-sequence">
        <div className="section-title">
          <span className="art-eyebrow">{language === "zh" ? "工作室节奏" : "Studio rhythm"}</span>
          <h2 className="section-heading">{studioSequenceTitle ?? (language === "zh" ? "四课工作室序列" : "Four-Lesson Studio Sequence")}</h2>
        </div>
        <div className="art-sequence-grid">
          {unit.lessons.map((lesson) => (
            <Link key={lesson.id} to={`${artPath(unit)}/${lesson.id}`}>
              <span>0{lesson.lessonNumber}</span>
              <strong>{getArtSubsectionText(lesson.sections, "Lesson Identity", "Studio Phase")}</strong>
              <p>{lesson.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="art-section-stack" aria-label="Art unit details">
        {overviewSections.map((section, index) => (
          <ArtSectionDisplay key={section.key} index={artSectionDisplayNumber(overviewSections, index)} section={section} />
        ))}
      </section>
    </article>
  );
}

function getVisibleArtOverviewSections(unit: KArtUnit, language: LanguageCode): ArtContentSection[] {
  const alwaysHidden = new Set([
    "Unit Identity",
    "Unit Artistic Focus",
    "Main Studio Project",
    "Four-Lesson Studio Sequence",
    "Core Visual Elements",
    "Core Medium",
    "Previously Learned Techniques",
    "New Technical Demand",
    "Art Vocabulary",
    "Materials and Preparation",
    "Differentiation",
    "Progression Link",
    "Boundary Notes",
    "Primary Art Domain",
    "Supporting Art Domains",
  ]);
  const primaryDomain = getArtSection(unit.overview, "Primary Art Domain");
  const supportingDomains = getArtSection(unit.overview, "Supporting Art Domains");
  const artDomains: ArtContentSection = {
    key: "Art Domains",
    title: "Art Domains",
    blocks: [],
    subsections: [
      ...(primaryDomain ? [{ key: "Primary Art Domain", title: primaryDomain.title, blocks: primaryDomain.blocks }] : []),
      ...(supportingDomains ? [{ key: "Supporting Art Domains", title: supportingDomains.title, blocks: supportingDomains.blocks }] : []),
    ],
  };
  const visible = unit.overview.filter((section) => {
    if (alwaysHidden.has(section.key)) return false;
    if (section.key === "Unit 5 Bridge Note" && unit.unitNumber !== 5) return false;
    return true;
  });
  const outcomes = visible.filter((section) => section.key === "Unit Learning Outcomes");
  const remaining = visible.filter((section) => section.key !== "Unit Learning Outcomes");

  return [...outcomes, ...remaining.slice(0, 2), { ...artDomains, key: "Art Domains", title: language === "zh" ? "艺术领域" : "Art Domains" }, ...remaining.slice(2)];
}

function ArtLessonView({ language, lesson, unit }: { language: LanguageCode; lesson: KArtLesson; unit: KArtUnit }) {
  const phase = getArtSubsectionText(lesson.sections, "Lesson Identity", "Studio Phase");
  const domain = getArtSubsectionText(lesson.sections, "Lesson Identity", "Primary Art Domain");
  const hiddenLessonSections = new Set(["Lesson Identity", "Clean-Up and Storage", "Safety Notes"]);
  const visibleSections = lesson.sections.filter((section) => !hiddenLessonSections.has(section.key));

  return (
    <article className="art-lesson-page">
      <header className="art-lesson-header">
        <div className="art-lesson-number" aria-hidden="true">{String(lesson.lessonNumber).padStart(2, "0")}</div>
        <div>
          <p>{unit.level} · {unit.title} · {language === "zh" ? "美术工作室" : "Art Studio"}</p>
          <h1>{lesson.title}</h1>
          <div className="art-lesson-meta"><span>{phase}</span><span>{domain}</span></div>
        </div>
      </header>

      <div className="art-section-stack">
        {visibleSections.map((section, index) => (
          <ArtSectionDisplay key={section.key} index={artSectionDisplayNumber(visibleSections, index)} section={section} />
        ))}
      </div>

      <div className="graded-lesson-feedback art-lesson-feedback">
        <FeedbackButton context={createArtFeedbackContext(unit, lesson)} label={language === "zh" ? "课程反馈" : "Lesson Feedback"} />
      </div>
    </article>
  );
}

function artSectionDisplayNumber(sections: readonly ArtContentSection[], currentIndex: number) {
  return sections.slice(0, currentIndex + 1).filter((section) => section.key !== "Teacher Art Concepts").length;
}

function ArtSectionDisplay({ index, section }: { index: number; section: ArtContentSection }) {
  if (section.key !== "Teacher Art Concepts") {
    return <ArtSectionCard index={index} section={section} />;
  }

  const teacherLanguage = getArtSubsection(section, "Teacher Routine Language");
  const lightLanguage = getArtSubsection(section, "Light Theme Language");

  return (
    <div className="art-teacher-language-group">
      {lightLanguage ? (
        <MathInfoBlock icon="Aa" kind="language" title={lightLanguage.title}>
          <div className="graded-chip-list">
            {artListItems(lightLanguage.blocks).map((item) => <span key={item}>{item}</span>)}
          </div>
        </MathInfoBlock>
      ) : null}
      {teacherLanguage ? (
        <MathInfoBlock icon="◎" kind="teacher" title={teacherLanguage.title}>
          <ul className="teacher-language-list">
            {artListItems(teacherLanguage.blocks).map((item) => <li key={item}>{item}</li>)}
          </ul>
        </MathInfoBlock>
      ) : null}
    </div>
  );
}

function ArtSectionCard({ index, section }: { index: number; section: ArtContentSection }) {
  const kind = artSectionKind(section.key);
  return (
    <section className={`art-section-card art-kind-${kind}`}>
      <div className="art-section-marker" aria-hidden="true">{String(index).padStart(2, "0")}</div>
      <div className="art-section-content">
        <h2>{section.title}</h2>
        <ArtBlocks blocks={section.blocks} />
        {section.subsections.length ? (
          <div className={`art-subsection-list ${kind === "sequence" ? "is-sequence" : ""}`}>
            {section.subsections.map((subsection) => (
              <section key={subsection.key}>
                <h3>{subsection.title}</h3>
                <div className="art-subsection-body">
                  <ArtBlocks blocks={subsection.blocks} />
                </div>
              </section>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function getArtSubsection(section: ArtContentSection, title: string) {
  return section.subsections.find((subsection) => subsection.key === title);
}

function artListItems(blocks: readonly ArtContentBlock[]) {
  return blocks.flatMap((block) => block.type === "list" ? [...block.items] : []);
}

function ArtBlocks({ blocks }: { blocks: readonly ArtContentBlock[] }) {
  return blocks.map((block, index) => block.type === "list" ? (
    <ul key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>
  ) : <p key={index}>{block.text}</p>);
}

function artSectionKind(title: string) {
  const value = title.toLowerCase();
  if (value.includes("outcome") || value.includes("assessment") || value.includes("observation")) return "outcome";
  if (value.includes("encounter") || value.includes("reference") || value.includes("looking")) return "encounter";
  if (value.includes("vocabulary") || value.includes("language") || value.includes("prompt")) return "language";
  if (value.includes("material") || value.includes("preparation") || value.includes("clean-up") || value.includes("safety")) return "materials";
  if (value.includes("sequence") || value.includes("technique") || value.includes("project")) return "sequence";
  if (value.includes("differentiation") || value.includes("support")) return "support";
  if (value.includes("reflection") || value.includes("portfolio") || value.includes("display") || value.includes("sharing")) return "reflection";
  return "overview";
}

function getArtSection(sections: readonly ArtContentSection[], title: string) {
  return sections.find((section) => section.key === title);
}

function firstParagraph(section?: ArtContentSection) {
  const block = section?.blocks.find((entry) => entry.type === "paragraph");
  return block?.type === "paragraph" ? block.text : "";
}

function getArtSubsectionText(sections: readonly ArtContentSection[], sectionTitle: string, subsectionTitle: string) {
  const block = getArtSection(sections, sectionTitle)?.subsections
    .find((subsection) => subsection.key === subsectionTitle)?.blocks
    .find((entry) => entry.type === "paragraph");
  return block?.type === "paragraph" ? block.text : "";
}

function UnitOutcomesDisplay({ outcomes }: { outcomes: readonly string[] }) {
  const groups = groupUnitOutcomes(outcomes);

  return (
    <div className="math-unit-outcomes">
      {groups.map((group) => (
        <section className="math-unit-outcome-domain" key={group.title}>
          <span className="math-domain-label">{group.title}</span>
          <div className="math-outcome-statements">
            {group.items.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function groupUnitOutcomes(outcomes: readonly string[]) {
  const groups: Array<{ title: string; items: string[] }> = [];
  let current: { title: string; items: string[] } | null = null;

  for (const rawOutcome of outcomes) {
    const outcome = rawOutcome.trim();
    const heading = outcome.match(/^#{1,6}\s+(.+)$/);

    if (heading) {
      current = { title: heading[1], items: [] };
      groups.push(current);
      continue;
    }

    if (!current) {
      current = { title: "Unit Can-Do Goals", items: [] };
      groups.push(current);
    }

    current.items.push(outcome);
  }

  return groups.filter((group) => group.items.length > 0);
}

function MathLessonView({ lesson, unit }: { lesson: KMathLesson; unit: KMathUnit }) {
  return (
    <article className="lesson-details math-lesson-page">
      <div className="lesson-details-content">
        <h2 className="section-heading">Lesson {lesson.lessonNumber}: {lesson.title}</h2>

      <MathInfoBlock icon="◎" kind="outcome" title="Lesson Outcome">
        <div className="math-outcome-stack">
          <section>
            <h4>1. Cognitive Objectives</h4>
            <p>{lesson.outcome.cognitive}</p>
          </section>
          <section>
            <h4>2. Skill-based Objectives</h4>
            <p>{lesson.outcome.skill}</p>
          </section>
          <section>
            <h4>3. Affective Objectives</h4>
            <p>{lesson.outcome.affective}</p>
          </section>
        </div>
      </MathInfoBlock>

      <MathInfoBlock icon="↗" kind="overview" title="Math Growing Ladder Alignment">
        <div className="math-ladder-summary">
          <span>{lesson.ladder.domain}</span>
          <span>{lesson.ladder.stageFocus}</span>
        </div>
        <p>{lesson.ladder.support}</p>
      </MathInfoBlock>

      <MathInfoBlock icon="↗" kind="overview" title="Theme Story Context">
        <p>{lesson.themeStoryContext}</p>
      </MathInfoBlock>

      <MathInfoBlock icon="Aa" kind="language" title="Light Theme Language">
        <div className="graded-chip-list">
          {lesson.lightThemeLanguage.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </MathInfoBlock>

      <MathInfoBlock icon="◎" kind="teacher" title="Teacher Routine Language">
        <ul className="teacher-language-list">
          {lesson.teacherRoutineLanguage.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </MathInfoBlock>

      <MathInfoBlock icon="★" kind="challenge" title="Optional Extension">
        <p>{lesson.optionalExtension}</p>
      </MathInfoBlock>

      <MathInfoBlock icon="1" kind="activity" title="Suggested Activities / Games">
        <div className="activity-stack">
          {lesson.activities.map((activity, index) => (
            <article className="activity-line" key={`${activity.title}-${index}`}>
              <strong>{index + 1}. {activity.title}</strong>
              <p>{activity.description}</p>
            </article>
          ))}
        </div>
      </MathInfoBlock>

      <div className="graded-lesson-feedback">
        <FeedbackButton context={createMathFeedbackContext(unit, lesson)} label="Lesson Feedback" />
      </div>
      </div>
    </article>
  );
}

function GradedReadingLessonView({
  embedded = false,
  lesson,
  unit,
}: {
  embedded?: boolean;
  lesson: KGradedReadingLesson;
  unit: KGradedReadingUnit;
}) {
  return (
    <article className={embedded ? "graded-reading-lesson embedded" : "graded-reading-lesson"}>
      <div className="lesson-card-header">
        <div>
          <span className="lesson-number">Lesson {lesson.lessonNumber}</span>
          <h2>{formatReadingLevelText(lesson.title)}</h2>
        </div>
      </div>

      <BookSection book={lesson.books.core} heading={`Core Book: Level ${displayReadingLevel(lesson.books.core.level)} - ${lesson.books.core.title}`} />
      {lesson.books.support ? (
        <BookSection book={lesson.books.support} heading={`Support Book: Level ${displayReadingLevel(lesson.books.support.level)} - ${lesson.books.support.title}`} />
      ) : null}

      <InfoBlock kind="teacher" title="Teacher Routine Language">
        <ul className="teacher-language-list">
          {lesson.teacherRoutineLanguage.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </InfoBlock>

      <div className="graded-lesson-feedback">
        <FeedbackButton context={createGradedReadingFeedbackContext(unit, lesson)} label="Lesson Feedback" />
      </div>
    </article>
  );
}

function BookSection({ book, heading }: { book: KGradedReadingBook; heading: string }) {
  const credits = getBookCredits(book);

  return (
    <section className="graded-book-section">
      <section className="lesson-field-card graded-book-meta-card card-kind-overview">
        <BookCover book={book} size="large" />
        <div className="graded-book-meta">
          <span className="book-role">{heading.startsWith("Core") ? "Core Book" : "Support Book"}</span>
          <h3>{book.title}</h3>
          <dl className="book-meta-list">
            <div>
              <dt>Level</dt>
              <dd><span className="book-level-badge">{displayReadingLevel(book.level)}</span></dd>
            </div>
            <div>
              <dt>Writer</dt>
              <dd>{credits.writer}</dd>
            </div>
            <div>
              <dt>{credits.visualLabel}</dt>
              <dd>{credits.visualValue}</dd>
            </div>
          </dl>
        </div>
      </section>

      <InfoBlock kind="resources" title="Source">
        <GradedSourceDisplay book={book} />
      </InfoBlock>
      <InfoBlock kind="language" title="Language Pattern">
        <h4>Sentence Frame</h4>
        <p><code>{book.sentenceFrame}</code></p>
        <h4>Key Vocabulary</h4>
        <p>{book.vocabulary.join(", ")}</p>
      </InfoBlock>
      <InfoBlock kind="overview" title="Story Context">
        <p>{book.storyContext}</p>
      </InfoBlock>
      <InfoBlock kind="activity" title="Suggested Activities / Games">
        <div className="activity-stack">
          {book.activities.map((activity, index) => (
            <article className="activity-line" key={`${activity.title}-${index}`}>
              <strong>{index + 1}. {activity.title}</strong>
              <p>{activity.description}</p>
            </article>
          ))}
        </div>
      </InfoBlock>
    </section>
  );
}

function getBookCredits(book: KGradedReadingBook) {
  const credits = "credits" in book
    ? book.credits as { writer?: string | null; illustrator?: string | null; visuals?: string | null }
    : null;
  const isPhotography = credits?.visuals === "photography";

  return {
    writer: credits?.writer ?? "TBD",
    visualLabel: isPhotography ? "Visuals" : "Illustrator",
    visualValue: isPhotography ? "Photography" : credits?.illustrator ?? "TBD",
  };
}

function displayReadingLevel(level: string) {
  return level === "AA" ? "aa" : level;
}

function formatReadingLevelText(text: string) {
  return text.replace(/\bLevel AA\b/g, "Level aa");
}

function ReadingLessonSidebarBooks({ lesson }: { lesson: KGradedReadingLesson }) {
  return (
    <span className="lesson-subnav-books">
      <strong>【{displayReadingLevel(lesson.books.core.level)}】{lesson.books.core.title}</strong>
      {lesson.books.support ? (
        <strong>【{displayReadingLevel(lesson.books.support.level)}】{lesson.books.support.title}</strong>
      ) : null}
    </span>
  );
}

function formatBookListLessonLabel(
  row: KGradedReadingUnit["overview"]["bookSet"][number],
  index: number,
) {
  if (row.session) return `${row.lesson} / ${row.session}`;
  if (row.lesson && /^W\d+/i.test(row.lesson)) return `${row.lesson} / L${index + 1}`;
  return row.lesson || `Lesson ${index + 1}`;
}

function BookListTitle({ book, text }: { book: KGradedReadingBook; text: string }) {
  return (
    <span className="book-list-title">
      <BookCover book={book} size="small" />
      <span>{text || `Level ${displayReadingLevel(book.level)} - ${book.title}`}</span>
    </span>
  );
}

function BookCover({ book, size }: { book: KGradedReadingBook; size: "large" | "small" }) {
  const coverImage = "coverImage" in book ? book.coverImage as string | null : null;

  if (!coverImage) {
    return (
      <span className={`book-cover-placeholder book-cover-${size}`}>
        <span>Level {displayReadingLevel(book.level)}</span>
      </span>
    );
  }

  return (
    <span className={`book-cover book-cover-${size}`}>
      <img src={coverImage} alt={`${book.title} cover`} loading="lazy" />
    </span>
  );
}

function GradedSourceDisplay({ book }: { book: KGradedReadingBook }) {
  const source = book.source as Record<string, string | null | undefined>;
  const resources = [
    { icon: "PDF", label: "Book PDF", value: source.pdf ?? "TBD", action: "Open" },
    { icon: "LP", label: "Lesson Plan", value: source.lessonPlan ?? source.lesson_plan ?? source.lesson_plan_pdf ?? source.lp ?? source.worksheet_lp ?? "TBD", action: "Open" },
    { icon: "WS", label: "Worksheet", value: source.worksheet ?? source.worksheet_pdf ?? "TBD", action: "Open" },
    { icon: "▶", label: "Audio", value: source.audio ?? "TBD", action: "Play" },
    { icon: "▶", label: "Video", value: source.video ?? "TBD", action: "Play" },
  ];

  return (
    <div className="graded-resource-list">
      {resources.map((resource) => (
        <SourceResourceRow key={resource.label} resource={resource} />
      ))}
    </div>
  );
}

type GradedSourceResource = {
  icon: string;
  label: string;
  value: string;
  action: string;
};

function isAvailableResource(value: string) {
  return Boolean(value && value.trim() && value.trim().toUpperCase() !== "TBD");
}

function SourceResourceRow({ resource }: { resource: GradedSourceResource }) {
  const isAvailable = isAvailableResource(resource.value);
  const filename = isAvailable ? resource.value.split("/").pop()?.replace(/%20/g, " ") ?? resource.label : resource.label;
  const rowClass = `graded-resource-row ${isAvailable ? "" : "is-empty"}`;

  return (
    <div className={rowClass}>
      <span className="graded-resource-icon" aria-hidden="true">{resource.icon}</span>
      <span className="graded-resource-meta">
        <span className="graded-resource-label">{resource.label}</span>
        <span className="graded-resource-path">{isAvailable ? resource.value : "TBD"}</span>
      </span>
      <span className="graded-resource-actions">
        {isAvailable ? (
          <a className="graded-resource-button primary" href={resource.value} target="_blank" rel="noopener">
            {resource.action}
          </a>
        ) : (
          <span className="graded-resource-button primary disabled">{resource.action}</span>
        )}
        {isAvailable ? (
        <a
            className="graded-resource-button download"
          download={filename}
          href={resource.value}
          rel="noopener"
          target="_blank"
          title={`Download ${resource.label}`}
          aria-label={`Download ${resource.label}`}
        >
            ↓
        </a>
        ) : (
          <span className="graded-resource-button download disabled">↓</span>
        )}
      </span>
    </div>
  );
}

function InfoBlock({ children, kind = "overview", title }: { children: ReactNode; kind?: string; title: string }) {
  return (
    <section className={`lesson-field-card lesson-detail-field graded-info-block card-kind-${kind}`}>
      <div className="field-orb field-step" aria-hidden="true">
        <span>{getInfoIcon(kind)}</span>
      </div>
      <div className="lesson-field-body">
        <h3>{title}</h3>
        {children}
      </div>
    </section>
  );
}

function MathInfoBlock({
  children,
  icon,
  kind = "overview",
  title,
}: {
  children: ReactNode;
  icon: string;
  kind?: string;
  title: string;
}) {
  return (
    <section className={`unit8-card card-kind-${kind}`}>
      <div className={`field-orb ${getMathFieldClass(kind)}`} aria-hidden="true">
        <span>{icon}</span>
      </div>
      <div className="unit8-card-body">
        <h3>{title}</h3>
        {children}
      </div>
    </section>
  );
}

function getMathFieldClass(kind: string) {
  if (kind === "language") return "field-language";
  if (kind === "outcome") return "field-outcome";
  if (kind === "activity") return "field-activity";
  if (kind === "challenge") return "field-challenge";
  if (kind === "teacher") return "field-outcome";
  return "field-step";
}

function getInfoIcon(kind: string) {
  if (kind === "language") return "Aa";
  if (kind === "resources") return "↗";
  if (kind === "teacher") return "◎";
  if (kind === "activity") return "1";
  return "•";
}

function gradedReadingPath(unit: Pick<KMathUnit | KGradedReadingUnit, "level" | "unitNumber">) {
  return `${mathUnitBasePath(unit)}/course-b`;
}

function artPath(unit: Pick<KArtUnit, "level" | "unitNumber">) {
  return `${mathUnitBasePath(unit)}/course-c`;
}

function mathPath(unit: KMathUnit) {
  return `${mathUnitBasePath(unit)}/course-a`;
}

function mathUnitBasePath(unit: Pick<KMathUnit | KGradedReadingUnit | KArtUnit, "level" | "unitNumber">) {
  return `/curriculum/${unit.level.toLowerCase()}/non-language/unit-${String(unit.unitNumber).padStart(2, "0")}`;
}

function getMathUnitForPath(pathname: string): KMathUnit {
  const match = pathname.match(/\/curriculum\/(k[123])\/non-language\/unit-(\d{2})/i);
  const level = match?.[1] ?? "k2";
  const unitNumber = Number(match?.[2] ?? 1);
  const unit = getKMathUnit(level, unitNumber);
  if (!unit) throw new Error(`Missing Math Growing Ladder unit for ${level.toUpperCase()} Unit ${unitNumber}`);
  return unit;
}

function getGradedReadingUnitForPath(pathname: string): KGradedReadingUnit | undefined {
  const match = pathname.match(/\/curriculum\/(k[123])\/non-language\/unit-(\d{2})/i);
  if (!match) return undefined;
  return getKGradedReadingUnit(match[1], Number(match[2]));
}

function getArtUnitForPath(pathname: string): KArtUnit | undefined {
  const match = pathname.match(/\/curriculum\/(k[123])\/non-language\/unit-(\d{2})/i);
  if (!match) return undefined;
  return getKArtUnit(match[1], Number(match[2]));
}

function localizeArtUnit(unit: KArtUnit | undefined, language: LanguageCode): KArtUnit | undefined {
  const translation = language === "zh" ? unit?.translations?.zh : undefined;
  if (!unit || !translation) return unit;
  return {
    ...unit,
    title: translation.title,
    displayTitle: translation.displayTitle,
    sourceMarkdownPath: translation.sourceMarkdownPath,
    sourceMarkdown: translation.sourceMarkdown,
    overview: translation.overview,
    lessons: translation.lessons,
  };
}

function createMathFeedbackContext(unit: KMathUnit, lesson: KMathLesson): FeedbackContext {
  return {
    course_code: "A",
    course_title: "Math Growing Ladder",
    course_type: "non-language",
    lesson_id: lesson.id,
    lesson_title: `Lesson ${lesson.lessonNumber}: ${lesson.title}`,
    level: unit.level as FeedbackContext["level"],
    page_url: window.location.pathname,
    unit_id: unit.unitId,
    unit_number: unit.unitNumber,
    unit_title: unit.displayTitle,
  };
}

function createGradedReadingFeedbackContext(unit: KGradedReadingUnit, lesson: KGradedReadingLesson): FeedbackContext {
  return {
    course_code: "B",
    course_title: "Graded Reading",
    course_type: "non-language",
    lesson_id: lesson.id,
    lesson_title: `Lesson ${lesson.lessonNumber}: ${lesson.title}`,
    level: unit.level,
    page_url: window.location.pathname,
    unit_id: unit.unitId,
    unit_number: unit.unitNumber,
    unit_title: unit.displayTitle,
  };
}

function createArtFeedbackContext(unit: KArtUnit, lesson: KArtLesson): FeedbackContext {
  return {
    course_code: "C",
    course_title: "Art Studio",
    course_type: "non-language",
    lesson_id: lesson.id,
    lesson_title: `Lesson ${lesson.lessonNumber}: ${lesson.title}`,
    level: unit.level as FeedbackContext["level"],
    page_url: window.location.pathname,
    unit_id: unit.unitId,
    unit_number: unit.unitNumber,
    unit_title: unit.displayTitle,
  };
}
