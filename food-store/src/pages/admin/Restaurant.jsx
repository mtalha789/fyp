import React from 'react'
import {
  Dropdown,
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
import { Link } from 'react-router-dom';
import { useUnapprovedRestaurants } from '../../queries/queries';
import { useAdminStore } from '../../store/Admin';
import { approveRestaurant as approveRestaurantMutation, rejectRestaurant as rejectRestaurantMutation } from '../../queries/mutations'

export default function Restaurant() {
  const { adminToken } = useAdminStore()
  const { data: restaurants, isLoading, isError } = useUnapprovedRestaurants()
  const { mutate: approveRestaurant, isLoading: approveRestaurantLoading, isError: approveRestaurantError } = approveRestaurantMutation()
  const { mutate: rejectRestaurant, isLoading: rejectRestaurantLoading, isError: rejectRestaurantError } = rejectRestaurantMutation(adminToken)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col justify-between shadow-lg">
        <h2 className='p-2 text-2xl font-semibold'>Un Approved Restaurants</h2>
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
  const { mutate: approveRestaurant, isLoading: approveRestaurantLoading, isError: approveRestaurantError } = approveRestaurantMutation()
  const { mutate: rejectRestaurant, isLoading: rejectRestaurantLoading, isError: rejectRestaurantError } = rejectRestaurantMutation(adminToken)
  if (restaurants.length === 0) {
    return <p className='mt-3 font-bold'>No unapproved restaurants</p>
  }
  return (
    <Table>
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
                    <Button onClick={()=> approveRestaurant(restaurant.id, adminToken)} disabled={approveRestaurantLoading || rejectRestaurantLoading}>Approve</Button>
                  </DropdownItem>
                  <DropdownItem onClick={()=> rejectRestaurant(restaurant.id, adminToken)} >
                  <Button onClick={()=> rejectRestaurant(restaurant.id, adminToken)} disabled={rejectRestaurantLoading || approveRestaurantLoading}>Reject</Button>
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