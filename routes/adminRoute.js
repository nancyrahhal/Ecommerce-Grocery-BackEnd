import express from "express"
import { admincreate, adminget, adminupdate, admindelete } from  '../Controller/Admin.js';




const router=express.Router();

router.post('/',admincreate)
router.get('/',adminget)
router.put('/:id',adminupdate)
router.delete('/:id',admindelete)






export default router
