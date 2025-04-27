// src/pages/AdminLoginPage.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Helmet from "react-helmet"; // ✅ Add this line

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://ishop-api.istad.co/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      const token = data.accessToken;
      const user = data.user;

      if (response.ok && token && user?.roles) {
        const roles = user.roles.map((role) =>
          typeof role === "string" ? role : role.name
        );

        if (roles.includes("ADMIN")) {
          login(token, user); // Save token + user info
          navigate("/admin/dashboard");
        } else {
          setError("Access denied. You are not an admin.");
        }
      } else {
        setError(data?.message || "Invalid admin credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Login to the admin dashboard to manage users and control the system."
        />
        <meta
          name="keywords"
          content="admin login, admin dashboard, user management, Flex11, admin access"
        />
        <meta name="author" content="Flex11" />
        <meta property="og:title" content="Admin Login - Flex11" />
        <meta
          property="og:description"
          content="Login to the admin dashboard to manage users and control the system."
        />
        <meta property="og:image" content="/path/to/admin-login-image.jpg" />
        <meta property="og:url" content="https://example.com/admin/login" />
        <meta name="twitter:title" content="Admin Login - Flex11" />
        <meta
          name="twitter:description"
          content="Login to the admin dashboard to manage users and control the system."
        />
        <meta name="twitter:image" content="/path/to/admin-login-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Admin Login - Flex11</title>
        <link rel="canonical" href="https://example.com/admin/login" />
      </Helmet>

      <div className="max-w-md mx-auto p-6 bg-white shadow">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-3 border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-3 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 hover:bg-blue-700"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminLoginPage;
