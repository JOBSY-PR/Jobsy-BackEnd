import { Router } from "express";
import { body } from "express-validator";
import { prisma } from "../Database/db.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    
    const job = await prisma.job.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        employer: req.body.employer,
        location: req.body.location,
        salary: req.body.salary,
        
      },
    });
    if (!job) {
      throw new Error("Job could not be created");
    }

    res.json({ message: "Job created successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();

    if (!jobs) {
      throw new Error("Jobs could not be fetched");
    }

    res.json(jobs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put('/:id', async(req,res)=>{
    try{
        const job = await prisma.job.update({
            where:{
                id: req.params.id
            },
            data:{
                title: req.body.title,
                description: req.body.description,
                employer: req.body.employer,
                location: req.body.location,
                salary: req.body.salary,
                imageUrl: req.body.imageUrl,
                isClaimed: req.body.isClaimed
            }
        })
    }catch(e){
        res.status(500).json({message:e.message})
    }
})

export default router