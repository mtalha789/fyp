import React, { useState } from "react";
import { ShoppingCart, Trash2  } from "lucide-react";
import { useCart } from "../state/Cart";
import { Card, Image, CardBody, CardFooter, Button, button, CardHeader } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  // const cart = useCart((state) => state.cart);
  const {cart,totalPrice, addToCart, removeFromCart, clearCart, incQuantity, decQuantity} = useCart((state)=>state)  
  console.log(cart);
  
  const navigate =useNavigate()
 
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="relative ">
    <button
      onClick={toggleCart}
      className="bg-slate-900 text-white p-2 rounded-xl"
    >
      <ShoppingCart className="relative" />
      <div className="bg-red-500 text-white rounded-full w-5 h-5 absolute">
        <span>{cart?.length}</span>
      </div>
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg  z-50 max-h-[70vh] overflow-y-scroll overflow-x-hidden ">
        <h3 className="text-lg font-semiboldoverflow-scroll">My Cart</h3>
        <div className="mt-4  flex gap-2 flex-col">
          {cart?.map((item) => (
            <div key={item.id} className="flex justify-between items-center ">
              <div>
                <Card className="w-[22rem]">
                  <CardHeader>
                      <Image
                        alt={item.title}
                        height={80}
                        radius="sm"
                        src={item.img}
                        width={80}
                      />
               
                  </CardHeader>
                  <CardBody>
                    <div className="flex items-center gap-2">
                      <div className="w-48 font-semibold">
                        <p>{item.title}</p>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="flex justify-between">
                    <div className="bg-gray-100 rounded-full flex w-20 h-8 px-2 gap-2">
                      <button
                        onClick={() => decQuantity(item.id)}
                        className="rounded-full w-5 h-5 font-bold text-lg text-center"
                      >
                        -
                      </button>
                      <h1 className="rounded-full w-5 h-5 font-normal text-md text-center">
                        {item.quantity}
                      </h1>
                      <button
                        onClick={() => incQuantity(item.id)}
                        className="rounded-full w-5 h-5 font-bold text-lg text-center"
                      >
                        +
                      </button>
                    </div>
                    <div className="">
                      {/* <p className="text-red-500 line-through">{`Rs. ${item.origiPrice}`}</p> */}
                      <p className="text-red-500">{`Rs. ${item.price}`}</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          ))}

          {  
          cart?.length > 0 && (
            <Trash2 onClick={clearCart} /> 
          )}

          <div className="mt-4">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>{totalPrice}</span>
            </p>
            <p className="flex justify-between text-green-500">
              <span>Standard delivery</span>
              <span>Free</span>
            </p>
            <p className="flex justify-between font-semibold text-lg">
              <span>Total (Incl. VAT)</span>
              <span>{totalPrice}</span>
            </p>
          </div>

          <button 
          onClick={()=>{
            setIsOpen(false)
            navigate("/checkout")
          }}
          className="w-full mt-4 bg-black text-white p-2 rounded-lg"
          >
            Order Now
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default Cart;