import React, { useEffect, useRef } from "react";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../state/Cart";
import {
  Card,
  Image,
  CardBody,
  CardFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Using NextUI's hook
  const cartRef = useRef(null);

  const { cart, totalPrice, clearCart, incQuantity, decQuantity } = useCart();

  const navigate = useNavigate();

  // Close cart when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && cartRef.current && !cartRef.current.contains(e.target)) {
        onOpenChange(false); // Close the cart
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div className="relative">
      {/* Shopping Cart Button */}
      <Button
        isIconOnly
        onClick={isOpen ? onOpenChange : onOpen}
        className="text-black rounded-full hover:bg-gray-200 relative "
        variant="light"
      >
        <ShoppingBag />
        {/* Quantity Badge */}
        {cart?.length > 0 && (
          <div className=" bg-red-500 text-white rounded-full w-4 h-4 absolute  right- translate-x-1/2 -translate-y-1/2 text-center text-xs font-bold flex items-center justify-center">
            {cart.length}
          </div>
        )}
      </Button>

      {/* Cart Dropdown */}

      {isOpen && (
        <div
          ref={cartRef}
          className="absolute right-0 top-12 mt-2 w-96  bg-white shadow-2xl  rounded-lg z-50 p-3"
        >
          <h3 className="font-bold text-2xl text-gray-800">Cart</h3>

          <div
            className={`max-h-[25rem] w-full p-2 gap-6 ${
              cart?.length > 3 ? " overflow-y-scroll" : ""
            }`}
          >
            {/* Cart Items */}
            {cart?.length > 0 ? (
              cart.map((item) => (
                <Card
                  isHoverable
                  isBlurred
                  isFooterBlurred
                  key={item.id}
                  className="flex justify-between rounded-lg "
                >
                  <div className="flex flex-col p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-semibold">
                        {item.title}
                      </span>
                      <Image
                        alt={item.title}
                        width={100}
                        src={item.img}
                        className="rounded-md "
                      />
                    </div>
                    <div className="flex items-center justify-between gap-36 ">
                      <div className="flex items-center rounded-full  ">
                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          onClick={() => decQuantity(item.id)}
                          className="rounded-full"
                        >
                          <Minus size={10} />
                        </Button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="light"
                          isIconOnly
                          onClick={() => incQuantity(item.id)}
                          className="rounded-full"
                        >
                          <Plus size={10} />
                        </Button>
                      </div>
                      <p className="text-gray-700 font-semibold">
                        Rs. {item.price}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-center">No items in cart</p>
            )}

            {/* Clear Cart Button */}
            {cart?.length > 0 && (
              <div className="flex justify-center mt-2">
                <Button
                  isIconOnly
                  variant="flat"
                  color="danger"
                  onClick={clearCart}
                  className="rounded-full p-2   transition"
                >
                  <Trash2 />
                </Button>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="mt-4 border-t border-gray-200 pt-4 ">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">Rs. {totalPrice}</span>
            </p>
            <p className="flex justify-between text-green-500">
              <span>Standard Delivery</span>
              <span>Free</span>
            </p>
            <p className="flex justify-between font-semibold text-lg">
              <span>Total (Incl. VAT)</span>
              <span>Rs. {totalPrice}</span>
            </p>
          </div>

          {/* Order Now Button */}
          <Button
            disabled={cart?.length === 0}
            onClick={() => {
              onOpenChange(false); // Close the cart
              navigate("/checkout");
            }}
            className="w-full mt-4 bg-black text-white hover:bg-gray-800"
          >
            Order Now
          </Button>
        </div>
      )}
      
  
    </div>
  );
};

export default Cart;
