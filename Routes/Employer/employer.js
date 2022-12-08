import { Router } from "express";
import { body } from "express-validator";
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
      const employer = await prisma.employee.create({
        data: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
        },
      });

      if (!employer) {
        throw new Error("Emoployer could not be created");
      }

      res.json({ message: "Employer created successfully" });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const employer = await prisma.employee.findMany();

    if (!employer) {
      throw new Error("Employers not found");
    }

    res.json(employer);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const employer = await prisma.employee.update({
      where: {
        id: req.user.id,
      },
      data: {
        firstName: req.body.firstName,
        lastname: req.body.firstName,
      },
    });
    if (!employer) {
      throw new Error("Employer could not be updated");
    }

    res.json({ message: "Employer updated successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const employer = await prisma.employee.delete({
      where: {
        id: req.user.id,
      },
    });
    if (!employee) {
      throw new Error("Employer could not be deleted");
    }

    res.json({ message: "Employer deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
