import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaArrowLeft,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const savedUser = localStorage.getItem("user");
  const [userData, setUserData] = useState(
    savedUser
      ? JSON.parse(savedUser)
      : { name: "New User", email: "user@example.com", phone: "+91 90000 00000" }
  );

  const [isEditing, setIsEditing] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 6px 18px rgba(102,187,106,0.6)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9, #f1fff1)",
        padding: "50px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        fontFamily: "'Poppins', sans-serif",
        color: "#1b5e20",
      }}
    >
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: fadeIn ? 1 : 0, y: fadeIn ? 0 : -30 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: "#ffffff",
          padding: "35px",
          borderRadius: "20px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 10px 25px rgba(0,100,0,0.15)",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => navigate("/home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "transparent",
            border: "none",
            color: "#1b5e20",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          <FaArrowLeft /> Back
        </button>

        <FaUser style={{ fontSize: "60px", marginBottom: "10px", color: "#1b5e20" }} />
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ fontSize: "28px", fontWeight: "600" }}
        >
          {userData.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontSize: "16px", color: "#388e3c" }}
        >
          Your personal information
        </motion.p>

        {/* Profile Info Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
          {["name", "email", "phone"].map((field, i) => (
            <motion.div
              key={field}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fieldVariants}
            >
              <label
                style={{
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {field === "name" ? <FaUser /> : field === "email" ? <FaEnvelope /> : <FaPhone />}
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                name={field}
                value={userData[field]}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "5px",
                  borderRadius: "10px",
                  border: "1px solid #a4d6a3",
                  fontSize: "16px",
                  outline: "none",
                  backgroundColor: isEditing ? "#e8fbe8" : "#f1f8f2",
                  transition: "0.3s",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            marginTop: "25px",
            flexWrap: "wrap",
          }}
        >
          {!isEditing ? (
            <motion.button whileHover={buttonHover} onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: "#1b5e20",
                color: "#fff",
                borderRadius: "12px",
                padding: "10px 22px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              <FaEdit /> Edit Profile
            </motion.button>
          ) : (
            <motion.button whileHover={buttonHover} onClick={handleSave}
              style={{
                backgroundColor: "#1b5e20",
                color: "#fff",
                borderRadius: "12px",
                padding: "10px 22px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              <FaSave /> Save Changes
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 6px 18px rgba(211,47,47,0.6)" }}
            onClick={handleLogout}
            style={{
              backgroundColor: "#d32f2f",
              color: "#fff",
              borderRadius: "12px",
              padding: "10px 22px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </motion.div>
      </motion.div>

      {/* About / Contact Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
      >
        <motion.button
          whileHover={buttonHover}
          onClick={() => setActiveSection("about")}
          style={{
            padding: "12px 28px",
            backgroundColor: activeSection === "about" ? "#66bb6a" : "#81c784",
            color: "#fff",
            borderRadius: "12px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          About Us
        </motion.button>
        <motion.button
          whileHover={buttonHover}
          onClick={() => setActiveSection("contact")}
          style={{
            padding: "12px 28px",
            backgroundColor: activeSection === "contact" ? "#66bb6a" : "#81c784",
            color: "#fff",
            borderRadius: "12px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Contact Us
        </motion.button>
      </motion.div>

      {/* Dynamic Section */}
      {activeSection === "about" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: "90%",
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,100,0,0.15)",
            lineHeight: "1.6",
            textAlign: "left",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px" }}>
            🌿 Our Mission
          </h2>
          <p>
            To provide the freshest vegetables directly from local farmers to your table, supporting rural livelihoods and promoting sustainable agriculture.
          </p>

          <h2 style={{ fontSize: "22px", fontWeight: "600", margin: "20px 0 10px 0" }}>
            🚜 Our Vision
          </h2>
          <p>
            To build a community where healthy food, freshness, and farmer welfare go hand in hand, making farm-to-store produce accessible to everyone.
          </p>

          <h2 style={{ fontSize: "22px", fontWeight: "600", margin: "20px 0 10px 0" }}>
            🤝 Our Values
          </h2>
          <ul>
            <li>Support small-scale farmers</li>
            <li>Deliver peak freshness within hours of harvest</li>
            <li>Promote sustainable farming practices</li>
            <li>Build trust and quality for our customers</li>
          </ul>
        </motion.div>
      )}

      {activeSection === "contact" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: "90%",
            maxWidth: "600px",
            backgroundColor: "#ffffff",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 25px rgba(0,100,0,0.15)",
            lineHeight: "1.6",
            textAlign: "left",
          }}
        >
          {/* Override all link states to prevent yellow */}
          <style>
            {`
              .contact-link,
              .contact-link:visited,
              .contact-link:hover,
              .contact-link:active {
                color: #1b5e20 !important;
                text-decoration: underline !important;
              }
            `}
          </style>

          <p>📧 Email: <a href="mailto:support@raithumithra.com" className="contact-link">support@raithumithra.com</a></p>
          <p>📞 Phone: <a href="tel:+911234567890" className="contact-link">+91 12345 67890</a></p>
          <p>🌐 Instagram: <a href="https://instagram.com/raithumithra" target="_blank" rel="noreferrer" className="contact-link">@raithumithra</a></p>
          <p>🌐 Facebook: <a href="https://facebook.com/raithumithra" target="_blank" rel="noreferrer" className="contact-link">/raithumithra</a></p>
          <p>🌐 Twitter: <a href="https://twitter.com/raithumithra" target="_blank" rel="noreferrer" className="contact-link">@raithumithra</a></p>
          <p>🌐 LinkedIn: <a href="https://linkedin.com/company/raithumithra" target="_blank" rel="noreferrer" className="contact-link">/company/raithumithra</a></p>
        </motion.div>
      )}
    </div>
  );
}
