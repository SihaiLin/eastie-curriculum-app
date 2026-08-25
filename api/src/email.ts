import { config } from "./config.js";
import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  if (!config.smtpHost) {
    console.info("[dev email] Password reset link", { email, resetUrl });
    return;
  }

  await sendEmail({
    html: `<p>Use this link to reset your EASTIE Curriculum password:</p><p><a href="${escapeHtml(resetUrl)}">${escapeHtml(resetUrl)}</a></p>`,
    subject: "Reset your EASTIE Curriculum password",
    text: `Use this link to reset your EASTIE Curriculum password: ${resetUrl}`,
    to: email,
  });
}

export async function sendLoginCodeEmail(email: string, code: string) {
  if (!config.smtpHost) {
    console.info("[dev email] EASTIE login code", { code, email, expiresInMinutes: config.loginCodeMinutes });
    return;
  }

  await sendEmail({
    html: `<p>Your EASTIE Curriculum login code is:</p><p style="font-size: 24px; font-weight: 700; letter-spacing: 4px;">${code}</p><p>This code expires in ${config.loginCodeMinutes} minutes.</p>`,
    subject: "Your EASTIE Curriculum login code",
    text: `Your EASTIE Curriculum login code is ${code}. It expires in ${config.loginCodeMinutes} minutes.`,
    to: email,
  });
}

async function sendEmail(input: { html: string; subject: string; text: string; to: string }) {
  const transporter = nodemailer.createTransport({
    auth: config.smtpUser || config.smtpPass ? {
      pass: config.smtpPass,
      user: config.smtpUser,
    } : undefined,
    host: config.smtpHost,
    port: config.smtpPort ?? 587,
    secure: config.smtpSecure,
  });

  await transporter.sendMail({
    from: config.emailFrom,
    html: input.html,
    subject: input.subject,
    text: input.text,
    to: input.to,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
