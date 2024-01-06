import express from "express";
import {
  offersCreate,
  offersGet,
  offersGetOne,
  offersUpdate,
  offersDelete,
} from "../Controllers/OffersController.js";

const router = express.Router();

router.post("/offers/", offersCreate);

router.get("/offers/", offersGet);

router.get("/offers/:id", offersGetOne);

router.put("/offers/:id", offersUpdate);

router.delete("/offers/:id", offersDelete);

export default router;
