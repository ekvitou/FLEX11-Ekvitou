import React from "react";

const FeaturesSection = () => {
  return (
    <section className="bg-gray-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {/* Feature 1 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Flat-rate Delivery</h4>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Support 24/7</h4>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 5.04A8.042 8.042 0 003 9c0 4.418 3.582 8 8 8h2c4.418 0 8-3.582 8-8 0-1.268-.342-2.467-.982-3.516z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Secure Payment</h4>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 9h4l-4 7h10l-4-7H8z"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">New Arrivals</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
