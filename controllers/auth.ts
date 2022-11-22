import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";

import {
  getToken,
  JWT_SECRET,
  CredentialsError,
  UserExistsError,
  InvalidTokenError,
  ForbiddenError,
} from "utils";
import { User } from "models";
import { Roles, TokenUser } from "types";

export const authRouter = Router();

authRouter.post("/signup", async (req, res, next) => {
  try {
    const { username, name, surname, role, password } = req.body;
    const token = getToken(req);
    const { id: userId } = jwt.verify(token, JWT_SECRET) as TokenUser;

    const loggedUser = await User.findById(userId);
    if (!userId || !loggedUser) throw new InvalidTokenError();
    if (loggedUser.role !== Roles.ADMIN) throw new ForbiddenError();

    const existentUser = await User.findOne({ username });
    if (existentUser) throw new UserExistsError();

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ username, name, surname, role, passwordHash });
    const savedUser = await user.save();

    const { passwordHash: _, ...userWithoutHash } = JSON.parse(
      JSON.stringify(savedUser)
    );
    res.json(userWithoutHash);
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const credentialsCorrect =
      user !== null && (await bcrypt.compare(password, user.passwordHash));

    if (!credentialsCorrect) throw new CredentialsError();

    const { passwordHash, ...userWithoutHash } = JSON.parse(
      JSON.stringify(user)
    );
    const token = jwt.sign(userWithoutHash, JWT_SECRET);

    res.json({ ...userWithoutHash, token });
  } catch (err) {
    next(err);
  }
});
