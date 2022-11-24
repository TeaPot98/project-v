import { Router } from "express";

import { removePasswordHash } from "models/utils";
import { ForbiddenError, getUser } from "utils";
import { Roles } from "types";
import { User } from "models";

export const usersRouter = Router();

usersRouter.get("/logged", async (req, res, next) => {
  try {
    const user = await getUser(req);
    res.json(removePasswordHash(user));
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const { role } = await getUser(req);
    if (role !== Roles.ADMIN)
      throw new ForbiddenError("Only admins can access the users list");

    const users = await User.find();
    res.json(users.map((u) => removePasswordHash(u)));
  } catch (err) {
    next(err);
  }
});
