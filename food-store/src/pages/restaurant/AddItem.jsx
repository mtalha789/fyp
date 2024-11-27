import React from 'react'
import ProductForm from '../../components/forms/ProductForm'
import {addProduct} from '../../queries/mutations'
import CategoryForm from '../../components/forms/CategoryForm'
import { useParams } from 'react-router-dom'

const AddItemPage = () => {
  const { id } = useParams();
  return (
    <div className='h-screen flex flex-col p-4 items-center justify-center'>
      <h1 className='text-3xl font-bold'>Add New Item</h1>
      {/* <CategoryForm /> */}
      <ProductForm id={id} />
    </div>
  )
}

export default AddItemPage