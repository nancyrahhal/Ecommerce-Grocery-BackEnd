import express from 'express';
import upload from "../middlewares/image-multer.js";


const router=express.Router();

import {
  groceriesCreate,
  getAllGrocery,
  groceryUpdate,
  deleteGrocery,
  getGroceryById,
} from "../Controllers/GroceriesController.js";

router.post("/groceries/", upload.single("storeImage"),groceriesCreate);

router.get("/groceries/", getAllGrocery);

router.get("/groceries/:id", getGroceryById);

router.put("/groceries/:id",upload.single("storeImage"), groceryUpdate);

router.delete("/groceries/:id", deleteGrocery);

export default router;