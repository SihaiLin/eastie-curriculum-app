import type { FeedbackItem, FeedbackPayload, FeedbackResult, FeedbackStatus } from "./feedbackTypes";

export async function submitFeedback(payload: FeedbackPayload): Promise<FeedbackResult> {
  const response = await fetch("/api/feedback", {
    body: JSON.stringify(payload),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Feedback submission failed.");
  }

  return {
    feedbackId: data.feedback?.id,
    ok: true,
    message: "Feedback submitted. Thank you.",
  };
}

export async function listFeedback(filters: {
  course_code?: string;
  lesson_id?: string;
  status?: FeedbackStatus | "";
  unit_id?: string;
} = {}): Promise<FeedbackItem[]> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }

  const query = params.toString();
  const response = await fetch(`/api/feedback${query ? `?${query}` : ""}`, {
    credentials: "include",
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Feedback list failed.");
  }

  return data.feedback ?? [];
}

export async function updateFeedbackStatus(id: string, status: FeedbackStatus): Promise<FeedbackItem> {
  const response = await fetch(`/api/feedback/${encodeURIComponent(id)}`, {
    body: JSON.stringify({ status }),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "PATCH",
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof data.error === "string" ? data.error : "Feedback update failed.");
  }

  return data.feedback;
}
