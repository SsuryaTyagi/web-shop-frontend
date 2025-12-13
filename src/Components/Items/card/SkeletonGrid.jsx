import CardFake from "./CardFake";
import React from "react";

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mt-3">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <CardFake key={i} />
        ))}
    </div>
  );
}

export default SkeletonGrid;
