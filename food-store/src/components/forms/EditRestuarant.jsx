import { Button } from "@nextui-org/react";
const EditRestuarant = () => {
  return (
    <div>
        <form>
            <h1>Edit Restuarant Image</h1>
            <input type="file" accept="image/*" />
            <Button type="submit">Upload</Button>
        </form>
    </div>
  )
}

export default EditRestuarant