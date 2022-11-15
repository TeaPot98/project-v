import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { logger } from "utils";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("---");
  next();
};

export const unknownEndpoint = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction
) => {
  logger.error(err);

  return next(err);
};
