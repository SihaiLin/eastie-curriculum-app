import { useEffect, useMemo, useState } from "react";
import { listFeedback, updateFeedbackStatus } from "../feedback/feedbackClient";
import type { FeedbackItem, FeedbackStatus } from "../feedback/feedbackTypes";

const statusOptions: Array<FeedbackStatus | ""> = ["", "open", "reviewed", "resolved"];

export function AdminFeedbackPage() {
  const [courseCode, setCourseCode] = useState("");
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [lessonId, setLessonId] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [status, setStatus] = useState<FeedbackStatus | "">("open");
  const [unitId, setUnitId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedFeedback = useMemo(
    () => feedback.find((item) => item.id === selectedId) ?? feedback[0],
    [feedback, selectedId],
  );

  async function loadFeedback() {
    setIsLoading(true);
    setError("");
    try {
      const items = await listFeedback({
        course_code: courseCode.trim(),
        lesson_id: lessonId.trim(),
        status,
        unit_id: unitId.trim(),
      });
      setFeedback(items);
      setSelectedId((current) => (current && items.some((item) => item.id === current) ? current : items[0]?.id ?? null));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load feedback.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadFeedback();
  }, []);

  async function handleStatusChange(item: FeedbackItem, nextStatus: FeedbackStatus) {
    setError("");
    try {
      const updated = await updateFeedbackStatus(item.id, nextStatus);
      setFeedback((items) => items.map((existing) => (existing.id === updated.id ? updated : existing)));
      setSelectedId(updated.id);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update feedback.");
    }
  }

  return (
    <main className="admin-page">
      <section className="admin-header">
        <div>
          <p className="login-kicker">Admin Review</p>
          <h1>Lesson Feedback</h1>
        </div>
        <button className="secondary-auth-button" disabled={isLoading} onClick={loadFeedback} type="button">
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </section>

      <section className="admin-filters" aria-label="Feedback filters">
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as FeedbackStatus | "")}>
            {statusOptions.map((option) => (
              <option key={option || "all"} value={option}>
                {option || "all"}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Unit ID</span>
          <input value={unitId} onChange={(event) => setUnitId(event.target.value)} placeholder="pg-non-language-unit-08" />
        </label>
        <label>
          <span>Course</span>
          <input value={courseCode} onChange={(event) => setCourseCode(event.target.value)} placeholder="A" />
        </label>
        <label>
          <span>Lesson ID</span>
          <input value={lessonId} onChange={(event) => setLessonId(event.target.value)} placeholder="lesson id" />
        </label>
        <button className="login-submit" disabled={isLoading} onClick={loadFeedback} type="button">
          Apply
        </button>
      </section>

      {error ? <p className="login-error">{error}</p> : null}

      <section className="admin-feedback-layout">
        <div className="admin-feedback-list">
          {feedback.length ? (
            feedback.map((item) => (
              <button
                className={`feedback-review-item ${selectedFeedback?.id === item.id ? "active" : ""}`}
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                type="button"
              >
                <span>{item.status}</span>
                <strong>{item.context.lesson_title}</strong>
                <small>{item.context.unit_title} · Course {item.context.course_code}</small>
              </button>
            ))
          ) : (
            <p className="admin-empty">{isLoading ? "Loading feedback..." : "No feedback matches these filters."}</p>
          )}
        </div>

        <article className="admin-feedback-detail">
          {selectedFeedback ? (
            <>
              <div className="admin-detail-title">
                <div>
                  <p>{selectedFeedback.context.level} / Unit {selectedFeedback.context.unit_number} / Course {selectedFeedback.context.course_code}</p>
                  <h2>{selectedFeedback.context.lesson_title}</h2>
                </div>
                <select
                  value={selectedFeedback.status}
                  onChange={(event) => handleStatusChange(selectedFeedback, event.target.value as FeedbackStatus)}
                >
                  <option value="open">open</option>
                  <option value="reviewed">reviewed</option>
                  <option value="resolved">resolved</option>
                </select>
              </div>
              <dl className="admin-feedback-meta">
                <div><dt>Category</dt><dd>{selectedFeedback.category ?? "none"}</dd></div>
                <div><dt>Submitted by</dt><dd>{selectedFeedback.user?.email ?? "unknown"}</dd></div>
                <div><dt>Created</dt><dd>{selectedFeedback.created_at}</dd></div>
                <div><dt>Page</dt><dd>{selectedFeedback.context.page_url}</dd></div>
              </dl>
              <p className="admin-feedback-message">{selectedFeedback.message}</p>
            </>
          ) : (
            <p className="admin-empty">Select feedback to review.</p>
          )}
        </article>
      </section>
    </main>
  );
}
