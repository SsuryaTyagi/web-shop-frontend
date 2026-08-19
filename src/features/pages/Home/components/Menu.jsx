import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../../shared/cards/Card";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useMenu } from "../hooks/useMenu";
import Alert from "../../../shared/components/Alert";

export default function List() {
  const { handleMenu, data, error, loading } = useMenu();
  const navigator = useNavigate();
  const loc = useLocation();
  const { path, dis } = loc.state || {};

  const handleSubmit = async () => {
    if (path) {
      await handleMenu(path);
    }
  };

  useEffect(() => {
    handleSubmit();
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pt-24 pb-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigator(-1)}
          aria-label="Go back"
          className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold px-4 py-2 rounded-xl shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          <IoMdArrowRoundBack fontSize={20} />
          <span>Back</span>
        </button>

        <div className="mt-6">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {path || "Menu Options"}
          </h1>
          {dis && (
            <p className="mt-2 text-sm sm:text-base font-medium text-slate-600 max-w-2xl leading-relaxed">
              {dis}
            </p>
          )}
        </div>

        <div className="mt-8 mb-6 border-b border-slate-200 pb-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Available Selection
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 bg-slate-200/60 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="max-w-md mx-auto py-10">
            <Alert
              type="info"
              title="No Items Found"
              message="No menu items are currently available in this category."
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {data.map((item, index) => (
              <Card key={item._id || index} img={item.image || item.img} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}