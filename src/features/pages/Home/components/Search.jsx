import React, { useContext, useEffect, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import Card from "../../../Items/card/Card";

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
    <div className="h-screen w-screen pt-30  flex  flex-col gap-5 items-center ">
      <div className="h-[8vw] ">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className=" outline-0 p-1.5 border-1 border-gray-500 rounded-[5px] w-[80vw] max-w-[850px] "
        />
      </div>
      <div className="grid grid-cols-3 gap-[2vw]">
        {value !== ""
          ? filter.map((vl, index) => {
              return <Card {...vl} key={index} />;
            })
          : []}
      </div>
    </div>
  );
}
