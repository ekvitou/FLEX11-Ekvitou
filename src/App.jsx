import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import RegisterPage from "./pages/RegisterPage";
import UserLoginPage from "./pages/UserLoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import ProductList from "./components/ProductList";
import ProductDetailPage from "./pages/ProductDetailPage";

// User Pages
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

// Admin Pages
import AdminDashboardPage from "./pages/AdminDashboardPage";

// Shared Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FreeShippingBanner from "./components/FreeShippingBanner";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import WeeklyHighlightSlider from "./components/WeeklyHighlightSlider";
import FloatingChatBox from "./components/FloatingChatBox";
import JustForYou from "./components/JustForYou";

// Protected Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Shared UI for all users */}
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FeaturesSection />
                <FreeShippingBanner />
                <WeeklyHighlightSlider />
                <ProductList />
              </>
            }
          />

          {/* Public Routes */}
          <Route path="/products/:uuid" element={<ProductDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected User Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          {/* Admin-Only Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboardPage />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
      
      {/* JustForYou section placed above footer */}
      <JustForYou />
      
      {/* Footer */}
      <Footer />
      
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Floating Chat Box */}
      <FloatingChatBox />
    </div>
  );
};

export default App;