import React from "react";
import LocationIcon from "./LocationIcon";
import { SearchIcon } from "./SearchIcon";


export default function SearchInput() {
  return (
    <>
    <div className="bg-white w-[80vh] h-12  rounded-lg gap-1	flex">
      <div className=" w-56  border-r-2 border-solid flex flex-wrap flex-col items-stretch gap-1 p-2">
        <LocationIcon />
        <select name="choose your Location " className="w-40 h-12   ">
          <option value="Islamabad">Islamabad</option>
          <option value="Lahore">Lahore</option>
          <option value="Faislabad">Faislabad</option>
          <option value="Peshawar">Peshawar</option>
        </select>
      </div>
      <div className="w-[59vh] h-12 justify-center text-center items-stretch ">
        <div  className=" flex gap-1 items-center rounded-lg">
        <SearchIcon />

        <input type="text" placeholder="Search for resturant, cuisine and dish" className="w-[53vh] h-12 rounded-lg "/>

        </div>
      </div>
    </div>
    </>
   
      
    

  );
}

// <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-300 pointer-events-none flex-shrink-0" />