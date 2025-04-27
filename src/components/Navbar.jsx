import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  FaBars,
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { useGetAllProductsQuery } from "../store/apiSlice";
import { AuthContext } from "../context/AuthContext";

function App() {
  const [isMobileCountryDropdownOpen, setMobileCountryDropdownOpen] =
    useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isCountryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showMobileSuggestions, setShowMobileSuggestions] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "KH",
    name: "Cambodia",
  });
  const [allProducts, setAllProducts] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const userDropdownRef = useRef(null);
  const productsDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Fetch products using the RTK Query hook (for current page)
  const { data: currentPageData, isLoading } = useGetAllProductsQuery(0);

  // Fetch all products from all pages on component mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setIsLoadingSuggestions(true);
        // Get total pages from first request
        const firstPageResponse = await fetch(
          "https://ishop-api.istad.co/api/v1/products?page=0&size=12"
        );
        const firstPageData = await firstPageResponse.json();
        const totalPages = firstPageData.totalPages || 14;

        // Fetch all pages in parallel
        const requests = [];
        for (let i = 0; i < totalPages; i++) {
          requests.push(
            fetch(
              `https://ishop-api.istad.co/api/v1/products?page=${i}&size=12`
            )
          );
        }

        const responses = await Promise.all(requests);
        const dataPromises = responses.map((response) => response.json());
        const allPagesData = await Promise.all(dataPromises);

        // Combine all products from all pages
        const allProductsData = allPagesData.flatMap(
          (pageData) => pageData.content || []
        );
        setAllProducts(allProductsData);
      } catch (error) {
        console.error("Error fetching all products for search:", error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    fetchAllProducts();
  }, []);

  const countries = [
    { code: "KH", name: "Cambodia" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "JP", name: "Japan" },
    { code: "AU", name: "Australia" },
    { code: "CA", name: "Canada" },
    { code: "SG", name: "Singapore" },
    { code: "TH", name: "Thailand" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
  ];

  // Handle search suggestions from all products
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      setShowMobileSuggestions(false);
      return;
    }

    if (allProducts.length > 0) {
      // Search by product name or brand name
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.brand &&
            product.brand.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );

      // Sort results - exact matches first, then by name
      const sortedResults = filtered.sort((a, b) => {
        // Prioritize exact matches in product name
        const aExactNameMatch =
          a.name.toLowerCase() === searchQuery.toLowerCase();
        const bExactNameMatch =
          b.name.toLowerCase() === searchQuery.toLowerCase();

        if (aExactNameMatch && !bExactNameMatch) return -1;
        if (!aExactNameMatch && bExactNameMatch) return 1;

        // Prioritize exact matches in brand name
        const aExactBrandMatch =
          a.brand && a.brand.name.toLowerCase() === searchQuery.toLowerCase();
        const bExactBrandMatch =
          b.brand && b.brand.name.toLowerCase() === searchQuery.toLowerCase();

        if (aExactBrandMatch && !bExactBrandMatch) return -1;
        if (!aExactBrandMatch && bExactBrandMatch) return 1;

        // Sort by name if no exact matches
        return a.name.localeCompare(b.name);
      });

      setSuggestions(sortedResults.slice(0, 8)); // Show up to 8 suggestions
      setShowSuggestions(true);
      setShowMobileSuggestions(true);
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        productsDropdownRef.current &&
        !productsDropdownRef.current.contains(event.target)
      ) {
        setProductsDropdownOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setCountryDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setShowMobileSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setCountryDropdownOpen(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    setShowMobileSuggestions(false);
    // You can add navigation to product detail page here
    // history.push(`/product/${suggestion.uuid}`);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowSuggestions(true);
    }
  };

  const handleMobileSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowMobileSuggestions(true);
    }
  };
  const cartItemCount = useSelector(selectCartItemCount);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="App">
      {/* Annoucement Bar */}
      <div className="bg-gray-100 text-center py-2 text-sm">
        FREE SHIPPING ON ALL ORDERS OVER $75.00.{" "}
        <Link to="/login" className="underline">
          LEARN MORE!
        </Link>
      </div>

      {/* ================================================================================================================== */}

      <nav className="max-w-screen-7xl mx-auto px-6 py-4 flex items-center sticky top-0 z-50 bg-white">
        {/* Logo */}
        <div className="mr-6">
          <Link
            to="/"
            className="text-3xl font-semibold hover:text-[#C84A31] transition duration-300"
          >
            Flex11
          </Link>
        </div>

        {/* Country Selector */}
        <div className="relative hidden md:block mr-6" ref={countryDropdownRef}>
          <button
            className="flex items-center text-gray-800 hover:text-[#C84A31] transition duration-300"
            onClick={() => setCountryDropdownOpen(!isCountryDropdownOpen)}
          >
            <img
              src={`https://flagcdn.com/24x18/${selectedCountry.code.toLowerCase()}.png`}
              alt={selectedCountry.name}
              className="mr-2 h-4 w-5 object-cover"
            />
            <span className="text-sm">{selectedCountry.name}</span>
            <FaChevronDown className="ml-1 text-xs" />
          </button>

          {isCountryDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-md py-2 border border-gray-200 z-50 max-h-80 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country.code}
                  className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition duration-300"
                  onClick={() => selectCountry(country)}
                >
                  <img
                    src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
                    alt={country.name}
                    className="mr-2 h-4 w-5 object-cover"
                  />
                  <span className="text-sm">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 mr-5">
          <div>
            <Link
              to="/"
              className="text-gray-800 font-medium hover:text-[#C84A31] transition duration-300"
            >
              Home
            </Link>
          </div>
        </div>

        {/* Search Bar with Suggestions */}
        <div className="hidden md:block flex-1 mx-4 relative" ref={searchRef}>
          <div className="flex items-center border border-gray-300 hover:border-[#C84A31] hover:border-1 overflow-hidden">
            <select
              id="categorySelect"
              className="bg-gray-100 px-3 py-2 border border-gray hover:bg-[#C84A31] hover:text-white text-gray-600 text-sm md:text-base outline-none"
            >
              <option value="all">Products</option>
              <option value="electronics">Brands</option>
              <option value="clothing">Categories</option>
            </select>
            <input
              id="searchInput"
              type="text"
              className="px-3 py-2 w-full text-sm md:text-base outline-none"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              onFocus={() =>
                searchQuery.trim() !== "" && setShowSuggestions(true)
              }
            />
            <FaSearch className="text-gray-400 px-3" />
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && searchQuery.trim() !== "" && (
            <div className="absolute left-0 right-0 mt-1 bg-white shadow-md border border-gray-200 z-50 max-h-80 overflow-y-auto">
              {isLoadingSuggestions ? (
                <div className="p-3 text-gray-500 text-center">
                  Loading suggestions...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <div
                    key={product.uuid}
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    {product.thumbnail && (
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-10 h-10 object-cover mr-3"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/50";
                        }}
                      />
                    )}
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        <span className="mr-2">
                          $
                          {product.priceOut
                            ? product.priceOut.toFixed(2)
                            : "N/A"}
                        </span>
                        {product.brand && (
                          <span className="text-blue-500">
                            {product.brand.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-500 text-center">
                  No products found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="block md:hidden ml-auto mr-4">
          <button
            id="hamburgerBtn"
            className="text-gray-800 hover:text-[#C84A31] p-2"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars />
          </button>
        </div>

        {/* Icons for User and Cart */}
        <div className="flex items-center space-x-4 ml-auto md:ml-0">
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setUserDropdownOpen(!isUserDropdownOpen)}
              className="text-gray-800 hover:text-[#C84A31] transition duration-300 p-2"
            >
              <FaUser />
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md py-2 border border-gray-200 z-50">
                {!user ? (
                  <>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/admin/login"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                    >
                      Admin Login
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="block px-4 py-2 text-gray-700">
                      Welcome, {user?.username}
                    </span>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition duration-300"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="text-gray-800 hover:text-[#C84A31] transition duration-300 relative p-2"
          >
            <FaShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu (Initially Hidden) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4 border border-gray-200 z-50">
            {/* Country Selector in Mobile Menu */}
            <div className="px-4 py-2">
              <button
                className="flex items-center text-gray-800 hover:text-[#C84A31] transition duration-300"
                onClick={() =>
                  setMobileCountryDropdownOpen(!isMobileCountryDropdownOpen)
                }
              >
                <img
                  src={`https://flagcdn.com/24x18/${selectedCountry.code.toLowerCase()}.png`}
                  alt={selectedCountry.name}
                  className="mr-2 h-4 w-5 object-cover"
                />
                <span className="text-sm">{selectedCountry.name}</span>
                <FaChevronDown className="ml-1 text-xs" />
              </button>

              {isMobileCountryDropdownOpen && (
                <div className="mt-2 w-full bg-white py-2 border-t border-b border-gray-200 z-50 max-h-60 overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 transition duration-300"
                      onClick={() => {
                        selectCountry(country);
                        setMobileCountryDropdownOpen(false);
                      }}
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${country.code.toLowerCase()}.png`}
                        alt={country.name}
                        className="mr-2 h-4 w-5 object-cover"
                      />
                      <span className="text-sm">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
            >
              Home
            </Link>

            <div className="relative">
              <button
                className="block w-full px-4 py-2 text-left text-gray-800 font-medium hover:text-[#C84A31] transition duration-300"
                onClick={() => setProductsDropdownOpen(!isProductsDropdownOpen)}
              >
                Products
              </button>

              {isProductsDropdownOpen && (
                <div className="w-full bg-white py-2 border-t border-b border-gray-200 z-50">
                  <a
                    href="#"
                    className="block px-8 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                  >
                    Category
                  </a>
                  <a
                    href="#"
                    className="block px-8 py-2 text-gray-800 hover:bg-gray-100 transition duration-300"
                  >
                    Brand
                  </a>
                </div>
              )}
            </div>

            {/* Search Bar inside Mobile Menu with Suggestions */}
            <div className="relative px-4 mt-4" ref={mobileSearchRef}>
              <div className="flex items-center border border-gray-300 hover:border-[#C84A31] hover:border-1 overflow-hidden">
                <select className="bg-gray-100 px-3 py-2 border border-gray hover:bg-[#C84A31] hover:text-white text-gray-600 text-sm md:text-base outline-none">
                  <option value="all">Products</option>
                  <option value="electronics">Brands</option>
                  <option value="clothing">Categories</option>
                </select>
                <input
                  type="text"
                  className="px-3 py-2 w-full text-sm md:text-base outline-none"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleMobileSearchInputChange}
                  onFocus={() =>
                    searchQuery.trim() !== "" && setShowMobileSuggestions(true)
                  }
                />
                <FaSearch className="text-gray-400 px-3" />
              </div>

              {/* Mobile Search Suggestions Dropdown */}
              {showMobileSuggestions && searchQuery.trim() !== "" && (
                <div className="absolute left-4 right-4 mt-1 bg-white shadow-md border border-gray-200 z-50 max-h-60 overflow-y-auto">
                  {isLoadingSuggestions ? (
                    <div className="p-3 text-gray-500 text-center">
                      Loading suggestions...
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((product) => (
                      <div
                        key={product.uuid}
                        className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                        onClick={() => handleSuggestionClick(product)}
                      >
                        {product.thumbnail && (
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-10 h-10 object-cover mr-3"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/50";
                            }}
                          />
                        )}
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500">
                            <span className="mr-2">
                              $
                              {product.priceOut
                                ? product.priceOut.toFixed(2)
                                : "N/A"}
                            </span>
                            {product.brand && (
                              <span className="text-blue-500">
                                {product.brand.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500 text-center">
                      No products found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default App;
