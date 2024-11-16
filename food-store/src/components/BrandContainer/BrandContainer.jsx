import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DeliveryIcon from './DeliveryIcon';
import BrandCard from './BrandCard';
import Dominos from "../../assets/dominos-logo-4182.png";
import PizzaHut from "../../assets/pizza-hut-png-logo-3811.png";
import BurgerKing from "../../assets/picture-logo-42717.png";
import McDonalds from "../../assets/mcdonalds-png-logo-2771.png";
import StarBucks from "../../assets/starbucks-logo-png-1688.png";
import SubWay from "../../assets/subway-photo-logo-4293.png";

const brandsData = [
  { goto: 'https://www.dominos.com.pk/', BrandLogo: Dominos, BrandName: "Domino's Pizza" },
  { goto: 'https://www.subway.com/', BrandLogo: SubWay, BrandName: 'SubWay' },
  { goto: 'https://www.starbucks.com/', BrandLogo: StarBucks, BrandName: 'StarBucks' },
  { goto: 'https://www.bk.com/', BrandLogo: BurgerKing, BrandName: 'Burger King' },
  { goto: 'https://www.pizzahut.com/', BrandLogo: PizzaHut, BrandName: 'Pizza Hut' },
  { goto: 'https://www.mcdonalds.com/', BrandLogo: McDonalds, BrandName: 'Mcdonalds' },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5, // Number of items to show on large screens
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 4, // Number of items to show on medium screens
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2, // Number of items to show on tablets
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1, // Number of items to show on mobile screens
  }
};

function BrandContainer(props) {
  return (
    <>
      {/* Header Section */}
      <div className='flex justify-center p-16'>
        <div className='flex gap-3'>
          <DeliveryIcon />
          <h1 className='font-bold text-4xl flex justify-center items-center'>Order Online</h1>
        </div>
      </div>

      {/* Brands Carousel Section */}
      <div className='bg-gray-100 py-10 flex flex-col items-center justify-center'>
        <div className='text-center mb-8'>
          <h1 className='font-medium text-4xl'>Top Brands For You</h1>
        </div>

        {/* Carousel with 5 items shown on large screens */}
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={true}
          autoPlay={false}
          draggable={true}
          swipeable={true}
          keyBoardControl={true}
          showDots={false}
          className="w-full max-w-6xl"
        >
          {brandsData.map((brand, index) => (
            <div key={index} className="flex justify-center">
              <BrandCard
                goto={brand.goto}
                BrandLogo={brand.BrandLogo}
                BrandName={brand.BrandName}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default BrandContainer;
