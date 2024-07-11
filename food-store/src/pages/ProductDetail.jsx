import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
const {id]= useParams;
  

const [data, setdata]=useState(null);

useEffect(()=>{
    // fetch(`https://fakestoreapi.com/products/${id}`
  },[setdata])

  const galleryImages = [
    "../assets/bloackarea.png",
    "../assets/bloackarea.png",
    "../assets/bloackarea.png",
  ];

  const menuItems = [
    "Today's Exclusive Dishes",
    "Party Combo",
    "Value Meals",
    "Dominos Classics",
    "Loaded Pizza",
    "Flavours of India",
    "Gourmet Pizza Range",
    "Pizza Mania",
  ];

  const exclusiveDishes = [
    {
      name: "Fiery Jalapeno & Paprika",
      votes: 15,
    },
    // Add more dishes as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h3 className="text-2xl font-bold mb-2">Domino's Pizza</h3>
        <p>Pizza, Beverages, Desserts</p>
        <p>Alpha 1, Greater Noida</p>
        <p>Open now - 11am - 2:45am (Today)</p>
        <p>3.3 Dining Ratings | 4.3 Delivery Ratings</p>
        <div className="flex space-x-2 mt-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Direction</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">Bookmark</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">Share</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded p-6">
          <div className="grid grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <img key={index} src={image} alt={`Gallery ${index + 1}`} className="w-full h-auto rounded" />
            ))}
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded p-6">
          <h4 className="text-xl font-bold mb-2">Order Online</h4>
          <p>Live track your order | 33 min</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Order Now</button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h4 className="text-xl font-bold mb-2">Menu</h4>
        <ul className="list-disc pl-5">
          {menuItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h4 className="text-xl font-bold mb-2">Reviews</h4>
        <p>Review section coming soon...</p>
      </div>

      <div className="bg-white shadow-md rounded p-6">
        <h4 className="text-xl font-bold mb-2">Today's Exclusive Dishes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exclusiveDishes.map((dish, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded">
              <p className="font-bold">{dish.name}</p>
              <p>{dish.votes} votes</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
