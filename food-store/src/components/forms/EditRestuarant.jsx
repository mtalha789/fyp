import { Button, Input } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useRestaurant } from "../../queries/queries";
import { Loader } from "..";
const EditRestuarant = () => {
  const { id } = useParams();
  // const { data, error, isError, isLoading } = useRestaurant(id);

  // if(isLoading) return <Loader />

  // if(isError) return <p className="text-red">{JSON.stringify(error.message)}</p>

  return (
    <div>
        <form>
            <h1>Edit Restuarant Image</h1>
            <Input type="file" accept="image/*" variant="flat" />
            <Button type="submit">Upload</Button>
        </form>
    </div>
  )
}

export default EditRestuarant