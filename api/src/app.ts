import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config.js";
import "./db.js";
import { authRouter } from "./routes/auth.js";
import { feedbackRouter } from "./routes/feedback.js";
import { languageExtensionsRouter } from "./routes/languageExtensions.js";
import { languageOverridesRouter } from "./routes/languageOverrides.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: config.appUrl,
    }),
  );

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/feedback", feedbackRouter);
  app.use("/api", languageExtensionsRouter);
  app.use("/api", languageOverridesRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found." });
  });

  return app;
}
