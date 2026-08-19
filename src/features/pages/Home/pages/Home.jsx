import React, { useRef, lazy, Suspense, useEffect } from "react";
const Card = lazy(() => import("../../../shared/cards/Card"));
import { Link } from "react-router-dom";
import SkeletonGrid from "../../../shared/cards/SkeletonGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useMenu } from "../hooks/useMenu";
import { FiTruck, FiAward, FiSmile, FiShield } from "react-icons/fi";

export default function Home() {
  const { handlePopularItem, menuItem, popularItem, loading } = useMenu();
  const menuSectionRef = useRef(null);

  useEffect(() => {
    handlePopularItem(true);
    window.scrollTo(0, 0);
  }, []);

  const img = [
    "https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/Banner/image-1.jpg",
    "https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/Banner/image-2.jpg",
    "https://ik.imagekit.io/gb1lyvp8q/The%20pizza%20hub/Banner/image-3.jpg",
  ];

  const features = [
    {
      icon: <FiTruck className="text-2xl text-[#E33B32]" />,
      title: "Super Fast Delivery",
      desc: "Hot & fresh pizza at your door in 30 minutes.",
    },
    {
      icon: <FiAward className="text-2xl text-amber-500" />,
      title: "Authentic Recipes",
      desc: "Crafted with imported Italian herbs & cheeses.",
    },
    {
      icon: <FiShield className="text-2xl text-emerald-600" />,
      title: "100% Fresh Dough",
      desc: "Hand-tossed fresh dough daily in our ovens.",
    },
    {
      icon: <FiSmile className="text-2xl text-blue-600" />,
      title: "50,000+ Happy Customers",
      desc: "Top-rated flavor loved across the city.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50/50 pb-16 overflow-x-hidden">
      {/* Hero Banner Carousel */}
      <section className="relative h-[48vh] sm:h-[55vh] md:h-[420px] lg:h-[480px] w-full pt-16 sm:pt-20">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {img.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img
                  src={item}
                  alt="Special pizza banner promo"
                  className="w-full h-full object-cover object-center"
                />
                {/* Dark gradient overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/20" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Hero Overlay Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none px-4 pt-12">
          <div className="text-center text-white max-w-3xl">
            <span className="inline-block bg-[#E33B32] text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-md">
              Fast & Free Delivery
            </span>
            <h1 className="text-2xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-md">
              Hot & Fresh Pizza At Your Doorstep
            </h1>
            <p className="mt-2 text-xs sm:text-lg md:text-xl font-medium text-slate-200 drop-shadow-sm max-w-xl mx-auto">
              Craving authentic hand-tossed pizzas? Order online and get hot food delivered fast!
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-10 space-y-8 sm:space-y-12">
        {/* Features / Value Props Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-2.5 sm:gap-3"
            >
              <div className="p-2 sm:p-3 rounded-xl bg-slate-50 shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                  {f.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 hidden xs:block">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Category Carousel ("What's on your mind?") */}
        <section ref={menuSectionRef}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                What's on your mind?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Explore our mouth-watering categories
              </p>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2 -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth">
            {menuItem?.map((value, index) => (
              <Link
                key={index}
                to="/menu"
                state={{ path: value.path, dis: value.dis }}
                className="flex-shrink-0 group focus:outline-none"
              >
                <div className="w-24 sm:w-36 md:w-44 bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-slate-100 shadow-2xs group-hover:shadow-md transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-amber-50 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={value.image}
                      alt={value.path}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-2 sm:mt-3 font-bold text-slate-800 text-xs sm:text-sm group-hover:text-[#E33B32] transition-colors truncate w-full">
                    {value.path}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Promotional Callout Banner */}
        <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="bg-[#E33B32] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block">
              Daily Special
            </span>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Get Up To 30% Off On Medium & Large Pizzas!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Made with 100% fresh mozzarella cheese, artisan sauce, and your favorite toppings.
            </p>
          </div>
          <Link
            to="/search"
            className="bg-[#E33B32] hover:bg-[#cf312a] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md shrink-0 focus:outline-none"
          >
            Order Online Now
          </Link>
        </section>

        {/* Popular Deals Section (2-Column Grid on Mobile) */}
        <section>
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Most Popular Deals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Top picks prepared fresh for pizza lovers
            </p>
          </div>

          {loading ? (
            <SkeletonGrid />
          ) : (
            <Suspense fallback={<SkeletonGrid />}>
              {/* 2-column on phone screens (grid-cols-2), 3-column on md, 4-column on lg */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {popularItem.map((value, index) => (
                  <Card
                    key={value._id || index}
                    index={index}
                    img={value.image}
                    {...value}
                  />
                ))}
              </div>
            </Suspense>
          )}
        </section>
      </div>
    </main>
  );
}
