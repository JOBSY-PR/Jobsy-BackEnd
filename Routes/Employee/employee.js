import {Router} from 'express'
import {body} from 'express-validator'
import { prisma } from '../Database/db.js';

const router = Router();

router.post('/', async(req,res)=>{
    try{
        const employee = await prisma.employee.create({
            data:{
                firstName: req.body.firstName,
                lastname: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
        });

        if(!employee){
            throw new Error("Emoployee could not be created")
        }

        res.json("Employee created successfully")
    }catch(e){
        res.status(500).json({message:e.message})
    }
})

router.get("/", async(req,res)=>{
    try{
        const employee = await prisma.employee.findMany();

        if(!employee){
            throw new Error("Employees not found")
        }

        res.json(employee)

    }catch(e){
        res.status(500).json({message:e.message})
    }
})

export default router;