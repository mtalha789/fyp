import React from 'react'
import { useRestaurants } from '../queries/queries'
import { Loader } from '../components'
import RestaurantCard from '../components/RestauerantCard'

export default function Restaurants() {
    const {data: restaurants, isError, isLoading, error} = useRestaurants()

    if (isError) {
        return <p>Error Fetching Restaurants</p>
    }
    if (isLoading) {
        return <div className="h-full flex items-center justify-center">
            <Loader />
        </div>
    }
  return (
    <div className='p-10'>
        <h1 className='text-3xl font-extrabold py-4 p-2'>Restaurants</h1>
        {
            Array.isArray(restaurants) && restaurants.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-y-4 px-3'>
                    {restaurants.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
                </div>
            ) : (
            <div className="h-full flex justify-center items-center">
                <h5 className='text-lg px-5'>No Restaurant Found</h5> 
            </div> 
            )
        }

    </div>
  )
}
