import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaCreditCard, FaQrcode } from "react-icons/fa";
import "../styles/Payment.css";
import { useCart } from "../context/CartContext"; // ✅ import context

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCart } = useCart(); // ✅ get setCart from context

  const selectedProducts = location.state?.selectedForPayment || [];

  const [cartItems, setCartItems] = useState(selectedProducts);
  const [grandTotal, setGrandTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length) {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setGrandTotal(total);
    }
  }, [cartItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
  };

  const handleConfirm = () => {
    const { name, phone, house, city, pincode } = address;
    if (!name || !phone || !house || !city || !pincode) {
      setErrorMsg("⚠️ Please fill in all required fields.");
      return;
    }
    if (!paymentMethod) {
      setErrorMsg("⚠️ Please select a payment method.");
      return;
    }
    setShowConfirm(true);
  };

  const handlePayment = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;

    if (!userId) {
      setErrorMsg("⚠️ Please login before placing an order.");
      return;
    }

    if (!cartItems.length) {
      setErrorMsg("🛒 Your cart is empty.");
      return;
    }

    const orderData = {
      userId,
      items: cartItems,
      totalAmount: grandTotal,
      paymentMethod,
      address,
      status: "Packing",
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      // ✅ Clear cart after successful payment
      setCart([]);
      setShowConfirm(false);

      if (data.orderId) {
        navigate(`/orders/${data.orderId}`);
      } else {
        navigate("/orders");
      }
    } catch (err) {
      console.error("Order save failed:", err);
      setErrorMsg("⚠️ Failed to save order. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const PaymentOption = ({ method, icon }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => setPaymentMethod(method)}
      className={`payment-option ${paymentMethod === method ? "active" : ""}`}
    >
      <div className="circle" />
      <div className="method">
        {icon}
        <span>{method}</span>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="payment-container"
    >
      <div className="payment-card">
        <h2>🏠 Delivery Details</h2>

        <div className="grid">
          {["name", "phone", "house", "street", "city", "pincode"].map((key) => (
            <div className="field" key={key}>
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                name={key}
                value={address[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}
        </div>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <h2>💳 Select Payment Method</h2>
        <div className="methods">
          <PaymentOption
            method="UPI / QR"
            icon={<FaQrcode size={28} color="#2e7d32" />}
          />
          <PaymentOption
            method="Card"
            icon={<FaCreditCard size={28} color="#2e7d32" />}
          />
          <PaymentOption
            method="Cash on Delivery"
            icon={<FaMoneyBillWave size={28} color="#2e7d32" />}
          />
        </div>

        <div className="summary">
          <h3>🧾 Grand Total: ₹{grandTotal.toFixed(2)}</h3>
          <label>🚚 Delivery Option:</label>
          <select>
            <option>Standard (₹0)</option>
            <option>Fast (₹49)</option>
            <option>Express (₹99)</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleConfirm}
          className="confirm-btn"
        >
          {loading ? "Processing..." : "Confirm Details"}
        </motion.button>

        {showConfirm && (
          <div className="overlay">
            <div className="confirm-box">
              <h3>Confirm Order</h3>
              <p>
                <strong>Name:</strong> {address.name}
              </p>
              <p>
                <strong>Total:</strong> ₹{grandTotal.toFixed(2)}
              </p>
              <p>
                <strong>Payment:</strong> {paymentMethod}
              </p>
              <div className="actions">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="pay-btn"
                >
                  {loading ? "Saving..." : "Confirm & Pay"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
