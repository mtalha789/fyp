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
import { Link } from 'react-router-dom';
import { useUnapprovedRestaurants } from '../../queries/queries';
import { useAdminStore } from '../../store/Admin';
import { approveRestaurant as approveRestaurantMutation, rejectRestaurant as rejectRestaurantMutation } from '../../queries/mutations'
import LoaderComponent from '../../components/Loader';

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
  const { mutate: approveRestaurant, isSuccess : isApproveRestaurantSuccess , isLoading: approveRestaurantLoading, isError: approveRestaurantError } = approveRestaurantMutation(adminToken)
  const { mutate: rejectRestaurant, isSuccess : isRejectRestaurantSuccess, isLoading: rejectRestaurantLoading, isError: rejectRestaurantError } = rejectRestaurantMutation()
  if (restaurants.length === 0) {
    return<>
    <div className='m-4'>
    <p className='mt-3 text-lg font-bold'>No unapproved restaurants</p>
    </div>

    </> 
  }
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
                    <Button color='success' onClick={()=> approveRestaurant(restaurant.id, adminToken)} disabled={rejectRestaurantLoading || approveRestaurantLoading} className='w-full text-center'> Approve </Button>
                  </DropdownItem>
                  <DropdownItem  className='w-full text-center' >
                   <Button color='danger' onClick={()=> rejectRestaurant(restaurant.id, adminToken)} disabled={rejectRestaurantLoading || approveRestaurantLoading} className='w-full text-center'> Reject </Button>
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