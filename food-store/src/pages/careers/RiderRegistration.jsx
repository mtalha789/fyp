import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function RiderRegistration() {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    userId: "", // This should be populated based on user authentication, for now we leave it as a placeholder.
  });

  const navigate = useNavigate();

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation if needed
    if (
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Here you would typically make an API call to submit the data
      // Example: await api.submitAddress(formData);

      console.log("Form submitted successfully", formData);
      alert("You have successfully registered!");

      // Redirect to the home page or any other page
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="h-screen flex-col flex justify-center items-center p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Become a Rider
      </h2>
      <div className="md:w-1/4 sm:w-1/2 py-8 bg-white  rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4 justify-center items-center mx-auto w-[90%]"
        >
          <Input
            isRequired
            underlined
            fullWidth
            label="Street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            className="  max-w-sm sm:min-w-lg rounded-md px-3 py-2"
            placeholder="Enter your street"
          />
          <Input
            isRequired
            underlined
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="  max-w-sm sm:min-w-lg rounded-md px-3 py-2"
            placeholder="Enter your city"
          />
          <Input
            isRequired
            underlined
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="  max-w-sm sm:min-w-lg rounded-md px-3 py-2"
            placeholder="Enter your state"
          />
          <Input
            isRequired
            underlined
            fullWidth
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
            placeholder="Enter your zip code"
          />
          {/* You can generate userId dynamically if the user is logged in */}
          <Input
            isRequired
            underlined
            fullWidth
            label="User ID"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            className="  max-w-sm sm:min-w-lg rounded-md px-3 py-2"
            placeholder="Enter your User ID"
          />

          <Button
            type="submit"
            className="py-3 mt-6 bg-blue-500 text-white hover:bg-blue-400"
          >
            Register Now
          </Button>
        </form>
      </div>
    </div>
  );
}
