import express from "express";

import {
  deleteUser,
  userUpdate,
  UserCreate,
  getAllUsers,
  getUserById,
} from "../Controllers/UsersController.js";


const router=express.Router();

router.delete("/users/:id", deleteUser);
router.put("/users/:id", userUpdate);


router.post("/users/", UserCreate);

router.get("/users/", getAllUsers);

router.get("/users/:id", getUserById);


export default router