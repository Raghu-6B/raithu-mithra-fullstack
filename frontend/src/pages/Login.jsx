import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css"; // ✅ Reuse Signup styling for consistency

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  // ✅ Handle login request
  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Both email and password are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        // ✅ Save user info locally
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // ✅ Optional: save token if backend sends it
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        // ✅ Redirect to Home page
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);

      // Backend message handling
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  // ✅ Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  }

  return (
    <div className={`signup-page ${fadeIn ? "fade-in" : ""}`}>
      {/* Left Side (same look as Signup) */}
      <div className="signup-left">
        <h1 className="app-title">Raithu Mithra</h1>
        <h2 className="subtitle">New Here?</h2>
        <p className="info-text">
          Create an account and start your journey with us.
        </p>
        <button className="signin-btn" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>

      {/* Right Side (login form) */}
      <div className="signup-right">
        <form className="signup-form" onSubmit={handleLogin}>
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-subtitle">Login to your account</p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Show backend or local errors */}
          {error && <div className="error">{error}</div>}

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="login-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </div>
        </form>
      </div>
    </div>
  );
}
