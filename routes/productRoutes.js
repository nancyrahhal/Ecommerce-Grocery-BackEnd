import express from "express";
import upload from "../Middlewares/image-multer.js";
import {
  productCreate,
  productGet,
  productGetOne,
  productUpdate,
  productDelete,
  getProductsOfGrocery,
  getProductsOfGroceryByCategory,
} from "../Controllers/ProductsController.js";

const router = express.Router();

router.post("/products/", upload.single("image"), productCreate);

router.get("/products/", productGet);

router.get("/products/:id", productGetOne);

router.put("/products/:id", upload.single("image"), productUpdate);

router.delete("/products/:id", productDelete);

//For Grocery
router.get("/products/ofGrocery/:id", getProductsOfGrocery);
router.get("/products/ofGrocery/byCategory/:id", getProductsOfGroceryByCategory);


export default router;
