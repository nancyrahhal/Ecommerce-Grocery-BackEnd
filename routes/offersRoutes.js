import express from 'express';
import  {offersCreate, offersGet,offersGetOne, offersUpdate, offersDelete}  from '../Controller/Offerscontroller.js';


const router=express.Router();



router.post('/offers',offersCreate)
router.get('/offers',offersGet)
router.get('/offers/:id',offersGetOne)
router.patch('/offers/:id',offersUpdate)
router.delete('/offers/:id',offersDelete)






export default router