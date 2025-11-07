// backend/controllers/cartController.js
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js"; // Optional if you have one

// 🛒 Get Cart Items
export const getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    const items = await Cart.findAll({ where: { userId } });
    res.json({ items });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Server error while fetching cart" });
  }
};

// ➕ Add to Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, productName, price } = req.body;
    if (!userId || !productId)
      return res.status(400).json({ message: "Missing required fields" });

    let cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      await Cart.create({ userId, productId, productName, price, quantity: quantity || 1 });
    }

    res.status(200).json({ message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error while adding to cart" });
  }
};

// ➖ Remove from Cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const item = await Cart.findOne({ where: { userId, productId } });

    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
    } else {
      await item.destroy();
    }

    res.status(200).json({ message: "Item removed successfully" });
  } catch (error) {
    console.error("Remove cart error:", error);
    res.status(500).json({ message: "Server error while removing item" });
  }
};

// 🧹 Clear Cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    await Cart.destroy({ where: { userId } });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error while clearing cart" });
  }
};
