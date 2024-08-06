import React, { useState } from "react";
import { ShoppingCart, Trash2  } from "lucide-react";
import { useCart } from "../state/Cart";
import { Card, Image, CardBody, CardFooter, Button, button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const cart = useCart((state) => state.cart);
  const {cart, addToCart, removeFromCart, clearCart} = useCart((state)=>({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    clearCart: state.clearCart,
  }))  
  const navigate =useNavigate()
  // const [cartItems, setCartItems] = useState([]);

  // const addToCart = (item) => {
  //   setCartItems([...cartItems, item]);
  // };

  // const removeFromCart = (index) => {
  //   setCartItems(cartItems.filter((_, i) => i !== index));
  // };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  // const handleCheckout=()=>{
  //   navigate('/')
  // }
  return (
    <div className="relative">
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
      <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg p-4 z-50">
        <h3 className="text-lg font-semibold">My Cart</h3>
        <div className="mt-4">
          {cart?.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <Card className="w-[22rem]">
                  <CardBody>
                    <div className="flex items-center gap-2">
                      <Image
                        alt={item.name}
                        height={80}
                        radius="sm"
                        src={item.image}
                        width={80}
                      />
                      <div className="w-48 font-semibold">
                        <p>{item.name}</p>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="flex justify-between">
                    <div className="bg-gray-100 rounded-full flex w-20 h-8 px-2 gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-full w-5 h-5 font-bold text-lg text-center"
                      >
                        -
                      </button>
                      <h1 className="rounded-full w-5 h-5 font-normal text-md text-center">
                        {item.quantity}
                      </h1>
                      <button
                        onClick={() => cart(item)}
                        className="rounded-full w-5 h-5 font-bold text-lg text-center"
                      >
                        +
                      </button>
                    </div>
                    <div className="">
                      <p className="text-red-500 line-through">{`Rs. ${item.originalPrice}`}</p>
                      <p className="text-red-500">{`Rs. ${item.discountedPrice}`}</p>
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
              <span>{/* Calculate and display the subtotal */}</span>
            </p>
            <p className="flex justify-between text-green-500">
              <span>Standard delivery</span>
              <span>Free</span>
            </p>
            <p className="flex justify-between font-semibold text-lg">
              <span>Total (Incl. VAT)</span>
              <span>{/* Calculate and display the total */}</span>
            </p>
          </div>

          <button className="w-full mt-4 bg-black text-white p-2 rounded-lg">
            Checkout
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default Cart;