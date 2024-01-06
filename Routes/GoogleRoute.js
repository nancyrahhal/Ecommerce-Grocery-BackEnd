import express from "express"
import {
  googleLogin,
  getUserDataOAUTH,
} from "../Controllers/AuthController.js";

const router = express.Router();

router.post("/request", googleLogin);

router.get("/oauth", getUserDataOAUTH);

export default router