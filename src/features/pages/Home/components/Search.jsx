import React, { useContext, useEffect, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import Card from "../../../shared/cards/Card";
import { FiSearch, FiX } from "react-icons/fi";

export default function Search() {
  const [value, setValue] = useState("");
  const { handlePopularItem, popularItem } = useMenu();

  useEffect(() => {
    handlePopularItem(false);
  }, []);

  const filter = popularItem.filter((items) => {
    return (
      items.category.toLowerCase().includes(value.toLowerCase()) ||
      items.name.toLowerCase().includes(value.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen w-full pt-24 sm:pt-28 pb-12 flex flex-col items-center bg-slate-50/50">
      <div className="w-full max-w-2xl px-4 sm:px-6">
        <div className="relative">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
            aria-hidden="true"
          />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Search for pizza, sides, drinks..."
            aria-label="Search menu"
            className="w-full pl-11 pr-11 py-3 border border-gray-300 rounded-2xl outline-none focus:ring-2 focus:ring-[#E33B32]/50 focus:border-[#E33B32] transition-all"
          />
          {value !== "" && (
            <button
              type="button"
              onClick={() => setValue("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <FiX className="text-lg" />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {value === "" ? (
          <p className="text-center text-gray-400 mt-10">
            Start typing to search the menu.
          </p>
        ) : filter.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No results found for "{value}".
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filter.map((vl, index) => (
              <Card {...vl} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}