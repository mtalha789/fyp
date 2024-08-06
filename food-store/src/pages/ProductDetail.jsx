import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import ItemCard from "../components/ItemCard";
import Footer from "../components/Footer";
import { Flame , Star } from "lucide-react";

const list = [
  {
    id: 1,
    title: "KFC",
    img: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg",
    price: "Rs: 100 service Charges",
    delivery: "- Free Home delivery",
    ratting: "4.9/5 rating"
  },
  {
    id: 2,
    title: "product 2",
    img: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg",
    price: "Rs: 100 service Charges",
    delivery: "- Free Home delivery",
    ratting: "4.9/5 rating"

  },
  {
    id: 3,
    title: "product 3",
    img: "https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg",
    price: "Rs: 100 service Charges",
    delivery: "- Free Home delivery",
    ratting: "4.9/5 rating"

  },
];
const ProductDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  //  useEffect(() => {
  // fetch(`https://fakestoreapi.com/products/${id}`

  //  },[setData])

  useEffect(() => {
    const filterData = list.find((item) => item.id === parseInt(id));
    setData(filterData);
    console.log(filterData.id);
  }, [id]);
  const {pathName}= useLocation
  useEffect(()=>{
    window.scrollTo(0,0)
  },[pathName])

  return (
    <>
      <MyNavbar />
      <div className="  bg-gray-100 h-80 px-72 py-16 content-center shadow-lg ">
        <div key={data.id} className="flex gap-7">
          <div className=" w-72 h-72 rounded-xl overflow-hidden">
            <img src={data.img} key={data.id} alt={data.title} />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <div className="flex pt-6 gap-3">
              <p className=" ">{data.price}</p>
              <p className="">{data.delivery}</p>
            </div>
            <div className="flex gap-1 py-4 text-sm">
              <Star fill="orange" stroke="red" size={18}  />
              <p>{data.ratting}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-7 px-72 flex ">
        <div className=" h-12 w-12 items-center">
        <Flame size={48} fill="orange" stroke="0" />
        </div>
        <div>
        <h1 className="text-4xl font-bold">Popular</h1>
          <div>
          <p>Most orderd right Now </p>
          </div>
        </div>
        
      </div>
      <ItemCard />
      <Footer />
    </>
  );
};

export default ProductDetail;
