import express from 'express';


const router=express.Router();

import {
  groceriescreate,
  getAllGrocery,
  groceryUpdate ,
  deleteGrocery,
  getGroceryById,
} from "../Controller/GroceryController.js" ;

router.post("/", groceriescreate);
router.get("/", getAllGrocery);
router.get("/:id", getGroceryById);
router.patch("/:id",groceryUpdate );
router.delete("/:id", deleteGrocery);

export default router;