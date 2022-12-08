import jsonWebToken from "jsonwebtoken";
import bcyrpt from "bcrypt";
import dotenv from 'dotenv'

dotenv.config()

export const hashPassword = async (password)=>{
    return await bcyrpt.hash(password, 5)
}

export const comparePassword = async({password, hash}) =>{
    return await bcyrpt.compare(password,hash)
}

export const createToken = (user) => {
  return jsonWebToken.sign({ user }, process.env.JWT_SECRET);
};

export const protect = async (req, res,next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const tokenArray = bearer.split(" ");
  const token = tokenArray[1];

  try {
    const user = jsonWebToken.verify(token, process.env.JWT_SECRET);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
