import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

 export const MyContext = createContext();
export default function Context({children}) {
    const[data ,setData] = useState()
    const[best ,setBest] = useState()
   const menu = async ()=>{
          try {
      const res = await axios.get(
        "http://localhost:8000/menu"
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
   };
      const Best = async ()=>{
          try {
      const res = await axios.get(
        "http://localhost:8000/best"
      );
      setBest(res.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
   }
  useEffect(() => {
    menu();
    Best();
  }, []);
  return (
<MyContext.Provider value={{ data, best }}>

    {children}
    </MyContext.Provider>
  )
}
