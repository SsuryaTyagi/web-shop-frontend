import React, { useContext, useRef, lazy, Suspense } from "react";
import { MyContext } from "../../Context";
const Card = lazy(() => import("../../Items/Card"));
import { Link } from "react-router";

export default function Home() {
  const { data = [], best = [] } = useContext(MyContext) || {};
  const menuSectionRef = useRef(null); // 🔹 reference for 2nd section

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // console.log("https://web-shop-backend.vercel.app/")
  return (
    <main className=" h-auto overflow-x-hidden no-scrollbar">
      {/* Banner */}
      <section className="h-auto w-full overflow-hidden relative">
        <img
          src="Screenshot 2025-10-11 133221.jpg"
          alt="Banner"
          className="w-full  object-cover object-center"
        />
        <img
          src="text.png"
          alt=""
          className="absolute top-1 right-[55%] w-[50vw]  object-center rotate-[9deg]"
        />
        {/* <button
          onClick={scrollToMenu}
          className="mt-6 hover:bg-[#D36D00] bg-red-700 text-white text-1em absolute bottom-16 left-10 lg:bottom-[42%] lg:left-[15%] font-semibold px-2 py-0.5  md:px-12 md:py-1 lg:px-16 lg:py-3 rounded-full shadow-lg transition-all duration-300"
        >
          Order Now 🍕
        </button> */}
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
                    src={`https://web-shop-nine-zeta.vercel.app/${value.image}`}
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

          <hr className="border-gray-400 mt-2 md:mt-6" />

          <div className="text-2xl font-bold mt-2 md:mt-6">
            Our Most Popular Deals!
          </div>

          <Suspense fallback={<div>Loading cards...</div>}>
            <div className="grid grid-cols-3 sm:grid-cols-3 mr-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:mt-6">
              {best.map((value, index) => (
                <Card
                  key={index}
                  index={index}
                  img={`https://web-shop-nine-zeta.vercel.app/${value.image}`}
                  {...value}
                />
              ))}
            </div>
          </Suspense>
        </div>
      </section>
    </main>
  );
}
