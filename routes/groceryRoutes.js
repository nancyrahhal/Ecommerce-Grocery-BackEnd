import express from 'express';


const router=express.Router();

import {
  groceriescreate,
  groceriesget,
  groceriesupdate,
  groceriesdelete,
  grocerygetone,
} from "../Controller/GroceryController.js" ;
import upload from "../middlewares/image-multer.js";

router.post("/", upload.single("StoreImage"), groceriescreate);
router.get("/", groceriesget);
router.get("/:storeName", grocerygetone);
router.patch(
  "/:id",
  upload.single("StoreImage"),
  groceriesupdate
);
router.delete("/:id", groceriesdelete);

export default router;