import React from 'react'
import { Input, Button } from '@nextui-org/react'
import { restaurantAddressSchema } from '../../schemas/restaurantSchema';
import { useRestaurantStore } from '../../store/Restaurant';
import { useAuthStore } from '../../store/Auth';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function RestaurantAddressForm({ setFormState, formState, resId }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate()
  const { accessToken } = useAuthStore()

  const { addRestaurantAddress, getUserRestaurants } = useRestaurantStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    //data collection
    const data = new FormData(e.target);

    //validation
    const result = restaurantAddressSchema.safeParse(Object.fromEntries(data.entries()));
    if (!result.success) {
      setError(result.error.formErrors.fieldErrors);
      setLoading(false);
      return;
    }

    const finalData = { ...result.data,street: encodeURIComponent(result.data.street) }
    
    const response = await addRestaurantAddress(finalData,accessToken, resId, getUserRestaurants);

    if (!response.success) {
      setError(response.error);
      toast.error("Error adding address");
      setLoading(false);
      return;
    }
    toast.success("Address added successfully");


    setError(null);
    setLoading(false);
    navigate('/business-portal')
  }


  return (
    <form
      className="flex flex-col gap-y-4 h-screen justify-center items-center mx-auto w-[90%]"
      onSubmit={handleSubmit}
    >
      <Toaster />
      <h1 className="text-3xl font-semibold">Enter Restaurant Address</h1>
      {error?.message && <p className="text-red-500">{error.message}</p>}

      <Input
        type="text"
        label="Enter Restaurant City"
        name="city"
        isInvalid={error?.city}
        errorMessage={error?.city}

        variant="flat"
        className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />

      <Input
        type="text"
        label="Enter Restaurant State"
        name="state"
        isInvalid={error?.state}
        errorMessage={error?.state}

        variant="flat"
        className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />

      <Input
        type="text"
        label="Enter Restaurant Zip Code"
        name="zipCode"
        isInvalid={error?.zipCode}
        errorMessage={error?.zipCode}

        variant="flat"
        className="max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />

      <Input
        type="text"
        label="Enter Restaurant Street"
        name="street"
        isInvalid={error?.street}
        errorMessage={error?.street}

        variant="flat"
        className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />

      <Button
        variant="flat"
        className='bg-black w-[23rem] text-white '
        type="submit"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Address'}
      </Button>
    </form>

  )
}
