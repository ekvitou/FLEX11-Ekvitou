import React, { useState } from "react";

const categories = [
  "All",
  "Smartphones",
  "Laptops",
  "Fragrances",
  "Skincare",
  "Groceries",
];

const brands = ["All", "Apple", "Samsung", "Microsoft", "HP", "OPPO", "Huawei"];

const CategoryNavigation = ({ onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const handleFilter = (type, value) => {
    if (type === "category") {
      setSelectedCategory(value);
      onFilter(value, selectedBrand); // Pass updated filters to parent
    } else {
      setSelectedBrand(value);
      onFilter(selectedCategory, value); // Pass updated filters to parent
    }
  };

  return (
    <div>
      {/* Category Navigation */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex overflow-x-auto space-x-8 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter("category", cat)}
                className={`flex-shrink-0 px-3 py-2 text-gray-700 ${
                  selectedCategory === cat
                    ? "border-b-2 border-gray-800 font-medium"
                    : "hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Filters */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleFilter("brand", brand)}
              className={`flex-shrink-0 px-6 py-2 border ${
                selectedBrand === brand
                  ? "border-gray-800 text-gray-800 font-medium"
                  : "border-gray-200 text-gray-600 hover:bg-white"
              } bg-gray-50`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;

