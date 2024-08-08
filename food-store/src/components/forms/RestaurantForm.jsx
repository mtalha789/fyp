import React from 'react'
import { Input, Button } from '@nextui-org/react'
import { restaurantSchema } from '../schemas/restaurantSchema';
import { useRestaurantStore } from '../store/Restaurant';

export default function RestaurantForm({ restaurant }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { registerRestaurant } = useRestaurantStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    //data collection
    const data = new FormData(e.target);

    //validation
    const result = restaurantSchema.safeParse(Object.fromEntries(data.entries()));
    if (!result.success) {
      setError(result.error.formErrors.fieldErrors);
      setLoading(false);
      console.log(result.error);
      return;
    }

    const response = await registerRestaurant(data);

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
      <div className={`flex flex-col gap-2 ${error?.name ? 'text-red-500' : ''}`}>
        <span>Enter Restaurant Name</span>
        <Input
          type="text"
          placeholder="name"
          name='name'
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error?.name && <span className="text-red-500">{error.name}</span>}
      </div>
      <div className={`flex flex-col gap-2 ${error?.email ? 'text-red-500' : ''}`}>
        <span>Enter Restaurant Email</span>
        <Input
          type="email"
          placeholder="email"
          name='email'
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error?.email && <span className="text-red-500">{error.email}</span>}
      </div>
      <div className={`flex flex-col gap-2 ${error?.minOrderPrice ? 'text-red-500' : ''}`}>
        <span>Enter Restaurant Minimum Order Price</span>
        <Input
          type="number"
          placeholder="minOrderPrice"
          name='minOrderPrice'
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error?.minOrderPrice && <span className="text-red-500">{error.minOrderPrice}</span>}
      </div>
      <div className={`flex flex-col gap-2 ${error?.phone ? 'text-red-500' : ''}`}>
        <span>Enter Restaurant Phone Number</span>
        <Input
          type="tel"
          placeholder="phone"
          name='phone'
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error?.phone && <span className="text-red-500">{error.phone}</span>}
      </div>
      <div className={`flex flex-col gap-2 ${error?.profileImage ? 'text-red-500' : ''}`}>
        <span>Upload Restaurant Profile Image</span>
        <Input
          type="file"
          placeholder="profileImage"
          name='profileImage'
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        {error?.profileImage && <span className="text-red-500">{error.profileImage}</span>}
      </div>
      <Button disabled={loading} variant="light" color="primary" type="submit">{loading ? 'Registering...' : 'Register'}</Button>
    </form>
  )
}
