import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ✅ Import images
import onionImg from "../assets/onion.png";
import tomatoImg from "../assets/tomato.png";
import potatoImg from "../assets/potato.png";

const featuredProducts = [
  { id: 1, name: "Onion", price: 25, stock: 40, image: onionImg },
  { id: 2, name: "Tomato", price: 30, stock: 60, image: tomatoImg },
  { id: 3, name: "Potato", price: 35, stock: 50, image: potatoImg },
];

export default function Home() {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState([]);

  // ✅ Fetch farmers from backend (connected to DB)
  useEffect(() => {
    axios
      .get("/api/farmers") // 👈 backend + frontend are merged now, so no localhost:5000
      .then((res) => {
        console.log("✅ Farmers API response:", res.data);
        if (Array.isArray(res.data)) {
          setFarmers(res.data);
        } else if (res.data && Array.isArray(res.data.farmers)) {
          setFarmers(res.data.farmers);
        } else {
          console.warn("⚠️ Unexpected API response:", res.data);
          setFarmers([]); // prevent crashes
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching farmers:", err);
        setFarmers([]); // fallback
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9, #f1fff1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "70px",
        padding: "50px 20px",
        fontFamily: "'Poppins', sans-serif",
        color: "#1b5e20",
      }}
    >
      {/* 🌿 Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "90%",
          maxWidth: "800px",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "25px",
          padding: "50px 20px",
          boxShadow: "0 10px 25px rgba(0, 100, 0, 0.15)",
          textAlign: "center",
        }}
      >
        <motion.h1
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#1b5e20",
          }}
          whileHover={{
            scale: 1.05,
            textShadow: "0px 4px 10px rgba(46, 125, 50, 0.3)",
          }}
        >
          Welcome to Raithu Mithra 🌾
        </motion.h1>

        <p
          style={{
            fontSize: "18px",
            marginBottom: "35px",
            color: "#33691e",
          }}
        >
          Bringing farm-fresh vegetables directly to your home — naturally
          fresh, locally grown 🥬
        </p>

        <motion.button
          whileHover={{
            scale: 1.08,
            boxShadow: "0 6px 18px rgba(102,187,106,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/products")}
          style={{
            backgroundColor: "#66bb6a",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 28px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Explore Vegetables
        </motion.button>
      </motion.div>

      {/* 🎥 Live Farm Video */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          width: "90%",
          maxWidth: "1000px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1b5e20",
            marginBottom: "20px",
          }}
        >
          🌾 Live From Our Farms
        </h2>
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{
            border: "4px solid #81c784",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            width: "100%",
            height: "300px",
          }}
        >
          <iframe
            src="https://www.youtube.com/embed/m6sgG4WxRqM?si=gQkb0uG28rzKusgT"
            title="Live Farm Video"
            frameBorder="0"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
          ></iframe>
        </motion.div>
      </motion.section>

      {/* 🥗 Featured Vegetables */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          width: "90%",
          maxWidth: "1000px",
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "30px",
            color: "#1b5e20",
          }}
        >
          🥗 Featured Vegetables
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            justifyItems: "center",
          }}
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                textAlign: "center",
                width: "90%",
                maxWidth: "280px",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  height: "130px",
                  width: "130px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <h3
                style={{ fontSize: "22px", fontWeight: "600", color: "#2e7d32" }}
              >
                {product.name}
              </h3>
              <p
                style={{ fontSize: "16px", color: "#388e3c", marginTop: "4px" }}
              >
                ₹{product.price}
              </p>
              <p
                style={{ fontSize: "14px", color: "#558b2f", marginTop: "3px" }}
              >
                {product.stock > 0 ? "In Stock ✅" : "Out of Stock ❌"}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 👨‍🌾 Farmers List (From Database) */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "90%",
          maxWidth: "800px",
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: "20px",
          padding: "30px",
          marginTop: "40px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#1b5e20",
            marginBottom: "15px",
          }}
        >
          👨‍🌾 Farmers List
        </h2>

        {/* 🧠 Safe rendering check */}
        {Array.isArray(farmers) && farmers.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {farmers.map((f) => (
              <motion.li
                key={f.id || f._id || Math.random()}
                whileHover={{ scale: 1.05, x: 5 }}
                style={{
                  color: "#2e7d32",
                  fontSize: "18px",
                  marginBottom: "8px",
                  padding: "6px 10px",
                  borderBottom: "1px solid #c8e6c9",
                }}
              >
                {f.name || f.farmer_name || "Unnamed Farmer"}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#388e3c" }}>No farmers found.</p>
        )}
      </motion.section>
    </div>
  );
}
