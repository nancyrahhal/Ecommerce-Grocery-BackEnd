import express from "express";
import upload from "../Middlewares/image-multer.js";
import {
  categoryCreate,
  categoryGet,
  categoryUpdate,
  categoryDelete,
  categoryGetOne,
  getCategoriesOfGrocery,
} from "../Controllers/CategoriesController.js";

const router = express.Router();

router.post("/categories/", upload.single("image"), categoryCreate);

router.get("/categories/", categoryGet);

router.get("/categories/:id", categoryGetOne);

router.put("/categories/:id", upload.single("image"), categoryUpdate);

router.delete("/categories/:id", categoryDelete);



//For Grocery
router.get("/categories/ofGrocery/:id", getCategoriesOfGrocery);

export default router;
