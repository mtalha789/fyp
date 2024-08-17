import React from 'react'
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { productSchema } from '../../schemas/productSchema'
import { useQuery } from '@tanstack/react-query'
import useCategories from '../../queries/queries';
import { Loader2 } from 'lucide-react';

export default function ProductForm({ mutationFunction}) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const { data: categories, isError, isLoading, error: fetchError } = useCategories()

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
        mutationFunction.mutate(data);
    }

    if (isLoading) {
        return <Loader />
    }
    if (isError) {
        return <p className="text-red-500">{fetchError.message}</p>
    }
    
    return (
        <form onSubmit={handleSubmit}>
            {error?.message && <p className="text-red-500">{error?.message}</p>}
            {mutationFunction.isError && <p className="text-red-500">{JSON.stringify(mutationFunction.error)}</p>}
            <div className="flex flex-col gap-2 container mx-auto max-w-[80%]">
                <div className="space-y-2">
                    <Input
                        type="text"
                        placeholder="name"
                        name='name'
                        label="Enter Product Name"
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    {error?.fullname && <p className="text-red-500">{error?.fullname}</p>}
                </div>
                <div className="space-y-2">
                    <Input
                        type="number"
                        placeholder="price"
                        label="Enter Price"
                        name='price'
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />
                    {error?.price && <p className="text-red-500">{error?.price}</p>}
                </div>
                <div className="space-y-2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button color="secondary">Select Category</Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            {categories.data.map((category) => (
                                <DropdownItem key={category.id} value={category.id}>{category.name}</DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="space-y-2">
                    <label htmlFor="productImage">Upload Product Image</label>
                    <Input
                        type="file"
                        name='productImage'
                        id='productImage'
                        className="border border-gray-300 rounded-md px-3 py-2"
                    />

                    {error?.productImage && <p className="text-red-500">{error?.productImage}</p>}
                </div>
                <Button
                    type="submit"
                    className="bg-blue-500 w-[50%] mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={loading || mutationFunction.isLoading}
                    variant='shadow'
                >
                    {loading || mutationFunction.isLoading ? <Loader2 color='white' className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </form>
    )
}
