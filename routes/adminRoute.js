import express from "express"
import { admincreate,  getAllAdmin,getAdminById, updateAdmin, deleteAdmin } from  '../Controller/adminController.js';




const router=express.Router();

router.post('/',admincreate)
router.get('/', getAllAdmin)
router.get('/:id',getAdminById)
router.put('/:id',updateAdmin)
router.delete('/:id',deleteAdmin)






export default router
