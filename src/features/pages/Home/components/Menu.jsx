import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Card from "../../../shared/cards/Card";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useMenu } from "../hooks/useMenu";

export default function List() {
  const { handleMenu, data, error, loading } = useMenu();
  const navigator = useNavigate();
  const loc = useLocation();
  const { path, dis } = loc.state || {};

  const handleSubmit = async () => {
    await handleMenu(path);
  };

  useEffect(() => {
    handleSubmit();
  }, [path]);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pt-24 pb-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigator(-1)}
          aria-label="Go back"
          className="inline-flex items-center justify-center bg-amber-200 hover:bg-amber-300 rounded-full p-2.5 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <IoMdArrowRoundBack fontSize={24} />
        </button>

        <div className="mt-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {path}
          </h1>
          {dis && (
            <p className="mt-1 text-sm sm:text-base font-medium text-gray-500">
              {dis}
            </p>
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-8 mb-4">
          {path} to explore
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            No items found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}