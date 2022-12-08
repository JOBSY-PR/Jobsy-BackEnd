import { Router } from "express";
import body from "express-validator";
import { prisma } from "../../Database/db.js";
import { comparePassword, hashPassword, createToken } from "../auth.js";


export const createUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    if (!user) {
      throw new Error("User could not be created");
    }
    const token = createToken(user);
    res.json({ message: "User created successully", token: token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    const isValid = await comparePassword(req.body.password, user.password);

    if (!isValid) {
      throw new Error("Invalid Credentials");
    }

    const token = createToken(user);
    res.json({ message: "User logged in successfully", token: token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

