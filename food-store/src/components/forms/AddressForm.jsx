import React from 'react'
import { Input, Button } from '@nextui-org/react'
import { restaurantAddressSchema } from '../../schemas/restaurantSchema';
import { useRestaurantStore } from '../../store/Restaurant';

export default function RestaurantAddressForm({ setFormState, formState }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { addRestaurantAddress } = useRestaurantStore();

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
      console.log(result.error);
      return;
    }

    const response = await addRestaurantAddress(data);

    if (!response.success) {
      setError(response.error);
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(false);
    setFormState({ ...formState, addressSubmitted: true})
  }


  return (
    <form
      className="flex flex-col gap-y-4 justify-center items-center mx-auto w-[90%]"
      onSubmit={handleSubmit}
    >
      {error?.message && <p className="text-red-500">{error.message}</p>}

      <Input
        type="text"
        label="Enter Restaurant City"
        name="city"
        isInvalid={error?.city}
        errorMessage={error?.city}
        color="primary"
        variant="underlined"
        className="border border-gray-300 max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />

      <Input
        type="text"
        label="Enter Restaurant State"
        name="state"
        isInvalid={error?.state}
        errorMessage={error?.state}
        color="primary"
        variant="underlined"
        className="border border-gray-300 max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />

      <Input
        type="text"
        label="Enter Restaurant Zip Code"
        name="zipCode"
        isInvalid={error?.zipCode}
        errorMessage={error?.zipCode}
        color="primary"
        variant="underlined"
        className="border border-gray-300 max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />

      <Input
        type="text"
        label="Enter Restaurant Street"
        name="street"
        isInvalid={error?.street}
        errorMessage={error?.street}
        color="primary"
        variant="underlined"
        className="border border-gray-300 max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />

      <Button
        variant="solid"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Address'}
      </Button>
    </form>

  )
}
