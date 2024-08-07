import React, { useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../state/Cart";
import {
  Card,
  Image,
  CardBody,
  CardFooter,
  Button,
  button,
  CardHeader,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const cart = useCart((state) => state.cart);
  const {
    cart,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    incQuantity,
    decQuantity,
  } = useCart((state) => state);
  console.log(cart);

  const navigate = useNavigate();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ">
      <button
        onClick={toggleCart}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors "
      >
        <ShoppingCart className="relative" />
        <div className="bg-red-500 text-white rounded-full w-5 h-5 absolute">
          <span>{cart?.length}</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-2xl  z-50 px-6 py-4 max-h-[40rem] overflow-y-scroll ">
          <h3 className="font-bold text-2xl text-inherit"> Cart</h3>
          <div className="mt-4  flex gap-2 flex-col">
            {cart?.map((item) => (
              <div key={item.id} className="flex justify-between items-center  ">
                <div>
                  <Card className="w-[20rem]">
                    <CardBody className="flex flex-row justify-evenly gap-3 items-center">
                      <Image
                        alt={item.title}
                        height={80}
                        radius="sm"
                        src={item.img}
                        width={80}
                      />
                      <div className="w-48 font-semibold">
                        <p>{item.title}</p>
                      </div>

                      <div className="bg-gray-100 rounded-full flex w-20 h-8 px-2 gap-2 justify-end">
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
                    </CardBody>

                    <CardFooter className="flex justify-between">
                      {/* <p className="text-red-500 line-through">{`Rs. ${item.origiPrice}`}</p> */}
                      <p className="text-red-500 font-medium">{`Rs. ${item.price}`}</p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
              <div className="justify-center flex mt-2">
            {cart?.length > 0 && (
              <div className="bg-gray-200 rounded-full flex w-10 h-10 items-center justify-center hover:bg-black hover:text-white">
                <Trash2 onClick={clearCart} />
              </div>
            )}
            </div>
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
              onClick={() => {
                setIsOpen(false);
                navigate("/checkout");
              }}
              className="w-full mt-4 bg-gray-300  p-2 rounded-lg hover:bg-black hover:text-white"
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
