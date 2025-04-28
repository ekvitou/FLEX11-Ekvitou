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
import Helmet from "react-helmet";

// New Verify Email Page
import VerifyEmailPage from "./pages/VerifyEmailPage"; // Import VerifyEmailPage

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <meta
          name="description"
          content="Explore the best deals on your favorite products with Flex11. Enjoy fast shipping, exclusive discounts, and a seamless shopping experience."
        />
        <meta
          name="keywords"
          content="e-commerce, online shopping, discounts, deals, Flex11, products, fashion, electronics"
        />
        <meta name="author" content="Flex11" />
        <meta
          property="og:title"
          content="Flex11 - Your Ultimate Shopping Destination"
        />
        <meta
          property="og:description"
          content="Explore the best deals on your favorite products with Flex11. Enjoy fast shipping, exclusive discounts, and a seamless shopping experience."
        />
        <meta property="og:image" content="/path/to/logo.jpg" />
        <meta property="og:url" content="https://flex11-ekvitou.vercel.app" />
        <meta
          name="twitter:title"
          content="Flex11 - Your Ultimate Shopping Destination"
        />
        <meta
          name="twitter:description"
          content="Explore the best deals on your favorite products with Flex11. Enjoy fast shipping, exclusive discounts, and a seamless shopping experience."
        />
        <meta name="twitter:image" content="/path/to/logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://flex11-ekvitou.vercel.app" />
        <title>Flex11 - Your Ultimate Shopping Destination</title>
      </Helmet>

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
          {/* New Route for Email Verification */}
          <Route path="/verify-email" element={<VerifyEmailPage />} />{" "}
          {/* New VerifyEmailPage route */}
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
