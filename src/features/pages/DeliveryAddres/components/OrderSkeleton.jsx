import React from "react";

export default function OrderSkeleton() {
  return (
    <div className="w-full min-h-screen pt-28 pb-16 bg-slate-50 flex justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-6 animate-pulse">
        {/* Banner Skeleton */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 w-full md:w-2/3">
            <div className="h-6 w-32 bg-slate-200 rounded-full" />
            <div className="h-9 w-64 bg-slate-200 rounded-xl" />
            <div className="h-4 w-80 bg-slate-100 rounded-lg" />
          </div>
          <div className="h-20 w-48 bg-slate-200 rounded-2xl shrink-0" />
        </div>

        {/* Timeline Skeleton */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="h-6 w-44 bg-slate-200 rounded-full" />
          <div className="hidden md:flex justify-between items-center pt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-200" />
                <div className="h-4 w-16 bg-slate-100 rounded-md" />
              </div>
            ))}
          </div>
          <div className="md:hidden space-y-4 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-32 bg-slate-200 rounded-md" />
                  <div className="h-3 w-48 bg-slate-100 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Details Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 h-64" />
          <div className="bg-white rounded-3xl p-6 border border-slate-200 h-64" />
        </div>
      </div>
    </div>
  );
}
