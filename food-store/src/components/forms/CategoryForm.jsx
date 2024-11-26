import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { addCategory } from '../../queries/mutations'
import toast, { Toaster } from 'react-hot-toast'
import { z } from 'zod'

export default function CategoryForm() {
    const [name, setName] = React.useState('')
    const {mutate, data, isLoading, isError, error} =addCategory()
    const nameSchema = z.string().trim().min(3,'Category name must be at least 3 characters long').max(20,'Category name must be at most 20 characters long')
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!nameSchema.safeParse(name).success) {
            toast.error('Category name must be at least 3 characters long')
            return
        }
        const response = mutate({name})
        if(response.success) {
            toast.success('Category added successfully')
        }
        else console.log(response.error)   
    }
  return (
    <div>
        <h1>Category</h1>
        <Toaster />
        <form onSubmit={handleSubmit} >
            <Input
                name='name'
                variant='bordered'
                size='md'
                label='Category Name'
                type='text'
                value={name}
                onChange={handleNameChange}
            />
            <Button type='submit' disabled={isLoading}>Add Category</Button>
        </form>
    </div>
  )
}
