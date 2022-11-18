import express, { Request } from "express";
import mongoose from "mongoose";
import cors from "cors";

import { MONGODB_URI, logger } from "utils";
import {
  requestLogger,
  unknownEndpoint,
  errorLogger,
  errorHandler,
  failSaveHandler,
} from "middleware";
import { authRouter, patientsRouter, patientTypesRouter } from "controllers";

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((err) => logger.error("error connecting to MongoDB", err.message));

app.use(cors<Request>());

app.use(express.json());
app.use(requestLogger);

app.use("/api/auth", authRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/patient-types", patientTypesRouter);

app.use(unknownEndpoint);

app.use(errorLogger);
app.use(errorHandler);
app.use(failSaveHandler);

export default app;
