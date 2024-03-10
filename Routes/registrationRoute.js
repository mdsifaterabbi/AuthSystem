import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import {
  LoginController,
  RegistrationController,
} from "../Controllers/authController.js";
const router = express.Router();

// ===========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create `uploaded_Images` directory if it doesn't exist
    fs.mkdirSync("uploaded_Images", { recursive: true });
    cb(null, "uploaded_Images");
  },
  filename: (req, file, cb) => {
    const originalName = path.parse(file.originalname).base;
    const timestamp = Date.now();
    const readableDate = new Date(timestamp).toLocaleString();
    const formattedDate = readableDate
      .replace(/\//g, "-") // Replace slashes with dashes
      .replace(/:/g, "-") // Replace colons with dashes
      .replace(/\s/g, ""); // Replace spaces with no space
    cb(null, originalName + "-" + formattedDate);
  },
});

const upload = multer({ storage });

// ===============================================

router.post(
  "/registration",
  upload.single("profile-photo"),
  RegistrationController
);
router.post("/login", LoginController);

export default router;
