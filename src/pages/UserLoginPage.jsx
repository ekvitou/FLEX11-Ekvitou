import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Helmet from "react-helmet";

const UserLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
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
      console.log("Login Response:", data);

      if (response.ok && data?.accessToken) {
        const userRoles = data.user?.roles?.map((role) => role.name) || [];

        if (userRoles.includes("ADMIN")) {
          const adminMsg = "Admins must log in through the admin page.";
          setError(adminMsg);
          toast.error(adminMsg);
          navigate("/"); // Navigate to home even if admin tries here
          return;
        }

        login(data.accessToken);
        toast.success("Login successful!");
        navigate("/");
      } else {
        const errorMsg =
          data?.message || data?.error || "Invalid email or password";
        setError(errorMsg);
        toast.error(errorMsg);
        navigate("/"); // Navigate to home even if login fails
      }
    } catch (err) {
      console.error(err);
      const catchMsg = "An error occurred. Please try again.";
      setError(catchMsg);
      toast.error(catchMsg);
      navigate("/"); // Navigate to home on network/server error too
    }
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Login to your account and enjoy a seamless shopping experience. Secure and fast login for users."
        />
        <meta
          name="keywords"
          content="user login, secure login, shopping, online store, authentication, e-commerce"
        />
        <meta name="author" content="Flex11" />
        <meta property="og:title" content="User Login - Flex11" />
        <meta
          property="og:description"
          content="Login to access your personalized shopping experience on Flex11. Enjoy easy access to products and offers."
        />
        <meta
          property="og:image"
          content="https://example.com/images/login-banner.jpg"
        />
        <meta property="og:url" content="https://example.com/login" />
        <meta name="twitter:title" content="User Login - Flex11" />
        <meta
          name="twitter:description"
          content="Login to your Flex11 account for a smooth shopping journey with exclusive offers and products."
        />
        <meta
          name="twitter:image"
          content="https://example.com/images/login-banner.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <title>User Login - Flex11</title>
        <link rel="canonical" href="https://example.com/login" />
      </Helmet>

      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">User Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <div className="flex items-center border border-gray-300 p-2">
                <FaEnvelope className="text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-2 outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="flex items-center border border-gray-300 p-2">
                <FaLock className="text-gray-400" />
                <input
                  type="password"
                  className="w-full pl-2 outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#C84A31] text-white font-semibold shadow-md hover:bg-[#D27D5D] transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLoginPage;
