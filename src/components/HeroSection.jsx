import React from "react";

const HeroSection = () => {
  return (
    <section className="w-full relative">
      <div className="flex flex-wrap">
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 bg-rust p-8 md:p-16 flex flex-col justify-center min-h-[500px] relative overflow-hidden">
          {/* Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-64 h-64 rounded-full bg-rust-light opacity-20 -top-20 -left-20"></div>
            <div className="absolute w-48 h-48 rounded-full bg-rust-light opacity-20 bottom-10 right-10"></div>
            <div className="absolute w-32 h-32 rounded-full bg-rust-light opacity-20 top-40 right-20"></div>
          </div>

          <div className="relative z-10">
            <h2 className="font-dancing-script text-white text-3xl mb-4">
              be style
            </h2>
            <h1 className="text-white text-5xl md:text-6xl font-semibold mb-6 leading-tight">
              Enhancing your<br />inner beauty
            </h1>
            <a href="/register">
            <button className="bg-white text-gray-800 font-medium py-3 px-8 mt-4 hover:bg-gray-100 transition duration-300">
              SHOP NOW
            </button>
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 bg-peach">
          <img
            src="https://www.gonoise.com/cdn/shop/articles/1be32bc15c7d2543c3086951f4cb9e68.jpg?v=1655377865"
            alt="Model in green dress"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
