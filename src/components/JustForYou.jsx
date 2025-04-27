import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const JustForYou = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5; // Reduced number of slides for simplicity
  const slideInterval = useRef(null);

  // Content for slides
  const slides = [
    {
      title: "Earbud 3ES Pro",
      description: "Feel the beat lively",
      buttonText: "View more",
      bgImage:
        "https://img.freepik.com/free-photo/wireless-earbuds-with-neon-cyberpunk-style-lighting_23-2151074307.jpg",
    },
    {
      title: "Cyber 4F Setup",
      description: "World of Imagination",
      buttonText: "Shop now",
      bgImage:
        "https://img.freepik.com/free-photo/view-illuminated-neon-gaming-keyboard-setup-controller_23-2149529367.jpg?semt=ais_hybrid&w=740",
    },
    {
      title: "Logic EDrag Super",
      description: "Premium Expectation",
      buttonText: "Explore",
      bgImage:
        "https://img.freepik.com/premium-photo/gamer-work-space-concept-gaming-set-up-top-view-gaming-gear-keyboard-mouse-gamepad-joysti_1137878-7.jpg?semt=ais_hybrid&w=740",
    },
    {
      title: "Flex11 Set Up",
      description: "Classic and Modern",
      buttonText: "Discover",
      bgImage:
        "https://img.freepik.com/free-photo/top-view-smartphone-with-keyboard-charger_23-2149404177.jpg",
    },
    {
      title: "Xiaomi OLED 12GB RAM",
      description: "Everyone needs light weight phone",
      buttonText: "Learn more",
      bgImage:
        "https://img.freepik.com/free-vector/realistic-phones-different-views_52683-28436.jpg?semt=ais_hybrid&w=740",
    },
    {
      title: "Apple Suitable Gadgets",
      description: "Make your space smarter",
      buttonText: "Learn more",
      bgImage:
        "https://img.freepik.com/free-photo/modern-stationary-collection-arrangement_23-2149309652.jpg?semt=ais_hybrid&w=740",
    },
    {
      title: "Crazy Black Friday",
      description: "Create your comfortable move",
      buttonText: "Learn more",
      bgImage:
        "https://img.freepik.com/free-psd/black-friday-sale-social-media-banner-design-template_47987-24600.jpg?semt=ais_hybrid&w=740",
    },
  ];

  // Automatically advance slides
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  // Handle manual navigation
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
    // Reset interval timer when manually changing slides
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      }, 5000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Just for you</h2>

      {/* Slider container */}
      <div className="relative overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-48 md:h-64 relative"
              style={{
                backgroundImage: `url(${slide.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center">
                <div className="px-6 md:px-12 max-w-lg">
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-white text-sm md:text-base mb-4">
                    {slide.description}
                  </p>
                  <Link
                    to="/login"
                    className="bg-blue-500 hover:bg-[#C84A31] text-white py-1 md:py-2 px-4 md:px-6 text-sm flex items-center justify-center"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 transition-colors duration-300 ${
                currentSlide === index
                  ? "bg-white"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JustForYou;
