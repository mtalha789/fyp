import React, { useState } from 'react';
import { useCart } from "../../state/Cart"
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Input } from '@nextui-org/react';

const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your actual Stripe public key

const CheckoutForm = () => {
    const { cart, totalPrice } = useCart((state) => ({
      cart: state.cart,
      totalPrice: state.totalPrice,
    }));
  
    const [customerInfo, setCustomerInfo] = useState({
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    });
  
    const stripe = useStripe();
    const elements = useElements();
  
    const handleInputChange = (e) => {
      setCustomerInfo({
        ...customerInfo,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!stripe || !elements) {
        return; // Stripe.js has not loaded yet
      }
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: customerInfo.name,
          address: {
            line1: customerInfo.address,
            city: customerInfo.city,
            state: customerInfo.state,
            postal_code: customerInfo.zip,
            country: customerInfo.country,
          },
        },
      });
  
      if (error) {
        console.error(error);
      } else {
        console.log('Payment successful!', paymentMethod);
        // Proceed with your backend API call to complete the order
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-7">
        <h2 className="text-2xl font-semibold mb-6">Delivery Information</h2>
        <div className="space-y-4 mb-6">
          <Input
          variant='flat'
            type="text"
            name="name"
            placeholder="Name"
            value={customerInfo.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Input
          variant='flat'
            type="text"
            name="address"
            placeholder="Address"
            value={customerInfo.address}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              variant='flat'
              type="text"
              name="city"
              placeholder="City"
              value={customerInfo.city}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Input
              variant='flat'
              type="text"
              name="state"
              placeholder="State"
              value={customerInfo.state}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              variant='flat'
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={customerInfo.zip}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Input
              variant='flat'
              type="text"
              name="country"
              placeholder="Country"
              value={customerInfo.country}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
  
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        <ul className="mb-6 space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="text-lg font-semibold mb-6">
          Total: <span className="text-success-600">${totalPrice.toFixed(2)}</span>
        </div>
  
        <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
        <div className="mb-6">
          <CardElement className="p-4  rounded-md "  />
        </div>
  
        <Button
          type="submit"
          disabled={!stripe}
          className="w-full bg-black py-2 rounded-md  text-white "
        >
          Confirm and Pay
        </Button>
      </form>
    );
  };
  
  const CheckoutPage = () => {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    );
  };
  

export default CheckoutPage;
