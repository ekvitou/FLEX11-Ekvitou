import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Helmet from "react-helmet";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: {}, // Optional address
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, phoneNumber, password, confirmPassword } =
      formData;

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    const payload = {
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
      address: {},
    };

    try {
      const response = await fetch(
        "https://ishop-api.istad.co/api/v1/users/user-signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful!");
        // Redirect to email verification page after successful registration
        navigate("/verify-email", { state: { email } });
      } else {
        setError(data?.message || "Registration failed.");
        toast.error(data?.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Create a new account on Flex11. Join now and enjoy a seamless shopping experience!"
        />
        <meta
          name="keywords"
          content="register, user registration, fast-delivery, online shopping, e-commerce, sign up"
        />
        <meta name="author" content="Flex11" />
        <meta property="og:title" content="Register - Flex11" />
        <meta
          property="og:description"
          content="Join Flex11 today! Create an account to shop exclusive products and enjoy special offers."
        />
        <meta
          property="og:image"
          content="https://flex11-ekvitou.vercel.app/images/register-banner.jpg"
        />
        <meta
          property="og:url"
          content="https://flex11-ekvitou.vercel.app/register"
        />
        <meta name="twitter:title" content="Register - Flex11" />
        <meta
          name="twitter:description"
          content="Create your Flex11 account to enjoy a personalized shopping experience with exclusive deals."
        />
        <meta
          name="twitter:image"
          content="https://flex11-ekvitou.vercel.app/images/register-banner.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Register - Flex11</title>
        <link
          rel="canonical"
          href="https://flex11-ekvitou.vercel.app/register"
        />
      </Helmet>

      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full border border-gray-300 p-2"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 p-2"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="w-full border border-gray-300 p-2 "
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-300 p-2"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border border-gray-300 p-2"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#C84A31] text-white font-semibold hover:bg-[#D27D5D] transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
