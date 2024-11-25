import React, { useEffect } from 'react'
import useCategories, { useMenuItem } from '../../queries/queries'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import { imageSchema, updateProductSchema } from '../../schemas/productSchema'
import { updateProduct, updateProductImage } from '../../queries/mutations'
import {
    Button,
    Image,
    Input,
    Select,
    SelectItem,
    Textarea,
} from '@nextui-org/react'
import { useAuthStore } from '../../store/Auth'

export default function EditItemPage() {
    const { data: categories } = useCategories();
    const navigate = useNavigate()
    const { id } = useParams()
    const { accessToken } = useAuthStore();
    const imageMutation = updateProductImage(id)
    const itemMutation = updateProduct(id)
    const { data: menuItem, error, isLoading } = useMenuItem(id)
    const [validationError, setValidationError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)


    const updateFile = (e) => {
        e.preventDefault()
        const fileData = new FormData(e.target)

        setLoading(true)
        setValidationError(null)

        //validation
        const result = imageSchema.safeParse({ image: fileData.get('image') })

        if (!result.success) {
            setValidationError(result.error.message)
            return;
        }

        setLoading(false)
        setValidationError(null)
        //send data

        imageMutation.mutate(fileData, accessToken)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const updateItem = (e) => {
        e.preventDefault()
        const itemData = new FormData(e.target)

        setLoading(true)
        setValidationError(null)

        //validation
        const result = updateProductSchema.safeParse(Object.fromEntries(itemData))

        if (!result.success) {
            setValidationError(result.error.formErrors.fieldErrors)
            setLoading(false)
            return;
        }

        setLoading(false)
        setValidationError(null)
        itemData.append('id', id)
        //send data
        itemMutation.mutate(itemData)
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            <h1 className='text-center text-xl'>Edit Item</h1>
            {error && <p className='text-center mt-3 text-red-500'>{error?.message}</p>}
            {validationError && <p className='text-center text-red-500'>{validationError}</p>}
            {imageMutation.error && <p className='text-center text-red-500 mt-2'>{imageMutation.error.message}</p>}
            {
                imageMutation.isSuccess ?
                    <div>
                        <h1>Image Updated Successfully</h1>
                        <Image
                            src={imageMutation.data.imagePath}
                            width={300}
                        />
                    </div>
                    :
                    <div className="flex flex-col gap-3">
                        <h1>Update Image</h1>
                        <Image
                            src={menuItem?.data.image}
                            width={300}
                        />

                        <form onSubmit={updateFile}>
                            <div>
                                <label htmlFor="image">Choose Image to update</label>
                                <input type="file" name="image" id="image" />
                            </div>
                            <Button type="submit" disabled={loading || imageMutation.isLoading}>Update Image</Button>
                        </form>

                    </div>
            }
            {
                itemMutation.isSuccess ? <p className='text-center text-green-500 mt-2'>{itemMutation.data.message}</p>
                    :
                    <div>
                        <h1>Edit Item Details</h1>
                        {itemMutation.error && <p className='text-center text-red-500 mt-2'>{itemMutation.error.message}</p>}
                        <form onSubmit={updateItem}>
                            <Input
                                label="Item Name"
                                type="text"                                
                                id="name"
                                name="name"
                                value={menuItem?.name}
                                onChange={handleChange}
                                errorMessage={validationError.name}
                                isInvalid={validationError.name}
                                required
                                variant='bordered'
                            />
                            <Input
                                label="Item Price"
                                type="number"                                
                                id="name"
                                name="price"
                                value={menuItem?.price}
                                onChange={handleChange}
                                errorMessage={validationError.price}
                                isInvalid={validationError.price}
                                required
                                variant='bordered'
                            />
                            <Textarea
                                label="Item Description"
                                type="text"                                
                                id="description"
                                name="description"
                                value={menuItem?.description}
                                onChange={handleChange}
                                errorMessage={validationError.description}
                                isInvalid={validationError.description}
                                required
                                variant='bordered'
                            />
                            <Select
                                label="Select Item Catagory"
                                name='cacategory_id'
                                className='max-w-xs'
                                value={menuItem?.category_id}
                                onChange={handleChange}
                                errorMessage={validationError.cacategory_id}
                                isInvalid={validationError.cacategory_id}
                                required
                            >
                                { categories.map((category) => (
                                    <SelectItem value={category.id} key={category.id}>{category.name}</SelectItem>
                                ))}
                            </Select>
                            <Button type="submit" disabled={loading || itemMutation.isLoading}>Update Item</Button>
                        </form>
                    </div>
            }
            <Button onClick={() => navigate('/corporate/menu')}>Back to Menu</Button>
        </div>
    )
}
