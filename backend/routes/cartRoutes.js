// backend/routes/cartRoutes.js
import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../Controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.post("/clear", clearCart);

export default router;
