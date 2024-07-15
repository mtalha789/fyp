import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";

const ProductDetail = () => {
  const { id } = useParams();

  //  const [Data, SetData] = useState(null);
  //  useEffect(() => {
  // fetch(`https://fakestoreapi.com/products/${id}`

  //  },[SetData])

  const list = [
    {
      id: 1,
      title: "product 1",
      img: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg",
      price:"Rs: 100 service Charges",
      delivery:"- Free Home delivery"
    },
  ];

  return (
    <>
      <MyNavbar />
      <div className="  h-80 px-72 py-16 content-center shadow-lg ">
        {list.map((item) => (
          <div key={item.id} className="flex gap-7">
            <div className=" w-52 h-52 rounded-xl overflow-hidden">
              <img src={item.img} key={item.id} alt={item.title} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">{item.title}</h1>
              <div className="flex pt-6 gap-3">
              <p className=" ">{item.price}</p>
              <p className="">{item.delivery}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDetail;
