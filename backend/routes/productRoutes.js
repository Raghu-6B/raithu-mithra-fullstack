import express from "express";
import { getProducts, seedProducts } from "../Controllers/productController.js";

const router = express.Router();
router.get("/", getProducts);
router.post("/seed", seedProducts);

export default router;
