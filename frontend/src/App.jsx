import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import SplashScreen from "./pages/SplashScreen";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

import { CartProvider } from "./context/CartContext";

// 🔒 Protected Route Component
const ProtectedRoute = ({ element }) => {
  const user = localStorage.getItem("user");
  const isAuthenticated = !!user;

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-green-100">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* 🔒 Protected Routes */}
              <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
              <Route path="/products" element={<ProtectedRoute element={<ProductsPage />} />} />
              <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
              <Route path="/payment" element={<ProtectedRoute element={<Payment />} />} />
              <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/orders" element={<Orders />} />


              {/* Public Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}