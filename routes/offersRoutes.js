import express from 'express';
import  {offerscreate, offersget,offersgetone, offersupdate, offersdelete}  from '../Controller/Offerscontroller.js';


const router=express.Router();



router.post('/offers',offerscreate)
router.get('/offers',offersget)
router.get('/offers/:id',offersgetone)
router.patch('/offers/:id',offersupdate)
router.delete('/offers/:id',offersdelete)






export default router