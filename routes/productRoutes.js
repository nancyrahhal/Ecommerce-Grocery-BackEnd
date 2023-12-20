import express from 'express';


const router=express.Router();
import {
  productcreate,
  productget,
  productgetone,
  productupdate,
  productdelete,
} from "../Controller/productscontroller.js";
import upload from "../middlewares/image-multer.js";

router.post("/product", upload.single("image"), productcreate);
router.get("/product", productget);
router.get("/product/:id", productgetone);
router.patch("/product/:id", upload.single("image"), productupdate);
router.delete("/product/:id", productdelete);

export default router
