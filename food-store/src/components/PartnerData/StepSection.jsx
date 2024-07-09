// src/components/StepsSection.js
import React from 'react';
import StepCard from './StepCard';

const steps = [
  {
    title: 'Step 1',
    description: 'Create your page on Mealo. Help users discover your place by creating a listing on Mealo.',
    icon: 'https://b.zmtcdn.com/merchant-onboarding/ecb5e086ee64a4b8b063011537be18171600699886.png'
  },
  {
    title: 'Step 2',
    description: 'Register for online ordering and deliver orders to millions of customers with ease.',
    icon: 'https://b.zmtcdn.com/merchant-onboarding/71d998231fdaeb0bffe8ff5872edcde81600699935.png'
  },
  {
    title: 'Step 3',
    description: 'Start receiving orders online. Manage orders on our partner app, web dashboard, or API partners.',
    icon: 'https://b.zmtcdn.com/merchant-onboarding/efdd6ac0cd160a46c97ad58d9bbd73fd1600699950.png'
  }
];

const StepsSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold mb-8">How it works?</h2>
        <div className="flex content-center justify-center gap-6">
          {steps.map((step, index) => (
            <StepCard key={index} icon={step.icon} title={step.title} description={step.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
