// backend/models/associations.js
import User from "./userModel.js";
import Product from "./productModel.js";
import Order from "./orderModel.js";
import OrderItem from "./OrderItem.js";
import Cart from "./cartModel.js";

// 🧩 User ↔ Orders
User.hasMany(Order, { foreignKey: "userId", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "userId" });

// 🧩 Order ↔ OrderItems
Order.hasMany(OrderItem, { foreignKey: "orderId", onDelete: "CASCADE" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

// 🧩 Product ↔ OrderItems
Product.hasMany(OrderItem, { foreignKey: "productId", onDelete: "CASCADE" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

// 🧩 User ↔ Cart ↔ Product
User.hasMany(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId" });
Product.hasMany(Cart, { foreignKey: "productId", onDelete: "CASCADE" });
Cart.belongsTo(Product, { foreignKey: "productId" });

export { User, Product, Order, OrderItem, Cart };
