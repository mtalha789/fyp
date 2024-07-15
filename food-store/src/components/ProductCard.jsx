import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image, link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
// import ProductForm from "../pages/ProductForm";



export default function ProductCard() {
  // const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const list = [
    {
      id: 1,
      title: "Pizza",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
      price: "$5.50",
      desc: "Yummy Pizza",
    },
    {
      id: 2,
      title: "Biryani",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg",
      price: "$3.00",
      desc: "Yummy Biryani",
    },
    {
      id: 3,
      title: "Pizza",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
      price: "$10.00",
      desc: "Yummy Pizza",
    },
    {
      id: 4,
      title: "Biryani",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg",
      price: "$5.30",
      desc: "Yummy Biryani",
    },
    {
      id: 5,
      title: "Pizza",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
      price: "$15.70",
      desc: "Yummy Pizza",
    },
    {
      id: 6,
      title: "Pizza",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
      price: "$8.00",
      desc: "Yummy Pizza",
    },
    {
      id: 7,
      title: "Biryani",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg",
      price: "$7.50",
      desc: "Yummy Biryani",
    },
    {
      id: 8,
      title: "Biryani",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg",
      price: "$7.50",
      desc: "Yummy Biryani",
    },
    {
      id: 9,
      title: "Pizza",
      img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg",
      price: "$12.20",
      desc: "Yummy Pizza",
    },
  ];

  const HandleData =(id)=>{
    navigate(`/product/${id}`)
  }

  return (
    <section className="grid content-center justify-center items-center grid-flow-row ">
      <p className="text-3xl font-medium p-16">
        Order food Online from near you{" "}
      </p>

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-evenly ">
        {list.map((item) => (
          <Card
            className="w-full max-w-xs"
            shadow="sm"
            key={item.id}
            isPressable
            onPress={() => HandleData(item.id)}
          >
            <CardBody className="flex overflow-visible p-0">
              <Image
                src={item.img}
                shadow="sm"
                alt={item.title}
                className="w-full h-[250px] object-cover"
                radius="lg"
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <div>
                <b className="grid justify-start">{item.title}</b>
                <p className="text-default-400">{item.desc}</p>
              </div>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
