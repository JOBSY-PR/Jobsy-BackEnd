import { Router } from "express";
import { body } from "express-validator";
import { createToken } from "../Authentication/auth.js";
import { prisma } from "../Database/db.js";
import { handleErrors } from "../Middleware/handleErrors.js";

const router = Router();

router.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
  body("email").isString(),
  body("password").isString(),
  handleErrors,
  async (req, res) => {
    try {
      const employee = await prisma.employee.create({
        data: {
          firstName: req.body.firstName,
          lastname: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        },
      });

      if (!employee) {
        throw new Error("Emoployee could not be created");
      }

      const token =  createToken(employee);
      console.log(token);

      res.json({ message: "Employee created successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const employee = await prisma.employee.findMany();

    if (!employee) {
      throw new Error("Employees not found");
    }

    res.json(employee);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const employee = await prisma.employee.update({
      where: {
        id: req.user.id,
      },
      data: {
        firstName: req.body.firstName,
        lastname: req.body.firstName,
      },
    });
    if (!employee) {
      throw new Error("Employee could not be updated");
    }

    res.json({ message: "Employee updated successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const employee = await prisma.employee.delete({
      where: {
        id: req.user.id,
      },
    });
    if (!employee) {
      throw new Error("Employee could not be deleted");
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
