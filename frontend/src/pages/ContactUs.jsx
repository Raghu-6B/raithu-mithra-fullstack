import React from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  const linkStyle = {
    color: "#1b5e20",
    textDecoration: "underline",
    backgroundColor: "transparent",
    outline: "none",
    userSelect: "none", // prevents text selection highlight
    WebkitTapHighlightColor: "transparent", // removes mobile/Chrome tap highlight
    cursor: "pointer",
  };

  const handleLinkClick = (e) => {
    e.preventDefault(); // prevent yellow highlight
    e.target.blur(); // remove focus
    window.open(e.target.href, "_blank"); // open link in new tab
  };

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
        color: "#1b5e20",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center" }}
      >
        📬 Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{ fontSize: "18px", maxWidth: "600px", textAlign: "center" }}
      >
        Reach out to us via email, phone, or our social platforms.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{
          backgroundColor: "#ffffff",
          padding: "25px",
          borderRadius: "20px",
          width: "90%",
          maxWidth: "600px",
          boxShadow: "0 10px 25px rgba(0,100,0,0.15)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          fontSize: "16px",
          lineHeight: "1.6",
        }}
      >
        <p>
          📧 Email:{" "}
          <a
            href="mailto:support@raithumithra.com"
            style={linkStyle}
            onClick={(e) => handleLinkClick(e)}
          >
            support@raithumithra.com
          </a>
        </p>
        <p>
          📞 Phone:{" "}
          <a
            href="tel:+911234567890"
            style={linkStyle}
            onClick={(e) => handleLinkClick(e)}
          >
            +91 12345 67890
          </a>
        </p>
        <p>
          🌐 Instagram:{" "}
          <a
            href="https://instagram.com/raithumithra"
            style={linkStyle}
            onClick={(e) => handleLinkClick(e)}
          >
            @raithumithra
          </a>
        </p>
        <p>
          🌐 Facebook:{" "}
          <a
            href="https://facebook.com/raithumithra"
            style={linkStyle}
            onClick={(e) => handleLinkClick(e)}
          >
            /raithumithra
          </a>
        </p>
        <p>
          🌐 Twitter:{" "}
          <a
            href="https://twitter.com/raithumithra"
            style={linkStyle}
            onClick={(e) => handleLinkClick(e)}
          >
            @raithumithra
          </a>
        </p>
        <p>
          🌐 LinkedIn:{" "}
          <a
            href="https://linkedin.com/company/raithumithra"
            style={linkStyle}
            onClick={(e) => handleLinkClick(e)}
          >
            /company/raithumithra
          </a>
        </p>
      </motion.div>
    </div>
  );
}
