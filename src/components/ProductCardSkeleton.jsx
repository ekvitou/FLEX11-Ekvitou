import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse border border-gray-200 shadow-md p-4">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-300"></div>

      {/* Text Skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-300 w-3/4"></div>
        <div className="h-4 bg-gray-300 w-1/2"></div>
      </div>

      {/* Price Skeleton */}
      <div className="mt-4 h-5 bg-gray-300 w-1/4"></div>

      {/* Button Skeleton */}
      <div className="mt-4 h-8 bg-gray-300 w-full"></div>
    </div>
  );
};

export default ProductCardSkeleton;
