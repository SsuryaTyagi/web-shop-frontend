import React from 'react'
import { useLocation } from 'react-router';
import Card from '../../Items/Card';

export default function List() {
     const loc = useLocation();
  const { path, dis } = loc.state;
    console.log(loc)

    const Menu = [
  {
    img: "menu/margarita-pizza.jpg",
    rating: 4.9,
    category: "Pizza",
    name: "Double Cheese Margarita",
    title: "Loaded with extra cheese",
    price: 120,
    price_m: 250,
    price_l: 350
  },
  {
    img: "menu/Fresh veggie.jpg",
    rating: 4.8,
    category: "Pizza",
    name: "Fresh Veggie",
    title: "Onion, Tomato, Capsicum & Sweet Corn",
    price: 150,
    price_m: 200,
    price_l: 349
  },
  {
    img: "menu/Exotica.jpg",
    rating: 4.7,
    category: "Pizza",
    name: "Exotica",
    title: "Onion, Capsicum, Mushroom, Jalapeno & Black Olive",
    price: 130,
    price_m: 220,
    price_l: 399
  },
  {
    img: "menu/Framhouse.jpg",
    rating: 4.9,
    category: "Pizza",
    name: "Farmhouse",
    title: "Onion, Tomato, Capsicum, Mushroom & Red Paprika",
    price: 150,
    price_m: 250,
    price_l: 399
  },
  {
    img: "menu/veg Supreme.jpg",
    rating: 4.8,
    category: "Pizza",
    name: "Veg Supreme",
    title: "Onion, Tomato, Capsicum, Mushroom",
    price: 150,
    price_m: 250,
    price_l: 399
  },
  {
    img: "menu/Deluxe Veggie.jpg",
    rating: 4.7,
    category: "Pizza",
    name: "Deluxe Veggie",
    title: "Onion, Capsicum, Paneer & Sweet Corn",
    price: 150,
    price_m: 250,
    price_l: 399
  },
  {
    img: "menu/Duble paneer.jpg",
    rating: 4.9,
    category: "Pizza",
    name: "Double Paneer Supreme",
    title: "Paneer, Red Paprika, Jalapeno & Black Olive",
    price: 150,
    price_m: 320,
    price_l: 450
  },
  {
    img: "menu/Corn.jpg",
    rating: 4.5,
    category: "Pizza",
    name: "Cheese & Corn Pizza",
    title: "Sweet Corn with cheese",
    price: 70,
    price_m: 150,
    price_l: 249
  },
  {
    img: "menu/onion Pizza.jpg",
    rating: 4.8,
    category: "Pizza",
    name: "Cheese & Onion Pizza",
    title: "Onion with cheese",
    price: 70,
    price_m: 150,
    price_l: 249
  },
  {
    img: "menu/paneer pizza.jpg",
    rating: 4.7,
    category: "Pizza",
    name: "Cheese & Paneer Pizza",
    title: "Paneer & cheese topping",
    price: 99,
    price_m: 170,
    price_l: 299
  },
  {
    img: "menu/Capsicum.jpg",
    rating: 4.6,
    category: "Pizza",
    name: "Cheese & Capsicum Pizza",
    title: "Capsicum, cheese topping",
    price: 70,
    price_m: 150,
    price_l: 249
  },
    {
    img: "menu/Burger/Aloo tikki.jpg",
    rating: 4.6,
    category: "Burger",
    name: "Aloo Tikki Burger",
    title: "Aloo tikki,onion",
    price: 50,
  },
  {
    img: "menu/Burger/paneer burger.jpg",
    rating: 4.8,
     category: "Burger",
    name: "Spicy Paneer with cheese ",
    title: "Paneer,aloo tikki,cheese,onion,spicy",
    price: 90,
  },
  {
    img: "menu/Burger/Veg Cheese.jpg",
    rating: 4.8,
   category: "Burger",
    name: "Veg Cheese",
    title: "Onion with cheese Burger",
    price: 65,
  },
  {
    img: "menu/Burger/veggie King Double cheese.jpg",
    rating: 4.9,
    category: "Burger",
    name: "Veggie king double cheese Burger",
    title: "Special items",
    price: 120,
  },
  {
    img: "menu/French Fries/cheese french frice.jpg",
    rating: 4.9,
    category: "french fries",
    name: "Cheese french frice",
    title: "cheese french frice with peri-peri",
    price: 150,
  },
  {
   img: "menu/French Fries/salted french fries.jpg",
    rating: 4.6,
    category: "french fries",
    name: "Salted french frice",
    title: "french frice with salte",
    price: 100,
  },
  {
    img: "menu/French Fries/peri-peri french frice.jpg",
    rating: 4.8,
    category: "french fries",
    name: "Pari-pari french frice",
    title: "french frice with pari-pari",
    price: 120,
  }
];

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

          <div className="grid grid-cols-3 gap-3 mt-6 w-[1200px]">
            {filteredData.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
      </div>
    </div>
  )
}
