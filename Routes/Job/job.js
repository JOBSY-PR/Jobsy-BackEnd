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
        employerId: req.body.employerId,
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
                id: parseInt(req.params.id)
            },
            data:{
                title: req.body.title,
                description: req.body.description,
                location: req.body.location,
                salary: req.body.salary,
            }
        })
        if(!job){
          throw new Error("Job could not be updated")
        }
        res.json({message: "Job updated successfully"})
    }catch(e){
        res.status(500).json({message:e.message})
    }
})

router.delete('/:id', async(req,res)=>{
  try{
      const job = await prisma.job.delete({
          where:{
              id: parseInt(req.params.id)
          },
          
      })
      if(!job){
        throw new Error("Job could not be deleted")
      }
      res.json({message: "Job deleted successfully"})
  }catch(e){
      res.status(500).json({message:e.message})
  }
})

router.delete('/status/:id', async(req,res)=>{
  try{
      const job = await prisma.job.delete({
          where:{
              id: parseInt(req.params.id)
          },
      })
  }catch(e){
      res.status(500).json({message:e.message})
  }
})

router.put('/:id', async(req,res)=>{
  try{
      const job = await prisma.job.update({
          where:{
              id: parseInt(req.params.id)
          },
          data:{
              status: "TAKEN"
          }
      })
      if(!job){
        throw new Error("Job not updated")
      }
      res.json({message:"Job updated successfully"})
  }catch(e){
      res.status(500).json({message:e.message})
  }
})

router.get('/employer/:id', async(req, res)=>{
  try{
    const jobs = await prisma.job.findMany({
      where:{
        employerId: parseInt(req.params.id)
      }
    });

    if(!jobs){
       throw new Error("Jobs could not be fetched")
    }

    res.json(jobs)

  }catch(e){
    res.status(500).json({message:e.message})
  }
})
export default router