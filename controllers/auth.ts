import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { JWT_SECRET } from "utils";
import { User } from "models";
import { CredentialsError, UserExistsError } from "utils/errors";

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, name, surname, role, password } = req.body;

    const existentUser = await User.findOne({ email });
    if (existentUser) {
      throw new UserExistsError();
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({ email, name, surname, role, passwordHash });
    const savedUser = await user.save();

    const { passwordHash: _, ...userWithoutHash } = JSON.parse(
      JSON.stringify(savedUser)
    );
    res.json(userWithoutHash);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const credentialsCorrect =
      user !== null && (await bcrypt.compare(password, user.passwordHash));

    if (!credentialsCorrect) {
      throw new CredentialsError();
    }

    const { passwordHash, ...userWithoutHash } = JSON.parse(
      JSON.stringify(user)
    );
    const token = jwt.sign(userWithoutHash, JWT_SECRET);

    res.json({ ...userWithoutHash, token });
  } catch (error) {
    next(error);
  }
});
