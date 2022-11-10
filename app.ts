import express, { Request } from "express";
import cors from "cors";

import { requestLogger } from "utils";
import { patientsRouter } from "controllers";

const app = express();

app.use(cors<Request>());

app.use(express.json());
app.use(requestLogger);

app.use("/api/patients", patientsRouter);

export default app;
