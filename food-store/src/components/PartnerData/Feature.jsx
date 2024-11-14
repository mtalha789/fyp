// src/components/Features.js
import React from 'react';

const features = [
  {
    title: 'Advertise',
    description: 'For every marketing dollar spent, Zomato returns over 8x the investment...',
    icon: 'https://www.zomato.com/partner-with-us/static/media/ZomatoAdvertise.31195a83.svg'
  },
  {
    title: 'Events',
    description: 'Partner with us for Pakistan grandest food & entertainment carnival - “Mealoland”...',
    icon: 'https://www.zomato.com/partner-with-us/static/media/ZomatoEvent.c3e1f3a8.svg'
  },
  {
    title: 'Listing',
    description: 'A free app that allows you to manage your Zomato listing directly from your smartphone',
    icon: 'https://b.zmtcdn.com/merchant-onboarding/be4f70ca22a3b31a84b3cf8ed811f0281600769259.png'
  },
  // Add more features as needed
];

const Features = () => {
  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8 text-center">Our Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg text-center">
              <img src={feature.icon} alt={feature.title} className="overflow-visible w-full mx-auto mb-4"/>
              <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
