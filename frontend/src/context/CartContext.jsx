// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🧠 Load cart from backend or localStorage
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          setLoading(true);
          const res = await axios.get(`/api/cart`, { params: { userId: user.id } });
          setCart(res.data.items || []);
          localStorage.removeItem("guest_cart"); // clear guest cart after login
        } catch (error) {
          console.error("Error fetching backend cart:", error);
          setCart([]);
        } finally {
          setLoading(false);
        }
      } else {
        const localCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
        setCart(localCart);
      }
    };
    fetchCart();
  }, [user]);

  // 💾 Save guest cart to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guest_cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  // ➕ Add to Cart
  const addToCart = async (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    if (user) {
      try {
        await axios.post("/api/cart/add", {
          userId: user.id,
          productId: product.id,
          quantity: 1,
        });
      } catch (error) {
        console.error("Backend add error:", error);
      }
    }
  };

  // ➖ Remove from Cart
  const removeFromCart = async (product) => {
    setCart((prev) => {
      const updated = prev
        .map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
      return updated;
    });

    if (user) {
      try {
        await axios.post("/api/cart/remove", {
          userId: user.id,
          productId: product.id,
          quantity: 1,
        });
      } catch (error) {
        console.error("Backend remove error:", error);
      }
    }
  };

  // 🧹 Clear Cart
  const clearCart = async () => {
    setCart([]);
    if (user) {
      try {
        await axios.post("/api/cart/clear", { userId: user.id });
      } catch (error) {
        console.error("Backend clear error:", error);
      }
    } else {
      localStorage.removeItem("guest_cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, loading, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
