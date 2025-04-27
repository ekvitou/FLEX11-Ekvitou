import React, { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const weeklyProducts = [
  {
    src: "https://img.freepik.com/free-psd/black-friday-product-sale-social-media-post-design-template_47987-24560.jpg",
    alt: "Product 1",
  },
  {
    src: "https://img.freepik.com/free-vector/smartwatch-front-side_23-2147498802.jpg?semt=ais_hybrid&w=740",
    alt: "Product 2",
  },
  {
    src: "https://img.freepik.com/premium-psd/samsung-galaxy-s23-set-mockup-floating_1332-55008.jpg",
    alt: "Product 3",
  },
  {
    src: "https://img.freepik.com/free-photo/still-life-books-versus-technology_23-2150062920.jpg?semt=ais_hybrid&w=740",
    alt: "Product 4",
  },
  {
    src: "https://img.freepik.com/free-photo/headphones-with-minimalist-monochrome-background_23-2150763312.jpg?semt=ais_hybrid&w=740",
    alt: "Product 5",
  },
  {
    src: "https://img.freepik.com/fotos-premium/lviv-ucrania-12-de-outubro-de-2022-jbl-flip-6-preto-alto-falante-bluetooth-portatil-ao-ar-livre_713163-2027.jpg",
    alt: "Product 6",
  },
  {
    src: "https://img.freepik.com/free-photo/wireless-earbuds-with-neon-cyberpunk-style-lighting_23-2151074308.jpg",
    alt: "Product 7",
  },
];

const WeeklyHighlightSlider = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;

        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Weekly Product Highlights</h2>

      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 z-10 hover:bg-gray-100 transition"
        >
          <FaChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto flex space-x-4 py-4 scrollbar-hide scroll-smooth"
        >
          {weeklyProducts.map((product, index) => (
            <img
              key={index}
              src={product.src}
              alt={product.alt}
              className="w-64 h-48 object-cover shadow-md flex-shrink-0"
            />
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 z-10 hover:bg-gray-100 transition"
        >
          <FaChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default WeeklyHighlightSlider;
