import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9, #f1fff1)",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        fontFamily: "'Poppins', sans-serif",
        color: "#1b5e20"
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center" }}
      >
        🌾 About Raithu Mithra
      </motion.h1>

      {/* Sections */}
      {[
        {
          title: "🌿 Our Mission",
          text: "To provide the freshest vegetables directly from local farmers to your table, supporting rural livelihoods and promoting sustainable agriculture."
        },
        {
          title: "🚜 Our Vision",
          text: "To build a community where healthy food, freshness, and farmer welfare go hand in hand, making farm-to-store produce accessible to everyone."
        },
        {
          title: "🤝 Our Values",
          text: "• Support small-scale farmers\n• Deliver peak freshness within hours of harvest\n• Promote sustainable farming practices\n• Build trust and quality for our customers"
        }
      ].map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
          style={{
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "20px",
            width: "90%",
            maxWidth: "600px",
            boxShadow: "0 10px 25px rgba(0,100,0,0.15)",
            textAlign: "left",
            lineHeight: "1.6"
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px" }}>
            {section.title}
          </h2>
          <p style={{ whiteSpace: "pre-line", fontSize: "16px" }}>{section.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
