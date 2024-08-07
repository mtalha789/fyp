import React, { useEffect } from 'react'
import { useMenuItem } from '../../queries/queries'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import { imageSchema, updateProductSchema } from '../../schemas/productSchema'
import { updateProduct, updateProductImage } from '../../queries/mutations'
import {
    Button,
    Card,
    CardHeader,
    Image,
} from '@nextui-org/react'

export default function EditItemPage() {
    const {id} = useParams()
    const fileMutation = updateProductImage()
    const itemMutation = updateProduct()
    const {data: menuItem, error, isLoading} = useMenuItem(id)
    const [validationError, setValidationError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)


    const updateFile = (e) => {
        e.preventDefault()
        const fileData = new FormData(e.target)

        setLoading(true)
        setValidationError(null)

        //validation
        const result = imageSchema.safeParse({image: fileData.get('image')})

        if(!result.success){
            setValidationError(result.error.message)
            return;
        }

        setLoading(false)
        setValidationError(null)
        //send data

        fileMutation.mutate({id, fileData})
    }

    const updateItem = (e) => {
        e.preventDefault()
        const itemData = new FormData(e.target)

        setLoading(true)
        setValidationError(null)

        //validation
        const result = updateProductSchema.safeParse(Object.fromEntries(itemData))

        if(!result.success){
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
            { error && <p className='text-center mt-3 text-red-500'>{error?.message}</p>}
            {validationError && <p className='text-center text-red-500'>{validationError}</p>}
            {fileMutation.error && <p className='text-center text-red-500 mt-2'>{fileMutation.error.message}</p>}
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
                    <Button type="submit" disabled={loading || fileMutation.isLoading}>Update Image</Button>
                </form>
            </div>
            <div>
                <h1>Edit Item Details</h1>
                { itemMutation.error && <p className='text-center text-red-500 mt-2'>{itemMutation.error.message}</p>}
                <form onSubmit={updateItem}>
                    <div>
                        {validationError.name && <p className='text-center text-red-500'>{validationError.name}</p>}
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" defaultValue={menuItem?.data.name} />
                    </div>
                    <div>
                        {validationError.price && <p className='text-center text-red-500'>{validationError.price}</p>}
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" defaultValue={menuItem?.data.price} />
                    </div>
                    <div>
                        {validationError.description && <p className='text-center text-red-500'>{validationError.description}</p>}
                        <label htmlFor="description">Description</label>
                        <textarea type="text" name="description" id="description" defaultValue={menuItem?.data.description} />
                    </div>
                    <div>
                        {validationError.category && <p className='text-center text-red-500'>{validationError.category}</p>}
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" id="category" defaultValue={menuItem?.data.category} /> 
                    </div>
                    <Button type="submit" disabled={loading || itemMutation.isLoading}>Update Item</Button>
                </form>
            </div>
        </div>
    )
}
