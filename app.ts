import express, { Request } from "express";
import cors from "cors";

import {
  MONGODB_URI,
  requestLogger,
  logger,
  unknownEndpoint,
  errorHandler,
} from "utils";
import { patientsRouter, patientTypesRouter } from "controllers";
import mongoose from "mongoose";

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

app.use("/api/patients", patientsRouter);
app.use("/api/patient-types", patientTypesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
