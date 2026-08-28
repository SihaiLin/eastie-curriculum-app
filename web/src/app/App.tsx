import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { AdminFeedbackPage } from "../admin/AdminFeedbackPage";
import { AdminRoute } from "../auth/AdminRoute";
import { LoginPage } from "../auth/LoginPage";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { AppLayout } from "../components/Layout/AppLayout";
import { CurriculumHome } from "../components/Curriculum/CurriculumHome";
import { CurriculumStatusPage } from "../components/Curriculum/CurriculumStatusPage";
import { GradedReadingUnitPage } from "../components/Curriculum/GradedReadingUnitPage";
import { KLanguageCanonicalPreviewPage } from "../components/Curriculum/KLanguageCanonicalPreviewPage";
import { KLanguageUnitCentricPreviewPage } from "../components/Curriculum/KLanguageUnitCentricPreviewPage";
import { LanguageClassificationReviewPage } from "../components/Curriculum/LanguageClassificationReviewPage";
import { PowerUpResourceReviewPage } from "../components/Curriculum/PowerUpResourceReviewPage";
import { UnitPage } from "../components/Curriculum/UnitPage";
import type { LanguageCode } from "../curriculum/types";

export function App() {
  const [language, setLanguage] = useState<LanguageCode>("en");

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/curriculum" replace />} />
        <Route
          path="/admin/feedback"
          element={
            <AdminRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <AdminFeedbackPage />
              </AppLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/curriculum"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <CurriculumHome language={language} />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/status"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <CurriculumStatusPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/power-up/resources"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <PowerUpResourceReviewPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/:unitSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/:unitSlug/course-a"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/:unitSlug/course-a/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/:unitSlug/course-b"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/:unitSlug/course-b/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/:unitSlug/course-c"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <UnitPage language={language} />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/:unitSlug/course-c/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <UnitPage language={language} />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/:unitSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/:unitSlug/course-a"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/:unitSlug/course-a/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/:unitSlug/course-b"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/:unitSlug/course-b/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k3/non-language/:unitSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k3/non-language/:unitSlug/course-a"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k3/non-language/:unitSlug/course-a/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k3/non-language/:unitSlug/course-b"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k3/non-language/:unitSlug/course-b/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/unit-01"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/unit-01"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/unit-01/course-a"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k1/non-language/unit-01/course-a/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k3/non-language/unit-01"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k3/non-language/unit-01/course-a"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k3/non-language/unit-01/course-a/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/unit-01/course-a"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/unit-01/course-a/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/unit-01/course-b"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/unit-01/course-b/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k2/non-language/graded-reading/unit-01"
          element={<Navigate to="/curriculum/k2/non-language/unit-01/course-b" replace />}
        />
        <Route
          path="/curriculum/k2/non-language/graded-reading/unit-01/:lessonSlug"
          element={<LegacyGradedReadingRedirect />}
        />
        <Route
          path="/curriculum/:level/non-language/:unitSlug/course-c"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/:level/non-language/:unitSlug/course-c/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <GradedReadingUnitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/:level/language/:unitSlug/classify-language"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <LanguageClassificationReviewPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k-language/canonical-preview"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <KLanguageCanonicalPreviewPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/k-language/unit-centric-preview"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <KLanguageUnitCentricPreviewPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/:level/:courseType/:unitSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <UnitPage language={language} />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/:level/:courseType/:unitSlug/:courseSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <UnitPage language={language} />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum/:level/:courseType/:unitSlug/:courseSlug/:lessonSlug"
          element={
            <ProtectedRoute>
              <AppLayout language={language} onLanguageChange={setLanguage}>
                <UnitPage language={language} />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function LegacyGradedReadingRedirect() {
  const { lessonSlug } = useParams();
  return <Navigate to={`/curriculum/k2/non-language/unit-01/course-b/${lessonSlug ?? ""}`} replace />;
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, [location.pathname, location.search]);

  return null;
}
