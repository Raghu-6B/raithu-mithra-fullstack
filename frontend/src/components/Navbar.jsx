import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/handshake-icon.png";
import { AuthContext } from "../context/AuthContext"; // 👈 import AuthContext

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // 👈 get user info from context

  // 🔄 Logo click handler — works only if user is logged in
  const handleLogoClick = () => {
    if (user) {
      // ✅ If user logged in, go to home
      navigate("/home");
      window.location.reload();
    } else {
      // ❌ If not logged in, go to login instead
      navigate("/login");
    }
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "12px 20px",
          backgroundColor: "#2d6a4f",
          color: "#f4d35e",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* 🌾 Logo + Title */}
        <div
          onClick={handleLogoClick}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <img
            src={logo}
            alt="Raithu Mithra Logo"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
              borderRadius: "50%",
              backgroundColor: "#f4d35e",
              padding: "4px",
            }}
          />
          <h1
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#f4d35e",
              letterSpacing: "0.5px",
              margin: 0,
            }}
          >
            Raithu Mithra
          </h1>
        </div>

        {/* 🔗 Navigation Links */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {[
            { to: "/home", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/cart", label: "Cart" },
            { to: "/orders", label: "Orders" },
            { to: "/profile", label: "Profile" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                padding: "6px 14px",
                backgroundColor: "#f4d35e",
                color: "#1b4332",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#e9c94d")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#f4d35e")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* 🌱 Spacer strip */}
      <div
        style={{
          height: "40px",
          backgroundColor: "#e6f4ea",
        }}
      ></div>
    </>
  );
}
