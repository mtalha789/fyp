import { Button } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import boy1 from "../../assets/boy1.jpg";
import boy2 from "../../assets/boy2.jpg";
import boy3 from "../../assets/boy3.jpg";

export default function Careers() {
  return (
    <>
      <div className="bg-hero-pattern h-[65vh] text-center relative overflow-hidden bg-cover flex flex-col justify-center items-center m">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-white px-4 md:px-8">
          <h1 className="text-5xl font-extrabold mb-4">Mealo</h1>
          <h2 className="text-4xl font-bold mb-4">Join Our Delivery Team</h2>
          <p className="text-lg md:text-xl mb-6">
            Make a difference, deliver happiness, and be part of a passionate
            team that loves what they do.
          </p>
          <p className="text-base md:text-lg mb-8">
            As a rider, you'll be the heartbeat of our food delivery service.
            Enjoy flexible hours, earn good money, and make people's day by
            bringing them their favorite meals!
          </p>
          <Button color="success" variant="solid" className="text-black">
            <Link to="/careers/register">Apply Now</Link>
          </Button>
        </div>
      </div>

        <div className="flex justify-center p-16">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          Why Join Us?
        </h2>

        </div>
      <div className="flex flex-col items-center px-5 py-12 bg-gray-100">
        <ul className="space-y-4 text-lg md:text-xl text-gray-700">
          <li className="flex items-center gap-2">
            🏍️ <span>Flexible working hours – You decide your schedule!</span>
          </li>
          <li className="flex items-center gap-2">
            💰 <span>Competitive pay with tips</span>
          </li>
          <li className="flex items-center gap-2">
            🌍 <span>Explore your city while earning money</span>
          </li>
          <li className="flex items-center gap-2">
            📦 <span>A fun, friendly, and supportive team</span>
          </li>
        </ul>
      </div>

        {/* Delivery Images Section */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80">
            <img
              src={boy1}
              alt="Delivery Boy"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600">
                Be part of a team delivering joy and delicious meals every day!
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80">
            <img
              src={boy2}
              alt="Delivery Boy"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600">
                Explore your city while earning great pay and tips!
              </p>
            </div>
          {/* Card 3 */}
        </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80">
            <img
              src={boy3}
              alt="Delivery Boy"
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-600">
                Explore your city while earning great pay and tips!
              </p>
            </div>
          </div>
      </div>
    </>
  );
}
