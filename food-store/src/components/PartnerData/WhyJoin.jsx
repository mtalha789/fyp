import React from "react";
import Globe from "../../assets/globe.png";
import Cafe from "../../assets/cafe.png";
import Order from "../../assets/order.png";

function WhyJoin(props) {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6  text-center justify-center">
      <h4 className="text-3xl font-medium mb-4 mt-14 ">
        Why should you partner with Zomato?
      </h4>
      <p className="mb-16 text-xl text-gray-500">
        Zomato enables you to get 60% more revenue, 10x new customers and boost
        your brand <br />
        visibility by providing insights to improve your business.
      </p>
      <div className="flex gap-6 justify-center mb-16">
        <div className="bg-white shadow-lg rounded-lg h-28 w-64 flex items-center justify-center gap-2">
          <div className="  w-12 h-12">
            <img src={Globe} alt="globe" />
          </div>
          <div className="">
            <h1 className="text-blue-500 text-3xl font-medium  ">
              1000+ cities
            </h1>
            <p>in India</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg h-28 w-64 flex items-center justify-center gap-2">
          <div className="  w-12 h-12">
            <img src={Cafe} alt="Cafe" />
          </div>
          <div className="">
            <h1 className="text-blue-500 text-3xl font-medium  ">3 Lakh +</h1>
            <p>Resturants</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg h-28 w-64 flex items-center justify-center gap-2">
          <div className="  w-12 h-12">
            <img src={Order} alt="globe" />
          </div>
          <div className="">
            <h1 className="text-blue-500 text-3xl font-medium  ">5.0 Crore+</h1>
            <p>Monthly Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyJoin;
