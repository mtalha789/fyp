import { DropdownMenu, DropdownItem, Table, TableBody, TableCell, TableHeader, TableRow, DropdownTrigger, Dropdown, TableColumn, Button } from "@nextui-org/react";
import { MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRestaurantSellerMenu } from "../../queries/queries";
import { useAuthStore } from "../../store/Auth";
import LoaderComponent from "../../components/Loader";

export default function MenuPage() {
  const { id } = useParams();
  const { accessToken } = useAuthStore();
  const { data: menu, isLoading, isError, error } = useRestaurantSellerMenu(id, accessToken)
  
  if (isLoading) return <div className="h-screen"><LoaderComponent /></div>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl mb-4">Menu</h1>
      <div className="flex justify-between">
        <Button asChild variant="shadow" color="default">
          <Link to={`/corporate/${id}/menu/add-item`} className="text-sm">Add New Item</Link>
        </Button>
      </div>
      <ProductTable className="mt-8" products={menu} />
    </div>
  );
}

function ProductTable({ products }) {
  if (products.length === 0) {
    return <p className="mt-3 font-bold">Add some products</p>;
  }
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableColumn className="w-0">
          <span className="sr-only">Available For Purchase</span>
        </TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn className="w-0">
          <span className="sr-only">Actions</span>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {products.map(product => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <span className="hidden sr-only">Available</span>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  <span className="hidden sr-only">Unavailable</span>
                  <XCircle className="stroke-red-600" />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>
              <Dropdown>
                <DropdownTrigger>
                  <div>
                    <span className="sr-only">Actions</span>
                    <MoreVertical />
                  </div>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem asChild>
                    <Button onClick={() => console.log(`Toggle availability for ${product.id}`)}>Toggle Availability</Button>
                  </DropdownItem>
                  <DropdownItem asChild>
                    <Link to={`/corporate/${product.restaurantId}/menu/${product.id}/edit`}>Edit</Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
