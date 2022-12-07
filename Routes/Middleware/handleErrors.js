import body from "express-validator";

export const handleErrors = (req, res, next) => {
  const errors = body.validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
  } else {
    next();
  }
};
