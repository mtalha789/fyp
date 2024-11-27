import { Button, Input } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import { useRestaurant } from "../../queries/queries";
import { useRestaurantStore } from "../../store/Restaurant";
import { Loader } from "..";
import { useAuthStore } from "../../store/Auth";
import React from "react";
import { updateRestaurantSchema } from "../../schemas/restaurantSchema";
import toast from "react-hot-toast";
const EditRestuarant = () => {
  const { id } = useParams();
  const { data, error:fetchError, isError, isLoading } = useRestaurant(id);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { editRestaurant } = useRestaurantStore()
  const { accessToken } = useAuthStore()
  const navigate = useNavigate()
  

  const handleSubmit = async (e) => {
    console.log('submitted');
    
    e.preventDefault();
    setLoading(true);
    setError(null);
    //data collection
    const data = new FormData(e.target);
    
    //validation
    const result = updateRestaurantSchema.safeParse(Object.fromEntries(data.entries()));
    if (!result.success) {
      setError(result.error.formErrors.fieldErrors);
      setLoading(false);
      console.log(result.error);
      return;
    }

    console.log('validation');
    

    setLoading(false);
    setError(null);

    //send data to backend
    const response = await editRestaurant(Object.fromEntries(data.entries()), id, accessToken)

    if (!response.success) {
      toast.error('Error updating Restaurant')
      setLoading(false);
      return;
    }

    toast.success('Restaurant updated successfully')

    navigate('/business-portal')

  }

  if (isLoading) return <Loader />

  if (isError) return <p className="text-red">Error Loading Restaurant Data</p>

  return (
    <form 
    className="flex flex-col gap-y-4 justify-center items-center mx-auto w-[90%]" 
    onSubmit={handleSubmit}>
      <h1 className='text-3xl font-bold py-3'>Edit your Restaurant</h1>
      {error?.message && <p className="text-red-500">{error?.message}</p>}
      <Input
        type="text"
        // placeholder="Full Name"
        defaultValue={data?.name}
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
        defaultValue={data.corporateEmail}
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
        defaultValue={data.minimumOrderPrice}
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
        defaultValue={data.phone}
        isRequired
        name='phone'
        variant='flat'
        className=" max-w-sm sm:min-w-lg rounded-md px-3 py-2"
      />
      <Button
        disabled={loading || isLoading}
        variant="flat"
        className='bg-black w-[23rem]   mx-auto  text-white font-bold py-2 px-4 rounded'
        type="submit">{loading || isLoading ? 'Updating...' : 'Update Restaurant'}
      </Button>
    </form>
  )
}

export default EditRestuarant