import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState(""); // ✅ show backend message

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  // ✅ Validate fields before sending to backend
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  // ✅ Signup Handler
  async function handleSignup(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setServerMessage("");

      // ✅ Backend API call
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setServerMessage("🎉 Registration successful!");
        // Save user data locally
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          })
        );
        // Redirect after delay
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setServerMessage("Unexpected server response. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setServerMessage(
        error.response?.data?.message ||
          "⚠️ Unable to register. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    setServerMessage("");
  }

  return (
    <div className={`signup-page ${fadeIn ? "fade-in" : ""}`}>
      {/* Left Side */}
      <div className="signup-left">
        <h1 className="app-title">Raithu Mithra</h1>
        <h2 className="subtitle">Welcome Back!</h2>
        <p className="info-text">
          To stay connected with us, please login with your personal info.
        </p>
        <button className="signin-btn" onClick={() => navigate("/login")}>
          Sign In
        </button>
      </div>

      {/* Right Side */}
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2 className="form-title">Welcome</h2>
          <p className="form-subtitle">Create your account to continue</p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}

          <div className="checkbox">
            <input type="checkbox" required />
            <label>
              I agree to the{" "}
              <span className="terms-text">Terms & Conditions</span>
            </label>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* ✅ Server message (success or error) */}
          {serverMessage && (
            <div
              className="server-message"
              style={{
                color: serverMessage.includes("🎉") ? "green" : "red",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              {serverMessage}
            </div>
          )}

          <div className="login-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
}
