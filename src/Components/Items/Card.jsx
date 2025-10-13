import React, { useContext, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { MyContext } from '../Context';

export default function Card(props) {
  // Default size "small"
  const [size, setSize] = useState('S');

  const {addToCart} = useContext(MyContext);

  // Function to get price based on size
  const getPrice = () => {
    if (size === 'S') return props.price;
    if (size === 'M') return props.price_m;
    if (size === 'L') return props.price_l;
  };

  return (
    <div className="w-[120px] flex flex-col justify-between sm:w-[180px] h-auto md:h-auto md:w-[240px] lg:w-[320px] bg-white mb-4 rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl duration-300">
      
      {/* Image Section */}
      <div className="relative group ">
        <img
          src={props.img}
          alt=""
            loading="lazy" 
          className="w-full h-[120px] sm:h-[150px] md:h-[180px] object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-2 sm:p-3 ">
        <div className='flex justify-between'>
          <h3 className="text-sm sm:text-base md:text-lg font-bold truncate">
            {props.name}
          </h3>

          <div className="flex items-start  text-[12px] sm:text-sm text-gray-600 mt-1">
            <FaStar className="text-yellow-500 mr-1" />
            <span className="font-semibold">{props.rating}</span>
          </div>
        </div>

        <div className="text-sm sm:text-sm text-gray-500 mt-1 truncate flex justify-between items-center">
          <span>{props.category}</span>

          {/* Price with ₹ */}
          <div className='font-bold'>₹{getPrice()}</div>
        </div>

        <div className="text-sm sm:text-sm text-gray-400 truncate">
          {props.title}
        </div>

        {/* Size Selector - only for Pizza */}
        {props.category === 'Pizza' && (
          <div className="flex justify-around mt-2">
            {['S', 'M', 'L'].map((s) => (
              <button
                key={s}
                className={`px-2 py-1 rounded-full border ${
                  size === s ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <button   onClick={() => {
    addToCart({
      ...props,
      selectedSize: size,       // current size (S/M/L)
      finalPrice: getPrice(),   // current size ka price
    });
  }} className='w-full bg-green-400 active:bg-green-800 md:text-2xl text-[12px] text-white mt-2  rounded-2xl text-center'>Order Now</button>
      </div>
    </div>
  );
}
