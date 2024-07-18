import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";

const productList = [
  {
    id: 1,
    title: "Krunch Combo",
    price: " Rs. 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 2,
    title: "Krunch Combo",
    price: " Rs. 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 3,
    title: "Krunch Combo",
    price: " Rs. 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 4,
    title: "Krunch Combo",
    price: " Rs. 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 5,
    title: "Krunch Combo",
    price: " Rs. 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
  {
    id: 6,
    title: "Krunch Combo",
    price: " Rs. 550",
    description: "Enjoy a crispy crunchy chicken",
    img: "https://images.deliveryhero.io/image/fd-pk/Products/1165006.png??width=400",
  },
];


export default function ItemCard() {
  const navigate =useNavigate()
  const {id} =useParams()
  const handleClick=(id)=>{
    navigate(`/product/${id}`)
  }
  return (
    <>
      <div className="grid grid-cols-3 px-72 bg-gray-100 py-10 gap-7">
        {productList.map((item) => (
          <Card 
          className="py-4" 
          key={item.id} 
          isPressable
          isHoverable
          onPress={()=>handleClick(item.id)}
          >
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">{item.title}</h4>
              <small className="text-default-500">{item.description}</small>
              <p className="text-tiny uppercase font-bold overflow-hidden">
                {item.price}
              </p>
            </CardHeader>
            <CardBody className="overflow-visible py-2 relative">
              <Image
                alt="Card background"
                className="object-cover rounded-xl "
                src={item.img}
              />
              <Button isHoverable variant="solid" className=" absolute bottom-3 right-4 bg-white rounded-xl p-2 z-10">Add to Cart</Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}
