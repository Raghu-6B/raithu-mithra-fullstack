import express from "express";
import { getFarmers, addFarmer } from "../Controllers/farmerController.js";

const router = express.Router();

router.get("/", getFarmers);   // GET request → fetch all farmers
router.post("/", addFarmer);   // POST request → add a new farmer

export default router;