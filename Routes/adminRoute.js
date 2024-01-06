import express from "express";
import {
  adminCreate,
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "../Controllers/AdminsController.js";

const router = express.Router();

router.post("/admins/", adminCreate);

router.get("/admins/", getAllAdmin);

router.get("/admins/:id", getAdminById);

router.put("/admins/:id", updateAdmin);

router.delete("/admins/:id", deleteAdmin);

export default router;
