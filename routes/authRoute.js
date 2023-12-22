import express from "express"
import { registerAdmin, registerUser ,login} from  '../Controller/authController.js';




const router=express.Router();

router.post('/',registerAdmin);
router.post('/user',registerUser);
router.post('/login',login);






export default router