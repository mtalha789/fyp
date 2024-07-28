import React from 'react'
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { productSchema } from '../schemas/productSchema'
import { useQuery } from '@tanstack/react-query'

export default function ProductForm({ product }) {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        useQuery(['categories'], async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`);
            const data = await res.json();
            setCategories(data);
        })
    })
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

        const response = await register(data);

        if (response.error) {
            setError(response.error);
            setLoading(false);
            return;
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            {error?.message && <p className="text-red-500">{error?.message}</p>}
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
                            <Button>Select Category</Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            {categories.map((category) => (
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
                    disabled={loading}
                    variant='shadow'
                >
                    {loading ? "Saving..." : 'Save'}
                </Button>
            </div>
        </form>
    )
}
