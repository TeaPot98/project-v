import { Router } from "express";
import { User } from "models";
import { Roles } from "types";

import { ForbiddenError, getUser } from "utils";

export const usersRouter = Router();

usersRouter.get("/logged", async (req, res, next) => {
  try {
    const user = await getUser(req);
    const { passwordHash, ...userWithoutHash } = JSON.parse(
      JSON.stringify(user)
    );

    res.json(userWithoutHash);
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
    res.json(users);
  } catch (err) {
    next(err);
  }
});
