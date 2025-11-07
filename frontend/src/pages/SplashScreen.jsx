import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to login after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background: "linear-gradient(to bottom right, #e8f5e9, #c8e6c9)",
      }}
    >
      {/* Animated Logo */}
      <motion.img
        src={logo}
        alt="Raithu Mithra"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          width: "600px",
          height: "250px",
          objectFit: "contain",
          marginBottom: "25px",
          borderRadius: "20px",
        }}
      />

      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-green-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        Raithu Mithra
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-green-700 mt-2 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      >
        Farm-to-store freshness 🌿
      </motion.p>
    </div>
  );
}
