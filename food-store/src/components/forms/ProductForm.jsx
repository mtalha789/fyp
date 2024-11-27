import React from 'react'
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Textarea, Select, SelectItem } from '@nextui-org/react'
import { productSchema } from '../../schemas/productSchema'
import useCategories from '../../queries/queries';
import LoaderComponent from '../Loader';
import { addProduct as addProductMutation } from '../../queries/mutations';
import { useAuthStore } from '../../store/Auth';
import { Loader } from 'lucide-react'

export default function ProductForm() {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const { data: categories, isError, isLoading, error: fetchError } = useCategories()
    const { mutate: addProduct, isLoading: addProductLoading, isError: isAddProductError, error: addProductError } = addProductMutation();
    const { accessToken } = useAuthStore()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        //data collection
        const data = new FormData(e.target);

        //validation
        const result = productSchema.safeParse(Object.fromEntries(data.entries()));
        if (!result.success) {
            setError(result.error.formErrors.fieldErrors);
            setLoading(false);
            console.log(result.error);
            return;
        }

        setLoading(false);
        setError(null);

        //send data to backend
        addProduct(data, accessToken)
    }

    if (isLoading) {
        return <LoaderComponent />
    }
    if (isError) {
        return <p className="text-red-500">{fetchError.message}</p>
    }

    return (
        <div>
            <h3 className='text-lg font-bold '>Add New Item Details</h3>
            {console.log('cat', categories)}
            {error?.message && <p className="text-center text-red-500 mt-2">{error.message}</p>}
            {isAddProductError && <p className="text-center text-red-500 mt-2">{JSON.stringify(addProductError)}</p>}

            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <Input
                    label="Product Name"
                    type="text"
                    id="name"
                    name="name"
                    errorMessage={error?.name}
                    isInvalid={error?.name}
                    required
                    variant="bordered"
                />
                <Input
                    label="Price"
                    type="number"
                    id="price"
                    name="price"
                    errorMessage={error?.price}
                    isInvalid={error?.price}
                    required
                    variant="bordered"
                />
                <Textarea
                    label="Product Description"
                    id="description"
                    name="description"
                    errorMessage={error?.description}
                    isInvalid={error?.description}
                    required
                    variant="bordered"
                />
                {Array.isArray(categories) && categories.length > 0 ? (
                    <Select
                        label="Select Product Category"
                        name="category_id"
                        className="max-w-xs"
                        errorMessage={error?.category_id}
                        isInvalid={error?.category_id}
                        required
                    >
                        {categories.map(category => (
                            <SelectItem value={category.id} key={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </Select>
                ) : (
                    <p>{categories.length === 0 ? 'No categories available. Please add some.' : 'Error loading categories.'}</p>
                )}


                <Button >Add New category</Button>
                <Input
                    label="Upload Product Image"
                    labelPlacement='outside-left'
                    type="file"
                    name="productImage"
                    id="productImage"
                    accept='image/*'
                    errorMessage={error?.productImage}
                    isInvalid={error?.productImage}
                    required
                    variant="bordered"
                />
                <Button
                    type="submit"
                    disabled={loading || addProductLoading}
                    className="mt-4"
                >
                    {loading || addProductLoading ? <Loader color="white " /> : 'Save'}
                </Button>
            </form>
        </div>

    )
}
