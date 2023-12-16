import express from "express"
import { admincreate,  getAllAdmin,getAdminById, updateAdminById, deleteAdminById } from  '../Controller/adminController.js';




const router=express.Router();

router.post('/',admincreate)
router.get('/', getAllAdmin)
router.get('/:id',getAdminById)
router.put('/:id',updateAdminById)
router.delete('/:id',deleteAdminById)






export default router
