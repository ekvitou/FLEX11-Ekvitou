import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="bg-white overflow-hidden shadow-sm border border-gray-200">
      <div className="relative">
        <Link to={`/products/${product.uuid}`}>
          <img
            src={product.thumbnail || "https://via.placeholder.com/150"}
            alt={product.name || "Product"}
            className="w-full h-48 object-cover"
          />
        </Link>
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 uppercase">
          {product.brand?.name || "No Brand"}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-normal text-gray-700 mb-1 truncate">
          {product.name || "No Name"}
        </h3>
        <p className="text-red-500 font-bold text-lg mb-1">
          ${product?.priceOut ? product.priceOut.toFixed(2) : "0.00"}
        </p>
        <p className="text-xs text-gray-500 mb-1">Min. order: 1 piece</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{product.stockQuantity || 0}+ sold</span>
          <span>10,000+ views</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
