import {Router} from 'express';
import {body} from 'express-validator';
import {prisma} from '../Database/db.js';


const router = Router();

router.post('/', async (req,res)=>{
    try{
        const bid = await prisma.bid.create({
            data:{
                name: req.body.name,
                description: req.body.description,
                belongToJob: req.body.belongToJob,
                belongToEmployee: req.body.employeeId,
            },
        })
        if(!bid){
            throw new Error('Bid could not be created')
        }

        res.json({message:'Bid created successfully'})
    }catch(e){
        res.status(500).json({message:e.message})
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const bids = await prisma.bid.findMany({
            where:{
                belongToJob: parseInt(req.params.id)
            },

        })
        if(!bids){
            throw new Error('Bids could not be fetched')
        }
        res.json(bids)

    }catch(e){
        res.status(500).json({message:e.message})
    }
})

router.get('/employee/:id', async(req,res)=>{
    try{
        const bids = await prisma.bid.findMany({
            where:{
                belongToEmployee: parseInt(req.params.id)
            }
        });

        if(!bids){
            throw new Error('Bids could not be fetched')
        }

        res.json(bids)

    }catch(e){
        res.status(500).json({message:e.message})
    }
})

export default router;