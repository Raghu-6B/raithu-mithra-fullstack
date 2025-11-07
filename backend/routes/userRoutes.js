import express from "express";
import { registerUser, loginUser } from "../Controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Test route
router.get("/test", (req, res) => {
  res.send("✅ Backend is running properly!");
});

export default router;
