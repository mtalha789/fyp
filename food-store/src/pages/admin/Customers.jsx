import React from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { Loader, MoreVertical } from 'lucide-react'
import { DeleteIcon } from '../../components/icons/DeleteIcon'
import { useAdminStore } from '../../store/Admin'
import { useUser } from '../../queries/queries'
import { deleteUserAccount as deleteUserAccountMutation } from '../../queries/mutations'
import { Toaster, toast } from 'react-hot-toast'
import LoaderComponent from '../../components/Loader'
export default function Customers() {

  const { adminToken } = useAdminStore();
  const { data: users, isLoading, isError, error } = useUser(adminToken);
  const { mutate: deleteUserAccount, isLoading: deleteUserAccountLoading, isError: deleteUserAccountError } = deleteUserAccountMutation(adminToken)

  if (isLoading) return <div className="h-screen"><LoaderComponent /></div>
  if (isError) return <p>Error: {error.message}</p>
  // if (!users || users.length === 0) return <div>No customers</div>
  return (
    <div>
      <h1>Customers</h1>
      <Toaster />
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
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.orders?.length}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger>
                      <div>
                        <span className="sr-only">Actions</span>
                        <MoreVertical />
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem onClick={() => { deleteUserAccount(user.id, adminToken) }}>
                        {deleteUserAccountLoading ? 'Deleting...' : 'Delete'}
                        {deleteUserAccountError && toast.error('Error deleting user')}
                        {deleteUserAccountLoading ? <DeleteIcon /> :<Loader className="animate-spin" />}
                        
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}