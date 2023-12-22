import express from "express";

import { deleteUser , userUpdate} from "../Controller/userController.js";


const router=express.Router();

router.delete("/:id", deleteUser)
router.put("/:id", userUpdate)



export default router