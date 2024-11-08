import React from 'react'
import { Input, Button } from '@nextui-org/react'
import { restaurantAddressSchema } from '../../schemas/restaurantSchema';
import { useRestaurantStore } from '../../store/Restaurant';

export default function RestaurantAddressForm() {
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
  }


  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className={`flex flex-col gap-2 ${error?.city ? 'text-red-500' : ''}`}>
        <span>Enter Restaurant City</span>
        <Input
          type="text"
          placeholder="city"
          name='city'
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error?.city && <span className="text-red-500">{error.city}</span>}
      </div>
      <div className={`flex flex-col gap-2 ${error?.state ? 'text-red-500' : ''}`}>
        <span>Enter Restaurant State</span>
        <Input
          type="text"
          placeholder="state"
          name='state'
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error?.state && <span className="text-red-500">{error.state}</span>}
      </div>
      <div className={`flex flex-col gap-2 ${error?.zipCode ? 'text-red-500' : ''}`}>
        <span>Enter Restaurant Zip Code</span>
        <Input
          type="text"
          placeholder="zipCode"
          name='zipCode'
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error?.zipCode && <span className="text-red-500">{error.zipCode}</span>}
      </div>
      <div className={`flex flex-col gap-2 ${error?.street ? 'text-red-500' : ''}`}>
        <span>Enter Restaurant Street</span>
        <Input
          type="text"
          placeholder="street"
          name='street'
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error?.street && <span className="text-red-500">{error.street}</span>}
      </div>
      <Button variant="light" color="primary" type="submit">{loading ? 'Adding...' : 'Add Address'}</Button>
    </form>
  )
}
