import React from 'react';
import DeliveryIcon from './DeliveryIcon';
import BrandCard from './BrandCard';
import Dominos from "../../assets/dominos-logo-4182.png"
import PizzaHut from "../../assets/pizza-hut-png-logo-3811.png"
import BurgerKing from "../../assets/picture-logo-42717.png"
import McDonalds from "../../assets/mcdonalds-png-logo-2771.png"
import StarBucks from "../../assets/starbucks-logo-png-1688.png"
import SubWay from "../../assets/subway-photo-logo-4293.png"


const brandsData = [
  { goto: 'https://www.dominos.com.pk/', BrandLogo: Dominos, BrandName: "Domino's Pizza" },
  { goto: 'https://www.subway.com/', BrandLogo: SubWay, BrandName: 'SubWay' },
  { goto: 'https://www.starbucks.com/', BrandLogo: StarBucks, BrandName: 'StarBucks' },
  { goto: 'https://www.bk.com/', BrandLogo: BurgerKing, BrandName: 'Burger King' },
  { goto: 'https://www.pizzahut.com/', BrandLogo: PizzaHut, BrandName: 'Pizza Hut' },
  { goto: 'https://www.mcdonalds.com/', BrandLogo: McDonalds, BrandName: 'Mcdonalds' },
];

function BrandContainer(props) {
    return (
        <>
        <div className='flex justify-center p-16 '>
          <div className='flex gap-3 '>
            <DeliveryIcon />
            <h1 className='font-bold text-4xl flex justify-center items-center'>Order Online</h1>
          </div>
        </div>
          <div className='bg-gray-100 h-[27rem]  justify-center flex flex-col'>
             <div className=' grid content-center justify-center items-center grid-flow-row'>
                <div className='flex h-16 w-96 mb-8'>
                   <h1 className='font-medium text-4xl  '>Top Brands For You</h1>
                </div>
            <div className='flex gap-12'>
              {brandsData.map((brand,index)=>(
                <BrandCard
                key={index}
                goto={brand.goto}
                BrandLogo={brand.BrandLogo}
                BrandName={brand.BrandName}
                />
              ))}
            </div>
              </div>
          </div>  
            
        </>
    );
}

export default BrandContainer;
