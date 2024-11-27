
import { Button, Input } from "@nextui-org/react";
import SearchInput from "./SearchInput";
import { z } from "zod";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero(props) {
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate()
  
  const isZipcode = () => {
    if(zipCode?.trim()?.length === 6 && zipCode.split("").every(char => !isNaN(parseInt(char)))){
      return true
    }else{
      return false
    }
  }

  const handleClick = () => isZipcode() && navigate('/restaurants')
  return (
    <>
      <div className="bg-hero-pattern h-[70vh] content-center text-center relative overflow-hidden bg-cover flex flex-col justify-center">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 text-white px-4 md:px-8">
        <span className="font-extrabold text-8xl text-inherit text-white my-4">
          Mealo
        </span>
        <div>
          <h1 className="font-bold text-3xl text-inherit text-white my-4">
            Discover the best food & drinks
          </h1>
        </div>
        <div className="flex justify-center">
          {/* <SearchInput /> */}
          <Input 
          type="text"
          variant="flat"
          size="lg"
          placeholder="Enter Zip Code"
         className="w-96 text-inherit text-white my-4"
         value={zipCode}
         onChange={(e) => setZipCode(e.target.value)}
         isClearable
         onClearClick={() => setZipCode("")}
         startContent={<Search color="black" className="text-inherit  my-4" onClick={()=>handleClick()} />}
          />
            {/* <Search className="text-inherit text-white my-4" /> */}
          <button>
          </button>
        </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
