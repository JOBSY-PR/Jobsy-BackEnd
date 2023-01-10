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
                job: req.body.job,
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

router.delete('/:id', async (req,res)=>{
    try{
        const bid = await prisma.bid.delete({
            where:{
                id: parseInt(req.params.id)
            }
        })
        if(!bid){
            throw new Error('Bid could not be deleted')
        }

        res.json({message:'Bid deleted successfully'})
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

router.put('/select/:id', async(req,res)=>{
    try{
        const bidComplete = await prisma.bid.update({
            where: {
                id: parseInt(req.params.id)
            },
            data:{
                isClaimed: true,
            }
        })

        if(!bidComplete){
            throw new Error('Bid could not be completed')
        }
        res.json({message: "Bid has been selected"})
    }catch(e){
        res.status(500).json({message:e.message})
    }
})

export default router;