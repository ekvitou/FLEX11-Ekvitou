import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-screen-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <Link
              to="/"
              className="text-2xl font-semibold hover:text-[#C84A31] transition duration-300"
            >
              Flex11
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Your one-stop destination for quality products. We offer the best
              selection at competitive prices with excellent customer service.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-600 hover:text-[#C84A31] transition duration-300"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#C84A31] transition duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#C84A31] transition duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-[#C84A31] transition duration-300"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-[#C84A31] transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 hover:text-[#C84A31] transition duration-300"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-[#C84A31] transition duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-[#C84A31] transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-[#C84A31] transition duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-600 hover:text-[#C84A31] transition duration-300"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-600 hover:text-[#C84A31] transition duration-300"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-600 hover:text-[#C84A31] transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-[#C84A31] mt-1 mr-2" />
                <span className="text-gray-600">
                  123 Main Street, Phnom Penh, Cambodia
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-[#C84A31] mr-2" />
                <span className="text-gray-600">+855 12 345 678</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-[#C84A31] mr-2" />
                <span className="text-gray-600">support@flex11.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="font-semibold mb-4 text-center">
            Accepted Payment Methods
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white border border-gray-200 p-2 flex items-center justify-center w-16 h-10">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-5 object-contain"
              />
            </div>
            <div className="bg-white border border-gray-200 p-2 flex items-center justify-center w-16 h-10">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png"
                alt="Mastercard"
                className="h-6 object-contain"
              />
            </div>
            <div className="bg-white border border-gray-200 p-2 flex items-center justify-center w-16 h-10">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png"
                alt="PayPal"
                className="h-4 object-contain"
              />
            </div>
            <div className="bg-white border border-gray-200 p-2 flex items-center justify-center w-16 h-10">
              <img
                src="https://i.pinimg.com/736x/e2/33/f5/e233f5b0c5a358449398f202b03f063a.jpg"
                alt="ABA Bank"
                className="h-9 object-contain"
              />
            </div>
            <div className="bg-white border border-gray-200 p-2 flex items-center justify-center w-16 h-10">
              <img
                src="https://i.pinimg.com/474x/9f/a7/c3/9fa7c33a0cd4d96bfb30b7cf5fd6d3ab.jpg"
                alt="Wing Bank"
                className="h-9 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Flex11. All rights reserved.</p>
          <p className="mt-2">
            FREE SHIPPING ON ALL ORDERS OVER $75.00.{" "}
            <Link to="/login" className="underline hover:text-[#C84A31]">
              LEARN MORE!
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
