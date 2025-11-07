import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa"; // Back icon

export default function Cart() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [selectedItems, setSelectedItems] = useState(
    cart.map((item) => ({ id: item.id, selected: true }))
  );

  // Toggle selection
  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  // Delete product
  const deleteItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((sel) => sel.id !== id));
  };

  // Calculate Total
  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      const sel = selectedItems.find((s) => s.id === item.id && s.selected);
      return sel ? acc + item.price * item.quantity : acc;
    }, 0);
  }, [cart, selectedItems]);

  // Sort selected first
  const sortedCart = useMemo(() => {
    const selected = cart.filter((item) =>
      selectedItems.some((s) => s.id === item.id && s.selected)
    );
    const unselected = cart.filter(
      (item) => !selectedItems.some((s) => s.id === item.id && s.selected)
    );
    return [...selected, ...unselected];
  }, [cart, selectedItems]);

  // Proceed to payment
  const placeOrder = () => {
    const selectedForPayment = cart.filter((item) =>
      selectedItems.some((s) => s.id === item.id && s.selected)
    );
    if (!selectedForPayment.length) {
      alert("Please select at least one product to pay for!");
      return;
    }

    // ✅ Remove selected items from cart before navigating
    setCart(cart.filter(item => !selectedForPayment.includes(item)));

    navigate("/payment", { state: { selectedForPayment } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        padding: "20px",
        backgroundColor: "#e6f4ea",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Back Button */}
      <div
        style={{
          alignSelf: "flex-start",
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={() => navigate("/products")}
      >
        <FaArrowLeft size={22} color="#2d6a4f" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          color: "#2d6a4f",
          marginBottom: "25px",
        }}
      >
        🛒 Your Cart
      </motion.h1>

      {!cart.length ? (
        <p style={{ textAlign: "center", color: "#2d6a4f" }}>
          Your cart is empty.{" "}
          <span
            style={{
              color: "orange",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/products")}
          >
            Add products
          </span>
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            maxWidth: "650px",
            width: "100%",
            backgroundColor: "#f0fdf4",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          }}
        >
          {sortedCart.map((item) => {
            const isSelected =
              selectedItems.find((s) => s.id === item.id)?.selected ?? true;
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: isSelected ? "white" : "#f5f5f5",
                  padding: "14px 18px",
                  marginBottom: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
                  opacity: isSelected ? 1 : 0.6,
                  transition: "0.3s ease",
                }}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelection(item.id)}
                  style={{
                    transform: "scale(1.3)",
                    cursor: "pointer",
                    marginRight: "16px",
                  }}
                />

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "15px",
                  }}
                />

                {/* Product Info */}
                <div style={{ flexGrow: 1 }}>
                  <span
                    style={{
                      display: "block",
                      fontWeight: "600",
                      color: "#2d6a4f",
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "14px",
                      color: "#4e944f",
                      marginTop: "2px",
                    }}
                  >
                    {item.grams || "500 g"}
                  </span>
                </div>

                {/* Quantity Selector with -/+ buttons */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginRight: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#FFD60A",
                      color: "#2d6a4f",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      minWidth: "25px",
                      textAlign: "center",
                      fontWeight: 600,
                      color: "#2d6a4f",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#FFD60A",
                      color: "#2d6a4f",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <span
                  style={{
                    marginLeft: "12px",
                    fontWeight: "600",
                    color: "#1b5e20",
                    minWidth: "80px",
                    textAlign: "right",
                  }}
                >
                  ₹{item.price * item.quantity}
                </span>

                {/* Delete */}
                <button
                  onClick={() => deleteItem(item.id)}
                  style={{
                    color: "red",
                    marginLeft: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  ✕
                </button>
              </motion.div>
            );
          })}

          {/* Grand Total */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              marginTop: "15px",
              fontWeight: "bold",
              textAlign: "right",
              padding: "12px",
              backgroundColor: "#d9f0d9",
              borderRadius: "8px",
              fontSize: "18px",
              color: "#1b5e20",
            }}
          >
            Grand Total (Selected): ₹{totalPrice}
          </motion.div>

          {/* Proceed Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={placeOrder}
            style={{
              marginTop: "18px",
              backgroundColor: "#2d6a4f",
              color: "#FFD60A",
              padding: "14px 28px",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold",
              fontSize: "16px",
              border: "none",
            }}
          >
            Proceed to Pay Selected Items
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
