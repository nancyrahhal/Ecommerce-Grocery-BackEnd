import express from 'express';


const router=express.Router();

import {
  groceriesCreate,
  getAllGrocery,
  groceryUpdate,
  deleteGrocery,
  getGroceryById,
} from "../Controllers/GroceriesController.js";

router.post("/groceries/", groceriesCreate);

router.get("/groceries/", getAllGrocery);

router.get("/groceries/:id", getGroceryById);

router.put("/groceries/:id", groceryUpdate);

router.delete("/groceries/:id", deleteGrocery);

export default router;