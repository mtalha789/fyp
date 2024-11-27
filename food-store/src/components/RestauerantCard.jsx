import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
// import ProductForm from "../pages/ProductForm";




export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  if(restaurant == null ) {
    return <div>
      <h1>Restaurant Not found</h1>
    </div>
  }

  return (
    <>{
      <Card
        className="w-full max-w-xs"
        shadow="sm"
        key={restaurant.id}
        isPressable
        onPress={() => navigate(`/restaurant/${restaurant.id}`)}
      >
        <CardBody className="flex overflow-visible p-0">
          <Image
            src={restaurant?.imageUrl}
            shadow="sm"
            alt={restaurant.name}
            className="w-full h-[250px] object-cover"
            radius="lg"
            width="100%"
          />
        </CardBody>
        <CardFooter className="text-small justify-between">
          <div>
            <b className="grid justify-start">{restaurant.name}</b>
          </div>
          <p className="text-default-500">Minimum Order Price: {restaurant.minimumOrderPrice}</p>
        </CardFooter>
      </Card>
    }
    </>
  )

 }
