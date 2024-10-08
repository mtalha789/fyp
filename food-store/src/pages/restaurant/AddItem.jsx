import React from 'react'
import ProductForm from '../../components/forms/ProductForm'
import {addProduct} from '../../queries/mutations'

const AddItemPage = () => {
  const mutationFunction = addProduct()
  return (
    <div className='h-screen flex flex-col p-4 items-center justify-center'>
      <h1 className='text-3xl font-bold'>Add New Item</h1>
      <ProductForm mutationFunction={mutationFunction}/>
    </div>
  )
}

export default AddItemPage