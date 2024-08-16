import React from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { MoreVertical } from 'lucide-react'
import {DeleteIcon} from '../../components/icons/DeleteIcon'
export default function Customers() {
  let customer = [
    {
      name: '1',
      email: 'Aba@a.com',
      orders: 1
    }
  ]
  return (
    <div>
      <h1 className='text-3xl'>Customers</h1>
      <CustomersTable customers={customer} />
    </div>

  )
}

function CustomersTable({ customers }) {
  if (!customers || customers.length === 0) return <div>No customers</div>
  return (
    <Table>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Orders</TableColumn>
        <TableColumn className='w-0'>
          <span className="sr-only">Actions</span>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {
          customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.orders}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <div>
                      <span className="sr-only">Actions</span>
                      <MoreVertical />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem>
                      <DeleteIcon/>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}