import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import os from "os"; // ✅ For detecting local IP
import { fileURLToPath } from "url";
import { connectDB, sequelize } from "./config/db.js";

// ✅ Load environment variables
dotenv.config();

// ✅ Express setup
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import farmerRoutes from "./routes/farmerRoutes.js";

// ✅ Import models (Sequelize initialization)
import "./models/userModel.js";
import "./models/productModel.js";
import "./models/orderModel.js";
import "./models/OrderItem.js";
import "./models/cartModel.js";
import "./models/farmerModel.js";
import "./models/crop.js";
import "./models/associations.js";

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/farmers", farmerRoutes);

// ✅ Serve React Frontend (Vite build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../frontend/dist"); // ✅ Correct path to Vite build folder

// Serve static files from frontend build
app.use(express.static(frontendPath));

// Catch-all route for React Router (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: false });
    console.log("✅ Database synced successfully");

    app.listen(PORT, "0.0.0.0", () => {
      // ✅ Detect your local IPv4 address
      const networkInterfaces = os.networkInterfaces();
      let localIP = "localhost";

      for (const iface of Object.values(networkInterfaces)) {
        for (const info of iface) {
          if (info.family === "IPv4" && !info.internal) {
            localIP = info.address;
            break;
          }
        }
      }

      console.log("\n🚀 Full app running at:");
      console.log(`   • Local:   http://localhost:${PORT}`);
      console.log(`   • Network: http://${localIP}:${PORT}`);
      console.log("📱 Open the Network link on your phone (same Wi-Fi).");
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
  }
};

startServer();
