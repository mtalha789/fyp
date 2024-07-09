// src/components/StepCard.js
import React from 'react';

const StepCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg text-center h-64 w-72 ">
      <img src={icon} alt={title} className="w-16 h-16 mx-auto mb-4"/>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default StepCard;
