import React from 'react'
import { Input, Button } from '@nextui-org/react'
import { restaurantSchema } from '../../schemas/restaurantSchema';
import { useRestaurantStore } from '../../store/Restaurant';
import { useAuthStore } from '../../store/Auth';

export default function RestaurantForm({ setFormState }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { accessToken } = useAuthStore()

  const { registerRestaurant } = useRestaurantStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    //data collection
    const data = new FormData(e.target);
    console.log(data);

    //validation
    const result = restaurantSchema.safeParse(Object.fromEntries(data.entries()));
    if (!result.success) {
      setError(result.error.formErrors.fieldErrors);
      setLoading(false);
      console.log(result.error);
      return;
    }
    console.log(accessToken);

    const response = await registerRestaurant(data, accessToken);

    console.log('query');
    if (!response.success) {
      setError(response.error);
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(false);
    setFormState({restaurantSubmitted: true}) 
  }


  return (
    <form className="flex flex-col gap-y-4 justify-center items-center mx-auto w-[90%]" onSubmit={handleSubmit}>
      <h1 className='text-3xl font-bold py-3'>Create your Restaurant</h1>
      {error?.message && <p className="text-red-500">{error?.message}</p>}
      <Input
        type="text"
        // placeholder="Full Name"
        name='name'
        label="Enter Restaurant Name"
        isInvalid={error?.name}
        errorMessage={error?.name}

        variant='flat'
        className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />
      <Input
        type="email"
        label="Enter Restaurant Email"
        isInvalid={error?.email}
        errorMessage={error?.email}
        isRequired
        name='email'

        variant='flat'
        className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />
      <Input
        type="number"
        label="Enter Minimum Order Price"
        isInvalid={error?.minOrderPrice}
        errorMessage={error?.minOrderPrice}
        isRequired
        name='minOrderPrice'

        variant='flat'
        className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />
      <Input
        type="tel"
        label="Enter Restaurant Phone Number"
        isInvalid={error?.phone}
        errorMessage={error?.phone}
        isRequired
        name='phone'

        variant='flat'
        className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />
      <Input
        type="file"
        label="Profile Image"
        isInvalid={error?.profileImage}
        errorMessage={error?.profileImage}
        isRequired
        labelPlacement='outside-left'
        name='profileImage'

        accept='image/*'
        variant='flat'
        className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />

      <Button 
      disabled={loading} 
      variant="flat"
      className='bg-black w-[23rem]   mx-auto  text-white font-bold py-2 px-4 rounded'  
      type="submit">{loading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  )
}
