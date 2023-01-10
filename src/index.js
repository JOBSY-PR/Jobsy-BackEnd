import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import reviewRouter from "..//Routes/Review/review.js";
import bidRouter from "..//Routes/Bid/bid.js";
import jobRouter from "../Routes/Job/job.js";
import { createEmployee,createEmployer,signInEmployee,signInEmployer} from "../Routes/Authentication/User/user.js";
import { protect } from "../Routes/Authentication/auth.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors(
  {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
  }
))

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.all("/", (req, res) => {
  res.send("This is the main page");
});

app.use("/review", reviewRouter);
app.use("/job", jobRouter);

app.use("/login/employee", signInEmployee);
app.use("/login/employer", signInEmployer);
app.use("/register/employee", createEmployee);
app.use("/register/employer", createEmployer);

app.use("/bid", bidRouter);

export const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
