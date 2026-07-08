import cors from "cors";
import express from "express";

import { env } from "./shared/config/env";
import { isDatabaseConnected } from "./shared/database/mongodb";
import { apiModules } from "./modules";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({
      app: "endocare-api",
      status: "ok",
      environment: env.NODE_ENV,
      database: isDatabaseConnected() ? "connected" : "disconnected"
    });
  });

  app.get("/modules", (_req, res) => {
    res.json(apiModules);
  });

  return app;
}
