import React, { useContext } from 'react'
import { useLocation } from 'react-router';
import Card from '../../Items/Card';
import { MyContext } from '../../Context';

export default function List() {

  const {Menu} =useContext(MyContext);
  
     const loc = useLocation();
  const { path, dis } = loc.state;
   



   const filteredData = Menu.filter((value) => value.category.toLowerCase() === path.toLowerCase());

  return (
     <div className="h-full w-full flex items-center pt-20 justify-center">
      <div className="w-[1200px]">
        <div className="pt-15">
          <div className="text-[40px] font-sans font-bold">
            <h1>{path}</h1>
          </div>
          <div className="font-semibold text-[18px]">
            <p>{dis}</p>
          </div>
        </div>
        <div className="text-[30px] font-sans font-bold">
            Restaurants to explore
          </div>

        <div className='flex flex-col justify-center items-center '>
            <div className="grid grid-cols-3 sm:grid-cols-3 mr-2 md:grid-cols-3 gap-6 mt-6 mx-2">
            {filteredData.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
