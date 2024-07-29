import { DropdownMenu, DropdownItem, Table, TableBody, TableCell, TableHeader, TableRow, DropdownTrigger, Dropdown, TableColumn, Button } from "@nextui-org/react";
import { MoreVertical } from 'lucide-react'
import {getMenu, toggleAvailability} from '../../queries/menu'
import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MenuPage() {
  const [menu, setMenu] = useState([])

  useEffect(() => {
    getMenu().then(menu => setMenu(menu))
  })
  return (
    <>
      <h1 className="text-3xl">Products</h1>
      <Button asChild>
        <Link to="/restaurant/add-product" >Add New Item</Link>
      </Button>
      <ProductTable products={menu} />
    </>
  )
}

async function ProductTable({ products }) {

  if (products.length === 0) {
    return <p>Add some products</p>
  }
  return (
    <Table>
      <TableHeader>
        <TableColumn className="w-0">
          <span className="sr-only">
            Available For Purchase
          </span>

        </TableColumn>
        <TableColumn>Name</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Orders</TableColumn>
        <TableColumn className="w-0">
          <span className="sr-only">
            Actions
          </span>
        </TableColumn>
      </TableHeader>
      <TableBody>
        {
          products.map(product => (
            <TableRow>
              <TableCell>
                {
                  product.isAvailableForPurchase ? (
                    <>
                      <span className="sr-only">Available</span>
                      <CheckCircle2 />
                    </>
                  ) : (
                    <>
                      <span className="sr-only">Unavailable</span>
                      <XCircle className="stroke-destructive" />
                    </>
                  )
                }
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{formatNumber(product._count.order)}</TableCell>
              <TableCell>
                <Dropdown>
                  <DropdownTrigger>
                    <span className="sr-only">Actions</span>
                    <MoreVertical />
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem asChild>
                      <Button onClick={() => toggleAvailability(product.id)}>Toggle Availability</Button>
                    </DropdownItem>
                    <DropdownItem asChild>
                      <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                    </DropdownItem>
                    {/* <ToggleProductDropdoenItem
                      id={product.id}
                      isAvailableForPurchase={product.isAvailableForPurchase}
                    />
                    <DeleteProductDropdownItem
                      id={product.id}
                      disabled={product._count.order > 0}
                    /> */}
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