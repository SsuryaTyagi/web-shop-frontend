import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import Card from "../../Items/card/Card";
import { MenuContext } from "../../data/ContexTwo";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function List() {
  const { Menu } = useContext(MenuContext);
  const navigator = useNavigate();
  const loc = useLocation();
  const { path, dis } = loc.state;

  const filteredData = Menu.filter(
    (value) => value.category.toLowerCase() === path.toLowerCase()
  );

  return (
    <div className=" w-full flex pt-20 justify-center flex-col">
      <div className="w-full max-w-[1200px] mx-auto mt-[60px]">
        <span
          className=" bg-amber-200 "
          onClick={() => navigator(-1)}
        >
          <IoMdArrowRoundBack fontSize={50} />
        </span>
        <div className=" ml-[3vw]">
          <div className="text-[40px] font-sans font-bold">
            <h1>{path}</h1>
          </div>
          <div className="font-semibold text-[18px]">
            <p>{dis}</p>
          </div>
        </div>
        <div className="text-[30px] ml-[3vw] font-sans font-bold">
          {path} to explore
        </div>

        <div className="flex flex-col justify-center  ">
          <div className="grid grid-cols-3 sm:grid-cols-3  md:grid-cols-3 gap-2 md:gap-6 mx-1 mt-6 ">
            {filteredData.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
