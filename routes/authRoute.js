import express from "express"
import { registerAdmin, registerUser ,login, google} from  '../Controller/authController.js';




const router=express.Router();

router.post('/',registerAdmin);
router.post('/user',registerUser);
router.post('/login',login);
router.post('/google',google);






export default router