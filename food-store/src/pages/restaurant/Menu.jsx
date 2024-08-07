import { DropdownMenu, DropdownItem, Table, TableBody, TableCell, TableHeader, TableRow, DropdownTrigger, Dropdown, TableColumn, Button } from "@nextui-org/react";
import { MoreVertical, CheckCircle2, XCircle } from 'lucide-react';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function MenuPage() {
  const [menu, setMenu] = useState([
    {id: 1, name: 'Product 1', price: 10, isAvailableForPurchase: true},
    {id: 2, name: 'Product 2', price: 20, isAvailableForPurchase: false},
    {id: 3, name: 'Product 3', price: 30, isAvailableForPurchase: true},
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl mb-4">Menu</h1>
      <div className="flex justify-between">
        <Button asChild variant="shadow" color="primary">
          <Link to="/corporate/menu/add-item" className="text-sm">Add New Item</Link>
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
                    <Link to={`/restaurant/edit-product/${product.id}`}>Edit</Link>
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
