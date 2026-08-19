import CardFake from "./CardFake";
import React from "react";

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 mt-3">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <CardFake key={i} />
        ))}
    </div>
  );
}

export default SkeletonGrid;
