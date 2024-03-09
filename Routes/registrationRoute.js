import express from "express";
import {
  LoginController,
  RegistrationController,
} from "../Controllers/authController.js";
const router = express.Router();

router.post("/registration", RegistrationController);
router.post("/login", LoginController);

export default router;
