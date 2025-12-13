import React from "react";

export default function CardFake() {
  return (
    <div>
      <div className="w-[32vw] max-w-[320px] bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
        {/* Image skeleton */}
        <div className="w-full h-[150px] bg-gray-300"></div>

        {/* Content skeleton */}
        <div className="p-3 space-y-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-full"></div>

          <div className="h-8 bg-gray-300 rounded-2xl mt-4"></div>
        </div>
      </div>
    </div>
  );
}
