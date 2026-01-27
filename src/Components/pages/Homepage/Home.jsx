import React, { useContext, useRef, lazy, Suspense, useEffect } from "react";
import { MyContext } from "../../data/Context";
const Card = lazy(() => import("../../Items/card/Card"));
import { Link } from "react-router";
import { BASE_URL } from "../../data/Api";
import { ToastContainer, toast } from 'react-toastify';
import SkeletonGrid from "../../Items/card/SkeletonGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


export default function Home() {
  const { data = [], best = [],loading } = useContext(MyContext) || {};
  const menuSectionRef = useRef(null); 

  // const scrollToMenu = () => {
  //   menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const img = [
    "/image-1.jpg",
    "/image-2.jpg",
    "/image-3.jpg",
  ];

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
<>
<ToastContainer
  position="top-right"
  autoClose={2000}
/>
    <main className=" h-auto overflow-x-hidden no-scrollbar">
      {/* Banner */}
    <section className="md:h-[35vw] h-[60vh] relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="h-full"
      >
        {img.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={item}
                alt="Banner"
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
    <div className="text-center text-white">
      <h1 className="text-4xl md:text-9xl font-bold">
        Free Delivery 
      </h1>
      <p className="mt-3 text-lg md:text-2xl">
        Hot & Fresh Food At Your Doorstep
      </p>
    </div>
  </div>
    </section>

      {/* What's on your mind */}
      <section
        ref={menuSectionRef}
        className="w-full h-auto flex justify-center mt-2 md:mt-8"
      >
        <div className="w-full max-w-[1400px] px-2">
          <div className="text-2xl font-bold mt-6">What's on your mind?</div>

          <div className="mt-6 flex gap-4 overflow-x-auto no-scrollbar py-2">
            {data.map((value, index) => (
              <Link
                key={index}
                to="/menu"
                state={{ path: value.path, dis: value.dis }}
              >
                <div className="flex-shrink-0 w-32 sm:w-56 h-[220px] bg-white overflow-hidden">
                  <img
                    src={`${BASE_URL}/${value.image}`}
                    alt={value.path}
                    loading="lazy"
                    className="w-full md:h-[170px] h-[140px] object-center"
                  />
                  <div className="text-center font-bold text-gray-600 text-lg mt-2">
                    {value.path}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <hr className="border-gray-400  md:mt-6" />

          <div className="text-2xl font-bold my-6 md:mt-6">
            Our Most Popular Deals!
          </div>

          {loading ?(<SkeletonGrid/>):
            (<div className="grid grid-cols-3 sm:grid-cols-3 mr-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:mt-3">
              {best.map((value, index) => (
                <Card
                  key={index}
                  index={index}
                  img={`${BASE_URL}/${value.image}`}
                  {...value}
                />
              ))}
            </div>)}
        </div>
      </section>
    </main>
</>
  );
}
