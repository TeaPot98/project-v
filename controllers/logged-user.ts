import { Router } from "express";
import { getUser } from "utils";

export const loggedUserRouter = Router();

loggedUserRouter.get("/", async (req, res, next) => {
  try {
    const user = await getUser(req);
    res.json(user);
  } catch (err) {
    next(err);
  }
});
