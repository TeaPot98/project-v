import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { JWT_SECRET } from "utils";
import { User } from "models";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, name, surname, role, password } = req.body;

  if ((await User.findOne(email)) !== null) {
    res.status(401).json({
      error: "user with this email already exists",
    });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    name,
    surname,
    role,
    passwordHash,
  });
  const savedUser = await user.save();

  res.json({
    id: savedUser.id,
    email: savedUser.email,
    name: savedUser.email,
    surname: savedUser.surname,
    role: savedUser.role,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const credentialsCorrect =
    user !== null && (await bcrypt.compare(password, user.passwordHash));

  if (!credentialsCorrect) {
    res.status(401).json({
      error: "wrong email or password",
    });
    return;
  }

  const { passwordHash, ...userWithoutHash } = JSON.parse(JSON.stringify(user));
  const token = jwt.sign(userWithoutHash, JWT_SECRET);

  res.json({ ...userWithoutHash, token });
});
