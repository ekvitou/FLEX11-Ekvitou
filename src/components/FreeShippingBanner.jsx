import React from "react";

const FreeShippingBanner = () => {
  return (
    <div className="border-b border-gray-200 bg-gray-100">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center text-center">
        <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium uppercase">
          FREE SHIPPING ON ALL ORDERS OVER{" "}
          <span className="text-red-500">$75.00</span>
        </p>
        <button className="p-2 bg-[#C84A31] text-white mt-2 hover:text-black transition duration-300">
          <a href="/login">Unlock now!</a>
        </button>
      </div>
    </div>
  );
};

export default FreeShippingBanner;
