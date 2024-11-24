import { useEffect, useState } from "react";
import {
  RestaurantForm,
  RestaurantAddressForm as AddressForm
} from "../components/forms/index";
import { useNavigate } from "react-router-dom";

const BusinessRegistration = () => {
  const [formState, setFormState] = useState({
    restaurantSubmitted: false,
    addressSubmitted: false
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (formState?.addressSubmitted && formState?.restaurantSubmitted) {
      navigate('/business-portal')
    }
  }, [formState, navigate])
  // Render AddressForm after RestaurantForm submission
  if (formState.restaurantSubmitted) {
    return <AddressForm setFormState={setFormState} formState={formState} />;
  }

  // Render RestaurantForm initially
  return (
    <RestaurantForm setFormState={setFormState} />
  );
};

export default BusinessRegistration;
