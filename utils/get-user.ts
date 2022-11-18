import { Request } from "express";
import { User } from "models";
import { UnauthorizedError } from "utils";

export const getUser = async (req: Request) => {
  const userId = req.get("user-id");
  const loggedUser = await User.findById(userId);
  if (!userId || !loggedUser) throw new UnauthorizedError();
  return loggedUser;
};
