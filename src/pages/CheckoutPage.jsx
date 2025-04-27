import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet"; // ✅ Add this line

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful checkout
    alert("Checkout successful!");
    // Optionally, navigate to a confirmation page or clear the cart
    navigate("/order-confirmation"); // Redirect to confirmation page
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.priceOut * item.quantity,
    0
  );

  const goHome = () => {
    navigate("/"); // Navigate to home page
  };

  const goBackToCart = () => {
    navigate("/cart"); // Navigate to cart page
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Checkout your items and proceed to payment at Flex11. Review your order and choose your payment method."
        />
        <meta
          name="keywords"
          content="checkout, shopping cart, online payment, Flex11, payment method"
        />
        <meta name="author" content="Flex11" />
        <meta property="og:title" content="Checkout - Flex11" />
        <meta
          property="og:description"
          content="Proceed with checkout at Flex11, review your order, and select your payment method."
        />
        <meta property="og:image" content="/path/to/image.jpg" />
        <meta property="og:url" content="https://example.com/checkout" />
        <meta name="twitter:title" content="Checkout - Flex11" />
        <meta
          name="twitter:description"
          content="Proceed with checkout at Flex11, review your order, and select your payment method."
        />
        <meta name="twitter:image" content="/path/to/image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Checkout - Flex11</title>
        <link rel="canonical" href="https://example.com/checkout" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Cart Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>
          {cartItems.map((item) => (
            <div key={item.uuid} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>${(item.priceOut * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold py-2">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery Information */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={deliveryInfo.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={deliveryInfo.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <div>
              <label>
                <input
                  type="radio"
                  value="credit-card"
                  checked={paymentMethod === "credit-card"}
                  onChange={handlePaymentChange}
                />
                Credit Card
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={handlePaymentChange}
                />
                PayPal
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-[#C84A31] text-white hover:bg-blue-500"
          >
            Proceed to Payment
          </button>
        </form>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={goBackToCart}
            className="px-6 py-3 bg-gray-400 text-white hover:bg-gray-500"
          >
            ← Go Back to Cart
          </button>

          <button
            onClick={goHome}
            className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
