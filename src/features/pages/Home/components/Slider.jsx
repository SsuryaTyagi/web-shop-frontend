import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Slider() {
  const [index, setIndex] = useState(0);
  const images = [
    "C:/Users/2040s/OneDrive/Desktop/javascript/slide/eiffel.avif",
    "rome.avif",
    "new york.avif",
    "golden tample.jpg",
    "red fort.jpg",
  ];

  const next = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(next, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-8">
      {/* Image card */}
      <div
        className="h-64 sm:h-80 md:h-96 rounded-2xl shadow-lg bg-center bg-cover transition-all duration-500"
        style={{
          backgroundImage: `url(${images[index]})`,
        }}
      >
        <div className="absolute inset-0 bg-black/25 rounded-2xl"></div>
      </div>

      {/* Buttons */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Small image indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              i === index ? "bg-white" : "bg-gray-400/60"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
