import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ✅ Import product images
import tomatoImg from "../assets/tomato.png";
import potatoImg from "../assets/potato.png";
import onionImg from "../assets/onion.png";
import beansImg from "../assets/beans.png";
import beetrootImg from "../assets/beetroot.png";
import bittermelonImg from "../assets/bittermelon.png";
import bottlegourdImg from "../assets/bottlegourd.png";
import brinjalImg from "../assets/brinjal.png";
import broccoliImg from "../assets/broccoli.png";
import cabbageImg from "../assets/cabbage.png";
import capsicumImg from "../assets/capsicum.png";
import carrotImg from "../assets/carrot_image.png";
import cauliflowerImg from "../assets/cauliflower.png";
import cocoyamImg from "../assets/cocoyam.png";
import corianderImg from "../assets/coriander.png";
import cucumberImg from "../assets/cucumber.png";
import curryleavesImg from "../assets/curry-leaves.png";
import drumstickImg from "../assets/drumstick.png";
import greenchilliImg from "../assets/greenchilli.png";
import ladyfingerImg from "../assets/ladyfinger.png";
import methiImg from "../assets/methi.png";
import mintImg from "../assets/mint.png";
import mushroomImg from "../assets/mushroom.png";
import peasImg from "../assets/peas.png";
import radishImg from "../assets/radish.png";
import ridgegourdImg from "../assets/ridgeguord.png";
import smallbittergourdImg from "../assets/smallbitterguord.png";
import spinachImg from "../assets/spinach.png";
import springonionImg from "../assets/springonion.png";
import sweetpotatoImg from "../assets/sweetpotato.png";
import tindoraImg from "../assets/tindora.png";
import whiteonionImg from "../assets/whiteonion.png";
import yamImg from "../assets/yam.png";

// ✅ Map productId → image
const productImages = {
  1: tomatoImg, 2: potatoImg, 3: onionImg, 4: beansImg, 5: beetrootImg,
  6: bittermelonImg, 7: bottlegourdImg, 8: brinjalImg, 9: broccoliImg, 10: cabbageImg,
  11: capsicumImg, 12: carrotImg, 13: cauliflowerImg, 14: cocoyamImg, 15: corianderImg,
  16: cucumberImg, 17: curryleavesImg, 18: drumstickImg, 19: greenchilliImg, 20: ladyfingerImg,
  21: methiImg, 22: mintImg, 23: mushroomImg, 24: peasImg, 25: radishImg,
  26: ridgegourdImg, 27: smallbittergourdImg, 28: spinachImg, 29: springonionImg, 30: sweetpotatoImg,
  31: tindoraImg, 32: whiteonionImg, 33: yamImg
};

// ✅ Map productId → English + Telugu name
const productNames = {
  1: "Tomato (టమాటో)", 2: "Potato (బంగాళాదుంప)", 3: "Onion (ఈరుకాయ)", 4: "Beans (బీన్స్)", 5: "Beetroot (బీట్రూట్)",
  6: "Bittermelon (కర్ర)", 7: "Bottle Gourd (సొరకాయ)", 8: "Brinjal (వంకాయ)", 9: "Broccoli (బ్రోకోలి)", 10: "Cabbage (గోబీ)",
  11: "Capsicum (క్యాప్సికం)", 12: "Carrot (గాజర్)", 13: "Cauliflower (గోబీ)", 14: "Cocoyam (కొకోయం)", 15: "Coriander (కొత్తిమీర)",
  16: "Cucumber (సంకరకాయ)", 17: "Curry Leaves (కరివేపాకు)", 18: "Drumstick (మునగాయ)", 19: "Green Chilli (పచ్చిమిర్చి)", 20: "Lady Finger (బెండకాయ)",
  21: "Methi (మెంతులు)", 22: "Mint (పుదీనా)", 23: "Mushroom (కూదుప్పు)", 24: "Peas (పచ్చిపప్పు)", 25: "Radish (ముల్లంగి)",
  26: "Ridge Gourd (పొరెలకాయ)", 27: "Small Bitter Gourd (చిన్నకర్ర)", 28: "Spinach (కోస)", 29: "Spring Onion (వసంత ముల్లంగి)",
  30: "Sweet Potato (చీను గుడ్లు)", 31: "Tindora (తిండోర)", 32: "White Onion (తెల్లఈరుకాయ)", 33: "Yam (యాము)"
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setError("⚠️ Please login to view your orders.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/orders/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Order fetch failed:", err);
        setError("⚠️ Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ minHeight: "100vh", padding: "40px 20px", background: "linear-gradient(135deg, #eef7ee, #f7fff7)", fontFamily: "'Poppins', sans-serif" }}
    >
      <h2 style={{ textAlign: "center", fontSize: 28, color: "#1b5e20", marginBottom: 30, fontWeight: 700 }}>
        📦 My Orders
      </h2>

      {loading && <p style={{ textAlign: "center" }}>Loading orders...</p>}
      {error && <p style={{ textAlign: "center", color: "#d32f2f", fontWeight: 500, marginTop: 10 }}>{error}</p>}
      {!loading && !orders.length && !error && <p style={{ textAlign: "center", color: "#666", fontSize: 16, marginTop: 40 }}>🛍️ You haven’t placed any orders yet.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900, margin: "0 auto" }}>
        {orders.map((order) => (
          <motion.div key={order.id || order._id} whileHover={{ scale: 1.01 }} style={{ background: "#f0fdf4", borderRadius: 16, padding: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", marginBottom: 12 }}>
              <h3 style={{ color: "#1b5e20", margin: 0 }}>Order #{order.id || order._id}</h3>
              <span style={{
                background: order.status === "Delivered" ? "#c8e6c9" : order.status === "Packing" ? "#fff3cd" : "#ffcdd2",
                color: order.status === "Delivered" ? "#2e7d32" : order.status === "Packing" ? "#856404" : "#d32f2f",
                padding: "6px 14px", borderRadius: 8, fontWeight: 600
              }}>
                {order.status || "Processing"}
              </span>
            </div>

            {/* Order Details */}
            <p style={{ margin: "6px 0", color: "#444" }}><strong>Payment:</strong> {order.paymentMethod || "N/A"}</p>
            <p style={{ margin: "6px 0", color: "#444" }}><strong>Date:</strong> {order.created_at ? new Date(order.created_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : new Date().toLocaleString()}</p>
            <p style={{ margin: "6px 0", color: "#444" }}><strong>Total:</strong> ₹{(order.totalAmount || order.total_price || 0).toFixed(2)}</p>

            {/* Ordered Items Row-wise */}
            <div style={{ marginTop: 16 }}>
              <h4 style={{ color: "#1b5e20", marginBottom: 10 }}>🛒 Ordered Items:</h4>
              {(order.items || order.OrderItems || []).map((item) => (
                <motion.div key={item.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  backgroundColor: "#fff", borderRadius: 8, padding: "12px 16px", marginBottom: 10,
                  boxShadow: "0 3px 8px rgba(0,0,0,0.05)"
                }}>
                  <img src={productImages[item.id] || item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 8, marginRight: 16 }} />
                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontWeight: 600, color: "#2d6a4f" }}>{productNames[item.id] || item.name}</span>
                    <span style={{ display: "block", fontSize: 14, color: "#4e944f" }}>Quantity: {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: "#1b5e20", minWidth: 80, textAlign: "right" }}>₹{item.price * item.quantity}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
