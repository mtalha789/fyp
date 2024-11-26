import React from 'react'
import { Spinner } from '@nextui-org/react'

const LoaderComponent = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center gap-2'>
      <Spinner color='default' />
      <h1 className='text-3xl font-bold'>Loading...</h1>
    </div>
  )
}

export default LoaderComponent