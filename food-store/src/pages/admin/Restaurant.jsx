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

export default function Restaurant() {
  const restaurants = [
    {
      id: '1',
      name: 'Restaurant 1',
      approved: false,
      rejected: false,
      imageUrl: 'https://example.com/image1.jpg',
      corporateEmail: 'restaurant1@example.com',
      phone: '1234567890',
      minimumOrderPrice: 100,
      owner_id: '1',
      closed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    },
    {
      id: '2',
      name: 'Restaurant 2',
      approved: true,
      rejected: false,
      imageUrl: 'https://example.com/image2.jpg',
      corporateEmail: 'restaurant2@example.com',
      phone: '0987654321',
      minimumOrderPrice: 200,
      owner_id: '2',
      closed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    },
    {
      id: '3',
      name: 'Restaurant 3',
      approved: false,
      rejected: true,
      imageUrl: 'https://example.com/image3.jpg',
      corporateEmail: 'restaurant3@example.com',
      phone: '5551234567',
      minimumOrderPrice: 300,
      owner_id: '3',
      closed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false
    }
  ]
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col justify-between shadow-lg">
        <h2 className='p-2 text-2xl font-semibold'>Un Approved Restaurants</h2>
        <RestaurantsTable restaurants={restaurants.filter(restaurant => !restaurant.approved)} />
      </div>
      <div className="flex flex-col justify-between shadow-lg mt-8">
        <h1 className='p-2 text-2xl font-semibold'>Approved Restaurants</h1>
        <RestaurantsTable restaurants={restaurants.filter(restaurant => restaurant.approved)} />
      </div>
    </div>
  )
}

const RestaurantsTable = ({ restaurants }) => {
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
                  <DropdownItem>
                    <Link to={`/admin/restaurants/${restaurant.id}/edit`}>
                      Edit
                    </Link>
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