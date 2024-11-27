import React from 'react'
import {
  Dropdown,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { MoreVertical } from 'lucide-react';
import { Toaster,toast } from 'react-hot-toast'
import { Link, useRevalidator } from 'react-router-dom';
import { useUnapprovedRestaurants } from '../../queries/queries';
import { useAdminStore } from '../../store/Admin';
import { useRestaurantStore } from '../../store/Restaurant';
import { approveRestaurant as approveRestaurantMutation, rejectRestaurant as rejectRestaurantMutation } from '../../queries/mutations'
import LoaderComponent from '../../components/Loader';
import { QueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/Auth';

export default function Restaurant() {
  const { adminToken } = useAdminStore()
  const { data: restaurants, isLoading, isError, error } = useUnapprovedRestaurants(adminToken);
  const { mutate: approveRestaurant, isSuccess, isLoading: approveRestaurantLoading, isError: approveRestaurantError } = approveRestaurantMutation()
  const { mutate: rejectRestaurant, isLoading: rejectRestaurantLoading, isError: rejectRestaurantError } = rejectRestaurantMutation(adminToken)

  if(isLoading) return <div className="h-screen"><LoaderComponent /></div>
  if(isError) return <p>Error: {error.message}</p>
  return (
    <div className="w-full mx-auto  sm:px-6 lg:px-8 py-4">
      
      <div className="flex flex-col justify-between shadow-lg ">
        <h2 className='p-2 text-3xl font-bold'>Un Approved Restaurants</h2>
        <Toaster position="top-center" reverseOrder={false} />
        
        <RestaurantsTable adminToken={adminToken} restaurants={restaurants.filter(restaurant => !restaurant.approved)} />
      </div>
      {/* <div className="flex flex-col justify-between shadow-lg mt-8">
        <h1 className='p-2 text-2xl font-semibold'>Approved Restaurants</h1>
        <RestaurantsTable restaurants={restaurants.filter(restaurant => restaurant.approved)} />
      </div> */}
    </div>
  )
}

const RestaurantsTable = ({ restaurants, adminToken }) => {
  const { getUserRestaurants } = useRestaurantStore()
  const { accessToken } = useAuthStore()
  const {revalidate} = useRevalidator()
  const { mutate: approveRestaurant, isLoading: approveRestaurantLoading, isError: isApproveRestaurantError, error: approveRestaurantError } = approveRestaurantMutation(adminToken)
  const { mutate: rejectRestaurant, isLoading: rejectRestaurantLoading, isError: isRejectRestaurantError, error: rejectRestaurantError } = rejectRestaurantMutation()
  if (restaurants.length === 0) {
    return<>
    <div className='m-4'>
    <p className='mt-3 text-lg font-bold'>No unapproved restaurants</p>
    </div>

    </> 
  }
  if(isApproveRestaurantError){ toast.error(approveRestaurantError.message) }
  if(isRejectRestaurantError){ toast.error(rejectRestaurantError.message) }
  return (
    <Table>
      {console.log(adminToken)
      }
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Corporate Email</TableColumn>
        <TableColumn>Phone</TableColumn>
        <TableColumn>Minimum Order Price</TableColumn>
        <TableColumn className='w-0'>
          <span className='sr-only'>Actions</span>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {restaurants.map(restaurant => (
          <TableRow key={restaurant.id}>
            <TableCell>{restaurant.name}</TableCell>
            <TableCell>{restaurant.corporateEmail}</TableCell>
            <TableCell>{restaurant.phone}</TableCell>
            <TableCell>{restaurant.minimumOrderPrice}</TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger>
                  <div>
                    <span className='sr-only'>Actions</span>
                    <MoreVertical />
                  </div>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem >
                    <Button color='success' 
                    onClick={()=> {
                      const res = approveRestaurant(restaurant.id, adminToken)
                      res.success ? toast.success('Restaurant rejected successfully') : toast.error('Error rejecting restaurant')
                      res.success && getUserRestaurants(accessToken)
                      revalidate()
                    }} 
                    disabled={rejectRestaurantLoading || approveRestaurantLoading} className='w-full text-center'> Approve </Button>
                  </DropdownItem>
                  <DropdownItem  className='w-full text-center' >
                   <Button color='danger' 
                    onClick={()=> {
                    const res = rejectRestaurant(restaurant.id, adminToken)
                    res.success ? toast.success('Restaurant rejected successfully') : toast.error('Error rejecting restaurant')
                    revalidate()
                  }}
                     disabled={rejectRestaurantLoading || approveRestaurantLoading}className='w-full text-center'> Reject </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}