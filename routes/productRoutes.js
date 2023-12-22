import express from 'express';


const router=express.Router();
import {
  productCreate,
  productGet,
  productGetOne,
  productUpdate,
  productDelete,
} from "../Controller/productscontroller.js";
import upload from "../middlewares/image-multer.js";

router.post("/product", upload.single("image"), productCreate);
router.get("/product", productGet);
router.get("/product/:id", productGetOne);
router.patch("/product/:id", upload.single("image"), productUpdate);
router.delete("/product/:id", productDelete);

export default router
