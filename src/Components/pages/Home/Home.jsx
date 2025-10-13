import React, { useContext, useRef } from "react";
import { MyContext } from "../../Context";
import Card from "../../Items/Card";
import { Link } from "react-router";

export default function Home() {
  const { data = [], best = [] } = useContext(MyContext) || {};
  const menuSectionRef = useRef(null); // 🔹 reference for 2nd section

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className=" h-auto overflow-x-hidden no-scrollbar">
      {/* Banner */}
      <section className="h-auto w-full overflow-hidden relative">
        <img
          src="Screenshot 2025-10-11 133221.png"
          alt="Banner"
          className="w-full h-full object-cover object-center"
        />
        <img
          src="text.png"
          alt=""
          className="absolute -top-0 w-[800px] h-[800px] object-center rotate-[9deg]"
        />

        {/* 🔹 Scroll button */}
        <button
          onClick={scrollToMenu}
          className="mt-6 hover:bg-[#D36D00] bg-red-700 text-white text-3xl absolute bottom-[42%] left-[15%] font-semibold px-16 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          Order Now 🍕
        </button>
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
                    src={`http://localhost:8000/${value.image}`}
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

          <div className="grid grid-cols-3 sm:grid-cols-3 mr-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:mt-6">
            {best.map((value, index) => (
              <Card
                key={index}
                img={`http://localhost:8000/${value.image}`}
                {...value}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
