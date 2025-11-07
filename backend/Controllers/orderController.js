import Order from "../models/orderModel.js";
import OrderItem from "../models/OrderItem.js";
import Product from "../models/productModel.js";
import { sequelize } from "../config/db.js";

// 🧾 PLACE ORDER
export const placeOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { userId, items, totalAmount, paymentMethod, address, status } = req.body;

    if (!userId) return res.status(400).json({ message: "Missing userId" });
    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "No order items provided" });

    console.log("📦 Incoming Order Data:", req.body);

    // 🆕 Create new order
    const newOrder = await Order.create(
      {
        userId,
        totalAmount,
        paymentMethod,
        address,
        status: status || "Packing",
      },
      { transaction }
    );

    // 🧩 Map frontend item.id → backend productId
    const orderItemsData = items.map((item) => ({
      orderId: newOrder.id,
      productId: item.productId || item.id, // ✅ Fix: handle both cases
      quantity: item.quantity,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItemsData, { transaction });
    await transaction.commit();

    console.log("✅ Order placed successfully:", newOrder.id);

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
      items: orderItemsData,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Order placement error:", error);
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

// 📦 GET USER ORDERS
export const getOrders = async (req, res) => {
  try {
    const { userId } = req.params; // ✅ Fix: use params instead of query

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    console.log(`🔍 Fetching orders for userId: ${userId}`);

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: ["name", "price", "image"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(orders); // ✅ Flatten response for frontend
  } catch (error) {
    console.error("❌ Get orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};
