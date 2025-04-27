import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Helmet from "react-helmet"; // ✅ Add this line

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (uuid, newQty) => {
    if (newQty >= 1) {
      dispatch(updateQuantity({ uuid, quantity: newQty }));
    }
  };

  const handleRemoveItem = (uuid) => {
    dispatch(removeFromCart(uuid));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.priceOut * item.quantity,
    0
  );

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Review your cart at Flex11, adjust quantities, remove items, and proceed to checkout."
        />
        <meta
          name="keywords"
          content="cart, shopping, checkout, online store, Flex11, quantity adjustment, remove items"
        />
        <meta name="author" content="Flex11" />
        <meta property="og:title" content="Your Cart - Flex11" />
        <meta
          property="og:description"
          content="Review your cart at Flex11, adjust quantities, remove items, and proceed to checkout."
        />
        <meta property="og:image" content="/path/to/image.jpg" />
        <meta property="og:url" content="https://example.com/cart" />
        <meta name="twitter:title" content="Your Cart - Flex11" />
        <meta
          name="twitter:description"
          content="Review your cart at Flex11, adjust quantities, remove items, and proceed to checkout."
        />
        <meta name="twitter:image" content="/path/to/image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Your Cart - Flex11</title>
        <link rel="canonical" href="https://example.com/cart" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.uuid}
                className="flex flex-col sm:flex-row items-center justify-between border p-4 shadow-md"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-24 h-24 sm:w-20 sm:h-20 object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold sm:text-xl">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500 sm:text-base">
                      ${item.priceOut.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.uuid, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.uuid, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                  <p className="text-lg font-semibold text-red-500">
                    ${(item.priceOut * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.uuid)}
                    className="text-red-500 hover:text-red-600 text-sm sm:text-base"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-6">
              <p className="text-xl font-bold">
                Total: ${totalAmount.toFixed(2)}
              </p>

              <div className="flex justify-end gap-4 mt-4">
                {/* Continue Shopping Button */}
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 bg-[#C84A31] text-white hover:bg-blue-600 transition-all duration-300"
                >
                  ← Continue Shopping
                </button>

                {/* Proceed to Checkout Button */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
