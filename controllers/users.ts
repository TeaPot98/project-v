import { Router } from "express";

import { getUser } from "utils";

export const usersRouter = Router();

usersRouter.get("/logged", async (req, res, next) => {
  try {
    const user = await getUser(req);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
