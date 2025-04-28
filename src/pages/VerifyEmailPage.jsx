import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmailPage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // email passed from RegisterPage

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !verificationCode) {
      toast.error("Missing email or verification code.");
      return;
    }

    try {
      const response = await fetch(
        `https://ishop-api.istad.co/api/v1/users/verify-email?token=${verificationCode}`, // Use token as query parameter
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }), // Only pass email in the body
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Email verified successfully! You can now login.");
        navigate("/login");
      } else {
        toast.error(data?.message || "Verification failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Please enter the verification code sent to your email.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full border border-gray-300 p-2"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#C84A31] text-white font-semibold hover:bg-[#D27D5D] transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
