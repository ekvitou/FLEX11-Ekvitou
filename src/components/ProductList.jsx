// 1
import React, { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../store/productApiSlice";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const ProductList = () => {
  const [page, setPage] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [allBrands, setAllBrands] = useState([]); // Store all unique brands
  const [brandProducts, setBrandProducts] = useState([]); // Store products for selected brand
  const [isFilterLoading, setIsFilterLoading] = useState(false); // Track filter loading state
  const [brandCounts, setBrandCounts] = useState({}); // Track number of products per brand

  // Query current page products
  const { data, error, isLoading } = useGetAllProductsQuery(page);

  // Track if we're viewing all products or filtered by brand
  const isFiltered = !!selectedBrand;

  // Collect all unique brands from the current page
  useEffect(() => {
    if (data?.content) {
      // Extract all brands from the current page products
      const brands = data.content.map((product) => product.brand.name);

      // Update allBrands with unique brand names
      setAllBrands((prevBrands) => [
        ...new Set([...prevBrands, ...brands]), // Add only unique brands
      ]);

      // Update brand counts from current page
      const newCounts = { ...brandCounts };
      data.content.forEach((product) => {
        const brandName = product.brand.name;
        if (!newCounts[brandName]) {
          newCounts[brandName] = 1;
        } else {
          newCounts[brandName]++;
        }
      });
      setBrandCounts(newCounts);
    }
  }, [data]);

  // When a brand is selected, fetch all products for that brand
  const fetchAllBrandProducts = async (brand) => {
    setIsFilterLoading(true);
    const totalPages = data?.totalPages || 14;
    const allProducts = [];

    try {
      // Fetch products from all pages
      const requests = [];
      for (let i = 0; i < totalPages; i++) {
        requests.push(
          fetch(`https://ishop-api.istad.co/api/v1/products?page=${i}&size=12`)
        );
      }

      const responses = await Promise.all(requests);
      const dataPromises = responses.map((response) => response.json());
      const allPagesData = await Promise.all(dataPromises);

      // Collect products from all pages
      allPagesData.forEach((pageData) => {
        if (pageData.content) {
          if (brand) {
            // Filter for the selected brand
            const filteredProducts = pageData.content.filter(
              (product) =>
                product.brand.name.toLowerCase() === brand.toLowerCase()
            );
            allProducts.push(...filteredProducts);
          } else {
            // No brand filter, collect all
            allProducts.push(...pageData.content);
          }
        }
      });

      // Count products by brand
      const counts = {};
      allPagesData
        .flatMap((pageData) => pageData.content || [])
        .forEach((product) => {
          const brandName = product.brand.name;
          if (!counts[brandName]) {
            counts[brandName] = 1;
          } else {
            counts[brandName]++;
          }
        });
      setBrandCounts(counts);

      // Update state with filtered products
      setBrandProducts(allProducts);
    } catch (err) {
      console.error("Error fetching brand products:", err);
    } finally {
      setIsFilterLoading(false);
    }
  };

  // Handle brand selection
  const handleBrandClick = (brand) => {
    // If same brand clicked, toggle off the filter
    if (brand === selectedBrand) {
      setSelectedBrand("");
    } else {
      setSelectedBrand(brand);
      fetchAllBrandProducts(brand);
    }
  };

  // Determine which products to display
  const displayProducts = isFiltered ? brandProducts : data?.content || [];

  // Show loading skeleton when either main data is loading or filter is loading
  if (isLoading || isFilterLoading) {
    return (
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-red-500">Error loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Brand Category Navigation */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Shop by Brand</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedBrand("");
              setPage(0);
            }}
            className={`px-4 py-2 transition ${
              !selectedBrand
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            All Brands
          </button>

          {Object.keys(brandCounts).map((brand) => (
            <button
              key={brand}
              onClick={() => handleBrandClick(brand)}
              className={`px-4 py-2 transition ${
                selectedBrand === brand
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {brand} ({brandCounts[brand] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Product Display Section */}
      {displayProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No products found for the selected brand.
        </p>
      ) : (
        <>
          {/* Display selected brand as heading if one is selected */}
          {selectedBrand && (
            <h1 className="text-2xl font-bold mb-4">
              {selectedBrand} Products ({brandProducts.length})
            </h1>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayProducts.map((product) => (
              <ProductCard key={product.uuid} product={product} />
            ))}
          </div>

          {/* Pagination - Only show when not filtered */}
          {!isFiltered && (
            <div className="flex flex-wrap justify-center mt-6 gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
                className="px-3 py-1 border bg-gray-200 disabled:opacity-50"
              >
                Prev
              </button>

              {/* Page Number Buttons */}
              <div className="flex flex-wrap justify-center gap-1">
                {Array.from({ length: data?.totalPages || 1 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`px-3 py-1 border transition ${
                      page === i ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, data?.totalPages - 1))
                }
                disabled={page === data?.totalPages - 1}
                className="px-3 py-1 border bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
