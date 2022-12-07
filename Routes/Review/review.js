import { prisma } from "../Database/db.js";
import { Router } from "express";
import { body } from "express-validator";
import { handleErrors } from "../Middleware/handleErrors.js";
const router = Router();

router.post("/", body("review").isString(), handleErrors, async (req, res) => {
  try {
    const review = await prisma.review.create({
      data: {
        id: req.user.id,
        review: req.body.review,
      },
    });

    if (!review) {
      throw new Error("The review could not be sent");
    }

    res.json({ message: "Review sent successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await prisma.review.findMany();
    if (!reviews) {
      throw new Error("The reviews could not be fetched");
    }
    res.json({ reviews });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put('/', body("review").isString(), handleErrors,async(req,res)=>{
    try{
        const review = await prisma.review.update({
            where:{
                id: req.user.id
            },
            data:{
                review: req.body.review
            }
        })

    }catch(e){
        res.status(500).json({message: e.message})
    }
})
export default router;
