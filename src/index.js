import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import reviewRouter from '..//Routes/Review/review.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get('/',(req,res)=>{
  res.send("This is the main page")
})

app.use("/review", reviewRouter)

export const start = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
