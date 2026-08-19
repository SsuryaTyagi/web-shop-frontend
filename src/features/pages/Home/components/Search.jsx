import React, { useEffect, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import Card from "../../../shared/cards/Card";
import { FiSearch, FiX } from "react-icons/fi";
import Alert from "../../../shared/components/Alert";

export default function Search() {
  const [value, setValue] = useState("");
  const { handlePopularItem, popularItem, loading } = useMenu();

  useEffect(() => {
    handlePopularItem(false);
  }, []);

  const filter = popularItem.filter((items) => {
    return (
      items.category?.toLowerCase().includes(value.toLowerCase()) ||
      items.name?.toLowerCase().includes(value.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen w-full pt-24 sm:pt-28 pb-16 flex flex-col items-center bg-slate-50/50">
      <div className="w-full max-w-2xl px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-6">
          Search Our Menu
        </h1>
        <div className="relative">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
            aria-hidden="true"
          />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Search for pizza, sides, drinks..."
            aria-label="Search menu"
            className="w-full pl-12 pr-12 py-3.5 bg-white border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-[#E33B32]/40 focus:border-[#E33B32] shadow-xs text-base transition-all"
          />
          {value !== "" && (
            <button
              type="button"
              onClick={() => setValue("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <FiX className="text-xl" />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {value === "" ? (
          <div className="max-w-md mx-auto">
            <Alert
              type="info"
              title="Discover Food Items"
              message="Start typing above to search pizzas, garlic bread, beverages, and desserts."
            />
          </div>
        ) : filter.length === 0 ? (
          <div className="max-w-md mx-auto">
            <Alert
              type="warning"
              title="No Matching Items Found"
              message={`We couldn't find any menu items matching "${value}". Try searching for another dish.`}
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {filter.map((vl, index) => (
              <Card {...vl} img={vl.image || vl.img} key={vl._id || index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}