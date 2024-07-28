import React, { useState } from 'react';
import { Button, Card, Divider } from '@nextui-org/react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <Card key={index} className="mb-2">
              <div className="flex justify-between p-2">
                <span>{item.name}</span>
                <Button auto flat color="error" onClick={() => removeFromCart(index)}>
                  Remove
                </Button>
              </div>
            </Card>
          ))}
          <Divider />
          <Button className="mt-4" auto flat color="success" onClick={() => alert('Proceed to Checkout')}>
            Checkout
          </Button>
        </div>
      )}
      <Button className="mt-4" auto flat onClick={() => addToCart({ name: 'Sample Item' })}>
        Add Sample Item
      </Button>
    </div>
  );
};

export default Cart;
