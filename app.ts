import express, { Request } from "express";
import cors from "cors";

import { requestLogger } from "utils";

const app = express();

app.use(cors<Request>());

app.use(express.json());
app.use(requestLogger);

export default app;
