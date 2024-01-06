import express from "express"
import {
  registerAdmin,
  registerUser,
  login
} from "../Controllers/AuthController.js";




const router=express.Router();

router.post('/admin',registerAdmin);

router.post('/user',registerUser);

router.post('/login',login);

export default router