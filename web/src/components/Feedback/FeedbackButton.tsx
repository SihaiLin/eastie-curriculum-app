import { useState, type FormEvent } from "react";
import { submitFeedback } from "../../feedback/feedbackClient";
import type { FeedbackCategory, FeedbackContext } from "../../feedback/feedbackTypes";

interface FeedbackButtonProps {
  context: FeedbackContext;
  label?: string;
  plain?: boolean;
}

const categoryOptions: Array<{ value: FeedbackCategory; label: string }> = [
  { value: "content", label: "Content" },
  { value: "translation", label: "Translation" },
  { value: "layout", label: "Layout" },
  { value: "bug", label: "Bug" },
  { value: "other", label: "Other" },
];

export function FeedbackButton({ context, label = "Feedback", plain = false }: FeedbackButtonProps) {
  const [category, setCategory] = useState<FeedbackCategory>("content");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setStatus("Please write feedback before submitting.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const result = await submitFeedback({
        category,
        context: {
          ...context,
          page_url: window.location.pathname,
        },
        message: trimmedMessage,
      });
      setStatus(result.message);
      setMessage("");
      setIsOpen(false);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Feedback submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (plain) {
    return (
      <section className="lesson-feedback-plain">
        <button
          aria-expanded={isOpen}
          className="feedback-toggle"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          {label}
        </button>
        {isOpen ? (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <label>
              <select value={category} onChange={(event) => setCategory(event.target.value as FeedbackCategory)}>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
            <label>
              <textarea
                name="feedback_content"
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write feedback for this lesson..."
                rows={4}
                value={message}
              />
            </label>
            <div className="feedback-actions">
              <button className="feedback-submit" disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
              <p className="feedback-status" aria-live="polite">{status}</p>
            </div>
          </form>
        ) : status ? (
          <p className="feedback-status" aria-live="polite">{status}</p>
        ) : null}
      </section>
    );
  }

  return (
    <section className="lesson-feedback" aria-label={`Feedback for ${context.lesson_title}`}>
      <button
        aria-expanded={isOpen}
        className="feedback-toggle"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        {label}
      </button>
      {isOpen ? (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <label>
            <span>Feedback category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value as FeedbackCategory)}>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Lesson feedback</span>
            <textarea
              name="feedback_content"
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write feedback for this lesson..."
              rows={4}
              value={message}
            />
          </label>
          <div className="feedback-actions">
            <button className="feedback-submit" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
            <p className="feedback-status" aria-live="polite">
              {status}
            </p>
          </div>
        </form>
      ) : status ? (
        <p className="feedback-status" aria-live="polite">
          {status}
        </p>
      ) : null}
    </section>
  );
}
