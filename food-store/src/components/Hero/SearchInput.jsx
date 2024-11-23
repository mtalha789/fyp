import React from "react";
import {MapPin , SearchIcon} from "lucide-react"
import MapComponent from "./MapComponent";
import { Input } from "@nextui-org/react";



export default function SearchInput() {
  return (
    <>
      <div className="flex">   

        <Input
        size="lg"
        label=""
        isClearable
        radius="lg"
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-800/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Enter your location" 
        startContent={
          <MapComponent className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 rounded-full" />
        }
      />
      </div>
   
    
       </>
   
      
    

  );
}

// <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-300 pointer-events-none flex-shrink-0" />