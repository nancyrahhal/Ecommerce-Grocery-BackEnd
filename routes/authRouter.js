import express from 'express';

const router = express.Router;

import {registerAdmin, registerUser, loginAdmin, loginUser    } from "../Controller/authController.js"



router.post('/registeradmin',registerAdmin);
router.post('/loginadmin', loginAdmin);

router.post('/registeruser',registerUser);
router.post('/loginuser', loginUser);