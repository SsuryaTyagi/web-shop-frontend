import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Slider() {
  const [index, setIndex] = useState(0);
  const images = [
    "https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/slider/eiffel.avif",
    "https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/slider/rome.avif",
    "https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/slider/new-york.avif",
    "https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/slider/golden-temple.jpg",
    "https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/slider/red-fort.jpg",
  ];

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8">
      <div
        className="h-56 sm:h-72 md:h-96 rounded-2xl shadow-lg bg-center bg-cover transition-all duration-500 relative overflow-hidden"
        style={{ backgroundImage: `url(${images[index]})` }}
        role="img"
        aria-label={`Slide ${index + 1} of ${images.length}`}
      >
        <div className="absolute inset-0 bg-black/25 rounded-2xl" />
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 sm:left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 sm:right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-5 bg-white" : "w-2 bg-gray-300/70 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}