import { useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { LanguageProvider } from "../../app/LanguageContext";
import { useAuth } from "../../auth/AuthProvider";
import { ChangePasswordDialog } from "../../auth/ChangePasswordDialog";
import { getDynamicUnitPath } from "../../curriculum/dynamicUnitPaths";
import type { LanguageCode } from "../../curriculum/types";
import { LanguageToggle } from "../LanguageToggle/LanguageToggle";

export function AppLayout({
  children,
  language,
  onLanguageChange,
}: {
  children: ReactNode;
  language: LanguageCode;
  onLanguageChange: (language: LanguageCode) => void;
}) {
  const { currentUser, logout } = useAuth();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const location = useLocation();
  const normalizedPathname = location.pathname.replace(/\/+$/, "") || "/";
  const isCurriculumHome = normalizedPathname === "/curriculum";
  const isStatusPage = location.pathname === "/curriculum/status";
  const isLanguageUnit = location.pathname.includes("/language/");
  const curriculumMatch = location.pathname.match(/^\/curriculum\/(pg|pk|k1|k2|k3)\/(language|non-language)\//);
  const currentLevel = curriculumMatch?.[1];
  const currentCourseType = curriculumMatch?.[2];
  const courseMatch = location.pathname.match(/\/(course-[a-z0-9]+)(?:\/|$)/);
  const currentCourseSlug = courseMatch?.[1];
  const currentUnitNumber = (() => {
    if (location.pathname.includes("/unit-uh")) return 0;
    const match = location.pathname.match(/\/unit-(\d+)/);
    return match ? Number(match[1]) : null;
  })();

  const getContextualUnitPath = (unitNum: number): string | null => {
    if (!curriculumMatch) return null;
    const basePath = getDynamicUnitPath(curriculumMatch[1], curriculumMatch[2], unitNum);
    if (!basePath) return null;
    if (!currentCourseSlug || currentCourseType !== "non-language") return basePath;
    if (!isKnownCourseUnit(currentLevel ?? "", currentCourseSlug, unitNum)) return null;
    return `${basePath}/${currentCourseSlug}`;
  };

  const isKnownUnit = (unitNum: number): boolean => {
    return Boolean(getContextualUnitPath(unitNum));
  };

  return (
    <LanguageProvider value={language}>
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/curriculum">
          <img className="brand-crest" src="/assets/eastie_crest.jpg" alt="EASTIE crest" />
          <span>
            <strong>EASTIE</strong>
            <small>PRE-SCHOOL INTERNATIONAL SHENZHEN</small>
          </span>
        </a>
        <nav className="topnav" aria-label="Main navigation">
          {!isCurriculumHome && (
            <>
              <a className="home-link" href="/curriculum" aria-label="Curriculum home">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path d="M4 10.8 12 4l8 6.8" />
                  <path d="M6.5 10.5V20h11v-9.5" />
                  <path d="M10 20v-5h4v5" />
                </svg>
              </a>
              {(() => {
                const unitPath = curriculumMatch ? getContextualUnitPath(0) : null;
                return unitPath ? (
                  <a className={currentUnitNumber === 0 ? "unit-active" : undefined} href={unitPath}>UH</a>
                ) : (
                  <span className="nav-disabled">UH</span>
                );
              })()}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                const unitStr = `U${num}`;
                const unitPath = curriculumMatch ? getContextualUnitPath(num) : null;
                if (isKnownUnit(num) && unitPath) {
                  return (
                    <a
                      key={unitStr}
                      className={currentUnitNumber === num ? "unit-active" : undefined}
                      href={unitPath}
                    >
                      {unitStr}
                    </a>
                  );
                }
                return (
                  <span key={unitStr} className="nav-disabled">{unitStr}</span>
                );
              })}
            </>
          )}
          {currentUser?.role === "admin" ? <a href="/admin/feedback">Feedback</a> : null}
        </nav>
        <div className="topbar-actions">
          {isLanguageUnit ? null : <LanguageToggle language={language} onChange={onLanguageChange} />}
          {currentUser ? (
            <div className="user-menu">
              <button className="user-chip user-menu-trigger" type="button">
                <span>{currentUser.displayName}</span>
                <small>{currentUser.role.replace("_", " ")}</small>
              </button>
              <div className="user-menu-panel">
                <button className="user-menu-item" onClick={() => setIsPasswordDialogOpen(true)} type="button">
                  Change Password
                </button>
                <button className="user-menu-item" onClick={logout} type="button">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="user-chip">
              <span>Login pending</span>
            </div>
          )}
        </div>
      </header>
      {children}
      <ChangePasswordDialog isOpen={isPasswordDialogOpen} onClose={() => setIsPasswordDialogOpen(false)} />
    </div>
    </LanguageProvider>
  );
}

function isKnownCourseUnit(level: string, courseSlug: string, unitNum: number) {
  const normalizedLevel = level.toLowerCase();
  const normalizedCourse = courseSlug.toLowerCase();

  if (unitNum === 0) return (normalizedLevel === "pg" || normalizedLevel === "pk") && /^course-(a|b|c1|c2|d|e|f|g)$/.test(normalizedCourse);

  if ((normalizedLevel === "pg" || normalizedLevel === "pk") && /^course-(a|b|c1|c2|d|e|f|g)$/.test(normalizedCourse)) {
    return unitNum >= 1 && unitNum <= 9;
  }

  if (normalizedLevel === "k1" && normalizedCourse === "course-a") {
    return unitNum >= 1 && unitNum <= 9;
  }

  if (["k1", "k2", "k3"].includes(normalizedLevel) && normalizedCourse === "course-b") {
    return unitNum >= 1 && unitNum <= 9;
  }

  if (normalizedLevel === "k1" && (normalizedCourse === "course-c" || normalizedCourse === "course-d")) {
    return unitNum >= 1 && unitNum <= 9;
  }

  if (normalizedLevel === "k2" && normalizedCourse === "course-c") {
    return unitNum === 1;
  }

  return false;
}
