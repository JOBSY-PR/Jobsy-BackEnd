import { Router } from "express";
import body from "express-validator";
import { prisma } from "../../Database/db.js";
import { comparePassword, hashPassword, createToken } from "../auth.js";


export const createEmployee = async (req, res) => {
  try {
    const employee = await prisma.employee.create({
      data: {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
      },
      select:{
        id:true,
        name: true,
        email: true,
      }
    });
    if (!employee) {
      throw new Error("Employee could not be created");
    }
    const token = createToken(employee);
    res.json(employee );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const createEmployer = async (req, res) => {
  try {
    const employer = await prisma.employer.create({
      data:  {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
      },
      select:{
        id:true,
        name: true,
        email: true,
      }
    });
    if (!employer) {
      throw new Error("Employer could not be created");
    }
    const token = createToken(employer);
    res.json(employer );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const signInEmployee = async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        email: req.body.email,
      },
      select:{
        id:true,
        name: true,
        email: true,
      }
    });

    // const isValid = await comparePassword(req.body.password, user.password);

    // if (!isValid) {
    //   throw new Error("Invalid Credentials");
    // }

    // const token = createToken(employee);
    res.json(employee );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const signInEmployer = async (req, res) => {
  try {
    const employer = await prisma.employer.findUnique({
      where: {
        email: req.body.email,
      },
      select:{
        id:true,
        name: true,
        email: true
      }
    });

    // const isValid = await comparePassword(req.body.password, user.password);

    // if (!isValid) {
    //   throw new Error("Invalid Credentials");
    // }

    // const token = createToken(employer);
    res.json(employer );
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

