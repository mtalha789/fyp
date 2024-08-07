import React from 'react'
import { Loader2 } from 'lucide-react'

const LoaderComponent = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <Loader2 size='100' color='gray' className='animate-spin' />
    </div>
  )
}

export default LoaderComponent